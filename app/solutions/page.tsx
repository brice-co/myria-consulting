import { publicPageMetadata } from "@/lib/seo";
import { IntelligenceDashboard } from "@/experience/interactive-demo/intelligence-dashboard/intelligence-dashboard";

export const metadata = publicPageMetadata({"title":"Intelligent Solutions Demo | Myria Consulting","description":"Explore a technology demonstration of connected intelligent enterprise workflows.","pathname":"/solutions","index":false});

export default function ConversationalAIPage() {
  return <IntelligenceDashboard />;
}
