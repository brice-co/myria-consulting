import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  LockKeyhole,
  Sparkles,
  Users,
} from "lucide-react";

import { verifyAdvisoryInviteToken } from "@/lib/advisory-invite/token";

type InvitePageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function AdvisoryInvitePage({
  searchParams,
}: InvitePageProps) {
  const { token } = await searchParams;

  const invitation = token
    ? verifyAdvisoryInviteToken(token)
    : null;

  if (!invitation) {
    return (
      <main className="min-h-screen bg-[#f6f1e7] px-6 py-20">
        <div className="mx-auto max-w-2xl border border-black/10 bg-white p-8 sm:p-10">
          <LockKeyhole className="size-5 text-amber-700" />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
            Myria Advisory Experience
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-900">
            This invitation is no longer available.
          </h1>

          <p className="mt-5 leading-7 text-slate-600">
            Participation links are personal and
            time-limited. Request a new invitation from
            the Myria website to continue.
          </p>

          <Link
            href="/#experience-myria"
            className="mt-8 inline-flex items-center gap-2 bg-[#12313a] px-5 py-3 text-sm font-semibold text-white"
          >
            Request a new invitation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    );
  }

  const workspacePath =
    process.env.ADVISORY_WORKSPACE_PATH ??
    "/collaborative-advisory";

  const workspaceUrl =
    `${workspacePath}?invite=${encodeURIComponent(
      token!,
    )}`;

  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="size-4" />
              <p className="text-xs font-medium uppercase tracking-[0.2em]">
                Myria Collaborative Advisory Workspace
              </p>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.03em] text-slate-900 sm:text-5xl">
              Your advisory room is ready.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              You are invited to a focused 15-minute
              working session with humans and AI
              specialists operating in the same advisory
              room.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
            <InfoCard
              icon={Clock3}
              title="15 minutes"
              text="A focused guided experience."
            />
            <InfoCard
              icon={Users}
              title="Shared advisory room"
              text="Human and AI specialist perspectives."
            />
            <InfoCard
              icon={LockKeyhole}
              title="Private invitation"
              text="Your participation link is time-limited."
            />
          </div>

          <div className="mt-10 border border-black/10 bg-white p-7 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
              Before you enter
            </p>

            <h2 className="mt-3 font-serif text-2xl text-slate-900">
              Bring one real business challenge.
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Choose something you would genuinely like
              to think through. The experience may surface
              findings, questions, specialist perspectives,
              validation points, decisions, and possible
              actions.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
              This experience demonstrates the Myria
              working model. It is not a formal consulting
              deliverable and should not be treated as a
              substitute for a scoped advisory engagement.
            </p>

            <Link
              href={workspaceUrl}
              className="mt-7 inline-flex items-center gap-2 bg-[#12313a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183d47]"
            >
              Enter the advisory room
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type InfoCardProps = {
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  text: string;
};

function InfoCard({
  icon: Icon,
  title,
  text,
}: InfoCardProps) {
  return (
    <div className="bg-[#fbf8f1] p-6">
      <Icon className="size-5 text-[#12313a]" />
      <h3 className="mt-5 font-serif text-xl text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}
