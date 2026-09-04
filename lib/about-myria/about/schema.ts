import { z } from "zod";

export const aboutStateSchema = z.object({
  topic: z.string().default(""),
  summary: z.string().default(""),
  activeSpecialistId: z.string().nullable().default(null),
  activeLayerId: z.string().nullable().default(null),
  highlights: z.array(z.string()).default([]),
  relatedHref: z.string().default(""),
  relatedLabel: z.string().default(""),
});

export type AboutState = z.infer<typeof aboutStateSchema>;

export const emptyAboutState: AboutState = {
  topic: "",
  summary: "",
  activeSpecialistId: null,
  activeLayerId: null,
  highlights: [],
  relatedHref: "",
  relatedLabel: "",
};
