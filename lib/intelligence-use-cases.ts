export type ArchitectureCapability = {
  id: string;
  name: string;
  description: string;
  status: "Live" | "Review" | "Pilot";
  coverage: number;
  connections: string[];
  governance: string;
  activity: string;
};

export type OperationalException = {
  id: string;
  title: string;
  area: string;
  severity: "Critical" | "Elevated" | "Watch";
  age: string;
  impact: string;
  signal: string;
  recommendation: string;
  owner: string;
  workflow: string[];
};

export type LeadStage = "Captured" | "Qualified" | "Engaged" | "Meeting" | "Opportunity";

export type Lead = {
  id: string;
  name: string;
  company: string;
  title: string;
  stage: LeadStage;
  score: number;
  source: string;
  value: string;
  owner: string;
  signal: string;
  nextAction: string;
};

export type RoomParticipant = {
  id: string;
  name: string;
  role: string;
  kind: "person" | "agent";
  status: "Active" | "Working" | "Available";
  initials: string;
};

export type RoomMessage = {
  id: string;
  author: string;
  initials: string;
  kind: "person" | "agent";
  text: string;
  time: string;
};

export const architectureCapabilities: ArchitectureCapability[] = [
  { id: "agents", name: "Agent runtime", description: "Coordinates specialized agents across approved business contexts.", status: "Live", coverage: 92, connections: ["Sales workspace", "Service desk", "Finance ops"], governance: "Policy checks enforced", activity: "1,284 agent runs today" },
  { id: "tools", name: "Tool registry", description: "Controls which actions agents can discover and execute.", status: "Live", coverage: 88, connections: ["CRM actions", "ERP queries", "Messaging"], governance: "48 tools approved", activity: "6 access reviews pending" },
  { id: "knowledge", name: "Knowledge and RAG", description: "Grounds work in governed organizational knowledge and permissions.", status: "Live", coverage: 84, connections: ["Policies", "Product docs", "Account history"], governance: "Source-level permissions", activity: "93% grounded responses" },
  { id: "workflow", name: "Workflow automation", description: "Runs durable, multi-step work with checkpoints and recovery.", status: "Pilot", coverage: 67, connections: ["Approvals", "Case routing", "Fulfillment"], governance: "Human gates configured", activity: "216 active workflows" },
  { id: "integrations", name: "Enterprise integrations", description: "Connects AI to systems of record through reusable adapters.", status: "Review", coverage: 73, connections: ["CRM", "ERP", "Data warehouse"], governance: "2 connectors in review", activity: "99.97% connector uptime" },
  { id: "governance", name: "Audit and governance", description: "Captures policy, lineage, decisions and actions end to end.", status: "Live", coverage: 96, connections: ["Identity", "Risk controls", "Audit archive"], governance: "Continuous monitoring", activity: "0 unresolved violations" },
];

export const operationalExceptions: OperationalException[] = [
  { id: "inventory", title: "Regional inventory imbalance", area: "Supply chain", severity: "Critical", age: "18 min", impact: "$184k revenue at risk across 12 orders", signal: "West region stock fell below committed demand while East has 34% excess capacity.", recommendation: "Transfer 420 units from Newark to Reno and reprioritize two low-risk orders.", owner: "Maya Chen", workflow: ["Signal detected", "Impact assessed", "Transfer approval", "ERP execution", "Customer notice"] },
  { id: "invoice", title: "Invoice mismatch cluster", area: "Finance operations", severity: "Elevated", age: "43 min", impact: "38 invoices · $72k payment delay", signal: "New freight codes are failing three-way matching for one carrier.", recommendation: "Apply approved code mapping, reprocess affected invoices and notify treasury.", owner: "Jon Bell", workflow: ["Exception grouped", "Root cause found", "Policy approval", "Batch reprocess", "Treasury notice"] },
  { id: "sla", title: "Service SLA trend", area: "Customer operations", severity: "Watch", age: "2 hr", impact: "7 enterprise accounts approaching SLA", signal: "Specialist queue wait time is 22% above the weekly baseline.", recommendation: "Shift two certified agents for four hours and prioritize renewal-window accounts.", owner: "Leila Rao", workflow: ["Trend detected", "Accounts ranked", "Staffing approval", "Queue rebalance", "SLA review"] },
];

export const leadStages: LeadStage[] = ["Captured", "Qualified", "Engaged", "Meeting", "Opportunity"];

export const leadCaptureLeads: Lead[] = [
  { id: "altitude", name: "Nina Patel", company: "Altitude Labs", title: "VP, Revenue Operations", stage: "Qualified", score: 94, source: "Industry report", value: "$180k", owner: "Alex Morgan", signal: "Viewed enterprise pricing twice and shared the governance brief with three colleagues.", nextAction: "Send a tailored architecture recap and offer a 30-minute solution workshop." },
  { id: "oakline", name: "Marcus Lee", company: "Oakline Foods", title: "Director of Digital", stage: "Engaged", score: 88, source: "Webinar", value: "$96k", owner: "Priya Shah", signal: "Asked about connecting regional workflows during the live Q&A.", nextAction: "Share the integration map and confirm stakeholders for a technical discovery call." },
  { id: "vero", name: "Elena Rossi", company: "Vero Mobility", title: "Head of Customer Experience", stage: "Meeting", score: 91, source: "Partner referral", value: "$240k", owner: "Alex Morgan", signal: "A discovery session is booked with customer operations and IT leadership.", nextAction: "Prepare the customer intelligence workspace using their renewal-risk scenario." },
  { id: "harbor", name: "Owen Brooks", company: "Harbor Health", title: "Transformation Lead", stage: "Captured", score: 73, source: "Contact form", value: "$72k", owner: "Unassigned", signal: "Requested examples of governed AI collaboration in regulated teams.", nextAction: "Enrich the account and route to the healthcare enterprise team." },
  { id: "cinder", name: "Amara Okoye", company: "Cinder Works", title: "COO", stage: "Opportunity", score: 97, source: "Executive dinner", value: "$320k", owner: "Priya Shah", signal: "Business case accepted; procurement requested implementation timing and controls.", nextAction: "Complete the mutual action plan and schedule the security review." },
  { id: "lumen", name: "Theo Jensen", company: "Lumen Grid", title: "Commercial Strategy", stage: "Captured", score: 79, source: "Organic search", value: "$110k", owner: "Unassigned", signal: "Downloaded the operating model guide and returned to the workflow page.", nextAction: "Validate account fit and personalize an operations intelligence follow-up." },
];

export const leadRoomParticipants: RoomParticipant[] = [
  { id: "alex", name: "Alex Morgan", role: "Account executive", kind: "person", status: "Active", initials: "AM" },
  { id: "priya", name: "Priya Shah", role: "Solutions lead", kind: "person", status: "Active", initials: "PS" },
  { id: "research", name: "Research agent", role: "Account enrichment", kind: "agent", status: "Working", initials: "RA" },
  { id: "signal", name: "Signal agent", role: "Intent scoring", kind: "agent", status: "Working", initials: "SA" },
  { id: "outreach", name: "Outreach agent", role: "Message preparation", kind: "agent", status: "Available", initials: "OA" },
];

export const initialLeadRoomMessages: RoomMessage[] = [
  { id: "m1", author: "Signal agent", initials: "SA", kind: "agent", text: "Nina moved above the qualification threshold after new governance-page activity.", time: "09:41" },
  { id: "m2", author: "Alex Morgan", initials: "AM", kind: "person", text: "Good signal. Can we ground the follow-up in their current operating model?", time: "09:43" },
  { id: "m3", author: "Research agent", initials: "RA", kind: "agent", text: "I found a recent RevOps expansion initiative and added the source to the account brief.", time: "09:44" },
];

export type ArtifactKind = "Document" | "Whiteboard" | "Flowchart" | "Data view";

export type CollaborativeArtifact = {
  id: string;
  title: string;
  kind: ArtifactKind;
  updated: string;
  summary: string;
  sections: { heading: string; body: string }[];
  aiSuggestion: string;
};

export type DecisionItem = {
  id: string;
  title: string;
  context: string;
  options: string[];
  status: "Open" | "Decided";
  decided?: string;
};

export type ActionCard = {
  id: string;
  title: string;
  owner: string;
  column: "To do" | "Doing" | "Done";
};

export const collaborativeArtifacts: CollaborativeArtifact[] = [
  { id: "brief", title: "Q4 renewal-risk brief", kind: "Document", updated: "2 min ago", summary: "Shared brief connecting renewal-risk accounts, signals and the response plan.", sections: [ { heading: "Situation", body: "Seven enterprise accounts show declining usage and unresolved service exceptions heading into renewal windows." }, { heading: "Response", body: "Pair each account with a specialist, resolve open exceptions first and prepare outcome summaries for executive sponsors." } ], aiSuggestion: "I drafted an executive summary paragraph from the three linked account workspaces — review and insert it above the Response section." },
  { id: "board", title: "Operating model whiteboard", kind: "Whiteboard", updated: "14 min ago", summary: "Live sketch of how agents, teams and approvals connect across the renewal workflow.", sections: [ { heading: "Flow", body: "Signal agent → account room → specialist review → approval gate → customer notice." }, { heading: "Open question", body: "Should the approval gate move before specialist review for low-risk accounts?" } ], aiSuggestion: "I can convert this whiteboard into a flowchart with the approval gate as a decision node." },
  { id: "flow", title: "Exception-to-action flowchart", kind: "Flowchart", updated: "1 hr ago", summary: "Durable workflow from detected exception to approved execution with audit checkpoints.", sections: [ { heading: "Stages", body: "Detect → Assess impact → Recommend → Approve → Execute → Verify." }, { heading: "Controls", body: "Human approval required for any action touching customer commitments or payments." } ], aiSuggestion: "Two steps lack owners. I suggested owners based on the last five similar workflows." },
  { id: "data", title: "Renewal health data view", kind: "Data view", updated: "Live", summary: "Connected view of account health, open exceptions and renewal dates.", sections: [ { heading: "Readout", body: "Health improved 6 points this week after the inventory exception was approved and executed." }, { heading: "Watchlist", body: "Bluefin Logistics and two mid-market accounts remain below the health threshold." } ], aiSuggestion: "I pinned the three accounts trending down to the top of the view and notified the room." },
];

export const initialDecisions: DecisionItem[] = [
  { id: "d1", title: "Approve specialist pairing for at-risk accounts", context: "Seven accounts need a named specialist before their renewal window opens.", options: ["Pair specialists now", "Wait for next planning cycle"], status: "Open" },
  { id: "d2", title: "Move approval gate for low-risk accounts", context: "Low-risk accounts wait an average of 9 hours at the approval gate.", options: ["Auto-approve under $10k", "Keep human approval"], status: "Open" },
  { id: "d3", title: "Adopt the exception-to-action flowchart as standard", context: "The pilot workflow cut response time by 41% across two regions.", options: ["Adopt as standard", "Extend pilot"], status: "Decided", decided: "Adopt as standard" },
];

export const initialActionCards: ActionCard[] = [
  { id: "a1", title: "Insert AI-drafted executive summary into brief", owner: "Maya Chen", column: "To do" },
  { id: "a2", title: "Assign owners to the two unowned workflow steps", owner: "Jon Bell", column: "To do" },
  { id: "a3", title: "Review pinned accounts in the data view", owner: "Leila Rao", column: "Doing" },
  { id: "a4", title: "Publish operating model whiteboard to the workspace", owner: "Alex Morgan", column: "Doing" },
  { id: "a5", title: "Archive the completed pilot retrospective", owner: "Priya Shah", column: "Done" },
];

export const collaborativePresence: RoomParticipant[] = [
  { id: "maya", name: "Maya Chen", role: "Operations lead", kind: "person", status: "Active", initials: "MC" },
  { id: "leila", name: "Leila Rao", role: "Customer operations", kind: "person", status: "Active", initials: "LR" },
  { id: "jon", name: "Jon Bell", role: "Finance partner", kind: "person", status: "Available", initials: "JB" },
  { id: "scribe", name: "Scribe agent", role: "Document drafting", kind: "agent", status: "Working", initials: "SC" },
  { id: "analyst", name: "Analyst agent", role: "Data grounding", kind: "agent", status: "Working", initials: "AN" },
];

export const initialCollabMessages: RoomMessage[] = [
  { id: "c1", author: "Scribe agent", initials: "SC", kind: "agent", text: "I drafted the executive summary for the renewal-risk brief from the linked account workspaces.", time: "10:02" },
  { id: "c2", author: "Maya Chen", initials: "MC", kind: "person", text: "Good. Leila, can you sanity-check the response section against the queue?", time: "10:04" },
  { id: "c3", author: "Analyst agent", initials: "AN", kind: "agent", text: "The data view confirms health improved 6 points after the inventory transfer executed.", time: "10:05" },
];
