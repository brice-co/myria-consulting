import { z } from "zod";

export const advisoryInviteRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254),
  company: z
    .string()
    .trim()
    .max(120)
    .optional()
    .default(""),
});

export type AdvisoryInviteRequest = z.infer<
  typeof advisoryInviteRequestSchema
>;
