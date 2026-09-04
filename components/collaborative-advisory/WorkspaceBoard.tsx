"use client";

import { LiveList } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { Check, MessageSquare, Plus, X } from "lucide-react";
import { useState } from "react";

import type {
  WorkspaceCategory,
  WorkspaceItem,
} from "@/lib/collaborative-advisory/types";

const columns = [
  ["insight", "Insights", "insights"],
  ["opportunity", "Opportunities", "opportunities"],
  ["decision", "Decisions", "decisions"],
  ["action", "Actions", "actions"],
] as const;

type StorageKey = (typeof columns)[number][2];

type Props = {
  onDiscuss: (item: WorkspaceItem) => void;
  onItemAdded?: (item: WorkspaceItem) => void;
  onItemConfirmed?: (item: WorkspaceItem) => void;
};

function storageKey(category: WorkspaceCategory): StorageKey {
  if (category === "insight") return "insights";
  if (category === "opportunity") return "opportunities";
  if (category === "decision") return "decisions";
  return "actions";
}

export function WorkspaceBoard({
  onDiscuss,
  onItemAdded,
  onItemConfirmed,
}: Props) {
  // Liveblocks returns immutable storage snapshots here. Explicit casts keep this
  // component compatible even when the app's global Liveblocks types are not
  // picked up by the consuming project's tsconfig.
  const insights = useStorage((root) => root.insights) as unknown as readonly WorkspaceItem[];
  const opportunities = useStorage((root) => root.opportunities) as unknown as readonly WorkspaceItem[];
  const decisions = useStorage((root) => root.decisions) as unknown as readonly WorkspaceItem[];
  const actions = useStorage((root) => root.actions) as unknown as readonly WorkspaceItem[];

  const [draftType, setDraftType] = useState<WorkspaceCategory | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const data: Record<StorageKey, readonly WorkspaceItem[]> = {
    insights: insights ?? [],
    opportunities: opportunities ?? [],
    decisions: decisions ?? [],
    actions: actions ?? [],
  };

  const add = useMutation(({ storage }, item: WorkspaceItem) => {
    const list = storage.get(storageKey(item.category)) as unknown as LiveList<WorkspaceItem>;
    if (list.findIndex((current) => current.id === item.id) === -1) {
      list.push(item);
    }
  }, []);

  const confirm = useMutation(({ storage }, item: WorkspaceItem) => {
    const list = storage.get(storageKey(item.category)) as unknown as LiveList<WorkspaceItem>;
    const index = list.findIndex((current) => current.id === item.id);
    if (index < 0) return;

    const current = list.get(index);
    if (!current) return;

    list.set(index, { ...current, status: "confirmed" });
  }, []);

  function closeDraft() {
    setDraftType(null);
    setTitle("");
    setDescription("");
  }

  function handleAdd() {
    if (!draftType || !title.trim()) return;

    const item: WorkspaceItem = {
      id: crypto.randomUUID(),
      category: draftType,
      title: title.trim(),
      description: description.trim(),
      status: "captured",
      source: "participant",
      createdAt: Date.now(),
    };

    add(item);
    onItemAdded?.(item);
    closeDraft();
  }

  function handleConfirm(item: WorkspaceItem) {
    confirm(item);
    onItemConfirmed?.({ ...item, status: "confirmed" });
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[10px] uppercase tracking-[.18em] text-slate-600">
          Shared Workspace
        </div>
        <div className="mt-1 text-sm font-semibold">
          Insights · Opportunities · Decisions · Actions
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          Participants can add items directly. AI-captured items appear as Needs Validation until someone confirms them.
        </div>
      </div>

      <div className="grid gap-3 p-4 xl:grid-cols-4">
        {columns.map(([category, label, key]) => {
          const items = data[key];

          return (
            <div
              key={category}
              className="min-h-[320px] rounded-2xl border border-white/10 bg-black/10 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold">{label}</div>
                  <div className="text-[10px] text-slate-600">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Add ${label.toLowerCase()}`}
                  title={`Add ${label.toLowerCase()}`}
                  onClick={() => setDraftType(category)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {items.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => setDraftType(category)}
                    className="w-full rounded-xl border border-dashed border-white/10 p-4 text-left text-[10px] leading-5 text-slate-600 transition hover:border-cyan-400/20 hover:text-slate-400"
                  >
                    No {label.toLowerCase()} yet. Add one or let the advisory team capture it during the session.
                  </button>
                ) : null}

                {items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
                  >
                    <div className="flex justify-between gap-2">
                      <h3 className="text-xs font-semibold">{item.title}</h3>
                      <span className="text-[8px] uppercase text-slate-600">
                        {item.source}
                      </span>
                    </div>

                    {item.description ? (
                      <p className="mt-2 text-[11px] leading-5 text-slate-500">
                        {item.description}
                      </p>
                    ) : null}

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`text-[9px] uppercase ${
                          item.status === "confirmed"
                            ? "text-emerald-300"
                            : item.status === "needs-validation"
                              ? "text-amber-300"
                              : "text-slate-400"
                        }`}
                      >
                        {item.status.replace("-", " ")}
                      </span>

                      <div className="flex gap-1">
                        {item.status !== "confirmed" ? (
                          <button
                            type="button"
                            title="Confirm"
                            onClick={() => handleConfirm(item)}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-emerald-300"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        ) : null}

                        <button
                          type="button"
                          title="Discuss"
                          onClick={() => onDiscuss(item)}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:text-cyan-300"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {draftType ? (
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold capitalize">
              Add {draftType}
            </div>
            <button
              type="button"
              onClick={closeDraft}
              className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-slate-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[.75fr_1.25fr_auto]">
            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-cyan-400/30"
            />
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAdd();
              }}
              placeholder="Description / supporting context"
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-cyan-400/30"
            />
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!title.trim()}
                onClick={handleAdd}
                className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to workspace
              </button>
              <button
                type="button"
                onClick={closeDraft}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
