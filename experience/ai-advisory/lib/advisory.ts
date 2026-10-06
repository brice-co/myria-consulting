export type AdvisorId = "lead" | "strategy" | "operations" | "data" | "people";
export type DiscoveryPhase = "Frame" | "Discover" | "Analyze" | "Decide";

export type Advisor = { id: AdvisorId; name: string; initials: string; focus: string; framework: string };
export type AdvisorInsight = { id: string; advisor: AdvisorId; phase: DiscoveryPhase; text: string };
export type Opportunity = { id: string; title: string; advisor: AdvisorId; impact: number; effort: number; rationale: string };
export type DecisionBrief = { id: string; title: string; createdAt: string; phase: DiscoveryPhase; opportunities: Opportunity[]; evidence: AdvisorInsight[]; summary: string };

export const advisors: Advisor[] = [
  { id: "lead", name: "Lead advisor", initials: "LA", focus: "Orchestrates the session and synthesizes perspectives", framework: "Issue tree + hypothesis-driven" },
  { id: "strategy", name: "Strategy advisor", initials: "ST", focus: "Market position, growth options and trade-offs", framework: "Where to play / how to win" },
  { id: "operations", name: "Operations advisor", initials: "OP", focus: "Process flow, capacity and cost to serve", framework: "Value stream mapping" },
  { id: "data", name: "AI & Data advisor", initials: "AD", focus: "Data readiness, AI use cases and governance", framework: "Use-case value vs. feasibility" },
  { id: "people", name: "People & Change advisor", initials: "PC", focus: "Roles, adoption and organizational readiness", framework: "Change readiness assessment" },
];

export const advisoryProblem = {
  title: "Mid-market margin erosion",
  statement: "Gross margin in the mid-market segment fell 4 points in three quarters while volume grew. Leadership wants to know why and what to do next.",
};

export const phases: DiscoveryPhase[] = ["Frame", "Discover", "Analyze", "Decide"];

export const phasePrompts: Record<DiscoveryPhase, string> = {
  Frame: "What exactly is the question we need to answer?",
  Discover: "What do we observe across the business?",
  Analyze: "What is driving the pattern?",
  Decide: "Which moves should we commit to?",
};

export const advisorContributions: Record<DiscoveryPhase, Partial<Record<AdvisorId, string>>> = {
  Frame: {
    lead: "Proposed framing: is the erosion driven by price, mix, or cost to serve? We'll test each branch.",
    strategy: "Check whether competitors repositioned mid-market pricing in the same period.",
    operations: "Volume growth may be adding complexity cost that isn't visible in unit pricing.",
    data: "Margin data exists at order level; customer-level cost allocation is incomplete.",
    people: "Sales incentives reward volume, not margin — a likely behavioral factor.",
  },
  Discover: {
    lead: "Three signals are converging: discount depth, small-order growth and service tickets.",
    strategy: "Average discount rose from 11% to 17%, concentrated in renewals.",
    operations: "Orders under $2k grew 38% and carry roughly 2.4x fulfilment cost per dollar.",
    data: "Service tickets per account are 60% higher for accounts onboarded in the last year.",
    people: "Account managers report no guidance on when to push back on discounts.",
  },
  Analyze: {
    lead: "Roughly half the erosion traces to discounting, a third to small-order cost, the rest to service load.",
    strategy: "Discounts are defensive, not competitive — win rates did not change.",
    operations: "A minimum order policy plus consolidated shipping recovers most of the small-order gap.",
    data: "A discount recommendation model is feasible with current CRM and order data.",
    people: "Adoption risk is moderate; managers want guardrails, not rigid rules.",
  },
  Decide: {
    lead: "Recommend three moves in sequence: discount guardrails, order consolidation, onboarding redesign.",
    strategy: "Start with guardrails — fastest margin impact with low customer risk.",
    operations: "Pilot order consolidation with two regions over one quarter.",
    data: "Launch AI discount guidance as advisory first, with human approval.",
    people: "Pair the change with a margin component in sales incentives.",
  },
};

export const initialInsights: AdvisorInsight[] = [
  { id: "i0", advisor: "lead", phase: "Frame", text: "Erosion is segment-specific — enterprise margin is flat." },
];

export const opportunities: Opportunity[] = [
  { id: "o1", title: "AI discount guardrails", advisor: "data", impact: 85, effort: 35, rationale: "A recommendation model trained on order history flags discounts below the margin floor before approval — advisory first, human-approved." },
  { id: "o2", title: "Order consolidation pilot", advisor: "operations", impact: 58, effort: 32, rationale: "Consolidating sub-$2k orders into weekly shipments in two pilot regions recovers most of the 2.4x fulfilment cost gap." },
  { id: "o3", title: "Margin-weighted incentives", advisor: "people", impact: 74, effort: 62, rationale: "Shifting 20% of variable compensation to margin aligns deal-making with profitability without removing volume rewards." },
  { id: "o4", title: "Onboarding redesign", advisor: "operations", impact: 50, effort: 70, rationale: "A structured first-90-day onboarding program reduces the 60% higher service load seen on recently onboarded accounts." },
  { id: "o5", title: "Mid-market value packaging", advisor: "strategy", impact: 75, effort: 80, rationale: "Repackaging mid-market offers around outcomes defends price without discounting, but requires repositioning and sales enablement." },
];
