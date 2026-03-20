"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StructuredStartPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
    
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
        >
          Structured Entry Program
          <br />
          <span className="text-white/60">
            A disciplined first step into enterprise AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Designed for organizations that want to move forward with AI —
          without overcommitting to infrastructure or risking architectural debt.
        </motion.p>
      </section>

      {/* WHO IT’S FOR */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Who This Is For
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-12 text-white/60 text-lg">
          <ul className="space-y-4">
            <li>• Innovation teams piloting AI initiatives</li>
            <li>• Operators exploring voice automation</li>
            <li>• Organizations uncertain about realtime infrastructure</li>
            <li>• Teams needing architectural clarity before scaling</li>
          </ul>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">
              Not Designed For
            </h3>
            <ul className="space-y-4 text-white/50">
              <li>• Rapid demo-only experiments</li>
              <li>• One-week prototype builds</li>
              <li>• Throwaway implementations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT STRUCTURE */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Engagement Structure
        </h2>

        <div className="mt-20 space-y-24">

          {/* Phase 1 */}
          <div>
            <div className="text-sm uppercase tracking-wide text-white/40 mb-3">
              Phase 1 · 1–2 Weeks
            </div>
            <h3 className="text-2xl font-medium">
              Strategic Framing & Architecture
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              We define the outcome, map system boundaries, evaluate risk,
              and establish the architectural foundation before writing code.
            </p>
            <ul className="mt-6 space-y-3 text-white/50 text-sm">
              <li>• Success metrics & ROI definition</li>
              <li>• Use-case validation</li>
              <li>• System & workflow mapping</li>
              <li>• Security & compliance review</li>
            </ul>
            <p className="mt-6 text-white/40 text-sm">
              Deliverable: Architecture brief + implementation roadmap
            </p>
          </div>

          {/* Phase 2 */}
          <div>
            <div className="text-sm uppercase tracking-wide text-white/40 mb-3">
              Phase 2 · 3–6 Weeks
            </div>
            <h3 className="text-2xl font-medium">
              Controlled Build & Deployment
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              We implement a production-ready voice system with governance,
              observability, and clean separation between interface and logic.
            </p>
            <ul className="mt-6 space-y-3 text-white/50 text-sm">
              <li>• Browser-based or structured voice deployment</li>
              <li>• Secure tool execution</li>
              <li>• Intent logging & monitoring</li>
              <li>• Integration with existing systems</li>
            </ul>
            <p className="mt-6 text-white/40 text-sm">
              Deliverable: Production-ready controlled deployment
            </p>
          </div>

          {/* Phase 3 */}
          <div>
            <div className="text-sm uppercase tracking-wide text-white/40 mb-3">
              Phase 3 · Evaluation & Scale Path
            </div>
            <h3 className="text-2xl font-medium">
              Expansion Blueprint
            </h3>
            <p className="mt-4 max-w-3xl text-white/60 leading-relaxed">
              We analyze performance, refine system behavior, and design
              the roadmap toward realtime infrastructure, multi-agent systems,
              or enterprise platform expansion.
            </p>
            <ul className="mt-6 space-y-3 text-white/50 text-sm">
              <li>• Conversation quality analysis</li>
              <li>• Infrastructure decision framework</li>
              <li>• Governance & scaling roadmap</li>
            </ul>
            <p className="mt-6 text-white/40 text-sm">
              Deliverable: Enterprise expansion blueprint
            </p>
          </div>

        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What You Walk Away With
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-10 text-white/60 text-lg">
          <ul className="space-y-4">
            <li>• Production voice system</li>
            <li>• Architectural documentation</li>
            <li>• Governance framework</li>
          </ul>

          <ul className="space-y-4">
            <li>• Structured logging & monitoring</li>
            <li>• Clear infrastructure roadmap</li>
            <li>• Foundation for multi-agent expansion</li>
          </ul>
        </div>
      </section>

      {/* RISK MITIGATION */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Designed to Minimize Regret
        </h2>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          No vendor lock-in. No irreversible infrastructure decisions.
          No architectural dead ends.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Every component is structured to evolve —
          ensuring that your first deployment becomes a durable foundation,
          not a discarded experiment.
        </p>

        <div className="mt-12">
          <Link
            href="/customer-support"
            className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
          >
            Try our starting point demo
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

    </main>
  );
}
