"use client";

import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useEffect, useRef } from "react";
import type { TranscriptItem, VoiceStatus } from "@/lib/collaborative-advisory/types";

export function VoicePanel({ status, muted, transcript, warning, onStart, onMute, onEnd }: {
  status: VoiceStatus; muted: boolean; transcript: TranscriptItem[]; warning: number | null;
  onStart: () => void; onMute: () => void; onEnd: () => void;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [transcript]);
  const live = status === "live" || status === "muted";

  return (
    <section className="flex h-[540px] min-h-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-5 py-4"><div className="text-[10px] uppercase tracking-[.18em] text-cyan-400">Voice Advisory</div><div className="mt-1 text-sm font-semibold">Live conversation</div></div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
        {transcript.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-500">Start the voice session. Myria will facilitate and bring in specialists when useful.</div> : transcript.map((item) => <div key={item.id} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "assistant" ? "bg-white/[0.05] text-slate-200" : "ml-auto bg-indigo-500/20 text-indigo-50"}`}>{item.text}</div>)}
        <div ref={endRef} />
      </div>
      <div className="border-t border-white/10 p-4">
        {warning && <div className="mb-2 text-center text-[11px] text-amber-300">Closing after {warning}s of inactivity.</div>}
        <div className="flex justify-center gap-2">
          {!live ? <button disabled={status === "connecting"} onClick={onStart} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 text-xs font-semibold"><Mic className="h-4 w-4" />{status === "connecting" ? "Connecting..." : "Start session"}</button> : <><button onClick={onMute} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs">{muted ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}{muted ? "Unmute" : "Mute"}</button><button onClick={onEnd} className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2.5 text-xs text-red-200"><PhoneOff className="h-4 w-4" />End</button></>}
        </div>
      </div>
    </section>
  );
}
