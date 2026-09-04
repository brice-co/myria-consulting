"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  Database,
  Lightbulb,
  Network,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { LabAdvisor } from "@/data/labs";

type VirtualAdvisoryTeamProps = {
  advisors: LabAdvisor[];
  activeStageId: number;
  totalStages: number;
};

const advisorIcons: Record<string, LucideIcon> = {
  strategy: Target,
  operations: Settings2,
  "people-change": Users,
  "ai-data": BrainCircuit,
  finance: CircleDollarSign,
  customer: Sparkles,
  technology: Network,
  data: Database,
  governance: ShieldCheck,
  organization: Building2,
  leadership: Lightbulb,
};

export function VirtualAdvisoryTeam({
  advisors,
  activeStageId,
  totalStages,
}: VirtualAdvisoryTeamProps) {
  const [activeAdvisorId, setActiveAdvisorId] = useState(
    advisors[0]?.id ?? "",
  );

  const activeAdvisor =
    advisors.find((advisor) => advisor.id === activeAdvisorId) ??
    advisors[0];

  const contributingAdvisorIds = getContributingAdvisorIds(
    advisors,
    activeStageId,
    totalStages,
  );

  if (!activeAdvisor) {
    return null;
  }

  const advisorPositions = getAdvisorPositions(advisors.length);

  return (
    <section className="border-b border-black/10 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Section copy */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Virtual advisory team
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
              Specialist perspectives, brought together around your challenge.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Myria brings together the expertise most relevant to your
              situation, examines the challenge from multiple perspectives,
              and synthesizes those perspectives into one coherent advisory
              experience.
            </p>

            <div className="mt-8 border-l border-amber-700/30 pl-5">
              <p className="text-sm leading-6 text-slate-600">
                You work with{" "}
                <span className="font-medium text-slate-900">Myria</span>. The
                specialist team works behind the experience.
              </p>
            </div>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Current advisory stage
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full border border-amber-700/30 bg-amber-700/5 text-xs font-medium text-amber-800">
                  {String(activeStageId).padStart(2, "0")}
                </span>

                <p className="text-sm text-slate-600">
                  {contributingAdvisorIds.length} of {advisors.length} specialist
                  perspectives currently contributing
                </p>
              </div>
            </div>
          </div>

          {/* Interactive advisory team */}
          <div>
            <div className="relative min-h-[500px] overflow-hidden border border-black/10 bg-[#f6f1e7] p-6 sm:p-8 lg:p-10">
              {/* Background pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #0f172a 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Advisory intelligence
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {contributingAdvisorIds.length} specialist{" "}
                      {contributingAdvisorIds.length === 1
                        ? "perspective"
                        : "perspectives"}{" "}
                      contributing
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <motion.span
                      className="size-2 rounded-full bg-amber-600"
                      animate={{
                        opacity: [0.45, 1, 0.45],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    Active
                  </div>
                </div>

                {/* Network */}
                <div className="relative mx-auto mt-12 h-[270px] max-w-lg">
                  {/* Center Myria */}
                  <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="flex size-24 items-center justify-center rounded-full border border-amber-700/30 bg-[#12313a] shadow-sm"
                      animate={{
                        scale: [1, 1.025, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-center">
                        <span className="font-serif text-xl text-white">
                          Myria
                        </span>

                        <span className="mt-1 block text-[9px] uppercase tracking-[0.15em] text-white/45">
                          Synthesis
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connection lines */}
                  <svg
                    className="pointer-events-none absolute inset-0 size-full"
                    viewBox="0 0 500 270"
                    aria-hidden="true"
                  >
                    {advisorPositions.map((position, index) => {
                      const advisor = advisors[index];

                      if (!advisor) {
                        return null;
                      }

                      const isActive =
                        advisor.id === activeAdvisorId;

                      const isContributing =
                        contributingAdvisorIds.includes(advisor.id);

                      return (
                        <motion.line
                          key={advisor.id}
                          x1="250"
                          y1="135"
                          x2={position.svgX}
                          y2={position.svgY}
                          stroke={
                            isActive || isContributing
                              ? "rgb(180 83 9)"
                              : "rgb(15 23 42)"
                          }
                          strokeWidth={
                            isActive
                              ? 1.8
                              : isContributing
                                ? 1.2
                                : 1
                          }
                          initial={false}
                          animate={{
                            opacity: isActive
                              ? 0.85
                              : isContributing
                                ? 0.38
                                : 0.08,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                        />
                      );
                    })}
                  </svg>

                  {/* Advisor nodes */}
                  {advisors.map((advisor, index) => {
                    const position = advisorPositions[index];

                    if (!position) {
                      return null;
                    }

                    const Icon =
                      advisorIcons[advisor.id] ??
                      ChartNoAxesCombined;

                    const isActive =
                      advisor.id === activeAdvisorId;

                    const isContributing =
                      contributingAdvisorIds.includes(advisor.id);

                    return (
                      <motion.button
                        key={advisor.id}
                        type="button"
                        onClick={() =>
                          setActiveAdvisorId(advisor.id)
                        }
                        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-4"
                        style={{
                          left: position.left,
                          top: position.top,
                        }}
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        aria-pressed={isActive}
                      >
                        <motion.div
                          className={[
                            "flex min-w-[128px] items-center gap-3 border px-3 py-2.5 transition-colors",
                            isActive
                              ? "border-amber-700/50 bg-white"
                              : isContributing
                                ? "border-amber-700/20 bg-amber-50/50"
                                : "border-black/10 bg-[#f6f1e7]",
                          ].join(" ")}
                          animate={{
                            y: isActive ? -2 : 0,
                            opacity:
                              isContributing || isActive
                                ? 1
                                : 0.5,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <div
                            className={[
                              "flex size-8 shrink-0 items-center justify-center rounded-full border",
                              isActive
                                ? "border-amber-700/30 bg-amber-700/10 text-amber-800"
                                : isContributing
                                  ? "border-amber-700/20 bg-amber-700/5 text-amber-700"
                                  : "border-black/10 text-slate-400",
                            ].join(" ")}
                          >
                            <Icon
                              className="size-4"
                              aria-hidden="true"
                            />
                          </div>

                          <span
                            className={[
                              "text-xs font-medium",
                              isActive
                                ? "text-slate-900"
                                : isContributing
                                  ? "text-slate-700"
                                  : "text-slate-500",
                            ].join(" ")}
                          >
                            {advisor.name}
                          </span>
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Active perspective */}
                <motion.div
                  key={`${activeAdvisor.id}-${activeStageId}`}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-8 border-t border-black/10 pt-6"
                >
                  <div className="flex items-start gap-4">
                    <motion.span
                      className="mt-1 block size-2 shrink-0 rounded-full bg-amber-700"
                      animate={{
                        scale: contributingAdvisorIds.includes(
                          activeAdvisor.id,
                        )
                          ? [1, 1.25, 1]
                          : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: contributingAdvisorIds.includes(
                          activeAdvisor.id,
                        )
                          ? Infinity
                          : 0,
                        ease: "easeInOut",
                      }}
                    />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-800">
                        {activeAdvisor.name} perspective
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {activeAdvisor.role}
                      </p>

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        {contributingAdvisorIds.includes(
                          activeAdvisor.id,
                        )
                          ? "This perspective is contributing to the current stage of the advisory process."
                          : "This specialist remains available but is not a primary contributor at this stage."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Select a specialist perspective to see how the virtual advisory
              team contributes to the analysis. The active contributors change
              as the Lab moves through each stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type AdvisorPosition = {
  left: string;
  top: string;
  svgX: number;
  svgY: number;
};

function getAdvisorPositions(
  count: number,
): AdvisorPosition[] {
  const positions: AdvisorPosition[] = [
    {
      left: "50%",
      top: "7%",
      svgX: 250,
      svgY: 18,
    },
    {
      left: "88%",
      top: "50%",
      svgX: 440,
      svgY: 135,
    },
    {
      left: "50%",
      top: "93%",
      svgX: 250,
      svgY: 252,
    },
    {
      left: "12%",
      top: "50%",
      svgX: 60,
      svgY: 135,
    },
    {
      left: "81%",
      top: "16%",
      svgX: 405,
      svgY: 43,
    },
    {
      left: "81%",
      top: "84%",
      svgX: 405,
      svgY: 227,
    },
  ];

  return positions.slice(0, count);
}

function getContributingAdvisorIds(
  advisors: LabAdvisor[],
  activeStageId: number,
  totalStages: number,
) {
  if (advisors.length === 0) {
    return [];
  }

  const safeTotalStages = Math.max(totalStages, 1);

  const stagePosition = Math.max(
    1,
    Math.min(activeStageId, safeTotalStages),
  );

  const progress = stagePosition / safeTotalStages;

  /*
   * Early stages:
   * Myria begins with a smaller number of perspectives.
   */
  if (progress <= 0.2) {
    return advisors
      .slice(0, Math.min(2, advisors.length))
      .map((advisor) => advisor.id);
  }

  /*
   * Diagnosis / challenge definition:
   * An additional specialist perspective joins.
   */
  if (progress <= 0.4) {
    return advisors
      .slice(0, Math.min(3, advisors.length))
      .map((advisor) => advisor.id);
  }

  /*
   * Exploration / evaluation:
   * The full virtual team contributes.
   */
  if (progress <= 0.8) {
    return advisors.map((advisor) => advisor.id);
  }

  /*
   * Final synthesis:
   * Myria narrows the active perspectives
   * as the engagement moves toward recommendations.
   */
  return advisors
    .slice(0, Math.min(3, advisors.length))
    .map((advisor) => advisor.id);
}