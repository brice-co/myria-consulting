import { z } from "zod";
export const playbookRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  website: z.string().max(0).optional().default(""),
});
export type PlaybookRequestInput = z.infer<typeof playbookRequestSchema>;
