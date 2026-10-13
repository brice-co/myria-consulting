"use client";

import { LABS, type LabId } from "../../constants/labs";

type Props = {
  preferences: LabId[];
  onToggle: (labId: LabId) => void;
};

export function LabSelection({ preferences, onToggle }: Props) {
  return (
    <section aria-label="Rank your two Labs" className="space-y-4">
      <div>
        <h2 className="font-serif text-3xl text-[#12313a]">Choose your two Labs.</h2>
        <p className="mt-2 text-sm text-[#5f6b6f]">
          Select in priority order. Your first selection is your first choice.
        </p>
        <p className="mt-3 text-xs font-semibold text-[#b9802c]">
          {preferences.length} of 2 selected
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {LABS.map((lab) => {
          const position = preferences.indexOf(lab.id);
          const selected = position !== -1;

          return (
            <button
              key={lab.id}
              type="button"
              aria-pressed={selected}
              disabled={!selected && preferences.length === 3}
              onClick={() => onToggle(lab.id)}
              className={`rounded-2xl border p-4 text-left transition disabled:opacity-45 ${
                selected
                  ? "border-[#b9802c] bg-[#fbf4e8]"
                  : "border-[#ded8cb] hover:border-[#b9802c]"
              }`}
            >
              <span className="text-xs font-semibold text-[#b9802c]">
                {selected ? `Choice ${position + 1}` : "Select Lab"}
              </span>
              <span className="mt-2 block font-semibold text-[#12313a]">{lab.title}</span>
              <span className="mt-1 block text-xs leading-5 text-[#5f6b6f]">
                {lab.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
