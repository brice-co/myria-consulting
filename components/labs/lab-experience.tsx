"use client";

import { useState } from "react";

import type {
  LabAdvisor,
  LabSlug,
  LabStage,
} from "@/data/labs";

import { getLabInsights } from "@/data/lab-insights";
import { getLabSessionQuestion } from "@/data/lab-session-questions";

import { analyzeLabStage } from "@/lib/labs/analyze-lab-stage";
import { createLabSession } from "@/lib/labs/create-lab-session";
import { synthesizeLabSession } from "@/lib/labs/synthesize-lab-session";

import type {
  LabSession,
  SessionFinding,
} from "@/lib/labs/session-types";

import type {
  LabSessionSynthesis as LabSessionSynthesisType,
} from "@/lib/labs/synthesis-types";

import {
  advanceLabSession,
  moveToPreviousLabSessionStage,
  replaceLabSessionStageFindings,
  setLabSessionActiveStage,
  updateLabSessionAnswer,
} from "@/lib/labs/update-lab-session";

import { AdvisorySessionWorkspace } from "@/components/labs/advisory-session-workspace";
import { EmergingPicture } from "@/components/labs/emerging-picture";
import { LabProcess } from "@/components/labs/lab-process";
import { LabSessionSynthesis } from "@/components/labs/lab-session-synthesis";
import { VirtualAdvisoryTeam } from "@/components/labs/virtual-advisory-team";

type LabExperienceProps = {
  sessionId: string;
  labSlug: LabSlug;
  stages: LabStage[];
  advisors: LabAdvisor[];
};

type ProcessingStatus =
  | "idle"
  | "analyzing"
  | "synthesizing"
  | "error";

export function LabExperience({
  sessionId,
  labSlug,
  stages,
  advisors,
}: LabExperienceProps) {
  const [session, setSession] = useState<LabSession>(() =>
    createLabSession({
      sessionId,
      labSlug,
      stages,
    }),
  );

  const [synthesis, setSynthesis] =
    useState<LabSessionSynthesisType | null>(null);

  const [processingStatus, setProcessingStatus] =
    useState<ProcessingStatus>("idle");

  const [processingError, setProcessingError] =
    useState<string | null>(null);

  const activeStageId =
    session.activeStageId;

  const question =
    getLabSessionQuestion(
      labSlug,
      activeStageId,
    );

  const insightGroups =
    getLabInsights(
      labSlug,
      activeStageId,
    );

  const currentAnswer =
    session.answers[activeStageId]?.value ?? "";

  const visibleFindings =
    getVisibleFindings(
      session.findings,
      activeStageId,
    );

  const isProcessing =
    processingStatus === "analyzing" ||
    processingStatus === "synthesizing";

  function handleStageChange(
    stageId: number,
  ) {
    if (isProcessing) {
      return;
    }

    setProcessingError(null);

    setSession((currentSession) =>
      setLabSessionActiveStage({
        session: currentSession,
        stageId,
      }),
    );
  }

  function handleAnswerChange(
    value: string,
  ) {
    if (
      !question ||
      isProcessing
    ) {
      return;
    }

    setProcessingError(null);

    setSession((currentSession) =>
      updateLabSessionAnswer({
        session: currentSession,
        stageId:
          currentSession.activeStageId,
        questionId:
          question.id,
        value,
      }),
    );
  }

  function handlePrevious() {
    if (isProcessing) {
      return;
    }

    setProcessingError(null);

    setSession((currentSession) =>
      moveToPreviousLabSessionStage({
        session: currentSession,
        stages,
      }),
    );
  }

  async function handleContinue() {
    if (
      isProcessing ||
      !question
    ) {
      return;
    }

    const stageId =
      session.activeStageId;

    const answer =
      session.answers[stageId];

    if (!answer?.value.trim()) {
      return;
    }

    setProcessingStatus("analyzing");
    setProcessingError(null);

    try {
      const previousFindings =
        session.findings.filter(
          (finding) =>
            finding.stageId !==
            stageId,
        );

      const findings =
        await analyzeLabStage({
          labSlug:
            session.labSlug,

          stageId,

          question:
            question.question,

          answer:
            answer.value,

          previousFindings,
        });

      const sessionWithFindings =
        replaceLabSessionStageFindings({
          session,
          stageId,
          findings,
        });

      const nextSession =
        advanceLabSession({
          session:
            sessionWithFindings,
          stages,
        });

      setSession(
        nextSession,
      );

      if (
        nextSession.status !==
        "completed"
      ) {
        setProcessingStatus(
          "idle",
        );

        return;
      }

      setProcessingStatus(
        "synthesizing",
      );

      const finalSynthesis =
        await synthesizeLabSession({
          session:
            nextSession,
        });

      setSynthesis(
        finalSynthesis,
      );

      setProcessingStatus(
        "idle",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to complete this advisory step.";

      setProcessingStatus(
        "error",
      );

      setProcessingError(
        message,
      );
    }
  }

  if (synthesis) {
    return (
      <LabSessionSynthesis
        synthesis={synthesis}
      />
    );
  }

  return (
    <>
      <LabProcess
        stages={stages}
        activeStageId={
          activeStageId
        }
        onStageChange={
          handleStageChange
        }
      />

      <AdvisorySessionWorkspace
        question={question}
        answer={currentAnswer}
        activeStageId={activeStageId}
        totalStages={stages.length}
        onAnswerChange={handleAnswerChange}
        onPrevious={handlePrevious}
        onContinue={handleContinue}
        processingStatus={processingStatus}
        processingError={processingError}
      />

      <EmergingPicture
        activeStageId={
          activeStageId
        }
        groups={
          insightGroups
        }
        findings={
          visibleFindings
        }
      />

      <VirtualAdvisoryTeam
        advisors={
          advisors
        }
        activeStageId={
          activeStageId
        }
        totalStages={
          stages.length
        }
      />
    </>
  );
}

function getVisibleFindings(
  findings: SessionFinding[],
  activeStageId: number,
) {
  return findings.filter(
    (finding) =>
      finding.stageId <=
      activeStageId,
  );
}