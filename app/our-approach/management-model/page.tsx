import type { Metadata } from "next";
import { ManagementModelContent } from "@/components/consulting/approach/ManagementModelContent";

export const metadata: Metadata = {
  title: "Myria Management Model | Integrated Management Approach",
  description:
    "Explore In-Depth Thinking, Intelligent Structure and Thinking Culture: three integrated components of the Myria Management Model for clarity, alignment and continuous improvement.",
  alternates: { canonical: "/our-approach/management-model", languages: { "en-CA": "/our-approach/management-model", "fr-CA": "/fr/notre-approche/modele-de-gestion", "x-default": "/our-approach/management-model" } },
  openGraph: {
    title: "The Myria Management Model",
    description: "Think deeper. Organize intelligently. Improve continuously.",
    url: "/our-approach/management-model",
    type: "article",
  },
};


export default function ManagementModelPage() { return <ManagementModelContent />; }
