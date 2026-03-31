"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Layers,
  Cpu,
  Shield,
  Workflow,
  ArrowRight,
 
} from "lucide-react";
import Link from "next/link";


const solutions = [
  {
    title: "AI Revenue Systems",
    description:
      "Intelligent systems that qualify, route, and convert — integrated with your CRM, workflows, and revenue operations.",
  },
  {
    title: "AI Support & Operations",
    description:
      "AI systems that resolve, escalate, and continuously improve with structured feedback loops and operational visibility.",
  },
  {
    title: "Internal AI Automation",
    description:
      "Secure AI-driven workflows that execute tasks across your internal tools with full traceability and control.",
  },
  {
    title: "Enterprise AI Platforms",
    description:
      "Multi-tenant AI systems with governance, observability, and architecture designed for long-term scalability.",
  },
];

const capabilities = [
  {
    icon: Mic,
    title: "Real-Time Interfaces",
    description:
      "Realtime and asynchronous interaction layers including voice, streaming, and event-driven systems with deterministic control paths.",
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

const systemLayers = [
  {
    title: "Users & Operators",
    description:
      "Customers, sales teams, support agents, and internal stakeholders interacting via voice or dashboards.",
  },
  {
    title: "Interface Layer (Voice, UI, APIs)",
    description:
      "Realtime interaction systems including voice, APIs, dashboards, and event-driven interfaces with strict latency and reliability constraints. Realtime audio streaming, transcription, synthesis, interruption handling, and latency control.",
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
          We design and implement production-grade AI systems — combining
          real-time interfaces, multi-agent orchestration, and governance-driven
          architecture to operate reliably at scale.
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
              <h3 className="text-2xl font-medium">{solution.title}</h3>
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
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
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
            Our systems are designed in layers — separating interface,
            intelligence, execution, and governance to ensure reliability at
            scale.
          </p>

          <div className="mt-20 relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-16">
              {systemLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Spine marker */}
                  <div className="absolute left-6 top-2 h-4 w-4 rounded-full border border-emerald-400/30 bg-emerald-400/20 md:left-1/2 md:-translate-x-1/2" />

                  {/* Content */}
                  <div className="pl-16 md:pl-0 md:max-w-3xl md:mx-auto md:text-center">
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
            Many organizations launch AI pilots. Very few design systems that
            remain reliable under scale, regulation, and operational complexity.
          </p>

          <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
            We build for long-term trust — with isolation boundaries,
            deterministic fallbacks, observability, and governance embedded into
            the system from day one.
          </p>

          <div className="mt-12">
            <Link
              href="/ai-governance-assessment"
              className="inline-flex items-center gap-2 text-emerald-400 font-medium group"
            >
              Get Your AI Governance Score
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      
    </main>
  );
}