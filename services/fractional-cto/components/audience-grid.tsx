import { ShieldCheck } from "lucide-react";

import type { ContentCard } from "../types/fractional-cto";
import { Reveal } from "./reveal";

export function AudienceGrid({ audiences }: { audiences: ContentCard[] }) {
  return (
    <Reveal delay={0.08}>
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#b78232]/20 bg-[#b78232]/8">
          <ShieldCheck className="h-5 w-5 text-[#b78232]" />
        </div>
        <h2 className="font-serif text-3xl text-[#173039]">Who it is for</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {audiences.map((audience) => (
          <article
            key={audience.title}
            className="rounded-2xl border border-[#173039]/10 bg-[#fffdf8] p-5 transition hover:border-[#08766d]/30"
          >
            <h3 className="font-medium text-[#173039]">{audience.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6d7b80]">
              {audience.description}
            </p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
