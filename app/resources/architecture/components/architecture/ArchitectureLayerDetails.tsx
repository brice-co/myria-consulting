import type { ArchitectureLayer } from "@/app/resources/architecture/lib/architecture/types";

type Props = {
  layer: ArchitectureLayer;
};

export function ArchitectureLayerDetails({ layer }: Props) {
  return (
    <div className="min-w-0 p-5 md:p-7">
      <div
        key={layer.id}
        className="animate-in fade-in slide-in-from-right-2 duration-200"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
          {layer.index} · {layer.name}
        </p>

        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
          {layer.tag}
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {layer.role}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {layer.holds.map((hold) => (
            <span
              key={hold}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {hold}
            </span>
          ))}
        </div>

        <div className="mt-6 divide-y divide-border border-y border-border">
          {layer.patterns.map((pattern, index) => (
            <div
              key={pattern.name}
              className="grid grid-cols-[26px_1fr] gap-3 py-3"
            >
              <span className="pt-1 font-mono text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <p className="text-sm font-semibold">
                  {pattern.name}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {pattern.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}