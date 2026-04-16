import { z } from "zod";

export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "me.com",
  "live.com",
  "msn.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "yandex.com",
]);

const BLOCKED_COMPANY_VALUES =
  /^(test|testing|demo|none|n\/a|na|abc|asdf|qwerty|company|unknown)$/i;

export function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeOptionalText(value: unknown): string | null {
  const normalized = normalizeText(value);
  return normalized.length > 0 ? normalized : null;
}

export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function getEmailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

export function isBusinessEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  return Boolean(domain) && !FREE_EMAIL_DOMAINS.has(domain);
}

export const AI_SCOPE_OPTIONS = [
  "Single workflow automation",
  "Customer-facing system",
  "Internal operations",
  "Multi-agent system",
  "Enterprise-wide platform",
] as const;

export const ARCHITECTURE_MATURITY_OPTIONS = [
  "No formal architecture",
  "Prototype / MVP",
  "Partially structured",
  "Production system",
  "Scaled multi-system environment",
] as const;

export const REGULATORY_OPTIONS = [
  "None",
  "GDPR",
  "HIPAA",
  "SOC2",
  "Multiple regulatory constraints",
] as const;

export const PII_LEVEL_OPTIONS = [
  "Low",
  "Moderate",
  "High",
] as const;

export const ENGINEERING_TEAM_OPTIONS = [
  "None",
  "<10",
  "10–50",
  "50+",
] as const;

export const AI_EXPERIENCE_OPTIONS = [
  "None",
  "Early experimentation",
  "Some production experience",
  "Advanced systems experience",
] as const;

export const BUDGET_RANGE_OPTIONS = [
  "<50k",
  "50k–150k",
  "150k–500k",
  "500k+",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediate",
  "1–3 months",
  "3–6 months",
  "Exploration phase",
] as const;

const optionalTextField = z.string().trim().max(2000).optional().or(z.literal(""));
const optionalShortTextField = z.string().trim().max(120).optional().or(z.literal(""));

export const diagnosticSchema = z.object({
  companyName: z
    .string()
    .transform((v) => v.trim())
    .refine((v) => v.length >= 2, "Company name is required")
    .refine((v) => v.length <= 120, "Company name is too long")
    .refine((v) => !BLOCKED_COMPANY_VALUES.test(v), {
      message: "Please enter a valid company name",
    }),

  email: z
    .string()
    .email("Invalid email address")
    .transform((v) => v.trim().toLowerCase())
    .refine((email: any) => isBusinessEmail(email), {
      message: "Please use your business email address",
    }),

  industry: optionalShortTextField,
  orgSize: optionalShortTextField,
  contactTitle: optionalShortTextField,

  useCase: z
    .string()
    .transform((v) => v.trim())
    .refine((v) => v.length >= 20, {
      message: "Please provide more detail about your AI initiative",
    })
    .refine((v) => v.length <= 3000, {
      message: "Use case is too long",
    }),

  aiScope: z.enum(AI_SCOPE_OPTIONS).optional().or(z.literal("")),
  users: optionalShortTextField,
  systems: optionalTextField,
  infrastructure: optionalTextField,
  architectureMaturity: z
    .enum(ARCHITECTURE_MATURITY_OPTIONS)
    .optional()
    .or(z.literal("")),

  regulatory: z.enum(REGULATORY_OPTIONS).optional().or(z.literal("")),
  piiLevel: z.enum(PII_LEVEL_OPTIONS).optional().or(z.literal("")),
  engineeringTeam: z.enum(ENGINEERING_TEAM_OPTIONS).optional().or(z.literal("")),
  aiExperience: z.enum(AI_EXPERIENCE_OPTIONS).optional().or(z.literal("")),

  budgetRange: z.enum(BUDGET_RANGE_OPTIONS, {
    error: "Please select a budget range",
  }),

  timeline: z.enum(TIMELINE_OPTIONS).optional().or(z.literal("")),

  // Honeypot field. Must remain empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type DiagnosticInput = z.infer<typeof diagnosticSchema>;

export type DiagnosticDbValues = {
  companyName: string;
  email: string;
  industry: string | null;
  orgSize: string | null;
  contactTitle: string | null;
  useCase: string;
  aiScope: string | null;
  users: string | null;
  systems: string | null;
  infrastructure: string | null;
  architectureMaturity: string | null;
  regulatory: string | null;
  piiLevel: string | null;
  engineeringTeam: string | null;
  aiExperience: string | null;
  budgetRange: string;
  timeline: string | null;
};

export function toDiagnosticDbValues(input: DiagnosticInput): DiagnosticDbValues {
  return {
    companyName: input.companyName,
    email: input.email,
    industry: normalizeOptionalText(input.industry),
    orgSize: normalizeOptionalText(input.orgSize),
    contactTitle: normalizeOptionalText(input.contactTitle),
    useCase: input.useCase,
    aiScope: normalizeOptionalText(input.aiScope),
    users: normalizeOptionalText(input.users),
    systems: normalizeOptionalText(input.systems),
    infrastructure: normalizeOptionalText(input.infrastructure),
    architectureMaturity: normalizeOptionalText(input.architectureMaturity),
    regulatory: normalizeOptionalText(input.regulatory),
    piiLevel: normalizeOptionalText(input.piiLevel),
    engineeringTeam: normalizeOptionalText(input.engineeringTeam),
    aiExperience: normalizeOptionalText(input.aiExperience),
    budgetRange: input.budgetRange,
    timeline: normalizeOptionalText(input.timeline),
  };
}