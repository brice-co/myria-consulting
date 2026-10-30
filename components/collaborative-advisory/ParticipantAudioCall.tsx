"use client";

import {
  LiveKitRoom, RoomAudioRenderer, VideoTrack, useLocalParticipant,
  useParticipants, useRoomContext, useTracks,
} from "@livekit/components-react";
import { Track, RoomEvent, type Participant } from "livekit-client";
import { Camera, CameraOff, Hand, Mic, MicOff, MonitorUp, Phone, PhoneOff, Users, Volume2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HAND_TOPIC = "myria-hand";
const ADVISORY_SPEECH_TOPIC = "myria-advisory-speech";
type SpeechEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>>; resultIndex: number };
type Recognition = { continuous: boolean; interimResults: boolean; lang: string; onresult: ((event: SpeechEvent) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start: () => void; stop: () => void };
type RecognitionConstructor = new () => Recognition;

const decoder = new TextDecoder();
const encoder = new TextEncoder();

function ConferenceStage({ onLeave, onGuestSpeech }: { onLeave: () => void; onGuestSpeech: (speaker: string, text: string) => void }) {
  const room = useRoomContext();
  const participants = useParticipants();
  const { localParticipant, isMicrophoneEnabled, isCameraEnabled, isScreenShareEnabled } = useLocalParticipant();
  const [hands, setHands] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [sharingSpeech, setSharingSpeech] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
  const guestSpeechRef = useRef(onGuestSpeech);
  useEffect(() => { guestSpeechRef.current = onGuestSpeech; }, [onGuestSpeech]);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.ScreenShare,
  ]);

  useEffect(() => {
    const receive = (payload: Uint8Array, participant?: Participant, _kind?: unknown, topic?: string) => {
      if (topic === ADVISORY_SPEECH_TOPIC && participant) {
        try {
          const value = JSON.parse(decoder.decode(payload)) as { text?: string };
          const clean = value.text?.trim().slice(0, 1200);
          if (clean) guestSpeechRef.current(participant.name || "Guest", clean);
        } catch { /* ignore malformed caption */ }
        return;
      }
      if (topic !== HAND_TOPIC || !participant) return;
      try {
        const value = JSON.parse(decoder.decode(payload)) as { raised?: boolean };
        setHands((prev) => ({ ...prev, [participant.identity]: value.raised === true }));
      } catch { /* ignore non-conference data */ }
    };
    const left = (participant: Participant) =>
      setHands((prev) => { const next = { ...prev }; delete next[participant.identity]; return next; });
    room.on(RoomEvent.DataReceived, receive);
    room.on(RoomEvent.ParticipantDisconnected, left);
    return () => {
      room.off(RoomEvent.DataReceived, receive);
      room.off(RoomEvent.ParticipantDisconnected, left);
    };
  }, [room]);

  useEffect(() => () => { recognitionRef.current?.stop(); recognitionRef.current = null; }, []);

  function toggleSpeechShare() {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); recognitionRef.current = null;
      setSharingSpeech(false);
      return;
    }
    const browser = window as Window & { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Constructor) { setError("Speech-to-text sharing requires a browser with SpeechRecognition support (such as Chrome)."); return; }
    try {
      const recognition = new Constructor();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = document.documentElement.lang === "fr" ? "fr-CA" : "en-CA";
      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const text = event.results[i]?.[0]?.transcript?.trim();
          if (text) void localParticipant.publishData(encoder.encode(JSON.stringify({ text: text.slice(0, 1200) })), { reliable: true, topic: ADVISORY_SPEECH_TOPIC }).catch(() => setError("Unable to send speech caption to host."));
        }
      };
      recognition.onerror = () => { setError("Speech recognition stopped or microphone permission was denied."); setSharingSpeech(false); recognitionRef.current = null; };
      recognition.onend = () => { setSharingSpeech(false); recognitionRef.current = null; };
      recognitionRef.current = recognition;
      recognition.start();
      setSharingSpeech(true);
      setError("");
    } catch { setError("Unable to start browser speech recognition."); }
  }

  const toggleHand = useCallback(async () => {
    const next = !hands[localParticipant.identity];
    setHands((prev) => ({ ...prev, [localParticipant.identity]: next }));
    try {
      await localParticipant.publishData(encoder.encode(JSON.stringify({ raised: next })), {
        reliable: true, topic: HAND_TOPIC,
      });
    } catch {
      setError("Unable to share raised-hand status.");
    }
  }, [hands, localParticipant]);

  const cameraMap = useMemo(() => new Map(
    tracks.filter((track) => track.source === Track.Source.Camera)
      .map((track) => [track.participant.identity, track]),
  ), [tracks]);
  const screenTracks = tracks.filter((track) => track.source === Track.Source.ScreenShare);

  async function updateDevice(action: () => Promise<unknown>) {
    try { setError(""); await action(); }
    catch (err) { setError(err instanceof Error ? err.message : "Media device unavailable."); }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-xs text-emerald-300">
          <Users className="h-4 w-4" /> Conference live · {participants.length}/8 connected
        </span>
        <span className="text-[11px] text-slate-400">LiveKit audio and video · same advisory room ID</span>
      </div>
      {screenTracks.map((track) => (
        <div key={track.participant.identity} className="overflow-hidden rounded-xl border border-cyan-400/30 bg-black">
          <div className="px-3 py-2 text-xs text-cyan-200">{track.participant.name || "Participant"} is presenting</div>
          <VideoTrack trackRef={track} className="max-h-[420px] w-full object-contain" />
        </div>
      ))}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {participants.map((participant) => {
          const track = cameraMap.get(participant.identity);
          const isLocal = participant.identity === localParticipant.identity;
          return (
            <div key={participant.identity} className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              {track && track.publication && !track.publication.isMuted ? (
                <VideoTrack trackRef={track} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-3xl font-semibold text-slate-300">
                  {(participant.name || "Guest").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-6 text-xs">
                <span className="truncate">{participant.name || "Guest"}{isLocal ? " (You)" : ""}</span>
                <span className="shrink-0 text-amber-300">{hands[participant.identity] ? "✋" : ""}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => void updateDevice(() => localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs">
          {isMicrophoneEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isMicrophoneEnabled ? "Mute" : "Unmute"}
        </button>
        <button type="button" onClick={() => void updateDevice(() => localParticipant.setCameraEnabled(!isCameraEnabled))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs">
          {isCameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
          {isCameraEnabled ? "Stop video" : "Start video"}
        </button>
        <button type="button" onClick={() => void updateDevice(() => localParticipant.setScreenShareEnabled(!isScreenShareEnabled))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs">
          <MonitorUp className="h-4 w-4" /> {isScreenShareEnabled ? "Stop sharing" : "Present screen"}
        </button>
        <button type="button" onClick={() => void toggleHand()}
          aria-pressed={Boolean(hands[localParticipant.identity])}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs ${hands[localParticipant.identity] ? "border-amber-400/40 bg-amber-400/10 text-amber-200" : "border-white/15"}`}>
          <Hand className="h-4 w-4" /> {hands[localParticipant.identity] ? "Lower hand" : "Raise hand"}
        </button>
        <button type="button" onClick={toggleSpeechShare}
          aria-pressed={sharingSpeech}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs ${sharingSpeech ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-white/15"}`}>
          {sharingSpeech ? "Stop sharing speech with AI" : "Share my speech with AI"}
        </button>
        <button type="button" onClick={onLeave}
          className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">
          <PhoneOff className="h-4 w-4" /> Leave
        </button>
      </div>
      {error ? <p role="alert" className="text-xs text-amber-300">{error}</p> : null}
      <p className="text-[11px] leading-5 text-slate-400">Sharing speech with AI is optional. Your browser transcribes your speech and sends final text to the host AI session; this does not route raw LiveKit audio to OpenAI. Use headphones to prevent feedback.</p>
      <RoomAudioRenderer />
    </div>
  );
}

export function ParticipantAudioCall({ sessionId, onGuestSpeech }: { sessionId: string; onGuestSpeech: (speaker: string, text: string) => void }) {
  const [joined, setJoined] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  useEffect(() => { setJoined(false); setToken(null); setError(""); }, [sessionId]);

  async function join() {
    if (!serverUrl) { setError("NEXT_PUBLIC_LIVEKIT_URL is not configured."); return; }
    setLoading(true);
    setError("");
    try {
      const invite = new URLSearchParams(window.location.search).get("invite");
      const profile = window.localStorage.getItem("myria:collaborative-advisory:participant-profile");
      let name = "Guest";
      try { if (profile) name = (JSON.parse(profile) as { name?: string }).name || name; } catch { /* ignore */ }
      const response = await fetch("/api/advisory-conference/token", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, invite, name }),
      });
      const data = await response.json() as { token?: string; error?: string };
      if (!response.ok || !data.token) throw new Error(data.error || "Cannot join conference.");
      setToken(data.token);
      setJoined(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Conference unavailable."); }
    finally { setLoading(false); }
  }

  return (
    <section className="mt-4 rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Volume2 className="h-4 w-4 text-cyan-300" /> Advisory Video Conference
      </div>
      <p className="mb-4 text-xs leading-5 text-slate-400">
        Meet face-to-face in the same advisory session. Join with microphone and camera, raise your hand,
        or present your screen. LiveKit carries the video call; Liveblocks carries the shared findings and comments.
      </p>
      {joined && token && serverUrl ? (
        <LiveKitRoom token={token} serverUrl={serverUrl} connect audio={false} video={false}
          onDisconnected={() => { setJoined(false); setToken(null); }}
          onError={(err) => setError(err.message)}>
          <ConferenceStage onGuestSpeech={onGuestSpeech} onLeave={() => { setJoined(false); setToken(null); }} />
        </LiveKitRoom>
      ) : (
        <button type="button" onClick={() => void join()} disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-200 disabled:opacity-50">
          <Phone className="h-4 w-4" /> {loading ? "Joining..." : "Join video conference"}
        </button>
      )}
      {error ? <p role="alert" className="mt-2 text-xs text-amber-300">{error}</p> : null}
    </section>
  );
}
