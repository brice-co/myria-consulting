import { BrainCircuit, ChartNoAxesCombined, DatabaseZap, Sparkles, Workflow } from "lucide-react";
import type { SpecialistId } from "@/lib/collaborative-advisory/types";

const advisors = [
  { id: "lead", label: "Myria", icon: Sparkles },
  { id: "strategy", label: "Strategy", icon: ChartNoAxesCombined },
  { id: "operations", label: "Operations", icon: Workflow },
  { id: "people-change", label: "People & Change", icon: BrainCircuit },
  { id: "ai-data", label: "AI & Data", icon: DatabaseZap },
] as const;

export function AdvisoryTeamPanel({ activeAgent }: { activeAgent: SpecialistId }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-3 text-sm font-semibold">Virtual Advisory Team</div>
      <div className="space-y-2">
        {advisors.map(({ id, label, icon: Icon }) => {
          const active = activeAgent === id;
          return (
            <div key={id} className={`flex items-center gap-3 rounded-2xl border px-3 py-3 ${active ? "border-cyan-400/50 bg-cyan-400/[0.08]" : "border-white/10 bg-black/10"}`}>
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${active ? "bg-gradient-to-br from-indigo-500 to-cyan-400" : "bg-white/[0.05] text-slate-500"}`}><Icon className="h-4 w-4" /></div>
              <div><div className="text-xs font-semibold">{label}</div><div className="text-[10px] text-slate-600">{active ? "Active now" : "Available"}</div></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
