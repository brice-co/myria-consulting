import Link from "next/link";
import {
  ArrowRight,
  FileText,
  FlaskConical,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import { advisoryLabs } from "@/data/labs";

export default function PortalPage() {
  const primaryLab =
    advisoryLabs.find((lab) => lab.isPrimary) ??
    advisoryLabs[0];

  const focusedLabs =
    advisoryLabs.filter(
      (lab) => !lab.isPrimary,
    );

  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      {/* Portal header */}
      <section className="border-b border-black/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
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

              <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-5xl lg:text-6xl">
                Your advisory workspace.
              </h1>

              <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
                Work through business questions, explore focused challenges,
                and turn each advisory session into a clearer path forward.
              </p>
            </div>

            <Link
              href="/portal/labs"
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
            >
              Explore Advisory Labs

              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Primary actions */}
      <section className="border-b border-black/10 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
            <DashboardAction
              href="/portal/labs"
              icon={FlaskConical}
              eyebrow="Advisory Labs"
              title="Start or explore a Lab"
              description="Choose a structured advisory experience for discovery, strategy, operations, AI and data, or people and change."
            />

            <DashboardAction
              href="/portal/labs/discovery"
              icon={Sparkles}
              eyebrow="Recommended start"
              title="Begin with Discovery"
              description="Use Discovery when the challenge is broad, several issues may be connected, or the right starting point is not yet clear."
            />

            <DashboardAction
              href="/portal/reports"
              icon={FileText}
              eyebrow="Advisory outputs"
              title="View reports"
              description="Return to completed advisory work, session syntheses, and future deliverables in one place."
            />
          </div>
        </div>
      </section>

      {/* Main workspace */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
          {/* Suggested starting point */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Suggested next step
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl">
              Start with the question that matters most.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              You do not need to know the solution before entering a Lab.
              Choose the area that best reflects the situation you want to
              understand, improve, or move forward.
            </p>

            {primaryLab && (
              <Link
                href={`/portal/labs/${primaryLab.slug}`}
                className="group mt-8 block border border-black/10 bg-[#fbf8f1] p-7 transition duration-300 hover:bg-white sm:p-8"
              >
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
                      Recommended starting Lab
                    </p>

                    <h3 className="mt-3 font-serif text-3xl leading-tight text-slate-900">
                      {primaryLab.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                      {primaryLab.tagline}
                    </p>
                  </div>

                  <ArrowRight
                    className="mt-1 size-5 shrink-0 text-[#12313a] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-5 text-sm text-slate-500">
                  <span>
                    {primaryLab.stages.length} stages
                  </span>

                  <span
                    className="size-1 rounded-full bg-slate-300"
                    aria-hidden="true"
                  />

                  <span>
                    Structured advisory session
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Activity */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Your activity
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900">
              Advisory work in one place.
            </h2>

            <div className="mt-8 border-y border-black/10">
              <div className="py-7">
                <p className="text-sm font-medium text-slate-900">
                  Active sessions
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sessions you start will appear here so you can return to
                  unfinished advisory work.
                </p>

                <p className="mt-5 text-3xl font-serif text-slate-900">
                  —
                </p>
              </div>

              <div className="border-t border-black/10 py-7">
                <p className="text-sm font-medium text-slate-900">
                  Completed sessions
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Completed Labs and their advisory syntheses will be available
                  from your portal history.
                </p>

                <p className="mt-5 text-3xl font-serif text-slate-900">
                  —
                </p>
              </div>

              <div className="border-t border-black/10 py-7">
                <p className="text-sm font-medium text-slate-900">
                  Reports
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Final advisory outputs and future downloadable reports will
                  be collected here.
                </p>

                <Link
                  href="/portal/reports"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#12313a]"
                >
                  View reports

                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focused Labs */}
      <section className="border-t border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Focused Labs
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                Go deeper where the challenge is already clear.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
                Focused Labs are designed for situations where the area of work
                is already known and a more targeted advisory process is useful.
              </p>
            </div>

            <div className="border-y border-black/10">
              {focusedLabs.map((lab) => (
                <Link
                  key={lab.slug}
                  href={`/portal/labs/${lab.slug}`}
                  className="group grid gap-5 border-b border-black/10 py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <h3 className="font-serif text-xl text-slate-900">
                      {lab.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {lab.tagline}
                    </p>
                  </div>

                  <ArrowRight
                    className="size-4 text-[#12313a] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type DashboardActionProps = {
  href: string;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  eyebrow: string;
  title: string;
  description: string;
};

function DashboardAction({
  href,
  icon: Icon,
  eyebrow,
  title,
  description,
}: DashboardActionProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[260px] flex-col justify-between bg-[#fbf8f1] p-7 transition duration-300 hover:bg-white sm:p-8"
    >
      <div>
        <div className="flex size-11 items-center justify-center border border-black/10 bg-white text-[#12313a]">
          <Icon
            className="size-5"
            aria-hidden={true}
          />
        </div>

        <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
          {eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-2xl leading-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#12313a]">
        Open

        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}