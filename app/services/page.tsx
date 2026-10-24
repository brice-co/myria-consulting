import { publicPageMetadata } from "@/lib/seo";
import { LabsSection } from '@/components/landing/labs-section'

export const metadata = publicPageMetadata({"title":"Advisory Services | Myria Consulting","description":"Explore Myria's advisory services and structured Labs for strategy, operational performance, AI and organizational change.","pathname":"/services","index":false});

export default function ConversationalAIPage() {
  return <LabsSection />;
}
