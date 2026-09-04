import type { TeamActivity } from "@/lib/virtual-advisory-team/types";

export function ActivityPanel({ activity }: { activity: TeamActivity[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Orchestration</div>
        <h2 className="mt-1 text-sm font-semibold">Runtime activity</h2>
      </div>

      <div className="max-h-[330px] space-y-2 overflow-y-auto p-5">
        {activity.length === 0 ? (
          <p className="text-sm text-slate-500">Agent changes, handoffs, tools, memory updates, and outputs will appear here.</p>
        ) : (
          activity.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-black/10 px-3 py-2.5">
              <div className="text-xs font-semibold text-slate-300">{item.title}</div>
              {item.detail ? <div className="mt-1 text-[11px] leading-5 text-slate-600">{item.detail}</div> : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
