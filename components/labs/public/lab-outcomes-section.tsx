"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type LabOutcomesSectionProps = {
  outcomes: string[];
};

export function LabOutcomesSection({
  outcomes,
}: LabOutcomesSectionProps)  {
  return (
    <section className="overflow-hidden border-b border-black/10 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Section heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.45,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              What you&apos;ll leave with
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl">
              Clarity that can move into action.
            </h2>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 h-px w-20 origin-left bg-amber-700/60"
            />

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              The purpose of the Lab is not
              simply to generate ideas. It is
              to leave the organization with a
              clearer understanding of the
              situation, what matters most,
              and where to focus next.
            </p>
          </motion.div>

          {/* Outcomes */}
          <div className="border-y border-black/10">
            {outcomes.map(
              (outcome, index) => (
                <motion.article
                  key={outcome}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.55,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      Math.min(
                        index * 0.05,
                        0.25,
                      ),
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="group grid gap-5 border-b border-black/10 py-7 last:border-b-0 sm:grid-cols-[56px_1fr_auto] sm:items-center sm:py-8"
                >
                  {/* Number */}
                  <span className="text-sm font-medium text-amber-700">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  {/* Outcome */}
                  <div>
                    <p className="max-w-2xl font-serif text-xl leading-snug text-slate-900 sm:text-2xl">
                      {outcome}
                    </p>

                    <motion.div
                      aria-hidden="true"
                      initial={{
                        scaleX: 0,
                      }}
                      whileInView={{
                        scaleX: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay:
                          0.12 +
                          Math.min(
                            index *
                              0.04,
                            0.2,
                          ),
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="mt-4 h-px w-10 origin-left bg-amber-700/30 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-700/60"
                    />
                  </div>

                  {/* Completion marker */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay:
                        0.18 +
                        Math.min(
                          index *
                            0.04,
                          0.2,
                        ),
                      duration: 0.45,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="hidden text-amber-700/50 sm:block"
                  >
                    <CheckCircle2
                      className="size-5 transition-colors duration-300 group-hover:text-amber-700"
                      aria-hidden="true"
                    />
                  </motion.div>
                </motion.article>
              ),
            )}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 border-t border-black/10 pt-8 lg:mt-16"
        >
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
              The result
            </p>

            <p className="max-w-3xl font-serif text-xl leading-8 text-slate-800 sm:text-2xl">
              A stronger basis for deciding
              what deserves attention,
              what requires further
              validation, and what should
              move into action.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}