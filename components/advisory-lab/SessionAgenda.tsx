import { CheckCircle2, Circle } from "lucide-react";
import { ADVISORY_PHASES } from "@/lib/advisory-lab/config";
import { getPhaseIndex } from "@/lib/advisory-lab/phase-utils";
import type { AdvisoryPhaseId } from "@/lib/advisory-lab/types";

export function SessionAgenda({ currentPhase }: { currentPhase: AdvisoryPhaseId }) {
  const currentIndex=getPhaseIndex(currentPhase);
  return <section className="rounded-2xl border border-white/10 bg-white/[0.035]">
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 className="text-sm font-semibold">Session agenda</h2><span className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-slate-300">Phase {currentIndex+1} of 6</span></div>
    <div className="space-y-4 p-5">{ADVISORY_PHASES.map((phase,index)=>{const completed=index<currentIndex; const active=index===currentIndex; return <div key={phase.id} className="flex items-start gap-3">
      {completed?<CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400"/>:active?<div className="mt-0.5 h-4 w-4 rounded-full border-4 border-cyan-400 bg-white"/>:<Circle className="mt-0.5 h-4 w-4 text-slate-600"/>}
      <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><span className={active?"text-sm font-semibold text-white":"text-sm text-slate-300"}>{phase.title}</span><span className={active?"shrink-0 text-[11px] text-cyan-400":"shrink-0 text-[11px] text-slate-500"}>{phase.range}</span></div>{active?<p className="mt-1 text-xs leading-5 text-slate-500">{phase.description}</p>:null}</div>
    </div>})}</div>
  </section>;
}
