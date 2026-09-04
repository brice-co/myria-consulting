import type { LabSlug } from "@/data/labs";

export type LabSessionQuestion = {
  id: string;
  stageId: number;
  eyebrow: string;
  question: string;
  guidance?: string;
  placeholder: string;
};

export type LabSessionQuestions = Record<
  LabSlug,
  LabSessionQuestion[]
>;

export const labSessionQuestions: LabSessionQuestions = {
  discovery: [
    {
      id: "discovery-1",
      stageId: 1,
      eyebrow: "Business context",
      question:
        "What is your organization trying to accomplish over the next 12 to 24 months?",
      guidance:
        "Think about the business outcomes, priorities, or changes that matter most.",
      placeholder:
        "Describe your organization’s priorities, objectives, or ambitions...",
    },
    {
      id: "discovery-2",
      stageId: 2,
      eyebrow: "The challenge",
      question:
        "What is making it difficult to achieve those outcomes today?",
      guidance:
        "Consider recurring problems, constraints, delays, risks, or areas where leadership attention is being consumed.",
      placeholder:
        "Describe the problems, friction, or constraints you are experiencing...",
    },
    {
      id: "discovery-3",
      stageId: 3,
      eyebrow: "What matters",
      question:
        "Where do you believe the greatest uncertainty or opportunity exists?",
      guidance:
        "You do not need to have the answer. Focus on where deeper thinking would be most useful.",
      placeholder:
        "Describe the areas you believe deserve closer examination...",
    },
    {
      id: "discovery-4",
      stageId: 4,
      eyebrow: "Opportunity",
      question:
        "If this challenge were significantly improved, what would change for the business?",
      guidance:
        "Think about customers, employees, operations, growth, cost, risk, or decision-making.",
      placeholder:
        "Describe the business impact you would want to see...",
    },
    {
      id: "discovery-5",
      stageId: 5,
      eyebrow: "Focus",
      question:
        "What would make the next step valuable enough to act on?",
      guidance:
        "Consider the level of clarity, evidence, confidence, or business value leadership would need.",
      placeholder:
        "Describe what you would need to move forward with confidence...",
    },
  ],

  strategy: [
    {
      id: "strategy-1",
      stageId: 1,
      eyebrow: "Strategic context",
      question:
        "What ambition or business outcome is driving the strategic discussion?",
      guidance:
        "Describe what the organization is trying to achieve and why it matters now.",
      placeholder:
        "Describe the strategic ambition or desired outcome...",
    },
    {
      id: "strategy-2",
      stageId: 2,
      eyebrow: "Strategic challenge",
      question:
        "What strategic choice or uncertainty is preventing a clear direction?",
      guidance:
        "Think about competing priorities, unclear choices, changing conditions, or leadership alignment.",
      placeholder:
        "Describe the strategic question that needs to be resolved...",
    },
    {
      id: "strategy-3",
      stageId: 3,
      eyebrow: "Options",
      question:
        "What possible paths are currently being considered?",
      guidance:
        "Include options even if they are still incomplete or controversial.",
      placeholder:
        "Describe the strategic options you are considering...",
    },
    {
      id: "strategy-4",
      stageId: 4,
      eyebrow: "Trade-offs",
      question:
        "What trade-offs or risks make the decision difficult?",
      guidance:
        "Consider investment, timing, capability, customers, operations, and organizational implications.",
      placeholder:
        "Describe the trade-offs, constraints, or risks...",
    },
    {
      id: "strategy-5",
      stageId: 5,
      eyebrow: "Direction",
      question:
        "What would a clear strategic decision need to accomplish?",
      guidance:
        "Focus on the outcomes and decisions leadership needs to align around.",
      placeholder:
        "Describe what a successful strategic direction would make clear...",
    },
  ],

  operations: [
    {
      id: "operations-1",
      stageId: 1,
      eyebrow: "Current workflow",
      question:
        "Which workflow or operational area is creating the greatest concern?",
      guidance:
        "Describe the work from the business perspective rather than starting with technology.",
      placeholder:
        "Describe the workflow, process, or operational area...",
    },
    {
      id: "operations-2",
      stageId: 2,
      eyebrow: "Operational friction",
      question:
        "Where does the work slow down, break down, or require unnecessary effort?",
      guidance:
        "Consider handoffs, rework, waiting, duplication, manual work, and unclear ownership.",
      placeholder:
        "Describe the bottlenecks or friction you observe...",
    },
    {
      id: "operations-3",
      stageId: 3,
      eyebrow: "Improvement",
      question:
        "What would a materially better way of working look like?",
      guidance:
        "Think about speed, quality, simplicity, capacity, cost, and customer experience.",
      placeholder:
        "Describe how you would like the operation to perform...",
    },
    {
      id: "operations-4",
      stageId: 4,
      eyebrow: "Prioritization",
      question:
        "Which improvements would create the most meaningful business impact?",
      guidance:
        "Consider value, frequency, effort, feasibility, and risk.",
      placeholder:
        "Describe the improvements you believe should be prioritized...",
    },
    {
      id: "operations-5",
      stageId: 5,
      eyebrow: "Action",
      question:
        "What would need to happen for the improvement to move into execution?",
      guidance:
        "Consider ownership, systems, data, people, investment, and dependencies.",
      placeholder:
        "Describe what would be required to move forward...",
    },
  ],

  "ai-data": [
    {
      id: "ai-data-1",
      stageId: 1,
      eyebrow: "Business need",
      question:
        "What business outcome are you hoping AI or better use of data could improve?",
      guidance:
        "Start with the business result—not the technology.",
      placeholder:
        "Describe the business outcome, problem, or opportunity...",
    },
    {
      id: "ai-data-2",
      stageId: 2,
      eyebrow: "Work & data",
      question:
        "How is the relevant work performed today, and what information does it depend on?",
      guidance:
        "Consider people, workflows, decisions, systems, documents, and data sources.",
      placeholder:
        "Describe how the work happens today and the information it uses...",
    },
    {
      id: "ai-data-3",
      stageId: 3,
      eyebrow: "AI opportunity",
      question:
        "Where could better intelligence, automation, or decision support make a meaningful difference?",
      guidance:
        "Think about repetitive work, knowledge access, decisions, customer interactions, and exceptions.",
      placeholder:
        "Describe where AI or data could potentially create value...",
    },
    {
      id: "ai-data-4",
      stageId: 4,
      eyebrow: "Value & feasibility",
      question:
        "What would determine whether an AI opportunity is worth pursuing?",
      guidance:
        "Consider measurable value, data readiness, risk, integration, adoption, and implementation effort.",
      placeholder:
        "Describe the conditions that would make an AI opportunity worthwhile...",
    },
    {
      id: "ai-data-5",
      stageId: 5,
      eyebrow: "Priority",
      question:
        "Which opportunity would you be most prepared to validate first?",
      guidance:
        "Choose something meaningful enough to matter but focused enough to test.",
      placeholder:
        "Describe the opportunity you would prioritize...",
    },
  ],

  "people-change": [
    {
      id: "people-change-1",
      stageId: 1,
      eyebrow: "Change context",
      question:
        "What is changing in the organization, and why is the change necessary?",
      guidance:
        "Describe the business reason for the change and the outcome it is expected to enable.",
      placeholder:
        "Describe the change and why it matters...",
    },
    {
      id: "people-change-2",
      stageId: 2,
      eyebrow: "People impact",
      question:
        "Who will experience the greatest change, and what will be different for them?",
      guidance:
        "Think about roles, processes, behaviors, systems, responsibilities, and expectations.",
      placeholder:
        "Describe the stakeholder groups and how they will be affected...",
    },
    {
      id: "people-change-3",
      stageId: 3,
      eyebrow: "Readiness",
      question:
        "What could prevent people from adopting the change successfully?",
      guidance:
        "Consider awareness, leadership alignment, resistance, capability, workload, and change fatigue.",
      placeholder:
        "Describe the readiness concerns or adoption barriers...",
    },
    {
      id: "people-change-4",
      stageId: 4,
      eyebrow: "Mobilization",
      question:
        "What support will people need to move successfully through the change?",
      guidance:
        "Consider leadership, communication, participation, learning, coaching, and local support.",
      placeholder:
        "Describe the support and engagement that may be required...",
    },
    {
      id: "people-change-5",
      stageId: 5,
      eyebrow: "Adoption",
      question:
        "How will you know the change has actually been adopted?",
      guidance:
        "Think beyond deployment. Consider behaviors, performance, capability, usage, and business outcomes.",
      placeholder:
        "Describe what successful adoption would look like...",
    },
  ],
};

export function getLabSessionQuestion(
  labSlug: LabSlug,
  stageId: number,
) {
  return (
    labSessionQuestions[labSlug].find(
      (question) => question.stageId === stageId,
    ) ?? null
  );
}