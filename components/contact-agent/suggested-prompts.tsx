type Props = { prompts: readonly string[]; disabled: boolean; onChoose: (prompt: string) => void };

export function SuggestedPrompts({ prompts, disabled, onChoose }: Props) {
  return (
    <div className="border-t border-[#17313a]/8 px-5 py-4 sm:px-6">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6a38]">Conversation starters</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" disabled={disabled} onClick={() => onChoose(prompt)}
            className="rounded-full border border-[#17313a]/10 bg-white/50 px-3 py-2 text-left text-xs text-[#526368] transition hover:border-[#b57b2a]/40 hover:bg-white disabled:opacity-40">
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
