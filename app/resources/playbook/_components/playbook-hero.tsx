import Link from "next/link";
import type { PlaybookContent } from "../_types/playbook";

export function PlaybookHero({ playbook }: { playbook: PlaybookContent }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28 lg:pt-24">
      <div>
        <Link href="/" className="text-sm text-[#667274] transition hover:text-[#0b7c78]">
          ← Back to Myria 
        </Link>
        <p className="mt-14 text-xs font-semibold uppercase tracking-[0.26em] text-[#0b7c78]">{playbook.eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] md:text-7xl">{playbook.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#667274]">{playbook.description}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#preview" className="rounded-full bg-[#173039] px-6 py-3 text-sm font-semibold text-[#f8f5ed]">Explore what’s inside →</a>
          <a href="#get-playbook" className="rounded-full border border-[#c9c5b9] px-6 py-3 text-sm font-semibold">Get the full Playbook</a>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[34px] bg-[#173039] p-8 text-[#f8f5ed] shadow-[0_30px_80px_rgba(23,48,57,0.16)] md:p-11">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#31565d]" />
        <div className="absolute -right-8 top-14 h-48 w-48 rounded-full border border-[#31565d]" />
        <p className="relative text-xs uppercase tracking-[0.24em] text-[#c18a3a]">Myria Thinking</p>
        <div className="relative mt-20 border-l border-[#c18a3a] pl-6">
          <p className="text-sm uppercase tracking-[0.18em] text-[#9fb1b2]">The</p>
          <h2 className="mt-2 font-serif text-5xl leading-[0.96]">AI-Enabled<br/>Enterprise</h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#c9d3d2]">A practical playbook for designing the next operating model.</p>
        </div>
        <p className="relative mt-24 text-xs uppercase tracking-[0.18em] text-[#9fb1b2]">Myria Consulting · Business First.</p>
      </div>
    </section>
  );
}
