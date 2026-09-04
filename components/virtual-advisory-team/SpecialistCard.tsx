import { ArrowRight, BrainCircuit, ChartNoAxesCombined, DatabaseZap, Workflow } from "lucide-react";
import type { SpecialistCard as Specialist } from "@/lib/virtual-advisory-team/types";

const icons = {
  strategy: ChartNoAxesCombined,
  operations: Workflow,
  "people-change": BrainCircuit,
  "ai-data": DatabaseZap,
};

type Props = {
  specialist: Specialist;
  selected: boolean;
  onSelect: () => void;
};

export function SpecialistCard({ specialist, selected, onSelect }: Props) {
  const Icon = icons[specialist.id];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "group rounded-2xl border p-5 text-left transition",
        selected
          ? "border-cyan-400/50 bg-cyan-400/[0.07] shadow-lg shadow-cyan-500/5"
          : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
        {specialist.shortRole}
      </div>

      <h3 className="mt-1 text-lg font-semibold">{specialist.name}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {specialist.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {specialist.focus.map((item) => (
          <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-500">
            {item}
          </span>
        ))}
      </div>
    </button>
  );
}
