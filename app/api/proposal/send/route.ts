import { sendEmail } from "@/lib/email/sendEmail"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  await sendEmail({
    to: body.to,
    subject: "Business Proposal",
    html: body.proposal_html
  })

  return NextResponse.json({ success: true })
}