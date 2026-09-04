import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Network,
  Sparkles,
  Users,
} from "lucide-react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Myria Consulting | Client Portal",
  description: "Myria Client Portal",
  keywords: ["Myria", "Myria Consulting", "Virtual Management Consulting", "Virtual Advisory Service", "Distributed Systems", "Management Consulting", "Advisory Service"],
};

const engagementSteps = [
  {
    number: "01",
    title: "Start with a conversation",
    description:
      "We begin with the business situation, not the technology. Together, we clarify the challenge, context, and outcome you are trying to achieve.",
  },
  {
    number: "02",
    title: "Define the engagement",
    description:
      "Myria recommends the appropriate advisory engagement, including the Labs, specialist perspectives, and level of support required.",
  },
  {
    number: "03",
    title: "Activate your workspace",
    description:
      "Once the engagement is confirmed, invited participants receive access to their private Myria Client Portal.",
  },
  {
    number: "04",
    title: "Work through the challenge",
    description:
      "Structured Advisory Labs help your team explore the situation, surface important findings, test assumptions, and develop a clearer direction.",
  },
  {
    number: "05",
    title: "Move from insight to action",
    description:
      "The engagement produces a structured synthesis, recommended priorities, and practical next steps that can guide decisions and implementation.",
  },
];

const portalCapabilities = [
  {
    icon: Sparkles,
    title: "Advisory Labs",
    description:
      "Structured working sessions focused on Discovery, Strategy, Operations, AI & Data, and People & Change.",
  },
  {
    icon: Users,
    title: "Advisory perspectives",
    description:
      "Specialist perspectives are brought together around the business question being explored.",
  },
  {
    icon: Network,
    title: "Emerging picture",
    description:
      "Important observations, opportunities, risks, and implications develop as the engagement progresses.",
  },
  {
    icon: FileText,
    title: "Advisory outputs",
    description:
      "Completed work is consolidated into structured findings, direction, recommendations, and next steps.",
  },
];

export default function ClientPortalPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-amber-700">
              <LockKeyhole
                className="size-4"
                aria-hidden="true"
              />

              <p className="text-xs font-medium uppercase tracking-[0.2em]">
                Myria Client Portal
              </p>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-7xl">
              Your private advisory workspace.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-700">
              The Myria Client Portal brings your advisory engagement into one place —
              from structured working sessions and specialist perspectives to emerging findings,
              recommendations, and next steps.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
              Access is available to clients invited by Myria as part of an
              active advisory engagement.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/experience-lab"
                className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
              >
                
                  Experience a working session
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>              

                </div>
          </div>

          <div className="border border-black/10 bg-[#fbf8f1] p-7 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
              Client access
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900">
              Access is by invitation.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              The portal is not a public self-service platform. It is part of
              an active Myria advisory engagement and is made available to
              designated client participants.
            </p>

            <div className="mt-7 space-y-4 border-t border-black/10 pt-6">
              <AccessPoint text="Engagement confirmed with Myria" />
              <AccessPoint text="Participant invited by Myria" />
              <AccessPoint text="Private advisory workspace activated" />
            </div>
          </div>
        </div>
      </section>

      {/* How Myria works with clients */}
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                How Myria works with clients
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl">
                From business challenge to advisory action.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
                Myria engagements are structured to create clarity before
                moving too quickly toward a solution.
              </p>
            </div>

            <div className="border-y border-black/10">
              {engagementSteps.map((step) => (
                <article
                  key={step.number}
                  className="grid gap-6 border-b border-black/10 py-7 last:border-b-0 sm:grid-cols-[70px_1fr] sm:py-8"
                >
                  <span className="text-sm font-medium text-amber-700">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is inside the portal */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Inside the client experience
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl">
              More than a conversation.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              The portal supports a structured advisory process designed to
              develop an evolving picture of the situation and translate it
              into practical direction.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {portalCapabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="min-h-[260px] bg-[#fbf8f1] p-7 sm:p-8"
                >
                  <div className="flex size-11 items-center justify-center border border-black/10 bg-white text-[#12313a]">
                    <Icon
                      className="size-5"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-7 font-serif text-2xl text-slate-900">
                    {capability.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Positioning statement */}
      <section className="bg-[#12313a] py-20 text-white sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
                The Myria approach
              </p>
            </div>

            <div>
              <blockquote className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                The clarity to move from ambition to action.
              </blockquote>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
                Advisory Labs provide the structure. The virtual advisory team
                brings specialist thinking together. The client engagement
                turns that work into practical direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 border-y border-black/10 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Work with Myria
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                Start with the business challenge.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                If you are exploring an important business, operating, AI, or
                organizational challenge, start with a conversation. Myria can
                help determine the right advisory engagement and starting Lab.
              </p>
            </div>

            <Link
              href="/experience-lab"
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
            >
              Experience a working session

              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type AccessPointProps = {
  text: string;
};

function AccessPoint({
  text,
}: AccessPointProps) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0 text-amber-700"
        aria-hidden="true"
      />

      <p className="text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}