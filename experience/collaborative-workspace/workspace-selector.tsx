"use client";

import { motion } from "framer-motion";

import { workspaceOptions } from "./data/workspace-options";
import type { WorkspaceType } from "./types/workspace";

type Props = {
  active: WorkspaceType;
  onChange: (workspace: WorkspaceType) => void;
};

export function WorkspaceSelector({
  active,
  onChange,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="mx-auto flex min-w-max items-center justify-center gap-1 rounded-2xl border border-border bg-background/80 p-1.5">
        {workspaceOptions.map((option) => {
          const Icon = option.icon;
          const selected = active === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium"
            >
              {selected && (
                <motion.span
                  layoutId="workspace-selector"
                  className="absolute inset-0 rounded-xl bg-foreground"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              <Icon
                size={15}
                className={`relative z-10 ${
                  selected
                    ? "text-background"
                    : "text-muted-foreground"
                }`}
              />

              <span
                className={`relative z-10 ${
                  selected
                    ? "text-background"
                    : "text-muted-foreground"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}