import {
  ArrowUp,
  Bot,
  Sparkles,
} from "lucide-react";

import {
  chatActions,
  chatMessages,
} from "../data/chat-data";

export function AIChatWorkspace() {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
          <Bot size={15} />
        </div>

        <div>
          <strong className="block text-xs">
            Myria AI
          </strong>

          <span className="text-[9px] text-muted-foreground">
            Working with your shared context
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-foreground p-3 text-[11px] leading-5 text-background"
                : "max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-white p-4 text-[11px] leading-5"
            }
          >
            {message.role === "assistant" && (
              <Sparkles
                size={12}
                className="mb-2 text-primary"
              />
            )}

            {message.content}
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          {chatActions.map((action) => (
            <button
              key={action}
              className="rounded-full border border-border px-3 py-1.5 text-[9px]"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center rounded-xl border border-border bg-white px-4">
        <input
          className="min-w-0 flex-1 bg-transparent py-3 text-[11px] outline-none"
          placeholder="Ask Myria anything..."
        />

        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
          <ArrowUp size={12} />
        </button>
      </div>
    </div>
  );
}