import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Engagement Models | Custom Voice AI Systems by Myria",
  description:
    "Structured engagement models for designing, building, and scaling enterprise-grade Voice AI systems.",
};

const MODELS = [
  {
    name: "Discovery Sprint",
    purpose: "Clarify & De-risk",
    description:
      "A structured diagnostic engagement designed to define the right architectural tier, validate the opportunity, and eliminate costly misalignment before development begins.",
    includes: [
      "Use-case definition & measurable success criteria",
      "Voice opportunity validation",
      "Technical & data landscape review",
      "Security & compliance considerations",
      "Architecture & capability recommendations",
      "Phased implementation roadmap",
    ],
    outcome:
      "Executive-ready clarity and a validated foundation for confident investment.",
  },
  {
    name: "Voice MVP Build",
    purpose: "Design & Deliver",
    description:
      "A controlled build phase focused on delivering a production-ready Voice AI system aligned with your architecture, governance model, and operational environment.",
    includes: [
      "Conversation design & intent modeling",
      "Voice pipeline implementation (browser, server, or realtime)",
      "Tool orchestration & backend integrations",
      "Access controls & governance boundaries",
      "Testing, evaluation & deployment",
    ],
    outcome:
      "A secure, production-grade Voice AI system deployed with architectural integrity.",
  },
  {
    name: "Production Rollout",
    purpose: "Harden & Scale",
    description:
      "For organizations transitioning from pilot to sustained real-world usage with higher reliability, performance, and compliance requirements.",
    includes: [
      "Performance & latency optimization",
      "Monitoring, logging & observability",
      "Role-based access control (RBAC)",
      "Tenant isolation & governance alignment",
      "Operational readiness & documentation",
    ],
    outcome:
      "A resilient system capable of handling real users, real volume, and real accountability.",
  },
  {
    name: "Optimization & Evolution",
    purpose: "Improve & Expand",
    description:
      "An ongoing collaboration to refine system performance, expand capabilities, and align voice behavior with evolving business objectives.",
    includes: [
      "Conversation & intent optimization",
      "New workflow & tool integrations",
      "UX & performance enhancements",
      "Usage analytics & insight reporting",
      "Strategic architecture guidance",
    ],
    outcome:
      "A continuously improving Voice AI capability that evolves with your organization.",
  },
];

export default function EngagementModelsPage() {
  return (
    <main className="relative mx-auto max-w-7xl px-6 py-32">
  
      {/* HERO */}
      <section className="max-w-4xl">
        <h1 className="text-5xl font-semibold tracking-tight text-white leading-[1.1]">
          Engagement Models
        </h1>

        <p className="mt-6 text-xl text-muted-foreground">
          A structured approach to designing, building, and scaling
          enterprise-grade Voice AI systems.
        </p>

        <p className="mt-6 max-w-3xl text-muted-foreground">
          Voice AI impacts customer experience, operations, data governance,
          infrastructure, and security. Our engagement models are designed
          to reduce risk, align stakeholders, and ensure long-term architectural
          integrity — not just short-term delivery.
        </p>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="mt-20 max-w-4xl border-t border-white/10 pt-12">
        <h2 className="text-2xl font-semibold text-white">
          Our Operating Principles
        </h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
          <li>• Architecture before tooling</li>
          <li>• Security and governance from day one</li>
          <li>• Production readiness over prototypes</li>
          <li>• Systems designed to evolve</li>
        </ul>
      </section>

      {/* MODELS */}
      <section className="mt-20 grid gap-10 md:grid-cols-2">
        {MODELS.map((model) => (
          <div
            key={model.name}
            className="rounded-2xl border border-white/15 bg-white/5 p-8"
          >
            <h2 className="text-xl font-semibold text-white">
              {model.name}
            </h2>

            <p className="mt-1 text-xs uppercase tracking-wide text-emerald-400">
              {model.purpose}
            </p>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              {model.description}
            </p>

            <div className="mt-8">
              <p className="text-sm font-medium text-white">
                Scope of Work
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {model.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Outcome
              </p>
              <p className="mt-2 text-sm text-white leading-relaxed">
                {model.outcome}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ENGAGEMENT FLOW */}
      <section className="mt-28 max-w-4xl border-t border-white/10 pt-14">
        <h3 className="text-2xl font-semibold text-white">
          Designed as a Progressive Path
        </h3>

        <p className="mt-6 text-muted-foreground">
          Most organizations begin with a Discovery Sprint to establish clarity.
          From there, engagement expands in controlled phases — ensuring
          investment aligns with validated outcomes.
        </p>

        <p className="mt-4 text-muted-foreground">
          This phased approach avoids over-commitment, prevents architectural
          missteps, and preserves optionality as your needs evolve.
        </p>
      </section>

      {/* PRICING PHILOSOPHY */}
      <section className="mt-28 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-10">
        <h3 className="text-xl font-semibold text-white">
          Investment & Pricing
        </h3>

        <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
          Engagements are scoped according to system complexity, integration
          depth, infrastructure tier, and delivery timeline.
        </p>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          We provide transparent estimates following Discovery, ensuring pricing
          reflects real implementation effort while eliminating ambiguity
          during delivery.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-28 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <a
          href="mailto:info@myriaconsulting.com?subject=Inquiry%20about%20Voice%20AI%20Capabilities&body=Hi%20Myria%20Team%2C%0A%0AI%20would%20like%20to%20learn%20more%20about%20your%20voice%20AI%20capabilities.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0AThanks!"

          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-400 transition"
        >
          Start with a Discovery Conversation
        </a>

        <a
          href="/voice/capabilities"
          className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          Explore Voice Capabilities
        </a>
      </section>

    </main>
  );
}
