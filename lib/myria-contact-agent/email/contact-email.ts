import type { ContactInquiry } from "@/lib/myria-contact-agent/contact/schema";
import { buildInquiryMessage } from "@/lib/myria-contact-agent/contact/format";
import { escapeHtml } from "./escape-html";

export function contactEmailHtml(inquiry: ContactInquiry) {
  const safe = Object.fromEntries(
    Object.entries(inquiry).map(([key, value]) => [
      key,
      escapeHtml(String(value ?? "")),
    ]),
  ) as Record<keyof ContactInquiry, string>;

  const message = escapeHtml(
    buildInquiryMessage(inquiry),
  ).replaceAll("\n", "<br />");

  return `
    <div
      style="
        font-family:Inter,Arial,sans-serif;
        background:#f7f3ec;
        padding:32px;
        color:#17313a;
      "
    >
      <div
        style="
          max-width:680px;
          margin:0 auto;
          background:#fffaf4;
          border:1px solid #e2d8ca;
          border-radius:24px;
          padding:32px;
        "
      >
        <p
          style="
            font-size:11px;
            letter-spacing:.2em;
            text-transform:uppercase;
            color:#b57b2a;
            margin:0 0 12px;
          "
        >
          Myria Consulting · Contact Agent
        </p>

        <h1
          style="
            font-family:Georgia,serif;
            font-size:30px;
            font-weight:500;
            margin:0 0 28px;
          "
        >
          New inquiry from ${safe.name}
        </h1>

        <table
          cellpadding="0"
          cellspacing="0"
          style="
            width:100%;
            font-size:14px;
            line-height:1.6;
          "
        >
          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
                width:150px;
              "
            >
              Name
            </td>
            <td>
              ${safe.name}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Email
            </td>
            <td>
              ${safe.email}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Company
            </td>
            <td>
              ${safe.company}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Role
            </td>
            <td>
              ${safe.role}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Area
            </td>
            <td>
              ${safe.area}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Urgency
            </td>
            <td>
              ${safe.urgency}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:6px 0;
                color:#69787b;
              "
            >
              Preferred follow-up
            </td>
            <td>
              ${safe.preferredFollowUp}
            </td>
          </tr>
        </table>

        <div
          style="
            height:1px;
            background:#e2d8ca;
            margin:28px 0;
          "
        ></div>

        <p
          style="
            font-size:11px;
            letter-spacing:.16em;
            text-transform:uppercase;
            color:#b57b2a;
            margin:0 0 10px;
          "
        >
          Message
        </p>

        <p
          style="
            font-size:15px;
            line-height:1.75;
            margin:0;
          "
        >
          ${message}
        </p>

        ${
          safe.objective
            ? `
              <p
                style="
                  font-size:11px;
                  letter-spacing:.16em;
                  text-transform:uppercase;
                  color:#69787b;
                  margin:28px 0 8px;
                "
              >
                Objective
              </p>

              <p
                style="
                  font-size:14px;
                  line-height:1.65;
                  margin:0;
                "
              >
                ${safe.objective}
              </p>
            `
            : ""
        }

        ${
          safe.challenge
            ? `
              <p
                style="
                  font-size:11px;
                  letter-spacing:.16em;
                  text-transform:uppercase;
                  color:#69787b;
                  margin:24px 0 8px;
                "
              >
                Challenge
              </p>

              <p
                style="
                  font-size:14px;
                  line-height:1.65;
                  margin:0;
                "
              >
                ${safe.challenge}
              </p>
            `
            : ""
        }
      </div>
    </div>
  `;
}