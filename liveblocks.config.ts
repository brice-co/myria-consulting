import type { LiveList } from "@liveblocks/client";
import type { WorkspaceItem } from "@/lib/collaborative-advisory/types";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth", // We will build this secure endpoint next
});

// Define the shape of our collaborative shared storage
type Storage = {
  messages: any[]; // Syncs array logs dynamically across clients
};

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
      info: { name?: string; email?:string; avatar?: string };
    };
    ThreadMetadata: {
      targetId: string; 
      targetType: "insight" | "opportunity" | "decision" | "action" | "workspace";
    };
    CommentMetadata: {};
  }
}

export const {
  RoomProvider,
  useStorage,
  useMutation,
  useSelf,
  useOthers,
} = createRoomContext<{}, {}, {}, Storage>(client);
