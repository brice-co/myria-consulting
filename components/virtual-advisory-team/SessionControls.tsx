import { Mic, MicOff, PhoneOff } from "lucide-react";
import type { VoiceStatus } from "@/lib/virtual-advisory-team/types";

type Props = {
  status: VoiceStatus;
  muted: boolean;
  idleWarningSeconds: number | null;
  onStart: () => void;
  onToggleMute: () => void;
  onEnd: () => void;
};

export function SessionControls({ status, muted, idleWarningSeconds, onStart, onToggleMute, onEnd }: Props) {
  const live = status === "live" || status === "muted";

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold">
          {live ? (muted ? "Microphone muted" : "Advisory session live") : status === "connecting" ? "Connecting..." : "Ready to meet the team"}
        </div>
        <div className="mt-1 text-xs text-slate-500">
          {idleWarningSeconds ? `Session will close after ${idleWarningSeconds}s of inactivity.` : "Public demo sessions are automatically time-limited."}
        </div>
      </div>

      <div className="flex gap-2">
        {!live ? (
          <button
            type="button"
            disabled={status === "connecting"}
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            <Mic className="h-4 w-4" />
            Start conversation
          </button>
        ) : (
          <>
            <button type="button" onClick={onToggleMute} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300">
              {muted ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              {muted ? "Unmute" : "Mute"}
            </button>
            <button type="button" onClick={onEnd} className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200">
              <PhoneOff className="h-4 w-4" />
              End
            </button>
          </>
        )}
      </div>
    </div>
  );
}
