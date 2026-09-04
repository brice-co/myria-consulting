import { Sparkles } from "lucide-react";
import { SPECIALISTS } from "@/lib/virtual-advisory-team/config";
import type { TeamMode } from "@/lib/virtual-advisory-team/types";
import { SpecialistCard } from "./SpecialistCard";

type Props = {
  mode: TeamMode;
  disabled: boolean;
  onModeChange: (mode: TeamMode) => void;
};

export function TeamSelector({ mode, disabled, onModeChange }: Props) {
  return (
    <section>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onModeChange("team")}
        className={[
          "w-full rounded-3xl border p-6 text-left transition",
          mode === "team"
            ? "border-indigo-400/50 bg-gradient-to-r from-indigo-500/[0.10] to-cyan-400/[0.08]"
            : "border-white/10 bg-white/[0.035] hover:border-white/20",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-blue-500/10">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Orchestrated Advisory
            </div>
            <h2 className="mt-1 text-xl font-semibold">Ask the Advisory Team</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Describe one business challenge. Myria will frame the issue and bring in the smallest useful combination of specialists.
            </p>
          </div>
        </div>
      </button>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {SPECIALISTS.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            selected={mode === specialist.id}
            onSelect={() => onModeChange(specialist.id)}
          />
        ))}
      </div>
    </section>
  );
}
