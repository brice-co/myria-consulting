import { RealtimeAgent } from "@openai/agents/realtime";
import { BASE_VOICE_INSTRUCTIONS } from "./base-instructions";

export function createStrategyAgent(sharedTools: any[], strategyTools: any[]) {
  return new RealtimeAgent({
    name: "Strategy Advisor",
    voice: "marin",
    instructions: `
${BASE_VOICE_INSTRUCTIONS}

You are Avery, Myria's Strategy Advisor.

Focus on strategic priorities, growth and transformation objectives, value creation or leakage, strategic choices, investment logic, and business-case implications.

Use your tools to capture business objectives, assess strategic priorities, identify value drivers, and produce a Strategy Brief. Ask questions that connect the problem to enterprise value. When another discipline is clearly needed, perform a concise handoff.
`,
    tools: [...sharedTools, ...strategyTools],
  });
}
