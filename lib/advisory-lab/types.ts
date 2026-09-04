export type AdvisoryPhaseId =
  | "discovery"
  | "workflow"
  | "opportunities"
  | "architecture"
  | "roadmap"
  | "summary";

export type AdvisoryPhase = {
  id: AdvisoryPhaseId;
  title: string;
  shortTitle: string;
  range: string;
  startMinute: number;
  endMinute: number;
  description: string;
};

export type AdvisoryStatus = "idle" | "connecting" | "live" | "muted" | "complete" | "error";
export type AdvisoryTranscriptItem = { id: string; role: "user" | "assistant"; text: string };
export type CapturedInsight = { id: string; label: string; captured: boolean };
