import type { ConsultingService } from "@/data/consulting-services";

export type EditorialService = { eyebrow:string;hero:string;question:string;perspective:string;steps:[string,string][];signals:string[];outcome:string;visual:string };
export const serviceEditorial: Record<string, EditorialService> = {
  "management-consulting": {
    "eyebrow": "Leadership & direction",
    "hero": "Clarity for consequential decisions.",
    "question": "Where should leadership focus to create the greatest organizational value?",
    "perspective": "Effective advisory begins by making the decision clear. We examine competing priorities, operating constraints and the information leadership needs to commit to a direction.",
    "steps": [
      [
        "Understand the context",
        "Examine the business environment, ambitions, stakeholder perspectives and constraints."
      ],
      [
        "Frame strategic choices",
        "Make assumptions, trade-offs and decision criteria explicit."
      ],
      [
        "Mobilize execution",
        "Connect priorities to accountability, resources and a practical management rhythm."
      ]
    ],
    "signals": [
      "Competing strategic priorities",
      "Decisions delayed by unclear ownership",
      "Initiatives without measurable results"
    ],
    "outcome": "Leadership aligned around a clear direction and a credible path to execution.",
    "visual": "decision"
  },
  "business-transformation": {
    "eyebrow": "Enterprise transformation",
    "hero": "Turn ambition into organizational progress.",
    "question": "What needs to change across the business for strategy to become reality?",
    "perspective": "A transformation is not a collection of projects. It is a coordinated change in how the organization makes decisions, works and delivers value. Our approach connects the target operating model with the people and systems needed to make it work.",
    "steps": [
      [
        "Define the future state",
        "Clarify the capabilities, outcomes and organizational changes the ambition requires."
      ],
      [
        "Connect the dependencies",
        "Map affected processes, teams, decisions, systems and delivery constraints."
      ],
      [
        "Drive disciplined implementation",
        "Stage the transformation with governance, readiness checkpoints and measurable outcomes."
      ]
    ],
    "signals": [
      "Transformation programs losing momentum",
      "Disconnected initiatives and functions",
      "Benefits that remain difficult to realize"
    ],
    "outcome": "A connected transformation roadmap grounded in business outcomes, ownership and adoption.",
    "visual": "transformation"
  },
  "operations-excellence": {
    "eyebrow": "Operations & performance",
    "hero": "Make the work flow. Make performance visible.",
    "question": "Where is operational friction preventing stronger performance?",
    "perspective": "Sustained improvement starts with understanding the work as it happens. We study end-to-end workflows, recurring exceptions, handoffs and management practices before recommending changes.",
    "steps": [
      [
        "See the real workflow",
        "Map the path from request to outcome, including exceptions and waiting."
      ],
      [
        "Improve the operating design",
        "Simplify handoffs, clarify accountability and prioritize root causes."
      ],
      [
        "Manage by evidence",
        "Define operational measures and an improvement rhythm that teams can sustain."
      ]
    ],
    "signals": [
      "Slow or inconsistent delivery",
      "Repeated manual work and rework",
      "Unclear process ownership"
    ],
    "outcome": "Clearer workflows, stronger process ownership and a measurable improvement plan.",
    "visual": "flow"
  },
  "change-management": {
    "eyebrow": "People & organizational change",
    "hero": "Make change understood, adopted and sustained.",
    "question": "How will people turn the change into everyday practice?",
    "perspective": "A new operating model or system only creates value when people can work differently. We combine stakeholder understanding, meaningful engagement, capability building and adoption measurement.",
    "steps": [
      [
        "Understand the human impact",
        "Assess affected roles, stakeholders, readiness and barriers to adoption."
      ],
      [
        "Prepare and engage",
        "Equip leaders and teams through targeted communications, learning and involvement."
      ],
      [
        "Reinforce adoption",
        "Monitor uptake, address resistance and adjust support as the change takes hold."
      ]
    ],
    "signals": [
      "Low readiness or stakeholder alignment",
      "Inconsistent adoption after launch",
      "Uncertainty about roles and responsibilities"
    ],
    "outcome": "A practical, evidence-led change approach that supports durable organizational capability.",
    "visual": "people"
  },
  "ai-strategy": {
    "eyebrow": "AI & business advisory",
    "hero": "Start with business value. Then design for AI.",
    "question": "Where can AI contribute to outcomes that genuinely matter?",
    "perspective": "Successful AI adoption requires more than a promising model. It needs a clear business problem, suitable data and workflows, defined human oversight, and a way to evaluate real operational impact.",
    "steps": [
      [
        "Discover worthwhile opportunities",
        "Identify high-friction workflows, decisions and information gaps."
      ],
      [
        "Test feasibility and safeguards",
        "Assess data, integration, risk, governance and change readiness."
      ],
      [
        "Sequence responsible adoption",
        "Define pilot boundaries, success measures, ownership and scaling conditions."
      ]
    ],
    "signals": [
      "AI pilots without a clear business case",
      "Too many competing use cases",
      "Uncertainty about readiness and controls"
    ],
    "outcome": "A prioritized AI opportunity portfolio with a practical, governed adoption roadmap.",
    "visual": "ai"
  },
  "intelligent-automation": {
    "eyebrow": "Connected intelligent operations",
    "hero": "Connect the workflow, not just the task.",
    "question": "How can automation strengthen the complete operating process?",
    "perspective": "Automating isolated steps often leaves the hard problems untouched. We design connected operational execution across enterprise systems, human decisions and intelligent assistance, with governance built into the workflow.",
    "steps": [
      [
        "Understand the end-to-end process",
        "Surface tasks, events, dependencies, exceptions and decision rights."
      ],
      [
        "Design connected execution",
        "Determine where deterministic workflows, AI support and human approvals belong."
      ],
      [
        "Validate operational reliability",
        "Define integrations, observability, controls and value measures before expansion."
      ]
    ],
    "signals": [
      "Automation scattered across tools",
      "Frequent manual intervention",
      "Gaps between systems and approvals"
    ],
    "outcome": "An integrated automation design with clear ownership, escalation and measurable performance.",
    "visual": "automation"
  }
};
export function getServiceEditorial(service: ConsultingService): EditorialService { return serviceEditorial[service.slug]; }
