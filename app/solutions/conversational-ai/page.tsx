import { publicPageMetadata } from "@/lib/seo";
import { ConversationalAIExperience } from "@/experience/interactive-demo/conversational-ai/conversational-ai-experience";

export const metadata = publicPageMetadata({"title":"Conversational AI Demo | Myria Consulting","description":"Explore a conversational AI demonstration with voice, text and governed actions.","pathname":"/solutions/conversational-ai","index":false});

export default function ConversationalAIPage() {
  return <ConversationalAIExperience />;
}
