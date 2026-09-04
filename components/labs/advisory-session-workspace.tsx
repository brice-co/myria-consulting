"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import type { LabSessionQuestion } from "@/data/lab-session-questions";

type ProcessingStatus =
  | "idle"
  | "analyzing"
  | "synthesizing"
  | "error";

type AdvisorySessionWorkspaceProps = {
  question: LabSessionQuestion | null;
  answer: string;
  activeStageId: number;
  totalStages: number;

  onAnswerChange: (
    value: string,
  ) => void;

  onPrevious: () => void;

  onContinue:
    () => void | Promise<void>;

  processingStatus?: ProcessingStatus;
  processingError?: string | null;
};

export function AdvisorySessionWorkspace({
  question,
  answer,
  activeStageId,
  totalStages,
  onAnswerChange,
  onPrevious,
  onContinue,
  processingStatus = "idle",
  processingError = null,
}: AdvisorySessionWorkspaceProps) {
  if (!question) {
    return null;
  }

  const isFirstStage =
    activeStageId === 1;

  const isLastStage =
    activeStageId === totalStages;

  const hasAnswer =
    answer.trim().length > 0;

  const isProcessing =
    processingStatus === "analyzing" ||
    processingStatus === "synthesizing";

  const processingLabel =
    getProcessingLabel(
      processingStatus,
    );

  return (
    <section className="border-b border-black/10 bg-[#f6f1e7] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Context */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
              Advisory session
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
              Work through the challenge
              with Myria.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              This is a structured working
              session. Your responses help
              Myria develop the emerging
              picture and bring the right
              specialist perspectives into
              the analysis.
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Session progress
              </p>

              <div className="mt-4 flex items-center gap-3">
                {Array.from({
                  length: totalStages,
                }).map(
                  (_, index) => {
                    const stage =
                      index + 1;

                    return (
                      <div
                        key={stage}
                        className={[
                          "h-1 flex-1 transition-colors",
                          stage <=
                          activeStageId
                            ? "bg-amber-700"
                            : "bg-black/10",
                        ].join(" ")}
                      />
                    );
                  },
                )}
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Stage {activeStageId} of{" "}
                {totalStages}
              </p>
            </div>
          </div>

          {/* Working surface */}
          <motion.div
            key={question.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="border border-black/10 bg-white/50"
          >
            <div className="border-b border-black/10 px-6 py-5 sm:px-8">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
                    {question.eyebrow}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {processingStatus ===
                    "synthesizing"
                      ? "Myria is preparing the final advisory synthesis."
                      : processingStatus ===
                          "analyzing"
                        ? "Myria is analyzing your response."
                        : "Myria is building the advisory picture from your response."}
                  </p>
                </div>

                <div className="flex size-9 items-center justify-center rounded-full border border-amber-700/20 bg-amber-700/5 text-amber-800">
                  {isProcessing ? (
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Sparkles
                      className="size-4"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="max-w-3xl font-serif text-2xl leading-snug text-slate-900 sm:text-3xl">
                {question.question}
              </h3>

              {question.guidance && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                  {
                    question.guidance
                  }
                </p>
              )}

              <div className="mt-8">
                <label
                  htmlFor={`answer-${question.id}`}
                  className="sr-only"
                >
                  Your response
                </label>

                <textarea
                  id={`answer-${question.id}`}
                  value={answer}
                  onChange={(
                    event,
                  ) =>
                    onAnswerChange(
                      event.target
                        .value,
                    )
                  }
                  disabled={
                    isProcessing
                  }
                  placeholder={
                    question.placeholder
                  }
                  rows={7}
                  className="w-full resize-none border border-black/10 bg-[#fbf8f1] px-5 py-4 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/20 disabled:cursor-wait disabled:opacity-60"
                />
              </div>

              {/* Processing state */}
              {isProcessing && (
                <div className="mt-6 border-l-2 border-amber-700/60 bg-amber-50/60 px-4 py-3">
                  <div className="flex items-start gap-3">
                    <LoaderCircle
                      className="mt-0.5 size-4 shrink-0 animate-spin text-amber-800"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {
                          processingLabel
                        }
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {processingStatus ===
                        "synthesizing"
                          ? "Myria is connecting the findings across the full session and preparing your advisory conclusion."
                          : "Myria is interpreting your response and identifying the findings that should shape the emerging picture."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing error */}
              {processingError && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-red-700/60 bg-red-50/60 px-4 py-3"
                >
                  <p className="text-sm leading-6 text-red-800">
                    {
                      processingError
                    }
                  </p>

                  <p className="mt-1 text-xs text-red-700/70">
                    Your response has
                    been kept. You can
                    try again.
                  </p>
                </div>
              )}

              {/* Session navigation */}
              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={
                    onPrevious
                  }
                  disabled={
                    isFirstStage ||
                    isProcessing
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 px-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowLeft
                    className="size-4"
                    aria-hidden="true"
                  />

                  Previous
                </button>

                <button
                  type="button"
                  onClick={
                    onContinue
                  }
                  disabled={
                    !hasAnswer ||
                    isProcessing
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#12313a] px-5 text-sm font-medium text-white transition hover:bg-[#183d47] disabled:pointer-events-none disabled:opacity-40"
                >
                  {isProcessing ? (
                    <>
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />

                      {
                        processingLabel
                      }
                    </>
                  ) : (
                    <>
                      {isLastStage
                        ? "Complete session"
                        : "Continue"}

                      <ArrowRight
                        className="size-4"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getProcessingLabel(
  status: ProcessingStatus,
) {
  switch (status) {
    case "analyzing":
      return "Analyzing your response...";

    case "synthesizing":
      return "Preparing your advisory synthesis...";

    default:
      return "";
  }
}