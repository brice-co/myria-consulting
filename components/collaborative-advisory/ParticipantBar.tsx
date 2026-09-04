"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { UserRoundPen, Users } from "lucide-react";
import { useEffect, useState } from "react";

const PROFILE_KEY = "myria:collaborative-advisory:participant-profile";

export function ParticipantBar() {
  const others = useOthers();
  const [presence, updatePresence] = useMyPresence();
  const [editing, setEditing] = useState(presence.name === "Guest");
  const [name, setName] = useState(presence.name);
  const [role, setRole] = useState(presence.role);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PROFILE_KEY);
      if (!stored) return;

      const profile = JSON.parse(stored) as { name?: string; role?: string };
      const savedName = profile.name?.trim();
      const savedRole = profile.role?.trim();

      if (savedName) {
        updatePresence({
          name: savedName,
          role: savedRole || "Participant",
        });
        setName(savedName);
        setRole(savedRole || "Participant");
        setEditing(false);
      }
    } catch {
      // Ignore malformed local prototype profile data.
    }
  }, [updatePresence]);

  const participants = [
    {
      id: "self",
      name: presence.name || "Guest",
      role: presence.role || "Participant",
      self: true,
    },
    ...others.map((other) => ({
      id: String(other.connectionId),
      name: other.presence.name || "Guest",
      role: other.presence.role || "Participant",
      self: false,
    })),
  ];

  function saveProfile() {
    const nextName = name.trim() || "Guest";
    const nextRole = role.trim() || "Participant";

    updatePresence({ name: nextName, role: nextRole });

    if (nextName !== "Guest") {
      window.localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({ name: nextName, role: nextRole }),
      );
    }

    setEditing(false);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              Participants
              <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-cyan-300">
                {participants.length}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Everyone opening this same session URL joins this Liveblocks room.
            </div>
          </div>
        </div>

        {participants.map((participant) => (
          <div
            key={participant.id}
            className="rounded-full border border-white/10 bg-black/10 px-3 py-2"
            title={`${participant.name} · ${participant.role}`}
          >
            <div className="text-[11px] font-semibold text-slate-200">
              {participant.name}
              {participant.self ? " · You" : ""}
            </div>
            <div className="text-[9px] text-slate-600">{participant.role}</div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[11px] text-slate-400 transition hover:border-cyan-400/30 hover:text-white"
        >
          <UserRoundPen className="h-3.5 w-3.5" />
          {presence.name === "Guest" ? "Set name & role" : "Edit profile"}
        </button>
      </div>

      {editing ? (
        <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1fr_1fr_auto]">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-cyan-400/30"
            placeholder="Your name"
          />
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") saveProfile();
            }}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-cyan-400/30"
            placeholder="Role / perspective"
          />
          <button
            type="button"
            onClick={saveProfile}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black"
          >
            Save participant
          </button>
        </div>
      ) : null}
    </section>
  );
}
