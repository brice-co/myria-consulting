import { publicPageMetadata } from "@/lib/seo";
import { LabsSection } from '@/components/landing/labs-section'

export const metadata = publicPageMetadata({"title":"Advisory Labs | Strategy, Operations, AI & Change","description":"Explore Myria's structured Discovery, Strategy, Operations, AI & Data and People & Change advisory labs for business leaders.","pathname":"/labs","index":true});

export default function ConversationalAIPage() {
  return <LabsSection />;
}
