"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const USE_CASES = [
  {
    title: "Customer Support Automation",
    description:
      "Voice agents handling inbound support, triage, and resolution — integrated directly with internal systems.",
    points: [
      "Intent detection & ticket routing",
      "CRM & knowledge base integration",
      "Escalation to live agents",
      "Structured logging & QA review",
    ],
  },
  {
    title: "Sales Qualification & Conversion",
    description:
      "Realtime voice systems qualifying leads, answering product questions, and routing high-intent prospects.",
    points: [
      "Dynamic qualification flows",
      "Calendar & CRM integration",
      "Barge-in & objection handling",
      "Conversation scoring & analytics",
    ],
  },
  {
    title: "Operational Workflow Assistants",
    description:
      "Internal voice systems embedded into operational processes to reduce friction and accelerate decisions.",
    points: [
      "Secure internal tool execution",
      "Workflow orchestration",
      "Data retrieval across systems",
      "Audit trails & compliance logging",
    ],
  },
  {
    title: "Appointment Booking & Scheduling",
    description:
      "Voice-driven booking flows with calendar sync, confirmations, and automated reminders.",
    points: [
      "Real-time availability checks",
      "Rescheduling & cancellation handling",
      "Multi-location logic",
      "SMS/email confirmations",
    ],
  },
  {
    title: "Intelligent Triage Systems",
    description:
      "Structured intake conversations for healthcare, field services, legal, or enterprise support environments.",
    points: [
      "Decision-tree + AI hybrid logic",
      "Risk flag detection",
      "Escalation triggers",
      "Structured summary generation",
    ],
  },
  {
    title: "Premium Customer Experiences",
    description:
      "High-trust, human-like voice interactions for high-value customer segments.",
    points: [
      "Ultra-low latency voice streaming",
      "Emotion-aware routing",
      "Priority service logic",
      "White-glove conversational design",
    ],
  },
];

export default function UseCases() {
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
          Where Voice AI
          <br />
          Creates Measurable Impact
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Voice AI becomes powerful when it is embedded into real workflows —
          not deployed as a novelty layer.
          These are the environments where we see consistent,
          measurable business value.
        </motion.p>
      </section>

      {/* USE CASE GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <div className="grid gap-16 md:grid-cols-2">

          {USE_CASES.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-medium">
                {useCase.title}
              </h2>

              <p className="text-white/60 leading-relaxed">
                {useCase.description}
              </p>

              <ul className="space-y-3 text-white/50 text-sm">
                {useCase.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/10" />
            </motion.div>
          ))}

        </div>
      </section>

      {/* STRATEGIC NOTE */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Designed Around Workflows — Not Demos
        </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          The most successful AI systems are not the most advanced —
          they are the most integrated.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          We design voice systems around operational leverage,
          governance boundaries, and measurable outcomes —
          ensuring they become durable infrastructure,
          not experimental features.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <Link
          href="/work-with-us"
          className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
        >
          Discuss your use case
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </Link>
      </section>

    </main>
  );
}
