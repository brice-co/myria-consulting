import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const aiArchitectureDiagnosticApplications = pgTable(
  "ai_architecture_diagnostic_applications", // ✅ NEW TABLE NAME (recommended)
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // ─────────────────────────────────────────────
    // ORGANIZATION
    // ─────────────────────────────────────────────
    companyName: text("company_name").notNull(),
    email: text("email").notNull(),
    industry: text("industry"),
    orgSize: text("org_size"),
    contactTitle: text("contact_title"),

    // ─────────────────────────────────────────────
    // AI QUALIFICATION
    // ─────────────────────────────────────────────
    score: integer("score").notNull(),
    priority: text("priority"), // 🔥 used in API
    recommendedPath: text("recommended_path").notNull(),
    reasoning: text("reasoning"), // JSON string

    // ─────────────────────────────────────────────
    // AI SYSTEM CONTEXT (UPDATED)
    // ─────────────────────────────────────────────
    useCase: text("use_case").notNull(),
    aiScope: text("ai_scope"), // ✅ NEW (form uses this)
    users: text("users"), // ✅ NEW
    systems: text("systems"), // ✅ NEW

    // ─────────────────────────────────────────────
    // ARCHITECTURE
    // ─────────────────────────────────────────────
    infrastructure: text("infrastructure"),
    architectureMaturity: text("architecture_maturity"), // ✅ NEW

    // ─────────────────────────────────────────────
    // GOVERNANCE
    // ─────────────────────────────────────────────
    regulatory: text("regulatory"),
    piiLevel: text("pii_level"),

    // ─────────────────────────────────────────────
    // CAPABILITY
    // ─────────────────────────────────────────────
    engineeringTeam: text("engineering_team"),
    aiExperience: text("ai_experience"), // ✅ UPDATED (was realtimeExperience)

    // ─────────────────────────────────────────────
    // INVESTMENT
    // ─────────────────────────────────────────────
    budgetRange: text("budget_range").notNull(),
    timeline: text("timeline"),

    // ─────────────────────────────────────────────
    // META
    // ─────────────────────────────────────────────
    status: text("status").default("new"),
    createdAt: timestamp("created_at").defaultNow(),
  }
);