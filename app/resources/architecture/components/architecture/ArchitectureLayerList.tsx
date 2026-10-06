import type { ArchitectureLayer } from "@/app/resources/architecture/lib/architecture/types";

type Props = {
  layers: ArchitectureLayer[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ArchitectureLayerList({
  layers,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <div
      className="border-b border-border p-3 lg:border-b-0 lg:border-r"
      aria-label="Architecture layers"
    >
      <div className="flex flex-col gap-2">
        {layers.map((item, index) => {
          const Icon = item.icon;
          const active = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-pressed={active}
              className={`grid w-full grid-cols-[34px_1fr] items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-primary/50 bg-secondary"
                  : "border-border hover:border-primary/30 hover:bg-secondary/50"
              }`}
            >
              <span
                className={`font-mono text-[10px] ${
                  active
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.index}
              </span>

              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-md ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                </span>

                <span className="min-w-0">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      active ? "" : "text-foreground/80"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span className="block truncate text-[11px] text-muted-foreground">
                    {item.tag}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}