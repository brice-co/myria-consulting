"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Play, RotateCcw, Square } from "lucide-react";

import { Button } from "@/components/ui/button";

import { architectureLayers } from "@/app/resources/architecture/lib/architecture/data/layers";
import { architectureTraces } from "@/app/resources/architecture/lib/architecture/data/traces";
import { STEP_MS } from "@/app/resources/architecture/lib/architecture/constants";

import { ArchitectureTraceList } from "./ArchitectureTraceList";
import { ArchitectureTraceSteps } from "./ArchitectureTraceSteps";

export function ArchitectureTrace() {
  const [traceId, setTraceId] = useState(
    architectureTraces[0]!.id,
  );

  const [stepIdx, setStepIdx] = useState(-1);
  const [running, setRunning] = useState(false);

  const timers = useRef<number[]>([]);

  const trace =
    architectureTraces.find((item) => item.id === traceId) ??
    architectureTraces[0]!;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const resetTrace = () => {
    clearTimers();
    setRunning(false);
    setStepIdx(-1);
  };

  const runTrace = () => {
    clearTimers();

    setRunning(true);
    setStepIdx(0);

    trace.steps.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setStepIdx(index + 1);

        if (index + 1 >= trace.steps.length) {
          setRunning(false);
        }
      }, (index + 1) * STEP_MS);

      timers.current.push(timer);
    });
  };

  const stopTrace = () => {
    clearTimers();
    setRunning(false);
    setStepIdx(-1);
  };

  const selectTrace = (id: string) => {
    resetTrace();
    setTraceId(id);
  };

  const traceDone = stepIdx >= trace.steps.length;

  return (
    <section className="mx-auto max-w-[1440px] px-3 pb-4 md:px-8 md:pb-8">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-command">
        <div className="border-b border-border px-5 py-4 md:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            Trace a decision
          </p>

          <h2 className="mt-1.5 font-display text-2xl font-semibold">
            Watch a request move through the layers
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Pick a scenario, run the trace, and follow each hop through the
            stack.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div className="flex flex-col gap-3 border-b border-border p-5 md:p-7 lg:border-b-0 lg:border-r">
            <ArchitectureTraceList
              traces={architectureTraces}
              activeId={traceId}
              onSelect={selectTrace}
            />

            <div className="mt-auto flex items-center gap-2 pt-2">
              {running ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={stopTrace}
                >
                  <Square />
                  Stop
                </Button>
              ) : traceDone ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetTrace}
                >
                  <RotateCcw />
                  Reset trace
                </Button>
              ) : (
                <Button size="sm" onClick={runTrace}>
                  <Play />
                  Run trace
                </Button>
              )}

              <span className="text-[11px] font-medium text-muted-foreground">
                {running
                  ? `Step ${Math.min(
                      stepIdx + 1,
                      trace.steps.length,
                    )} of ${trace.steps.length}`
                  : traceDone
                    ? "Trace complete"
                    : stepIdx > 0
                      ? "Paused mid-trace"
                      : "Ready to trace"}
              </span>
            </div>
          </div>

          <ArchitectureTraceSteps
            trace={trace}
            layers={architectureLayers}
            stepIndex={stepIdx}
          />
        </div>
      </div>
    </section>
  );
}