"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ARCHITECTURE_FLOW = [
  {
    number: "01",
    title: "User Interface Layer",
    description:
      "Voice entry begins at the edge — browser, phone, embedded device, or application interface.",
    points: [
      "WebRTC or telephony integration",
      "Speech-to-Text processing",
      "Interrupt & barge-in handling",
      "Session state initialization",
    ],
  },
  {
    number: "02",
    title: "Orchestration Layer",
    description:
      "The orchestration layer coordinates conversation state, intent routing, and system boundaries.",
    points: [
      "Conversation memory management",
      "Intent classification & routing",
      "Workflow trigger mapping",
      "Fallback & guardrail logic",
    ],
  },
  {
    number: "03",
    title: "Reasoning & Intelligence Layer",
    description:
      "LLM-based reasoning augmented with structured business logic and deterministic controls.",
    points: [
      "Prompt engineering & context injection",
      "Tool selection & validation",
      "Hybrid rule-based + AI logic",
      "Confidence scoring & escalation rules",
    ],
  },
  {
    number: "04",
    title: "Secure Tool Execution Layer",
    description:
      "All external actions execute server-side with validation, logging, and permission boundaries.",
    points: [
      "CRM & database access",
      "Calendar & scheduling systems",
      "Internal APIs & microservices",
      "Structured audit logging",
    ],
  },
  {
    number: "05",
    title: "Observability & Governance Layer",
    description:
      "Continuous monitoring ensures reliability, compliance, and long-term scalability.",
    points: [
      "Structured event logging",
      "Latency & performance tracking",
      "Conversation quality analysis",
      "Versioning & deployment control",
    ],
  },
];

export default function Architecture() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
        >
          Architecture
          <br />
          Designed for Production
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Voice systems fail when architecture is an afterthought.
          We design layered AI systems with clear boundaries,
          secure execution paths, and long-term governance in mind.
        </motion.p>
      </section>

      {/* ARCHITECTURE FLOW */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <div className="relative">

          {/* Vertical spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-28">

            {ARCHITECTURE_FLOW.map((layer, index) => (
              <motion.div
                key={layer.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-2 gap-16 items-start"
              >
                {/* Layer Indicator */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-14 w-14 rounded-full bg-black border border-white/20 text-sm font-medium">
                  {layer.number}
                </div>

                {/* Content */}
                <div className={index % 2 === 0 ? "md:text-right md:pr-20" : "md:order-2 md:pl-20"}>
                  <div className="mt-16 md:mt-0 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {layer.title}
                    </h2>

                    <p className="text-white/60 leading-relaxed">
                      {layer.description}
                    </p>

                    <ul className="space-y-3 text-white/50 text-sm">
                      {layer.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer column */}
                <div className="hidden md:block" />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* SYSTEM PRINCIPLES */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Built for Stability Under Scale
        </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          Every layer is intentionally isolated.
          Execution is server-side.
          Observability is structured.
          Governance is embedded — not bolted on.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          This ensures voice agents remain predictable,
          auditable, and adaptable as your organization grows.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <Link
          href="/work-with-us"
          className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
        >
          Discuss your architecture
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </Link>
      </section>

    </main>
  );
}
