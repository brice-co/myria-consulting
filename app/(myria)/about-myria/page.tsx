import type { Metadata } from "next";
import { AboutMyriaAgentPage } from "@/components/about-myria/about-myria-agent-page";

export const metadata: Metadata = {
  title: "Myria Consulting | About Us",
  description:
    "Explore Myria's virtual specialist team, Advisory Labs, consulting operating model, and AI Enablement Architecture through realtime voice and text.",
};

export default function AboutMyriaPage() {
  return <AboutMyriaAgentPage />;
}
