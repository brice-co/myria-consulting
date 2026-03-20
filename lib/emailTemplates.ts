export function leadCaptureHtml(input: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  interest: string;
  notes?: string;
}) {
  return `
    <h2>New Lead Captured</h2>
    <p><strong>Name:</strong> ${input.name}</p>
    <p><strong>Email:</strong> ${input.email}</p>
    <p><strong>Company:</strong> ${input.company || "-"}</p>
    <p><strong>Role:</strong> ${input.role || "-"}</p>
    <p><strong>Interest:</strong> ${input.interest}</p>
    <p><strong>Notes:</strong><br/>${input.notes || "-"}</p>
  `;
}

export function contactEmailHtml(input: {
  senderName: string;
  senderEmail: string;
  company?: string;
  subject: string;
  message: string;
}) {
  return `
    <h2>New Contact Request from Voice Agent</h2>
    <p><strong>From:</strong> ${input.senderName} (${input.senderEmail})</p>
    <p><strong>Company:</strong> ${input.company || "-"}</p>
    <p><strong>Subject:</strong> ${input.subject}</p>
    <hr/>
    <p>${input.message.replace(/\n/g, "<br/>")}</p>
  `;
}

export function transcriptSummaryHtml(input: {
  recipientName?: string;
  conversationSummary: string;
  nextSteps?: string;
}) {
  return `
    <h2>Conversation Summary</h2>
    <p>Hello ${input.recipientName || "there"},</p>
    <p>Here is a summary of your conversation with Myria Consulting:</p>
    <p>${input.conversationSummary.replace(/\n/g, "<br/>")}</p>
    ${
      input.nextSteps
        ? `<h3>Suggested Next Steps</h3><p>${input.nextSteps.replace(/\n/g, "<br/>")}</p>`
        : ""
    }
  `;
}