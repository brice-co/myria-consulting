import { BrainCircuit, Check } from "lucide-react";
import type { Advisor, AdvisorId } from "./lib/advisory";
import { cn } from "@/lib/utils";

export type AdvisorStatus = "idle" | "thinking" | "contributing";

export function AdvisorPanel({ advisors, active, status, onToggle }: {
  advisors: Advisor[]; active: AdvisorId[]; status: Partial<Record<AdvisorId, AdvisorStatus>>; onToggle: (id: AdvisorId) => void;
}) {
  return (
    <aside className="border-b border-border bg-secondary/30 p-4 lg:border-b-0 lg:border-r">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><BrainCircuit className="h-3 w-3" />Advisory team</div>
      <div className="space-y-2">
        {advisors.map((a) => {
          const on = active.includes(a.id);
          const locked = a.id === "lead";
          const s: AdvisorStatus = on ? (status[a.id] ?? "idle") : "idle";
          return (
            <button key={a.id} type="button" disabled={locked} onClick={() => onToggle(a.id)} aria-pressed={on}
              className={cn("flex w-full items-start gap-2.5 rounded-md border p-2.5 text-left transition-colors", on ? "border-primary/40 bg-card" : "border-transparent opacity-60 hover:opacity-100")}>
              <span className="relative shrink-0">
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{a.initials}</span>
                {on && (
                  <span className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                    s === "thinking" && "animate-pulse bg-accent",
                    s === "contributing" && "bg-primary",
                    s === "idle" && "bg-muted-foreground/40")} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[10px] font-bold text-foreground">{a.name}{on && <Check className="h-3 w-3 text-primary" />}</span>
                <span className="block text-[9px] leading-snug text-muted-foreground">{a.focus}</span>
                <span className="mt-1 flex items-center justify-between gap-1">
                  <span className="text-[8px] uppercase tracking-wide text-primary">{a.framework}</span>
                  {on && <span className={cn("text-[8px] font-semibold", s === "idle" ? "text-muted-foreground/60" : "text-primary")}>{s === "thinking" ? "Thinking…" : s === "contributing" ? "Contributing" : "Listening"}</span>}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[9px] text-muted-foreground">Toggle specialists in or out of the session. The lead advisor always orchestrates.</p>
    </aside>
  );
}
