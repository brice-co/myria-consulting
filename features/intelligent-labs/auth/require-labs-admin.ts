import "server-only";
import { headers } from "next/headers";
import { auth } from "@/auth/auth";

export async function getLabsAdminAccess() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { status: "unauthenticated" as const };

  const organizationId = process.env.MYRIA_ORGANIZATION_ID;
  if (!organizationId) throw new Error("MYRIA_ORGANIZATION_ID is missing.");

  // Verify membership against the fixed Myria organization, not the active client selection.
  const { db } = await import("@/db");
  const { member } = await import("@/db/schema/auth");
  const { and, eq } = await import("drizzle-orm");
  const [row] = await db.select({ role: member.role }).from(member).where(and(
    eq(member.organizationId, organizationId),
    eq(member.userId, session.user.id),
  )).limit(1);
  const roles = row?.role?.split(",").map((role) => role.trim()) ?? [];
  if (!roles.includes("owner") && !roles.includes("admin")) {
    return { status: "forbidden" as const };
  }
  return { status: "authorized" as const, session };
}
