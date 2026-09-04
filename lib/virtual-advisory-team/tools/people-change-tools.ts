import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { ChangeSnapshot, SpecialistOutput } from "../types";

type Options = {
  appendMemory: (field: "stakeholders" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onOutput: (output: SpecialistOutput) => void;
};

export function createPeopleChangeTools(options: Options) {
  const captureStakeholder = tool({
    name: "capture_stakeholder",
    description: "Capture an impacted stakeholder group and likely concerns.",
    parameters: z.object({
      stakeholderGroup: z.string(),
      roleInChange: z.string(),
      likelyConcern: z.string(),
      influence: z.string().optional(),
    }),
    execute: async (input) => {
      options.appendMemory("stakeholders", input.stakeholderGroup);
      return JSON.stringify({ type: "stakeholder", ...input });
    },
  });

  const assessChangeImpact = tool({
    name: "assess_change_impact",
    description: "Assess impact on roles, workflow, decisions, capability, behavior, or governance.",
    parameters: z.object({
      impactedGroup: z.string(),
      impactArea: z.enum(["role", "workflow", "decision", "capability", "behavior", "governance"]),
      impact: z.string(),
      severity: z.string(),
    }),
    execute: async (input) => JSON.stringify({ type: "change-impact", ...input }),
  });

  const assessReadiness = tool({
    name: "assess_readiness",
    description: "Assess organizational readiness and identify adoption risk and enabling action.",
    parameters: z.object({
      readinessLevel: z.string(),
      adoptionRisk: z.string(),
      evidence: z.string(),
      enablingAction: z.string(),
    }),
    execute: async (input) => {
      options.appendMemory("risks", input.adoptionRisk);
      options.appendMemory("nextSteps", input.enablingAction);
      return JSON.stringify({ type: "readiness", ...input });
    },
  });

  const createChangeSnapshot = tool({
    name: "create_change_snapshot",
    description: "Produce a concise People & Change snapshot.",
    parameters: z.object({
      impactedGroups: z.array(z.string()).min(1),
      majorImpacts: z.array(z.string()).min(1),
      readinessRisks: z.array(z.string()).min(1),
      adoptionActions: z.array(z.string()).min(1),
      recommendation: z.string(),
    }),
    execute: async (snapshot) => {
      const data: ChangeSnapshot = { ...snapshot };
      options.onOutput({ type: "change-snapshot", data });
      options.appendMemory("nextSteps", data.recommendation);
      return JSON.stringify({ ok: true, snapshot: data });
    },
  });

  return [captureStakeholder, assessChangeImpact, assessReadiness, createChangeSnapshot];
}
