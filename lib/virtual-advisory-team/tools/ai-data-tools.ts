import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { AiDataSnapshot, SpecialistOutput } from "../types";

type Options = {
  appendMemory: (field: "systems" | "dataSources" | "opportunities" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onOutput: (output: SpecialistOutput) => void;
};

export function createAiDataTools(options: Options) {
  const captureAiUseCase = tool({
    name: "capture_ai_use_case",
    description: "Capture an AI use case in terms of trigger, task or decision, outcome, and human role.",
    parameters: z.object({
      useCase: z.string(),
      userOrOwner: z.string(),
      trigger: z.string(),
      taskOrDecision: z.string(),
      desiredOutcome: z.string(),
      humanRole: z.string(),
    }),
    execute: async (input) => {
      options.appendMemory("opportunities", input.useCase);
      return JSON.stringify({ type: "ai-use-case", ...input });
    },
  });

  const assessDataReadiness = tool({
    name: "assess_data_readiness",
    description: "Assess whether required data is available, accessible, reliable, timely, and governable.",
    parameters: z.object({
      requiredData: z.array(z.string()).min(1),
      availability: z.string(),
      quality: z.string(),
      accessConstraints: z.string().optional(),
      readinessAssessment: z.string(),
    }),
    execute: async (input) => {
      input.requiredData.forEach((item) => options.appendMemory("dataSources", item));
      return JSON.stringify({ type: "data-readiness", ...input });
    },
  });

  const recommendAiArchitecture = tool({
    name: "recommend_ai_architecture",
    description: "Recommend a high-level AI architecture pattern, integrations, and human oversight boundary.",
    parameters: z.object({
      architecturePattern: z.string(),
      systems: z.array(z.string()).optional(),
      integrations: z.array(z.string()).optional(),
      humanOversight: z.string(),
      rationale: z.string(),
    }),
    execute: async (input) => {
      (input.systems ?? []).forEach((system) => options.appendMemory("systems", system));
      options.appendMemory("decisions", input.architecturePattern);
      return JSON.stringify({ type: "ai-architecture", ...input });
    },
  });

  const assessAiGovernance = tool({
    name: "assess_ai_governance",
    description: "Identify AI governance controls, escalation, decision rights, and audit requirements.",
    parameters: z.object({
      decisionRights: z.string(),
      approvalThresholds: z.string(),
      escalationPath: z.string(),
      auditRequirement: z.string(),
      primaryRisk: z.string(),
    }),
    execute: async (input) => {
      options.appendMemory("risks", input.primaryRisk);
      return JSON.stringify({ type: "ai-governance", ...input });
    },
  });

  const createAiSnapshot = tool({
    name: "create_ai_snapshot",
    description: "Produce a concise AI & Data snapshot.",
    parameters: z.object({
      useCases: z.array(z.string()).min(1),
      dataReadiness: z.string(),
      architecturePattern: z.string(),
      integrations: z.array(z.string()),
      governanceControls: z.array(z.string()).min(1),
      recommendation: z.string(),
    }),
    execute: async (snapshot) => {
      const data: AiDataSnapshot = { ...snapshot };
      options.onOutput({ type: "ai-data-snapshot", data });
      options.appendMemory("nextSteps", data.recommendation);
      return JSON.stringify({ ok: true, snapshot: data });
    },
  });

  return [captureAiUseCase, assessDataReadiness, recommendAiArchitecture, assessAiGovernance, createAiSnapshot];
}
