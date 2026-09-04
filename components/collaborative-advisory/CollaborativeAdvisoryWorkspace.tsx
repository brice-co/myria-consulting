"use client";

import { LiveList } from "@liveblocks/client";
import { useMutation, useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { Check, Copy, Link2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_SESSION_MS } from "@/lib/collaborative-advisory/config";
import { SilenceTimeout } from "@/lib/collaborative-advisory/silence-timeout";
import type { CollaborativeAdvisoryRealtimeClient } from "@/lib/collaborative-advisory/realtime-client";
import type {
  ParticipantContext,
  RuntimeEvent,
  SpecialistId,
  TranscriptItem,
  VoiceStatus,
  WorkspaceItem,
} from "@/lib/collaborative-advisory/types";

import { AdvisoryTeamPanel } from "./AdvisoryTeamPanel";
import { CommentsPanel } from "./CommentsPanel";
import { ParticipantBar } from "./ParticipantBar";
import { VoicePanel } from "./VoicePanel";
import { WorkspaceBoard } from "./WorkspaceBoard";

type Props = {
  sessionId: string;
};

function workspaceKey(item: WorkspaceItem) {
  if (item.category === "insight") return "insights" as const;
  if (item.category === "opportunity") return "opportunities" as const;
  if (item.category === "decision") return "decisions" as const;
  return "actions" as const;
}

export function CollaborativeAdvisoryWorkspace({ sessionId }: Props) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [activeAgent, setActiveAgent] = useState<SpecialistId>("lead");
  const [events, setEvents] = useState<RuntimeEvent[]>([]);
  const [selectedItem, setSelectedItem] = useState<WorkspaceItem | null>(null);
  const [warning, setWarning] = useState<number | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);

  const [myPresence] = useMyPresence();
  const others = useOthers();

  const clientRef = useRef<CollaborativeAdvisoryRealtimeClient | null>(null);
  const silenceRef = useRef<SilenceTimeout | null>(null);
  const maxRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousParticipantsRef = useRef("");

  const participants: ParticipantContext[] = [
    {
      name:
        typeof myPresence.name === "string" && myPresence.name.trim()
          ? myPresence.name
          : "Guest",
      role:
        typeof myPresence.role === "string" && myPresence.role.trim()
          ? myPresence.role
          : "Participant",
    },
    ...others.map((other) => ({
      name:
        typeof other.presence.name === "string" && other.presence.name.trim()
          ? other.presence.name
          : "Guest",
      role:
        typeof other.presence.role === "string" && other.presence.role.trim()
          ? other.presence.role
          : "Participant",
    })),
  ];

  const participantSignature = participants
    .map((participant) => `${participant.name}:${participant.role}`)
    .sort()
    .join("|");

  const addWorkspaceItem = useMutation(
    ({ storage }, item: WorkspaceItem) => {
      const list = storage.get(workspaceKey(item)) as unknown as LiveList<WorkspaceItem>;

      if (list.findIndex((current) => current.id === item.id) === -1) {
        list.push(item);
      }
    },
    [],
  );

  const push = useCallback((next: RuntimeEvent) => {
    setEvents((current) => [next, ...current].slice(0, 40));
  }, []);

  const copyInviteLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setInviteCopied(true);

      push({
        id: crypto.randomUUID(),
        type: "system",
        title: "Invite link copied",
        detail: "Share this link with participants to join the same advisory room.",
        at: Date.now(),
      });

      if (copyResetRef.current) clearTimeout(copyResetRef.current);

      copyResetRef.current = setTimeout(() => {
        setInviteCopied(false);
        copyResetRef.current = null;
      }, 2500);
    } catch {
      push({
        id: crypto.randomUUID(),
        type: "error",
        title: "Unable to copy invite link",
        detail: "Copy the current browser URL manually and share it with the participant.",
        at: Date.now(),
      });
    }
  }, [push]);

  const clearTimers = useCallback(() => {
    silenceRef.current?.stop();
    silenceRef.current = null;

    if (maxRef.current) {
      clearTimeout(maxRef.current);
      maxRef.current = null;
    }
  }, []);

  const end = useCallback(
    (next: VoiceStatus = "idle") => {
      clearTimers();
      clientRef.current?.disconnect();
      clientRef.current = null;
      setMuted(false);
      setWarning(null);
      setStatus(next);
    },
    [clearTimers],
  );

  const resetActivity = useCallback(() => {
    setWarning(null);
    silenceRef.current?.reset();
  }, []);

  const start = useCallback(async () => {
    clearTimers();
    setTranscript([]);
    setEvents([]);
    setActiveAgent("lead");

    try {
      const { CollaborativeAdvisoryRealtimeClient } = await import(
        "@/lib/collaborative-advisory/realtime-client"
      );

      const client = new CollaborativeAdvisoryRealtimeClient({
        participants,
        onStatus: setStatus,
        onTranscript: setTranscript,
        onAgentChange: setActiveAgent,
        onWorkspaceItem: addWorkspaceItem,
        onRuntimeEvent: push,
        onActivity: resetActivity,
        onError: (message) => {
          push({
            id: crypto.randomUUID(),
            type: "error",
            title: "Realtime error",
            detail: message,
            at: Date.now(),
          });
        },
      });

      clientRef.current = client;
      await client.connect();

      silenceRef.current = new SilenceTimeout({
        onWarning: setWarning,
        onTimeout: () => end("complete"),
      });

      silenceRef.current.start();

      maxRef.current = setTimeout(() => {
        clientRef.current?.sendMessage(
          "The public demo time limit has been reached. Capture any final decision or next step that has emerged, then give a concise synthesis and one recommended next action. Do not ask another question.",
        );

        setTimeout(() => end("complete"), 9000);
      }, MAX_SESSION_MS);
    } catch (error) {
      setStatus("error");

      push({
        id: crypto.randomUUID(),
        type: "error",
        title: "Connection failed",
        detail:
          error instanceof Error ? error.message : "Unable to start session.",
        at: Date.now(),
      });
    }
  }, [
    addWorkspaceItem,
    clearTimers,
    end,
    participantSignature,
    push,
    resetActivity,
  ]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    clientRef.current?.mute(next);
    setMuted(next);
  }, [muted]);

  // Keep the active advisory session aware of Liveblocks participant changes.
  useEffect(() => {
    if (previousParticipantsRef.current === participantSignature) return;

    const previous = previousParticipantsRef.current;
    previousParticipantsRef.current = participantSignature;

    if (previous) {
      push({
        id: crypto.randomUUID(),
        type: "system",
        title: "Participant room updated",
        detail: `${participants.length} participant${participants.length === 1 ? "" : "s"} currently connected`,
        at: Date.now(),
      });
    }

    clientRef.current?.updateParticipants(participants);
  }, [participantSignature, participants.length, push]);

  useEffect(() => {
    return () => {
      clearTimers();

      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }

      clientRef.current?.disconnect();
    };
  }, [clearTimers]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-cyan-400">
            Myria Collaborative Advisory Workspace
          </div>

          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Humans and AI specialists, working in the same advisory room.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Participants, voice, specialist handoffs, shared findings,
            validation, comments, decisions, and actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] text-slate-500">
            <Link2 className="h-3.5 w-3.5" />
            <span>Session:</span>
            <span className="max-w-[190px] truncate text-slate-300">{sessionId}</span>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] text-cyan-300">
            {participants.length} participant{participants.length === 1 ? "" : "s"}
          </div>

          <button
            type="button"
            onClick={copyInviteLink}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold transition",
              inviteCopied
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white",
            ].join(" ")}
          >
            {inviteCopied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {inviteCopied ? "Invite Link Copied" : "Copy Invite Link"}
          </button>
        </div>
      </header>

      <div className="mt-6">
        <ParticipantBar />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.55fr]">
        <VoicePanel
          status={status}
          muted={muted}
          transcript={transcript}
          warning={warning}
          onStart={start}
          onMute={toggleMute}
          onEnd={() => end("idle")}
        />

        <AdvisoryTeamPanel activeAgent={activeAgent} />
      </div>

      <div className="mt-5">
        <WorkspaceBoard
          onDiscuss={setSelectedItem}
          onItemAdded={(item) =>
            push({
              id: crypto.randomUUID(),
              type: "workspace",
              title: `${item.category} added by participant`,
              detail: item.title,
              at: Date.now(),
            })
          }
          onItemConfirmed={(item) =>
            push({
              id: crypto.randomUUID(),
              type: "workspace",
              title: `${item.category} confirmed`,
              detail: item.title,
              at: Date.now(),
            })
          }
        />
      </div>

      <div className="mt-5">
        <CommentsPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>

      {events.length > 0 ? (
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">Runtime activity</div>
            <div className="text-[10px] text-slate-600">
              Handoffs · tools · workspace · participants
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {events.slice(0, 12).map((runtimeEvent) => (
              <div
                key={runtimeEvent.id}
                className="rounded-xl border border-white/10 bg-black/10 p-3"
              >
                <div className="text-xs font-semibold">{runtimeEvent.title}</div>
                {runtimeEvent.detail ? (
                  <div className="mt-1 text-[10px] text-slate-600">
                    {runtimeEvent.detail}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
