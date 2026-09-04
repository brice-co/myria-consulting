export type ArchitectureLayer = {
  id: string;
  number: string;
  name: string;
  purpose: string;
  description: string;
  capabilities: string[];
  effect: string;
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "business-direction",
    number: "01",
    name: "Business Direction",
    purpose: "Strategy & Outcomes",
    description:
      "Business priorities, operating objectives, customer outcomes, constraints, and measurable value define where intelligence should be embedded.",
    capabilities: [
      "Strategic priorities",
      "Business outcomes & KPIs",
      "Operating-model objectives",
      "Customer & employee outcomes",
      "Value opportunities",
      "Risk appetite",
    ],
    effect:
      "AI investment remains connected to measurable business performance rather than isolated technology initiatives.",
  },
  {
    id: "decision-architecture",
    number: "02",
    name: "Decision Architecture",
    purpose: "Decisions & Exceptions",
    description:
      "Recurring decisions, exceptions, approvals, and coordination points are explicitly designed so AI can improve speed, consistency, insight, or autonomy.",
    capabilities: [
      "Decision identification",
      "Exception detection",
      "Decision rights",
      "Approval thresholds",
      "Escalation rules",
      "Human-in-the-loop controls",
    ],
    effect:
      "AI becomes embedded where work is actually managed: decisions, trade-offs, approvals, and operational actions.",
  },
  {
    id: "ai-workforce",
    number: "03",
    name: "AI Workforce",
    purpose: "Agents & Intelligence",
    description:
      "Specialized AI agents provide reasoning, analysis, recommendations, orchestration, and controlled execution across business functions.",
    capabilities: [
      "Specialist AI agents",
      "Multi-agent orchestration",
      "Reasoning & recommendations",
      "Workflow execution",
      "Knowledge retrieval",
      "Agent handoffs",
    ],
    effect:
      "A digital workforce supports people, coordinates work, and executes approved actions across the organization.",
  },
  {
    id: "workflow-operations",
    number: "04",
    name: "Workflow & Operations",
    purpose: "Execution",
    description:
      "AI connects directly with operational workflows so insight can become action through adaptive, event-driven processes.",
    capabilities: [
      "Workflow orchestration",
      "Process automation",
      "Case management",
      "Task execution",
      "Event-driven actions",
      "Cross-functional coordination",
    ],
    effect:
      "AI moves beyond answering questions and begins participating directly in how work gets done.",
  },
  {
    id: "enterprise-systems",
    number: "05",
    name: "Enterprise Systems",
    purpose: "Tools & Integration",
    description:
      "The AI operating layer connects with the systems employees already use so agents can retrieve information and execute approved actions.",
    capabilities: [
      "CRM",
      "ERP",
      "HRIS",
      "Service management",
      "Collaboration platforms",
      "Internal & external APIs",
    ],
    effect:
      "Existing systems become accessible through an intelligent orchestration layer rather than remaining isolated applications.",
  },
  {
    id: "enterprise-data",
    number: "06",
    name: "Enterprise Data",
    purpose: "Context & Knowledge",
    description:
      "AI receives governed access to operational data, enterprise knowledge, documents, policies, transactions, events, and historical context.",
    capabilities: [
      "Structured operational data",
      "Enterprise knowledge",
      "Documents & policies",
      "Vector retrieval",
      "Real-time events",
      "Organizational memory",
    ],
    effect:
      "AI decisions and recommendations are grounded in the organization's actual information and operating context.",
  },
  {
    id: "governance-control",
    number: "07",
    name: "Governance & Control",
    purpose: "Trust & Accountability",
    description:
      "Governance defines what AI can see, recommend, decide, and execute, with explicit permissions, policies, thresholds, and escalation paths.",
    capabilities: [
      "Identity & access control",
      "Autonomy levels",
      "Policy enforcement",
      "Security boundaries",
      "Audit trails",
      "Human oversight",
    ],
    effect:
      "The organization can increase AI autonomy without losing accountability, transparency, or control.",
  },
  {
    id: "observability-learning",
    number: "08",
    name: "Observability & Learning",
    purpose: "Measure & Improve",
    description:
      "Performance, quality, exceptions, interventions, and business outcomes are monitored so the operating system can continuously improve.",
    capabilities: [
      "Operational telemetry",
      "Agent evaluation",
      "Business KPI monitoring",
      "Exception analysis",
      "Intervention tracking",
      "Continuous optimization",
    ],
    effect:
      "The organization develops a learning loop where AI capability improves alongside operating performance.",
  },
];

export const operatingLoop = [
  ["01", "Sense", "Detect events, signals, requests, risks, and exceptions."],
  ["02", "Understand", "Gather context, data, policy, history, and constraints."],
  ["03", "Reason", "Evaluate alternatives, trade-offs, and likely impact."],
  ["04", "Decide", "Recommend, approve, escalate, or act within authority."],
  ["05", "Act", "Execute workflows, update systems, and coordinate work."],
  ["06", "Learn", "Measure outcomes, capture feedback, and improve future decisions."],
] as const;

export const autonomyLevels = [
  ["L0", "Human Operated", "AI has no operational role."],
  ["L1", "Assist", "AI retrieves information and supports human work."],
  ["L2", "Recommend", "AI analyzes situations and proposes actions."],
  ["L3", "Act with Approval", "AI prepares actions that require human authorization."],
  ["L4", "Act within Guardrails", "AI executes approved decisions within defined thresholds."],
  ["L5", "Managed Autonomy", "AI coordinates end-to-end activity with monitoring and exception escalation."],
] as const;

export const operatingModelPath = [
  ["01", "Discover", "Map opportunities, decisions, pain points, and measurable value."],
  ["02", "Design", "Define architecture, workflows, governance, and decision rights."],
  ["03", "Enable", "Connect AI agents, enterprise data, tools, and systems."],
  ["04", "Operate", "Deploy into controlled, real-world workflows."],
  ["05", "Evolve", "Measure outcomes and progressively expand capability."],
] as const;
