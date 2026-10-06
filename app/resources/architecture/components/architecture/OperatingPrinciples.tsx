import { Network } from "lucide-react";

import { operatingPrinciples } from "@/app/resources/architecture/lib/architecture/data/principles";

export function OperatingPrinciples() {
  return (
    <section className="mx-auto max-w-[1440px] px-3 pb-10 md:px-8 md:pb-14">
      <div className="rounded-lg border border-border bg-sidebar p-5 md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          Operating principles
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {operatingPrinciples.map((principle) => (
            <div
              key={principle.n}
              className="border-l-2 border-primary/30 pl-3"
            >
              <p className="font-mono text-[10px] text-muted-foreground">
                {principle.n}
              </p>

              <p className="mt-1.5 text-sm font-semibold leading-5">
                {principle.title}
              </p>

              <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">
                {principle.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-[11px] text-muted-foreground">
          <Network className="size-3.5 text-primary" />

          This architecture mirrors how Myria OS itself is built — the command
          center, agents, approvals and workflows you see elsewhere are the
          layers above, working.
        </div>
      </div>
    </section>
  );
}