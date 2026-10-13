export function otpEmailHtml(otp: string): string {
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
        max-width: 560px;
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
        <p
          style="
            margin: 0 0 12px;
            font-size: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #B9802C;
          "
        >
          Myria Client Access
        </p>

        <h1
          style="
            margin: 0;
            font-family: Georgia, serif;
            font-size: 34px;
            font-weight: 400;
          "
        >
          Verify your email.
        </h1>

        <p
          style="
            margin: 20px 0;
            color: #5F6B6F;
            line-height: 1.7;
          "
        >
          Use this verification code to continue to your
          Myria workspace.
        </p>

        <div
          style="
            margin: 26px 0;
            font-size: 32px;
            letter-spacing: 10px;
            font-weight: 700;
          "
        >
          ${escapeHtml(otp)}
        </div>

        <p
          style="
            font-size: 12px;
            color: #7B8588;
          "
        >
          If you did not request this code, you can ignore
          this email.
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
