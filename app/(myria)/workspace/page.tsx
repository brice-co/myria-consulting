import { headers } from "next/headers";

import { auth } from "@/auth/auth";
import { OrganizationSwitcher } from "@/components/labs-registry/workspace/organization-switcher";

type WorkspaceMetric = {
  label: string;
  value: number;
};

export default async function WorkspacePage() {
  const activeOrganization =
    await auth.api.getFullOrganization({
      headers: await headers(),
    });

  const memberCount =
    activeOrganization?.members?.length ?? 0;

  const teamCount =
    activeOrganization?.teams?.length ?? 0;

  const pendingInvitationCount =
    activeOrganization?.invitations?.filter(
      (invitation) => invitation.status === "pending",
    ).length ?? 0;

  const metrics: WorkspaceMetric[] = [
    {
      label: "Members",
      value: memberCount,
    },
    {
      label: "Teams",
      value: teamCount,
    },
    {
      label: "Pending invitations",
      value: pendingInvitationCount,
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#b9802c]">
            Myria collaborative advisory workspace
          </p>

          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight tracking-[-0.03em] text-[#12313a]">
            Humans and AI specialists, working in the same
            advisory room.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[#5f6b6f]">
            Participants, specialist teams, shared findings,
            validation, comments, decisions, and actions —
            organized around the same client workspace.
          </p>
        </div>

        <OrganizationSwitcher />
      </div>

      <div className="mt-10 grid gap-px border border-[#12313a]/10 bg-[#12313a]/10 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-[#fbf8f1] p-6"
          >
            <p className="font-serif text-4xl text-[#12313a]">
              {metric.value}
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#5f6b6f]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
