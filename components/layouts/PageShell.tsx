import { ReactNode } from "react";

const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    {/* Grid pattern */}
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    <div className="relative max-w-6xl mx-auto px-6 py-20">{children}</div>
  </div>
);

export default PageShell;
