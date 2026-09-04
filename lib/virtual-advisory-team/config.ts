import type { SpecialistCard, SpecialistId, TeamMode } from "./types";

export const PUBLIC_SESSION_LIMIT_MS = 4 * 60 * 1000;
export const IDLE_TIMEOUT_MS = 45 * 1000;
export const IDLE_WARNING_MS = 15 * 1000;

export const SPECIALISTS: SpecialistCard[] = [
  {
    id: "strategy",
    name: "Avery",
    role: "Strategy Advisor",
    shortRole: "Strategy",
    description:
      "Clarifies direction, priorities, strategic choices, value, and the business case for change.",
    focus: [
      "Strategic priorities",
      "Growth & transformation",
      "Business model",
      "Value & investment logic",
    ],
  },
  {
    id: "operations",
    name: "Maya",
    role: "Operations Advisor",
    shortRole: "Operations",
    description:
      "Examines workflows, decisions, bottlenecks, exceptions, process redesign, and automation opportunities.",
    focus: [
      "Workflow analysis",
      "Process friction",
      "Operational decisions",
      "Automation opportunities",
    ],
  },
  {
    id: "people-change",
    name: "Sam",
    role: "People & Change Advisor",
    shortRole: "People & Change",
    description:
      "Explores stakeholder impact, organizational readiness, adoption, communication, training, and transition.",
    focus: [
      "Change impacts",
      "Stakeholders",
      "Readiness",
      "Adoption & sustainment",
    ],
  },
  {
    id: "ai-data",
    name: "Noor",
    role: "AI & Data Advisor",
    shortRole: "AI & Data",
    description:
      "Evaluates AI opportunities, data readiness, agent architecture, integrations, governance, and human oversight.",
    focus: [
      "AI use cases",
      "Data readiness",
      "Architecture",
      "Governance & controls",
    ],
  },
];

export const SPECIALIST_LABELS: Record<SpecialistId, string> = {
  lead: "Myria Lead Advisor",
  strategy: "Strategy Advisor",
  operations: "Operations Advisor",
  "people-change": "People & Change Advisor",
  "ai-data": "AI & Data Advisor",
};

export const MODE_LABELS: Record<TeamMode, string> = {
  team: "Ask the Advisory Team",
  strategy: "Meet Strategy",
  operations: "Meet Operations",
  "people-change": "Meet People & Change",
  "ai-data": "Meet AI & Data",
};
