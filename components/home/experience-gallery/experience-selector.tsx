"use client";

import { ArrowUpRight } from "lucide-react";

import type { ExperienceItem } from "./types/experience";

interface Props {
  experiences: ExperienceItem[];
  selectedIndex: number;
  progress: number;
  onSelect: (index: number) => void;
}

export function ExperienceSelector({
  experiences,
  selectedIndex,
  progress,
  onSelect,
}: Props) {
  return (
    <div className="border-t border-border">
      {experiences.map((item, index) => {
        const active =
          index === selectedIndex;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            className="group relative block w-full border-b border-border py-5 text-left"
          >
            <div className="grid grid-cols-[38px_1fr_24px] gap-3">
              <span
                className={`font-mono text-[8px] tracking-[0.16em] transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground/60"
                }`}
              >
                {item.number}
              </span>

              <div>
                <span
                  className={`font-mono text-[8px] uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.tag}
                </span>

                <h3
                  className={`mt-2 font-serif text-xl leading-tight tracking-[-0.025em] transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </h3>

                <div
                  className={`grid transition-all duration-500 ${
                    active
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-md text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <ArrowUpRight
                size={13}
                className={`mt-5 transition-all duration-300 ${
                  active
                    ? "translate-x-0 text-primary opacity-100"
                    : "-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                }`}
              />
            </div>

            {active && (
              <div className="absolute bottom-[-1px] left-0 h-px w-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}