import type { SpecialistOutput } from "@/lib/virtual-advisory-team/types";

function titleFor(output: SpecialistOutput) {
  switch (output.type) {
    case "strategy-brief":
      return "Strategy Brief";
    case "operations-brief":
      return "Operations Brief";
    case "change-snapshot":
      return "People & Change Snapshot";
    case "ai-data-snapshot":
      return "AI & Data Snapshot";
    case "advisory-summary":
      return "Advisory Summary";
  }
}

export function OutputsPanel({ outputs }: { outputs: SpecialistOutput[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Specialist outputs</div>
        <h2 className="mt-1 text-sm font-semibold">Advisory deliverables</h2>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-2">
        {outputs.length === 0 ? (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-500">
            Specialist briefs and the final advisory synthesis will appear here when created.
          </div>
        ) : (
          outputs.map((output, index) => (
            <div key={`${output.type}-${index}`} className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <div className="text-xs font-semibold text-cyan-300">{titleFor(output)}</div>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-xs leading-5 text-slate-400">
                {JSON.stringify(output.data, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
