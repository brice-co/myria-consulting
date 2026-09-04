export type SpecialistId =
  | "lead"
  | "strategy"
  | "operations"
  | "people-change"
  | "ai-data";

export type TeamMode =
  | "team"
  | "strategy"
  | "operations"
  | "people-change"
  | "ai-data";

export type VoiceStatus =
  | "idle"
  | "connecting"
  | "live"
  | "muted"
  | "complete"
  | "error";

export type TranscriptItem = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export type SpecialistCard = {
  id: Exclude<SpecialistId, "lead">;
  name: string;
  role: string;
  shortRole: string;
  description: string;
  focus: string[];
};

export type AdvisoryInsightCategory =
  | "business"
  | "strategy"
  | "operations"
  | "people-change"
  | "ai-data"
  | "next-step";

export type AdvisoryInsight = {
  id: string;
  category: AdvisoryInsightCategory;
  label: string;
  value: string;
  sourceAgent: SpecialistId;
  createdAt: number;
};

export type StrategyBrief = {
  objective: string;
  strategicTension: string;
  valueDrivers: string[];
  priorityChoices: string[];
  recommendation: string;
};

export type OperationsBrief = {
  workflow: string;
  frictionPoints: string[];
  businessImpact: string;
  automationOpportunities: string[];
  recommendation: string;
};

export type ChangeSnapshot = {
  impactedGroups: string[];
  majorImpacts: string[];
  readinessRisks: string[];
  adoptionActions: string[];
  recommendation: string;
};

export type AiDataSnapshot = {
  useCases: string[];
  dataReadiness: string;
  architecturePattern: string;
  integrations: string[];
  governanceControls: string[];
  recommendation: string;
};

export type AdvisorySummary = {
  businessChallenge: string;
  specialistPerspectives: string[];
  recommendation: string;
  nextLab: string;
  nextStep: string;
};

export type SpecialistOutput =
  | { type: "strategy-brief"; data: StrategyBrief }
  | { type: "operations-brief"; data: OperationsBrief }
  | { type: "change-snapshot"; data: ChangeSnapshot }
  | { type: "ai-data-snapshot"; data: AiDataSnapshot }
  | { type: "advisory-summary"; data: AdvisorySummary };

export type AdvisoryMemory = {
  businessObjective: string | null;
  businessChallenge: string | null;
  currentWorkflow: string | null;
  constraints: string[];
  stakeholders: string[];
  systems: string[];
  dataSources: string[];
  opportunities: string[];
  risks: string[];
  decisions: string[];
  nextSteps: string[];
  insights: AdvisoryInsight[];
  outputs: SpecialistOutput[];
};

export type TeamActivity = {
  id: string;
  type:
    | "agent"
    | "handoff"
    | "tool-start"
    | "tool-end"
    | "insight"
    | "output"
    | "memory"
    | "system"
    | "error";
  title: string;
  detail?: string;
  at: number;
};

export type TeamMetrics = {
  activeAgent: SpecialistId;
  lastHandoff: string | null;
  activeTool: string | null;
  elapsedMs: number;
};
