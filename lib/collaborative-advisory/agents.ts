import { RealtimeAgent, tool } from "@openai/agents/realtime";
import { z } from "zod";
import type { SpecialistId, WorkspaceItem } from "./types";

type Options = {
  getActiveAgent: () => SpecialistId;
  onWorkspaceItem: (item: WorkspaceItem) => void;
};

const BASE = `
You are participating in a live collaborative management consulting session.
Keep most responses to 1–3 short sentences. Ask one primary question at a time.
Important findings should be captured in the shared workspace. Treat AI-captured items as needing participant validation until participants confirm them.
Use real Realtime handoffs when another specialist is better suited. Avoid unnecessary handoffs.
`;

export function buildAdvisoryTeam({ getActiveAgent, onWorkspaceItem }: Options) {
  const captureWorkspaceItem = tool({
    name: "capture_workspace_item",
    description: "Capture an important insight, opportunity, decision, or action in the participant workspace.",
    parameters: z.object({
      category: z.enum(["insight", "opportunity", "decision", "action"]),
      title: z.string().min(2),
      description: z.string().min(2),
      owner: z.string().optional(),
    }),
    execute: async ({ category, title, description, owner }) => {
      const agent = getActiveAgent();
      const item: WorkspaceItem = {
        id: crypto.randomUUID(),
        category,
        title,
        description,
        owner,
        status: "needs-validation",
        source: agent === "lead" ? "myria" : agent,
        createdAt: Date.now(),
      };
      onWorkspaceItem(item);
      return JSON.stringify({ ok: true, item });
    },
  });

  const lead = new RealtimeAgent({
    name: "Myria Lead Advisor",
    voice: "marin",
    instructions: `${BASE}
Frame the business challenge, orchestrate the smallest useful combination of Strategy, Operations, People & Change, and AI & Data specialists, and synthesize the discussion.`,
    tools: [captureWorkspaceItem],
  });

  const strategy = new RealtimeAgent({
    name: "Strategy Advisor",
    voice: "marin",
    instructions: `${BASE}
Focus on strategic priorities, value drivers, choices, business case, growth, and transformation outcomes.`,
    tools: [captureWorkspaceItem],
  });

  const operations = new RealtimeAgent({
    name: "Operations Advisor",
    voice: "marin",
    instructions: `${BASE}
Focus on workflows, bottlenecks, handoffs, decisions, exceptions, process redesign, and automation opportunities.`,
    tools: [captureWorkspaceItem],
  });

  const peopleChange = new RealtimeAgent({
    name: "People & Change Advisor",
    voice: "marin",
    instructions: `${BASE}
Focus on stakeholder impacts, readiness, capabilities, adoption, communications, training, leadership, and transition.`,
    tools: [captureWorkspaceItem],
  });

  const aiData = new RealtimeAgent({
    name: "AI & Data Advisor",
    voice: "marin",
    instructions: `${BASE}
Focus on AI use cases, data readiness, architecture, integrations, governance, human oversight, and implementation feasibility.`,
    tools: [captureWorkspaceItem],
  });

  lead.handoffs = [strategy, operations, peopleChange, aiData];
  strategy.handoffs = [lead, operations, peopleChange, aiData];
  operations.handoffs = [lead, strategy, peopleChange, aiData];
  peopleChange.handoffs = [lead, strategy, operations, aiData];
  aiData.handoffs = [lead, strategy, operations, peopleChange];

  return { lead, strategy, operations, peopleChange, aiData };
}
