import type { Agent, Message, ScenarioId, SharedInsight, ToolEvent } from "../types/conversation";

export const agents: Agent[] = [
  { id: "orchestrator", name: "Myria", role: "Lead Orchestrator", initials: "MY", specialty: "Coordinates context, people and agents" },
  { id: "revenue", name: "Avery", role: "Revenue Agent", initials: "RA", specialty: "Qualification, opportunity and follow-up" },
  { id: "customer", name: "Sofia", role: "Customer Agent", initials: "CX", specialty: "Customer history, needs and experience" },
  { id: "operations", name: "Noah", role: "Operations Agent", initials: "OP", specialty: "Feasibility, inventory and fulfillment" },
];

export const participants = [
  { name: "Maria Ellison", role: "Customer", initials: "ME" },
  { name: "Alex Chen", role: "Account Executive", initials: "AC" },
  { name: "Myria", role: "AI Orchestrator", initials: "MY" },
];

export const scenarios: Record<ScenarioId, { label: string; prompt: string; messages: Message[]; insights: SharedInsight[]; tools: ToolEvent[] }> = {
  expansion: {
    label: "Customer expansion",
    prompt: "We are opening two new warehouses and want to extend our current pricing and service model.",
    messages: [
      { id: "e1", author: "Maria Ellison", role: "customer", text: "We are opening two new warehouses. Can we extend our current pricing and service model?", time: "10:21" },
      { id: "e2", author: "Myria", role: "agent", agentId: "orchestrator", text: "Absolutely. I’ve brought Revenue and Operations into the conversation so we can check commercial fit and delivery capacity together.", time: "10:21" },
      { id: "e3", author: "Avery · Revenue", role: "agent", agentId: "revenue", text: "This account is in a strong renewal window. Expansion could add roughly $96K in annual value based on current volume.", time: "10:22" },
      { id: "e4", author: "Noah · Operations", role: "agent", agentId: "operations", text: "Capacity looks feasible. I found one delivery-zone constraint that should be reviewed before we commit.", time: "10:22" },
    ],
    insights: [
      { label: "Intent", value: "Expansion", tone: "positive" },
      { label: "Estimated value", value: "$96K ARR", tone: "positive" },
      { label: "Account health", value: "86 · Strong" },
      { label: "Operational constraint", value: "1 to review", tone: "attention" },
    ],
    tools: [
      { id: "crm", label: "CRM context", detail: "Account + renewal history loaded", status: "complete" },
      { id: "inventory", label: "Operations check", detail: "Capacity and zones evaluated", status: "complete" },
      { id: "proposal", label: "Proposal workspace", detail: "Ready to create", status: "ready" },
    ],
  },
  service: {
    label: "Service recovery",
    prompt: "Our last two deliveries arrived late and I need this fixed before our next rollout.",
    messages: [
      { id: "s1", author: "Maria Ellison", role: "customer", text: "Our last two deliveries arrived late. I need this fixed before our next rollout.", time: "10:31" },
      { id: "s2", author: "Myria", role: "agent", agentId: "orchestrator", text: "I’m pulling the service history and asking Customer and Operations to investigate the pattern together.", time: "10:31" },
      { id: "s3", author: "Sofia · Customer", role: "agent", agentId: "customer", text: "Two SLA misses occurred in 30 days. Sentiment has shifted from positive to at-risk, so I recommend proactive outreach today.", time: "10:32" },
      { id: "s4", author: "Noah · Operations", role: "agent", agentId: "operations", text: "Both delays trace to the same carrier handoff. An alternate route is available for the next rollout.", time: "10:32" },
    ],
    insights: [
      { label: "Intent", value: "Service recovery", tone: "attention" },
      { label: "SLA misses", value: "2 in 30 days", tone: "attention" },
      { label: "Customer risk", value: "At-risk", tone: "attention" },
      { label: "Resolution", value: "Alternate route found", tone: "positive" },
    ],
    tools: [
      { id: "history", label: "Service history", detail: "Incidents correlated", status: "complete" },
      { id: "routing", label: "Route analysis", detail: "Alternative found", status: "complete" },
      { id: "case", label: "Recovery plan", detail: "Ready for approval", status: "ready" },
    ],
  },
  order: {
    label: "Order exception",
    prompt: "Order 18422 is at risk. Can you tell me what happened and what we can do?",
    messages: [
      { id: "o1", author: "Alex Chen", role: "human", text: "Order 18422 is at risk. What happened and what can we do?", time: "10:42" },
      { id: "o2", author: "Myria", role: "agent", agentId: "orchestrator", text: "I’m connecting the customer commitment with the operational exception before recommending an action.", time: "10:42" },
      { id: "o3", author: "Noah · Operations", role: "agent", agentId: "operations", text: "A supplier delay affects one line item. The rest can ship now, or inventory can be rebalanced from another branch.", time: "10:43" },
      { id: "o4", author: "Sofia · Customer", role: "agent", agentId: "customer", text: "This customer values delivery certainty over split shipments. Rebalancing is the better experience despite a small transfer cost.", time: "10:43" },
    ],
    insights: [
      { label: "Exception", value: "Supplier delay", tone: "attention" },
      { label: "Customer priority", value: "Delivery certainty" },
      { label: "Best option", value: "Rebalance inventory", tone: "positive" },
      { label: "Approval", value: "Human required", tone: "attention" },
    ],
    tools: [
      { id: "order", label: "Order lookup", detail: "Order 18422 loaded", status: "complete" },
      { id: "stock", label: "Inventory search", detail: "Alternate branch available", status: "complete" },
      { id: "transfer", label: "Create transfer", detail: "Awaiting approval", status: "ready" },
    ],
  },
};
