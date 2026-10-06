import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const resourceLeads = pgTable("resource_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  resourceSlug: text("resource_slug").notNull(),
  resourceType: text("resource_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
