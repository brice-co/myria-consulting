"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { LiveAdvisorySession } from "./LiveAdvisorySession";
import { SessionAgenda } from "./SessionAgenda";
import { SessionHeader } from "./SessionHeader";
import { SessionProgress } from "./SessionProgress";

import {
  INITIAL_CAPTURED_INSIGHTS,
  SESSION_DURATION_MS,
} from "@/lib/advisory-lab/config";

import { SilenceTimeout } from "@/lib/advisory-lab/silence-timeout";

import {
  getPhaseFromElapsed,
  getSessionProgress,
} from "@/lib/advisory-lab/phase-utils";

import type {
  AdvisoryStatus,
  AdvisoryTranscriptItem,
  CapturedInsight,
} from "@/lib/advisory-lab/types";

import type { AdvisoryRealtimeClient } from "@/lib/advisory-lab/realtime-client";

export function AdvisoryLabExperience() {
  const [status, setStatus] = useState<AdvisoryStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [transcript, setTranscript] = useState<AdvisoryTranscriptItem[]>([]);
  const [insights, setInsights] = useState<CapturedInsight[]>(
    INITIAL_CAPTURED_INSIGHTS
  );
  const [idleWarning, setIdleWarning] = useState<number | null>(null);

  const clientRef = useRef<AdvisoryRealtimeClient | null>(null);
  const sessionStartedAtRef = useRef<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const silenceTimeoutRef = useRef<SilenceTimeout | null>(null);

  const lastAssistantTextRef = useRef("");
  const endingSessionRef = useRef(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const endSession = useCallback(
    (nextStatus: AdvisoryStatus = "complete") => {
      stopTimer();

      silenceTimeoutRef.current?.stop();

      clientRef.current?.disconnect();
      clientRef.current = null;

      setMuted(false);
      setIdleWarning(null);
      setStatus(nextStatus);
    },
    [stopTimer]
  );

  const resetSilenceTimer = useCallback(() => {
    silenceTimeoutRef.current?.reset();
    setIdleWarning(null);
  }, []);

  const updateInsightCapture = useCallback(
    (items: AdvisoryTranscriptItem[]) => {
      const fullText = items.map((i) => i.text.toLowerCase()).join(" ");

      setInsights((current) =>
        current.map((insight) => {
          let captured = insight.captured;

          if (
            insight.id === "business" &&
            items.some((i) => i.role === "user")
          )
            captured = true;

          if (
            insight.id === "goals" &&
            /(goal|outcome|grow|reduce|improve|increase|target)/i.test(fullText)
          )
            captured = true;

          if (
            insight.id === "workflow" &&
            /(workflow|process|currently|today|manual|step)/i.test(fullText)
          )
            captured = true;

          if (
            insight.id === "challenges" &&
            /(challenge|problem|friction|delay|issue|bottleneck|pain)/i.test(
              fullText
            )
          )
            captured = true;

          if (
            insight.id === "opportunities" &&
            /(opportunity|automation|agent|ai can|use case)/i.test(fullText)
          )
            captured = true;

          if (
            insight.id === "next-steps" &&
            /(next step|roadmap|pilot|mvp|implement)/i.test(fullText)
          )
            captured = true;

          return {
            ...insight,
            captured,
          };
        })
      );
    },
    []
  );

  const startTimer = useCallback(() => {
    stopTimer();

    sessionStartedAtRef.current = performance.now();

    timerRef.current = setInterval(() => {
      const startedAt = sessionStartedAtRef.current;

      if (startedAt === null) return;

      const nextElapsed = performance.now() - startedAt;

      if (nextElapsed >= SESSION_DURATION_MS) {
        setElapsedMs(SESSION_DURATION_MS);

        stopTimer();

        endingSessionRef.current = true;

        clientRef.current?.sendMessage(
          "The advisory session has reached its time limit. Provide a concise executive summary, key findings, strongest AI opportunities, recommended next steps, and conclude the conversation."
        );

        return;
      }

      setElapsedMs(nextElapsed);
    }, 250);
  }, [stopTimer]);

  const start = useCallback(async () => {
    if (status === "connecting" || status === "live") return;

    setElapsedMs(0);
    setQuestionsAsked(0);
    setTranscript([]);
    setInsights(INITIAL_CAPTURED_INSIGHTS);
    setMuted(false);
    setIdleWarning(null);

    endingSessionRef.current = false;
    lastAssistantTextRef.current = "";

    try {
      const { AdvisoryRealtimeClient } = await import(
        "@/lib/advisory-lab/realtime-client"
      );

      silenceTimeoutRef.current?.stop();

      silenceTimeoutRef.current = new SilenceTimeout({
        onWarning: (secondsRemaining) => {
          setIdleWarning(secondsRemaining);
        },

        onTimeout: () => {
          stopTimer();

          clientRef.current?.sendMessage(
            "The participant appears inactive. Provide a concise final summary, identify the strongest AI opportunity discussed, recommend next steps, and conclude the conversation."
          );

          setTimeout(() => {
            endSession("complete");
          }, 5000);
        },
      });

      const client = new AdvisoryRealtimeClient({
        onStatus: setStatus,

        onTranscript: (items) => {
          setTranscript(items);
          updateInsightCapture(items);
        },

        onActivity: () => {
          resetSilenceTimer();
        },

        onAssistantTurn: (text) => {
          if (text === lastAssistantTextRef.current) return;

          lastAssistantTextRef.current = text;

          if (text.includes("?")) {
            setQuestionsAsked((current) => current + 1);
          }

          if (endingSessionRef.current) {
            setTimeout(() => {
              endSession("complete");
            }, 1500);
          }
        },

        onUserTurn: () => {},

        onError: (message) => {
          console.error(message);
        },
      });

      clientRef.current = client;

      await client.connect();

      silenceTimeoutRef.current.start();

      startTimer();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [
    endSession,
    resetSilenceTimer,
    startTimer,
    status,
    stopTimer,
    updateInsightCapture,
  ]);

  const toggleMute = useCallback(() => {
    const client = clientRef.current;

    if (!client) return;

    const next = !muted;

    client.mute(next);

    setMuted(next);
  }, [muted]);

  const end = useCallback(() => {
    endSession("idle");
  }, [endSession]);

  useEffect(() => {
    return () => {
      stopTimer();

      silenceTimeoutRef.current?.stop();

      clientRef.current?.disconnect();
      clientRef.current = null;
    };
  }, [stopTimer]);

  const progress = useMemo(
    () => getSessionProgress(elapsedMs),
    [elapsedMs]
  );

  const currentPhase = useMemo(
    () => getPhaseFromElapsed(elapsedMs),
    [elapsedMs]
  );

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
      <SessionHeader
        elapsedMs={elapsedMs}
        questionsAsked={questionsAsked}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_.95fr]">
        <SessionProgress
          currentPhase={currentPhase.id}
          progress={progress}
        />

        <SessionAgenda currentPhase={currentPhase.id} />
      </div>

      <div className="mt-5">
        <LiveAdvisorySession
          status={status}
          muted={muted}
          transcript={transcript}
          insights={insights}
          onStart={start}
          onToggleMute={toggleMute}
          onEnd={end}
        />
      </div>

      {idleWarning !== null && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Session will end due to inactivity in {idleWarning}s.
        </div>
      )}

      <footer className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-600">
        <ShieldCheck className="h-4 w-4" />
        Your data is handled according to your configured Myria session and
        retention policies.
      </footer>
    </div>
  );
}