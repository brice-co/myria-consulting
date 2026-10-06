"use client";

import { useState } from "react";

import { architecturePatternTabs } from "@/app/resources/architecture/lib/architecture/data/pattern-tabs";

import { ArchitecturePatternTabs } from "./ArchitecturePatternTabs";
import { ArchitecturePatternCard } from "./ArchitecturePatternCard";

export function ArchitecturePatterns() {
  const [tab, setTab] = useState(
    architecturePatternTabs[0]!.id,
  );

  const [openPattern, setOpenPattern] = useState<string | null>(
    null,
  );

  const activeTab =
    architecturePatternTabs.find((item) => item.id === tab) ??
    architecturePatternTabs[0]!;

  const selectTab = (id: string) => {
    setTab(id);
    setOpenPattern(null);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-3 pb-4 md:px-8 md:pb-8">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-command">
        <div className="border-b border-border px-5 py-4 md:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            Pattern library
          </p>

          <h2 className="mt-1.5 font-display text-2xl font-semibold">
            Practical patterns, by discipline
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Select a discipline, then expand any pattern for the practice
            behind it.
          </p>
        </div>

        <div className="p-5 md:p-7">
          <ArchitecturePatternTabs
            tabs={architecturePatternTabs}
            activeId={activeTab.id}
            onSelect={selectTab}
          />

          <div
            key={activeTab.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-200"
          >
            <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
              {activeTab.intro}
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {activeTab.patterns.map((pattern) => (
                <ArchitecturePatternCard
                  key={pattern.name}
                  pattern={pattern}
                  open={openPattern === pattern.name}
                  onToggle={() =>
                    setOpenPattern(
                      openPattern === pattern.name
                        ? null
                        : pattern.name,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}