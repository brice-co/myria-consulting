import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * A database handle that initializes on first use rather than during module evaluation.
 *
 * Next.js evaluates server modules while collecting page data at build time. A
 * production database credential must not be required just to compile the
 * public marketing website or analyze route modules.
 *
 * Runtime requests still fail closed if DATABASE_URL is not configured.
 * Production and preview environments must each have their own appropriate
 * credentials before database-backed features can operate.
 */
function connect() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required for database operations.");
  }

  return drizzle(neon(connectionString), { schema });
}

type Database = ReturnType<typeof connect>;

let activeConnection: Database | undefined;

function getConnection(): Database {
  activeConnection ??= connect();
  return activeConnection;
}

/**
 * Preserve the existing `db.select(...)`, `db.query.*`, and Better Auth
 * Drizzle adapter call sites without opening a connection at import time.
 * Database methods are bound to their concrete Drizzle instance.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, property) {
    const connection = getConnection();
    const member = Reflect.get(connection, property, connection);

    return typeof member === "function" ? member.bind(connection) : member;
  },
});
