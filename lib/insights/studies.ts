/**
 * Curated public sources; not an automatically updated feed.
 * Research finding is separated from Myria interpretation.
 * Validate source URLs and claims before updating / publishing.
 * Editorial review: 2026-10-24.
 */
export type CuratedStudy = {
  id: string;
  category: string;
  year: string;
  published?: string;
  title: string;
  finding: string;
  myriaPerspective: string;
  image: string;
  imageAlt: string;
  source: string;
  sourceUrl: string;
};

export const studies: readonly CuratedStudy[] = [
  {
    id: "stanford",
    category: "Independent research",
    year: "2026",
    title: "AI adoption is growing. Organizational readiness is the harder question.",
    finding:
      "Stanford HAI's 2026 AI Index reports that 88% of surveyed organizations used AI in 2025, while AI agent deployment remained in the single digits across nearly all business functions.",
    myriaPerspective:
      "Assess how work is organized, who has decision authority, and whether teams can adopt and govern new capabilities before scaling agents.",
    image: "/images/insights/research-adoption.svg",
    imageAlt: "Original abstract illustration contrasting broad AI adoption with connected organizational capabilities",
    source: "Stanford HAI · AI Index 2026, Economy",
    sourceUrl: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    id: "mckinsey",
    category: "Industry perspective",
    year: "2026",
    published: "2026-10-05",
    title: "Enterprise value requires more than introducing AI tools.",
    finding:
      "McKinsey examines the gap between individual AI productivity and enterprise-level results, and the need to redesign workflows, operating models and accountability.",
    myriaPerspective:
      "Start with end-to-end business outcomes, then align the people, AI agents, decisions and workflows required to achieve them.",
    image: "/images/insights/research-workflows.svg",
    imageAlt: "Original abstract illustration of connected end-to-end workflows and decision points",
    source: "McKinsey Quarterly · AI is changing work",
    sourceUrl: "https://www.mckinsey.com/capabilities/people-and-organization/our-insights/ai-is-changing-work-now-it-has-to-change-the-organization",
  },
  {
    id: "deloitte",
    category: "Industry research",
    year: "2026",
    title: "Human oversight and governance belong in the operating model.",
    finding:
      "Deloitte Canada's 2026 State of AI in the Enterprise considers workforce readiness, AI governance, scaling and the importance of defining where humans remain in control.",
    myriaPerspective:
      "Build oversight, approvals, exception management and auditability into operational design—not as controls added after deployment.",
    image: "/images/insights/research-governance.svg",
    imageAlt: "Original abstract illustration of layered controls and a human oversight checkpoint",
    source: "Deloitte Canada · State of AI in the Enterprise 2026",
    sourceUrl: "https://www.deloitte.com/ca/en/issues/generative-ai/state-of-ai-in-enterprise.html",
  },
  {
    id: "playbook",
    category: "Applied research",
    year: "2026",
    published: "2026-04-02",
    title: "What successful enterprise AI deployments have in common.",
    finding:
      "Stanford's Enterprise AI Playbook examines 51 enterprise cases and describes how organizational readiness, leadership and processes shape implementation outcomes.",
    myriaPerspective:
      "Use evidence from real deployments to frame practical questions about process fit, evaluation, governance and scalable execution.",
    image: "/images/insights/research-enterprise.svg",
    imageAlt: "Original abstract illustration of enterprise systems connected around shared results",
    source: "Stanford Digital Economy Lab · Enterprise AI Playbook",
    sourceUrl: "https://digitaleconomy.stanford.edu/publication/enterprise-ai-playbook/",
  },
];
