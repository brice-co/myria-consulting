type OrganizationRole = {
  name: string;
  description: string;
};

const roles: OrganizationRole[] = [
  {
    name: "Owner",
    description:
      "Full organization control and workspace governance.",
  },
  {
    name: "Admin",
    description:
      "Manages members, invitations, teams, and most workspace operations.",
  },
  {
    name: "Member",
    description:
      "Participates in advisory work with restricted administration rights.",
  },
];

export default function Page() {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
        Role-based access control
      </p>

      <h1 className="mt-3 font-serif text-4xl text-[#12313a]">
        Roles &amp; permissions
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-[#5f6b6f]">
        Myria extends Better Auth&apos;s default roles with
        advisory-session, finding, decision, action, and report
        permissions. Dynamic Access Control is enabled for
        future organization-specific roles.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <article
            key={role.name}
            className="border border-[#12313a]/15 bg-[#fbf8f1] p-6"
          >
            <h2 className="font-serif text-2xl text-[#12313a]">
              {role.name}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#5f6b6f]">
              {role.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
