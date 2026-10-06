import {
  Bold,
  Italic,
  List,
  MessageSquare,
} from "lucide-react";

import {
  documentSections,
  documentSuggestion,
} from "../data/document-data";
import { AIAssistantCard } from "@/experience/collaborative-workspace/ai-assistant-card";

export function DocumentWorkspace() {
  return (
    <div className="grid h-full grid-cols-[1fr_220px]">
      <div className="p-6">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-4 py-2 text-muted-foreground">
            <Bold size={13} />
            <Italic size={13} />
            <List size={13} />

            <span className="h-4 w-px bg-border" />

            <MessageSquare size={13} />
          </div>

          <article className="p-7">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary">
              Working document
            </span>

            <h3 className="mt-2 font-serif text-2xl">
              Operating Model Transformation
            </h3>

            {documentSections.map((section) => (
              <div
                key={section.title}
                className="mt-6"
              >
                <h4 className="text-xs font-semibold">
                  {section.title}
                </h4>

                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {section.text}
                </p>
              </div>
            ))}

            <div className="relative mt-6 rounded border-l-2 border-primary bg-primary/5 px-4 py-3">
              <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#6F948C] text-[7px] text-white">
                SC
              </span>

              <p className="text-xs leading-5">
                We should also consider how approvals
                affect customer response time.
              </p>
            </div>
          </article>
        </div>
      </div>

      <aside className="border-l border-border bg-card/60 p-4">
        <AIAssistantCard>
          <strong className="text-foreground">
            {documentSuggestion.title}
          </strong>

          <p className="mt-2">
            {documentSuggestion.text}
          </p>

          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-primary px-2 py-1 text-[9px] text-primary-foreground">
              Apply
            </button>

            <button className="rounded-md border px-2 py-1 text-[9px]">
              Discuss
            </button>
          </div>
        </AIAssistantCard>
      </aside>
    </div>
  );
}