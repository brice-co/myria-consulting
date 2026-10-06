import {
  MoreHorizontal,
  Share2,
  Sparkles,
} from "lucide-react";

import { ParticipantStack } from "./participant-stack";

export function WorkspaceHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
          <span className="font-serif text-lg">M</span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <strong className="text-xs">
              Transformation Workspace
            </strong>

            <span className="flex items-center gap-1 text-[9px] text-primary">
              <Sparkles size={9} />
              AI active
            </span>
          </div>

          <span className="text-[9px] text-muted-foreground">
            Myria OS · Strategy & Operations
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ParticipantStack />

        <button
          type="button"
          className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-[10px] font-medium sm:flex"
        >
          <Share2 size={12} />
          Share
        </button>

        <button
          type="button"
          className="text-muted-foreground"
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
    </header>
  );
}