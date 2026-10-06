import { Briefcase, CheckCircle2 } from "lucide-react";

import { Reveal } from "./reveal";

export function DeliverablesPanel({
  deliverables,
}: {
  deliverables: string[];
}) {
  return (
    <Reveal>
      <article className="rounded-3xl border border-[#173039]/10 bg-[#173039] p-8 text-white md:p-10">
        <div className="mb-7 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
            <Briefcase className="h-5 w-5 text-[#d4a457]" />
          </div>
          <h2 className="font-serif text-3xl">What you get</h2>
        </div>

        <ul className="space-y-3">
          {deliverables.map((deliverable) => (
            <li key={deliverable} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8fc7bd]" />
              <span className="leading-6 text-white/72">{deliverable}</span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
