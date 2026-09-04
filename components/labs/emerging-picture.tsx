"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { LabInsightGroup } from "@/data/lab-insights";
import type { SessionFinding } from "@/lib/labs/session-types";

type EmergingPictureProps = {
  activeStageId: number;
  groups: LabInsightGroup[];
  findings: SessionFinding[];
};

export function EmergingPicture({
  activeStageId,
  groups,
  findings,
}: EmergingPictureProps) {
  const visibleFindings = findings.filter(
    (finding) => finding.stageId <= activeStageId,
  );

  return (
    <section className="border-b border-black/10 bg-[#f6f1e7] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Introduction */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Emerging picture
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
              Make the thinking visible as the session develops.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              As Myria works through the challenge, the emerging picture
              develops alongside the conversation—connecting observations,
              specialist perspectives, and the decisions that matter.
            </p>
          </div>

          {/* Synthesis workspace */}
          <div className="border border-black/10 bg-white/40 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-black/10 pb-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Live advisory synthesis
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  Stage {String(activeStageId).padStart(2, "0")}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <motion.span
                  className="size-2 rounded-full bg-amber-700"
                  animate={{
                    opacity: [0.45, 1, 0.45],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                Synthesizing
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStageId}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="mt-6 space-y-8"
              >
                {/* Methodology / what Myria is examining */}
                {groups.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div key={group.label}>
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full border border-amber-700/20 bg-amber-700/5 text-amber-800">
                          <Icon
                            className="size-4"
                            aria-hidden="true"
                          />
                        </div>

                        <h3 className="font-serif text-xl text-slate-900">
                          {group.label}
                        </h3>
                      </div>

                      <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
                        {group.items.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{
                              opacity: 0,
                              x: -6,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: index * 0.08,
                              duration: 0.25,
                            }}
                            className="flex gap-4 py-4"
                          >
                            <span className="mt-1 shrink-0 text-xs font-medium text-amber-700">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <p className="text-sm leading-6 text-slate-700">
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Session-specific findings */}
                {visibleFindings.length > 0 && (
                  <div className="border-t border-black/10 pt-8">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-800">
                          What we&apos;re learning
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          Findings emerging from this session
                        </p>
                      </div>

                      <span className="text-xs text-slate-400">
                        {visibleFindings.length}{" "}
                        {visibleFindings.length === 1
                          ? "finding"
                          : "findings"}
                      </span>
                    </div>

                    <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
                      {visibleFindings.map((finding) => (
                        <motion.div
                          key={finding.id}
                          initial={{
                            opacity: 0,
                            y: 6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="py-5"
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={[
                                "text-[10px] font-medium uppercase tracking-[0.14em]",
                                finding.status === "observed"
                                  ? "text-slate-500"
                                  : finding.status === "inferred"
                                    ? "text-amber-800"
                                    : "text-slate-400",
                              ].join(" ")}
                            >
                              {finding.status === "to-validate"
                                ? "To validate"
                                : finding.status}
                            </span>

                            <span
                              className="size-1 rounded-full bg-black/20"
                              aria-hidden="true"
                            />

                            <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                              {finding.category}
                            </span>

                            <span
                              className="size-1 rounded-full bg-black/20"
                              aria-hidden="true"
                            />

                            <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                              Stage{" "}
                              {String(finding.stageId).padStart(
                                2,
                                "0",
                              )}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-slate-700">
                            {finding.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty session state */}
                {visibleFindings.length === 0 && (
                  <div className="border-t border-black/10 pt-8">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      What we&apos;re learning
                    </p>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                      Your session findings will begin appearing here as you
                      respond to Myria&apos;s advisory questions.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}