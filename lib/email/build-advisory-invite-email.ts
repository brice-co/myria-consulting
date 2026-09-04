type BuildAdvisoryInviteEmailInput = {
  invitationUrl: string;
  company?: string;
};

export function buildAdvisoryInviteEmail({
  invitationUrl,
  company,
}: BuildAdvisoryInviteEmailInput) {
  const organizationLine = company
    ? `<p style="margin:0 0 18px;color:#53646b;font-size:14px;line-height:22px;">You requested this experience for <strong>${escapeHtml(
        company,
      )}</strong>.</p>`
    : "";

  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#f6f1e7;font-family:Arial,Helvetica,sans-serif;color:#12313a;">
      <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
        <div style="background:#ffffff;border:1px solid #ded8cc;padding:36px;">
          <p style="margin:0 0 12px;color:#a66a18;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            Myria Collaborative Advisory Workspace
          </p>

          <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:32px;line-height:39px;font-weight:500;">
            Your advisory session invitation
          </h1>

          <p style="margin:0 0 18px;color:#53646b;font-size:16px;line-height:25px;">
            You are invited to experience a 15-minute working session with the Myria advisory team — humans and AI specialists working in the same advisory room.
          </p>

          ${organizationLine}

          <p style="margin:0 0 24px;color:#53646b;font-size:14px;line-height:22px;">
            Bring one real business challenge. During the experience, you may see specialist perspectives, shared findings, validation, comments, decisions, and actions develop around the conversation.
          </p>

          <a
            href="${escapeAttribute(invitationUrl)}"
            style="display:inline-block;background:#12313a;color:#ffffff;text-decoration:none;padding:14px 20px;font-size:14px;font-weight:700;"
          >
            Enter the advisory experience
          </a>

          <div style="margin-top:28px;padding-top:22px;border-top:1px solid #e7e1d6;color:#6c777b;font-size:12px;line-height:19px;">
            <p style="margin:0 0 8px;">
              Your participation link is personal and expires after 60 minutes.
            </p>
            <p style="margin:0;">
              This guided experience is intended to demonstrate how Myria works. It is not a formal consulting deliverable or professional recommendation.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value);
}
