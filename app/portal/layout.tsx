import Link from "next/link";
import {
  FileText,
  FlaskConical,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

type PortalLayoutProps = {
  children: React.ReactNode;
};

const portalNavigation = [
  {
    label: "Dashboard",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    label: "Advisory Labs",
    href: "/portal/labs",
    icon: FlaskConical,
  },
  {
    label: "Reports",
    href: "/portal/reports",
    icon: FileText,
  },
];

export default function PortalLayout({
  children,
}: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f6f1e7]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f1e7]/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/portal"
              className="shrink-0 font-serif text-xl tracking-[-0.02em] text-[#12313a]"
            >
              Myria
            </Link>

            <div
              className="hidden h-5 w-px bg-black/10 sm:block"
              aria-hidden="true"
            />

            <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
              Client Portal
            </p>
          </div>

          <nav
            aria-label="Portal navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {portalNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex min-h-10 items-center gap-2 px-3 text-sm font-medium text-slate-600 transition hover:bg-black/[0.035] hover:text-[#12313a]"
                >
                  <Icon
                    className="size-4 text-slate-400 transition group-hover:text-[#12313a]"
                    aria-hidden="true"
                  />

                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm text-slate-500 transition hover:text-slate-900 sm:inline-flex"
            >
              Back to Myria
            </Link>

            <button
              type="button"
              disabled
              title="Sign out will be enabled when portal authentication is connected."
              className="inline-flex size-10 cursor-not-allowed items-center justify-center border border-black/10 text-slate-300"
            >
              <LogOut
                className="size-4"
                aria-hidden="true"
              />

              <span className="sr-only">
                Sign out
              </span>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav
          aria-label="Portal mobile navigation"
          className="border-t border-black/10 md:hidden"
        >
          <div className="mx-auto flex w-full max-w-7xl overflow-x-auto px-4">
            {portalNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-12 shrink-0 items-center gap-2 px-3 text-sm font-medium text-slate-600 transition hover:text-[#12313a]"
                >
                  <Icon
                    className="size-4"
                    aria-hidden="true"
                  />

                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-black/10 bg-[#f6f1e7]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            Myria Client Portal
          </p>

          <p>
            Private advisory workspace
          </p>
        </div>
      </footer>
    </div>
  );
}