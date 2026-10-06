import type { ArchitectureTrace } from "@/app/resources/architecture/lib/architecture/types";

type Props = {
  traces: ArchitectureTrace[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ArchitectureTraceList({
  traces,
  activeId,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {traces.map((trace) => {
        const Icon = trace.icon;
        const active = trace.id === activeId;

        return (
          <button
            key={trace.id}
            type="button"
            onClick={() => onSelect(trace.id)}
            aria-pressed={active}
            className={`flex items-start gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
              active
                ? "border-primary/50 bg-secondary"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            }`}
          >
            <span
              className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-md ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="size-3.5" />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-semibold">
                {trace.name}
              </span>

              <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                {trace.summary}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}