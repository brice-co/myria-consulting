import { Activity, Building2, Clock, Users } from "lucide-react";
import type { Customer } from "./lib/customers";
import { cn } from "@/lib/utils";

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 100;
  const h = 34;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CustomerProfile({
  customers,
  active,
  onSelect,
}: {
  customers: Customer[];
  active: Customer;
  onSelect: (c: Customer) => void;
}) {
  return (
    <aside className="flex flex-col border-b border-border bg-secondary/40 lg:border-b-0 lg:border-r">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Users className="h-3 w-3" /> Accounts
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
        {customers.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className={cn(
              "flex min-w-[180px] items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all lg:min-w-0",
              c.id === active.id
                ? "border-primary/40 bg-card shadow-sm"
                : "border-transparent hover:border-border hover:bg-card/70",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                c.id === active.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {c.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-foreground">{c.name}</span>
              <span className="block truncate text-[10px] text-muted-foreground">{c.company}</span>
            </span>
          </button>
        ))}
      </div>

      <div key={active.id} className="animate-fade space-y-4 border-t border-border p-4 lg:border-t">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground">
            {active.initials}
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{active.name}</div>
          <div className="text-[10px] text-muted-foreground">
            {active.role} · {active.company}
          </div>
          <span className="mt-2 inline-block rounded-full bg-accent/30 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent-foreground">
            {active.tier}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-muted-foreground">
              <Activity className="h-3 w-3" /> Health
            </span>
            <span className="font-bold text-foreground">
              {active.health} · {active.healthLabel}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${active.health}%` }}
            />
          </div>
          <div className="mt-2">
            <Sparkline points={active.spark} />
          </div>
        </div>

        <dl className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Lifetime value</dt>
            <dd className="font-semibold text-foreground">{active.lifetimeValue}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Open deals</dt>
            <dd className="font-semibold text-foreground">{active.openDeals}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> Last contact
            </dt>
            <dd className="font-semibold text-foreground">{active.lastContact}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Sentiment</dt>
            <dd className="font-semibold text-foreground">{active.sentiment}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {active.tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[9px] font-medium text-muted-foreground"
            >
              <Building2 className="h-2.5 w-2.5" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
