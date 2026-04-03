"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Cpu,
  BarChart3,
  AlertTriangle,
  Clock3,
  FileText,
  MonitorSmartphone,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export default function AIDiagnosticLanding() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl">
        <section className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
          >
            <Shield className="h-4 w-4" />
            Paid Offer · AI Architecture Labs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 text-5xl font-semibold leading-tight md:text-6xl"
          >
            AI Architecture Labs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-white/65"
          >
            A focused 2–4 week engagement to assess how your AI system is designed,
            governed, secured, and operated before you scale it further.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-3xl text-lg text-white/55"
          >
            Most AI systems do not fail because of model capability. They fail because of
            weak architecture, unclear control boundaries, poor observability, and missing
            operational discipline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/voice-diagnostic/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
            >
              Book an AI Architecture Lab
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/deliverable"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-medium text-white transition hover:border-white/25 hover:bg-white/5"
            >
              View sample deliverables
              <MonitorSmartphone className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/45"
          >
            <span className="rounded-full border border-white/10 px-3 py-1.5">2–4 weeks</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">Executive dashboard</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">Client-ready PDF</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5">Prioritized roadmap</span>
          </motion.div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          <InfoCard
            icon={Clock3}
            title="Engagement format"
            description="A short, structured advisory sprint designed for organizations that need clarity before expanding agents, copilots, workflows, or AI-enabled platforms."
          />
          <InfoCard
            icon={BarChart3}
            title="What gets assessed"
            description="Architecture, agent orchestration, data flows, security posture, resilience, governance, model operations, and observability."
          />
          <InfoCard
            icon={FileText}
            title="What gets delivered"
            description="A maturity score, risk findings, dashboard views, executive PDF, and a concrete action plan for the next stage of your AI program."
          />
        </section>

        <section className="mt-32 mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-semibold">Why most AI initiatives stall</h2>

          <div className="space-y-6 text-lg leading-relaxed text-white/65">
            <p>
              AI is moving into production faster than most organizations can structure it.
              Teams launch assistants, agents, copilots, and automations, but the system
              around the model is often underdesigned.
            </p>

            <p>When that happens, AI programs become:</p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-red-400" />
                <span>Unreliable when usage, complexity, or integrations increase</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-red-400" />
                <span>Difficult to govern, audit, secure, and explain</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-red-400" />
                <span>Expensive to maintain because the operating model was never defined</span>
              </li>
            </ul>

            <p>
              The issue is rarely AI potential. The issue is architecture, controls, and
              production readiness.
            </p>
          </div>
        </section>

        <section className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-semibold">What AI Architecture Labs evaluates</h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            <Feature
              icon={Cpu}
              title="Architecture"
              description="System design, orchestration layers, and integration into real business workflows."
            />
            <Feature
              icon={Shield}
              title="Governance & Security"
              description="Guardrails, auditability, access boundaries, compliance posture, and control mechanisms."
            />
            <Feature
              icon={BarChart3}
              title="Operations"
              description="Reliability, monitoring, latency, performance, failover, and readiness for production scale."
            />
            <Feature
              icon={Cpu}
              title="Data & Memory"
              description="Context flows, retrieval, data accessibility, memory behavior, and long-term intelligence design."
            />
          </div>
        </section>

        <section className="mt-32 grid gap-6 ">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold">What your team receives</h2>
            <div className="mt-8 space-y-5 text-white/65">
              <Deliverable text="AI maturity score with executive-level interpretation" />
              <Deliverable text="Dimension-by-dimension breakdown of architecture strengths and weaknesses" />
              <Deliverable text="Key risk identification across system design, governance, and operations" />
              <Deliverable text="Actionable recommendations prioritized by business impact and urgency" />
              <Deliverable text="A dashboard view your stakeholders can understand quickly" />
              <Deliverable text="A polished PDF report for leadership review and decision-making" />
            </div>
          </div>

          
        </section>

        <section className="mt-32 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <h2 className="text-3xl font-semibold">Understand your AI system before you scale it</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/60">
            AI Architecture Labs is designed for organizations that want real clarity, not a free superficial score.
            If your AI roadmap matters, the assessment should be tied to expert review, structured outputs, and an action plan.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/voice-diagnostic/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-medium text-black transition hover:bg-emerald-400"
            >
              Book the Lab
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/ai-diagnostic-dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-8 py-4 text-lg font-medium text-white transition hover:border-white/25 hover:bg-white/5"
            >
              See sample dashboard
              <BarChart3 className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/40">
            Paid advisory engagement · Typical duration: 2–4 weeks
          </p>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <Icon className="mb-4 h-6 w-6 text-emerald-400" />
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-2 text-white/60">{description}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <Icon className="mb-4 h-5 w-5 text-emerald-400" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
    </div>
  );
}

function Deliverable({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
      <p>{text}</p>
    </div>
  );
}
