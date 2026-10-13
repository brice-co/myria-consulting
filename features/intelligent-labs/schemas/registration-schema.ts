import { z } from "zod";
import { LAB_IDS } from "../constants/labs";

export const registrationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(120),
  motivation: z.enum(["collaboration", "business", "architecture", "curiosity"]),
  preferences: z.array(z.enum(LAB_IDS)).length(2).refine(
    (value) => new Set(value).size === 2,
    "Choose two different Labs in priority order."
  ),
  notes: z.string().trim().max(1000).default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
