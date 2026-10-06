import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function ExperienceHeader() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0b6b66]">Conversational AI</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] text-[#173039] md:text-5xl">Conversation becomes a shared place to think and act.</h2>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-[#607276]">Bring customers, employees and specialized AI agents into one live conversation—where context is shared, specialists collaborate, and approved actions can move into enterprise systems.</p>
      </div>
      <div className="divide-y divide-[#173039]/10 border-y border-[#173039]/10 text-xs text-[#29444a]">
        {["Human + AI collaboration", "Specialist agent handoffs", "Context → decision → action"].map((item) => (
          <div key={item} className="flex items-center justify-between py-3"><span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#0b6b66]" />{item}</span><ArrowUpRight className="h-3 w-3 opacity-50" /></div>
        ))}
      </div>
    </div>
  );
}
