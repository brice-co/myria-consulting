import { getResend, getResendFrom } from "@/lib/labs-registry/email/resend";
import { invitationEmailHtml } from "@/lib/labs-registry/email/templates/invitation-email";
import { otpEmailHtml } from "@/lib/labs-registry/email/templates/otp-email";

export async function sendOtpEmail(input: { email: string; otp: string }) {
  const { error } = await getResend().emails.send({ from: getResendFrom(), to: input.email, subject: "Your Myria verification code", html: otpEmailHtml(input.otp) });
  if (error) throw new Error(error.message);
}

export async function sendOrganizationInvitationEmail(input: { email: string; invitationId: string; organizationName: string; inviterName: string; role: string | string[]; teamName?: string | null }) {
  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const invitationUrl = new URL(`/auth/invitations/${input.invitationId}`, baseUrl).toString();
  const { error } = await getResend().emails.send({ from: getResendFrom(), to: input.email, subject: `Invitation to ${input.organizationName} — Myria Consulting`, html: invitationEmailHtml({ ...input, invitationUrl }) });
  if (error) throw new Error(error.message);
}
