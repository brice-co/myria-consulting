export type Message = {
  from: "customer" | "agent";
  author: string;
  time: string;
  text: string;
  channel: "Email" | "Chat" | "Phone";
};

export type Insight = {
  label: string;
  detail: string;
  tone: "opportunity" | "risk" | "neutral";
  confidence: number;
};

export type JourneyStep = {
  stage: string;
  detail: string;
  date: string;
  status: "done" | "current" | "upcoming";
};

export type Customer = {
  id: string;
  name: string;
  company: string;
  role: string;
  initials: string;
  tier: string;
  health: number;
  healthLabel: string;
  lifetimeValue: string;
  openDeals: string;
  lastContact: string;
  sentiment: string;
  tags: string[];
  spark: number[];
  messages: Message[];
  insights: Insight[];
  nextActions: string[];
  journey: JourneyStep[];
};

export const customers: Customer[] = [
  {
    id: "mara",
    name: "Mara Ellison",
    company: "Northwind Traders",
    role: "Head of Procurement",
    initials: "ME",
    tier: "Enterprise",
    health: 86,
    healthLabel: "Strong",
    lifetimeValue: "$284k",
    openDeals: "2 · $96k",
    lastContact: "2 hours ago",
    sentiment: "Positive",
    tags: ["Renewal Q4", "Multi-site", "Advocate"],
    spark: [42, 48, 45, 56, 61, 58, 70, 76, 74, 86],
    messages: [
      {
        from: "customer",
        author: "Mara Ellison",
        time: "09:41",
        channel: "Email",
        text: "Hi team — the Denver rollout went smoothly. Can we talk about extending the same pricing to our two new warehouses?",
      },
      {
        from: "agent",
        author: "You",
        time: "09:52",
        channel: "Email",
        text: "Great to hear, Mara. Absolutely — I pulled your current volume tiers and there's room to consolidate. Drafting a proposal now.",
      },
      {
        from: "customer",
        author: "Mara Ellison",
        time: "10:07",
        channel: "Chat",
        text: "Perfect. Also, finance asked about consolidated invoicing across sites — is that supported?",
      },
      {
        from: "agent",
        author: "You",
        time: "10:09",
        channel: "Chat",
        text: "Yes — consolidated monthly invoicing is available on your tier. I'll include it in the proposal with a breakdown by site.",
      },
    ],
    insights: [
      {
        label: "Expansion signal",
        detail: "Two new warehouses mentioned 3× across threads. Expansion deal likelihood is high.",
        tone: "opportunity",
        confidence: 92,
      },
      {
        label: "Renewal window",
        detail: "Contract renews in 74 days. Best outreach window opens next week.",
        tone: "neutral",
        confidence: 88,
      },
      {
        label: "Billing friction",
        detail: "Invoicing questions recur — unresolved billing friction is the top churn predictor here.",
        tone: "risk",
        confidence: 71,
      },
    ],
    nextActions: [
      "Send expansion proposal with volume tiers",
      "Enable consolidated invoicing before renewal",
      "Schedule QBR with finance stakeholder",
    ],
    journey: [
      { stage: "Onboarding", detail: "3 sites activated", date: "Jan 2025", status: "done" },
      { stage: "First value", detail: "Rollout completed", date: "Mar 2025", status: "done" },
      { stage: "Adoption", detail: "94% weekly active", date: "Jun 2025", status: "done" },
      { stage: "Expansion", detail: "2 new warehouses", date: "Now", status: "current" },
      { stage: "Renewal", detail: "Q4 contract", date: "Dec 2025", status: "upcoming" },
    ],
  },
  {
    id: "devon",
    name: "Devon Okafor",
    company: "Bluefin Logistics",
    role: "Operations Director",
    initials: "DO",
    tier: "Growth",
    health: 54,
    healthLabel: "At risk",
    lifetimeValue: "$112k",
    openDeals: "1 · $34k",
    lastContact: "3 days ago",
    sentiment: "Mixed",
    tags: ["Support-heavy", "Single-site"],
    spark: [64, 68, 62, 58, 60, 52, 49, 55, 50, 54],
    messages: [
      {
        from: "customer",
        author: "Devon Okafor",
        time: "Mon",
        channel: "Phone",
        text: "The routing export failed twice last week. My team lost half a day reconciling manually.",
      },
      {
        from: "agent",
        author: "You",
        time: "Mon",
        channel: "Phone",
        text: "I'm sorry, Devon. Engineering shipped a fix Thursday and I've credited the affected period to your account.",
      },
      {
        from: "customer",
        author: "Devon Okafor",
        time: "Wed",
        channel: "Email",
        text: "Credit received, thanks. I'd like to see the incident report before we discuss the fleet add-on.",
      },
    ],
    insights: [
      {
        label: "Churn risk",
        detail: "Two export failures followed by 40% usage drop. Sentiment trending negative for 3 weeks.",
        tone: "risk",
        confidence: 84,
      },
      {
        label: "Recovery opening",
        detail: "Credit was accepted positively — trust-recovery actions now have outsized impact.",
        tone: "opportunity",
        confidence: 77,
      },
      {
        label: "Stalled deal",
        detail: "Fleet add-on paused pending incident report. Unblocking it recovers the expansion path.",
        tone: "neutral",
        confidence: 81,
      },
    ],
    nextActions: [
      "Send incident report with remediation timeline",
      "Offer 30-day routing stability review",
      "Re-open fleet add-on conversation next week",
    ],
    journey: [
      { stage: "Onboarding", detail: "1 site activated", date: "Aug 2024", status: "done" },
      { stage: "First value", detail: "Routing live", date: "Oct 2024", status: "done" },
      { stage: "Adoption", detail: "Usage declining", date: "Now", status: "current" },
      { stage: "Expansion", detail: "Fleet add-on paused", date: "Pending", status: "upcoming" },
      { stage: "Renewal", detail: "Q1 contract", date: "Feb 2026", status: "upcoming" },
    ],
  },
  {
    id: "ingrid",
    name: "Ingrid Sørensen",
    company: "Fjord & Co",
    role: "COO",
    initials: "IS",
    tier: "Enterprise",
    health: 93,
    healthLabel: "Champion",
    lifetimeValue: "$391k",
    openDeals: "3 · $148k",
    lastContact: "26 minutes ago",
    sentiment: "Very positive",
    tags: ["Champion", "Referral source", "EU rollout"],
    spark: [55, 60, 66, 64, 72, 78, 82, 85, 90, 93],
    messages: [
      {
        from: "customer",
        author: "Ingrid Sørensen",
        time: "08:15",
        channel: "Chat",
        text: "Our board approved the EU expansion. We want you in the room for the Copenhagen planning session.",
      },
      {
        from: "agent",
        author: "You",
        time: "08:22",
        channel: "Chat",
        text: "Congratulations, Ingrid! I'll bring our solutions architect and a phased rollout plan for the Nordic sites.",
      },
      {
        from: "customer",
        author: "Ingrid Sørensen",
        time: "08:31",
        channel: "Chat",
        text: "Also — I referred you to Henrik at Vestmar Shipping. Expect an intro email today.",
      },
    ],
    insights: [
      {
        label: "Champion behavior",
        detail: "Actively referring peers and inviting you to strategic planning. Ideal case-study candidate.",
        tone: "opportunity",
        confidence: 95,
      },
      {
        label: "EU expansion",
        detail: "Board-approved expansion creates a 6-figure pipeline across 4 Nordic sites.",
        tone: "opportunity",
        confidence: 90,
      },
      {
        label: "Dependency risk",
        detail: "Relationship concentrated in one champion. Build secondary executive sponsor.",
        tone: "risk",
        confidence: 64,
      },
    ],
    nextActions: [
      "Confirm Copenhagen session agenda",
      "Follow up on Vestmar Shipping referral",
      "Identify a second executive sponsor",
    ],
    journey: [
      { stage: "Onboarding", detail: "6 sites activated", date: "Mar 2024", status: "done" },
      { stage: "First value", detail: "Full rollout", date: "May 2024", status: "done" },
      { stage: "Adoption", detail: "98% weekly active", date: "Sep 2024", status: "done" },
      { stage: "Advocacy", detail: "2 referrals sent", date: "Now", status: "current" },
      { stage: "EU Expansion", detail: "4 Nordic sites", date: "Q1 2026", status: "upcoming" },
    ],
  },
];
