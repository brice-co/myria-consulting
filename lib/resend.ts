import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const MYRIA_INFO_EMAIL =
  process.env.MYRIA_INFO_EMAIL || "info@myriaconsulting.com";

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Myria Consulting <noreply@briceetco.com>";