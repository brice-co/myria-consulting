import {
  Mic,
  PhoneOff,
  Sparkles,
  Video,
} from "lucide-react";

import {
  meetingDecisions,
  meetingParticipants,
} from "../data/video-data";

export function VideoWorkspace() {
  return (
    <div className="grid h-full grid-cols-[1fr_230px] bg-[#172d33]">
      <div className="flex flex-col p-5">
        <div className="grid flex-1 grid-cols-2 gap-3">
          {meetingParticipants.map(
            (participant, index) => (
              <div
                key={participant.name}
                className={`flex min-h-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c6a16b] font-serif text-lg text-white">
                    {participant.initials}
                  </div>

                  <div className="mt-2 text-[10px] text-white">
                    {participant.name}
                  </div>

                  <div className="text-[8px] text-white/40">
                    {participant.role}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <button className="rounded-full bg-white/10 p-3 text-white">
            <Mic size={14} />
          </button>

          <button className="rounded-full bg-white/10 p-3 text-white">
            <Video size={14} />
          </button>

          <button className="rounded-full bg-red-500/80 p-3 text-white">
            <PhoneOff size={14} />
          </button>
        </div>
      </div>

      <aside className="bg-white p-4">
        <div className="flex items-center gap-2">
          <Sparkles
            size={13}
            className="text-primary"
          />

          <strong className="text-[10px]">
            Live session intelligence
          </strong>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
          Myria is listening for decisions,
          risks and next steps.
        </p>

        <div className="mt-5">
          <span className="text-[8px] uppercase tracking-wider text-muted-foreground">
            Decisions captured
          </span>

          {meetingDecisions.map((decision) => (
            <div
              key={decision}
              className="mt-2 rounded-lg bg-muted/40 p-2 text-[9px]"
            >
              ✓ {decision}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}