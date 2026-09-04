"use client";

import { motion } from "framer-motion";



type LabChallengesSectionProps = {
  challenges: string[];
};

export function LabChallengesSection({
  challenges,
}: LabChallengesSectionProps) {
  return (
    <section className="overflow-hidden border-b border-black/10 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Section context */}
          <motion.div
            initial={{
              opacity: 0,
              y: 36,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              When this Lab helps
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl">
              The situations this Lab is designed for.
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
                amount: 0.8,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 h-px w-20 origin-left bg-amber-700/60"
            />

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              These are the kinds of situations where a
              structured advisory conversation can help
              clarify what is really happening before
              moving too quickly toward a solution.
            </p>
          </motion.div>

          {/* Challenges */}
          <div className="border-y border-black/10">
            {challenges.map(
              (challenge, index) => (
                <motion.article
                  key={challenge}
                  initial={{
                    opacity: 0,
                    x: 48,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.55,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group grid gap-5 border-b border-black/10 py-7 last:border-b-0 sm:grid-cols-[56px_1fr] sm:items-start sm:py-8"
                >
                  <div className="flex items-start">
                    <motion.span
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="text-sm font-medium text-amber-700"
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </motion.span>
                  </div>

                  <div className="relative">
                    <p className="max-w-3xl text-base leading-7 text-slate-700 transition-colors duration-300 group-hover:text-slate-900 sm:text-lg sm:leading-8">
                      {challenge}
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
                        amount: 0.8,
                      }}
                      transition={{
                        delay:
                          0.15 +
                          index * 0.05,
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="mt-5 h-px w-10 origin-left bg-amber-700/30 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-700/60"
                    />
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}