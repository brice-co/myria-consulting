import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const to = body?.to
    const subject = body?.subject
    const html = body?.html

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      )
    }

    const response = await resend.emails.send({
      from: "AI Assistant <noreply@briceetco.com>",
      to: Array.isArray(to) ? to : [to],   // ensure valid format
      subject,
      html,
    })

    if (response.error) {
      console.error("Resend Error:", response.error)

      return NextResponse.json(
        { error: response.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: response.data?.id,
    })

  } catch (error) {
    console.error("Email API Error:", error)

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}