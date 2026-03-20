import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, MYRIA_INFO_EMAIL } from "@/lib/resend";
import { contactEmailHtml } from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderName, senderEmail, company, subject, message } = body;

    if (!senderName || !senderEmail || !subject || !message) {
      return NextResponse.json(
        { error: "senderName, senderEmail, subject, and message are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [MYRIA_INFO_EMAIL],
      subject,
      replyTo: senderEmail,
      html: contactEmailHtml({
        senderName,
        senderEmail,
        company,
        subject,
        message,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Contact email sent successfully.",
    });
  } catch (error) {
    console.error("send-contact-email error", error);
    return NextResponse.json(
      { error: "Failed to send contact email" },
      { status: 500 }
    );
  }
}