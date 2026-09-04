import type { AdvisoryPhase, CapturedInsight } from "./types";

export const SESSION_MODE: "demo" | "full" = "demo";
export const DEMO_SESSION_DURATION_MS = 3 * 60 * 1000;
export const FULL_SESSION_DURATION_MS = 90 * 60 * 1000;
export const IDLE_TIMEOUT_MS = 45 * 1000;
export const IDLE_WARNING_MS = 15 * 1000;

export const SESSION_DURATION_MS = SESSION_MODE === "demo" ? DEMO_SESSION_DURATION_MS : FULL_SESSION_DURATION_MS;

export const ADVISORY_PHASES: AdvisoryPhase[] = [
  { id: "discovery", title: "Business discovery", shortTitle: "Discovery", range: "0–10 min", startMinute: 0, endMinute: 10, description: "Understand the business, goals, customers, constraints, and desired outcomes." },
  { id: "workflow", title: "Current workflow analysis", shortTitle: "Workflow", range: "10–30 min", startMinute: 10, endMinute: 30, description: "Identify how work happens today, where decisions occur, and where friction accumulates." },
  { id: "opportunities", title: "AI opportunity mapping", shortTitle: "Opportunities", range: "30–55 min", startMinute: 30, endMinute: 55, description: "Map high-value AI opportunities against business impact, feasibility, and readiness." },
  { id: "architecture", title: "Architecture recommendations", shortTitle: "Architecture", range: "55–75 min", startMinute: 55, endMinute: 75, description: "Shape the agent, data, integration, governance, and human-oversight architecture." },
  { id: "roadmap", title: "Implementation roadmap", shortTitle: "Roadmap", range: "75–85 min", startMinute: 75, endMinute: 85, description: "Define the MVP, sequencing, owners, dependencies, and next decisions." },
  { id: "summary", title: "Summary & next steps", shortTitle: "Summary", range: "85–90 min", startMinute: 85, endMinute: 90, description: "Summarize the recommendation, unresolved questions, and immediate next steps." },
];

export const INITIAL_CAPTURED_INSIGHTS: CapturedInsight[] = [
  { id: "business", label: "Business overview", captured: false },
  { id: "goals", label: "Key goals", captured: false },
  { id: "workflow", label: "Current workflow", captured: false },
  { id: "challenges", label: "Current challenges", captured: false },
  { id: "opportunities", label: "AI opportunities", captured: false },
  { id: "next-steps", label: "Next steps", captured: false },
];
