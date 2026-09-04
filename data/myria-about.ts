export const MYRIA_OVERVIEW = {
  positioning: "The virtual management consulting firm",
  summary:
    "Myria combines proven management consulting thinking with a virtual team of specialist advisors. The model helps leaders move from ambiguity to structured decisions, actionable priorities, and practical implementation paths.",
  differentiators: [
    "Management consulting thinking before technology",
    "Specialist perspectives connected around one problem",
    "Focused Advisory Labs rather than unnecessary consulting overhead",
    "Business-first AI and operating-model design",
    "Human judgment and accountability remain central",
    "Actionable roadmaps and decisions rather than presentation-heavy delivery",
  ],
};

export const SPECIALISTS = [
  {
    id: "strategy",
    name: "Strategy Advisor",
    purpose: "Clarify direction",
    description:
      "Frames strategic choices, priorities, assumptions, positioning, alignment, and the path from ambition to execution.",
    focus: ["Strategic priorities", "Growth choices", "Operating-model direction", "Leadership alignment"],
    href: "/labs/strategy",
  },
  {
    id: "operations",
    name: "Operations Advisor",
    purpose: "Improve work",
    description:
      "Focuses on processes, decisions, exceptions, handoffs, capacity, service performance, and operational redesign.",
    focus: ["Process improvement", "Operational exceptions", "Cross-functional handoffs", "Automation opportunities"],
    href: "/labs/operations",
  },
  {
    id: "people-change",
    name: "People & Change Advisor",
    purpose: "Turn change into adoption",
    description:
      "Addresses impacts, stakeholders, readiness, roles, capability, communication, resistance, and sustainable adoption.",
    focus: ["Change strategy", "Stakeholder alignment", "Readiness", "Roles and capability"],
    href: "/labs/people-change",
  },
  {
    id: "ai-data",
    name: "AI & Data Advisor",
    purpose: "Find value",
    description:
      "Identifies where AI and data can create measurable value and what architecture, data, governance, and implementation path are required.",
    focus: ["AI opportunity discovery", "Agentic workflows", "Data readiness", "AI governance"],
    href: "/labs/ai-data",
  },
] as const;

export const AI_LAYERS = [
  ["business-direction", "01", "Business Direction", "Strategy & Outcomes"],
  ["decision-architecture", "02", "Decision Architecture", "Decisions & Exceptions"],
  ["ai-workforce", "03", "AI Workforce", "Agents & Intelligence"],
  ["workflow-operations", "04", "Workflow & Operations", "Execution"],
  ["enterprise-systems", "05", "Enterprise Systems", "Tools & Integration"],
  ["enterprise-data", "06", "Enterprise Data", "Context & Knowledge"],
  ["governance-control", "07", "Governance & Control", "Trust & Accountability"],
  ["observability-learning", "08", "Observability & Learning", "Measure & Improve"],
] as const;

export const LABS = [
  ["discovery", "Discovery Lab", "Clarify the problem", "/labs"],
  ["strategy", "Strategy Lab", "Clarify direction", "/labs/strategy"],
  ["operations", "Operations Lab", "Improve work", "/labs/operations"],
  ["people-change", "People & Change Lab", "Turn change into adoption", "/labs/people-change"],
  ["ai-data", "AI & Data Lab", "Find value", "/labs/ai-data"],
] as const;
