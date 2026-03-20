"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StartLeanSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute right-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Hero */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
        >
          Start Lean.
          <br />
          Preserve the Architecture.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Not every organization needs real-time infrastructure on day one.
          But every organization needs the right system boundaries.
        </motion.p>

        {/* Core Thesis */}
        <div className="mt-20 border-t border-white/10 pt-16 space-y-12">

        <div>
            <h3 className="text-2xl font-medium">
              Momentum Without Compromise
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              Many organizations want to explore voice — but hesitate because of cost, complexity, or uncertainty.

              We help you start with a browser-based voice MVP that delivers value quickly, while being architected for future growth.

              No throwaway prototypes.
              No dead-end decisions.
              Just a clear path from first iteration to trusted system.
            </p>
        </div>

          <div>
            <h3 className="text-2xl font-medium">
              A Controlled Entry Point
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              We design browser-based or semi-realtime voice systems
              that validate real business outcomes without committing
              prematurely to complex infrastructure.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-medium">
              Structured for Evolution
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              Voice, orchestration logic, and tool execution are separated
              from the start — ensuring your first iteration becomes
              a foundation, not a rewrite.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-medium">
              Risk-Aware from Day One
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              Even early deployments include structured logging,
              access controls, and architectural boundaries
              that support eventual enterprise scale.
            </p>
          </div>
        </div>

        {/* Evolution Path Diagram */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <h3 className="text-2xl font-medium">
            A Path That Scales With You
          </h3>

          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-10 text-white/60">

            <div>
              <div className="text-sm text-white/40 uppercase tracking-wide mb-2">
                Phase 1
              </div>
              <p>Browser / Controlled Voice Deployment</p>
            </div>

            <div className="hidden md:block h-px w-12 bg-white/20" />

            <div>
              <div className="text-sm text-white/40 uppercase tracking-wide mb-2">
                Phase 2
              </div>
              <p>Workflow & Multi-Agent Expansion</p>
            </div>

            <div className="hidden md:block h-px w-12 bg-white/20" />

            <div>
              <div className="text-sm text-white/40 uppercase tracking-wide mb-2">
                Phase 3
              </div>
              <p>Realtime Infrastructure & Enterprise Governance</p>
            </div>

          </div>
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-4xl"
        >
          <p className="text-lg text-white/60 leading-relaxed">
            Many teams either over-engineer too early or hesitate entirely.
            The right approach balances momentum with architectural integrity.
          </p>

          <div className="mt-12">
            <Link
              href="/structured-start"
              className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
            >
              Explore a structured starting point
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
