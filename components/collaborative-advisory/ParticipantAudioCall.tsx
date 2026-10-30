"use client";

import { LiveKitRoom, RoomAudioRenderer, useLocalParticipant, useParticipants } from "@livekit/components-react";
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

function CallControls({ onLeave }: { onLeave: () => void }) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const participants = useParticipants();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-emerald-300">{participants.length} connected to voice call</span>
      <button type="button" onClick={() => void localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs">
        {isMicrophoneEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        {isMicrophoneEnabled ? "Mute call mic" : "Unmute call mic"}
      </button>
      <button type="button" onClick={onLeave}
        className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-3 py-2 text-xs text-red-200">
        <PhoneOff className="h-4 w-4" /> Leave voice call
      </button>
      <RoomAudioRenderer />
    </div>
  );
}

/** Liveblocks shares documents and presence; LiveKit transports human-to-human audio. */
export function ParticipantAudioCall({ sessionId }: { sessionId: string }) {
  const [joined, setJoined] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  useEffect(() => {
    setJoined(false);
    setToken(null);
    setError("");
  }, [sessionId]);

  async function join() {
    if (!serverUrl) {
      setError("Voice call is unavailable: NEXT_PUBLIC_LIVEKIT_URL is not configured.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const identity = crypto.randomUUID();
      const params = new URLSearchParams({ room: `myria-advisory:${sessionId}`, username: identity });
      const response = await fetch(`/api/livekit/token?${params}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not connect to the participant voice call.");
      const data = await response.json() as { token?: string };
      if (!data.token) throw new Error("Voice call token was not returned.");
      setToken(data.token);
      setJoined(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Voice call unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Volume2 className="h-4 w-4 text-cyan-300" /> Participant voice call
      </div>
      <p className="mb-3 text-xs leading-5 text-slate-400">
        Both host and guests must join this call to hear one another. This is separate from the AI advisory microphone.
        Use headphones to prevent feedback.
      </p>
      {joined && token && serverUrl ? (
        <LiveKitRoom token={token} serverUrl={serverUrl} connect={true} audio={true} video={false}
          onDisconnected={() => { setJoined(false); setToken(null); }}
          onError={(err) => setError(err.message)}>
          <CallControls onLeave={() => { setJoined(false); setToken(null); }} />
        </LiveKitRoom>
      ) : (
        <button type="button" onClick={() => void join()} disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-200 disabled:opacity-50">
          <Phone className="h-4 w-4" /> {loading ? "Joining call..." : "Join participant voice call"}
        </button>
      )}
      {error ? <p role="alert" className="mt-2 text-xs text-amber-300">{error}</p> : null}
    </section>
  );
}
