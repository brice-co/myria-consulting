"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { CONTACT_AGENT_CONFIG } from "@/config/contact-agent";
import {
  emptyContactInquiry,
  type ContactInquiry,
} from "@/lib/myria-contact-agent/contact/schema";
import { historyToTranscript } from "@/lib/myria-contact-agent/realtime/history";
import { MyriaContactRealtimeClient } from "@/lib/myria-contact-agent/realtime/myria-realtime-client";
import type {
  ConnectionStatus,
  ToolEvent,
  TranscriptItem,
} from "@/lib/myria-contact-agent/realtime/types";

import { useSilenceTimeout } from "./use-silence-timeout";

const toolLabels: Record<string, string> = {
  prepare_contact_inquiry: "Updating inquiry",
  request_send_confirmation: "Preparing confirmation",
};

function eventId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function errorMessage(cause: unknown) {
  if (cause instanceof Error) {
    return cause.message;
  }

  if (typeof cause === "string") {
    return cause;
  }

  try {
    return JSON.stringify(cause);
  } catch {
    return "Unknown realtime connection error.";
  }
}

function isActiveResponseError(message: string) {
  return message.includes(
    "conversation_already_has_active_response",
  );
}

export function useContactAgent() {
  const clientRef =
    useRef<MyriaContactRealtimeClient | null>(null);

  const sessionStartedAtRef =
    useRef<number | null>(null);

  const [status, setStatus] =
    useState<ConnectionStatus>("idle");

  const [muted, setMuted] = useState(false);

  const [inquiry, setInquiry] =
    useState<ContactInquiry>(emptyContactInquiry);

  const [transcript, setTranscript] = useState<
    TranscriptItem[]
  >([]);

  const [events, setEvents] = useState<ToolEvent[]>([]);

  const [
    confirmationRequested,
    setConfirmationRequested,
  ] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const endSession = useCallback(() => {
    setStatus((current) =>
      current === "idle" ? "idle" : "ending",
    );

    clientRef.current?.close();
    clientRef.current = null;

    sessionStartedAtRef.current = null;

    setMuted(false);
    setStatus("idle");
  }, []);

  const {
    warning: silenceWarning,
    markActivity,
  } = useSilenceTimeout({
    enabled: status === "connected",
    warningMs:
      CONTACT_AGENT_CONFIG.silenceWarningMs,
    timeoutMs:
      CONTACT_AGENT_CONFIG.silenceTimeoutMs,
    onTimeout: endSession,
  });

  const pushEvent = useCallback(
    (
      event: Omit<
        ToolEvent,
        "id" | "at"
      >,
    ) => {
      setEvents((current) =>
        [
          {
            ...event,
            id: eventId(),
            at: Date.now(),
          },
          ...current,
        ].slice(0, 12),
      );
    },
    [],
  );

  const connect = useCallback(async () => {
    if (
      status === "connecting" ||
      status === "connected"
    ) {
      return;
    }

    setStatus("connecting");
    setError(null);
    setSent(false);
    setConfirmationRequested(false);

    const client =
      new MyriaContactRealtimeClient({
        onInquiryPatch: (patch) => {
          setInquiry((current) => ({
            ...current,
            ...patch,
          }));
        },

        onConfirmationRequested: () => {
          setConfirmationRequested(true);

          pushEvent({
            name: "confirmation",
            label:
              "Waiting for your confirmation",
            status: "info",
          });
        },

        onHistory: (history) => {
          setTranscript(
            historyToTranscript(history),
          );
        },

        onToolStart: (name) => {
          pushEvent({
            name,
            label:
              toolLabels[name] ?? name,
            status: "running",
          });
        },

        onToolEnd: (name) => {
          pushEvent({
            name,
            label:
              toolLabels[name] ?? name,
            status: "completed",
          });
        },

        onActivity: markActivity,

        onError: (cause) => {
          const message =
            errorMessage(cause);

          console.error(
            "Realtime session error:",
            message,
            cause,
          );

          /**
           * This error means a second response was
           * requested while the current assistant
           * response was still active.
           *
           * It does not necessarily mean the realtime
           * connection itself has failed, so do not
           * close the session.
           */
          if (isActiveResponseError(message)) {
            console.warn(
              "Ignored duplicate realtime response request because another response is already active.",
            );

            return;
          }

          clientRef.current?.close();
          clientRef.current = null;

          sessionStartedAtRef.current = null;

          setError(
            "The live conversation encountered a connection error.",
          );

          setStatus("error");
        },
      });

    clientRef.current = client;

    try {
      await client.connect();

      sessionStartedAtRef.current =
        Date.now();

      setStatus("connected");

      markActivity();
    } catch (cause) {
      console.error(cause);

      client.close();
      clientRef.current = null;

      sessionStartedAtRef.current = null;

      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to start the conversation.",
      );

      setStatus("error");
    }
  }, [
    markActivity,
    pushEvent,
    status,
  ]);

  const sendText = useCallback(
    (message: string) => {
      const trimmed = message.trim();

      if (
        !trimmed ||
        status !== "connected"
      ) {
        return;
      }

      markActivity();

      clientRef.current?.sendText(
        trimmed,
      );
    },
    [markActivity, status],
  );

  const toggleMute =
    useCallback(async () => {
      if (
        !clientRef.current ||
        status !== "connected"
      ) {
        return;
      }

      const next = !muted;

      try {
        await clientRef.current.setMuted(
          next,
        );

        setMuted(next);

        markActivity();
      } catch (cause) {
        console.error(cause);

        setError(
          "Microphone mute could not be changed.",
        );
      }
    }, [
      markActivity,
      muted,
      status,
    ]);

  const updateInquiry = useCallback(
    (
      patch: Partial<ContactInquiry>,
    ) => {
      setInquiry((current) => ({
        ...current,
        ...patch,
      }));

      /**
       * Editing the inquiry invalidates the
       * previous confirmation state.
       */
      setConfirmationRequested(false);
      setSent(false);
    },
    [],
  );

  const confirmAndSend =
    useCallback(async () => {
      if (sending || sent) {
        return;
      }

      setSending(true);
      setError(null);

      try {
        /**
         * Step 1:
         * Create a short-lived confirmation token
         * for the exact inquiry currently displayed.
         */
        const confirmResponse =
          await fetch(
            "/api/contact/confirm",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                inquiry,
              }),
            },
          );

        const confirmation =
          await confirmResponse.json();

        if (!confirmResponse.ok) {
          throw new Error(
            confirmation?.error ??
              "Unable to confirm message.",
          );
        }

        /**
         * Step 2:
         * Send the confirmed inquiry.
         */
        const sendResponse =
          await fetch(
            "/api/contact/send",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                inquiry,
                confirmationToken:
                  confirmation.token,
              }),
            },
          );

        const result =
          await sendResponse.json();

        if (!sendResponse.ok) {
          throw new Error(
            result?.error ??
              "Unable to send message.",
          );
        }

        setSent(true);
        setConfirmationRequested(false);

        pushEvent({
          name:
            "send_contact_inquiry",
          label:
            "Message sent to Myria",
          status: "completed",
        });

        /**
         * IMPORTANT:
         *
         * Do NOT call client.sendText() here.
         *
         * The agent may still have an active
         * response after the confirmation tool.
         * Sending another message immediately
         * can create:
         *
         * conversation_already_has_active_response
         *
         * The UI confirmation is sufficient.
         */
      } catch (cause) {
        console.error(cause);

        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to send message.",
        );

        pushEvent({
          name:
            "send_contact_inquiry",
          label:
            "Message delivery failed",
          status: "error",
        });
      } finally {
        setSending(false);
      }
    }, [
      inquiry,
      pushEvent,
      sending,
      sent,
    ]);

  useEffect(() => {
    if (
      status !== "connected"
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        const started =
          sessionStartedAtRef.current;

        if (
          started &&
          Date.now() - started >=
            CONTACT_AGENT_CONFIG.maxSessionMs
        ) {
          endSession();
        }
      }, 5_000);

    return () =>
      window.clearInterval(timer);
  }, [
    endSession,
    status,
  ]);

  useEffect(() => {
    return () => {
      clientRef.current?.close();
    };
  }, []);

  return {
    status,
    muted,
    inquiry,
    transcript,
    events,
    confirmationRequested,
    sending,
    sent,
    error,
    silenceWarning,

    connect,
    endSession,
    sendText,
    toggleMute,
    updateInquiry,
    confirmAndSend,
  };
}