import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { OperationsBrief, SpecialistOutput } from "../types";

type Options = {
  appendMemory: (field: "opportunities" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onOutput: (output: SpecialistOutput) => void;
};

export function createOperationsTools(options: Options) {
  const captureWorkflow = tool({
    name: "capture_workflow",
    description: "Capture a current workflow including trigger, steps, decisions, handoffs, and outcome.",
    parameters: z.object({
      workflowName: z.string(), trigger: z.string(), majorSteps: z.array(z.string()).min(1),
      decisions: z.array(z.string()).optional(), handoffs: z.array(z.string()).optional(), outcome: z.string(),
    }),
    execute: async (input) => JSON.stringify({ type: "workflow", ...input }),
  });

  const identifyBottleneck = tool({
    name: "identify_bottleneck",
    description: "Structure a bottleneck or recurring exception and its business impact.",
    parameters: z.object({ bottleneck: z.string(), frequency: z.string(), impact: z.string(), rootCauseHypothesis: z.string().optional() }),
    execute: async (input) => {
      options.appendMemory("risks", `${input.bottleneck}: ${input.impact}`);
      return JSON.stringify({ type: "bottleneck", ...input });
    },
  });

  const mapProcessOpportunity = tool({
    name: "map_process_opportunity",
    description: "Map an improvement or automation opportunity to value and human oversight.",
    parameters: z.object({ opportunity: z.string(), valueMechanism: z.string(), automationPotential: z.string(), humanOversight: z.string() }),
    execute: async (input) => {
      options.appendMemory("opportunities", `${input.opportunity}: ${input.valueMechanism}`);
      return JSON.stringify({ type: "process-opportunity", ...input });
    },
  });

  const createOperationsBrief = tool({
    name: "create_operations_brief",
    description: "Produce a concise Operations Brief.",
    parameters: z.object({ workflow: z.string(), frictionPoints: z.array(z.string()).min(1), businessImpact: z.string(), automationOpportunities: z.array(z.string()).min(1), recommendation: z.string() }),
    execute: async (brief) => {
      const data: OperationsBrief = { ...brief };
      options.onOutput({ type: "operations-brief", data });
      options.appendMemory("nextSteps", data.recommendation);
      return JSON.stringify({ ok: true, brief: data });
    },
  });

  return [captureWorkflow, identifyBottleneck, mapProcessOpportunity, createOperationsBrief];
}
