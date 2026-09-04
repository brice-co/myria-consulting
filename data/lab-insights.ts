import {
  AlertTriangle,
  ArrowUpRight,
  Compass,
  Database,
  Lightbulb,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { LabSlug } from "@/data/labs";

export type LabInsightGroup = {
  label: string;
  icon: LucideIcon;
  items: string[];
};

export type LabStageInsights = Record<
  number,
  LabInsightGroup[]
>;

export type LabInsights = Record<
  LabSlug,
  LabStageInsights
>;

export const labInsights: LabInsights = {
  discovery: {
    1: [
      {
        label: "Business context",
        icon: Target,
        items: [
          "Business priorities are being clarified",
          "Current operating realities are being understood",
          "Critical constraints are beginning to surface",
        ],
      },
    ],

    2: [
      {
        label: "Priority challenges",
        icon: AlertTriangle,
        items: [
          "The most important problems are being separated from symptoms",
          "Leadership concerns are being grouped into clear themes",
          "Areas requiring deeper attention are becoming visible",
        ],
      },
    ],

    3: [
      {
        label: "What matters",
        icon: Lightbulb,
        items: [
          "Potential root causes are being explored",
          "Cross-functional implications are being considered",
          "Specialist perspectives are revealing new questions",
        ],
      },
    ],

    4: [
      {
        label: "Opportunity areas",
        icon: ArrowUpRight,
        items: [
          "Potential areas for improvement are emerging",
          "Strategic, operational, people, and technology opportunities are being compared",
          "Areas requiring deeper advisory work are being identified",
        ],
      },
    ],

    5: [
      {
        label: "Recommended focus",
        icon: Compass,
        items: [
          "Priority areas are being narrowed",
          "The most appropriate next advisory path is becoming clearer",
          "Recommended next steps are taking shape",
        ],
      },
    ],
  },

  strategy: {
    1: [
      {
        label: "Strategic context",
        icon: Target,
        items: [
          "Business ambition and strategic objectives are being clarified",
          "External and internal pressures are being considered",
          "Current strategic assumptions are being surfaced",
        ],
      },
    ],

    2: [
      {
        label: "Strategic challenge",
        icon: AlertTriangle,
        items: [
          "Critical strategic questions are being defined",
          "Competing priorities are becoming explicit",
          "Strategic tensions and constraints are being surfaced",
        ],
      },
    ],

    3: [
      {
        label: "Strategic options",
        icon: Lightbulb,
        items: [
          "Alternative paths are being explored",
          "Different strategic choices are being compared",
          "Potential consequences of each option are becoming clearer",
        ],
      },
    ],

    4: [
      {
        label: "Trade-offs",
        icon: ArrowUpRight,
        items: [
          "Options are being evaluated against value and feasibility",
          "Risks, dependencies, and opportunity costs are being considered",
          "Leadership trade-offs are becoming explicit",
        ],
      },
    ],

    5: [
      {
        label: "Strategic direction",
        icon: Compass,
        items: [
          "Priority choices are being narrowed",
          "Strategic direction is becoming clearer",
          "Immediate leadership decisions are being defined",
        ],
      },
    ],
  },

  operations: {
    1: [
      {
        label: "Current workflow",
        icon: Workflow,
        items: [
          "Critical workflows are being mapped",
          "Key roles and handoffs are being identified",
          "The current operating reality is becoming visible",
        ],
      },
    ],

    2: [
      {
        label: "Operational friction",
        icon: AlertTriangle,
        items: [
          "Bottlenecks and delays are being surfaced",
          "Rework and duplication are being identified",
          "Root causes are being separated from visible symptoms",
        ],
      },
    ],

    3: [
      {
        label: "Improvement opportunities",
        icon: Lightbulb,
        items: [
          "Simplification opportunities are being explored",
          "Automation possibilities are being considered",
          "Process redesign options are being compared",
        ],
      },
    ],

    4: [
      {
        label: "Priority improvements",
        icon: ArrowUpRight,
        items: [
          "Potential improvements are being assessed for impact",
          "Effort, feasibility, and operational risk are being considered",
          "High-value opportunities are being separated from lower-priority changes",
        ],
      },
    ],

    5: [
      {
        label: "Operational direction",
        icon: Compass,
        items: [
          "Priority improvements are being selected",
          "Recommended process changes are taking shape",
          "A practical improvement roadmap is emerging",
        ],
      },
    ],
  },

  "ai-data": {
    1: [
      {
        label: "Business need",
        icon: Target,
        items: [
          "Business outcomes are being clarified before discussing technology",
          "High-value problems and opportunities are being identified",
          "Current decision and information needs are being understood",
        ],
      },
    ],

    2: [
      {
        label: "Work & data",
        icon: Database,
        items: [
          "Critical workflows and decision points are being examined",
          "Data availability and information flows are being assessed",
          "Knowledge and automation gaps are becoming visible",
        ],
      },
    ],

    3: [
      {
        label: "AI opportunities",
        icon: Lightbulb,
        items: [
          "Potential AI and automation use cases are being identified",
          "Opportunities are being connected to business outcomes",
          "The role of agents, copilots, analytics, and automation is being explored",
        ],
      },
    ],

    4: [
      {
        label: "Value & feasibility",
        icon: ArrowUpRight,
        items: [
          "Potential use cases are being assessed for business value",
          "Data readiness and technical feasibility are being considered",
          "Risk, governance, and organizational readiness are being evaluated",
        ],
      },
    ],

    5: [
      {
        label: "Priority use cases",
        icon: Compass,
        items: [
          "The strongest opportunities are being prioritized",
          "Experimentation versus investment decisions are becoming clearer",
          "A practical AI and data roadmap is emerging",
        ],
      },
    ],
  },

  "people-change": {
    1: [
      {
        label: "Change context",
        icon: Target,
        items: [
          "What is changing and why is being clarified",
          "Expected business outcomes are being connected to the change",
          "The scale and nature of the transformation are being understood",
        ],
      },
    ],

    2: [
      {
        label: "People impacts",
        icon: Users,
        items: [
          "Affected stakeholder groups are being identified",
          "Role, process, behavior, and capability impacts are being surfaced",
          "Different experiences of the change are becoming visible",
        ],
      },
    ],

    3: [
      {
        label: "Readiness",
        icon: AlertTriangle,
        items: [
          "Awareness and understanding are being assessed",
          "Resistance and adoption barriers are being surfaced",
          "Leadership and organizational readiness are being examined",
        ],
      },
    ],

    4: [
      {
        label: "Mobilization priorities",
        icon: Lightbulb,
        items: [
          "Engagement priorities are being identified",
          "Communication and learning needs are being clarified",
          "Leadership and sponsorship actions are being defined",
        ],
      },
    ],

    5: [
      {
        label: "Adoption direction",
        icon: Compass,
        items: [
          "Priority change actions are being consolidated",
          "Adoption measures are being clarified",
          "A practical change and sustainment roadmap is emerging",
        ],
      },
    ],
  },
};

export function getLabInsights(
  labSlug: LabSlug,
  stageId: number,
): LabInsightGroup[] {
  const insights = labInsights[labSlug];

  return insights[stageId] ?? insights[1] ?? [];
}