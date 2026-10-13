/**
 * Initialize Myria organization and Admin user if they do not exist.
 * Links the user to the organization as an admin.
 *
 * Required .env: DATABASE_URL, LABS_ADMIN_EMAIL
 * Optional .env: MYRIA_ORGANIZATION_ID (Will generate a UUID if empty)
 * 
 * Run: npm run seed:labs-admin
 */
import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { randomUUID } from "crypto"; // Native Node.js crypto module
import { db } from "@/db";
import { member, user, organization } from "@/db/schema/auth";

async function main() {
  const email = process.env.LABS_ADMIN_EMAIL?.trim().toLowerCase();
  
  // If MYRIA_ORGANIZATION_ID is empty or placeholder, generate a clean UUID
  let organizationId = process.env.MYRIA_ORGANIZATION_ID?.trim();
  if (!organizationId || organizationId.includes("replace-with")) {
    organizationId = randomUUID();
  }

  if (!email) {
    throw new Error("LABS_ADMIN_EMAIL is required in your environment variables.");
  }

  // 1. Ensure Admin User Exists
  let [account] = await db
    .select({ id: user.id, email: user.email })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (!account) {
    const fallbackName = email.split("@")[0] || "Admin";
    console.log(`👤 Admin user not found. Creating user: ${email}`);
    
    const [newUser] = await db
      .insert(user)
      .values({
        id: randomUUID(),
        email: email,
        name: fallbackName, // Required by your .notNull() schema constraint
        emailVerified: true,
      })
      .returning({ id: user.id, email: user.email });
    
    account = newUser;
  }

  // 2. Ensure Organization Exists
  let [org] = await db
    .select({ id: organization.id, name: organization.name })
    .from(organization)
    .where(eq(organization.id, organizationId))
    .limit(1);

  if (!org) {
    console.log(`🏢 Organization not found. Creating "Myria Consulting" (ID: ${organizationId})...`);
    
    const [newOrg] = await db
      .insert(organization)
      .values({
        id: organizationId,
        name: "Myria Consulting",
        slug: "myria-consulting", // Required by your .notNull().unique() schema constraint
      })
      .returning({ id: organization.id, name: organization.name });

    org = newOrg;
    console.log(`\n👉 CRITICAL: Update your .env file with this ID:\nMYRIA_ORGANIZATION_ID=${organizationId}\n`);
  }

  // 3. Ensure User is Assigned to Organization as Admin
  const [existingMembership] = await db
    .select({ id: member.id, role: member.role })
    .from(member)
    .where(and(eq(member.userId, account.id), eq(member.organizationId, org.id)))
    .limit(1);

  if (!existingMembership) {
    console.log(`🔗 Linking ${account.email} to ${org.name} as admin...`);
    await db.insert(member).values({
      id: randomUUID(),
      userId: account.id,
      organizationId: org.id,
      role: "admin", // Sets user directly to admin context
    });
    console.log(`🎉 Initialization successful!`);
  } else {
    // If they exist but roles change, update them to admin
    const currentRoles = existingMembership.role.split(",").map((r) => r.trim());
    if (!currentRoles.includes("admin") && !currentRoles.includes("owner")) {
      console.log(`🔄 Upgrading membership role to admin...`);
      await db
        .update(member)
        .set({ role: "admin" })
        .where(eq(member.id, existingMembership.id));
    } else {
      console.log(`✅ Already authorized: ${account.email} is an ${existingMembership.role} in ${org.name}.`);
    }
  }
}

main().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exitCode = 1;
});
