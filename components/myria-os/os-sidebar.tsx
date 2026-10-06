// src/components/myria-os/os-sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  FileText,
  GitBranch,
  KanbanSquare,
  LayoutDashboard,
  Network,
  Sheet,
  Users,
  Video,
} from "lucide-react";

import { OSLogo } from "./os-logo";

const navigation = [
  {
    label: "Overview",
    href: "/myria-os",
    icon: LayoutDashboard,
  },
  {
    label: "AI Copilot",
    href: "/myria-os/copilot",
    icon: Bot,
  },
  {
    label: "Documents",
    href: "/myria-os/documents",
    icon: FileText,
  },
  {
    label: "Spreadsheets",
    href: "/myria-os/spreadsheets",
    icon: Sheet,
  },
  {
    label: "Whiteboard",
    href: "/myria-os/whiteboard",
    icon: Network,
  },
  {
    label: "Flowchart",
    href: "/myria-os/flowchart",
    icon: GitBranch,
  },
  {
    label: "Kanban",
    href: "/myria-os/kanban",
    icon: KanbanSquare,
  },
  {
    label: "Video Room",
    href: "/myria-os/video",
    icon: Video,
  },
];

export function OSSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen flex-col bg-[#102a31] px-4 py-6 text-white">
      <OSLogo />

      <div className="mt-10 text-[10px] uppercase tracking-[0.2em] text-white/40">
        Workspace
      </div>

      <nav className="mt-3 space-y-1">
        {navigation.map(
          ({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          },
        )}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2">
          <Users size={15} />

          <span className="text-sm">
            Product Strategy
          </span>
        </div>

        <p className="mt-2 text-xs leading-5 text-white/45">
          People and AI working together.
        </p>
      </div>
    </aside>
  );
}