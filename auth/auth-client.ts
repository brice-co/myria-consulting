import { createAuthClient } from "better-auth/react";
import { emailOTPClient, organizationClient } from "better-auth/client/plugins";
import { ac, admin, member, owner } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    organizationClient({
      ac,
      roles: { owner, admin, member },
      teams: { enabled: true },
      dynamicAccessControl: { enabled: true },
    }),
  ],
});
