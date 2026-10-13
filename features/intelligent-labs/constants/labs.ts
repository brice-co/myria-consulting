export const LABS = [
  { id: "advisory", title: "Intelligent Advisory", audience: "Strategy, consulting and AI leadership", description: "Explore business challenges with specialized AI advisors." },
  { id: "lead-capture", title: "Intelligent Lead Capture", audience: "Sales, revenue and customer experience", description: "Experience conversational qualification and intelligent routing." },
  { id: "premortem", title: "Premortem Decision Lab", audience: "Executives and transformation leaders", description: "Anticipate project failure modes before committing resources." },
  { id: "revenue", title: "Collaborative Revenue", audience: "Commercial and finance teams", description: "Investigate performance, scenarios and opportunities together." },
  { id: "ml-data", title: "ML & Data Intelligence", audience: "Data scientists and AI engineers", description: "Connect Python/ML analysis with business decision workflows." },
  { id: "support", title: "Customer Support Intelligence", audience: "Support and operations teams", description: "Explore knowledge retrieval, escalation and human handoffs." },
] as const;

export type LabId = (typeof LABS)[number]["id"];
export const LAB_IDS = LABS.map((lab) => lab.id) as [LabId, ...LabId[]];
