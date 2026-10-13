"use client";

import { useCallback, useEffect, useState } from "react";
import { Inbox, RefreshCcw } from "lucide-react";

import { authClient } from "@/auth/auth-client";

type Invitation = {
  id: string;
  email: string;
  role?: string | null;
  status: string;
  expiresAt: string | Date;
  organizationId: string;
};

type InvitationAction = "accept" | "reject";

export function MyInvitations() {
  const [items, setItems] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");

  const loadInvitations = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const result =
        await authClient.organization.listUserInvitations();

      if (result.error) {
        setMessage(
          result.error.message ?? "Unable to load invitations.",
        );
        setItems([]);
        return;
      }

      setItems((result.data ?? []) as Invitation[]);
    } catch {
      setMessage("Unable to load invitations.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInvitations();
  }, [loadInvitations]);

  async function handleInvitationAction(
    invitationId: string,
    type: InvitationAction,
    organizationId: string,
  ) {
    if (activeAction !== null) return;

    setActiveAction(invitationId);
    setMessage("");

    try {
      const result =
        type === "accept"
          ? await authClient.organization.acceptInvitation({
              invitationId,
            })
          : await authClient.organization.rejectInvitation({
              invitationId,
            });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to update invitation.",
        );
        return;
      }

      if (type === "accept") {
        const activeOrganization =
          await authClient.organization.setActive({
            organizationId,
          });

        if (activeOrganization.error) {
          setMessage(
            activeOrganization.error.message ??
              "Invitation accepted, but unable to switch workspaces.",
          );
          return;
        }

        window.location.assign("/workspace");
        return;
      }

      await loadInvitations();
    } catch {
      setMessage("Unable to update invitation.");
    } finally {
      setActiveAction(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
            Invitations
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#12313a]">
            Your workspace invitations
          </h2>
        </div>

        <button
          type="button"
          onClick={() => void loadInvitations()}
          disabled={loading || activeAction !== null}
          className="inline-flex items-center gap-2 rounded-full border border-[#12313a]/15 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw className="size-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[#5f6b6f]">
          Loading invitations…
        </p>
      ) : items.length === 0 ? (
        <div className="mt-8 border border-[#12313a]/15 bg-[#fbf8f1] p-8">
          <Inbox className="size-5 text-[#b9802c]" />

          <h3 className="mt-5 font-serif text-2xl text-[#12313a]">
            No pending invitations.
          </h3>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((invitation) => {
            const isProcessing =
              activeAction === invitation.id;

            return (
              <article
                key={invitation.id}
                className="border border-[#12313a]/15 bg-[#fbf8f1] p-6"
              >
                <p className="font-medium text-[#12313a]">
                  {invitation.email}
                </p>

                <p className="mt-1 text-xs capitalize text-[#5f6b6f]">
                  {invitation.role ?? "member"} ·{" "}
                  {invitation.status}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    disabled={activeAction !== null}
                    onClick={() =>
                      void handleInvitationAction(
                        invitation.id,
                        "accept",
                        invitation.organizationId,
                      )
                    }
                    className="rounded-full bg-[#12313a] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing
                      ? "Processing…"
                      : "Accept"}
                  </button>

                  <button
                    type="button"
                    disabled={activeAction !== null}
                    onClick={() =>
                      void handleInvitationAction(
                        invitation.id,
                        "reject",
                        invitation.organizationId,
                      )
                    }
                    className="rounded-full border border-[#12313a]/15 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing
                      ? "Processing…"
                      : "Decline"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {message && (
        <p
          role="alert"
          className="mt-5 text-sm text-red-700"
        >
          {message}
        </p>
      )}
    </div>
  );
}
