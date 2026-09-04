import { SPECIALIST_LABELS } from "@/lib/virtual-advisory-team/config";
import type { TeamMetrics } from "@/lib/virtual-advisory-team/types";

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function RuntimeMetrics({ metrics }: { metrics: TeamMetrics }) {
  const items = [
    { label: "Active Advisor", value: SPECIALIST_LABELS[metrics.activeAgent] },
    { label: "Last Handoff", value: metrics.lastHandoff ?? "—" },
    { label: "Active Tool", value: metrics.activeTool ?? "—" },
    { label: "Elapsed", value: formatElapsed(metrics.elapsedMs) },
  ];

  return (
    <div className="grid border-x border-b border-white/10 bg-white/[0.025] sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="border-b border-white/10 px-5 py-4 sm:border-r xl:border-b-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">{item.label}</div>
          <div className="mt-1 truncate text-sm font-semibold text-slate-200">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
