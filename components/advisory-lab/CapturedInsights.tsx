import { Check, Circle } from "lucide-react";
import type { CapturedInsight } from "@/lib/advisory-lab/types";

export function CapturedInsights({ insights }: { insights: CapturedInsight[] }) {
  return <aside className="rounded-2xl border border-white/10 bg-black/10 p-5"><h3 className="text-sm font-semibold">What we've captured</h3><div className="mt-4 space-y-3">{insights.map((insight)=><div key={insight.id} className="flex items-center gap-2 text-xs">{insight.captured?<Check className="h-4 w-4 text-cyan-300"/>:<Circle className="h-3.5 w-3.5 text-slate-600"/>}<span className={insight.captured?"text-slate-200":"text-slate-500"}>{insight.label}</span></div>)}</div></aside>;
}
