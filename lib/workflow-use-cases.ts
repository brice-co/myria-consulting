import type { RoomMessage, RoomParticipant } from "@/lib/intelligence-use-cases";

export type WorkflowUseCaseId = "support" | "booking" | "proposals";

export type WorkflowCase = {
  id: string;
  title: string;
  subject: string;
  priority: "High" | "Medium" | "Low";
  step: number;
  context: string;
  agentFinding: string;
  humanDecision: string;
  options: [string, string];
};

export type WorkflowUseCase = {
  id: WorkflowUseCaseId;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
  flow: { title: string; description: string }[];
  capabilities: string[];
  advisoryQuestions: string[];
  cases: WorkflowCase[];
  participants: RoomParticipant[];
  messages: RoomMessage[];
  self: { name: string; initials: string };
  systemAgent: { name: string; initials: string };
  invitee: RoomParticipant;
};

export const workflowUseCases: Record<WorkflowUseCaseId, WorkflowUseCase> = {
  support: {
    id: "support",
    eyebrow: "Customer support intelligence",
    title: "Resolve more customer needs without losing human judgment.",
    description: "Redesign support around the decisions behind every interaction: what the customer needs, what can be resolved automatically, what needs investigation, and when a specialist should take over.",
    outcomes: ["Faster routine resolution", "Better specialist focus", "Clearer root causes"],
    flow: [
      { title: "Listen", description: "Capture the need and context." },
      { title: "Investigate", description: "Retrieve knowledge, account data and status." },
      { title: "Decide & act", description: "Resolve or run an approved workflow." },
      { title: "Escalate & learn", description: "Hand off exceptions, surface patterns." },
    ],
    capabilities: ["Conversational intake", "Knowledge-grounded resolution", "Tool execution", "Human handoff"],
    advisoryQuestions: ["Which support decisions are repetitive enough to automate?", "Which actions require human approval?", "How should escalation risk be governed?"],
    cases: [
      { id: "s1", title: "Refund for duplicate charge", subject: "Harbor Health · Billing", priority: "Medium", step: 1, context: "Customer reports being charged twice for the October plan renewal.", agentFinding: "Payment log confirms a duplicate capture 4 minutes apart. Refund policy allows automatic reversal under $5k.", humanDecision: "Approve automatic refund?", options: ["Approve refund", "Send to billing specialist"] },
      { id: "s2", title: "Data export failing for admin", subject: "Vero Mobility · Platform", priority: "High", step: 0, context: "Admin cannot export audit logs before a compliance deadline on Friday.", agentFinding: "Known export timeout affects workspaces over 2M events. Engineering workaround available.", humanDecision: "Apply workaround or escalate to engineering?", options: ["Apply workaround", "Escalate to engineering"] },
      { id: "s3", title: "Repeated SSO lockouts", subject: "Cinder Works · Identity", priority: "High", step: 2, context: "Fourth contact this week about SSO lockouts across the finance team.", agentFinding: "Pattern matches an expired IdP certificate. 3 other accounts show the same signal.", humanDecision: "Hand off to identity specialist with case summary?", options: ["Hand off now", "Resolve with guided steps"] },
    ],
    participants: [
      { id: "leila", name: "Leila Rao", role: "Support lead", kind: "person", status: "Active", initials: "LR" },
      { id: "sam", name: "Sam Ortiz", role: "Billing specialist", kind: "person", status: "Available", initials: "SO" },
      { id: "intake", name: "Intake agent", role: "Conversational intake", kind: "agent", status: "Working", initials: "IA" },
      { id: "resolve", name: "Resolution agent", role: "Knowledge & tools", kind: "agent", status: "Working", initials: "RS" },
    ],
    messages: [
      { id: "m1", author: "Intake agent", initials: "IA", kind: "agent", text: "Three new requests structured. The SSO case matches a pattern from two other accounts.", time: "09:12" },
      { id: "m2", author: "Leila Rao", initials: "LR", kind: "person", text: "Let's keep the SSO one with a specialist. Sam, can you watch the billing refund?", time: "09:14" },
    ],
    self: { name: "Leila Rao", initials: "LR" },
    systemAgent: { name: "Support agent", initials: "SU" },
    invitee: { id: "nora", name: "Nora Kim", role: "Identity specialist", kind: "person", status: "Active", initials: "NK" },
  },
  booking: {
    id: "booking",
    eyebrow: "Intelligent booking & scheduling",
    title: "Turn scheduling into a context-aware service workflow.",
    description: "Connect conversational booking with availability, business rules, customer context, reminders and exception handling so scheduling becomes part of the operating process.",
    outcomes: ["Fewer scheduling exchanges", "Fewer no-shows", "Rules applied consistently"],
    flow: [
      { title: "Understand", description: "Capture the service need and constraints." },
      { title: "Check", description: "Evaluate availability and business rules." },
      { title: "Commit", description: "Create the booking and confirm details." },
      { title: "Coordinate", description: "Manage reminders, changes and exceptions." },
    ],
    capabilities: ["Conversational booking", "Availability & rules engine", "Calendar tools", "Exception handling"],
    advisoryQuestions: ["Which booking rules are fixed versus negotiable?", "When should staff override availability?", "Which reminders reduce no-shows?"],
    cases: [
      { id: "b1", title: "On-site installation, 3 technicians", subject: "Oakline Foods · Reno plant", priority: "High", step: 1, context: "Customer needs a full-day install next week; only two certified technicians are free Tuesday.", agentFinding: "Thursday has three certified technicians and a loading-dock slot. Tuesday would need a contractor.", humanDecision: "Propose Thursday or approve a contractor for Tuesday?", options: ["Propose Thursday", "Approve contractor Tuesday"] },
      { id: "b2", title: "Reschedule quarterly review", subject: "Altitude Labs · Executive", priority: "Medium", step: 2, context: "Executive sponsor asked to move the review after a board conflict.", agentFinding: "Two slots fit all five attendees. One overlaps a renewal call with the same sponsor.", humanDecision: "Hold the slot combined with the renewal call?", options: ["Combine meetings", "Book separate slot"] },
      { id: "b3", title: "Same-day urgent repair", subject: "Lumen Grid · Field service", priority: "High", step: 0, context: "Grid sensor outage reported; contract SLA requires on-site response within 6 hours.", agentFinding: "Nearest technician is 2.5 hours away and finishing a low-priority visit.", humanDecision: "Reassign the technician from the current visit?", options: ["Reassign now", "Dispatch on-call partner"] },
    ],
    participants: [
      { id: "maya", name: "Maya Chen", role: "Service coordinator", kind: "person", status: "Active", initials: "MC" },
      { id: "diego", name: "Diego Alves", role: "Field manager", kind: "person", status: "Available", initials: "DA" },
      { id: "sched", name: "Scheduling agent", role: "Availability & rules", kind: "agent", status: "Working", initials: "SG" },
      { id: "remind", name: "Reminder agent", role: "Confirmations", kind: "agent", status: "Available", initials: "RM" },
    ],
    messages: [
      { id: "m1", author: "Scheduling agent", initials: "SG", kind: "agent", text: "Lumen Grid's outage is inside its 6-hour SLA window. I've ranked dispatch options.", time: "08:51" },
      { id: "m2", author: "Diego Alves", initials: "DA", kind: "person", text: "Prefer we don't pull someone off a visit unless the partner can't make it.", time: "08:53" },
    ],
    self: { name: "Maya Chen", initials: "MC" },
    systemAgent: { name: "Booking agent", initials: "BK" },
    invitee: { id: "ivy", name: "Ivy Grant", role: "Customer success", kind: "person", status: "Active", initials: "IG" },
  },
  proposals: {
    id: "proposals",
    eyebrow: "Proposal & commercial response",
    title: "Move from scattered inputs to a governed commercial response.",
    description: "Structure proposal creation around opportunity context, approved capabilities, pricing inputs, risk review and decision rights so AI accelerates the work while the business keeps control of commitments.",
    outcomes: ["Shorter proposal cycles", "Consistent messaging", "Clear approval controls"],
    flow: [
      { title: "Frame", description: "Structure the opportunity and requirements." },
      { title: "Assemble", description: "Retrieve approved content and inputs." },
      { title: "Review", description: "Route pricing, legal and commitments." },
      { title: "Finalize", description: "Produce the approved client response." },
    ],
    capabilities: ["Opportunity synthesis", "Approved content retrieval", "Proposal orchestration", "Approval-aware generation"],
    advisoryQuestions: ["Which proposal content is authoritative?", "Which commitments require approval?", "How should proposal risk be measured?"],
    cases: [
      { id: "p1", title: "Cinder Works implementation RFP", subject: "$320k · Due in 4 days", priority: "High", step: 2, context: "Procurement requires a 99.9% uptime commitment and a 90-day rollout.", agentFinding: "Approved SLA language covers 99.9%. The 90-day timeline exceeds the delivery team's standard 120 days.", humanDecision: "Commit to 90 days with added resources, or propose 120?", options: ["Commit to 90 days", "Propose 120 days"] },
      { id: "p2", title: "Vero Mobility expansion", subject: "$240k · Due in 9 days", priority: "Medium", step: 1, context: "Expansion into two new regions with customer intelligence workspaces.", agentFinding: "Found 3 approved case studies and a reusable pricing model. Data residency clause needs legal input.", humanDecision: "Route data residency clause to legal?", options: ["Route to legal", "Use standard clause"] },
      { id: "p3", title: "Harbor Health pilot", subject: "$72k · Due in 14 days", priority: "Low", step: 0, context: "Regulated pilot for governed AI collaboration in clinical operations.", agentFinding: "Requirements extracted from discovery notes. Two HIPAA questions unanswered.", humanDecision: "Send clarification questions to the client?", options: ["Send questions", "Assume standard controls"] },
    ],
    participants: [
      { id: "priya", name: "Priya Shah", role: "Bid manager", kind: "person", status: "Active", initials: "PS" },
      { id: "jon", name: "Jon Bell", role: "Pricing & finance", kind: "person", status: "Available", initials: "JB" },
      { id: "draft", name: "Drafting agent", role: "Approved content", kind: "agent", status: "Working", initials: "DR" },
      { id: "risk", name: "Risk agent", role: "Commitment review", kind: "agent", status: "Working", initials: "RK" },
    ],
    messages: [
      { id: "m1", author: "Risk agent", initials: "RK", kind: "agent", text: "Cinder Works' 90-day timeline is a non-standard commitment and needs delivery sign-off.", time: "10:20" },
      { id: "m2", author: "Priya Shah", initials: "PS", kind: "person", text: "Jon, can you model the cost of adding a second delivery pod?", time: "10:22" },
    ],
    self: { name: "Priya Shah", initials: "PS" },
    systemAgent: { name: "Proposal agent", initials: "PR" },
    invitee: { id: "rhea", name: "Rhea Novak", role: "Legal counsel", kind: "person", status: "Active", initials: "RN" },
  },
};
