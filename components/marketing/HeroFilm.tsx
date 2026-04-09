"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedNetwork } from "@/components/marketing/AnimatedNetwork";
import Image from "next/image";

const LINES = [
  "Most AI systems look impressive.",
  "Few are designed to scale safely.",
  "Without structure, AI becomes operational risk.",
  "What works in pilot often fails in production.",
  "AI is not just a model. It is a system.",
];

export function HeroFilm() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % LINES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[720px] overflow-hidden bg-black">
      <AnimatedNetwork intensity="subtle" />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-4xl">
          <div className="relative h-9 w-9 md:h-10 md:w-10">
            <Image
              src="/Myria.png"
              alt="Myria Consulting"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-6 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0 }}
                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                {LINES[step]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            AI Architecture Labs is a focused 2–4 week advisory engagement that helps
            organizations assess architecture, governance, operational readiness,
            and hidden system risk before scaling further.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/voice-diagnostic/apply"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-500"
            >
              Book an AI Architecture Lab
            </a>

            <a
              href="/deliverable"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              View Sample Deliverables
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}