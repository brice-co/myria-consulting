"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import type { Customer, Message } from "./lib/customers";
import { cn } from "@/lib/utils";

const suggestions = [
  "Summarize this thread",
  "Draft a reply",
  "Flag for follow-up",
];

export function ConversationPanel({ customer }: { customer: Customer }) {
  const [shown, setShown] = useState(0);
  const [extra, setExtra] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShown(0);
    setExtra([]);
    setDraft("");
    setTyping(false);
  }, [customer.id]);

  useEffect(() => {
    if (shown >= customer.messages.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 250 : 550);
    return () => clearTimeout(t);
  }, [shown, customer.messages.length]);

  const messages = [...customer.messages.slice(0, shown), ...extra];

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setExtra((e) => [
      ...e,
      { from: "agent", author: "You", time: "Now", channel: "Chat", text: clean },
    ]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setExtra((e) => [
        ...e,
        {
          from: "customer",
          author: customer.name,
          time: "Now",
          channel: "Chat",
          text: `Thanks — noted. I'll loop in my team at ${customer.company} and come back to you shortly.`,
        },
      ]);
    }, 1600);
  }

  return (
    <div className="flex min-h-[460px] flex-col border-b border-border lg:border-b-0">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <MessageSquare className="h-3 w-3" /> Conversation
        </div>
        <div className="text-[10px] text-muted-foreground">{messages.length} messages</div>
      </div>

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("animate-rise flex", m.from === "agent" ? "justify-end" : "justify-start")}
          >
            <div className="max-w-[80%]">
              <div
                className={cn(
                  "flex items-center gap-2 text-[9px] uppercase tracking-wider text-muted-foreground",
                  m.from === "agent" && "justify-end",
                )}
              >
                <span className="font-semibold">{m.author}</span>
                <span>{m.channel}</span>
                <span>{m.time}</span>
              </div>
              <div
                className={cn(
                  "mt-1 rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed",
                  m.from === "agent"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border bg-secondary text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-secondary px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border px-5 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Sparkles className="h-2.5 w-2.5" />
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 focus-within:border-primary/50"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Reply to ${customer.name.split(" ")[0]}…`}
            className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-85"
            aria-label="Send reply"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
