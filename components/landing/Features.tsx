import {
  AlertTriangle,
  Cpu,
  Shield,
  Globe,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const features = [
  {
    icon: AlertTriangle,
    title: "Weak control boundaries",
    description:
      "Many AI systems operate without clear oversight, escalation paths, or guardrails, making them harder to trust and govern.",
  },
  {
    icon: Activity,
    title: "Limited evaluation and visibility",
    description:
      "Without structured monitoring, feedback loops, and performance review, AI systems drift and degrade over time.",
  },
  {
    icon: Cpu,
    title: "Model-first thinking",
    description:
      "Teams often focus on model choice while overlooking orchestration, workflows, memory, and execution design.",
  },
  {
    icon: Layers,
    title: "Fragmented architecture",
    description:
      "Disconnected tools, APIs, and automations create brittle systems that become difficult to maintain as complexity grows.",
  },
  {
    icon: Shield,
    title: "Hidden governance and security gaps",
    description:
      "Risk, auditability, access control, and compliance concerns are often addressed too late, increasing exposure and operational debt.",
  },
  {
    icon: Globe,
    title: "Not ready for production scale",
    description:
      "What works in a pilot often struggles in production when reliability, resilience, and operating discipline become critical.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-x-hidden bg-background py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl md:h-96 md:w-96" />
      <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl md:h-96 md:w-96" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium">
            <Sparkles className="mr-2 inline h-4 w-4" />
            Why AI initiatives stall before scale
          </Badge>

          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            Most AI problems are not model problems.
            <br />
            <span className="text-cyan-400">They are system problems.</span>
          </h2>

          <p className="text-xl leading-relaxed text-muted-foreground">
            Many teams move quickly into AI, but the architecture, governance,
            and operating model behind the system are not mature enough to
            support real scale.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="text-primary" size={24} />
              </div>

              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>

              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            AI Architecture Labs helps you identify what is fragile, what is missing,
            and what needs to happen before scaling further.
          </p>

          <Link href="/voice-diagnostic/apply">
            <Button size="lg" className="px-8 py-6 text-base">
              Book an AI Architecture Lab
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Paid 2–4 week advisory engagement for architecture, risk, and readiness
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;