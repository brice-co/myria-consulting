"use client";

import { motion } from "framer-motion";

import type { AdvisoryLab } from "@/data/labs";

type LabExploreSectionProps = {
  explore: string[];
};

export function LabExploreSection({
  explore,
}: LabExploreSectionProps) {
  return (
    <section className="overflow-hidden border-b border-black/10 bg-[#f6f1e7] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-4xl">
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
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
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700"
          >
            What we&apos;ll explore
          </motion.p>

          <motion.h2
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
              amount: 0.6,
            }}
            transition={{
              delay: 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl"
          >
            A structured look at the challenge from the
            angles that matter.
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
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
              delay: 0.16,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-600"
          >
            The Lab examines the business situation across
            the dimensions that are most likely to shape
            the challenge, its implications, and the
            direction forward.
          </motion.p>
        </div>

        {/* Exploration grid */}
        <div className="mt-14 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((item, index) => (
            <motion.article
              key={item}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.6,
                delay: (index % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.015,
              }}
              className="group relative min-h-48 overflow-hidden border-b border-r border-black/10 bg-[#fbf8f1] p-6 sm:p-7 lg:min-h-52 lg:p-8"
            >
              {/* Decorative number */}
              <div className="flex items-start justify-between gap-6">
                <span className="text-xs font-medium tracking-[0.12em] text-amber-700">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <motion.div
                  aria-hidden="true"
                  initial={{
                    scale: 0.5,
                    opacity: 0,
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.8,
                  }}
                  transition={{
                    delay:
                      0.18 +
                      (index % 3) * 0.05,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="size-2 rounded-full bg-amber-700/50"
                />
              </div>

              <div className="flex h-[calc(100%-1.5rem)] items-end">
                <div>
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
                        0.1 +
                        (index % 3) * 0.05,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-5 h-px w-10 origin-left bg-amber-700/40 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-700/70"
                  />

                  <h3 className="max-w-xs font-serif text-2xl leading-snug text-slate-900 transition-transform duration-300 group-hover:-translate-y-1">
                    {item}
                  </h3>
                </div>
              </div>

              {/* Hover wash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#12313a]/0 transition-colors duration-500 group-hover:bg-[#12313a]/[0.025]"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}