import { Check } from "lucide-react";

import type {
  ArchitectureLayer,
  ArchitectureTrace,
} from "@/app/resources/architecture/lib/architecture/types";

type Props = {
  trace: ArchitectureTrace;
  layers: ArchitectureLayer[];
  stepIndex: number;
};

export function ArchitectureTraceSteps({
  trace,
  layers,
  stepIndex,
}: Props) {
  return (
    <div className="min-w-0 p-5 md:p-7">
      <ol className="relative">
        <div
          className="absolute bottom-4 left-[13px] top-4 w-px bg-border"
          aria-hidden="true"
        />

        {trace.steps.map((step, index) => {
          const done = stepIndex > index;
          const active = stepIndex === index;

          const layerMeta = layers.find(
            (layer) => layer.id === step.layer,
          );

          return (
            <li
              key={step.label}
              className="relative grid grid-cols-[27px_1fr] gap-3 py-2.5"
            >
              <span
                className={`relative z-10 mt-0.5 grid size-[27px] place-items-center rounded-full border text-[10px] font-semibold transition-colors ${
                  done
                    ? "border-success bg-success text-success-foreground"
                    : active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <Check className="size-3.5" />
                ) : (
                  index + 1
                )}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`text-sm font-semibold ${
                      stepIndex >= 0 &&
                      !done &&
                      !active
                        ? "text-foreground/50"
                        : ""
                    }`}
                  >
                    {step.label}
                  </p>

                  {layerMeta && (
                    <span className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-secondary-foreground">
                      {layerMeta.index}
                    </span>
                  )}
                </div>

                {(done || active) && (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {step.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}