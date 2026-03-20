import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const voiceDiagnosticApplications = pgTable(
  "voice_diagnostic_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // --- Organization ---
    companyName: text("company_name").notNull(),
    email: text("email").notNull(),
    industry: text("industry"),
    orgSize: text("org_size"),
    contactTitle: text("contact_title"),
    // ✅ add these
    score: integer("score").notNull(),
    recommendedPath: text("recommended_path").notNull(),

    // --- Use Case ---
    useCase: text("use_case").notNull(),
    channel: text("channel"),
    monthlyInteractions: text("monthly_interactions"),
    concurrentSessions: text("concurrent_sessions"),

    // --- Technical ---
    infrastructure: text("infrastructure"),
    realtimeInfra: text("realtime_infra"),

    // --- Governance ---
    regulatory: text("regulatory"),
    piiLevel: text("pii_level"),

    // --- Internal Capability ---
    engineeringTeam: text("engineering_team"),
    realtimeExperience: text("realtime_experience"),

    // --- Budget ---
    budgetRange: text("budget_range").notNull(),
    timeline: text("timeline"),

    createdAt: timestamp("created_at").defaultNow(),
  }
);