import type { LabStage } from "@/data/labs";

import type {
  LabSession,
  LabSessionAnswer,
  SessionFinding,
} from "@/lib/labs/session-types";

type UpdateLabAnswerInput = {
  session: LabSession;
  stageId: number;
  questionId: string;
  value: string;
};

export function updateLabSessionAnswer({
  session,
  stageId,
  questionId,
  value,
}: UpdateLabAnswerInput): LabSession {
  const now = new Date().toISOString();

  const answer: LabSessionAnswer = {
    stageId,
    questionId,
    value,
    updatedAt: now,
  };

  return {
    ...session,

    status:
      session.status === "not-started"
        ? "in-progress"
        : session.status,

    startedAt:
      session.startedAt ??
      (session.status === "not-started"
        ? now
        : undefined),

    answers: {
      ...session.answers,
      [stageId]: answer,
    },

    updatedAt: now,
  };
}

type CompleteStageInput = {
  session: LabSession;
  stageId: number;
};

export function completeLabSessionStage({
  session,
  stageId,
}: CompleteStageInput): LabSession {
  const now = new Date().toISOString();

  const stage = session.stages[stageId];

  if (!stage) {
    return session;
  }

  return {
    ...session,

    status:
      session.status === "not-started"
        ? "in-progress"
        : session.status,

    startedAt:
      session.startedAt ??
      (session.status === "not-started"
        ? now
        : undefined),

    stages: {
      ...session.stages,

      [stageId]: {
        ...stage,
        isCompleted: true,
        completedAt:
          stage.completedAt ?? now,
      },
    },

    updatedAt: now,
  };
}

type SetActiveStageInput = {
  session: LabSession;
  stageId: number;
};

export function setLabSessionActiveStage({
  session,
  stageId,
}: SetActiveStageInput): LabSession {
  if (!session.stages[stageId]) {
    return session;
  }

  const now = new Date().toISOString();

  return {
    ...session,

    activeStageId: stageId,

    status:
      session.status === "not-started"
        ? "in-progress"
        : session.status,

    startedAt:
      session.startedAt ??
      (session.status === "not-started"
        ? now
        : undefined),

    updatedAt: now,
  };
}

type AdvanceLabSessionInput = {
  session: LabSession;
  stages: LabStage[];
};

export function advanceLabSession({
  session,
  stages,
}: AdvanceLabSessionInput): LabSession {
  const currentStageIndex = stages.findIndex(
    (stage) =>
      stage.id === session.activeStageId,
  );

  if (currentStageIndex === -1) {
    return session;
  }

  const currentStage =
    stages[currentStageIndex];

  if (!currentStage) {
    return session;
  }

  let nextSession = completeLabSessionStage({
    session,
    stageId: currentStage.id,
  });

  const nextStage =
    stages[currentStageIndex + 1];

  if (nextStage) {
    nextSession = setLabSessionActiveStage({
      session: nextSession,
      stageId: nextStage.id,
    });

    return nextSession;
  }

  return completeLabSession({
    session: nextSession,
  });
}

type PreviousLabSessionStageInput = {
  session: LabSession;
  stages: LabStage[];
};

export function moveToPreviousLabSessionStage({
  session,
  stages,
}: PreviousLabSessionStageInput): LabSession {
  const currentStageIndex = stages.findIndex(
    (stage) =>
      stage.id === session.activeStageId,
  );

  if (currentStageIndex <= 0) {
    return session;
  }

  const previousStage =
    stages[currentStageIndex - 1];

  if (!previousStage) {
    return session;
  }

  return setLabSessionActiveStage({
    session,
    stageId: previousStage.id,
  });
}

type CompleteLabSessionInput = {
  session: LabSession;
};

export function completeLabSession({
  session,
}: CompleteLabSessionInput): LabSession {
  const now = new Date().toISOString();

  return {
    ...session,

    status: "completed",

    completedAt:
      session.completedAt ?? now,

    updatedAt: now,
  };
}

type ReplaceStageFindingsInput = {
  session: LabSession;
  stageId: number;
  findings: SessionFinding[];
};

export function replaceLabSessionStageFindings({
  session,
  stageId,
  findings,
}: ReplaceStageFindingsInput): LabSession {
  const now = new Date().toISOString();

  const existingFindings =
    session.findings.filter(
      (finding) =>
        finding.stageId !== stageId,
    );

  return {
    ...session,

    findings: [
      ...existingFindings,
      ...findings,
    ],

    updatedAt: now,
  };
}