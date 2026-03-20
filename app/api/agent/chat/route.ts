import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {

  const { messages } = await req.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    tools: [
        {
    type: "function",
    function: {
      name: "open_url",
      description: "Opens a URL in the user's browser in a new tab",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "The URL to open" },
        },
        required: ["url"],
        additionalProperties: false,
      },
    },
  },
      {
        type: "function",
        function: {
          name: "web_search",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string" },
            },
            required: ["query"],
          },
        },
      },
      {
       type: "function",
    function: {
      name: "send_email",
      description: "Sends an email to a recipient using Resend",
      parameters: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient email address" },
          subject: { type: "string", description: "Email subject line" },
          body: { type: "string", description: "Email body content (HTML supported)" },
        },
        required: ["to", "subject", "body"],
        additionalProperties: false,
      },
    },
  },
    ],
  })

  return NextResponse.json(completion)
}