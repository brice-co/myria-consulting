import { CalendarDays, FileText, Headphones, Activity, Magnet, Users, UsersRound, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type UseCaseId = "customer" | "leads" | "collaboration" | "support" | "booking" | "proposals";

const items = [
  { id: "customer" as const, label: "Customer intelligence", icon: Users },
  { id: "leads" as const, label: "Lead capture", icon: Magnet },
  { id: "collaboration" as const, label: "Collaborative intelligence", icon: UsersRound },
  { id: "support" as const, label: "Customer support", icon: Headphones },
  { id: "booking" as const, label: "Smart booking", icon: CalendarDays },
  { id: "proposals" as const, label: "Proposals", icon: FileText },
];

export function DashboardHeader({ active, onChange }: { active: UseCaseId; onChange: (id: UseCaseId) => void }) {
  return (
    <header className="border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-spruce text-primary-foreground"><Activity className="h-5 w-5" /></span>
          <div><div className="text-sm font-bold text-foreground">Operating Intelligence</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Enterprise command center</div></div>
        </div>
        <nav aria-label="Use cases" className="flex max-w-full gap-1 overflow-x-auto rounded-md border border-border bg-secondary/50 p-1">
          {items.map((item) => {
            const Icon = item.icon;
            return <Button key={item.id} variant="ghost" size="sm" onClick={() => onChange(item.id)} className={cn("shrink-0 text-[11px]", active === item.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}><Icon />{item.label}</Button>;
          })}
        </nav>
      </div>
    </header>
  );
}
