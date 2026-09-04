import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  discoveryLab,
  focusedLabs,
} from "@/data/labs";

export function LabsSection() {
  const DiscoveryIcon = discoveryLab.icon;

  return (
    <section
      id="labs"
      className="relative border-t border-black/10 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Section introduction */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
            Advisory Labs
          </p>

          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
            Start with the challenge,
            <br />
            not the solution.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
            Myria&apos;s Advisory Labs are structured working sessions designed
            to bring clarity to complex business challenges and turn that
            clarity into practical action.
          </p>
        </div>

        {/* Primary entry point */}
        <div className="mt-14 grid overflow-hidden rounded-sm border border-slate-800 bg-[#12313a] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex size-11 items-center justify-center rounded-full border border-amber-500/40 text-amber-400">
              <DiscoveryIcon
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
              Start here
            </p>

            <h3 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
              {discoveryLab.title}
            </h3>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
              {discoveryLab.tagline}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              {discoveryLab.description}
            </p>

            <Link
              href={`/labs/${discoveryLab.slug}`}
              className="mt-8 inline-flex items-center gap-2 border-b border-amber-400 pb-1 text-sm font-medium text-amber-300 transition hover:text-amber-200"
            >
              Start Discovery

              <ArrowRight
                className="size-4"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Discovery journey */}
          <div className="border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Your starting point
            </p>

            <div className="mt-8 space-y-0">
              {discoveryLab.stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {index < discoveryLab.stages.length - 1 && (
                    <div
                      className="absolute left-[11px] top-6 h-full w-px bg-white/10"
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-[#12313a] text-[10px] font-medium text-amber-300">
                    {stage.id}
                  </div>

                  <div>
                    <p className="text-sm font-medium leading-6 text-white/80">
                      {stage.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Focused Labs */}
        <div className="mt-20">
          <div className="flex items-end justify-between gap-8 border-b border-black/10 pb-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Explore a focused Lab
              </p>

              <h3 className="mt-3 font-serif text-2xl text-slate-900 sm:text-3xl">
                Already know where you need clarity?
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {focusedLabs.map((lab, index) => {
              const Icon = lab.icon;

              return (
                <Link
                  key={lab.slug}
                  href={`/labs/${lab.slug}`}
                  className={[
                    "group relative border-black/10 py-8 transition",
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10",
                    index < 2 ? "border-b" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <Icon
                        className="size-5 text-amber-700"
                        aria-hidden="true"
                      />

                      <h4 className="mt-5 font-serif text-2xl text-slate-900">
                        {lab.shortTitle}
                      </h4>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                        {lab.tagline}
                      </p>
                    </div>

                    <ArrowRight
                      className="mt-1 size-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-700"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}