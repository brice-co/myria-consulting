import "server-only";
import { eq, desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { labPreferences, labRegistrations } from "@/db/schema/labs";
import type { RegistrationInput } from "../schemas/registration-schema";

export async function saveRegistration(input: RegistrationInput) {
  try {
    // 1. Run the upsert first to get the record ID
    const [record] = await db.insert(labRegistrations).values({
      name: input.name,
      email: input.email,
      company: input.company,
      role: input.role,
      motivation: input.motivation,
      notes: input.notes,
      consent: input.consent,
    }).onConflictDoUpdate({
      target: labRegistrations.email,
      set: {
        name: input.name,
        company: input.company,
        role: input.role,
        motivation: input.motivation,
        notes: input.notes,
        consent: input.consent,
        status: "registered",
        confirmationStatus: "pending",
        updatedAt: new Date(),
      },
    }).returning({ id: labRegistrations.id });

    if (!record?.id) {
      throw new Error("No record ID returned from registration insert/update.");
    }

    // 2. Prepare the batch queries for the preferences
    const deletePreferencesQuery = db.delete(labPreferences)
      .where(eq(labPreferences.registrationId, record.id));

    // Only queue an insert if there are preferences provided
    if (input.preferences && input.preferences.length > 0) {
      const insertPreferencesQuery = db.insert(labPreferences).values(
        input.preferences.map((labId, index) => ({
          registrationId: record.id,
          labId,
          rank: index + 1,
        }))
      );

      // Execute both preference queries in a single Neon HTTP batch request
      await db.batch([deletePreferencesQuery, insertPreferencesQuery]);
    } else {
      // If no preferences, just execute the delete
      await deletePreferencesQuery;
    }

    return record.id;
  } catch (error) {
    console.error("❌ saveRegistration Error:", error);
    throw error;
  }
}



export async function markConfirmationSent(id: string) {
  await db.update(labRegistrations).set({
    confirmationStatus: "sent",
    confirmationSentAt: new Date(),
  }).where(eq(labRegistrations.id, id));
}

export async function listRegistrations(page: number, pageSize = 25) {
  const safePage = Math.max(1, Math.floor(page));
  const rows = await db.select().from(labRegistrations)
    .orderBy(desc(labRegistrations.createdAt))
    .limit(pageSize).offset((safePage - 1) * pageSize);
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(labRegistrations);
  return { rows, count, page: safePage, pageSize };
}

export async function labInterest() {
  return db.select({
    labId: labPreferences.labId,
    rank: labPreferences.rank,
    count: sql<number>`count(*)::int`,
  }).from(labPreferences).groupBy(labPreferences.labId, labPreferences.rank);
}
