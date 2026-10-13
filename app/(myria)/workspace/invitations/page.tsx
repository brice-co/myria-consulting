import { headers } from "next/headers";

import { auth } from "@/auth/auth";
import { InvitationsManager } from "@/components/labs-registry/workspace/invitations-manager";

export default async function Page() {
  const activeOrganization =
    await auth.api.getFullOrganization({
      headers: await headers(),
    });

  if (!activeOrganization) {
    return (
      <p className="text-[#5f6b6f]">
        Choose an active workspace.
      </p>
    );
  }

  const teams = (activeOrganization.teams ?? []).map(
    (team) => ({
      id: team.id,
      name: team.name,
    }),
  );

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
        Workspace administration
      </p>

      <h1 className="mt-3 font-serif text-4xl text-[#12313a]">
        Invitations
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-[#5f6b6f]">
        Invite participants, assign their initial role and
        team, resend pending invitations, or cancel them
        before acceptance.
      </p>

      <div className="mt-10">
        <InvitationsManager
          organizationId={activeOrganization.id}
          teams={teams}
        />
      </div>
    </div>
  );
}
