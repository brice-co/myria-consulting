import { BrainCircuit, ChartNoAxesCombined, DatabaseZap, Sparkles, Workflow } from "lucide-react";
import type { SpecialistId } from "@/lib/virtual-advisory-team/types";

type Props = {
  activeAgent: SpecialistId;
  connected: boolean;
};

const nodes = [
  { id: "strategy", label: "Strategy", icon: ChartNoAxesCombined },
  { id: "operations", label: "Operations", icon: Workflow },
  { id: "people-change", label: "People & Change", icon: BrainCircuit },
  { id: "ai-data", label: "AI & Data", icon: DatabaseZap },
] as const;

export function TeamGraph({ activeAgent, connected }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Live collaboration</div>
          <h2 className="mt-1 text-sm font-semibold">Advisory Team</h2>
        </div>
        <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-slate-400">
          {connected ? "Realtime" : "Ready"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        <TeamNode label="Myria" active={activeAgent === "lead"} icon={Sparkles} />
        {nodes.map(({ id, label, icon }) => (
          <TeamNode key={id} label={label} active={activeAgent === id} icon={icon} />
        ))}
      </div>
    </section>
  );
}

function TeamNode({ label, active, icon: Icon }: { label: string; active: boolean; icon: any }) {
  return (
    <div className={[
      "rounded-2xl border p-4 transition",
      active
        ? "border-cyan-400/60 bg-cyan-400/[0.10] shadow-lg shadow-cyan-500/10"
        : "border-white/10 bg-[#0a0e22]",
    ].join(" ")}>
      <div className={[
        "grid h-9 w-9 place-items-center rounded-xl",
        active ? "bg-gradient-to-br from-indigo-500 to-cyan-400" : "bg-white/[0.05] text-slate-500",
      ].join(" ")}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-xs font-semibold">{label}</div>
      <div className="mt-1 text-[10px] text-slate-500">{active ? "Active" : "Available"}</div>
    </div>
  );
}
