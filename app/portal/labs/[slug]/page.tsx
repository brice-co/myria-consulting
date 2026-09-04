import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import { getLabBySlug } from "@/data/labs";

type PortalLabPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortalLabPage({
  params,
}: PortalLabPageProps) {
  const { slug } = await params;

  const lab = getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-amber-700">
                <LockKeyhole
                  className="size-4"
                  aria-hidden="true"
                />

                <p className="text-xs font-medium uppercase tracking-[0.2em]">
                  Client Portal
                </p>
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-5xl lg:text-6xl">
                {lab.title}
              </h1>

              <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
                {lab.tagline}
              </p>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                {lab.description}
              </p>
            </div>

            <Link
              href={`/portal/labs/${lab.slug}/sessions/new`}
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
            >
              Start advisory session

              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Lab overview */}
      <section className="border-b border-black/10 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Session structure
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                The engagement moves through five focused stages.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
                Each stage builds on the previous one so the session can move
                from understanding the situation toward a clearer advisory
                direction.
              </p>
            </div>

            <div className="border-y border-black/10">
              {lab.stages.map((stage) => (
                <div
                  key={stage.id}
                  className="grid gap-5 border-b border-black/10 py-6 last:border-b-0 sm:grid-cols-[56px_1fr]"
                >
                  <span className="text-sm font-medium text-amber-700">
                    {String(stage.id).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-serif text-xl text-slate-900">
                      {stage.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expected outcomes */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Expected output
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                What the session is designed to produce.
              </h2>
            </div>

            <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
              {lab.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="bg-[#fbf8f1] p-6 sm:p-7"
                >
                  <span className="text-xs font-medium text-amber-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 font-serif text-xl leading-snug text-slate-900">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Start session CTA */}
      <section className="bg-[#12313a] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
                Ready to begin
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Start your {lab.title} session.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
                Your session will move through the Lab stage by stage, building
                an evolving advisory picture and concluding with a structured
                synthesis.
              </p>
            </div>

            <Link
              href={`/portal/labs/${lab.slug}/sessions/new`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-amber-300 px-6 text-sm font-medium text-[#12313a] transition hover:bg-amber-200"
            >
              Start advisory session

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