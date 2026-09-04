"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ABOUT_MYRIA_AGENT_CONFIG } from "@/config/about-myria-agent";
import { emptyAboutState, type AboutState } from "@/lib/about-myria/about/schema";
import { MyriaAboutRealtimeClient } from "@/lib/about-myria/realtime/myria-about-realtime-client";
import type { ConnectionStatus, ToolEvent, TranscriptItem } from "@/lib/about-myria/realtime/types";

function transcriptFromHistory(history: any[]): TranscriptItem[] {
  return history
    .filter((item) => item?.type === "message")
    .map((item, index) => ({
      id: item.id ?? `${item.role}-${index}`,
      role: (item.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
      text: (item.content ?? [])
        .map((part: any) => part?.text ?? part?.transcript ?? "")
        .filter(Boolean)
        .join(" "),
    }))
    .filter((item) => item.text);
}

const labels: Record<string, string> = {
  get_myria_overview: "Loading Myria overview",
  get_specialist: "Exploring specialist",
  recommend_specialist: "Matching specialist",
  get_ai_enablement_layer: "Exploring AI architecture",
  get_myria_operating_model: "Exploring operating model",
  get_advisory_lab: "Exploring Advisory Lab",
};

export function useAboutMyriaAgent() {
  const clientRef = useRef<MyriaAboutRealtimeClient | null>(null);
  const lastActivity = useRef(Date.now());

  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [state, setState] = useState<AboutState>(emptyAboutState);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [events, setEvents] = useState<ToolEvent[]>([]);
  const [silenceWarning, setSilenceWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markActivity = useCallback(() => {
    lastActivity.current = Date.now();
    setSilenceWarning(false);
  }, []);

  const endSession = useCallback(() => {
    clientRef.current?.close();
    clientRef.current = null;
    setMuted(false);
    setStatus("idle");
  }, []);

  const push = useCallback((name: string, status: ToolEvent["status"]) => {
    setEvents((items) => [{
      id: `${Date.now()}-${Math.random()}`,
      name,
      label: labels[name] ?? name,
      status,
      at: Date.now(),
    }, ...items].slice(0, 10));
  }, []);

  const connect = useCallback(async () => {
    if (status === "connected" || status === "connecting") return;

    setStatus("connecting");
    setError(null);

    const client = new MyriaAboutRealtimeClient({
      onState: (patch) => setState((current) => ({ ...current, ...patch })),
      onHistory: (history) => setTranscript(transcriptFromHistory(history)),
      onToolStart: (name) => push(name, "running"),
      onToolEnd: (name) => push(name, "completed"),
      onActivity: markActivity,
      onError: (cause) => {
        console.error(cause);
        setError("The live conversation encountered a connection error.");
        setStatus("error");
      },
    });

    clientRef.current = client;

    try {
      await client.connect();
      setStatus("connected");
      markActivity();
    } catch (cause) {
      console.error(cause);
      client.close();
      clientRef.current = null;
      setError(cause instanceof Error ? cause.message : "Unable to start About Myria.");
      setStatus("error");
    }
  }, [markActivity, push, status]);

  const sendText = useCallback((message: string) => {
    if (status !== "connected" || !message.trim()) return;
    markActivity();
    clientRef.current?.sendText(message.trim());
  }, [markActivity, status]);

  const toggleMute = useCallback(async () => {
    const next = !muted;
    await clientRef.current?.setMuted(next);
    setMuted(next);
    markActivity();
  }, [markActivity, muted]);

  useEffect(() => {
    if (status !== "connected") return;

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - lastActivity.current;
      if (elapsed >= ABOUT_MYRIA_AGENT_CONFIG.silenceTimeoutMs) {
        endSession();
      } else {
        setSilenceWarning(elapsed >= ABOUT_MYRIA_AGENT_CONFIG.silenceWarningMs);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endSession, status]);

  useEffect(() => () => clientRef.current?.close(), []);

  return {
    status, muted, state, transcript, events, silenceWarning, error,
    connect, endSession, sendText, toggleMute,
  };
}
