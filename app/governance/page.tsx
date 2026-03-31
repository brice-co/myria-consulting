"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Database, Eye, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";

const GOVERNANCE_LAYERS = [
  {
    icon: Shield,
    title: "Policy & Access Control",
    description:
      "Every AI system operates under defined permissions, role boundaries, and execution constraints.",
    points: [
      "Role-based access control (RBAC)",
      "Tool-level permissioning",
      "System boundary enforcement",
      "Execution scoping per agent",
    ],
  },
  {
    icon: GitBranch,
    title: "Model & System Versioning",
    description:
      "AI systems evolve continuously — but every change is tracked, versioned, and reversible.",
    points: [
      "Model version control",
      "Prompt + workflow versioning",
      "Rollback mechanisms",
      "Environment isolation (dev/staging/prod)",
    ],
  },
  {
    icon: Database,
    title: "Data Governance & Memory Control",
    description:
      "We control what AI systems remember, store, and retrieve across time horizons.",
    points: [
      "Short-term vs long-term memory separation",
      "PII filtering & data classification",
      "Retrieval access policies",
      "Data retention rules",
    ],
  },
  {
    icon: Eye,
    title: "Observability & Auditability",
    description:
      "Every decision, tool call, and system action is structured, traceable, and reviewable.",
    points: [
      "Full event logging",
      "Conversation traceability",
      "Tool execution auditing",
      "Cost & latency tracking",
    ],
  },
  {
    icon: Lock,
    title: "Risk & Compliance Layer",
    description:
      "AI systems are continuously evaluated against operational, legal, and security risks.",
    points: [
      "Hallucination risk monitoring",
      "Security constraint enforcement",
      "Fallback & escalation logic",
      "Compliance alignment (SOC2-ready patterns)",
    ],
  },
];

export default function GovernancePage() {
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
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
        >
          AI Governance
          <br />
          Framework
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          AI systems without governance are unpredictable, unscalable, and
          operationally risky. We design governance layers that make AI
          systems safe to deploy inside real organizations.
        </motion.p>
      </section>

      {/* LAYERS */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <div className="space-y-28">

          {GOVERNANCE_LAYERS.map((layer, index) => {
            const Icon = layer.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-16 items-start"
              >
                {/* ICON */}
                <div className="flex items-center gap-4 md:justify-end md:text-right">
                  <div className="h-12 w-12 rounded-xl border border-white/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium">
                    {layer.title}
                  </h2>

                  <p className="mt-4 text-white/60 leading-relaxed">
                    {layer.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-white/50 text-sm">
                    {layer.points.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* PRINCIPLE SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Governance is Not a Layer — It is a System Property
        </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          Most AI systems treat governance as an afterthought — logs, policies,
          and controls added after deployment.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          At Myria, governance is embedded into architecture, execution, and
          memory systems from day one — ensuring AI remains safe, observable,
          and controllable at scale.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <Link
          href="/work-with-us"
          className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
        >
          Get a Governance Assessment
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </Link>
      </section>

    </main>
  );
}