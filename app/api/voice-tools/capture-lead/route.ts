import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, MYRIA_INFO_EMAIL } from "@/lib/resend";
import { leadCaptureHtml } from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, interest, notes } = body;

    if (!name || !email || !interest) {
      return NextResponse.json(
        { error: "name, email, and interest are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [MYRIA_INFO_EMAIL],
      subject: `New lead captured: ${name}`,
      replyTo: email,
      html: leadCaptureHtml({
        name,
        email,
        company,
        role,
        interest,
        notes,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully.",
    });
  } catch (error) {
    console.error("capture-lead error", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}