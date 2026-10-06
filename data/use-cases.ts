import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  FileText,
  Headphones,
  Network,
  ReceiptText,
  Search,
  ShoppingCart,
  Sparkles,
  UserRoundPlus,
  Workflow,
} from "lucide-react";

export type UseCaseSlug =
  | "support"
  | "sales"
  | "booking"
  | "onboarding"
  | "proposals"
  | "invoices"
  | "operations"
  | "research"
  | "ecommerce";

export type UseCase = {
  slug: UseCaseSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  statement: string;
  description: string;
  icon: LucideIcon;
  challenge: string[];
  decisions: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  flow: { step: string; title: string; description: string }[];
  outcomes: string[];
  advisoryQuestions: string[];
};

export const useCases: UseCase[] = [
  {
    slug: "support",
    title: "Customer Support Intelligence",
    shortTitle: "Customer Support",
    eyebrow: "Customer experience",
    statement: "Resolve more customer needs without losing the human judgment that complex situations require.",
    description: "Myria helps organizations redesign support around the decisions behind every interaction: what the customer needs, what can be resolved automatically, what requires investigation, and when a human specialist should take over.",
    icon: Headphones,
    challenge: ["High volumes of repetitive requests consume specialist capacity.", "Customers repeat context as they move between channels or teams.", "Escalations often happen too late, too early, or without the information needed to act.", "Service leaders need better visibility into recurring issues and their operational causes."],
    decisions: [
      { title: "Understand the request", description: "Identify intent, customer context, urgency and the information required to proceed." },
      { title: "Resolve or investigate", description: "Determine whether the request can be completed directly or requires additional data and validation." },
      { title: "Escalate intelligently", description: "Route exceptions to the right specialist with the context already assembled." },
      { title: "Learn from demand", description: "Turn recurring contacts into signals for process, product and policy improvement." },
    ],
    capabilities: [
      { title: "Conversational intake", description: "Voice or text interfaces capture the issue naturally and structure the information behind it." },
      { title: "Knowledge-grounded resolution", description: "Agents retrieve approved policies, product information and customer context before acting." },
      { title: "Tool execution", description: "Approved actions can update tickets, retrieve status, create cases or trigger workflows." },
      { title: "Human handoff", description: "Complex or sensitive situations transfer with a concise case summary and evidence." },
    ],
    flow: [
      { step: "01", title: "Listen", description: "Capture the customer need and relevant context." },
      { step: "02", title: "Investigate", description: "Retrieve knowledge, account data and operational status." },
      { step: "03", title: "Decide & act", description: "Resolve the request or execute an approved workflow." },
      { step: "04", title: "Escalate & learn", description: "Hand off exceptions and surface recurring patterns." },
    ],
    outcomes: ["Lower avoidable support effort", "Faster resolution of routine requests", "Better specialist focus on complex cases", "More consistent service decisions", "A clearer view of root causes behind customer demand"],
    advisoryQuestions: ["Which support decisions are repetitive enough to automate?", "Which actions require human approval or specialist judgment?", "What systems and knowledge sources must the agent access?", "How should quality, escalation and customer risk be governed?"],
  },
  {
    slug: "sales",
    title: "Sales & Lead Qualification",
    shortTitle: "Sales",
    eyebrow: "Revenue growth",
    statement: "Respond to demand faster, qualify consistently, and move the right opportunities to people at the right moment.",
    description: "Myria designs AI-enabled sales workflows around qualification, prioritization, follow-up and handoff—not simply automated outreach. The objective is to improve the flow of qualified opportunities while preserving the relationship work where people create the most value.",
    icon: Sparkles,
    challenge: ["Inbound leads wait too long for a meaningful response.", "Qualification quality varies by rep, channel and workload.", "Sales teams spend time on low-fit opportunities and repetitive follow-up.", "CRM data is often incomplete when opportunities are handed to sellers."],
    decisions: [
      { title: "Is this opportunity relevant?", description: "Evaluate fit, need, timing and buying context against explicit qualification criteria." },
      { title: "What should happen next?", description: "Choose the right follow-up, content, specialist or meeting path." },
      { title: "When should a human engage?", description: "Escalate high-value, complex or strategically important opportunities." },
      { title: "What belongs in the CRM?", description: "Capture structured context, qualification evidence and next actions." },
    ],
    capabilities: [
      { title: "Conversational lead capture", description: "Engage prospects through voice or text while collecting structured qualification information." },
      { title: "Qualification logic", description: "Combine business rules, account context and conversation signals to guide next steps." },
      { title: "CRM tools", description: "Create or update leads, activities, notes and follow-up actions through governed tools." },
      { title: "Specialist handoff", description: "Transfer qualified opportunities with a concise brief instead of a raw transcript." },
    ],
    flow: [
      { step: "01", title: "Engage", description: "Respond when the prospect is ready to talk." },
      { step: "02", title: "Qualify", description: "Understand need, fit, urgency and decision context." },
      { step: "03", title: "Route", description: "Choose nurture, specialist handoff or booking." },
      { step: "04", title: "Equip", description: "Give the seller a structured opportunity brief and next step." },
    ],
    outcomes: ["Faster response to inbound demand", "More consistent qualification", "Better seller focus", "Cleaner CRM context", "More disciplined handoffs and follow-up"],
    advisoryQuestions: ["What makes a lead qualified for your business?", "Which signals should change priority or routing?", "What can the agent do directly in the CRM?", "Where must a seller remain in control?"],
  },
  {
    slug: "booking",
    title: "Intelligent Booking & Scheduling",
    shortTitle: "Smart Booking",
    eyebrow: "Customer operations",
    statement: "Turn scheduling from an administrative exchange into a context-aware service workflow.",
    description: "Myria connects conversational booking with availability, business rules, customer context, reminders and exception handling so scheduling becomes part of the operating process rather than a disconnected calendar task.",
    icon: CalendarDays,
    challenge: ["Scheduling consumes staff time across calls, email and rescheduling.", "Availability rules are more complex than a simple open calendar slot.", "Cancellations and exceptions create avoidable coordination work.", "Customers expect immediate confirmation and clear next steps."],
    decisions: [
      { title: "What is being scheduled?", description: "Understand service type, duration, location, participant and prerequisites." },
      { title: "Which slot is actually valid?", description: "Apply availability, capacity and business rules before presenting options." },
      { title: "What exceptions matter?", description: "Recognize cases requiring approval, priority handling or specialist coordination." },
      { title: "What happens after booking?", description: "Trigger confirmation, preparation, reminders and rescheduling workflows." },
    ],
    capabilities: [
      { title: "Natural-language scheduling", description: "Customers express needs conversationally instead of navigating rigid forms." },
      { title: "Calendar & capacity tools", description: "Check real-time availability through governed integrations." },
      { title: "Rules & exception layer", description: "Apply service-specific constraints before committing a booking." },
      { title: "Lifecycle automation", description: "Coordinate confirmations, reminders, changes and downstream tasks." },
    ],
    flow: [
      { step: "01", title: "Understand", description: "Capture the service need and constraints." },
      { step: "02", title: "Check", description: "Evaluate availability and business rules." },
      { step: "03", title: "Commit", description: "Create the booking and confirm details." },
      { step: "04", title: "Coordinate", description: "Manage reminders, changes and exceptions." },
    ],
    outcomes: ["Less scheduling administration", "Faster customer confirmation", "Better use of available capacity", "More consistent booking rules", "Fewer manual handoffs around changes"],
    advisoryQuestions: ["What rules make a slot truly bookable?", "Which systems own availability and customer context?", "Which booking exceptions require approval?", "What downstream work should a confirmed booking trigger?"],
  },
  {
    slug: "onboarding",
    title: "Guided Onboarding & Adoption",
    shortTitle: "Onboarding",
    eyebrow: "People & change",
    statement: "Give people guidance in the moment they need it—and turn onboarding into measurable adoption.",
    description: "Myria uses conversational guidance, role-based knowledge and progress signals to support employee, client or user onboarding while preserving human coaching for judgment, culture and complex learning needs.",
    icon: UserRoundPlus,
    challenge: ["New users receive too much information before they need it.", "Managers and support teams repeatedly answer the same onboarding questions.", "Completion does not necessarily mean adoption or confidence.", "Different roles require different paths, examples and support."],
    decisions: [
      { title: "What does this person need now?", description: "Adapt guidance to role, stage, task and demonstrated understanding." },
      { title: "Can the question be answered safely?", description: "Use approved knowledge and escalate policy or judgment-sensitive questions." },
      { title: "Is progress real?", description: "Distinguish completion from demonstrated readiness and adoption." },
      { title: "Where is intervention needed?", description: "Surface friction, repeated questions and cohorts that need human support." },
    ],
    capabilities: [
      { title: "Conversational guide", description: "Provide contextual answers and task guidance through voice or text." },
      { title: "Role-aware knowledge", description: "Retrieve the right policies, procedures and examples for each audience." },
      { title: "Progress signals", description: "Track milestones, questions and friction points rather than only course completion." },
      { title: "Human coaching handoff", description: "Escalate ambiguity, performance concerns or sensitive topics to people." },
    ],
    flow: [
      { step: "01", title: "Orient", description: "Clarify role, objectives and immediate priorities." },
      { step: "02", title: "Guide", description: "Support tasks and questions in context." },
      { step: "03", title: "Validate", description: "Check understanding and readiness." },
      { step: "04", title: "Reinforce", description: "Target coaching and support where adoption is weak." },
    ],
    outcomes: ["Faster path to productive use", "Less repetitive support", "More personalized learning", "Better visibility into adoption barriers", "Stronger connection between training and work"],
    advisoryQuestions: ["What does successful adoption look like by role?", "Which knowledge is authoritative?", "What should trigger human coaching?", "Which behavioral signals should be measured after onboarding?"],
  },
  {
    slug: "proposals",
    title: "Proposal & Commercial Response Intelligence",
    shortTitle: "Proposals",
    eyebrow: "Commercial operations",
    statement: "Move from scattered inputs to a governed commercial response without turning proposal work into generic content generation.",
    description: "Myria structures proposal creation around opportunity context, approved capabilities, pricing inputs, risk review and decision rights so AI accelerates the work while the business retains control of commitments.",
    icon: FileText,
    challenge: ["Teams repeatedly search for approved content and prior examples.", "Opportunity context gets lost between sales, delivery and subject-matter experts.", "Pricing and commitments require controls that generic generation cannot provide.", "Review cycles become the bottleneck as deadlines approach."],
    decisions: [
      { title: "What does the client actually need?", description: "Translate opportunity context and requirements into a response structure." },
      { title: "What can we credibly commit to?", description: "Ground claims in approved capabilities, evidence and delivery constraints." },
      { title: "What requires review?", description: "Route pricing, legal, risk and non-standard commitments to accountable owners." },
      { title: "What is ready to send?", description: "Validate completeness, consistency and approvals before finalization." },
    ],
    capabilities: [
      { title: "Opportunity synthesis", description: "Turn CRM notes, discovery findings and requirements into a structured brief." },
      { title: "Approved content retrieval", description: "Reuse governed capabilities, credentials, cases and standard language." },
      { title: "Proposal orchestration", description: "Coordinate sections, contributors, dependencies and reviews." },
      { title: "Approval-aware generation", description: "Draft quickly while keeping commercial and risk decisions with accountable people." },
    ],
    flow: [
      { step: "01", title: "Frame", description: "Structure the opportunity and response requirements." },
      { step: "02", title: "Assemble", description: "Retrieve approved content and specialist inputs." },
      { step: "03", title: "Review", description: "Route exceptions, pricing and commitments." },
      { step: "04", title: "Finalize", description: "Produce the approved client response." },
    ],
    outcomes: ["Shorter proposal cycle time", "More consistent commercial messaging", "Better reuse of institutional knowledge", "Clearer approval controls", "Less coordination burden across contributors"],
    advisoryQuestions: ["Which proposal content is reusable and authoritative?", "Which commitments require approval?", "Where do pricing and delivery data originate?", "How should proposal quality and risk be measured?"],
  },
  {
    slug: "invoices",
    title: "Invoice & Receivables Intelligence",
    shortTitle: "Invoices",
    eyebrow: "Finance operations",
    statement: "Make billing exceptions visible earlier and focus people on the receivables decisions that actually require judgment.",
    description: "Myria helps redesign billing and receivables around invoice creation, validation, payment status, dispute investigation and collection prioritization—connecting AI to the systems and controls finance already depends on.",
    icon: ReceiptText,
    challenge: ["Billing errors and missing information create downstream collection work.", "Teams spend time checking status across disconnected systems.", "Payment reminders are often generic rather than context-aware.", "Disputes require manual investigation across orders, contracts and communications."],
    decisions: [
      { title: "Is the invoice ready?", description: "Validate required data, commercial terms and supporting evidence before issue." },
      { title: "What is blocking payment?", description: "Distinguish timing, process, dispute and data issues." },
      { title: "What action is appropriate?", description: "Choose reminder, investigation, correction, escalation or account-owner intervention." },
      { title: "Where is systemic leakage?", description: "Identify recurring causes of delayed payment and rework." },
    ],
    capabilities: [
      { title: "Invoice validation", description: "Check completeness and consistency against governed business rules." },
      { title: "Receivables investigation", description: "Assemble order, invoice, payment and communication context for exceptions." },
      { title: "Action orchestration", description: "Trigger reminders, tasks, case creation and approved updates." },
      { title: "Exception intelligence", description: "Cluster recurring dispute and delay patterns for process improvement." },
    ],
    flow: [
      { step: "01", title: "Validate", description: "Check invoice readiness before issue." },
      { step: "02", title: "Monitor", description: "Track payment state and exceptions." },
      { step: "03", title: "Investigate", description: "Assemble evidence behind delays or disputes." },
      { step: "04", title: "Act & improve", description: "Take the right action and feed recurring causes back into operations." },
    ],
    outcomes: ["Less billing rework", "Faster exception investigation", "More focused collections effort", "Better visibility into dispute causes", "Stronger connection between finance and upstream operations"],
    advisoryQuestions: ["Which billing errors are predictable before invoice issue?", "What evidence is needed to resolve common disputes?", "Which collection actions can be automated safely?", "What upstream process changes would remove recurring receivables friction?"],
  },
  {
    slug: "operations",
    title: "Operational Decision & Exception Orchestration",
    shortTitle: "Internal Operations",
    eyebrow: "Operations",
    statement: "Move operational teams from chasing status to managing the decisions and exceptions that determine performance.",
    description: "Myria maps the operational decisions inside workflows, identifies the exceptions that consume management attention, and designs agentic systems that investigate, recommend, coordinate and act within defined controls.",
    icon: Workflow,
    challenge: ["Work moves across functions through email, spreadsheets and manual follow-up.", "Managers spend time assembling context before they can make a decision.", "Exceptions are discovered late because signals live in different systems.", "Automation handles tasks but often stops where judgment and investigation begin."],
    decisions: [
      { title: "What changed?", description: "Detect the event, variance or exception that requires attention." },
      { title: "Why did it happen?", description: "Investigate data, dependencies and business context across systems." },
      { title: "What are the options?", description: "Generate feasible actions with constraints, trade-offs and impact." },
      { title: "Who decides and who acts?", description: "Apply decision rights, approvals and execution controls." },
    ],
    capabilities: [
      { title: "Event & exception detection", description: "Use system events and business rules to surface work that needs attention." },
      { title: "Cross-system investigation", description: "Agents retrieve operational context through narrow, governed tools." },
      { title: "Decision support", description: "Present options, evidence, constraints and recommended next actions." },
      { title: "Orchestrated execution", description: "Coordinate approved actions across systems, teams and workflows." },
    ],
    flow: [
      { step: "01", title: "Detect", description: "Identify the operational event or exception." },
      { step: "02", title: "Investigate", description: "Build the evidence and context required to decide." },
      { step: "03", title: "Decide", description: "Apply rules, judgment and approval boundaries." },
      { step: "04", title: "Execute & learn", description: "Coordinate action and capture the result." },
    ],
    outcomes: ["Faster exception resolution", "Less coordination overhead", "Better management visibility", "More consistent operational decisions", "A path from automation toward governed autonomous operations"],
    advisoryQuestions: ["Which decisions create the most delay or economic impact?", "What exceptions repeatedly require investigation?", "Which systems hold the evidence needed to decide?", "Where should the system recommend, request approval, or act autonomously?"],
  },
  {
    slug: "research",
    title: "Research & Decision Intelligence",
    shortTitle: "Research Intelligence",
    eyebrow: "Strategy & intelligence",
    statement: "Bring multiple specialist perspectives together without losing traceability, challenge or executive synthesis.",
    description: "Myria uses coordinated specialist agents to decompose research questions, gather evidence, challenge assumptions and synthesize findings into decision-ready material—with human review where evidence, interpretation or stakes require it.",
    icon: Search,
    challenge: ["Strategic research spans market, customer, operational, technical and financial questions.", "Teams lose time coordinating parallel work and reconciling inconsistent outputs.", "AI-generated research can sound confident without making evidence quality visible.", "Executives need implications and choices, not a larger pile of information."],
    decisions: [
      { title: "What must be known?", description: "Decompose the executive question into research tracks and evidence requirements." },
      { title: "What evidence is credible?", description: "Separate sourced facts, assumptions, estimates and interpretation." },
      { title: "Where do perspectives disagree?", description: "Surface conflicting signals rather than smoothing them into one answer." },
      { title: "What does this mean for the decision?", description: "Synthesize implications, uncertainties and choices for leadership." },
    ],
    capabilities: [
      { title: "Research orchestration", description: "A lead agent decomposes the question and coordinates specialist tracks." },
      { title: "Specialist agents", description: "Market, operational, technical or financial perspectives work in parallel." },
      { title: "Evidence discipline", description: "Findings retain source context, confidence and unresolved questions." },
      { title: "Executive synthesis", description: "Outputs converge into implications, options and next decisions." },
    ],
    flow: [
      { step: "01", title: "Frame", description: "Define the decision and evidence required." },
      { step: "02", title: "Decompose", description: "Assign specialist research tracks." },
      { step: "03", title: "Challenge", description: "Compare evidence, contradictions and uncertainty." },
      { step: "04", title: "Synthesize", description: "Translate research into decision-ready direction." },
    ],
    outcomes: ["Faster multi-perspective research", "Clearer evidence traceability", "Better visibility into uncertainty", "Less manual coordination", "More decision-oriented executive synthesis"],
    advisoryQuestions: ["What decision is the research meant to inform?", "Which specialist perspectives are required?", "What sources are acceptable for each claim?", "How should conflicting evidence and uncertainty be presented?"],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce Service & Revenue Orchestration",
    shortTitle: "E-Commerce",
    eyebrow: "Digital commerce",
    statement: "Connect product discovery, service, transactions and exceptions into one governed customer journey.",
    description: "Myria designs multi-agent commerce experiences where routing, product knowledge, account context, transaction tools and human escalation work together—so the experience can move from conversation to action without fragmenting across bots and systems.",
    icon: ShoppingCart,
    challenge: ["Customers move between product questions, order issues, billing and support in the same conversation.", "Traditional bots break the journey into disconnected intents.", "Transaction actions require stronger controls than information retrieval.", "Upsell opportunities should follow customer need, not interrupt it."],
    decisions: [
      { title: "What is the customer trying to accomplish?", description: "Understand the journey across discovery, purchase, service and account needs." },
      { title: "Which specialist should handle it?", description: "Route or hand off between sales, service, billing and order specialists." },
      { title: "Can the system transact?", description: "Apply authentication, inventory, pricing and payment controls before action." },
      { title: "When is human intervention needed?", description: "Escalate high-risk, ambiguous or relationship-sensitive situations." },
    ],
    capabilities: [
      { title: "Agent routing", description: "A coordinating layer selects the right specialist while preserving conversation context." },
      { title: "Commerce tools", description: "Governed integrations retrieve products, carts, orders, inventory and account status." },
      { title: "Transaction controls", description: "Sensitive actions follow explicit authorization, confirmation and audit rules." },
      { title: "Journey intelligence", description: "Interactions reveal friction, demand signals and opportunities across the value chain." },
    ],
    flow: [
      { step: "01", title: "Understand", description: "Recognize the customer goal and context." },
      { step: "02", title: "Route", description: "Engage the right specialist capability." },
      { step: "03", title: "Act", description: "Retrieve information or execute an approved commerce action." },
      { step: "04", title: "Continue", description: "Preserve context across the rest of the journey or human handoff." },
    ],
    outcomes: ["Less fragmented customer journeys", "Faster service across commerce intents", "More consistent transaction controls", "Better context across specialist handoffs", "Improved visibility into journey friction and demand"],
    advisoryQuestions: ["Which customer journeys cross multiple teams or systems?", "Which commerce actions require authentication or confirmation?", "What context must persist between agents?", "Where does human judgment protect revenue, trust or risk?"],
  },
];

export const useCaseBySlug = Object.fromEntries(
  useCases.map((item) => [item.slug, item]),
) as Record<UseCaseSlug, UseCase>;

export function getUseCase(slug: string) {
  return useCases.find((item) => item.slug === slug);
}
