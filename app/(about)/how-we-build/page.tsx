"use client";

import { motion } from "framer-motion";
import {
  Search,
  DraftingCompass,
  Cpu,
  Rocket,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";


const phases = [
  {
  icon: Search,
  number: "01",
  title: "Discovery & Strategic Framing",
  description:
    "We define business outcomes, system boundaries, and governance requirements before selecting any technology.",
  points: [
    "Success metrics & ROI definition",
    "AI opportunity identification & prioritization",
    "Workflow & decision mapping",
    "Risk, compliance & governance assessment",
  ],
},
  {
  icon: DraftingCompass,
  number: "02",
  title: "System Architecture & Design",
  description:
    "AI systems succeed or fail at the architecture layer. We design systems with clear boundaries, governance controls, and long-term scalability.",
  points: [
    "System architecture & layer definition",
    "Memory & context design",
    "Model + rule hybrid strategies",
    "Governance, ownership & control boundaries",
  ],
},
  {
  icon: Cpu,
  number: "03",
  title: "Production Build & Integration",
  description:
  "We build production-grade AI systems integrated into your business infrastructure with full observability and control.",
  points: [
    "Agent orchestration & execution logic",
    "Secure tool integration (CRM, APIs, DBs)",
    "Memory systems (short + long term)",
    "Audit logging & system observability",
  ],
},
  {
  icon: Rocket,
  number: "04",
  title: "Controlled Deployment & Evolution",
  description:
    "AI systems are deployed gradually, measured continuously, and improved through structured feedback loops.",
  points: [
    "Staged rollout & performance monitoring",
    "Quality evaluation & system tuning",
    "Cost & latency optimization",
    "Continuous learning & system evolution",
  ],
},

{
  icon: Shield,
  number: "05",
  title: "Governance & System Control",
  description:
    "We ensure AI systems remain secure, auditable, and aligned with organizational policies over time.",
  points: [
    "Access control & permissions (RBAC)",
    "Audit trails & traceability",
    "Model/version governance",
    "Risk monitoring & compliance alignment",
  ],
}
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
          Building AI systems isn’t about connecting models or APIs.

          It requires structured architecture, governance controls,
          and deliberate system design — so intelligence can operate
          reliably inside real organizations.
        </motion.p>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 pb-40">
        <div className="relative">

          {/* Vertical spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-24">
            {phases.map((phase, index) => {
            const isLeft = index % 2 === 0;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative grid md:grid-cols-2 gap-12 items-start"
    >
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-black border border-white/20 text-sm font-medium">
        {phase.number}
      </div>

      {isLeft ? (
        <>
          <div className="mt-16 md:mt-0 md:pr-16 md:text-right">
            <h2 className="text-2xl md:text-3xl font-medium">{phase.title}</h2>
            <p className="mt-4 text-white/60 leading-relaxed">{phase.description}</p>

            <ul className="mt-6 space-y-3 text-white/50 text-sm">
              {phase.points.map((point, i) => (
                <li key={i} className="flex justify-end gap-3">
                  <span>{point}</span>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                </li>
              ))}
            </ul>
          </div>
          <div />
        </>
      ) : (
        <>
          <div />
          <div className="mt-16 md:mt-0 md:pl-16">
            <h2 className="text-2xl md:text-3xl font-medium">{phase.title}</h2>
            <p className="mt-4 text-white/60 leading-relaxed">{phase.description}</p>

            <ul className="mt-6 space-y-3 text-white/50 text-sm">
              {phase.points.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </motion.div>
  );
})}
          </div>
        </div>
      </section>

      {/* RISK & GOVERNANCE SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
         Governance is Built In — Not Added Later
        </h2>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          AI systems introduce new operational, security, and compliance risks.
          Without governance, they become unpredictable and difficult to control.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Our methodology embeds governance into every layer —
          from architecture and execution to monitoring and evolution —
          ensuring your systems remain reliable, auditable, and aligned with your business.
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
