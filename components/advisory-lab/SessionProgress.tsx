import { Check, Circle } from "lucide-react";
import { ADVISORY_PHASES } from "@/lib/advisory-lab/config";
import { getPhaseIndex } from "@/lib/advisory-lab/phase-utils";
import type { AdvisoryPhaseId } from "@/lib/advisory-lab/types";

export function SessionProgress({ currentPhase, progress }: { currentPhase: AdvisoryPhaseId; progress: number }) {
  const currentIndex = getPhaseIndex(currentPhase);
  const phase = ADVISORY_PHASES[currentIndex];
  return <section className="rounded-2xl border border-white/10 bg-white/[0.035]">
    <div className="border-b border-white/10 px-5 py-4"><h2 className="text-sm font-semibold">Session progress</h2></div>
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-[130px_1fr] md:items-center">
        <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(#27a8ff ${progress}%, rgba(255,255,255,.08) ${progress}% 100%)` }}>
          <div className="grid h-[94px] w-[94px] place-items-center rounded-full bg-[#0a0e22] text-2xl font-semibold">{Math.round(progress)}%</div>
        </div>
        <div><div className="flex flex-wrap items-center gap-3"><h3 className="text-lg font-semibold">{phase.title}</h3><span className="text-sm text-cyan-400">{phase.range}</span></div><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{phase.description}</p></div>
      </div>
      <div className="mt-8 grid grid-cols-6 gap-2">
        {ADVISORY_PHASES.map((item,index)=>{const completed=index<currentIndex; const active=index===currentIndex; return <div key={item.id} className="text-center">
          <div className={["mx-auto grid h-10 w-10 place-items-center rounded-full border text-xs font-semibold transition", completed?"border-cyan-400 bg-cyan-500/15 text-cyan-300":active?"border-indigo-400 bg-indigo-500/20 text-white ring-4 ring-indigo-500/10":"border-white/10 bg-white/[0.05] text-slate-400"].join(" ")}>{completed?<Check className="h-4 w-4"/>:active?index+1:<Circle className="h-3 w-3"/>}</div>
          <div className="mt-3 hidden text-[11px] leading-4 text-slate-300 md:block">{item.shortTitle}</div><div className="mt-1 hidden text-[10px] text-slate-500 lg:block">{item.range}</div>
        </div>})}
      </div>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all" style={{width:`${progress}%`}}/></div>
    </div>
  </section>;
}
