import type {
  LabSlug,
  LabStage,
} from "@/data/labs";

import type {
  LabSession,
  LabSessionStageState,
} from "@/lib/labs/session-types";

type CreateLabSessionInput = {
  labSlug: LabSlug;
  stages: LabStage[];
  sessionId?: string;
};

export function createLabSession({
  labSlug,
  stages,
  sessionId = createSessionId(),
}: CreateLabSessionInput): LabSession {
  const now = new Date().toISOString();

  const firstStageId =
    stages[0]?.id ?? 1;

  const stageState =
    stages.reduce<
      Record<number, LabSessionStageState>
    >((accumulator, stage) => {
      accumulator[stage.id] = {
        stageId: stage.id,
        isCompleted: false,
      };

      return accumulator;
    }, {});

  return {
    id: sessionId,

    labSlug,

    status: "not-started",

    activeStageId:
      firstStageId,

    answers: {},

    findings: [],

    stages:
      stageState,

    updatedAt:
      now,
  };
}

function createSessionId() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID ===
      "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `lab-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}