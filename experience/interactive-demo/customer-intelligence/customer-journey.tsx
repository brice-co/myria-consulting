import type { Customer } from "./lib/customers";
import { cn } from "@/lib/utils";

export function CustomerJourney({ customer }: { customer: Customer }) {
  return (
    <div key={customer.id} className="animate-fade border-t border-border bg-card px-5 py-5">
      <div className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Customer journey
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {customer.journey.map((s, i) => (
          <div key={s.stage} className="group relative">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold transition-colors",
                  s.status === "done" && "border-primary bg-primary text-primary-foreground",
                  s.status === "current" &&
                    "animate-pulse-soft border-accent bg-accent text-accent-foreground",
                  s.status === "upcoming" && "border-border bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-foreground">{s.stage}</div>
              <div className="text-[10px] text-muted-foreground">{s.detail}</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                {s.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
