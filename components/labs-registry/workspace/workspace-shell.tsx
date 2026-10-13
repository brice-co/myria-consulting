import type { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  MailPlus,
  ShieldCheck,
  Settings,
  FlaskConical,
} from "lucide-react";

const navigation = [
  { href: "/workspace", label: "Overview", icon: LayoutDashboard },
  { href: "/workspace/labs", label: "Intelligent Labs", icon: FlaskConical },
  { href: "/workspace/members", label: "Members", icon: Users },
  { href: "/workspace/teams", label: "Teams", icon: UsersRound },
  { href: "/workspace/invitations", label: "Invitations", icon: MailPlus },
  { href: "/workspace/roles", label: "Roles", icon: ShieldCheck },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
] as const;

type Props = { children: ReactNode };

export function WorkspaceShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#f6f1e7]">
      <header className="flex min-h-[73px] items-center justify-between border-b border-[#12313a]/15 px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#b9802c] font-serif text-white">
            M
          </span>
          <span className="font-serif text-lg text-[#12313a]">Myria Consulting</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.16em] text-[#5f6b6f]">
          Private workspace
        </span>
      </header>
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_1fr]">
        <aside className="border-r border-[#12313a]/10 bg-[#fbf8f1] p-5 lg:min-h-[calc(100vh-73px)]">
          <p className="px-3 text-[10px] uppercase tracking-[0.2em] text-[#b9802c]">
            Workspace
          </p>
          <nav className="mt-4 space-y-1">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#5f6b6f] transition hover:bg-white hover:text-[#12313a]"
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
