import type { LabSlug } from "@/data/labs";

export type LabSynthesisSectionKey =
  | "situation"
  | "challenges"
  | "priorities"
  | "opportunities"
  | "risks"
  | "recommendations"
  | "next-steps";

export type LabSynthesisItem = {
  id: string;
  text: string;
};

export type LabSynthesisSection = {
  key: LabSynthesisSectionKey;
  title: string;
  summary?: string;
  items: LabSynthesisItem[];
};

export type LabSynthesisConfidence =
  | "high"
  | "medium"
  | "low";

export type LabSynthesisRecommendation = {
  id: string;
  title: string;
  rationale: string;
  priority: "high" | "medium" | "low";
  confidence: LabSynthesisConfidence;
};

export type LabSynthesisNextStep = {
  id: string;
  title: string;
  description: string;
  type:
    | "validate"
    | "analyze"
    | "decide"
    | "plan"
    | "execute"
    | "engage-lab";
  recommendedLabSlug?: LabSlug;
};

export type LabSessionSynthesis = {
  id: string;

  sessionId: string;
  labSlug: LabSlug;

  title: string;
  executiveSummary: string;

  sections: LabSynthesisSection[];

  recommendations: LabSynthesisRecommendation[];

  nextSteps: LabSynthesisNextStep[];

  generatedAt: string;
};