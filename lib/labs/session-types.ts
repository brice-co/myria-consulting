import type { LabSlug } from "@/data/labs";

export type SessionFindingCategory =
  | "context"
  | "challenge"
  | "opportunity"
  | "risk"
  | "direction";

export type SessionFindingSource =
  | "user"
  | "myria";

export type SessionFindingStatus =
  | "observed"
  | "inferred"
  | "to-validate";

export type LabSessionAnswer = {
  stageId: number;
  questionId: string;
  value: string;
  updatedAt: string;
};

export type SessionFinding = {
  id: string;
  stageId: number;
  category: SessionFindingCategory;
  text: string;
  source: SessionFindingSource;
  status: SessionFindingStatus;
};

export type LabSessionStageState = {
  stageId: number;
  isCompleted: boolean;
  completedAt?: string;
};

export type LabSessionStatus =
  | "not-started"
  | "in-progress"
  | "completed";

export type LabSession = {
  id: string;
  labSlug: LabSlug;

  status: LabSessionStatus;

  activeStageId: number;

  answers: Record<number, LabSessionAnswer>;

  findings: SessionFinding[];

  stages: Record<number, LabSessionStageState>;

  startedAt?: string;
  completedAt?: string;
  updatedAt: string;
};