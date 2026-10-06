import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { UseCase } from "@/data/use-cases";
import { MotionReveal } from "./motion-reveal";
export function UseCaseHero({ useCase }: { useCase: UseCase }) {
 const Icon=useCase.icon;
 return <section className="border-b border-[#12313a]/15 bg-[#f6f1e7]">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-8 lg:py-24">
   <MotionReveal>
    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[.28em] text-[#b9802c]"><span className="h-px w-10 bg-[#b9802c]" />{useCase.eyebrow}</div>
    <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-.035em] text-[#12313a] sm:text-6xl lg:text-7xl">{useCase.statement}</h1>
    <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5f6b6f]">{useCase.description}</p>
    <div className="mt-8 flex flex-wrap gap-3"><Link href="/experience/interactive-workspace" className="inline-flex items-center gap-2 rounded-full bg-[#b9802c] px-5 py-3 text-sm font-semibold text-white">Experience Myria <ArrowUpRight className="size-4" /></Link><Link href="#decision-map" className="inline-flex items-center gap-2 rounded-full border border-[#12313a]/15 bg-[#fbf8f1] px-5 py-3 text-sm font-semibold text-[#12313a]">See the decision map <ArrowDown className="size-4" /></Link></div>
   </MotionReveal>
   <MotionReveal delay={.12} className="rounded-[30px] border border-[#12313a]/15 bg-[#fbf8f1] p-7 shadow-[0_24px_70px_rgba(18,49,58,.06)] sm:p-9">
    <div className="flex size-12 items-center justify-center rounded-full bg-[#5f8e87]/15 text-[#12313a]"><Icon className="size-5" /></div>
    <p className="mt-8 text-[10px] uppercase tracking-[.24em] text-[#b9802c]">Business use case</p><h2 className="mt-3 font-serif text-3xl text-[#12313a]">{useCase.title}</h2>
    <div className="mt-7 border-t border-[#12313a]/10 pt-6"><p className="text-xs uppercase tracking-[.16em] text-[#5f6b6f]">Myria lens</p><p className="mt-3 text-lg leading-7 text-[#12313a]">Business problem → decisions → exceptions → AI opportunity → governed action.</p></div>
   </MotionReveal>
  </div>
 </section>;
}
