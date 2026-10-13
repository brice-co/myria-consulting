import "server-only";
import { getResend, getResendFrom } from "@/lib/labs-registry/email/resend";
import type { RegistrationInput } from "../schemas/registration-schema";
import { LABS } from "../constants/labs";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

export async function sendLabConfirmation(input: RegistrationInput) {
  const choices = input.preferences.map((id, index) => {
    const title = LABS.find((lab) => lab.id === id)?.title ?? id;
    return `<li>${index + 1}. ${escapeHtml(title)}</li>`;
  }).join("");

  const { error } = await getResend().emails.send({
    from: getResendFrom(),
    to: input.email,
    subject: "Your Myria Intelligent Labs registration",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:auto;color:#12313a">
        <p style="color:#b9802c;letter-spacing:2px">MYRIA CONSULTING</p>
        <h1>Thank you for registering, ${escapeHtml(input.name)}.</h1>
        <p>We've received your Intelligent Labs preferences:</p>
        <ol>${choices}</ol>
        <p>We'll review interest and contact selected participants when sessions are scheduled.</p>
        <p>Registration does not guarantee a session invitation.</p>
        <p>Myria Consulting</p>
      </div>
    `,
  });

  if (error) throw new Error(error.message);
}
