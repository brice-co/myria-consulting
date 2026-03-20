import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * ===============================
 * 🔒 Configuration
 * ===============================
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

// Lock model server-side
const REALTIME_MODEL = "gpt-realtime-mini";

// Supported voices (server-enforced)
const SUPPORTED_VOICES = [
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "sage",
  "shimmer",
  "verse",
  "marin",
  "cedar",
] as const;

type SupportedVoice = typeof SUPPORTED_VOICES[number];

/**
 * ===============================
 * 🧠 Tools (Handoff)
 * ===============================
 */

const HANDOFF_TOOL = {
  type: "function" as const,
  name: "transfer_to_agent",
  description:
    "Transfer the conversation to a specialist agent when needed.",
  parameters: {
    type: "object",
    properties: {
      agent_id: {
        type: "string",
        enum: [
          "orchestrator",
          "revenue",
          "customer",
          "operations",
          "forecasting",
        ],
      },
      reason: {
        type: "string",
      },
    },
    required: ["agent_id"],
  },
};

/**
 * ===============================
 * 📦 Request Validation Schema
 * ===============================
 */

const RequestSchema = z.object({
  voice: z.string().optional(),
  instructions: z.string().max(8000).optional(),
});

/**
 * ===============================
 * 🛡 Helpers
 * ===============================
 */

function sanitizeVoice(input?: string): SupportedVoice {
  if (SUPPORTED_VOICES.includes(input as SupportedVoice)) {
    return input as SupportedVoice;
  }
  return "alloy";
}

async function createRealtimeSession({
  voice,
  instructions,
}: {
  voice: SupportedVoice;
  instructions: string;
}) {
  const response = await fetch(
    "https://api.openai.com/v1/realtime/sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: REALTIME_MODEL,
        voice,
        instructions,
        tools: [HANDOFF_TOOL],
        input_audio_transcription: {
          model: "whisper-1",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    // Log full error internally (safe for server logs)
    console.error("OpenAI Realtime Error:", {
      status: response.status,
      body: errorBody,
    });

    throw new Error("Failed to create realtime session");
  }

  return response.json();
}

/**
 * ===============================
 * 🚀 Route Handler
 * ===============================
 */

export async function POST(req: NextRequest) {
  try {
    /**
     * 🔐 (Optional) Auth Hook Point
     * Insert Clerk / NextAuth validation here
     */

    const json = await req.json();

    const parsed = RequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { voice, instructions } = parsed.data;

    const safeVoice = sanitizeVoice(voice);
    const safeInstructions =
      instructions ?? "You are a helpful assistant.";

    const session = await createRealtimeSession({
      voice: safeVoice,
      instructions: safeInstructions,
    });

    const token =
      session?.client_secret?.value ?? session?.client_secret;

    if (!token) {
      throw new Error("No client secret returned");
    }

    return NextResponse.json(
      {
        token,
        expires_at: session?.client_secret?.expires_at ?? null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("bi-session route error:", error.message);

    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 500 }
    );
  }
}