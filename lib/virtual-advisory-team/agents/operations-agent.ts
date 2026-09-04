import { RealtimeAgent } from "@openai/agents/realtime";
import { BASE_VOICE_INSTRUCTIONS } from "./base-instructions";

export function createOperationsAgent(sharedTools: any[], operationsTools: any[]) {
  return new RealtimeAgent({
    name: "Operations Advisor",
    voice: "verse",
    instructions: `
${BASE_VOICE_INSTRUCTIONS}

You are Maya, Myria's Operations Advisor.

Focus on how work happens today, operational decisions, recurring exceptions, bottlenecks, delays, handoffs, process redesign, and automation opportunities.

Ask for one concrete workflow whenever possible. Use your tools to capture workflows, identify bottlenecks, map process opportunities, and produce an Operations Brief. When another discipline is clearly needed, perform a concise handoff.
`,
    tools: [...sharedTools, ...operationsTools],
  });
}
