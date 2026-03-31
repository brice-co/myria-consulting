import MultiAgentHandoff from "@/app/(tools)/multi-agents/MultiAgentHandoff";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Agent Handoff Demo",
  description: "Demo showcasing multi-agent handoff capabilities.",
  keywords: ["multi-agent systems", "agent handoff", "customer support", "AI agents"],
};

export default function MultiAgentsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Multi-Agent Handoff Demo</h1>
      <p>
        Experience seamless handoff between multiple specialized agents in a customer support scenario.
      </p>
      <MultiAgentHandoff />
    </div>
  );
}


