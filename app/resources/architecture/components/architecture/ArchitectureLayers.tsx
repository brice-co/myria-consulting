"use client";

import { useState } from "react";

import { architectureLayers } from "@/app/resources/architecture/lib/architecture/data/layers";

import { ArchitectureLayerList } from "./ArchitectureLayerList";
import { ArchitectureLayerDetails } from "./ArchitectureLayerDetails";

export function ArchitectureLayers() {
  const [layerIdx, setLayerIdx] = useState(0);

  const layer =
    architectureLayers[layerIdx] ?? architectureLayers[0]!;

  return (
    <section className="mx-auto max-w-[1440px] px-3 py-4 md:px-8 md:py-8">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-command">
        <div className="border-b border-border px-5 py-4 md:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            Build in layers
          </p>

          <h2 className="mt-1.5 font-display text-2xl font-semibold">
            One system, six layers
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Select a layer to see what it holds and the patterns that keep it
            production-grade.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <ArchitectureLayerList
            layers={architectureLayers}
            activeIndex={layerIdx}
            onSelect={setLayerIdx}
          />

          <ArchitectureLayerDetails layer={layer} />
        </div>
      </div>
    </section>
  );
}