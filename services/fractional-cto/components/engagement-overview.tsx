import { CheckCircle2, Lightbulb, Target } from "lucide-react";

import type { FractionalCTOContent } from "../types/fractional-cto";
import { Reveal } from "./reveal";

export function EngagementOverview({
  content,
}: {
  content: FractionalCTOContent;
}) {
  return (
    <section className="mt-24 grid gap-12 md:grid-cols-2">
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#08766d]/20 bg-[#08766d]/8">
            <Lightbulb className="h-5 w-5 text-[#08766d]" />
          </div>
          <h2 className="font-serif text-3xl text-[#173039]">What it is</h2>
        </div>

        <div className="space-y-4">
          {content.whatItIs.map((paragraph) => (
            <p key={paragraph} className="leading-7 text-[#68777d]">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#b78232]/20 bg-[#b78232]/8">
            <Target className="h-5 w-5 text-[#b78232]" />
          </div>
          <h2 className="font-serif text-3xl text-[#173039]">
            Why teams do it
          </h2>
        </div>

        <ul className="space-y-5">
          {content.reasons.map((reason) => (
            <li key={reason.title} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#08766d]" />
              <div>
                <h3 className="font-medium text-[#173039]">{reason.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#6d7b80]">
                  {reason.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
