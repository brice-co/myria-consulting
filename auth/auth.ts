import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { emailOTP, organization } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { ac, admin, member, owner } from "./permissions";
import { sendOrganizationInvitationEmail, sendOtpEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      allowedAttempts: 5,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp }) { await sendOtpEmail({ email, otp }); },
    }),
    organization({
      ac,
      roles: { owner, admin, member },
      allowUserToCreateOrganization: false,
      requireEmailVerificationOnInvitation: true,
      invitationExpiresIn: 60 * 60 * 48,
      cancelPendingInvitationsOnReInvite: true,
      teams: { enabled: true, maximumTeams: 20, allowRemovingAllTeams: true },
      dynamicAccessControl: { enabled: true, maximumRolesPerOrganization: 20 },
      async sendInvitationEmail(data) {
        const teamName =
          "team" in data && data.team && typeof data.team === "object" && "name" in data.team
            ? String((data.team as { name?: string }).name ?? "")
            : null;

        await sendOrganizationInvitationEmail({
          email: data.email,
          invitationId: data.id,
          organizationName: data.organization.name,
          inviterName: data.inviter.user.name || data.inviter.user.email,
          role: data.role,
          teamName,
        });
      },
    }),
  ],
});
