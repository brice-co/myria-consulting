"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import type { FractionalCTOContent } from "../types/fractional-cto";

export function FractionalCTOHero({
  content,
}: {
  content: FractionalCTOContent;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6f7d82] transition-colors hover:text-[#173039]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Myria
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65 }}
        className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#173039]/10 bg-[#fffdf8] p-8 shadow-[0_30px_90px_rgba(23,48,57,.08)] md:p-14 lg:p-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(8,118,109,.12),transparent_32%),radial-gradient(circle_at_10%_100%,rgba(183,130,50,.10),transparent_30%)]" />

        <div className="relative max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#08766d]">
            {content.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-[.98] tracking-[-.035em] text-[#173039] md:text-7xl">
            {content.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#66767c] md:text-lg">
            {content.description}
          </p>

          <div className="mt-9 flex flex-wrap items-end gap-6">
            <div>
              <span className="font-serif text-4xl text-[#173039] md:text-5xl">
                {content.price}
              </span>
              <span className="ml-2 text-sm text-[#728086]">
                {content.priceSuffix}
              </span>
            </div>

            <div className="hidden h-10 w-px bg-[#173039]/15 sm:block" />

            <p className="max-w-md text-sm text-[#66767c]">
              {content.engagementSummary}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="mailto:info@myriaconsulting.com?subject=Fractional%20CTO%20inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[#173039] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#173039]/15 bg-white/70 px-6 py-3.5 text-sm font-medium text-[#173039] transition hover:border-[#08766d]/40"
            >
              See how it works
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
