"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layouts/PageShell";
import { Shield, Eye, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const sections = [
  {
    icon: Shield,
    title: "Governance by Design",
    color: "--tier-professional",
    description:
      "Rather than treating governance as a post-deployment control layer, Myria Consulting embeds governance considerations directly into the design of AI systems. This approach ensures that safety, observability, and operational accountability are built into the architecture itself.",
    items: [
      "Clear system boundaries for automated decision making",
      "Human oversight mechanisms for critical interactions",
      "Transparent system architecture and documentation",
      "Operational monitoring of AI behavior and performance",
    ],
  },
  {
    icon: Lock,
    title: "Security & Compliance Mindset",
    color: "--tier-essential",
    description:
      "AI systems increasingly operate within environments where regulatory and security expectations are critical. Myria Consulting designs architecture with a compliance-ready mindset, ensuring organizations can adapt to evolving governance requirements.",
    items: [
      "Privacy-aware system architecture",
      "Secure infrastructure patterns aligned with SOC2 principles",
      "Configurable data retention and access controls",
      "Support for environments subject to GDPR or HIPAA requirements",
    ],
  },
  {
    icon: Eye,
    title: "Operational Oversight",
    color: "--tier-realtime",
    description:
      "Real-time AI systems require continuous operational monitoring. Myria Consulting encourages organizations to treat AI platforms as evolving infrastructure requiring structured oversight and ongoing performance review.",
    items: [
      "Conversation monitoring and analytics",
      "Performance observability for AI agents",
      "Operational dashboards for system health",
      "Continuous improvement cycles based on system insights",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Responsible AI Deployment",
    color: "--tier-advanced",
    description:
      "AI systems deployed in customer-facing environments must maintain trust and accountability. Myria Consulting works with organizations to ensure responsible deployment practices across the full lifecycle of AI systems.",
    items: [
      "Transparent AI system capabilities and limitations",
      "Fallback mechanisms and escalation pathways",
      "Risk assessment prior to production deployment",
      "Human-in-the-loop safeguards for sensitive interactions",
    ],
  },
];

export default function Governance() {
  return (
    <PageShell>
      {/* Header */}
    
      <motion.header className="mb-16" {...fadeUp()}>
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
          Framework
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
          AI Governance Framework
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Deploying real-time AI systems requires more than technical
          implementation. Organizations must ensure that conversational
          infrastructure, agentic systems, and automated decision processes
          operate within clear governance boundaries.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mt-4">
          Myria Consulting integrates governance principles directly into the
          architecture and operational lifecycle of Voice-First AI systems,
          enabling organizations to scale responsibly while maintaining
          transparency, accountability, and operational resilience.
        </p>
      </motion.header>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((s, i) => {
          const Icon = s.icon;
          const solidColor = `hsl(var(${s.color}))`;
          const glowBg = `hsl(var(${s.color}) / 0.08)`;

          return (
            <motion.section
              key={s.title}
              {...fadeUp(0.15 + i * 0.1)}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-lg shrink-0"
                  style={{ backgroundColor: glowBg }}
                >
                  <Icon className="w-5 h-5" style={{ color: solidColor }} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-secondary-foreground"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: solidColor }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Closing */}
      <motion.section
        {...fadeUp(0.6)}
        className="mt-16 rounded-xl border border-primary/20 bg-card p-8"
      >
        <p className="text-secondary-foreground leading-relaxed">
          Governance is not a one-time exercise. As AI systems evolve,
          organizations must continuously reassess operational policies,
          technical safeguards, and oversight mechanisms. Myria Consulting helps
          organizations establish governance foundations that support long-term
          innovation while protecting users, organizations, and critical
          infrastructure.
        </p>
      </motion.section>
    </PageShell>
  );
}
