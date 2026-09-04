import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required.")
    .max(120),

  email: z
    .string()
    .trim()
    .email("A valid email is required.")
    .max(254),

  company: z
    .string()
    .trim()
    .min(2, "Company is required.")
    .max(160),

  role: z
    .string()
    .trim()
    .min(2, "Role is required.")
    .max(160),

  area: z
    .enum([
      "Strategy",
      "Operations",
      "People & Change",
      "AI & Data",
      "Other",
    ])
    .default("Other"),

  objective: z
    .string()
    .trim()
    .max(1_500)
    .default(""),

  challenge: z
    .string()
    .trim()
    .max(2_000)
    .default(""),

  urgency: z
    .enum([
      "Exploring",
      "Near term",
      "Active priority",
      "Urgent",
      "Not specified",
    ])
    .default("Not specified"),

  preferredFollowUp: z
    .enum([
      "Email",
      "Phone",
      "Advisory conversation",
      "Not specified",
    ])
    .default("Not specified"),

  message: z
    .string()
    .trim()
    .max(4_000)
    .default(""),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export const emptyContactInquiry: ContactInquiry = {
  name: "",
  email: "",
  company: "",
  role: "",
  area: "Other",
  objective: "",
  challenge: "",
  urgency: "Not specified",
  preferredFollowUp: "Not specified",
  message: "",
};

export const confirmationRequestSchema = z.object({
  inquiry: contactInquirySchema,
});

export const sendInquirySchema = z.object({
  inquiry: contactInquirySchema,
  confirmationToken: z.string().min(20).max(200),
});
