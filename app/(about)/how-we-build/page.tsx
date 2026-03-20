"use client";

import { motion } from "framer-motion";
import {
  Search,
  DraftingCompass,
  Cpu,
  Rocket,
  PhoneCallIcon,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";


const phases = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Strategic Framing",
    description:
      "We begin by defining the business outcome, operational constraints, and risk profile before selecting any technology.",
    points: [
      "Success metrics & ROI definition",
      "Voice opportunity validation",
      "User expectations & workflow mapping",
      "Security, compliance & risk surface review",
    ],
  },
  {
    icon: DraftingCompass,
    number: "02",
    title: "System Architecture & Design",
    description:
      "Voice systems succeed or fail at the architecture layer. We design for scale, latency, and governance from day one.",
    points: [
      "Realtime vs async architecture decisions",
      "Latency & interruption strategies",
      "Provider abstraction & hybrid setups",
      "System boundaries & ownership clarity",
    ],
  },
  {
    icon: Cpu,
    number: "03",
    title: "Production Build & Integration",
    description:
      "We build operating systems — not demos — integrated directly into your business infrastructure.",
    points: [
      "Custom agents & orchestration logic",
      "Secure server-side tool execution",
      "Observability & structured logging",
      "CRM, ticketing & internal system integration",
    ],
  },
  {
    icon: Rocket,
    number: "04",
    title: "Controlled Launch & Evolution",
    description:
      "Deployment is structured, measured, and continuously improved — with long-term scalability in mind.",
    points: [
      "Staged rollout & monitoring",
      "Conversation quality analysis",
      "Reliability & performance tuning",
      "Foundation for multi-agent expansion",
    ],
  },
];

export default function HowWeBuildPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
     
      {/* Background */}
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
          A Structured Approach to
          <br />
          Enterprise AI Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Building voice systems isn’t about assembling APIs.
          It’s about deliberate architecture, risk reduction,
          and long-term operational stability.
        </motion.p>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 pb-40">
        <div className="relative">

          {/* Vertical spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-2 gap-12 items-start"
              >
                {/* Phase Indicator */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-black border border-white/20 text-sm font-medium">
                  {phase.number}
                </div>

                {/* Left Spacer */}
                <div className={index % 2 === 0 ? "md:text-right md:pr-16" : "md:order-2 md:pl-16"}>
                  <div className="mt-16 md:mt-0">
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {phase.title}
                    </h2>

                    <p className="mt-4 text-white/60 leading-relaxed">
                      {phase.description}
                    </p>

                    <ul className="mt-6 space-y-3 text-white/50 text-sm">
                      {phase.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK & GOVERNANCE SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Designed to Reduce Risk
        </h2>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Voice systems operate at the edge of your organization —
          interacting directly with customers and internal teams.
          That requires architectural discipline.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Our methodology prioritizes isolation boundaries,
          deterministic fallbacks, structured logging,
          and governance controls from the outset —
          ensuring your AI systems remain stable under scale.
        </p>

        <div className="mt-12">
          <Link
            href="/work-with-us"
            className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
          >
            Discuss your system design
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
      
    </main>
  );
}
