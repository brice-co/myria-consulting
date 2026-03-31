"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ARCHITECTURE_FLOW = [
  {
    number: "01",
    title: "Interface Layer",
    description:
            "User interaction layer across voice, chat, dashboards, or APIs — acting as the entry point into the AI system.",
    points: [
            "Voice (WebRTC, telephony)",
  "         Chat interfaces & copilots",
            "Internal dashboards",
            "API-based system triggers",
  ],
  },
  {
    number: "02",
    title: "Orchestration Layer",
    description:
           "Coordinates system behavior, routing requests, managing context, and enforcing execution boundaries.",
    points: [
           "Conversation & session state",
           "Intent classification & routing",
           "Workflow triggering",
           "Guardrails and fallback logic",
  ],
  },
  {
    number: "03",
    title: "Intelligence Layer",
    description:
            "Combines AI reasoning with structured business logic to enable reliable and explainable decisions.",
    points: [
            "LLM reasoning & prompt design",
            "Context injection & memory use",
            "Hybrid AI + rule-based logic",
            "Confidence scoring & escalation",
  ],
  },

  {
  number: "04",
  title: "Memory Layer",
  description:
    "Manages short-term and long-term context to enable continuity, personalization, and learning.",
  points: [
    "Session memory (short-term)",
    "Persistent knowledge storage",
    "Vector search / retrieval (RAG)",
    "Feedback loops & system learning",
  ],
},
  {
    number: "05",
    title: "Execution Layer",
    description:
           "Handles all system actions through controlled, server-side execution with validation and auditability.",
    points: [
           "CRM & database operations",
           "Scheduling & transactions",
           "Internal APIs & services",
           "Permission validation & logging",
  ],                           
  },
  {
    number: "06",
    title: "Governance & Observability Layer",
    description:
    "Ensures systems remain secure, compliant, and measurable as they scale across the organization.",
    points: [
    "Audit logging & traceability",
    "Cost monitoring & control",
    "Latency & performance tracking",
    "Model/version governance",
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
          AI systems fail when architecture is an afterthought.

          We design layered AI systems with clear boundaries, 
          governance controls, and production-grade execution paths — 
          so they remain reliable, auditable, and scalable over time. 
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
         Designed for Governed AI Systems
      </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          AI systems must be observable, controllable, and auditable.
          Without governance, they introduce risk instead of value.
      </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          We design systems where every interaction, decision, and execution
          can be traced, measured, and improved over time.
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
