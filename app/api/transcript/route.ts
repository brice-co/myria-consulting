import { db } from "@/db"
import { transcripts } from "@/db/schema/transcripts"
import { sendEmail } from "@/lib/email/sendEmail"
import { NextResponse } from "next/server"
import { z } from "zod"

// -----------------------------
// Validation Schema
// -----------------------------
const bodySchema = z.object({
  email: z.string().email(),
  summary: z.string().min(5, "Summary is required"),
  transcript: z.string().min(1, "Transcript is required"),
})

// -----------------------------
// Helpers
// -----------------------------
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

// -----------------------------
// Route Handler
// -----------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate & parse
    const { email, summary, transcript } = bodySchema.parse(body)

    // Optional normalization
    const cleanSummary = summary.trim()
    const cleanTranscript = transcript.trim()

    // -----------------------------
    // DB Insert
    // -----------------------------
    const [created] = await db
      .insert(transcripts)
      .values({
        email,
        summary: cleanSummary,
        transcript: cleanTranscript,
      })
      .returning()

    // -----------------------------
    // Send Email
    // -----------------------------
    await sendEmail({
      to: email,
      subject: "Your Conversation Summary",
      html: `
        <h2>Conversation Summary</h2>
        <p>${escapeHtml(cleanSummary)}</p>

        <h3>Full Transcript</h3>
        <pre style="white-space: pre-wrap; font-family: monospace;">
${escapeHtml(cleanTranscript)}
        </pre>
      `,
    })

    return NextResponse.json({
      success: true,
      data: created,
    })
  } catch (error: any) {
    console.error("❌ Transcript API error:", error)

    // Zod validation error
    if (error?.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    )
  }
}