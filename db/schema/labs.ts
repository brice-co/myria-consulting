import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const labRegistrations = pgTable("lab_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  company: varchar("company", { length: 160 }).notNull(),
  role: varchar("role", { length: 120 }).notNull(),
  motivation: varchar("motivation", { length: 40 }).notNull(),
  notes: text("notes").notNull().default(""),
  consent: boolean("consent").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("registered"),
  confirmationStatus: varchar("confirmation_status", { length: 30 }).notNull().default("pending"),
  confirmationSentAt: timestamp("confirmation_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("lab_registration_email_unique").on(table.email),
  index("lab_registration_created_idx").on(table.createdAt),
]);

export const labPreferences = pgTable("lab_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  registrationId: uuid("registration_id").notNull().references(() => labRegistrations.id, { onDelete: "cascade" }),
  labId: varchar("lab_id", { length: 40 }).notNull(),
  rank: integer("rank").notNull(),
}, (table) => [
  uniqueIndex("lab_preference_registration_rank_unique").on(table.registrationId, table.rank),
  uniqueIndex("lab_preference_registration_lab_unique").on(table.registrationId, table.labId),
]);
