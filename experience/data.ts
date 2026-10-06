import { BarChart3, BriefcaseBusiness, CircleDollarSign, Factory, Users } from "lucide-react";

export type EnterpriseDomain = "executive" | "revenue" | "operations" | "finance" | "people";

export const domainOrder: EnterpriseDomain[] = ["executive", "revenue", "operations", "finance", "people"];

export const enterpriseData = {
  executive: {
    label: "Executive", icon: BriefcaseBusiness, headline: "Protect the quarter while building next year's growth engine.",
    metric: "$18.4M", metricLabel: "Forecast revenue", delta: "+8.2% vs plan", health: 82,
    priorities: [
      { title: "Finalize EMEA expansion", owner: "Maya Chen", status: "On track", progress: 72 },
      { title: "Recover enterprise pipeline", owner: "Jon Bell", status: "Needs review", progress: 48 },
      { title: "Reduce fulfillment cost", owner: "Operations AI", status: "At risk", progress: 34 },
    ],
    signals: ["Renewal risk concentrated in 3 accounts", "West Coast demand running 14% above plan", "Hiring plan can absorb a 6-week delay"],
    decision: { title: "Shift $420K into enterprise expansion", detail: "Expected 3.1× pipeline return within two quarters.", due: "Review by 4:00 PM" },
    prompt: "Brief me on the most important executive decision today.",
  },
  revenue: {
    label: "Revenue", icon: BarChart3, headline: "Convert late-stage demand without increasing discount exposure.",
    metric: "$6.8M", metricLabel: "Qualified pipeline", delta: "+12.6% this month", health: 76,
    priorities: [
      { title: "Close Northstar renewal", owner: "Leah Park", status: "Needs review", progress: 84 },
      { title: "Launch healthcare sequence", owner: "Growth Agent", status: "On track", progress: 63 },
      { title: "Repair mid-market conversion", owner: "Revenue Ops", status: "At risk", progress: 41 },
    ],
    signals: ["Legal review is the top late-stage blocker", "Expansion intent detected across 11 accounts", "Discounting rose 2.4 points week over week"],
    decision: { title: "Approve Northstar pricing exception", detail: "Protects $940K ARR with a 24-month commitment.", due: "Client waiting" },
    prompt: "Where should the revenue team focus this week?",
  },
  operations: {
    label: "Operations", icon: Factory, headline: "Rebalance capacity before demand peaks in the western region.",
    metric: "96.2%", metricLabel: "Orders on time", delta: "+1.8 pts this week", health: 91,
    priorities: [
      { title: "Re-route western inventory", owner: "Supply Agent", status: "On track", progress: 88 },
      { title: "Resolve Dallas carrier gap", owner: "Omar Reed", status: "At risk", progress: 32 },
      { title: "Automate exception triage", owner: "Workflow AI", status: "On track", progress: 67 },
    ],
    signals: ["Dallas capacity drops below threshold Friday", "Port lead times improved by 1.6 days", "Automation prevented 42 late orders today"],
    decision: { title: "Activate overflow carrier capacity", detail: "Adds $38K cost and protects $610K in orders.", due: "Decide in 2 hours" },
    prompt: "Summarize operational risk and recommend an action.",
  },
  finance: {
    label: "Finance", icon: CircleDollarSign, headline: "Preserve operating leverage while funding high-confidence growth.",
    metric: "22.8%", metricLabel: "Operating margin", delta: "+2.1 pts vs plan", health: 87,
    priorities: [
      { title: "Lock Q4 reforecast", owner: "Nina Shah", status: "On track", progress: 91 },
      { title: "Review vendor consolidation", owner: "Procurement AI", status: "Needs review", progress: 58 },
      { title: "Reconcile cloud variance", owner: "FinOps", status: "At risk", progress: 44 },
    ],
    signals: ["Software consolidation can save $184K annually", "Collections improved by 4.2 days", "Cloud spend variance is isolated to two teams"],
    decision: { title: "Consolidate three analytics vendors", detail: "Annual savings of $184K with 30-day migration.", due: "Review tomorrow" },
    prompt: "What is the highest-leverage finance decision right now?",
  },
  people: {
    label: "People", icon: Users, headline: "Build critical leadership capacity without slowing delivery.",
    metric: "91%", metricLabel: "Team health index", delta: "+4 pts this quarter", health: 91,
    priorities: [
      { title: "Fill VP, Customer Success", owner: "Talent Agent", status: "On track", progress: 76 },
      { title: "Retain platform leaders", owner: "Elena Moss", status: "Needs review", progress: 55 },
      { title: "Launch manager cohort", owner: "People Ops", status: "On track", progress: 69 },
    ],
    signals: ["Engineering engagement rose after team redesign", "Two critical roles have strong final slates", "Manager span risk remains in customer success"],
    decision: { title: "Approve leadership retention package", detail: "Covers four critical roles through the platform launch.", due: "Review this week" },
    prompt: "Give me a concise people and talent briefing.",
  },
} as const;

export const activity = [
  { actor: "Revenue Agent", action: "flagged a renewal risk", target: "Northstar Health", time: "2m" },
  { actor: "Maya Chen", action: "approved scenario", target: "EMEA expansion", time: "8m" },
  { actor: "Supply Agent", action: "rebalanced inventory", target: "Western region", time: "14m" },
  { actor: "Finance AI", action: "found annual savings", target: "$184K across vendors", time: "21m" },
];
