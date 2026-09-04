"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { LabStage } from "@/data/labs";

type LabProcessProps = {
  stages: LabStage[];
  activeStageId: number;
  onStageChange: (stageId: number) => void;
};

export function LabProcess({
  stages,
  activeStageId,
  onStageChange,
}: LabProcessProps) {
  const activeStage =
    stages.find((stage) => stage.id === activeStageId) ??
    stages[0];

  if (!activeStage) {
    return null;
  }

  return (
    <section className="border-b border-black/10 bg-[#12313a] py-20 text-white sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
            How the session works
          </p>

          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Structured thinking, step by step.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
            Each stage builds on what came before, helping Myria move from
            understanding the situation to identifying a practical direction
            forward.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="relative">
              <div
                className="absolute left-[19px] top-5 h-[calc(100%-40px)] w-px bg-white/10"
                aria-hidden="true"
              />

              <div className="space-y-2">
                {stages.map((stage, index) => {
                  const isActive =
                    stage.id === activeStageId;

                  const isComplete =
                    stage.id < activeStageId;

                  return (
                    <motion.button
                      key={stage.id}
                      type="button"
                      onClick={() =>
                        onStageChange(stage.id)
                      }
                      className="group relative flex w-full items-start gap-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#12313a]"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.995 }}
                      aria-pressed={isActive}
                    >
                      <motion.div
                        className={[
                          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                          isActive
                            ? "border-amber-400 bg-amber-400 text-[#12313a]"
                            : isComplete
                              ? "border-amber-400/50 bg-[#12313a] text-amber-300"
                              : "border-white/15 bg-[#12313a] text-white/40",
                        ].join(" ")}
                        animate={{
                          scale: isActive ? 1.04 : 1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </motion.div>

                      <div className="min-w-0 pt-1">
                        <p
                          className={[
                            "font-serif text-xl transition-colors",
                            isActive
                              ? "text-white"
                              : "text-white/55 group-hover:text-white/80",
                          ].join(" ")}
                        >
                          {stage.title}
                        </p>

                        {isActive && (
                          <motion.p
                            initial={{
                              opacity: 0,
                              y: 4,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="mt-2 max-w-xl text-sm leading-6 text-white/55 lg:hidden"
                          >
                            {stage.description}
                          </motion.p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-28 border-l border-white/10 pl-8 lg:pl-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                Current stage
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
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
                    duration: 0.3,
                  }}
                  className="mt-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-amber-300">
                      {String(activeStage.id).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div className="h-px w-10 bg-amber-400/40" />
                  </div>

                  <h3 className="mt-4 font-serif text-3xl text-white sm:text-4xl">
                    {activeStage.title}
                  </h3>

                  <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
                    {activeStage.description}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                      Myria is working to
                    </p>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">
                      {getStageIntent(activeStage.title)}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getStageIntent(title: string) {
  const key = title.toLowerCase();

  if (
    key.includes("understand") ||
    key.includes("context") ||
    key.includes("business") ||
    key.includes("change") ||
    key.includes("map")
  ) {
    return "Build a clear picture of the business context, objectives, environment, and the situation that needs attention.";
  }

  if (
    key.includes("surface") ||
    key.includes("challenge") ||
    key.includes("diagnose") ||
    key.includes("impact") ||
    key.includes("work")
  ) {
    return "Identify the issues, friction, impacts, constraints, and root causes shaping the challenge.";
  }

  if (
    key.includes("explore") ||
    key.includes("opportunity")
  ) {
    return "Examine possible paths, opportunities, and specialist perspectives before moving too quickly toward a solution.";
  }

  if (
    key.includes("evaluate") ||
    key.includes("prioritize") ||
    key.includes("readiness") ||
    key.includes("mobilize")
  ) {
    return "Compare options and assess value, effort, feasibility, readiness, dependencies, and risk.";
  }

  if (
    key.includes("focus") ||
    key.includes("direction") ||
    key.includes("improve") ||
    key.includes("adopt")
  ) {
    return "Translate the analysis into a clear direction, priorities, and practical next steps.";
  }

  return "Bring structure to the challenge and move the analysis toward a clear, actionable recommendation.";
}