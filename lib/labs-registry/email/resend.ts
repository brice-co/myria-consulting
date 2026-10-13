import { Resend } from "resend";
let resend: Resend | undefined;

export function getResend() {
  if (resend) return resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured.");
  resend = new Resend(key);
  return resend;
}

export function getResendFrom() {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("RESEND_FROM_EMAIL is not configured.");
  return from;
}
