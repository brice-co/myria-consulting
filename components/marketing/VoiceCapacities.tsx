"use client"

import { motion } from "framer-motion";

const VOICE_CAPABILITIES = [
  {
    name: "Essential Voice",
    intent: "Validate & Explore",
    description:
      "A pragmatic starting point for exploring voice interactions and validating real business use cases.",
    characteristics: [
      "Browser-based Speech-to-Text",
      "Standard Text-to-Speech",
      "Server-side reasoning & intent detection",
      "Conversation transcripts & summaries",
    ],
    experience: [
      "Higher latency",
      "Turn-based interactions",
      "Best for controlled environments",
    ],
    whenToUse:
      "Early experimentation, internal tools, proof-of-concepts, or low-volume interactions.",
  },
  {
    name: "Professional Voice",
    intent: "Operate & Scale",
    description:
      "Production-grade voice systems designed for reliability, consistency, and real customer-facing workflows.",
    characteristics: [
      "High-quality Speech-to-Text & Text-to-Speech",
      "Server-orchestrated voice pipeline",
      "Intent logging & workflow triggers",
      "Integrations (calendar, email, CRM, APIs)",
    ],
    experience: [
      "Low latency",
      "Natural conversational flow",
      "Predictable and consistent behavior",
    ],
    whenToUse:
      "Customer support, operations, booking flows, and production deployments.",
  },
  {
    name: "Realtime Voice",
    intent: "Engage & Convert",
    description:
      "Human-like, real-time voice conversations designed for high-impact, high-trust interactions.",
    characteristics: [
      "Realtime voice streaming (WebRTC)",
      "Barge-in & interruption handling",
      "Live transcripts & event streams",
      "Advanced intent detection & escalation",
    ],
    experience: [
      "Ultra-low latency",
      "Feels like speaking to a person",
      "Highest engagement and conversion",
    ],
    whenToUse:
      "Sales, live support, triage, and premium customer experiences.",
  },
];

export default function VoiceCapabilities() {
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
          Voice Capabilities
          <br />
          Designed for Real Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          We don’t sell predefined voice products.
          We design custom systems — selecting the right
          architecture, latency profile, and integration depth
          for your operational reality.
        </motion.p>
      </section>

      {/* Philosophy */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <p className="max-w-3xl text-white/60 text-lg leading-relaxed">
          There is no universal “best” voice stack.
          Latency, cost, workflow depth, and risk surface
          determine the correct architecture.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Our role is to design the right capability layer —
          not push a one-size-fits-all solution.
        </p>
      </section>

      {/* Capabilities */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20 space-y-32">
        {VOICE_CAPABILITIES.map((capability, index) => (
          <motion.div
            key={capability.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            {/* Left Column */}
            <div>
              <p className="text-sm uppercase tracking-wide text-cyan-400">
                {capability.intent}
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                {capability.name}
              </h2>

              <p className="mt-6 text-white/60 text-lg leading-relaxed">
                {capability.description}
              </p>

              <div className="mt-10 border-l border-white/20 pl-6">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  When we recommend this
                </p>
                <p className="mt-2 text-white/70">
                  {capability.whenToUse}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-10">
              <div>
                <p className="text-sm font-medium text-white">
                  Core Characteristics
                </p>
                <ul className="mt-4 space-y-3 text-white/60">
                  {capability.characteristics.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Experience Profile
                </p>
                <ul className="mt-4 space-y-3 text-white/60">
                  {capability.experience.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Platform Note */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <h3 className="text-3xl font-semibold tracking-tight">
          Built on a Scalable Voice Foundation
        </h3>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          While every engagement is custom,
          we build on a hardened internal platform
          engineered for multi-tenancy, observability,
          and long-term architectural flexibility.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Every system we deliver is production-ready today —
          and structurally prepared for tomorrow.
        </p>
      </section>      

    </main>
  );
}
