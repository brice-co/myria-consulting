import { ChevronDown } from "lucide-react";

import type { ArchitecturePattern } from "@/app/resources/architecture/lib/architecture/types";

type Props = {
  pattern: ArchitecturePattern;
  open: boolean;
  onToggle: () => void;
};

export function ArchitecturePatternCard({
  pattern,
  open,
  onToggle,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="rounded-md border border-border bg-background p-4 text-left transition-colors hover:border-primary/40"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">
          {pattern.name}
        </p>

        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <p
        className={`mt-2 text-xs leading-5 text-muted-foreground ${
          open ? "" : "line-clamp-2"
        }`}
      >
        {pattern.detail}
      </p>
    </button>
  );
}