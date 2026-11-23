/**
 * Marketing copy for the Myria Consulting homepage.
 * Keep business-facing messages independent of animation and layout code.
 * Current site content and data/labs.ts inform these descriptions.
 */
export const consultingNavigation = [
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Our approach", href: "/our-approach/management-model" },
  { label: "Discovery Lab", href: "#discovery" },
  { label: "Experience", href: "#experience" },
  { label: "Insights", href: "/insights" },
  { label: "Brochures", href: "/resources/brochures" },
  { label: "MyriaChat ↗", href: "https://myriachat.com/" },
] as const;

export const challenges = [
  {
    number: "01",
    title: "Make better decisions",
    description: "Bring clarity to priorities, evaluate alternatives, and strengthen the decisions that guide performance.",
    response: "Clearer direction, informed choices, and accountable decisions.",
  },
  {
    number: "02",
    title: "Improve performance",
    description: "Improve productivity, reduce operational friction, and make better use of resources.",
    response: "Simpler workflows, stronger coordination, and more effective operations.",
  },
  {
    number: "03",
    title: "Use technology purposefully",
    description: "Apply data, automation, and AI where they can strengthen operations and support meaningful business outcomes.",
    response: "Business-led opportunities, responsible integration, and measurable progress.",
  },
  {
    number: "04",
    title: "Make change last",
    description: "Align stakeholders, develop capabilities, and support the adoption of better ways of working.",
    response: "Stronger readiness, sustained adoption, and organizational learning.",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Strategy & direction",
    description: "Examine the business context, question assumptions, and turn strategic priorities into informed decisions and practical direction.",
    examples: "Strategic priorities · Decision frameworks · Roadmaps",
  },
  {
    number: "02",
    title: "Operations & performance",
    description: "Rethink operating models, simplify workflows, clarify responsibilities, and strengthen how performance is managed.",
    examples: "Operating models · Process improvement · Performance",
  },
  {
    number: "03",
    title: "AI, data & intelligent systems",
    description: "Apply intelligent systems and AI-powered tools to relevant business needs, with appropriate human oversight and governance.",
    examples: "AI opportunity assessment · Intelligent workflows · Governance",
  },
  {
    number: "04",
    title: "People & change",
    description: "Align leaders and teams, build readiness for change, and establish the capabilities needed to sustain improvement.",
    examples: "Change strategy · Organizational alignment · Adoption",
  },
] as const;

export const philosophy = [
  {
    number: "01",
    title: "Think deeper.",
    description: "Look beyond immediate symptoms, challenge assumptions, and develop a deeper understanding of how the organization functions.",
  },
  {
    number: "02",
    title: "Organize intelligently.",
    description: "Rethink structures and ways of working, aligning people, processes, information, technology, and decision-making around shared objectives.",
  },
  {
    number: "03",
    title: "Improve continuously.",
    description: "Connect insight with implementation, strengthening organizational learning, adaptability, and lasting capabilities.",
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
    type: "MANAGEMENT FRAMEWORKS",
    title: "The Myria Management Model & publications",
    summary: "Explore Myria's integrated management model and frameworks for strategy, organizational performance and AI governance.",
    href: "/resources/brochures",
    linkText: "Explore the frameworks",
  },
] as const;
