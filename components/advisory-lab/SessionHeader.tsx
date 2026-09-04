import type { ReactNode } from "react";
import { Clock3, MessageSquareText } from "lucide-react";
import { SESSION_MODE } from "@/lib/advisory-lab/config";
import { formatElapsed } from "@/lib/advisory-lab/phase-utils";

export function SessionHeader({ elapsedMs, questionsAsked }: { elapsedMs: number; questionsAsked: number }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Myria Advisory Lab</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Live AI advisory, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">structured and captured.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
          {SESSION_MODE === "demo" ? "A compressed 3-minute demonstration of Myria's structured 90-minute AI Advisory Lab." : "A structured 90-minute AI Advisory Lab for discovery, workflow analysis, opportunity mapping, architecture, roadmap, and next steps."}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard icon={<Clock3 className="h-5 w-5" />} label="Session time" value={formatElapsed(elapsedMs)} sublabel={SESSION_MODE === "demo" ? "of 03:00 demo" : "of 90:00"} />
        <MetricCard icon={<MessageSquareText className="h-5 w-5" />} label="Questions asked" value={String(questionsAsked)} sublabel="so far" />
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, sublabel }: { icon: ReactNode; label: string; value: string; sublabel: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
    <div className="flex items-center gap-2 text-indigo-400">{icon}<span className="text-xs font-semibold text-slate-300">{label}</span></div>
    <div className="mt-4 text-3xl font-semibold">{value}</div>
    <div className="mt-1 text-xs text-slate-500">{sublabel}</div>
  </div>;
}
