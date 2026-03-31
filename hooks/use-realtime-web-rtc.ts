"use client";

import { useCallback, useRef, useState } from "react";

/* =========================================================
   Types
========================================================= */

export interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  systemPrompt: string;
  greeting: string;
  voice?: string;
}

interface HandoffRequest {
  agentId: string;
  reason?: string;
}

/* =========================================================
   Hook
========================================================= */

export function useRealtimeWebRTC() {
  /* ===============================
     Refs (mutable, non-reactive)
  =============================== */

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const micTrackRef = useRef<MediaStreamTrack | null>(null);
  const currentAgentNameRef = useRef<string>("");
  const handoffCallbackRef = useRef<((req: HandoffRequest) => void) | null>(null);

  /* ===============================
     State (UI reactive)
  =============================== */

  
const [isActive, setIsActive] = useState(false);
const [isListening, setIsListening] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
const [isMuted, setIsMuted] = useState(false);
const [isSwitching, setIsSwitching] = useState(false);
const [onHold, setOnHold] = useState(false); // <-- NEW
const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
const [interimTranscript, setInterimTranscript] = useState("");
const [currentAgent, setCurrentAgent] = useState<AgentConfig | null>(null);


  /* =========================================================
     1️⃣ Session Factory
  ========================================================= */

  const createSessionToken = useCallback(
    async (agent: AgentConfig): Promise<string> => {
      const res = await fetch("/api/bi-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voice: agent.voice,
          instructions: agent.systemPrompt,
        }),
      });

      if (!res.ok) {
        throw new Error(`Session creation failed (${res.status})`);
      }

      const data = await res.json();

      if (!data?.token) {
        throw new Error("Invalid session response");
      }

      return data.token;
    },
    []
  );

  /* =========================================================
     2️⃣ Peer Cleanup
  ========================================================= */

  const cleanupPeer = useCallback(() => {
    dcRef.current?.close();
    pcRef.current?.close();

    dcRef.current = null;
    pcRef.current = null;

    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current = null;
    }
  }, []);

  /* =========================================================
     3️⃣ Realtime Event Processor
  ========================================================= */

  const handleRealtimeEvent = useCallback((event: any) => {
    switch (event.type) {
      case "input_audio_buffer.speech_started":
        setIsListening(true);
        setIsSpeaking(false);
        break;

      case "input_audio_buffer.speech_stopped":
        setIsListening(false);
        setIsProcessing(true);
        break;

      case "response.audio.delta":
        setIsSpeaking(true);
        setIsProcessing(false);
        break;

      case "response.audio.done":
        setIsSpeaking(false);
        setIsListening(true);
        break;

      case "response.audio_transcript.delta":
        if (event.delta) {
          setInterimTranscript((prev) => prev + event.delta);
        }
        break;

      case "response.audio_transcript.done":
        if (event.transcript) {
          setTranscript((prev) => [
            ...prev,
            {
              speaker: currentAgentNameRef.current,
              text: event.transcript,
              timestamp: Date.now(),
            },
          ]);
          setInterimTranscript("");
        }
        break;

      case "conversation.item.input_audio_transcription.completed":
        if (event.transcript) {
          setTranscript((prev) => [
            ...prev,
            {
              speaker: "You",
              text: event.transcript,
              timestamp: Date.now(),
            },
          ]);
        }
        break;

      case "response.function_call_arguments.done":
        if (event.name === "transfer_to_agent") {
          try {
            const args = JSON.parse(event.arguments);
            handoffCallbackRef.current?.({
              agentId: args.agent_id,
              reason: args.reason,
            });
          } catch (err) {
            console.error("Failed to parse handoff args", err);
          }
        }
        break;

      case "error":
        console.error("Realtime error:", event.error);
        break;
    }
  }, []);

  /* =========================================================
     4️⃣ Peer Connection Setup
  ========================================================= */

  const setupPeerConnection = useCallback(
    async (token: string, agent: AgentConfig, existingStream?: MediaStream) => {
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audio = document.createElement("audio");
      audio.autoplay = true;
      audioRef.current = audio;

      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
      };

      const stream =
        existingStream ??
        (await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        }));

      if (!existingStream) streamRef.current = stream;

      const micTrack = stream.getAudioTracks()[0];
      micTrackRef.current = micTrack;

      pc.addTrack(micTrack, stream);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onmessage = (e) => {
        try {
          handleRealtimeEvent(JSON.parse(e.data));
        } catch {
          console.error("Invalid realtime event payload");
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-realtime-mini",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) {
        throw new Error("SDP exchange failed");
      }

      const answer = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answer });
    },
    [handleRealtimeEvent]
  );

  /* =========================================================
     5️⃣ Agent Orchestration
  ========================================================= */

  const connectAgent = useCallback(
    async (agent: AgentConfig, existingStream?: MediaStream) => {
      setIsProcessing(true);

      const token = await createSessionToken(agent);

      await setupPeerConnection(token, agent, existingStream);

      currentAgentNameRef.current = agent.name;
      setCurrentAgent(agent);
      setIsActive(true);
      setIsProcessing(false);
      setTranscript([
        {
          speaker: agent.name,
          text: agent.greeting,
          timestamp: Date.now(),
        },
      ]);
    },
    [createSessionToken, setupPeerConnection]
  );

  const switchAgent = useCallback(
    async (agent: AgentConfig) => {
      if (!streamRef.current) return;

      setIsSwitching(true);
      cleanupPeer();

      setTranscript((prev) => [
        ...prev,
        {
          speaker: "System",
          text: `Transferring to ${agent.name}...`,
          timestamp: Date.now(),
        },
      ]);

      await connectAgent(agent, streamRef.current);

      setIsSwitching(false);
    },
    [cleanupPeer, connectAgent]
  );

  const endSession = useCallback(() => {
    cleanupPeer();
    streamRef.current?.getTracks().forEach((t) => t.stop());

    streamRef.current = null;
    micTrackRef.current = null;

    setIsActive(false);
    setCurrentAgent(null);
  }, [cleanupPeer]);

  /* =========================================================
     Controls
  ========================================================= */

const toggleMute = useCallback(() => {
  if (!micTrackRef.current) return;
  micTrackRef.current.enabled = !micTrackRef.current.enabled;
  setIsMuted(!micTrackRef.current.enabled);
}, []);

const toggleHold = useCallback(() => {
  setOnHold((prev) => !prev);
}, []);

const clearTranscript = useCallback(() => {
  setTranscript([]);
  setInterimTranscript("");
}, []);

  const stopSpeaking = useCallback(() => {
    dcRef.current?.send(JSON.stringify({ type: "response.cancel" }));
  }, []);

  const onHandoffRequest = useCallback(
    (cb: (req: HandoffRequest) => void) => {
      handoffCallbackRef.current = cb;
    },
    []
  );

  return {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    isMuted,
    isSwitching,
    transcript,
    interimTranscript,
    currentAgent,
    toggleHold,
    clearTranscript,
    onHold,
    connectAgent,
    switchAgent,
    endSession,
    toggleMute,
    stopSpeaking,
    onHandoffRequest,
  };
}