import { CheckCircle2 } from "lucide-react";
import type { AdvisoryInsight } from "@/lib/virtual-advisory-team/types";

export function InsightsPanel({ insights }: { insights: AdvisoryInsight[] }) {
  return (
    <section className="flex h-[430px] min-h-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="shrink-0 border-b border-white/10 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Advisory memory</div>
        <h2 className="mt-1 text-sm font-semibold">Captured insights</h2>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
        {insights.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm leading-6 text-slate-500">
            Decision-useful insights captured by the advisory team will appear here.
          </div>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">{insight.label}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{insight.value}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
