"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { operatingModelPath } from "@/data/ai-enablement";

export function OperatingModelPath() {
  return (
    <section className="mt-28 rounded-[32px] bg-[#17313a] px-7 py-10 text-[#f7f3ec] sm:px-10 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d9a94d]">
            The Myria Approach
          </p>
          <h2 className="mt-4 max-w-md font-serif text-3xl tracking-[-0.02em] sm:text-4xl">
            From AI opportunities to an AI-enabled operating model
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
            Myria helps organizations discover value, design the right
            architecture, connect AI to real work, deploy safely, and evolve
            toward intelligent operations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {operatingModelPath.map(([number, title, description], index) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-5"
            >
              <span className="text-xs font-semibold text-[#8fc0b9]">
                {number}
              </span>
              <h3 className="mt-3 font-serif text-xl">{title}</h3>
              <p className="mt-3 text-xs leading-5 text-white/60">
                {description}
              </p>
              {index < operatingModelPath.length - 1 ? (
                <span className="mt-5 block text-[#d9a94d]">→</span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
        <a
          href="mailto:info@myriaconsulting.com?subject=AI%20Enablement%20Architecture%20Inquiry"
          className="rounded-full bg-[#d19a3a] px-6 py-3 text-sm font-semibold text-[#17313a] transition hover:bg-[#e0aa4c]"
        >
          Explore your AI operating model
        </a>

        <Link
          href="/labs"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Explore the Advisory Labs
        </Link>
      </div>
    </section>
  );
}
