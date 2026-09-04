import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { SpecialistOutput, StrategyBrief } from "../types";

type Options = {
  appendMemory: (field: "opportunities" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onOutput: (output: SpecialistOutput) => void;
};

export function createStrategyTools(options: Options) {
  const captureBusinessObjective = tool({
    name: "capture_business_objective",
    description: "Structure the primary business objective and why it matters.",
    parameters: z.object({ objective: z.string(), whyItMatters: z.string(), horizon: z.string().optional() }),
    execute: async (input) => JSON.stringify({ type: "business-objective", ...input }),
  });

  const assessStrategicPriority = tool({
    name: "assess_strategic_priority",
    description: "Assess objective, strategic tension, value driver, and decision required.",
    parameters: z.object({ objective: z.string(), strategicTension: z.string(), valueDriver: z.string(), decisionNeeded: z.string() }),
    execute: async (input) => {
      options.appendMemory("decisions", input.decisionNeeded);
      return JSON.stringify({ type: "strategic-priority", ...input });
    },
  });

  const identifyValueDriver = tool({
    name: "identify_value_driver",
    description: "Capture a measurable strategic value driver and value mechanism.",
    parameters: z.object({ driver: z.string(), valueMechanism: z.string(), evidenceNeeded: z.string().optional() }),
    execute: async (input) => {
      options.appendMemory("opportunities", `${input.driver}: ${input.valueMechanism}`);
      return JSON.stringify({ type: "value-driver", ...input });
    },
  });

  const createStrategyBrief = tool({
    name: "create_strategy_brief",
    description: "Produce a concise Strategy Brief.",
    parameters: z.object({
      objective: z.string(),
      strategicTension: z.string(),
      valueDrivers: z.array(z.string()).min(1),
      priorityChoices: z.array(z.string()).min(1),
      recommendation: z.string(),
    }),
    execute: async (brief) => {
      const data: StrategyBrief = { ...brief };
      options.onOutput({ type: "strategy-brief", data });
      options.appendMemory("nextSteps", data.recommendation);
      return JSON.stringify({ ok: true, brief: data });
    },
  });

  return [captureBusinessObjective, assessStrategicPriority, identifyValueDriver, createStrategyBrief];
}
