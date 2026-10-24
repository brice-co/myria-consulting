import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Network, ShieldCheck } from "lucide-react";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "From Strategy to Execution | Myria Consulting",
  description:
    "A practical Myria Consulting perspective on connecting strategic decisions to operating workflows, human accountability, technology, measurable outcomes and continuous learning.",
  pathname: "/insights/from-strategy-to-execution",
  type: "article",
});

const steps = [
  {
    number: "01",
    title: "Frame the business decision",
    detail:
      "Describe the outcome and the constraint before discussing tools. What must improve, for whom, and what trade-offs will leaders have to make?",
    deliverable: "A clear problem statement, desired outcomes and decision criteria.",
  },
  {
    number: "02",
    title: "Observe how the work actually happens",
    detail:
      "Map the work from request to outcome. Include handoffs, waiting time, exceptions and informal decisions that are usually absent from process diagrams.",
    deliverable: "An end-to-end workflow and an exception map.",
  },
  {
    number: "03",
    title: "Clarify ownership and decision rights",
    detail:
      "Separate the work a system can help perform from the decisions that need human judgment, authority or approval. Account for regulation and escalation.",
    deliverable: "Decision ownership, approval points and explicit exceptions.",
  },
  {
    number: "04",
    title: "Design the connected operating approach",
    detail:
      "Bring processes, systems, information and people into one execution design. Introduce AI where its contribution can be tested and governed.",
    deliverable: "A proposed operating workflow with technology and human roles.",
  },
  {
    number: "05",
    title: "Validate on a bounded workflow",
    detail:
      "Start small enough to learn. Agree on baseline measures, test cases, failure conditions and safeguards before expanding deployment.",
    deliverable: "A pilot scope, adoption plan and observable success measures.",
  },
  {
    number: "06",
    title: "Embed learning and accountability",
    detail:
      "Review real operational outcomes. Improve decisions, coordination and capability over time instead of measuring completion at the software launch.",
    deliverable: "An improvement cycle with ownership and performance review.",
  },
] as const;

export default function StrategyToExecutionArticle() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "From Strategy to Execution: Connecting Decisions, Workflows and Results",
    description:
      "A practice note on linking organizational strategy to operating decisions, people, processes, systems and learning.",
    author: { "@type": "Organization", name: "Myria Consulting", url: "https://myriaconsulting.com" },
    publisher: { "@type": "Organization", name: "Myria Consulting" },
    mainEntityOfPage: "https://myriaconsulting.com/insights/from-strategy-to-execution",
    inLanguage: "en-CA",
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#142b35]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-[#142b35] px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/insights"
            className="text-sm font-semibold text-[#e7bd8a] hover:underline"
          >
            ← Research &amp; insights
          </Link>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[#e7bd8a]">
            Myria practice note / Strategy &amp; operations
          </p>
          <h1 className="mt-7 max-w-5xl font-serif text-5xl font-normal leading-[1.05] md:text-7xl">
            From strategy to execution: connecting decisions, workflows and results.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">
            Strategic ambition becomes operational progress when the organization
            connects its decisions, everyday work, human responsibilities and enabling
            systems around the same objectives.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.55fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#755331]">
              The central question
            </p>
            <h2 className="mt-5 font-serif text-4xl font-normal md:text-5xl">
              What has to change in the work itself?
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#4e5e63]">
            <p>
              A roadmap can be clear while execution remains fragmented.
              Teams may agree on a priority without agreeing on how decisions
              will be made, who handles exceptions, or which information they
              need at each step.
            </p>
            <p>
              For AI-enabled transformation, this gap becomes more important:
              automating one task does not necessarily improve an end-to-end
              outcome. Design begins with the business workflow, then connects
              people, systems and intelligent support around it.
            </p>
            <p>
              The following sequence is an advisory working approach, not a
              universal recipe. The order and depth depend on each organization's
              context, risk and readiness.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#142b35]/15 bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#755331]">
            Six practical movements
          </p>
          <h2 className="mt-6 max-w-4xl font-serif text-4xl font-normal md:text-6xl">
            Make the path from decision to action visible.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-[#142b35]/15 bg-[#142b35]/15 md:grid-cols-2">
            {steps.map((step) => (
              <article className="bg-[#f7f4ee] p-8 md:p-10" key={step.number}>
                <span className="text-xs font-semibold text-[#755331]">{step.number} / 06</span>
                <h3 className="mt-5 font-serif text-3xl font-normal">{step.title}</h3>
                <p className="mt-5 leading-7 text-[#4e5e63]">{step.detail}</p>
                <p className="mt-6 border-t border-[#142b35]/15 pt-5 text-sm leading-6">
                  <strong>Working output:</strong> {step.deliverable}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#755331]">
            Illustration, not a client case
          </p>
          <h2 className="mt-6 max-w-4xl font-serif text-4xl font-normal md:text-5xl">
            Consider an exception in an order-to-delivery workflow.
          </h2>
          <p className="mt-7 max-w-4xl text-base leading-8 text-[#4e5e63]">
            A customer changes delivery requirements after an order has entered
            fulfillment. The challenge touches sales, inventory, logistics and
            the customer relationship. A connected design must clarify who can
            approve the change, which systems contain reliable information,
            when an AI advisor can assist and when a human must decide.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="border-t-2 border-[#a87532] pt-6">
              <Network size={26} strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl">One shared workflow</h3>
              <p className="mt-3 leading-7 text-[#4e5e63]">The order and its exception remain visible across functions instead of being resolved through disconnected messages.</p>
            </article>
            <article className="border-t-2 border-[#a87532] pt-6">
              <ShieldCheck size={26} strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl">Explicit human decisions</h3>
              <p className="mt-3 leading-7 text-[#4e5e63]">Approval boundaries and escalations are defined before the system starts making recommendations or taking actions.</p>
            </article>
            <article className="border-t-2 border-[#a87532] pt-6">
              <BookOpen size={26} strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl">Evidence of improvement</h3>
              <p className="mt-3 leading-7 text-[#4e5e63]">Measures could include resolution time, preventable rework, exceptions escalated and customer commitments fulfilled.</p>
            </article>
          </div>
          <p className="mt-10 text-sm italic text-[#4e5e63]">
            Illustrative scenario only; it is not represented as an actual Myria engagement or measured client outcome.
          </p>
        </div>
      </section>

      <section className="bg-[#173039] px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e7bd8a]">Connect the thinking</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-normal leading-tight md:text-5xl">
              Apply this approach to a real organizational challenge.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#dfebe6]">
              The Discovery Lab helps establish context, understand important
              constraints and identify the decisions that shape a useful next step.
            </p>
          </div>
          <Link
            href="/labs/discovery"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#142b35]"
          >
            Explore the Discovery Lab <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
