export type ServiceEvidence = {
  context: string;
  example: string;
  metrics: string[];
  questions: string[];
};
export const serviceEvidence: Record<string, ServiceEvidence> = {
  "management-consulting": {
    "context": "A leadership team may have several worthwhile initiatives but insufficient capacity to pursue them together. Comparing each initiative against objectives, constraints, decision rights and timing reveals which choices require executive attention.",
    "example": "For example, a leadership planning exercise can map strategic options against operational dependencies and separate decisions needed now from hypotheses that still require evidence.",
    "metrics": [
      "Decision lead time",
      "Priority initiative ownership",
      "Progress against agreed milestones"
    ],
    "questions": [
      "Which decisions remain unresolved?",
      "What evidence would change a priority?",
      "Who is accountable for execution?"
    ]
  },
  "business-transformation": {
    "context": "Business transformation changes the way work is organized and managed. Technology, structure, processes, decision rights and adoption must be planned as interconnected dependencies, rather than independent workstreams.",
    "example": "In a transformation planning workshop, teams can trace one important customer or operational outcome through affected roles, processes and systems to identify delivery gaps before implementation.",
    "metrics": [
      "Milestone and dependency completion",
      "Process adoption",
      "Realized operational benefits"
    ],
    "questions": [
      "What capabilities must change?",
      "Which dependencies pose delivery risks?",
      "How will benefits be confirmed after launch?"
    ]
  },
  "operations-excellence": {
    "context": "Process improvement requires observation of actual work, not only documented procedures. Waiting, rework, exceptions and handoffs reveal where performance is constrained and where changes may have downstream effects.",
    "example": "Consider an order-to-delivery workflow in which exceptions bounce between sales, inventory and fulfillment. Mapping the exception decisions and handoffs provides a better basis for improvement than automating one isolated task.",
    "metrics": [
      "Cycle time",
      "Rework and exception rate",
      "First-pass completion"
    ],
    "questions": [
      "Where does work wait?",
      "What causes recurring exceptions?",
      "Who owns the end-to-end outcome?"
    ]
  },
  "change-management": {
    "context": "Organizational change requires a clear understanding of how work and expectations will differ for each affected group. Communications and training alone are not enough without leadership involvement, readiness assessment and reinforcement.",
    "example": "For a system rollout, change impacts can be mapped by role and translated into targeted learning, manager support and post-launch adoption measures rather than a single generic training plan.",
    "metrics": [
      "Role-specific readiness",
      "Active adoption by user group",
      "Support needs after launch"
    ],
    "questions": [
      "Who is most affected?",
      "What new behaviors are required?",
      "How will adoption and proficiency be measured?"
    ]
  },
  "ai-strategy": {
    "context": "An AI strategy must define which business decisions and workflows justify investment. The strongest candidates connect measurable value with feasible data access, acceptable risk and clear human accountability.",
    "example": "A team exploring AI for exception handling can first establish a baseline for investigation time, identify authoritative knowledge sources and test a bounded workflow with human review.",
    "metrics": [
      "Validated value per use case",
      "Pilot quality and error rate",
      "Time saved against baseline"
    ],
    "questions": [
      "Why is AI needed instead of simpler software?",
      "Is the required data trustworthy and accessible?",
      "What can the system do without approval?"
    ]
  },
  "intelligent-automation": {
    "context": "Operational automation should be designed around end-to-end events, exception pathways and ownership. Some steps require rules, others require reasoning, and consequential actions may require a person to approve.",
    "example": "An order exception workflow may connect a trigger, data gathering, an AI-supported recommendation, a human approval and an ERP update. Every transition needs observability and recovery behavior.",
    "metrics": [
      "End-to-end completion time",
      "Manual interventions per case",
      "Exception resolution reliability"
    ],
    "questions": [
      "Which system owns each action?",
      "What happens when automation fails?",
      "Where must approval or escalation occur?"
    ]
  }
};
