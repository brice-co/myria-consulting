
type Input = {
  organizationName: string;
  inviterName: string;
  invitationUrl: string;
  role: string | string[];
  teamName?: string | null;
};

export function invitationEmailHtml(input: Input): string {
  const roles = Array.isArray(input.role)
    ? input.role.join(", ")
    : input.role;

  const teamSection = input.teamName
    ? `
      <p
        style="
          margin: 14px 0 0;
          font-size: 13px;
          color: #5F6B6F;
        "
      >
        Team
      </p>

      <p style="margin: 4px 0 0; font-size: 16px">
        ${escapeHtml(input.teamName)}
      </p>
    `
    : "";

  return `<!doctype html>
<html lang="en">
  <body
    style="
      margin: 0;
      background: #F6F1E7;
      font-family: Arial, sans-serif;
      color: #12313A;
    "
  >
    <div
      style="
        max-width: 640px;
        margin: auto;
        padding: 42px 20px;
      "
    >
      <div
        style="
          border: 1px solid rgba(18, 49, 58, 0.14);
          background: #FBF8F1;
          padding: 38px;
        "
      >
        <div
          style="
            font-family: Georgia, serif;
            font-size: 22px;
            margin-bottom: 32px;
          "
        >
          <span
            style="
              display: inline-block;
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: #B9802C;
              color: white;
              text-align: center;
              line-height: 36px;
              margin-right: 10px;
            "
          >
            M
          </span>
          Myria Consulting
        </div>

        <p
          style="
            margin: 0 0 12px;
            font-size: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #B9802C;
          "
        >
          Private advisory workspace
        </p>

        <h1
          style="
            margin: 0;
            font-family: Georgia, serif;
            font-size: 38px;
            line-height: 1.12;
            font-weight: 400;
          "
        >
          You have been invited to work with Myria.
        </h1>

        <p
          style="
            margin: 24px 0 0;
            font-size: 16px;
            line-height: 1.7;
            color: #5F6B6F;
          "
        >
          ${escapeHtml(input.inviterName)} invited you to join
          the
          <strong>
            ${escapeHtml(input.organizationName)}
          </strong>
          workspace.
        </p>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            border-top: 1px solid rgba(18, 49, 58, 0.12);
            border-bottom: 1px solid rgba(18, 49, 58, 0.12);
          "
        >
          <p
            style="
              margin: 0 0 8px;
              font-size: 13px;
              color: #5F6B6F;
            "
          >
            Workspace role
          </p>

          <p style="margin: 0; font-size: 16px">
            ${escapeHtml(roles)}
          </p>

          ${teamSection}
        </div>

        <a
          href="${escapeHtml(input.invitationUrl)}"
          style="
            display: inline-block;
            background: #12313A;
            color: white;
            text-decoration: none;
            padding: 14px 22px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 700;
          "
        >
          Review invitation →
        </a>

        <p
          style="
            margin: 28px 0 0;
            font-size: 12px;
            line-height: 1.6;
            color: #7B8588;
          "
        >
          Sign in with the email address that received this
          invitation. You can accept or decline the invitation
          from the secure Myria page.
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
