import { scenarios } from "../data/demo";
import type { ScenarioId } from "../types/conversation";

export function ScenarioRail({ active, onChange }: { active: ScenarioId; onChange: (id: ScenarioId) => void }) {
  return <div className="flex flex-wrap items-center gap-2 border-t border-[#173039]/10 bg-[#f8f5ef] px-5 py-4"><span className="mr-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#7d8a8c]">Try a scenario</span>{(Object.keys(scenarios) as ScenarioId[]).map((id)=><button key={id} onClick={()=>onChange(id)} className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold transition ${active===id ? "border-[#0b6b66] bg-[#0b6b66] text-white" : "border-[#173039]/15 bg-white text-[#52666a] hover:border-[#0b6b66]/50"}`}>{scenarios[id].label}</button>)}</div>;
}
