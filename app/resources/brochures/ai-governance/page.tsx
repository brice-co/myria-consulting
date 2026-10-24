import type { Metadata } from "next";
import { FrameworkArticle } from "@/components/consulting/resources/FrameworkArticle";

export const metadata: Metadata = {
  title: "AI Governance & Architecture | Myria Consulting",
  description:
    "Learn the fundamentals of AI orchestration, validation chains, audit trails and risk controls for responsible AI-enabled business operations.",
  alternates: { canonical: "/resources/brochures/ai-governance" },
  openGraph: {
    title: "AI Governance & Architecture | Myria Consulting",
    description: "Governance, validation and accountability for AI moving into business operations.",
    url: "/resources/brochures/ai-governance",
    type: "article",
  },
};

const parts = [
  { title: "Orchestration layers", summary: "Organize AI systems around controlled workflows, defined responsibilities and connections to business systems." },
  { title: "Validation chains", summary: "Apply explicit checks and review points to outputs and actions before they affect operational processes." },
  { title: "Audit trails", summary: "Make decisions, tool activity and important system events traceable so that outcomes can be examined and explained." },
  { title: "Multi-tier hazard isolation", summary: "Separate sensitive or higher-risk actions from routine automation, with controls appropriate to the consequences." },
  { title: "Governance operating model", summary: "Establish the oversight, people and practices needed to manage responsibility, exceptions and improvement over time." },
] as const;

export default function AIGovernancePage() {
  return (
    <FrameworkArticle
      eyebrow="Technology governance / Publication overview"
      title="AI Governance & Architecture"
      subtitle="Building the controls and accountability around intelligent operational systems."
      introduction="When AI moves from experiments into operational workflows, governance becomes part of the architecture. The framework examines how orchestration, validation, auditability and risk controls support responsible execution."
      parts={parts}
    />
  );
}
