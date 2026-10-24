/**
 * Marketing copy for the Myria Consulting homepage.
 * Keep business-facing messages independent of animation and layout code.
 * Current site content and data/labs.ts inform these descriptions.
 */
export const consultingNavigation = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Our approach", href: "#difference" },
  { label: "Discovery Lab", href: "#discovery" },
  { label: "Experience", href: "#experience" },
  { label: "Insights", href: "#insights" },
] as const;

export const challenges = [
  {
    number: "01",
    title: "Strategy without clear priorities",
    description: "Competing initiatives and limited resources make it difficult to agree on where to focus and what decisions matter most.",
    response: "Strategic choices, decision criteria, and a focused direction.",
  },
  {
    number: "02",
    title: "Operations that slow execution",
    description: "Fragmented workflows, unclear responsibilities, and unnecessary handoffs create friction and reduce performance.",
    response: "Process visibility, operating model improvements, and accountable execution.",
  },
  {
    number: "03",
    title: "AI opportunities without a business case",
    description: "Promising technologies are difficult to prioritize when the operational value, readiness, and governance are not established.",
    response: "Value-led opportunities, practical sequencing, and responsible adoption.",
  },
  {
    number: "04",
    title: "Change that struggles to take hold",
    description: "New strategies and systems deliver limited value when people lack the clarity, involvement, and support to adopt them.",
    response: "Change readiness, stakeholder alignment, and sustainable capabilities.",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Strategy & direction",
    description: "Clarify strategic choices, assess opportunities, align leadership priorities, and establish a practical path forward.",
    examples: "Strategic priorities · Decision frameworks · Roadmaps",
  },
  {
    number: "02",
    title: "Operations & performance",
    description: "Improve how work gets done by connecting operating models, processes, decision rights, and performance measures.",
    examples: "Operating models · Process improvement · Performance",
  },
  {
    number: "03",
    title: "AI, data & intelligent systems",
    description: "Connect AI and data capabilities to business problems through opportunities, workflows, architecture, and governance.",
    examples: "AI opportunity assessment · Intelligent workflows · Governance",
  },
  {
    number: "04",
    title: "People & change",
    description: "Prepare leaders and teams for transformation with engagement, capability development, adoption, and ongoing improvement.",
    examples: "Change strategy · Organizational alignment · Adoption",
  },
] as const;

export const philosophy = [
  {
    number: "01",
    title: "Think deeper.",
    description: "Understand the real challenge, examine the evidence, and test assumptions before choosing a direction.",
  },
  {
    number: "02",
    title: "Organize intelligently.",
    description: "Connect people, decisions, processes, data, and technology around shared objectives.",
  },
  {
    number: "03",
    title: "Improve continuously.",
    description: "Use feedback and measurable results to build stronger organizational capabilities over time.",
  },
] as const;

export const discoveryStages = [
  { number: "01", title: "Understand", description: "Establish business context, objectives, priorities, and constraints." },
  { number: "02", title: "Surface", description: "Identify challenges, friction, risks, and important questions." },
  { number: "03", title: "Explore", description: "Examine the situation from management and specialist perspectives." },
  { number: "04", title: "Identify", description: "Consider opportunities and possible paths forward." },
  { number: "05", title: "Focus", description: "Agree on priority areas and the appropriate next step." },
] as const;

export const insights = [
  {
    type: "PRACTICAL GUIDE",
    title: "Finding the right AI opportunities",
    summary: "A structured way to identify where AI could create meaningful value in a business workflow.",
    href: "/resources/guides/finding-ai-opportunities",
    linkText: "Read the guide",
  },
  {
    type: "MANAGEMENT RESOURCE",
    title: "The AI-Enabled Enterprise Playbook",
    summary: "Explore the organizational considerations behind responsible AI-enabled transformation.",
    href: "/resources/playbook",
    linkText: "Explore the playbook",
  },
  {
    type: "RESOURCE LIBRARY",
    title: "Myria's practical guides",
    summary: "Methods and perspectives to help leaders understand complex decisions and improvement opportunities.",
    href: "/resources/guides",
    linkText: "Explore the guides",
  },
] as const;
