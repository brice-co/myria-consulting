import {
  pgTable,
  uuid,
  text,
  jsonb,
  numeric,
  timestamp
} from "drizzle-orm/pg-core"

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),

  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),

  items: jsonb("items").notNull(),

  total: numeric("total").notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow()
})