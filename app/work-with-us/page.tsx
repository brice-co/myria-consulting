"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function WorkWithUsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* NAV */}


      {/* Background */}
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
          Partner With Us to
          <br />
          Build AI Infrastructure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          We collaborate with organizations ready to move beyond
          experimentation — designing voice-driven systems
          that integrate directly into real operations,
          reduce risk, and scale with confidence.
        </motion.p>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="max-w-6xl mx-auto px-6 pb-32 border-t border-white/10 pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Who We Partner With
        </motion.h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          We work with leadership teams and operators who see AI
          as long-term infrastructure — not a short-term feature.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          Our ideal partners value governance, system clarity,
          and operational durability over quick wins or hype cycles.
        </p>
      </section>

      {/* ENGAGEMENT STRUCTURE */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Engagement Structure
        </motion.h2>

        <div className="mt-20 grid md:grid-cols-3 gap-16">

          {/* PHASE I */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-wide text-white/40">
              Phase I
            </p>

            <h3 className="text-2xl font-medium">
              Strategic Definition
            </h3>

            <p className="text-white/60 leading-relaxed">
              We define the business outcome, workflow leverage,
              system constraints, and governance requirements
              before selecting any technical stack.
            </p>

            <p className="text-sm text-white/40">
              Structured advisory engagement.
            </p>
          </motion.div>

          {/* PHASE II */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-wide text-white/40">
              Phase II
            </p>

            <h3 className="text-2xl font-medium">
              Architecture & Build
            </h3>

            <p className="text-white/60 leading-relaxed">
              We design and implement production-grade voice systems —
              integrated into your internal tools,
              built for performance, and structured for scale.
            </p>

            <p className="text-sm text-white/40">
              Custom scoped engagement.
            </p>
          </motion.div>

          {/* PHASE III */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-wide text-white/40">
              Phase III
            </p>

            <h3 className="text-2xl font-medium">
              Governance & Expansion
            </h3>

            <p className="text-white/60 leading-relaxed">
              We remain engaged as your AI systems evolve —
              refining reliability, expanding into new workflows,
              and maintaining operational discipline.
            </p>

            <p className="text-sm text-white/40">
              Ongoing strategic partnership.
            </p>
          </motion.div>

        </div>
      </section>

      {/* SELECTIVITY SIGNAL */}
      <section className="max-w-6xl mx-auto px-6 pb-40 border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          A Selective Partnership
        </h2>

        <p className="mt-8 max-w-3xl text-white/60 text-lg leading-relaxed">
          We intentionally limit the number of active engagements
          to ensure architectural depth and executive attention.
        </p>

        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          If you're serious about building AI as infrastructure —
          not experimentation —
          we should have a conversation.
        </p>

        <div className="mt-12">
          <Link
            href="mailto:info@myriaconsulting.com?subject=Inquiry%20about%20Voice%20AI%20Capabilities&body=Hi%20Myria%20Team%2C%0A%0AI%20would%20like%20to%20learn%20more%20about%20your%20voice%20AI%20capabilities.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0AThanks!"

            className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
          >
            Start the conversation
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

    </main>
  );
}
