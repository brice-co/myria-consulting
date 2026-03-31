import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const proposals = pgTable("proposals", {
  id: uuid("id").defaultRandom().primaryKey(),

  businessName: text("business_name").notNull(),
  clientName: text("client_name").notNull(),

  projectGoals: text("project_goals").notNull(),
  deliverables: text("deliverables").notNull(),

  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),

  createdAt: timestamp("created_at").defaultNow()
})