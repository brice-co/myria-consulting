/**
 * Public editorial summaries based on the three source PDFs supplied by Myria.
 * PDFs originate from the supplied brochure ZIP and are available after the
 * separate binary asset archive is committed under public/brochures.
 */
export const brochures = [
  {
    slug: "management-model",
    pdf: "/brochures/myria-management-model.pdf",
    title: "The Myria Management Model",
    category: "Management philosophy",
    description: "A practical, integrated approach to strengthening organizational clarity, alignment and the ability to improve continuously.",
    href: "/our-approach/management-model",
    topics: ["In-Depth Thinking", "Intelligent Structure", "Thinking Culture"],
  },
  {
    slug: "strategic-clarity",
    pdf: "/brochures/strategic-clarity.pdf",
    title: "Strategic Clarity Framework",
    category: "Management strategy",
    description: "A framework for moving from corporate ambition to structural decisions, aligned operations, measurable performance and sustained execution.",
    href: "/resources/brochures/strategic-clarity",
    topics: ["Ambition to architecture", "Organizational synchronization", "Performance measures"],
  },
  {
    slug: "ai-governance",
    pdf: "/brochures/ai-governance.pdf",
    title: "AI Governance & Architecture",
    category: "AI and technology governance",
    description: "An introduction to the orchestration, validation, auditability and risk controls needed to bring AI into operational processes responsibly.",
    href: "/resources/brochures/ai-governance",
    topics: ["Orchestration", "Validation", "Auditability"],
  },
] as const;
