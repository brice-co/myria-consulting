import { tool } from "@openai/agents";
import { RealtimeAgent } from "@openai/agents/realtime";
import { z } from "zod";

import { AI_LAYERS, LABS, MYRIA_OVERVIEW, SPECIALISTS } from "@/data/myria-about";
import type { AboutState } from "@/lib/about-myria/about/schema";

type Callbacks = {
  update: (patch: Partial<AboutState>) => void;
};

export function createAboutMyriaAgent({ update }: Callbacks) {
  const overview = tool({
    name: "get_myria_overview",
    description: "Retrieve approved information about Myria Consulting and its virtual consulting model.",
    parameters: z.object({ focus: z.enum(["overview", "differentiators"]).default("overview") }),
    execute: async ({ focus }) => {
      update({
        topic: "Myria Consulting",
        summary: MYRIA_OVERVIEW.summary,
        activeSpecialistId: null,
        activeLayerId: null,
        highlights: focus === "differentiators" ? MYRIA_OVERVIEW.differentiators : MYRIA_OVERVIEW.differentiators.slice(0, 4),
        relatedHref: "/approach",
        relatedLabel: "See how Myria works",
      });
      return MYRIA_OVERVIEW;
    },
  });

  const specialist = tool({
    name: "get_specialist",
    description: "Retrieve approved information about one Myria virtual specialist.",
    parameters: z.object({ specialist: z.enum(["strategy", "operations", "people-change", "ai-data"]) }),
    execute: async ({ specialist }) => {
      const item = SPECIALISTS.find((x) => x.id === specialist)!;
      update({
        topic: item.name,
        summary: item.description,
        activeSpecialistId: item.id,
        activeLayerId: null,
        highlights: [...item.focus],
        relatedHref: item.href,
        relatedLabel: `Explore ${item.name}`,
      });
      return item;
    },
  });

  const recommend = tool({
    name: "recommend_specialist",
    description: "Recommend the most relevant Myria specialist for a visitor's business challenge.",
    parameters: z.object({ problem: z.string().min(3).max(800) }),
    execute: async ({ problem }) => {
      const text = problem.toLowerCase();
      const rules = [
        ["operations", ["process", "workflow", "exception", "inventory", "order", "capacity", "efficiency"]],
        ["people-change", ["change", "adoption", "stakeholder", "readiness", "training", "culture", "resistance"]],
        ["ai-data", ["ai", "agent", "automation", "data", "analytics", "governance", "autonomous"]],
        ["strategy", ["strategy", "growth", "priority", "direction", "positioning", "market"]],
      ] as const;

      const ranked = rules
        .map(([id, words]) => ({ id, score: words.filter((word) => text.includes(word)).length }))
        .sort((a, b) => b.score - a.score);

      const primary = SPECIALISTS.find((x) => x.id === (ranked[0].score ? ranked[0].id : "strategy"))!;
      update({
        topic: `Recommended: ${primary.name}`,
        summary: primary.description,
        activeSpecialistId: primary.id,
        activeLayerId: null,
        highlights: [`Primary: ${primary.name}`, ...primary.focus],
        relatedHref: primary.href,
        relatedLabel: `Explore ${primary.name}`,
      });
      return { primary };
    },
  });

  const aiLayer = tool({
    name: "get_ai_enablement_layer",
    description: "Retrieve one layer of Myria's AI Enablement Architecture.",
    parameters: z.object({
      layer: z.enum([
        "business-direction", "decision-architecture", "ai-workforce", "workflow-operations",
        "enterprise-systems", "enterprise-data", "governance-control", "observability-learning",
      ]),
    }),
    execute: async ({ layer }) => {
      const item = AI_LAYERS.find((x) => x[0] === layer)!;
      update({
        topic: `${item[1]} ${item[2]}`,
        summary: `${item[2]} is the ${item[3]} layer of the AI Enablement Architecture.`,
        activeSpecialistId: null,
        activeLayerId: item[0],
        highlights: [item[3], "People remain central for purpose, judgment and accountability.", "Sense → Understand → Reason → Decide → Act → Learn"],
        relatedHref: "/ai-enablement",
        relatedLabel: "Explore AI Enablement Architecture",
      });
      return { layer: item, operatingLoop: ["Sense", "Understand", "Reason", "Decide", "Act", "Learn"] };
    },
  });

  const operatingModel = tool({
    name: "get_myria_operating_model",
    description: "Explain how Myria's virtual consulting model connects specialist thinking and Advisory Labs.",
    parameters: z.object({}),
    execute: async () => {
      const summary =
        "Myria organizes advisory work around the business problem rather than one discipline. Strategy, Operations, People & Change, and AI & Data perspectives can be connected as the problem evolves.";
      update({
        topic: "Myria Operating Model",
        summary,
        activeSpecialistId: null,
        activeLayerId: null,
        highlights: ["Business problem first", "Specialist thinking on demand", "Cross-specialist coordination", "Discover → Design → Enable → Operate → Evolve"],
        relatedHref: "/approach",
        relatedLabel: "Explore the Myria approach",
      });
      return { summary };
    },
  });

  const lab = tool({
    name: "get_advisory_lab",
    description: "Retrieve approved information about a Myria Advisory Lab.",
    parameters: z.object({ lab: z.enum(["discovery", "strategy", "operations", "people-change", "ai-data"]) }),
    execute: async ({ lab }) => {
      const item = LABS.find((x) => x[0] === lab)!;
      update({
        topic: item[1],
        summary: `${item[1]} is designed to ${item[2].toLowerCase()} through a focused advisory working session.`,
        activeSpecialistId: lab === "discovery" ? null : lab,
        activeLayerId: null,
        highlights: [item[2], "Focused working session", "Designed for clarity, decisions, priorities and action"],
        relatedHref: item[3],
        relatedLabel: `Explore ${item[1]}`,
      });
      return item;
    },
  });

  return new RealtimeAgent({
    name: "About Myria",
    voice: "marin",
    instructions: `
You are About M-y-r-i-a, the interactive guide to Myria Consulting.

Explain Myria's virtual management consulting model, specialist team, Advisory Labs, and AI Enablement Architecture. Use the approved tools for substantive claims about Myria.

Be concise, intelligent, consultative and easy to understand. Speak English or French according to the visitor.

Core idea: Myria combines management consulting thinking with a coordinated virtual specialist team. Strategy, Operations, People & Change, and AI & Data perspectives connect around the business problem.

When explaining AI Enablement, present AI as an operating layer connecting business direction, decisions, agents, workflows, systems, data, governance and learning. People remain central for purpose, judgment, policy, relationships, complex exceptions and accountability.

Never invent pricing, availability, client names, results, certifications, contractual terms or unsupported capabilities. For organization-specific scoping or commercial questions, recommend Contact Myria.

Opening: "I can show you how Myria works, introduce the virtual specialist team, or explain what we mean by an AI-enabled organization. Where would you like to start?"
    `.trim(),
    tools: [overview, specialist, recommend, aiLayer, operatingModel, lab],
  });
}
