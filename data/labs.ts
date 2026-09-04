import {
  BrainCircuit,
  Compass,
  Search,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type LabSlug =
  | "discovery"
  | "strategy"
  | "operations"
  | "ai-data"
  | "people-change";

export type LabStage = {
  id: number;
  title: string;
  description: string;
};

export type LabAdvisor = {
  description?: import("react/jsx-runtime").JSX.Element;
  id: string;
  name: string;
  role: string;
};

export type AdvisoryLab = {
  slug: LabSlug;

  title: string;
  shortTitle: string;
  tagline: string;
  description: string;

  icon: LucideIcon;

  isPrimary?: boolean;

  challenges: string[];
  explore: string[];
  stages: LabStage[];
  advisors: LabAdvisor[];
  outcomes: string[];
};

export const advisoryLabs: AdvisoryLab[] = [
  {
    slug: "discovery",

    title: "Discovery Lab",
    shortTitle: "Discovery",

    tagline: "Bring us the challenge.",

    description:
      "A structured advisory session designed to understand your business context, surface the challenges that matter most, and determine where to focus before prescribing a solution.",

    icon: Search,

    isPrimary: true,

    challenges: [
      "You know something needs to change, but the real problem is not yet clear.",
      "Several competing issues are demanding leadership attention.",
      "You need an outside perspective before deciding where to invest.",
      "You are considering transformation, AI, or operational improvement but are unsure where to begin.",
    ],

    explore: [
      "Business context",
      "Strategic priorities",
      "Current challenges",
      "Critical workflows",
      "People and organizational considerations",
      "Technology and data environment",
      "Risks and constraints",
      "Potential opportunities",
    ],

    stages: [
      {
        id: 1,
        title: "Understand",
        description:
          "Establish the business context, objectives, priorities, and constraints.",
      },
      {
        id: 2,
        title: "Surface",
        description:
          "Identify the challenges, friction, risks, and questions requiring attention.",
      },
      {
        id: 3,
        title: "Explore",
        description:
          "Examine the situation from multiple business and specialist perspectives.",
      },
      {
        id: 4,
        title: "Identify",
        description:
          "Surface the opportunities and possible paths that merit further consideration.",
      },
      {
        id: 5,
        title: "Focus",
        description:
          "Determine where attention should go next and recommend the appropriate path forward.",
      },
    ],

    advisors: [
      {
        id: "strategy",
        name: "Strategy",
        role: "Strategic perspective",
        description: undefined
      },
      {
        id: "operations",
        name: "Operations",
        role: "Operational perspective",
        description: undefined
      },
      {
        id: "people-change",
        name: "People & Change",
        role: "Organizational perspective",
        description: undefined
      },
      {
        id: "ai-data",
        name: "AI & Data",
        role: "Technology and data perspective",
        description: undefined
      },
    ],

    outcomes: [
      "Business context summary",
      "Priority challenges",
      "Key observations",
      "Opportunity areas",
      "Risks and dependencies",
      "Recommended areas of focus",
      "Recommended Advisory Lab or next step",
    ],
  },

  {
    slug: "strategy",

    title: "Strategy Lab",
    shortTitle: "Strategy",

    tagline: "Clarify direction and the choices that matter.",

    description:
      "A focused advisory session for organizations facing strategic choices, competing priorities, uncertainty, or difficulty translating ambition into a clear direction.",

    icon: Compass,

    challenges: [
      "Too many initiatives are competing for limited attention and resources.",
      "Strategic priorities are unclear or interpreted differently across leadership.",
      "The organization has an ambition but no clear path for achieving it.",
      "Market or organizational changes require strategic choices to be reconsidered.",
    ],

    explore: [
      "Strategic ambition",
      "Business objectives",
      "Market context",
      "Strategic challenges",
      "Critical choices",
      "Alternative options",
      "Trade-offs",
      "Priorities",
      "Risks and dependencies",
    ],

    stages: [
      {
        id: 1,
        title: "Context",
        description:
          "Understand the organization, ambition, environment, and strategic situation.",
      },
      {
        id: 2,
        title: "Challenge",
        description:
          "Clarify the strategic questions and choices that require attention.",
      },
      {
        id: 3,
        title: "Explore",
        description:
          "Develop and examine possible strategic options.",
      },
      {
        id: 4,
        title: "Evaluate",
        description:
          "Assess trade-offs, implications, risks, and potential value.",
      },
      {
        id: 5,
        title: "Direction",
        description:
          "Establish priorities and translate strategic thinking into a clear direction.",
      },
    ],

    advisors: [
      {
        id: "strategy",
        name: "Strategy",
        role: "Strategic direction",
      },
      {
        id: "finance",
        name: "Finance",
        role: "Value and investment perspective",
        description: undefined
      },
      {
        id: "customer",
        name: "Customer",
        role: "Market and customer perspective",
        description: undefined
      },
      {
        id: "operations",
        name: "Operations",
        role: "Process and performance perspective",
      },
    ],

    outcomes: [
      "Strategic situation summary",
      "Key strategic questions",
      "Options considered",
      "Trade-off analysis",
      "Priority choices",
      "Strategic direction",
      "Recommended next steps",
    ],
  },

  {
    slug: "operations",

    title: "Operations Lab",
    shortTitle: "Operations",

    tagline: "Improve how work gets done.",

    description:
      "A structured examination of workflows, processes, handoffs, constraints, and performance issues to identify where operations can become simpler, faster, and more effective.",

    icon: Workflow,

    challenges: [
      "Processes are slow, complex, or inconsistent.",
      "Too many handoffs create delays and accountability gaps.",
      "Manual work consumes time that could be spent on higher-value activities.",
      "Growth is exposing operational bottlenecks or scalability issues.",
    ],

    explore: [
      "Business outcomes",
      "Critical workflows",
      "Process steps",
      "Handoffs",
      "Roles and responsibilities",
      "Bottlenecks",
      "Rework and duplication",
      "Technology support",
      "Performance measures",
    ],

    stages: [
      {
        id: 1,
        title: "Map",
        description:
          "Understand how the critical work currently gets done.",
      },
      {
        id: 2,
        title: "Diagnose",
        description:
          "Identify friction, bottlenecks, waste, delays, and root causes.",
      },
      {
        id: 3,
        title: "Explore",
        description:
          "Identify opportunities to simplify, redesign, automate, or improve.",
      },
      {
        id: 4,
        title: "Prioritize",
        description:
          "Evaluate improvements based on impact, effort, risk, and feasibility.",
      },
      {
        id: 5,
        title: "Improve",
        description:
          "Define the practical actions required to improve operational performance.",
      },
    ],

    advisors: [
      {
        id: "operations",
        name: "Operations",
        role: "Process and performance perspective",
      },
      {
        id: "technology",
        name: "Technology",
        role: "Systems and automation perspective",
      },
      {
        id: "people-change",
        name: "People & Change",
        role: "Roles and adoption perspective",
      },
      {
        id: "data",
        name: "Data",
        role: "Measurement and insight perspective",
      },
    ],

    outcomes: [
      "Current-state observations",
      "Critical workflow findings",
      "Bottlenecks and root causes",
      "Improvement opportunities",
      "Priority initiatives",
      "Operational recommendations",
      "Action roadmap",
    ],
  },

  {
    slug: "ai-data",

    title: "AI & Data Lab",
    shortTitle: "AI & Data",

    tagline: "Find where AI and data can create meaningful value.",

    description:
      "A business-first advisory session for identifying where AI, automation, and data capabilities can improve meaningful business outcomes rather than adopting technology for its own sake.",

    icon: BrainCircuit,

    challenges: [
      "Leadership knows AI matters but is unsure where to begin.",
      "AI ideas exist but are disconnected from business priorities.",
      "The organization has data but struggles to turn it into useful insight.",
      "Teams are experimenting with AI without a clear value, risk, or governance framework.",
    ],

    explore: [
      "Business objectives",
      "Critical workflows",
      "Decision points",
      "Repetitive work",
      "Information and knowledge needs",
      "Data availability",
      "Technology environment",
      "AI opportunities",
      "Feasibility and risk",
    ],

    stages: [
      {
        id: 1,
        title: "Business",
        description:
          "Start with business priorities, outcomes, problems, and opportunities.",
      },
      {
        id: 2,
        title: "Work",
        description:
          "Understand the workflows, decisions, knowledge, and information involved.",
      },
      {
        id: 3,
        title: "Opportunity",
        description:
          "Identify where AI, automation, or improved use of data may create value.",
      },
      {
        id: 4,
        title: "Evaluate",
        description:
          "Assess potential opportunities against value, feasibility, readiness, and risk.",
      },
      {
        id: 5,
        title: "Prioritize",
        description:
          "Determine which opportunities deserve investment, experimentation, or further discovery.",
      },
    ],

    advisors: [
      {
        id: "strategy",
        name: "Strategy",
        role: "Business alignment",
      },
      {
        id: "ai-data",
        name: "AI & Data",
        role: "AI and data opportunity perspective",
      },
      {
        id: "operations",
        name: "Operations",
        role: "Workflow perspective",
      },
      {
        id: "governance",
        name: "Governance",
        role: "Risk and responsible adoption",
      },
    ],

    outcomes: [
      "Business opportunity summary",
      "AI and data opportunity portfolio",
      "Priority use cases",
      "Value and feasibility assessment",
      "Readiness considerations",
      "Risks and dependencies",
      "Recommended next steps",
    ],
  },

  {
    slug: "people-change",

    title: "People & Change Lab",
    shortTitle: "People & Change",

    tagline: "Turn organizational change into adoption.",

    description:
      "A focused advisory session for understanding how transformation affects people, where adoption risks exist, and what is required to mobilize the organization successfully.",

    icon: Users,

    challenges: [
      "Employees are experiencing change fatigue or resistance.",
      "A transformation is technically ready but organizational readiness is uncertain.",
      "Different stakeholder groups will experience very different impacts.",
      "Leadership needs a clearer approach to engagement, communication, capability, and adoption.",
    ],

    explore: [
      "Change objectives",
      "Affected stakeholders",
      "Change impacts",
      "Readiness",
      "Resistance",
      "Leadership alignment",
      "Communication needs",
      "Capabilities and learning",
      "Adoption risks",
    ],

    stages: [
      {
        id: 1,
        title: "Change",
        description:
          "Understand what is changing, why it matters, and what success requires.",
      },
      {
        id: 2,
        title: "Impact",
        description:
          "Identify who is affected and how roles, processes, behaviors, or expectations will change.",
      },
      {
        id: 3,
        title: "Readiness",
        description:
          "Assess awareness, alignment, capability, resistance, and organizational conditions.",
      },
      {
        id: 4,
        title: "Mobilize",
        description:
          "Determine the engagement, communication, leadership, and learning actions required.",
      },
      {
        id: 5,
        title: "Adopt",
        description:
          "Establish the actions and measures required to support adoption and sustain the change.",
      },
    ],

    advisors: [
      {
        id: "people-change",
        name: "People & Change",
        role: "Change and adoption perspective",
      },
      {
        id: "organization",
        name: "Organization",
        role: "Roles and organizational design",
      },
      {
        id: "leadership",
        name: "Leadership",
        role: "Leadership alignment and sponsorship",
      },
      {
        id: "operations",
        name: "Operations",
        role: "Operational impact perspective",
      },
    ],

    outcomes: [
      "Change context summary",
      "Stakeholder and impact findings",
      "Readiness observations",
      "Adoption risks",
      "Engagement priorities",
      "Recommended change actions",
      "Adoption roadmap",
    ],
  },
];

export function getLabBySlug(slug: string) {
  return advisoryLabs.find((lab) => lab.slug === slug);
}

export const discoveryLab = advisoryLabs.find(
  (lab) => lab.slug === "discovery",
)!;

export const focusedLabs = advisoryLabs.filter(
  (lab) => !lab.isPrimary,
);