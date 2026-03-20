"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Layers,
  Cpu,
  Shield,
  Workflow,
  ArrowRight,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { PAGE_AGENTS } from "@/config/agentConfigs";

const solutions = [
  {
    title: "AI Sales Infrastructure",
    description:
      "Voice agents that qualify, route, and book — fully integrated with your CRM and revenue workflows.",
  },
  {
    title: "AI Customer Support Systems",
    description:
      "Production-grade voice systems that resolve, escalate, and continuously improve with structured intent logging.",
  },
  {
    title: "Internal AI Operations",
    description:
      "Voice-triggered workflows and tool execution across your internal systems with full auditability.",
  },
  {
    title: "Enterprise AI Platforms",
    description:
      "Multi-tenant AI foundations with governance, observability, and long-term architectural stability.",
  },
];

const capabilities = [
  {
    icon: Mic,
    title: "Voice Architecture",
    description:
      "Realtime & async voice pipelines with barge-in handling, recovery logic, and deterministic fallback paths.",
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description:
      "Secure tool execution, CRM integrations, and system-triggered actions with human-in-the-loop escalation.",
  },
  {
    icon: Layers,
    title: "Multi-Agent Systems",
    description:
      "Role-based agent coordination with shared memory boundaries and predictable handoffs.",
  },
  {
    icon: Cpu,
    title: "Platform Engineering",
    description:
      "Typed models, multi-tenant design, RBAC, and provider-agnostic infrastructure built to evolve.",
  },
  {
    icon: Shield,
    title: "Enterprise Readiness",
    description:
      "SOC2 mindset, audit logs, secure credential handling, and production monitoring from day one.",
  },
];

export default function WhatWeBuildPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute bottom-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
        >
          Enterprise AI Systems.
          <br />
          Built to Operate — Not Impress.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl text-lg text-white/60"
        >
          We design and implement production-grade AI systems — starting with
          voice, extending into multi-agent orchestration, and grounded in
          enterprise architecture principles.
        </motion.p>
      </section>

      {/* SOLUTIONS */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Solutions We Deliver
        </h2>

        <div className="mt-16 space-y-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-t border-white/10 pt-10"
            >
              <h3 className="text-2xl font-medium">
                {solution.title}
              </h3>
              <p className="mt-4 max-w-3xl text-white/60 text-lg">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          System Capabilities
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-x-16 gap-y-16">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="flex items-start gap-5">
                <div className="mt-1 h-10 w-10 flex items-center justify-center rounded-lg bg-white/5">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-xl font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SYSTEM MAP */}
<section className="max-w-6xl mx-auto px-6 pb-40">
  <div className="border-t border-white/10 pt-20">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
      Enterprise AI System Map
    </h2>

    <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
      Our systems are designed in layers — separating interface, intelligence,
      execution, and governance to ensure reliability at scale.
    </p>

    <div className="mt-20 relative">

      {/* Vertical connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

      <div className="space-y-16">

        {[
          {
            title: "Users & Operators",
            description:
              "Customers, sales teams, support agents, and internal stakeholders interacting via voice or dashboards.",
          },
          {
            title: "Voice Interface Layer",
            description:
              "Realtime audio streaming, transcription, synthesis, interruption handling, and latency control.",
          },
          {
            title: "Agent Orchestration Layer",
            description:
              "Intent detection, memory boundaries, role-based agents, routing logic, and deterministic fallbacks.",
          },
          {
            title: "Business Systems & Tools",
            description:
              "CRM, ticketing, scheduling, billing, knowledge bases, and secure server-side tool execution.",
          },
          {
            title: "Infrastructure & Governance",
            description:
              "RBAC, audit logging, monitoring, provider abstraction, tenant isolation, and compliance safeguards.",
          },
        ].map((layer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            <div className="max-w-3xl text-center md:text-left md:ml-20">
              <div className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-xs uppercase tracking-wider text-white/40 mb-4">
                Layer {index + 1}
              </div>

              <h3 className="text-xl md:text-2xl font-medium">
                {layer.title}
              </h3>

              <p className="mt-4 text-white/60 leading-relaxed">
                {layer.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* ARCHITECTURE PHILOSOPHY */}
      <section className="max-w-6xl mx-auto px-6 pb-40">
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Architecture First. Always.
          </h2>

          <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
            Many organizations launch AI pilots.
            Very few design systems that remain reliable under scale,
            regulation, and operational complexity.
          </p>

          <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
            We build for long-term trust — with isolation boundaries,
            deterministic fallbacks, observability, and governance embedded
            into the system from day one.
          </p>

          <div className="mt-12">
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
            >
              Discuss your architecture
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>
      <ChatWidget
          title="Solution Advisor"
          subtitle="Your AI companion for seamless communication and productivity."
          accentColor="260 80% 60%"
          icon={<PhoneCallIcon className="h-12 w-12" />}
          voice="alloy"
          systemPrompt={PAGE_AGENTS.whatWeBuild.systemPrompt}
          allowedTools={PAGE_AGENTS.whatWeBuild.allowedTools}
        />
    </main>
  );
}
