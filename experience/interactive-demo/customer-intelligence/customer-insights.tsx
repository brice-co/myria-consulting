"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Brain, Check, TriangleAlert } from "lucide-react";
import type { Customer } from "./lib/customers";
import { cn } from "@/lib/utils";

const toneStyles = {
  opportunity: "border-l-primary",
  risk: "border-l-destructive",
  neutral: "border-l-accent",
} as const;

export function CustomerInsights({ customer }: { customer: Customer }) {
  const [open, setOpen] = useState<number | null>(0);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setOpen(0);
    setDone([]);
  }, [customer.id]);

  return (
    <aside className="flex flex-col bg-secondary/40 lg:border-l lg:border-border">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Brain className="h-3 w-3" /> AI insights
        </div>
      </div>

      <div key={customer.id} className="animate-fade flex-1 space-y-2 overflow-y-auto p-3">
        {customer.insights.map((ins, i) => (
          <button
            key={ins.label}
            onClick={() => setOpen(open === i ? null : i)}
            className={cn(
              "w-full rounded-xl border border-l-2 border-border bg-card p-3 text-left transition-all hover:shadow-sm",
              toneStyles[ins.tone],
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                {ins.tone === "risk" && <TriangleAlert className="h-3 w-3 text-destructive" />}
                {ins.tone === "opportunity" && <ArrowUpRight className="h-3 w-3 text-primary" />}
                {ins.label}
              </span>
              <span className="shrink-0 text-[9px] font-bold text-muted-foreground">
                {ins.confidence}%
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  ins.tone === "risk" ? "bg-destructive" : "bg-primary",
                )}
                style={{ width: `${ins.confidence}%` }}
              />
            </div>
            {open === i && (
              <p className="animate-fade mt-2 text-[10.5px] leading-relaxed text-muted-foreground">
                {ins.detail}
              </p>
            )}
          </button>
        ))}

        <div className="pt-2">
          <div className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Recommended actions
          </div>
          <div className="mt-2 space-y-1.5">
            {customer.nextActions.map((a) => {
              const checked = done.includes(a);
              return (
                <button
                  key={a}
                  onClick={() =>
                    setDone((d) => (d.includes(a) ? d.filter((x) => x !== a) : [...d, a]))
                  }
                  className="flex w-full items-start gap-2 rounded-lg border border-border bg-card p-2.5 text-left transition-colors hover:border-primary/40"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors",
                      checked ? "border-primary bg-primary" : "border-border",
                    )}
                  >
                    {checked && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] leading-snug",
                      checked ? "text-muted-foreground line-through" : "text-foreground",
                    )}
                  >
                    {a}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
