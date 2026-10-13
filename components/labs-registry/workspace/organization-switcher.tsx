"use client";

import { useState } from "react";

import { authClient } from "@/auth/auth-client";

export function OrganizationSwitcher() {
  const { data: organizations } =
    authClient.useListOrganizations();

  const { data: activeOrganization } =
    authClient.useActiveOrganization();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleOrganizationChange(
    organizationId: string,
  ) {
    if (!organizationId || loading) return;

    setLoading(true);
    setMessage("");

    try {
      const result =
        await authClient.organization.setActive({
          organizationId,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to switch workspace.",
        );
        return;
      }

      window.location.reload();
    } catch {
      setMessage("Unable to switch workspace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <select
        aria-label="Active organization"
        value={activeOrganization?.id ?? ""}
        disabled={loading}
        onChange={(event) =>
          void handleOrganizationChange(event.target.value)
        }
        className="rounded-full border border-[#12313a]/15 bg-[#fbf8f1] px-5 py-3 text-sm font-medium text-[#12313a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="" disabled>
          Choose workspace
        </option>

        {(organizations ?? []).map((organization) => (
          <option
            key={organization.id}
            value={organization.id}
          >
            {organization.name}
          </option>
        ))}
      </select>

      {message && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-700"
        >
          {message}
        </p>
      )}
    </div>
  );
}
