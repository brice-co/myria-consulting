"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  BrainCircuit,
  BriefcaseBusiness,
  CircleDollarSign,
  Database,
  Landmark,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { useRef } from "react";

import type { LabAdvisor } from "@/data/labs";

type LabAdvisorsSectionProps = {
  advisors: LabAdvisor[];
};

const advisorIconMap = {
  strategy: Landmark,
  finance: CircleDollarSign,
  customer: Users,
  operations: Workflow,
  technology: Network,
  "people-change": Users,
  data: Database,
  "ai-data": BrainCircuit,
  governance: ShieldCheck,
  organization: BriefcaseBusiness,
  leadership: Users,
};

export function LabAdvisorsSection({
  advisors,
}: LabAdvisorsSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start 85%",
        "end 35%",
      ],
    });

  const centralScale =
    useTransform(
      scrollYProgress,
      [0, 0.45, 1],
      [0.9, 1, 1.04],
    );

  const centralOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [0, 1],
    );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-black/10 bg-[#f6f1e7] py-20 sm:py-24 lg:py-28"
    >
      {/* Background geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.035] lg:size-[46rem]" />

        <div className="absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-700/[0.06] lg:size-[30rem]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
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
              duration: 0.6,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Advisory perspectives
            </p>

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
              className="mt-6 h-px w-20 origin-left bg-amber-700/60"
            />
          </motion.div>

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
          >
            <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-5xl">
              The challenge is examined from
              more than one point of view.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Myria brings together the
              specialist perspectives most
              relevant to the Lab, then
              synthesizes what matters across
              them into a coherent advisory
              picture.
            </p>
          </motion.div>
        </div>

        {/* Advisory system */}
        <div className="relative mt-16 lg:mt-20">
          {/* Desktop connectors */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <Connector
              className="left-[22%] top-[31%] w-[28%] rotate-[8deg]"
              delay={0.15}
            />

            <Connector
              className="right-[22%] top-[31%] w-[28%] -rotate-[8deg]"
              delay={0.2}
            />

            <Connector
              className="bottom-[31%] left-[22%] w-[28%] -rotate-[8deg]"
              delay={0.25}
            />

            <Connector
              className="bottom-[31%] right-[22%] w-[28%] rotate-[8deg]"
              delay={0.3}
            />
          </div>

          <div className="grid gap-6 lg:min-h-[36rem] lg:grid-cols-[1fr_0.78fr_1fr] lg:grid-rows-2 lg:items-center">
            {/* Advisor 1 */}
            {advisors[0] && (
              <AdvisorCard
                advisor={
                  advisors[0]
                }
                index={0}
                className="lg:col-start-1 lg:row-start-1"
              />
            )}

            {/* Advisor 2 */}
            {advisors[1] && (
              <AdvisorCard
                advisor={
                  advisors[1]
                }
                index={1}
                className="lg:col-start-3 lg:row-start-1"
              />
            )}

            {/* Myria synthesis */}
            <motion.div
              style={{
                scale: centralScale,
                opacity:
                  centralOpacity,
              }}
              className="relative z-10 flex items-center justify-center py-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:py-0"
            >
              <div className="relative flex size-48 items-center justify-center rounded-full border border-amber-700/20 bg-[#12313a] shadow-[0_24px_70px_rgba(18,49,58,0.12)] sm:size-56 lg:size-64">
                <motion.div
                  aria-hidden="true"
                  animate={{
                    scale: [
                      1,
                      1.06,
                      1,
                    ],
                    opacity: [
                      0.25,
                      0.5,
                      0.25,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-[-1.1rem] rounded-full border border-amber-700/15"
                />

                <div className="relative text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-300">
                    <Sparkles
                      className="size-4"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
                    Myria
                  </p>

                  <h3 className="mt-2 font-serif text-2xl text-white">
                    Advisory synthesis
                  </h3>

                  <p className="mx-auto mt-3 max-w-[11rem] text-xs leading-5 text-white/55">
                    Connecting specialist
                    perspectives around the
                    business challenge.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Advisor 3 */}
            {advisors[2] && (
              <AdvisorCard
                advisor={
                  advisors[2]
                }
                index={2}
                className="lg:col-start-1 lg:row-start-2"
              />
            )}

            {/* Advisor 4 */}
            {advisors[3] && (
              <AdvisorCard
                advisor={
                  advisors[3]
                }
                index={3}
                className="lg:col-start-3 lg:row-start-2"
              />
            )}
          </div>
        </div>

        {/* Public/private boundary */}
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
            duration: 0.65,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mt-14 border-t border-black/10 pt-7 lg:mt-16"
        >
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
              Inside the session
            </p>

            <p className="max-w-3xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              In the Client Portal, these
              perspectives contribute to the
              evolving analysis as the
              advisory session progresses.
              The resulting findings and
              synthesis remain part of the
              private client experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type AdvisorCardProps = {
  advisor: LabAdvisor;
  index: number;
  className?: string;
};

function AdvisorCard({
  advisor,
  index,
  className = "",
}: AdvisorCardProps) {
  const Icon =
    advisorIconMap[
      advisor.id as keyof typeof advisorIconMap
    ] ?? BriefcaseBusiness;

  return (
    <motion.article
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className={[
        "group relative z-10 border border-black/10 bg-[#fbf8f1] p-6 sm:p-7",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex size-10 items-center justify-center rounded-full border border-amber-700/15 bg-amber-700/5 text-amber-800 transition-transform duration-300 group-hover:scale-105">
          <Icon
            className="size-4"
            aria-hidden="true"
          />
        </div>

        <span className="text-xs font-medium text-slate-300">
          {String(index + 1).padStart(
            2,
            "0",
          )}
        </span>
      </div>

      <p className="mt-7 text-xs font-medium uppercase tracking-[0.16em] text-amber-700">
        Specialist perspective
      </p>

      <h3 className="mt-2 font-serif text-2xl text-slate-900">
        {advisor.name}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
        {advisor.role}
      </p>

      <div className="mt-7 h-px w-10 bg-amber-700/30 transition-all duration-300 group-hover:w-16 group-hover:bg-amber-700/60" />
    </motion.article>
  );
}

type ConnectorProps = {
  className: string;
  delay?: number;
};

function Connector({
  className,
  delay = 0,
}: ConnectorProps) {
  return (
    <motion.div
      initial={{
        scaleX: 0,
        opacity: 0,
      }}
      whileInView={{
        scaleX: 1,
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        delay,
        duration: 0.9,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={[
        "absolute h-px origin-center bg-amber-700/20",
        className,
      ].join(" ")}
    />
  );
}