import { ArrowLeft, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ArchitectureHero() {
  return (
    <section className="overflow-hidden border-b border-border/70 bg-hero">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-5 md:px-8 md:pb-16">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Layers className="size-4" />
            </div>

            <div>
              <p className="font-display text-lg font-semibold">
                Myria OS
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Architecture
              </p>
            </div>
          </div>

          <Button asChild variant="outline" size="sm">
            <a href="/experience/myria-os" className="inline-flex items-center gap-2">
              <ArrowLeft />
              Myria OS 
            </a>
          </Button>
        </header>

        <div className="mt-14 max-w-4xl md:mt-20">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Architecture
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.04] md:text-6xl">
            Architecture for intelligent
            <br />
            operating environments.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Practical patterns for agents, machine learning, realtime
            collaboration, workflows and production AI systems — built in
            layers that people can see, change and trust.
          </p>
        </div>
      </div>
    </section>
  );
}