import { Plus } from "lucide-react";

import { participants } from "./data/participants";

export function ParticipantStack() {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            title={`${participant.name} — ${participant.role}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-[9px] font-semibold text-white"
            style={{
              backgroundColor: participant.color,
            }}
          >
            {participant.initials}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}