"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import type { LabStage } from "@/data/labs";

type LabProcessSectionProps = {
  stages: LabStage[];
};

export function LabProcessSection({
  stages,
}: LabProcessSectionProps)  {
  const sectionRef =
    useRef<HTMLElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start 75%",
        "end 65%",
      ],
    });

  const progress =
    useSpring(scrollYProgress, {
      stiffness: 90,
      damping: 24,
      mass: 0.35,
    });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden border-b border-white/10 bg-[#12313a] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-48 -top-48 size-[34rem] rounded-full border border-white/[0.04]" />
        <div className="absolute -right-24 -top-24 size-[24rem] rounded-full border border-amber-300/[0.05]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
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
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300"
            >
              How the engagement works
            </motion.p>

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
                delay: 0.12,
                duration: 0.7,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mt-6 h-px w-20 origin-left bg-amber-300/60"
            />
          </div>

          <div>
            <motion.h2
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
                amount: 0.6,
              }}
              transition={{
                duration: 0.7,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
            >
              Structured thinking,
              step by step.
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
                delay: 0.1,
                duration: 0.6,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mt-5 max-w-2xl text-base leading-7 text-white/60"
            >
              The Lab moves through a
              deliberate sequence. Each
              stage builds on the one before
              it, helping turn an initial
              challenge into a clearer
              understanding of where
              attention should go next.
            </motion.p>
          </div>
        </div>

        {/* Process */}
        <div className="relative mt-16 lg:mt-20">
          {/* Desktop track */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-white/10 lg:block"
          />

          {/* Scroll progress */}
          <motion.div
            aria-hidden="true"
            style={{
              scaleX: progress,
            }}
            className="absolute left-0 right-0 top-[1.1rem] hidden h-px origin-left bg-amber-300 lg:block"
          />

          <div className="grid gap-0 lg:grid-cols-5">
            {stages.map(
              (stage, index) => (
                <motion.article
                  key={stage.id}
                  initial={{
                    opacity: 0,
                    y: 42,
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
                    duration: 0.65,
                    delay:
                      index * 0.07,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="group relative grid grid-cols-[48px_1fr] gap-5 border-t border-white/10 py-8 first:border-t-0 lg:block lg:border-t-0 lg:py-0 lg:pr-8"
                >
                  {/* Stage marker */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="flex size-9 items-center justify-center rounded-full border border-amber-300/40 bg-[#12313a] text-xs font-medium text-amber-300 transition-colors duration-300 group-hover:border-amber-300 group-hover:bg-amber-300 group-hover:text-[#12313a]"
                    >
                      {String(
                        stage.id,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </motion.div>
                  </div>

                  {/* Stage content */}
                  <div className="lg:mt-8">
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/35">
                      Stage{" "}
                      {String(
                        stage.id,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl leading-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                      {stage.title}
                    </h3>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-white/55 transition-colors duration-300 group-hover:text-white/70">
                      {
                        stage.description
                      }
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
                          0.15 +
                          index *
                            0.06,
                        duration: 0.55,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="mt-6 h-px w-8 origin-left bg-amber-300/30 transition-all duration-300 group-hover:w-14 group-hover:bg-amber-300/70"
                    />
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
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
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mt-16 border-t border-white/10 pt-8 lg:mt-20"
        >
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
              From challenge to direction
            </p>

            <p className="max-w-3xl font-serif text-xl leading-8 text-white/85 sm:text-2xl">
              The objective is not to rush
              toward an answer, but to build
              enough clarity to determine
              what deserves attention and
              what should happen next.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}