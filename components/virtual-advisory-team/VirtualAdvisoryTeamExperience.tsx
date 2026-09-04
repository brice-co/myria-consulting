"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MODE_LABELS, PUBLIC_SESSION_LIMIT_MS, SPECIALIST_LABELS } from "@/lib/virtual-advisory-team/config";
import { SilenceTimeout } from "@/lib/virtual-advisory-team/silence-timeout";
import type {
  AdvisoryInsight,
  AdvisoryMemory,
  SpecialistId,
  SpecialistOutput,
  TeamActivity,
  TeamMetrics,
  TeamMode,
  TranscriptItem,
  VoiceStatus,
} from "@/lib/virtual-advisory-team/types";
import type { AdvisoryTeamRealtimeClient } from "@/lib/virtual-advisory-team/realtime-client";

import { ActivityPanel } from "./ActivityPanel";
import { InsightsPanel } from "./InsightsPanel";
import { OutputsPanel } from "./OutputsPanel";
import { RuntimeMetrics } from "./RuntimeMetrics";
import { SessionControls } from "./SessionControls";
import { TeamGraph } from "./TeamGraph";
import { TeamSelector } from "./TeamSelector";
import { TranscriptPanel } from "./TranscriptPanel";

function makeActivity(
  type: TeamActivity["type"],
  title: string,
  detail?: string,
): TeamActivity {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    detail,
    at: Date.now(),
  };
}

export function VirtualAdvisoryTeamExperience() {
  const [mode, setMode] = useState<TeamMode>("team");
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [insights, setInsights] = useState<AdvisoryInsight[]>([]);
  const [outputs, setOutputs] = useState<SpecialistOutput[]>([]);
  const [memory, setMemory] = useState<AdvisoryMemory | null>(null);
  const [events, setEvents] = useState<TeamActivity[]>([]);
  const [idleWarningSeconds, setIdleWarningSeconds] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<TeamMetrics>({
    activeAgent: "lead",
    lastHandoff: null,
    activeTool: null,
    elapsedMs: 0,
  });

  const clientRef = useRef<AdvisoryTeamRealtimeClient | null>(null);
  const sessionStartedAtRef = useRef<number | null>(null);
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxSessionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceRef = useRef<SilenceTimeout | null>(null);

  const pushEvent = useCallback((event: TeamActivity) => {
    setEvents((current) => [event, ...current].slice(0, 50));
  }, []);

  const clearTimers = useCallback(() => {
    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }

    if (maxSessionRef.current) {
      clearTimeout(maxSessionRef.current);
      maxSessionRef.current = null;
    }

    silenceRef.current?.stop();
    silenceRef.current = null;
  }, []);

  const endSession = useCallback(
    (nextStatus: VoiceStatus = "idle") => {
      clearTimers();
      clientRef.current?.disconnect();
      clientRef.current = null;
      setMuted(false);
      setIdleWarningSeconds(null);
      setStatus(nextStatus);
    },
    [clearTimers],
  );

  const resetActivity = useCallback(() => {
    setIdleWarningSeconds(null);
    silenceRef.current?.reset();
  }, []);

  const start = useCallback(async () => {
    if (status === "connecting" || status === "live") {
      return;
    }

    clearTimers();
    setTranscript([]);
    setInsights([]);
    setOutputs([]);
    setMemory(null);
    setEvents([]);
    setMuted(false);
    setIdleWarningSeconds(null);

    setMetrics({
      activeAgent: mode === "team" ? "lead" : (mode as SpecialistId),
      lastHandoff: null,
      activeTool: null,
      elapsedMs: 0,
    });

    try {
      const { AdvisoryTeamRealtimeClient } = await import(
        "@/lib/virtual-advisory-team/realtime-client"
      );

      const client = new AdvisoryTeamRealtimeClient({
        mode,
        onStatus: setStatus,
        onTranscript: setTranscript,

        onAgentChange: (agent) => {
          setMetrics((current) => ({ ...current, activeAgent: agent }));
          pushEvent(makeActivity("agent", `${SPECIALIST_LABELS[agent]} active`));
        },

        onHandoff: (from, to) => {
          setMetrics((current) => ({ ...current, lastHandoff: `${from} → ${to}` }));
          pushEvent(makeActivity("handoff", `${from} → ${to}`, "Realtime specialist handoff"));
        },

        onToolStart: (toolName, agentName) => {
          const id = crypto.randomUUID();
          setMetrics((current) => ({ ...current, activeTool: toolName }));
          pushEvent(makeActivity("tool-start", toolName, `Started by ${agentName}`));
          return id;
        },

        onToolEnd: (_id, result) => {
          setMetrics((current) => ({ ...current, activeTool: null }));
          pushEvent(makeActivity("tool-end", "Tool completed", result?.slice(0, 180)));
        },

        onInsight: (insight) => {
          setInsights((current) => [insight, ...current]);
          pushEvent(makeActivity("insight", insight.label, insight.value));
        },

        onOutput: (output) => {
          setOutputs((current) => [output, ...current]);
          pushEvent(makeActivity("output", "Specialist output created", output.type));
        },

        onMemoryChange: (nextMemory) => {
          setMemory(nextMemory);
        },

        onActivity: resetActivity,

        onError: (message) => {
          pushEvent(makeActivity("error", "Realtime error", message));
        },
      });

      clientRef.current = client;
      await client.connect();

      sessionStartedAtRef.current = performance.now();

      elapsedTimerRef.current = setInterval(() => {
        const startedAt = sessionStartedAtRef.current;
        if (startedAt === null) return;

        setMetrics((current) => ({
          ...current,
          elapsedMs: performance.now() - startedAt,
        }));
      }, 250);

      silenceRef.current = new SilenceTimeout({
        onWarning: setIdleWarningSeconds,
        onTimeout: () => {
          pushEvent(makeActivity("system", "Session closed", "Inactivity limit reached."));
          endSession("complete");
        },
      });

      silenceRef.current.start();

      maxSessionRef.current = setTimeout(() => {
        clientRef.current?.sendMessage(
          "The public demonstration time limit has been reached. Create a concise cross-specialist synthesis using shared advisory memory. Identify the strongest opportunity, one important uncertainty, and one recommended next step. Do not ask another question.",
        );

        pushEvent(
          makeActivity(
            "system",
            "Demo time limit reached",
            "Myria is preparing a final advisory synthesis.",
          ),
        );

        setTimeout(() => endSession("complete"), 9000);
      }, PUBLIC_SESSION_LIMIT_MS);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start advisory session.";

      pushEvent(makeActivity("error", "Connection failed", message));
      setStatus("error");
    }
  }, [clearTimers, endSession, mode, pushEvent, resetActivity, status]);

  const toggleMute = useCallback(() => {
    if (!clientRef.current) return;

    const next = !muted;
    clientRef.current.mute(next);
    setMuted(next);
  }, [muted]);

  useEffect(() => {
    return () => {
      clearTimers();
      clientRef.current?.disconnect();
      clientRef.current = null;
    };
  }, [clearTimers]);

  const sessionRunning =
    status === "live" ||
    status === "muted" ||
    status === "connecting";

  const selectedDescription = useMemo(() => MODE_LABELS[mode], [mode]);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
      <header className="max-w-4xl">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
          Myria Virtual Advisory Team
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          One business challenge.{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Multiple specialist perspectives.
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
          Meet Myria's virtual specialists individually, or ask the advisory team to assemble the right combination of Strategy, Operations, People & Change, and AI & Data expertise around your challenge.
        </p>
      </header>

      <div className="mt-8">
        <TeamSelector mode={mode} disabled={sessionRunning} onModeChange={setMode} />
      </div>

      <div className="mt-5">
        <SessionControls
          status={status}
          muted={muted}
          idleWarningSeconds={idleWarningSeconds}
          onStart={start}
          onToggleMute={toggleMute}
          onEnd={() => endSession("idle")}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div>
          <TeamGraph activeAgent={metrics.activeAgent} connected={sessionRunning} />
          <RuntimeMetrics metrics={metrics} />
        </div>
        <ActivityPanel activity={events} />
      </div>

      <div className="mt-5 grid min-h-0 gap-5 lg:grid-cols-2">
        <TranscriptPanel transcript={transcript} />
        <InsightsPanel insights={insights} />
      </div>

      <div className="mt-5">
        <OutputsPanel outputs={outputs} />
      </div>

      <footer className="mt-6 text-center text-xs text-slate-600">
        Current experience: {selectedDescription}. Shared memory: {memory ? memory.insights.length + memory.outputs.length : 0} captured items. Public sessions are time-limited and intended to demonstrate the Myria advisory operating model.
      </footer>
    </div>
  );
}
