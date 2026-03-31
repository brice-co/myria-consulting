import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull(),

  phone: text("phone"),
  company: text("company"),
  interest: text("interest"),

  createdAt: timestamp("created_at").defaultNow()
})