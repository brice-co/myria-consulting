import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

const ChatBody = z.object({
  messages: z.array(z.custom<UIMessage>()),
  domain: z.enum(["executive", "revenue", "operations", "finance", "people"]).optional(),
});

const domainContext = {
  executive: "Enterprise forecast is \$18.4M, health is 82%, with EMEA expansion and pipeline recovery as priorities.",
  revenue: "Qualified pipeline is \$6.8M, health is 76%, with Northstar renewal and mid-market conversion as priorities.",
  operations: "On-time orders are 96.2%, health is 91%, with western inventory and Dallas carrier capacity as priorities.",
  finance: "Operating margin is 22.8%, health is 87%, with the Q4 reforecast and vendor consolidation as priorities.",
  people: "Team health is 91%, with critical leadership hiring, retention, and manager development as priorities.",
} as const;

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = ChatBody.safeParse(json);
    
    if (!parsed.success) {
      return Response.json({ error: "The request could not be understood." }, { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return Response.json({ error: "AI access is not configured for this workspace." }, { status: 401 });
    }

    const openai = createOpenAI({ apiKey: key });
    const domain = parsed.data.domain ?? "executive";

    // Enhanced System Prompt for gpt-4o-mini to compensate for lack of native deep reasoning.
    const enhancedSystemPrompt = `
You are Myria, an elite enterprise operating advisor providing concise, high-leverage guidance for senior leadership.

### CORE OPERATING DATA
Current Context: ${domainContext[domain]}

### RESPONSE PROTOCOL
Because you are advising C-suite executives, your output must adhere to strict structural constraints:
1. **Direct Guidance First**: Start with a single sentence containing a decisive, forward-looking recommendation.
2. **Data Anchoring**: You may ONLY reference the data provided in the "CORE OPERATING DATA" section above. If a user asks for figures, timelines, or statuses not explicitly present there, you MUST state "Data unavailable." 
3. **Structured Assumptions**: If you must make logical projections, encapsulate them under a clear Markdown header labeled "### ASSUMPTIONS & RISK RISKS".
4. **Tone**: Crisp, analytical, and authoritative. Eliminate all conversational filler (e.g., "Sure, I can help with that", "Based on the data you provided").

### OUTPUT FORMAT
Format your responses cleanly using these markdown blocks:
- **### STRATEGIC RECOMMENDATION** (1-2 sentences max)
- **### OPERATIONAL ANALYSIS** (Bullet points outlining implications using the current context numbers)
- **### ASSUMPTIONS & RISKS** (If applicable; list dependencies explicitly)
`.trim();

    const result = streamText({
      model: openai("gpt-4o-mini"), 
      system: enhancedSystemPrompt,
      messages: await convertToModelMessages(parsed.data.messages),
      maxRetries: 2, 
      abortSignal: request.signal,
      // Slightly lowering temperature ensures more deterministic adherence to the provided context data
      temperature: 0.2, 
    });

    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return new Response(null, { status: 499 });
    }
    const message = error instanceof Error ? error.message : "AI request failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
