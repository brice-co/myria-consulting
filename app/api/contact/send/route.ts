import { NextRequest, NextResponse } from "next/server";
import { consumeConfirmation } from "@/lib/myria-contact-agent/contact/confirmation";
import { buildInquiryMessage } from "@/lib/myria-contact-agent/contact/format";
import { sendInquirySchema } from "@/lib/myria-contact-agent/contact/schema";
import { contactEmailHtml } from "@/lib/myria-contact-agent/email/contact-email";
import { getResend } from "@/lib/myria-contact-agent/email/resend";
import { getClientIp } from "@/lib/myria-contact-agent/security/client-ip";
import { hashIdentifier } from "@/lib/myria-contact-agent/security/hash";
import { sendEmailRateLimit, sendIpRateLimit } from "@/lib/myria-contact-agent/upstash/ratelimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const parsed = sendInquirySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid contact request." }, { status: 400 });

  const { inquiry, confirmationToken } = parsed.data;
  const ip = getClientIp(request);
  const [ipRate, emailRate] = await Promise.all([
    sendIpRateLimit.limit(hashIdentifier(ip)),
    sendEmailRateLimit.limit(hashIdentifier(inquiry.email.toLowerCase())),
  ]);

  if (!ipRate.success || !emailRate.success) {
    return NextResponse.json({ error: "Message limit reached. Please try again later." }, { status: 429 });
  }

  const confirmation = await consumeConfirmation(confirmationToken);
  if (!confirmation) {
    return NextResponse.json({ error: "Confirmation expired or has already been used." }, { status: 409 });
  }

  if (JSON.stringify(confirmation.inquiry) !== JSON.stringify(inquiry)) {
    return NextResponse.json({ error: "The inquiry changed after confirmation. Please review and confirm it again." }, { status: 409 });
  }

  const to = process.env.MYRIA_CONTACT_TO ?? "info@myriaconsulting.com";
  const from = process.env.MYRIA_CONTACT_FROM;
  if (!from) return NextResponse.json({ error: "Contact email sender is not configured." }, { status: 500 });

  const subjectParts = ["Myria Consulting inquiry", inquiry.company || inquiry.name, inquiry.area !== "Other" ? inquiry.area : ""].filter(Boolean);
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: inquiry.email,
    subject: subjectParts.join(" · "),
    html: contactEmailHtml(inquiry),
    text: [
      `New Myria Consulting inquiry from ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${inquiry.company}` ,
      `Role: ${inquiry.role}` ,
      `Area: ${inquiry.area}`,
      `Urgency: ${inquiry.urgency}`,
      `Preferred follow-up: ${inquiry.preferredFollowUp}`,
      "",
      buildInquiryMessage(inquiry),
    ].filter(Boolean).join("\n"),
  });

  if (error) {
    console.error("Resend contact email error", error);
    return NextResponse.json({ error: "The message could not be sent. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
