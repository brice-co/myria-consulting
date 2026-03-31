import {
  AlertTriangle,
  Cpu,
  Shield,
  Globe,
  Activity,
  Layers,
  Sparkles,
  Badge,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: AlertTriangle,
    title: "No Governance Layer",
    description:
      "Most AI systems operate without structured oversight, making them unpredictable, risky, and difficult to control.",
  },
  {
    icon: Activity,
    title: "No Evaluation or Feedback Loop",
    description:
      "Without continuous evaluation, AI systems drift over time — producing inconsistent and unreliable outputs.",
  },
  {
    icon: Cpu,
    title: "Model-Centric Thinking",
    description:
      "Teams focus on models, not systems — ignoring orchestration, memory, and real-world execution layers.",
  },
  {
    icon: Layers,
    title: "Fragmented Architecture",
    description:
      "Disconnected tools, APIs, and workflows create brittle systems that break under real usage.",
  },
  {
    icon: Shield,
    title: "Hidden Risk & Compliance Gaps",
    description:
      "Security, auditability, and governance are often added too late — increasing exposure and technical debt.",
  },
  {
    icon: Globe,
    title: "Not Designed to Scale",
    description:
      "What works in a prototype often fails in production due to missing infrastructure and system design.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 relative bg-background overflow-x-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative px-6">
        {/* 🔥 Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Why Most AI Systems Fail
          </Badge>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Your AI Stack Isn’t the Problem.
            <br />
            <span className="text-cyan-400">Your System Design Is.</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Most teams focus on models and tools — but the real issue is missing
            structure, governance, and system architecture.
          </p>
        </div>

        {/* 🔍 Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 🚀 CTA BLOCK (CRITICAL) */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Most companies don’t realize these gaps until it’s too late.
          </p>

          <Link href="/start-assessment">
            <Button size="lg" className="px-8 py-6 text-base">
              Find Your AI Governance Gaps
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground mt-4">
            Takes 2 minutes • Get your score + recommendations
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;