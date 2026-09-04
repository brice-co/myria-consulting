import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { AdvisoryMemory, AdvisorySummary, SpecialistOutput } from "../types";

type Options = {
  getMemory: () => AdvisoryMemory;
  onOutput: (output: SpecialistOutput) => void;
};

export function createLeadTools(options: Options) {
  const routeToSpecialist = tool({
    name: "route_to_specialist",
    description: "Record which specialist is needed next and why. Then use the actual Realtime handoff.",
    parameters: z.object({
      specialist: z.enum(["strategy", "operations", "people-change", "ai-data"]),
      reason: z.string().min(3),
    }),
    execute: async ({ specialist, reason }) => JSON.stringify({
      ok: true,
      routeIntent: specialist,
      reason,
      note: "Routing intent captured. Perform the actual Realtime handoff next.",
    }),
  });

  const recommendNextLab = tool({
    name: "recommend_next_lab",
    description: "Recommend the most appropriate next Myria Lab.",
    parameters: z.object({
      lab: z.enum(["Discovery Lab", "Strategy Lab", "Operations Lab", "AI & Data Lab", "People & Change Lab"]),
      rationale: z.string().min(3),
    }),
    execute: async (input) => JSON.stringify({ ok: true, ...input }),
  });

  const createAdvisorySummary = tool({
    name: "create_advisory_summary",
    description: "Create the final cross-specialist advisory synthesis.",
    parameters: z.object({
      businessChallenge: z.string(),
      specialistPerspectives: z.array(z.string()).min(1),
      recommendation: z.string(),
      nextLab: z.string(),
      nextStep: z.string(),
    }),
    execute: async (summary) => {
      const data: AdvisorySummary = { ...summary };
      options.onOutput({ type: "advisory-summary", data });
      return JSON.stringify({ ok: true, summary: data, memory: options.getMemory() });
    },
  });

  return [routeToSpecialist, recommendNextLab, createAdvisorySummary];
}
