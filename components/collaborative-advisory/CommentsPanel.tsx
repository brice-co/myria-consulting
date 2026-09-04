"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

import type { WorkspaceItem } from "@/lib/collaborative-advisory/types";

export function CommentsPanel({
  item,
  onClose,
}: {
  item: WorkspaceItem | null;
  onClose: () => void;
}) {
  const { threads } = useThreads({
    scrollOnLoad: false,
  });

  if (!item) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-500">
        Select Discuss on any workspace item to open comments.
      </section>
    );
  }

  const related = threads.filter(
    (thread) =>
      thread.metadata.targetId === item.id,
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="text-[10px] uppercase tracking-[.18em] text-slate-600">
            Comments
          </div>

          <div className="mt-1 text-sm font-semibold">
            {item.title}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-xs text-slate-500"
        >
          Close
        </button>
      </div>

      <div className="max-h-[430px] space-y-3 overflow-y-auto p-4">
        {related.map((thread) => (
          <Thread
            key={thread.id}
            thread={thread}
          />
        ))}

        <Composer
          metadata={{
            targetId: item.id,
            targetType: item.category,
          }}
        />
      </div>
    </section>
  );
}