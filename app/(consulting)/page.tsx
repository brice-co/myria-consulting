"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Zap,
  Compass,
} from "lucide-react";

export default function ConsultingPage() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
               
      <section className="relative py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            We don’t start with code.
            <br />
            We start with understanding.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-3xl text-lg text-white/70"
          >
            Voice AI is not a feature you plug in. It’s a system that touches
            customer experience, operations, data, security, and decision-making.
            Our consulting services help you decide what to build — and what not
            to build — before investing time and money.
          </motion.p>
        </div>
      </section>

      {/* WHY CONSULTING */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Why consulting comes first
          </h2>

          <div className="mt-8 space-y-4 text-white/70 max-w-3xl">
            <p>
              Many organizations jump straight into voice pilots — a chatbot,
              a demo, an experiment. Most of them stall.
            </p>
            <p>
              Not because voice doesn’t work, but because the surrounding system
              wasn’t designed: ownership, integrations, governance, cost control,
              and scalability.
            </p>
            <p>
              Our consulting engagements exist to remove uncertainty early and
              help you move forward with confidence — whether that means starting
              small or designing for scale from day one.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Consulting services
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <service.icon className="h-6 w-6 text-emerald-400 mb-4" />
                <h3 className="text-xl font-medium">{service.title}</h3>
                <p className="mt-3 text-white/70">{service.description}</p>

                <ul className="mt-6 space-y-2 text-sm text-white/60">
                  {service.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-white/80 font-medium">
                  Outcome:
                </p>
                <p className="text-sm text-white/60">
                  {service.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT LEADS TO BUILD */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            From consulting to custom build
          </h2>

          <div className="mt-6 max-w-3xl space-y-4 text-white/70">
            <p>
              Consulting is not an isolated exercise. It’s how we ensure that
              what we build later is aligned, realistic, and valuable.
            </p>
            <p>
              Many of our consulting engagements transition naturally into custom
              builds — with clearer scope, lower risk, and better outcomes.
            </p>
            <p>
              When you continue with us into implementation, consulting efforts
              are often credited toward the build.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Who this is for
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/70">
            <div>• Executives exploring Voice AI</div>
            <div>• Product & innovation teams</div>
            <div>• CTOs & technical leaders</div>
            <div>• Organizations unsure where to start</div>
            <div>• Teams that want to avoid costly mistakes</div>
            <div>• Companies planning long-term AI capabilities</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Let’s clarify before you build
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Tell us about your organization, your goals, and your constraints.
            We’ll help you decide the right next step.
          </p>

          <div className="mt-8">
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 transition"
            >
              Request an assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const services = [
  {
    title: "Voice AI Strategy & Feasibility Assessment",
    icon: Compass,
    description:
      "A structured engagement to evaluate whether voice makes sense for your organization and how to approach it safely.",
    points: [
      "Use case identification & prioritization",
      "Voice tier recommendation (browser, hybrid, realtime)",
      "ROI & cost considerations",
      "Risk & feasibility analysis",
    ],
    outcome:
      "A clear go / no-go decision and a recommended path forward.",
  },
  {
    title: "Voice Architecture & System Design",
    icon: Layers,
    description:
      "Deep technical and architectural guidance for teams ready to design a real system — not a demo.",
    points: [
      "Agent & system boundaries",
      "Tooling & integrations",
      "Security & governance considerations",
      "Scalability & evolution roadmap",
    ],
    outcome:
      "A production-ready architecture blueprint.",
  },
  {
    title: "Voice MVP Design Sprint",
    icon: Zap,
    description:
      "A focused engagement to define a lean, valuable first iteration that can evolve over time.",
    points: [
      "User journeys & conversation design",
      "Prompt & behavior strategy",
      "MVP scope definition",
      "Implementation plan & estimates",
    ],
    outcome:
      "A well-defined MVP ready for implementation.",
  },
  {
    title: "Platform Readiness & Evolution Advisory",
    icon: ShieldCheck,
    description:
      "For teams that already have voice systems and need to assess scale, governance, and long-term direction.",
    points: [
      "Current system assessment",
      "Multi-agent & multi-tenant considerations",
      "Platform vs product decision support",
      "Technical debt & risk identification",
    ],
    outcome:
      "A clear roadmap for scaling responsibly.",
  },
];
