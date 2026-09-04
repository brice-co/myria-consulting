import type { LiveList } from "@liveblocks/client";
import type { WorkspaceItem } from "@/lib/collaborative-advisory/types";

declare global {
  interface Liveblocks {
    Presence: {
      name: string;
      role: string;
      selectedItemId: string | null;
      speaking: boolean;
    };
    Storage: {
      insights: LiveList<WorkspaceItem>;
      opportunities: LiveList<WorkspaceItem>;
      decisions: LiveList<WorkspaceItem>;
      actions: LiveList<WorkspaceItem>;
    };
    UserMeta: {
      id: string;
      info: { name?: string; avatar?: string };
    };
    ThreadMetadata: {
      targetId: string;
      targetType: "insight" | "opportunity" | "decision" | "action" | "workspace";
    };
    CommentMetadata: {};
  }
}

export {};
