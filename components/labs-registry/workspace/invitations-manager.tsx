"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { authClient } from "@/auth/auth-client";

type Invitation = {
  id: string;
  email: string;
  role?: string | null;
  status: string;
  organizationId: string;
  teamId?: string | null;
};

type Team = {
  id: string;
  name: string;
};

type InvitationRole = "owner" | "admin" | "member";

type InvitationsManagerProps = {
  organizationId: string;
  teams: Team[];
};

export function InvitationsManager({
  organizationId,
  teams,
}: InvitationsManagerProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InvitationRole>("member");
  const [teamId, setTeamId] = useState("");
  const [items, setItems] = useState<Invitation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(
    null,
  );

  const loadInvitations = useCallback(async () => {
    setLoading(true);

    try {
      const result =
        await authClient.organization.listInvitations({
          query: {
            organizationId,
          },
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to load invitations.",
        );
        return;
      }

      setItems((result.data ?? []) as Invitation[]);
    } catch {
      setMessage("Unable to load invitations.");
    } finally {
      setLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    void loadInvitations();
  }, [loadInvitations]);

  async function handleInvite(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");

    try {
      const result =
        await authClient.organization.inviteMember({
          email,
          role,
          organizationId,
          teamId: teamId || undefined,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to send invitation.",
        );
        return;
      }

      setEmail("");
      setMessage("Invitation sent.");

      await loadInvitations();
    } catch {
      setMessage("Unable to send invitation.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(invitationId: string) {
    if (activeAction !== null) return;

    setActiveAction(invitationId);
    setMessage("");

    try {
      const result =
        await authClient.organization.cancelInvitation({
          invitationId,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to cancel invitation.",
        );
        return;
      }

      setMessage("Invitation canceled.");
      await loadInvitations();
    } catch {
      setMessage("Unable to cancel invitation.");
    } finally {
      setActiveAction(null);
    }
  }

  async function handleResend(invitation: Invitation) {
    if (activeAction !== null) return;

    setActiveAction(invitation.id);
    setMessage("");

    try {
      const role: InvitationRole =
        invitation.role === "owner" ||
        invitation.role === "admin" ||
        invitation.role === "member"
          ? invitation.role
          : "member";

      const result =
        await authClient.organization.inviteMember({
          email: invitation.email,
          role,
          organizationId,
          teamId: invitation.teamId ?? undefined,
          resend: true,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to resend invitation.",
        );
        return;
      }

      setMessage(
        `Invitation resent to ${invitation.email}.`,
      );

      await loadInvitations();
    } catch {
      setMessage("Unable to resend invitation.");
    } finally {
      setActiveAction(null);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
      <form
        onSubmit={handleInvite}
        className="border border-[#12313a]/15 bg-[#fbf8f1] p-6"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
          Invite participant
        </p>

        <h2 className="mt-4 font-serif text-2xl text-[#12313a]">
          Invite someone into this workspace.
        </h2>

        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          autoComplete="email"
          className="mt-5 w-full border border-[#12313a]/15 bg-white px-4 py-3 text-sm"
        />

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as InvitationRole)
            }
            aria-label="Invitation role"
            className="border border-[#12313a]/15 bg-white px-4 py-3 text-sm"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>

          <select
            value={teamId}
            onChange={(event) => setTeamId(event.target.value)}
            aria-label="Assign team"
            className="border border-[#12313a]/15 bg-white px-4 py-3 text-sm"
          >
            <option value="">No team</option>

            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-full bg-[#12313a] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Sending invitation…"
            : "Send invitation"}
        </button>
      </form>

      <section>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
          Invitation cycle
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#12313a]">
          Pending invitations
        </h2>

        {loading ? (
          <p className="mt-6 text-sm text-[#5f6b6f]">
            Loading invitations…
          </p>
        ) : items.length === 0 ? (
          <div className="mt-6 border-y border-[#12313a]/10 py-8">
            <p className="text-sm text-[#5f6b6f]">
              No invitations found.
            </p>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-[#12313a]/10 border-y border-[#12313a]/10">
            {items.map((invitation) => {
              const isProcessing =
                activeAction === invitation.id;

              return (
                <div
                  key={invitation.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-[#12313a]">
                      {invitation.email}
                    </p>

                    <p className="mt-1 text-xs capitalize text-[#5f6b6f]">
                      {invitation.role ?? "member"} ·{" "}
                      {invitation.status}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={activeAction !== null}
                      onClick={() =>
                        void handleResend(invitation)
                      }
                      className="rounded-full border border-[#12313a]/15 bg-white px-3.5 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProcessing
                        ? "Processing…"
                        : "Resend"}
                    </button>

                    <button
                      type="button"
                      disabled={activeAction !== null}
                      onClick={() =>
                        void handleCancel(invitation.id)
                      }
                      className="rounded-full border border-red-900/15 bg-white px-3.5 py-2 text-xs text-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProcessing
                        ? "Processing…"
                        : "Cancel"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {message && (
          <p
            role="status"
            aria-live="polite"
            className="mt-4 text-sm text-[#5f6b6f]"
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
