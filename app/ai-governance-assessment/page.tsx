"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, BarChart3, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const outputs = [
  {
    icon: BarChart3,
    title: "AI Maturity Score",
    description:
      "Understand where your organization stands across architecture, governance, and execution.",
  },
  {
    icon: Shield,
    title: "Risk & Governance Gaps",
    description:
      "Identify critical risks across security, compliance, and system control layers.",
  },
  {
    icon: FileText,
    title: "Actionable Recommendations",
    description:
      "Get a prioritized roadmap to improve your AI systems with clear next steps.",
  },
];

const dimensions = [
  "Architecture & System Design",
  "Agent Orchestration & Execution",
  "Memory & Data Governance",
  "Security & Access Control",
  "Observability & Monitoring",
  "Cost & Performance Management",
];

export default function GovernanceAssessmentPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold leading-[1.05]"
        >
          AI Governance Assessment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          Most organizations are deploying AI faster than they can control it.
          This assessment evaluates your architecture, governance, and operational readiness —
          and shows exactly where you stand.
        </motion.p>

        <div className="mt-10">
          <Link href="/voice-diagnostic/apply">
            <Button size="lg" className="group">
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold">
          What You Get
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {outputs.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 border border-white/10 rounded-xl bg-white/[0.02]"
              >
                <Icon className="h-6 w-6 text-emerald-400" />

                <h3 className="mt-4 text-xl font-medium">
                  {item.title}
                </h3>

                <p className="mt-3 text-white/60">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DIMENSIONS */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold">
          What We Evaluate
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {dimensions.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-white/10 rounded-lg px-4 py-3 bg-white/[0.02]"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-white/70 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE STATEMENT */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Why This Matters
        </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          AI systems introduce new risks — from uncontrolled behavior to hidden costs
          and compliance exposure. Without structured governance, these risks compound
          as systems scale.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          This assessment gives you clarity — so you can move forward with confidence,
          not guesswork.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Know Where You Stand
        </h2>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto">
          Get your AI maturity score, risk profile, and roadmap in minutes.
        </p>

        <div className="mt-10">
          <Link href="/voice-diagnostic/apply">
            <Button size="lg" className="group">
              Start AI Governance Assessment
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}