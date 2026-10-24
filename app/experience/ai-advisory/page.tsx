import { publicPageMetadata } from "@/lib/seo";
import { AIAdvisoryExperience } from "@/experience/ai-advisory/ai-advisory-experience";

export const metadata = publicPageMetadata({"title":"AI Advisory Experience | Myria Consulting","description":"Explore a specialist AI advisory experience supporting management discussions.","pathname":"/experience/ai-advisory","index":false});

export default function ConversationalAIPage() {
  return <AIAdvisoryExperience />;
}
