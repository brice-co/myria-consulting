"use client";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { CapturedInsights } from "./CapturedInsights";
import { VoiceControls } from "./VoiceControls";
import type { AdvisoryStatus, AdvisoryTranscriptItem, CapturedInsight } from "@/lib/advisory-lab/types";

export function LiveAdvisorySession({ status, muted, transcript, insights, onStart, onToggleMute, onEnd }: { status:AdvisoryStatus; muted:boolean; transcript:AdvisoryTranscriptItem[]; insights:CapturedInsight[]; onStart:()=>void; onToggleMute:()=>void; onEnd:()=>void }) {
  const endRef=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth",block:"end"})},[transcript]);
  return <section className="rounded-2xl border border-white/10 bg-white/[0.035]">
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="text-sm font-semibold">Live advisory session</h2><span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-400">advisory / realtime</span></div>
    <div className="grid min-h-[360px] gap-6 p-6 lg:grid-cols-[1fr_320px]">
      <div className="min-h-0"><div className="flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-xl font-semibold shadow-lg shadow-blue-500/10">M</div><div><div className="flex items-center gap-2 text-sm font-semibold text-cyan-300"><Sparkles className="h-4 w-4"/>Myria</div><div className="text-xs text-slate-500">Lead AI Advisor</div></div></div>
        <div className="mt-5 h-[220px] min-h-0 space-y-3 overflow-y-auto overscroll-contain pr-2">{transcript.length===0?<div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm leading-6 text-slate-500">Start the session and Myria will open with business discovery.</div>:transcript.map((item)=><div key={item.id} className={["max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",item.role==="assistant"?"bg-white/[0.05] text-slate-200":"ml-auto bg-indigo-500/20 text-indigo-50"].join(" ")}>{item.text}</div>)}<div ref={endRef}/></div>
      </div>
      <CapturedInsights insights={insights}/>
    </div>
    <div className="px-6 pb-6"><VoiceControls status={status} muted={muted} onStart={onStart} onToggleMute={onToggleMute} onEnd={onEnd}/></div>
  </section>;
}
