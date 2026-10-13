"use client";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { authClient } from "@/auth/auth-client";
import { signInForInvitationUrl } from "@/lib/labs-registry/navigation/invitation-return-url";

type InvitationData = {
  id: string;
  email: string;
  role?: string | null;
  organizationId: string;
  status: string;
  expiresAt: string | Date;
  organization?: {
    name?: string;
  };
};

type InvitationDetailProps = {
  invitationId: string;
};

type InvitationAction = "accept" | "reject" | null;

export function InvitationDetail({
  invitationId,
}: InvitationDetailProps) {
  const { data: session, isPending } = authClient.useSession();

  const [invitation, setInvitation] =
    useState<InvitationData | null>(null);

  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<InvitationAction>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    let alive = true;

    async function loadInvitation() {
      try {
        const result =
          await authClient.organization.getInvitation({
            query: {
              id: invitationId,
            },
          });

        if (!alive) return;

        if (result.error) {
          setMessage(
            result.error.message ??
              "Unable to load this invitation.",
          );
        } else {
          setInvitation(result.data as InvitationData);
        }
      } catch {
        if (alive) {
          setMessage("Unable to load this invitation.");
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    }

    void loadInvitation();

    return () => {
      alive = false;
    };
  }, [invitationId, session]);

  async function acceptInvitation() {
    if (!invitation || action !== null) return;

    setAction("accept");
    setMessage("");

    try {
      const result =
        await authClient.organization.acceptInvitation({
          invitationId,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to accept invitation.",
        );
        setAction(null);
        return;
      }

      const activeOrganization =
        await authClient.organization.setActive({
          organizationId: invitation.organizationId,
        });

      if (activeOrganization.error) {
        setMessage(
          activeOrganization.error.message ??
            "Invitation accepted, but unable to switch workspaces.",
        );
        setAction(null);
        return;
      }

      window.location.assign("/workspace");
    } catch {
      setMessage("Unable to accept invitation.");
      setAction(null);
    }
  }

  async function rejectInvitation() {
    if (action !== null) return;

    setAction("reject");
    setMessage("");

    try {
      const result =
        await authClient.organization.rejectInvitation({
          invitationId,
        });

      if (result.error) {
        setMessage(
          result.error.message ??
            "Unable to decline invitation.",
        );
        setAction(null);
        return;
      }

      window.location.assign("/auth/invitations?declined=1");
    } catch {
      setMessage("Unable to decline invitation.");
      setAction(null);
    }
  }

  if (isPending || loading) {
    return <State text="Checking your invitation…" />;
  }

  if (!session) {
    return (
      <div className="border border-[#12313a]/15 bg-[#fbf8f1] p-8">
        <ShieldCheck className="size-5 text-[#b9802c]" />

        <h2 className="mt-5 font-serif text-3xl text-[#12313a]">
          Verify who you are.
        </h2>

        <p className="mt-4 leading-7 text-[#5f6b6f]">
          Sign in with the same email address that received
          this invitation. After verification, you will return
          here to accept or decline it.
        </p>

        <a
          href={signInForInvitationUrl(invitationId)}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#12313a] px-5 py-3 text-sm font-semibold text-white"
        >
          Continue with invited email
          <ArrowRight className="size-4" />
        </a>
      </div>
    );
  }

  if (!invitation) {
    return (
      <State
        text={
          message ||
          "This invitation is unavailable, expired, or does not belong to this verified email."
        }
      />
    );
  }

  return (
    <article className="border border-[#12313a]/15 bg-[#fbf8f1] p-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#b9802c] text-white">
        <Building2 className="size-5" />
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[#b9802c]">
        Workspace invitation
      </p>

      <h2 className="mt-3 font-serif text-4xl text-[#12313a]">
        Join{" "}
        {invitation.organization?.name ??
          "the Myria advisory workspace"}
        .
      </h2>

      <p className="mt-5 leading-7 text-[#5f6b6f]">
        Invitation sent to{" "}
        <strong className="text-[#12313a]">
          {invitation.email}
        </strong>
        .
      </p>

      <div className="mt-7 grid gap-px border border-[#12313a]/10 bg-[#12313a]/10 sm:grid-cols-2">
        <Detail
          label="Role"
          value={invitation.role ?? "member"}
        />

        <Detail
          label="Status"
          value={invitation.status}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={action !== null}
          onClick={acceptInvitation}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#12313a] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckCircle2 className="size-4" />

          {action === "accept"
            ? "Joining workspace…"
            : "Accept invitation"}
        </button>

        <button
          type="button"
          disabled={action !== null}
          onClick={rejectInvitation}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12313a]/15 bg-white px-5 py-3 text-sm font-medium text-[#12313a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <X className="size-4" />
          {action === "reject"
            ? "Declining invitation…"
            : "Decline"}
        </button>
      </div>

      {message && (
        <p
          role="alert"
          className="mt-5 text-sm text-red-700"
        >
          {message}
        </p>
      )}
    </article>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#b9802c]">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium capitalize text-[#12313a]">
        {value}
      </p>
    </div>
  );
}

function State({ text }: { text: string }) {
  return (
    <div className="border border-[#12313a]/15 bg-[#fbf8f1] p-8 text-[#5f6b6f]">
      {text}
    </div>
  );
}
