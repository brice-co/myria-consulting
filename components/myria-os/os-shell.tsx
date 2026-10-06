// src/components/myria-os/os-shell.tsx

import type { ReactNode } from "react";
import { OSSidebar } from "./os-sidebar";

export function MyriaOSShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-[220px_minmax(0,1fr)] bg-[#f8f7f3]">
      <OSSidebar />

      <main className="min-w-0">
        {children}
      </main>
    </div>
  );
}