"use client";

import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Compass,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";

import type {
  LabSessionSynthesis,
  LabSynthesisSectionKey,
} from "@/lib/labs/synthesis-types";

type LabSessionSynthesisProps = {
  synthesis: LabSessionSynthesis;
  onStartNextStep?: (
    nextStepId: string,
  ) => void;
};

const sectionIcons: Record<
  LabSynthesisSectionKey,
  typeof Compass
> = {
  situation: Compass,
  challenges: CircleAlert,
  priorities: Target,
  opportunities: Lightbulb,
  risks: ShieldAlert,
  recommendations: Sparkles,
  "next-steps": CheckCircle2,
};

export function LabSessionSynthesis({
  synthesis,
  onStartNextStep,
}: LabSessionSynthesisProps) {
  return (
    <section className="bg-[#f6f1e7] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800">
              Advisory synthesis
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#12313a] md:text-5xl">
              {synthesis.title}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-700">
              {synthesis.executiveSummary}
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Sparkles
                  className="size-4 text-amber-700"
                  aria-hidden="true"
                />

                <span>
                  Generated from this advisory session
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-5">
              {synthesis.sections.map(
                (section) => {
                  const Icon =
                    sectionIcons[section.key];

                  return (
                    <article
                      key={section.key}
                      className="border border-black/10 bg-[#fbf8f1] p-6 md:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center border border-black/10 bg-white/50">
                          <Icon
                            className="size-5 text-[#12313a]"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                            {section.key.replace(
                              "-",
                              " ",
                            )}
                          </p>

                          <h3 className="mt-2 font-serif text-2xl text-[#12313a]">
                            {section.title}
                          </h3>

                          {section.summary && (
                            <p className="mt-4 text-sm leading-6 text-slate-700">
                              {section.summary}
                            </p>
                          )}

                          {section.items.length >
                            0 && (
                            <div className="mt-6 space-y-3">
                              {section.items.map(
                                (item) => (
                                  <div
                                    key={
                                      item.id
                                    }
                                    className="flex gap-3"
                                  >
                                    <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-amber-700" />

                                    <p className="text-sm leading-6 text-slate-700">
                                      {
                                        item.text
                                      }
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>

            {synthesis.recommendations.length >
              0 && (
              <section className="border-t border-black/10 pt-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                    Advisory direction
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#12313a]">
                    Recommended focus
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    The following priorities reflect
                    the strongest direction emerging
                    from this session.
                  </p>
                </div>

                <div className="mt-6 grid gap-4">
                  {synthesis.recommendations.map(
                    (
                      recommendation,
                      index,
                    ) => (
                      <article
                        key={
                          recommendation.id
                        }
                        className="border border-black/10 bg-white/40 p-6"
                      >
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-4">
                            <div className="flex size-9 shrink-0 items-center justify-center border border-black/10 text-sm font-medium text-[#12313a]">
                              {index + 1}
                            </div>

                            <div>
                              <h4 className="text-base font-semibold text-[#12313a]">
                                {
                                  recommendation.title
                                }
                              </h4>

                              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
                                {
                                  recommendation.rationale
                                }
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-wrap gap-2">
                            <StatusBadge
                              label="Priority"
                              value={
                                recommendation.priority
                              }
                            />

                            <StatusBadge
                              label="Confidence"
                              value={
                                recommendation.confidence
                              }
                            />
                          </div>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}

            {synthesis.nextSteps.length >
              0 && (
              <section className="border-t border-black/10 pt-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                    From insight to action
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#12313a]">
                    Recommended next steps
                  </h3>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {synthesis.nextSteps.map(
                    (nextStep) => (
                      <article
                        key={nextStep.id}
                        className="flex min-h-56 flex-col justify-between border border-black/10 bg-[#12313a] p-6 text-white"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                            {formatNextStepType(
                              nextStep.type,
                            )}
                          </p>

                          <h4 className="mt-3 font-serif text-2xl">
                            {nextStep.title}
                          </h4>

                          <p className="mt-4 text-sm leading-6 text-white/70">
                            {
                              nextStep.description
                            }
                          </p>
                        </div>

                        {onStartNextStep && (
                          <button
                            type="button"
                            onClick={() =>
                              onStartNextStep(
                                nextStep.id,
                              )
                            }
                            className="mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-white transition hover:text-amber-300"
                          >
                            Continue with Myria

                            <ArrowRight
                              className="size-4"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type StatusBadgeProps = {
  label: string;
  value: "high" | "medium" | "low";
};

function StatusBadge({
  label,
  value,
}: StatusBadgeProps) {
  return (
    <div className="border border-black/10 bg-[#f6f1e7] px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium capitalize text-[#12313a]">
        {value}
      </p>
    </div>
  );
}

function formatNextStepType(
  type:
    | "validate"
    | "analyze"
    | "decide"
    | "plan"
    | "execute"
    | "engage-lab",
) {
  switch (type) {
    case "engage-lab":
      return "Focused Lab";

    case "validate":
      return "Validate";

    case "analyze":
      return "Analyze";

    case "decide":
      return "Decision";

    case "plan":
      return "Plan";

    case "execute":
      return "Execute";

    default:
      return type;
  }
}