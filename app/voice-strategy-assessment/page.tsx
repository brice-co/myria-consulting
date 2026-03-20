import Link from "next/link";
import { ArrowRight } from "lucide-react";


export const metadata = {
  title: "Voice Strategy Assessment | Myria Consulting",
  description:
    "Define the right voice AI architecture before you build. A structured strategy engagement for browser-based and real-time voice systems.",
};

export default function VoiceStrategyAssessmentPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      
      {/* HERO */}
      <section className="space-y-8">
        <h1 className="text-5xl font-semibold tracking-tight leading-[1.1]">
          Voice Strategy Assessment
        </h1>

        <p className="max-w-3xl text-xl text-muted-foreground">
          A structured decision framework for organizations evaluating
          voice AI.
        </p>

        <p className="max-w-3xl text-muted-foreground">
          Before committing to infrastructure, tooling, or implementation,
          we define the right entry point, architectural tier, and evolution path.
          This ensures your first voice deployment becomes a durable foundation —
          not an expensive experiment.
        </p>

        <Link
          href="/voice-diagnostic/apply"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
        >
          Begin the Assessment
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="mt-28 border-t pt-16 space-y-6">
        <h2 className="text-3xl font-semibold">
          Why Voice Requires Deliberate Architecture
        </h2>

        <p className="max-w-3xl text-muted-foreground">
          Voice is not simply another interface layer. It directly impacts
          latency tolerance, infrastructure decisions, cost structure,
          operational workflows, governance boundaries, and user trust.
        </p>

        <p className="max-w-3xl text-muted-foreground">
          Early architectural decisions — such as choosing between browser,
          server, or realtime voice — shape long-term scalability and
          technical flexibility. Misalignment at this stage often results
          in over-engineering or costly rewrites.
        </p>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="mt-28 border-t pt-16 space-y-6">
        <h2 className="text-3xl font-semibold">
          Who This Assessment Is Designed For
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-muted-foreground">
          <ul className="space-y-3 list-disc pl-6">
            <li>Organizations evaluating voice-enabled products</li>
            <li>Innovation teams piloting AI initiatives</li>
            <li>Leaders seeking clarity before committing capital</li>
            <li>Teams deciding between browser, hybrid, or realtime systems</li>
          </ul>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">
              Not Designed For
            </h3>
            <ul className="space-y-3 list-disc pl-6 text-muted-foreground">
              <li>Demo-only experiments</li>
              <li>One-week prototype builds</li>
              <li>Predefined architecture without evaluation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT WE EVALUATE */}
      <section className="mt-28 border-t pt-16 space-y-8">
        <h2 className="text-3xl font-semibold">
          What We Evaluate
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">
              Business & Strategic Fit
            </h3>
            <ul className="mt-3 space-y-2 list-disc pl-6">
              <li>Business context and measurable success criteria</li>
              <li>Voice opportunity validation</li>
              <li>Risk profile and compliance considerations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground">
              Technical & Architectural Tier
            </h3>
            <ul className="mt-3 space-y-2 list-disc pl-6">
              <li>Voice entry point (browser, realtime, phased)</li>
              <li>Latency and reliability expectations</li>
              <li>System boundaries and integration complexity</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground">
              Experience & Interaction Design
            </h3>
            <ul className="mt-3 space-y-2 list-disc pl-6">
              <li>User expectations and conversational design</li>
              <li>Fallback strategies and escalation paths</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground">
              Delivery & Evolution Path
            </h3>
            <ul className="mt-3 space-y-2 list-disc pl-6">
              <li>MVP-to-production roadmap</li>
              <li>Governance and observability model</li>
              <li>Scalability framework</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="mt-28 border-t pt-16 space-y-6">
        <h2 className="text-3xl font-semibold">
          What You Receive
        </h2>

        <ul className="space-y-3 list-disc pl-6 text-muted-foreground max-w-3xl">
          <li>Clear recommendation on architectural tier</li>
          <li>Validated voice entry strategy</li>
          <li>Implementation roadmap with phased expansion plan</li>
          <li>Execution-ready architectural brief</li>
        </ul>

        <p className="text-muted-foreground max-w-3xl">
          The output is designed to inform executive decision-making and
          provide technical teams with structured, implementation-ready clarity.
        </p>
      </section>

      {/* POSITIONING CTA */}
      <section className="mt-32 border-t pt-16">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-semibold">
            Start with clarity — not infrastructure.
          </h3>

          <p className="mt-4 text-muted-foreground">
            The most valuable first step in voice AI is determining
            what level of sophistication is appropriate —
            and what can wait.
          </p>

          <Link
            href="/voice-diagnostic/apply"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            Begin the Assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}
