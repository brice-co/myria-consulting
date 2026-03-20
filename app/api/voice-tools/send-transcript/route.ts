import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, MYRIA_INFO_EMAIL } from "@/lib/resend";
import { transcriptSummaryHtml } from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      recipientEmail,
      recipientName,
      conversationSummary,
      nextSteps,
      sendToInternalInbox = true,
    } = body;

    if (!conversationSummary) {
      return NextResponse.json(
        { error: "conversationSummary is required" },
        { status: 400 }
      );
    }

    const sendJobs: Promise<unknown>[] = [];

    if (recipientEmail) {
      sendJobs.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: [recipientEmail],
          subject: "Your Myria Consulting conversation summary",
          html: transcriptSummaryHtml({
            recipientName,
            conversationSummary,
            nextSteps,
          }),
        })
      );
    }

    if (sendToInternalInbox) {
      sendJobs.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: [MYRIA_INFO_EMAIL],
          subject: `Voice conversation summary${recipientName ? ` - ${recipientName}` : ""}`,
          html: transcriptSummaryHtml({
            recipientName,
            conversationSummary,
            nextSteps,
          }),
        })
      );
    }

    await Promise.all(sendJobs);

    return NextResponse.json({
      success: true,
      message: "Transcript summary sent successfully.",
    });
  } catch (error) {
    console.error("send-transcript error", error);
    return NextResponse.json(
      { error: "Failed to send transcript summary" },
      { status: 500 }
    );
  }
}