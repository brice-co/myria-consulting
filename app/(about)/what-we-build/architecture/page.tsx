import Architecture from "@/components/marketing/Architecture";
import { Layers } from "lucide-react";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { PAGE_AGENTS } from "@/config/agentConfigs";

export default function ArchitecturePage() {
  return (
      <>
    <Architecture/>
  
    <ChatWidget
          title="Architecture Advisor"
          subtitle="Your AI companion for seamless communication and productivity."
          accentColor="260 80% 60%"
          icon={<Layers className="h-12 w-12" />}
          voice="alloy"
          systemPrompt={PAGE_AGENTS.architecture.systemPrompt}
          allowedTools={PAGE_AGENTS.architecture.allowedTools}
        /></>
    
  );
}


