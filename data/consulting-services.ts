export type ConsultingService = {
  slug: string;
  name: string;
  target: string;
  intro: string;
  challenge: string;
  approach: string[];
  outputs: string[];
  related: string;
};

export const consultingServices: ConsultingService[] = [
  {
    "slug": "management-consulting",
    "name": "Management Consulting",
    "target": "Management Consulting Services",
    "intro": "Make better management decisions and connect strategic priorities to practical execution.",
    "challenge": "Organizations often face competing priorities, unclear decision rights and initiatives that are difficult to translate into operational progress.",
    "approach": [
      "Clarify the business problem, objectives and decision criteria.",
      "Assess priorities, capabilities, organizational constraints and execution dependencies.",
      "Translate recommendations into a practical action plan with owners and measures."
    ],
    "outputs": [
      "Strategic and operational assessment",
      "Decision and prioritization framework",
      "Implementation roadmap and performance measures"
    ],
    "related": "/our-approach/management-model"
  },
  {
    "slug": "business-transformation",
    "name": "Business Transformation",
    "target": "Business Transformation Consulting",
    "intro": "Connect strategy, operating models, people and technology through a structured transformation approach.",
    "challenge": "Transformation initiatives can lose momentum when business objectives, process changes, technology and adoption are planned independently.",
    "approach": [
      "Establish the case for change and desired business outcomes.",
      "Assess operating impacts, dependencies, delivery risks and readiness.",
      "Coordinate the implementation roadmap, governance and measures of progress."
    ],
    "outputs": [
      "Transformation diagnosis and target outcomes",
      "Impact and readiness assessment",
      "Governance and implementation roadmap"
    ],
    "related": "/insights/from-strategy-to-execution"
  },
  {
    "slug": "operations-excellence",
    "name": "Operational Excellence",
    "target": "Operational Excellence & Process Improvement Consulting",
    "intro": "Improve end-to-end workflows, reduce operational friction and strengthen performance management.",
    "challenge": "Fragmented workflows, recurring exceptions and unclear responsibilities often make it difficult to see why results vary or where work slows down.",
    "approach": [
      "Map current workflows, handoffs, bottlenecks and exceptions.",
      "Identify root causes and practical process and operating model improvements.",
      "Define owners, improvement priorities and operational KPIs."
    ],
    "outputs": [
      "Current-state process and exception map",
      "Prioritized improvement opportunities",
      "Future-state workflow and KPI framework"
    ],
    "related": "/insights/from-strategy-to-execution"
  },
  {
    "slug": "change-management",
    "name": "Organizational Change Management",
    "target": "Organizational Change Management Consulting",
    "intro": "Help leaders and teams prepare for, adopt and sustain organizational and technology-enabled change.",
    "challenge": "Even well-designed initiatives struggle when stakeholders are not aligned, people are insufficiently prepared and adoption is not measured.",
    "approach": [
      "Identify stakeholders, impacts and organizational readiness.",
      "Plan leadership engagement, communications and learning support.",
      "Track adoption, manage resistance and adjust support based on evidence."
    ],
    "outputs": [
      "Stakeholder and change impact assessment",
      "Communication and training approach",
      "Adoption measures and reinforcement plan"
    ],
    "related": "/our-approach/management-model"
  },
  {
    "slug": "ai-strategy",
    "name": "AI Strategy & Advisory",
    "target": "AI Strategy Consulting & Readiness Assessment",
    "intro": "Identify where AI can improve business outcomes and build a practical, governed adoption roadmap.",
    "challenge": "AI initiatives can remain disconnected experiments when organizations cannot establish business value, readiness, ownership or governance.",
    "approach": [
      "Identify business decisions, workflows and problems worth improving.",
      "Evaluate opportunities against value, data readiness, integration, risk and human oversight.",
      "Sequence pilot opportunities and define evaluation and governance requirements."
    ],
    "outputs": [
      "AI opportunity and readiness assessment",
      "Prioritized use-case portfolio",
      "Adoption roadmap, safeguards and success measures"
    ],
    "related": "/resources/guides/finding-ai-opportunities"
  },
  {
    "slug": "intelligent-automation",
    "name": "Intelligent Automation & Operations",
    "target": "Intelligent Business Process Automation Consulting",
    "intro": "Design connected workflows that coordinate people, enterprise systems, automation and AI where they add measurable value.",
    "challenge": "Isolated automation rarely resolves process-wide delays, complex exceptions or gaps between systems and accountable decisions.",
    "approach": [
      "Map the end-to-end workflow and decision or escalation points.",
      "Identify where rule-based automation, AI assistance and human approval fit.",
      "Define integration, monitoring, governance and performance requirements."
    ],
    "outputs": [
      "Workflow and decision map",
      "Automation opportunity and integration architecture",
      "Pilot scope, controls and evaluation criteria"
    ],
    "related": "/ai-enablement"
  }
];

export function getConsultingService(slug: string) {
  return consultingServices.find((service) => service.slug === slug);
}
