"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedNetwork } from "@/components/marketing/AnimatedNetwork";
import Image from "next/image";

const LINES = [
  "AI is moving from tools to interfaces.",
  "Voice is becoming the new enterprise surface.",
  "Fragmented AI creates risk.",
  "AI must be architected. Not installed.",
  "Designing the Voice-First Enterprise.",
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

      {/* Dark veil for readability */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-4xl">
           <div className="relative w-9 h-9 md:w-10 md:h-10">
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
            Voice-first AI systems designed for governance, integration, and measurable impact.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/voice-strategy-assessment"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-700 px-6 py-3 font-medium text-white hover:bg-blue-400 transition"
            >
              Start with a Voice Strategy Assessment
            </a>
            <a
              href="/deliverable"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition"
            >
              Sample Deliverable
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
