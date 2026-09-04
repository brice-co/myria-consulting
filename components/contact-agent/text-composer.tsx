"use client";

import { FormEvent, useState } from "react";
import { ArrowUp } from "lucide-react";

type Props = { disabled: boolean; onSend: (message: string) => void };

export function TextComposer({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;
    onSend(message);
    setValue("");
  }

  return (
    <form onSubmit={submit} className="relative">
      <input value={value} onChange={(event) => setValue(event.target.value)} disabled={disabled}
        placeholder={disabled ? "Start the conversation to type or speak…" : "Type a message…"}
        className="w-full rounded-full border border-[#17313a]/12 bg-white/65 py-3 pl-5 pr-12 text-sm outline-none transition placeholder:text-[#8c9698] focus:border-[#5d8f88]/50 disabled:opacity-60" />
      <button type="submit" disabled={disabled || !value.trim()} aria-label="Send message"
        className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#17313a] text-white transition hover:scale-105 disabled:opacity-30">
        <ArrowUp className="h-4 w-4" />
      </button>
    </form>
  );
}
