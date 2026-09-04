import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { AdvisoryInsight, AdvisoryInsightCategory, AdvisoryMemory, SpecialistId } from "../types";

type Options = {
  getActiveAgent: () => SpecialistId;
  getMemory: () => AdvisoryMemory;
  setMemoryField: (field: "businessObjective" | "businessChallenge" | "currentWorkflow", value: string) => void;
  appendMemory: (field: "constraints" | "stakeholders" | "systems" | "dataSources" | "opportunities" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onInsight: (insight: AdvisoryInsight) => void;
};

export function createSharedTools(options: Options) {
  const captureAdvisoryInsight = tool({
    name: "capture_advisory_insight",
    description: "Capture one concise, decision-useful advisory insight.",
    parameters: z.object({
      category: z.enum(["business", "strategy", "operations", "people-change", "ai-data", "next-step"]),
      label: z.string().min(2),
      value: z.string().min(2),
    }),
    execute: async ({ category, label, value }) => {
      const insight: AdvisoryInsight = {
        id: crypto.randomUUID(),
        category: category as AdvisoryInsightCategory,
        label,
        value,
        sourceAgent: options.getActiveAgent(),
        createdAt: Date.now(),
      };
      options.onInsight(insight);
      return JSON.stringify({ ok: true, insight });
    },
  });

  const captureBusinessContext = tool({
    name: "capture_business_context",
    description: "Store core business context so it persists across specialist handoffs.",
    parameters: z.object({
      businessObjective: z.string().optional(),
      businessChallenge: z.string().optional(),
      currentWorkflow: z.string().optional(),
      constraint: z.string().optional(),
      stakeholder: z.string().optional(),
      system: z.string().optional(),
      dataSource: z.string().optional(),
    }),
    execute: async (input) => {
      if (input.businessObjective) options.setMemoryField("businessObjective", input.businessObjective);
      if (input.businessChallenge) options.setMemoryField("businessChallenge", input.businessChallenge);
      if (input.currentWorkflow) options.setMemoryField("currentWorkflow", input.currentWorkflow);
      if (input.constraint) options.appendMemory("constraints", input.constraint);
      if (input.stakeholder) options.appendMemory("stakeholders", input.stakeholder);
      if (input.system) options.appendMemory("systems", input.system);
      if (input.dataSource) options.appendMemory("dataSources", input.dataSource);
      return JSON.stringify({ ok: true, memory: options.getMemory() });
    },
  });

  const captureAdvisoryDecision = tool({
    name: "capture_advisory_decision",
    description: "Store an opportunity, risk, decision, or next step in shared advisory memory.",
    parameters: z.object({
      type: z.enum(["opportunity", "risk", "decision", "next-step"]),
      value: z.string().min(2),
    }),
    execute: async ({ type, value }) => {
      const field = type === "opportunity" ? "opportunities" : type === "risk" ? "risks" : type === "decision" ? "decisions" : "nextSteps";
      options.appendMemory(field, value);
      return JSON.stringify({ ok: true, type, value });
    },
  });

  const readAdvisoryMemory = tool({
    name: "read_advisory_memory",
    description: "Read shared advisory memory before recommendations or after handoffs.",
    parameters: z.object({}),
    execute: async () => JSON.stringify(options.getMemory()),
  });

  return [captureAdvisoryInsight, captureBusinessContext, captureAdvisoryDecision, readAdvisoryMemory];
}
