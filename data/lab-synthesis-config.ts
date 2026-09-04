import type { LabSlug } from "@/data/labs";
import type {
  LabSynthesisSectionKey,
} from "@/lib/labs/synthesis-types";

export type LabSynthesisSectionConfig = {
  key: LabSynthesisSectionKey;
  title: string;
  description: string;
};

export type LabSynthesisConfig = {
  title: string;
  description: string;
  sections: LabSynthesisSectionConfig[];
};

export const labSynthesisConfig: Record<
  LabSlug,
  LabSynthesisConfig
> = {
  discovery: {
    title: "Discovery Lab Synthesis",
    description:
      "A concise advisory synthesis of the client's situation, priorities, opportunities, risks, and recommended focus.",
    sections: [
      {
        key: "situation",
        title: "What we heard",
        description:
          "Summarize the client's current context, objectives, constraints, and relevant operating conditions.",
      },
      {
        key: "challenges",
        title: "What appears to matter",
        description:
          "Identify the most important business challenges, tensions, or areas requiring clarification.",
      },
      {
        key: "priorities",
        title: "Priority areas",
        description:
          "Highlight the issues that appear most important to address first based on the session.",
      },
      {
        key: "opportunities",
        title: "Opportunity areas",
        description:
          "Identify meaningful opportunities that could warrant deeper analysis or action.",
      },
      {
        key: "risks",
        title: "Questions to validate",
        description:
          "Surface assumptions, uncertainties, dependencies, or risks that should be validated before decisions are made.",
      },
      {
        key: "recommendations",
        title: "Recommended advisory focus",
        description:
          "Define the areas where Myria recommends deeper investigation or structured advisory work.",
      },
      {
        key: "next-steps",
        title: "Next step",
        description:
          "Identify the most appropriate immediate next action or focused Lab.",
      },
    ],
  },

  strategy: {
    title: "Strategy Lab Synthesis",
    description:
      "A strategic synthesis of the organization's direction, choices, constraints, and priority decisions.",
    sections: [
      {
        key: "situation",
        title: "Strategic context",
        description:
          "Summarize the situation, objectives, external or internal pressures, and strategic conditions shaping the decision.",
      },
      {
        key: "challenges",
        title: "Strategic tensions",
        description:
          "Identify the core tensions, trade-offs, or strategic questions that must be resolved.",
      },
      {
        key: "priorities",
        title: "What matters most",
        description:
          "Highlight the few priorities that should guide strategic choices.",
      },
      {
        key: "opportunities",
        title: "Strategic opportunities",
        description:
          "Identify viable areas for growth, differentiation, improvement, or repositioning.",
      },
      {
        key: "risks",
        title: "Constraints and risks",
        description:
          "Surface important assumptions, dependencies, execution risks, and unresolved strategic questions.",
      },
      {
        key: "recommendations",
        title: "Recommended direction",
        description:
          "Describe the strategic direction or decisions that appear most appropriate based on the available evidence.",
      },
      {
        key: "next-steps",
        title: "Next decisions",
        description:
          "Define the immediate decisions, validation activities, or planning steps required to move forward.",
      },
    ],
  },

  operations: {
    title: "Operations Lab Synthesis",
    description:
      "An operational synthesis focused on friction, root causes, improvement opportunities, dependencies, and priority interventions.",
    sections: [
      {
        key: "situation",
        title: "Current operating picture",
        description:
          "Summarize how the work currently operates, including the relevant process, teams, systems, and operating conditions.",
      },
      {
        key: "challenges",
        title: "Primary friction",
        description:
          "Identify the most important operational bottlenecks, exceptions, delays, handoffs, or sources of inefficiency.",
      },
      {
        key: "priorities",
        title: "Likely root causes",
        description:
          "Highlight the underlying process, organizational, information, or decision issues that appear to drive the observed friction.",
      },
      {
        key: "opportunities",
        title: "Improvement opportunities",
        description:
          "Identify practical opportunities to simplify work, improve flow, reduce exceptions, or strengthen operational performance.",
      },
      {
        key: "risks",
        title: "Dependencies and risks",
        description:
          "Surface dependencies, constraints, control requirements, or uncertainties that could affect implementation.",
      },
      {
        key: "recommendations",
        title: "Priority interventions",
        description:
          "Recommend the operational interventions that appear most valuable to investigate or implement first.",
      },
      {
        key: "next-steps",
        title: "Next step",
        description:
          "Define the next analysis, redesign, validation, or implementation activity.",
      },
    ],
  },

  "ai-data": {
    title: "AI & Data Lab Synthesis",
    description:
      "A business-first synthesis of AI and data opportunities, value potential, readiness, constraints, and recommended validation.",
    sections: [
      {
        key: "situation",
        title: "Business problem",
        description:
          "Summarize the business objective, operational challenge, or decision problem that AI or data may help address.",
      },
      {
        key: "challenges",
        title: "Current work and data environment",
        description:
          "Describe the current process, information flows, data availability, systems, and relevant operating constraints.",
      },
      {
        key: "priorities",
        title: "Where AI could matter",
        description:
          "Identify the highest-value decisions, tasks, exceptions, or workflows where AI or data capabilities may be relevant.",
      },
      {
        key: "opportunities",
        title: "Candidate AI opportunities",
        description:
          "Identify practical AI, automation, analytics, or data opportunities grounded in the client's business context.",
      },
      {
        key: "risks",
        title: "Readiness and constraints",
        description:
          "Assess important data, integration, governance, adoption, control, and operational considerations that must be validated.",
      },
      {
        key: "recommendations",
        title: "Priority use cases",
        description:
          "Recommend the use cases that appear most appropriate for further business and technical validation.",
      },
      {
        key: "next-steps",
        title: "Recommended validation",
        description:
          "Define the next business, data, technical, governance, or prototype validation activities.",
      },
    ],
  },

  "people-change": {
    title: "People & Change Lab Synthesis",
    description:
      "A synthesis of change impacts, stakeholder needs, adoption risks, organizational readiness, and priority interventions.",
    sections: [
      {
        key: "situation",
        title: "Change context",
        description:
          "Summarize the transformation, affected environment, objectives, timeline, and organizational context.",
      },
      {
        key: "challenges",
        title: "People and adoption challenges",
        description:
          "Identify the most important stakeholder, behavior, capability, communication, leadership, or adoption issues.",
      },
      {
        key: "priorities",
        title: "Critical change priorities",
        description:
          "Highlight the stakeholder groups, impacts, behaviors, or readiness issues requiring the most attention.",
      },
      {
        key: "opportunities",
        title: "Adoption opportunities",
        description:
          "Identify opportunities to improve engagement, readiness, capability, ownership, and sustained adoption.",
      },
      {
        key: "risks",
        title: "Change risks",
        description:
          "Surface resistance, capacity constraints, sponsorship gaps, communication risks, capability gaps, and unresolved assumptions.",
      },
      {
        key: "recommendations",
        title: "Priority interventions",
        description:
          "Recommend the change-management interventions that appear most important based on the session.",
      },
      {
        key: "next-steps",
        title: "Next step",
        description:
          "Define the immediate readiness, stakeholder, communication, learning, or implementation activities.",
      },
    ],
  },
};

export function getLabSynthesisConfig(
  labSlug: LabSlug,
): LabSynthesisConfig {
  return labSynthesisConfig[labSlug];
}