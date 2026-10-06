const stages = ["Business problem", "Discovery", "Value-chain context", "Decisions & exceptions", "AI opportunity", "Solution architecture"];
export function PlaybookLearningPath() {
  return (
    <section className="border-y border-[#ded9cd] bg-[#f2eee4]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0b7c78]">The business-first path</p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Move from an operating problem to an architecture that can create value.</h2>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {stages.map((stage, i) => <div key={stage} className="flex items-center gap-2"><span className="rounded-full border border-[#d0cabd] bg-[#f8f5ed] px-4 py-2 text-xs font-medium">{stage}</span>{i < stages.length-1 ? <span className="text-[#c18a3a]">→</span> : null}</div>)}
        </div>
      </div>
    </section>
  );
}
