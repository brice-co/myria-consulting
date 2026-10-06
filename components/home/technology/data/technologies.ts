import {
  BrainCircuit,
  Cable,
  Database,
  Play,
  UsersRound,
} from "lucide-react";

import type { TechnologyCapability } from "../types/technology";

export const technologyCapabilities: TechnologyCapability[] = [
  {
    id: "collaborate",
    eyebrow: "COLLABORATE",
    title: "Work together",
    description:
      "People and AI share conversations, presence, content and decisions in real time.",
    icon: UsersRound,
    technologies: [
      { name: "Liveblocks" },
      { name: "LiveKit" },
      { name: "Tiptap" },
      { name: "React Flow" },
    ],
  },

  {
    id: "intelligence",
    eyebrow: "THINK",
    title: "Bring intelligence into the work",
    description:
      "Specialized AI advisors reason with business context and work through governed tools.",
    icon: BrainCircuit,
    technologies: [
      { name: "OpenAI" },
      { name: "OpenAI Agents" },
      { name: "AI SDK" },
      { name: "pgvector" },
    ],
  },

  {
    id: "data",
    eyebrow: "UNDERSTAND",
    title: "Work from shared context",
    description:
      "Business data, organizational knowledge and AI context remain connected to the work.",
    icon: Database,
    technologies: [
      { name: "PostgreSQL" },
      { name: "Neon" },
      { name: "Drizzle ORM" },
      { name: "pgvector" },
    ],
  },

  {
    id: "execution",
    eyebrow: "EXECUTE",
    title: "Move from decision to action",
    description:
      "Approved decisions become durable workflows, automated actions and coordinated follow-through.",
    icon: Play,
    technologies: [
      { name: "Inngest" },
      { name: "Upstash Redis" },
      { name: "Human Approvals" },
      { name: "Audit" },
    ],
  },

  {
    id: "connect",
    eyebrow: "CONNECT",
    title: "Connect the enterprise",
    description:
      "Myria works with the systems, applications and services organizations already depend on.",
    icon: Cable,
    technologies: [
      { name: "APIs" },
      { name: "Webhooks" },
      { name: "Enterprise Tools" },
      { name: "External Integrations" },
    ],
  },
];