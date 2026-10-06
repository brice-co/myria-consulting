import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "./reveal";

export function FractionalCTOCTA() {
  return (
    <section className="mt-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#173039]/10 bg-[#fffdf8] px-8 py-14 text-center md:px-14 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(8,118,109,.14),transparent_38%)]" />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#b78232]">
              Fractional CTO
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl tracking-[-.025em] text-[#173039] md:text-5xl">
              Need a technical partner for your AI-native team?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#68777d]">
              Start with a 30-minute conversation. We&apos;ll scope the
              engagement around your most pressing leadership, hiring or
              architecture challenge.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:info@myriaconsulting.com?subject=Fractional%20CTO%20inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-[#173039] px-7 py-3.5 text-sm font-medium text-white"
              >
                Book the Fractional CTO
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/"
                className="rounded-full border border-[#173039]/15 px-7 py-3.5 text-sm font-medium text-[#173039]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
