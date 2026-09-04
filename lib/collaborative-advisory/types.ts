import type {
  SpecialistId,
  TranscriptItem,
  VoiceStatus,
} from "@/lib/virtual-advisory-team/types";

export type { SpecialistId, TranscriptItem, VoiceStatus };

export type WorkspaceCategory =
  | "insight"
  | "opportunity"
  | "decision"
  | "action";

export type WorkspaceItemStatus =
  | "captured"
  | "needs-validation"
  | "confirmed";

export type WorkspaceSource =
  | "participant"
  | "myria"
  | Exclude<SpecialistId, "lead">;

export type WorkspaceItem = {
  id: string;
  category: WorkspaceCategory;
  title: string;
  description: string;
  status: WorkspaceItemStatus;
  source: WorkspaceSource;
  owner?: string;
  createdAt: number;
};

export type ParticipantContext = {
  name: string;
  role: string;
};

export type RuntimeEvent = {
  id: string;
  type:
    | "agent"
    | "handoff"
    | "tool"
    | "workspace"
    | "memory"
    | "output"
    | "system"
    | "error";
  title: string;
  detail?: string;
  at: number;
};
