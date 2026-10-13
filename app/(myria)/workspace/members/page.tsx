import { headers } from "next/headers";

import { auth } from "@/auth/auth";

type OrganizationMember = {
  id: string;
  userId: string;
  role: string;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

export default async function Page() {
  const activeOrganization =
    await auth.api.getFullOrganization({
      headers: await headers(),
    });

  const members = (activeOrganization?.members ??
    []) as OrganizationMember[];

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
        Member management
      </p>

      <h1 className="mt-3 font-serif text-4xl text-[#12313a]">
        Members
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-[#5f6b6f]">
        Better Auth owns organization membership and roles.
        Use its listMembers, updateMemberRole, removeMember,
        and addMember APIs here.
      </p>

      <div className="mt-8 divide-y divide-[#12313a]/10 border-y border-[#12313a]/10">
        {members.length === 0 ? (
          <p className="py-6 text-sm text-[#5f6b6f]">
            No members found in this workspace.
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="min-w-0">
                <p className="break-words font-medium text-[#12313a]">
                  {member.user?.name ||
                    member.user?.email ||
                    member.userId}
                </p>

                {member.user?.email && (
                  <p className="mt-1 break-words text-xs text-[#5f6b6f]">
                    {member.user.email}
                  </p>
                )}
              </div>

              <span className="shrink-0 rounded-full border border-[#12313a]/15 bg-[#fbf8f1] px-3 py-1.5 text-xs capitalize text-[#12313a]">
                {member.role}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
