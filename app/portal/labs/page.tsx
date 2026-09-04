import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import { advisoryLabs } from "@/data/labs";

export default function PortalLabsPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
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
              Advisory Labs
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Choose the Lab that best matches the question, challenge, or
              opportunity you want to work through.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
              Each Lab provides a structured advisory process designed to move
              from initial context toward clearer priorities, implications, and
              next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Select a Lab
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                Where would you like to begin?
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Discovery is the broadest starting point. Focused Labs are useful
              when the area of work is already clearer.
            </p>
          </div>

          <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2">
            {advisoryLabs.map((lab) => {
              const Icon = lab.icon;

              return (
                <Link
                  key={lab.slug}
                  href={`/portal/labs/${lab.slug}`}
                  className="group relative flex min-h-[320px] flex-col justify-between bg-[#fbf8f1] p-7 transition duration-300 hover:bg-white sm:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex size-11 items-center justify-center border border-black/10 bg-white text-[#12313a]">
                        <Icon
                          className="size-5"
                          aria-hidden="true"
                        />
                      </div>

                      {lab.isPrimary && (
                        <span className="border border-amber-700/20 bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-amber-800">
                          Recommended start
                        </span>
                      )}
                    </div>

                    <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
                      {lab.shortTitle}
                    </p>

                    <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900">
                      {lab.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                      {lab.tagline}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
                    <span className="text-sm text-slate-500">
                      {lab.stages.length} advisory stages
                    </span>

                    <span className="flex items-center gap-2 text-sm font-medium text-[#12313a]">
                      Open Lab

                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guidance */}
      <section className="border-t border-black/10 bg-white py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Not sure where to start?
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900">
              Start with Discovery.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-base leading-7 text-slate-600">
              The Discovery Lab is designed for situations where the challenge
              is still broad, several issues may be connected, or the right
              starting point is not yet obvious. It helps establish the context
              before narrowing the work into a more focused direction.
            </p>

            <Link
              href="/portal/labs/discovery"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#12313a]"
            >
              Open Discovery Lab

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