import type { Metadata } from "next";
import { FrameworkArticle } from "@/components/consulting/resources/FrameworkArticle";

export const metadata: Metadata = {
  title: "Strategic Clarity Framework | Myria Consulting",
  description:
    "Explore Myria's Strategic Clarity Framework: moving from corporate ambition to organizational alignment, performance measures, operating models and effective execution.",
  alternates: { canonical: "/resources/brochures/strategic-clarity" },
  openGraph: {
    title: "Strategic Clarity Framework | Myria Consulting",
    description: "Connecting business ambition to the way an organization operates.",
    url: "/resources/brochures/strategic-clarity",
    type: "article",
  },
};

const parts = [
  { title: "From ambition to architecture", summary: "Translate strategic priorities into structural choices, roles and systems that can support the direction." },
  { title: "Organizational synchronization", summary: "Align the relevant functions and decisions so that the organization's efforts reinforce each other." },
  { title: "Target performance metrics", summary: "Identify meaningful measures that help leaders see whether strategy is becoming operational progress." },
  { title: "Long-term operating models", summary: "Shape ways of working that can support sustained execution and adapt as business needs evolve." },
  { title: "An execution playbook", summary: "Connect strategic choices to coordinated actions, ownership and a practical sequence of next steps." },
] as const;

export default function StrategicClarityPage() {
  return (
    <FrameworkArticle
      eyebrow="Management strategy / Publication overview"
      title="Strategic Clarity Framework"
      subtitle="Connecting corporate ambition to structural and operating advantages."
      introduction="Strategy creates value when it shapes how the organization operates. This framework examines the transition from ambition into aligned structures, meaningful measures and coordinated execution."
      parts={parts}
    />
  );
}
