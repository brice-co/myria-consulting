import { Plus, Sparkles } from "lucide-react";

import { kanbanColumns } from "../data/kanban-data";

export function KanbanWorkspace() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 bg-[#f7f6f2] p-5">
      {kanbanColumns.map((column, columnIndex) => (
        <section
          key={column.title}
          className="rounded-xl bg-[#efeee9] p-3"
        >
          <header className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <strong className="text-[10px]">
                {column.title}
              </strong>

              <span className="rounded-full bg-white px-1.5 py-0.5 text-[8px]">
                {column.cards.length}
              </span>
            </div>

            <Plus size={12} />
          </header>

          <div className="space-y-2">
            {column.cards.map((card, index) => (
              <div
                key={card}
                className="rounded-lg border border-border bg-white p-3 shadow-sm"
              >
                <div className="flex justify-between gap-2">
                  <strong className="text-[10px]">
                    {card}
                  </strong>

                  {columnIndex === 1 &&
                    index === 1 && (
                      <Sparkles
                        size={11}
                        className="shrink-0 text-primary"
                      />
                    )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded bg-primary/10 px-1.5 py-1 text-[7px] text-primary">
                    {index === 0
                      ? "AI"
                      : "Strategy"}
                  </span>

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#718096] text-[6px] text-white">
                    MH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}