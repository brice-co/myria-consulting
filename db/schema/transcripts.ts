import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const transcripts = pgTable("transcripts", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull(),

  summary: text("summary").notNull(),
  transcript: text("transcript").notNull(),

  createdAt: timestamp("created_at").defaultNow()
})