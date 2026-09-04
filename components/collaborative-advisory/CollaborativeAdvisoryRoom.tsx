"use client";

import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { CollaborativeAdvisoryWorkspace } from "./CollaborativeAdvisoryWorkspace";

export function CollaborativeAdvisoryRoom({ sessionId }: { sessionId: string }) {
  const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

  if (!publicKey) {
    return <div className="mx-auto max-w-xl p-10 text-slate-300">Add NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY to run this prototype.</div>;
  }

  return (
    <LiveblocksProvider publicApiKey={publicKey}>
      <RoomProvider
        id={`myria-advisory:${sessionId}`}
        initialPresence={{ name: "Guest", role: "Participant", selectedItemId: null, speaking: false }}
        initialStorage={{
          insights: new LiveList([]),
          opportunities: new LiveList([]),
          decisions: new LiveList([]),
          actions: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<div className="grid min-h-screen place-items-center text-sm text-slate-500">Joining workspace...</div>}>
          <CollaborativeAdvisoryWorkspace sessionId={sessionId} />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
