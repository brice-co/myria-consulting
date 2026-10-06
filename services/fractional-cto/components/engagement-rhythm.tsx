import { ArrowRight } from "lucide-react";

import type { RhythmStep } from "../types/fractional-cto";
import { Reveal } from "./reveal";

export function EngagementRhythm({ steps }: { steps: RhythmStep[] }) {
  return (
    <section id="how-it-works" className="mt-32">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#08766d]">
          Engagement rhythm
        </p>
        <h2 className="mt-4 font-serif text-4xl tracking-[-.025em] text-[#173039] md:text-5xl">
          How it works
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.07} className="h-full">
            <article className="relative h-full rounded-2xl border border-[#173039]/10 bg-[#fffdf8] p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#b78232]">
                Step {String(index + 1).padStart(2, "0")}
              </p>

              <div className="mt-4 grid h-9 w-9 place-items-center rounded-lg border border-[#08766d]/20 bg-[#08766d]/8">
                <step.icon className="h-4 w-4 text-[#08766d]" />
              </div>

              <h3 className="mt-4 font-medium text-[#173039]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6d7b80]">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-2.5 top-8 z-10 hidden h-4 w-4 text-[#173039]/25 md:block" />
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
