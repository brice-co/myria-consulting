import { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { runTool, type ToolResult } from "@/lib/aiTools";
import type { ToolName } from "@/config/agentConfigs";
import { filterTools } from "@/config/agentConfigs";

interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp: number;
}

interface AgentConfig {
  id: string;
  name: string;
  systemPrompt: string;
  greeting: string;
  voice?: string;
  allowedTools?: ToolName[];
}

export type { TranscriptEntry, AgentConfig };

const SILENCE_TIMEOUT_MS = 45_000;

export function useRealtimeWebRTC() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micTrackRef = useRef<MediaStreamTrack | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [onHold, setOnHold] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [currentAgent, setCurrentAgent] = useState<AgentConfig | null>(null);

  const isActiveRef = useRef(false);

  // Track pending function call argument buffers
  const fnCallBuffers = useRef<
    Record<string, { name: string; args: string; callId: string }>
  >({});

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const endSession = useCallback((reason?: string) => {
    clearSilenceTimer();

    try {
      if (dcRef.current?.readyState === "open") {
        dcRef.current.send(JSON.stringify({ type: "response.cancel" }));
      }
    } catch {
      // ignore
    }

    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.close();
    pcRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.srcObject = null;
      audioRef.current = null;
    }

    micTrackRef.current = null;
    fnCallBuffers.current = {};

    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsProcessing(false);
    setIsMuted(false);
    setOnHold(false);
    setCurrentAgent(null);
    setInterimTranscript("");

    if (reason) {
      toast.info(reason);
    } else {
      toast.info("Voice session ended");
    }
  }, [clearSilenceTimer]);

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();

    silenceTimerRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      endSession("Session ended due to inactivity");
    }, SILENCE_TIMEOUT_MS);
  }, [clearSilenceTimer, endSession]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const handleToolResult = useCallback(
    async (callId: string, toolName: string, argsStr: string) => {
      let args: Record<string, unknown>;
      try {
        args = JSON.parse(argsStr);
      } catch {
        args = {};
      }

      const result: ToolResult = await runTool({
        name: toolName,
        arguments: args,
        transcript,
      });

      if (result.sideEffect?.type === "open_url") {
        window.open(result.sideEffect.url, "_blank");
      }

      if (dcRef.current?.readyState === "open") {
        dcRef.current.send(
          JSON.stringify({
            type: "conversation.item.create",
            item: {
              type: "function_call_output",
              call_id: callId,
              output: JSON.stringify(result),
            },
          }),
        );

        dcRef.current.send(JSON.stringify({ type: "response.create" }));
      }

      setTranscript((prev) => [
        ...prev,
        {
          speaker: "System",
          text: `[Tool: ${toolName}] ${result.message}`,
          timestamp: Date.now(),
        },
      ]);

      resetSilenceTimer();
    },
    [transcript, resetSilenceTimer],
  );

  const handleRealtimeEvent = useCallback(
    (event: any, agentName: string) => {
      switch (event.type) {
        case "input_audio_buffer.speech_started":
          setIsListening(true);
          setIsSpeaking(false);
          setIsProcessing(false);
          resetSilenceTimer();
          break;

        case "input_audio_buffer.speech_stopped":
          setIsListening(false);
          setIsProcessing(true);
          resetSilenceTimer();
          break;

        case "response.audio.delta":
          setIsSpeaking(true);
          setIsProcessing(false);
          resetSilenceTimer();
          break;

        case "response.audio.done":
          setIsSpeaking(false);
          setIsListening(true);
          resetSilenceTimer();
          break;

        case "response.audio_transcript.delta":
          if (event.delta) {
            setInterimTranscript((prev) => prev + event.delta);
          }
          resetSilenceTimer();
          break;

        case "response.audio_transcript.done":
          if (event.transcript) {
            setTranscript((prev) => [
              ...prev,
              {
                speaker: agentName,
                text: event.transcript,
                timestamp: Date.now(),
              },
            ]);
            setInterimTranscript("");
          }
          resetSilenceTimer();
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
          resetSilenceTimer();
          break;

        case "response.function_call_arguments.delta":
          if (event.call_id) {
            if (!fnCallBuffers.current[event.call_id]) {
              fnCallBuffers.current[event.call_id] = {
                name: event.name || "",
                args: "",
                callId: event.call_id,
              };
            }

            if (event.name) {
              fnCallBuffers.current[event.call_id].name = event.name;
            }

            fnCallBuffers.current[event.call_id].args += event.delta || "";
          }
          resetSilenceTimer();
          break;

        case "response.function_call_arguments.done":
          if (event.call_id) {
            const buf = fnCallBuffers.current[event.call_id] || {
              name: event.name || "",
              args: event.arguments || "",
              callId: event.call_id,
            };

            if (event.name) buf.name = event.name;
            if (event.arguments) buf.args = event.arguments;

            delete fnCallBuffers.current[event.call_id];
            void handleToolResult(buf.callId, buf.name, buf.args);
          }
          resetSilenceTimer();
          break;

        case "error":
          console.error("Realtime error:", event.error);
          toast.error(event.error?.message || "Voice agent error");
          break;
      }
    },
    [handleToolResult, resetSilenceTimer],
  );

  const startSession = useCallback(
    async (agent: AgentConfig) => {
      try {
        setCurrentAgent(agent);
        setIsProcessing(true);

        const response = await fetch("/api/realtime-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voice: agent.voice || "alloy",
            instructions: agent.systemPrompt,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to get token: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.token) {
          throw new Error("No token received");
        }

        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        const audio = document.createElement("audio");
        audio.autoplay = true;
        audioRef.current = audio;

        pc.ontrack = (e) => {
          audio.srcObject = e.streams[0];
          setIsSpeaking(true);
          resetSilenceTimer();
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 48000,
          },
          video: false,
        });

        streamRef.current = stream;

        const micTrack = stream.getAudioTracks()[0];
        micTrackRef.current = micTrack;

        // Re-apply strong constraints when supported by the browser
        try {
          await micTrack.applyConstraints({
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 48000,
          });
        } catch (err) {
          console.warn("Mic constraints partially unsupported:", err);
        }

        pc.addTrack(micTrack, stream);

        const dc = pc.createDataChannel("oai-events");
        dcRef.current = dc;

        dc.onopen = () => {
          const tools = filterTools(agent.allowedTools);

          dc.send(
            JSON.stringify({
              type: "session.update",
              session: {
                tools,
                tool_choice: "auto",
              },
            }),
          );

          setIsListening(true);
          setIsProcessing(false);
          setTranscript([
            {
              speaker: agent.name,
              text: agent.greeting,
              timestamp: Date.now(),
            },
          ]);

          resetSilenceTimer();
        };

        dc.onmessage = (e) => {
          try {
            const event = JSON.parse(e.data);
            handleRealtimeEvent(event, agent.name);
          } catch (err) {
            console.error("Error parsing realtime event:", err);
          }
        };

        dc.onclose = () => {
          if (isActiveRef.current) {
            endSession("Voice session closed");
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const sdpRes = await fetch(
          "https://api.openai.com/v1/realtime?model=gpt-realtime-mini",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${data.token}`,
              "Content-Type": "application/sdp",
            },
            body: offer.sdp,
          },
        );

        if (!sdpRes.ok) {
          throw new Error(`SDP exchange failed: ${sdpRes.status}`);
        }

        const answer = await sdpRes.text();
        await pc.setRemoteDescription({ type: "answer", sdp: answer });

        setIsActive(true);
        resetSilenceTimer();
        toast.success("Connected to voice agent");
      } catch (error) {
        console.error("Error starting session:", error);
        setIsProcessing(false);
        toast.error("Failed to start voice session");
        throw error;
      }
    },
    [handleRealtimeEvent, resetSilenceTimer, endSession],
  );

  const toggleMute = useCallback(() => {
    if (!micTrackRef.current) return;

    micTrackRef.current.enabled = !micTrackRef.current.enabled;
    setIsMuted(!micTrackRef.current.enabled);

    if (micTrackRef.current.enabled) {
      resetSilenceTimer();
    }
  }, [resetSilenceTimer]);

  const toggleHold = useCallback(() => {
    if (!micTrackRef.current || !audioRef.current) return;

    const hold = !onHold;
    micTrackRef.current.enabled = !hold;
    audioRef.current.muted = hold;

    if (hold && dcRef.current?.readyState === "open") {
      dcRef.current.send(JSON.stringify({ type: "response.cancel" }));
    }

    setOnHold(hold);

    if (!hold) {
      resetSilenceTimer();
    }
  }, [onHold, resetSilenceTimer]);

  const stopSpeaking = useCallback(() => {
    if (dcRef.current?.readyState === "open" && isSpeaking) {
      dcRef.current.send(JSON.stringify({ type: "response.cancel" }));
      setIsSpeaking(false);
      resetSilenceTimer();
    }
  }, [isSpeaking, resetSilenceTimer]);

  const sendTextMessage = useCallback(
    (text: string) => {
      if (!dcRef.current || !isActive) return;

      setTranscript((prev) => [
        ...prev,
        { speaker: "You", text, timestamp: Date.now() },
      ]);

      dcRef.current.send(
        JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text }],
          },
        }),
      );

      dcRef.current.send(JSON.stringify({ type: "response.create" }));
      resetSilenceTimer();
    },
    [isActive, resetSilenceTimer],
  );

  const switchAgent = useCallback(
    (agent: AgentConfig) => {
      if (!dcRef.current?.readyState || dcRef.current.readyState !== "open") {
        return;
      }

      setCurrentAgent(agent);

      dcRef.current.send(
        JSON.stringify({
          type: "session.update",
          session: {
            voice: agent.voice || "alloy",
            instructions: agent.systemPrompt,
          },
        }),
      );

      setTranscript((prev) => [
        ...prev,
        {
          speaker: "System",
          text: `--- Switched to ${agent.name} ---`,
          timestamp: Date.now(),
        },
      ]);

      dcRef.current.send(
        JSON.stringify({
          type: "response.create",
          response: {
            instructions: `Introduce yourself briefly as ${agent.name}. ${agent.greeting}`,
          },
        }),
      );

      resetSilenceTimer();
    },
    [resetSilenceTimer],
  );

  const clearTranscript = useCallback(() => {
    setTranscript([]);
    setInterimTranscript("");
  }, []);

  // Stop session if user leaves page / hides tab / component unmounts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isActiveRef.current) {
        endSession("Voice session ended because the page became inactive");
      }
    };

    const handlePageHide = () => {
      if (isActiveRef.current) {
        endSession("Voice session ended because you left the page");
      }
    };

    const handleBeforeUnload = () => {
      if (isActiveRef.current) {
        endSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (isActiveRef.current) {
        endSession();
      } else {
        clearSilenceTimer();
      }
    };
  }, [endSession, clearSilenceTimer]);

  return {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    isMuted,
    onHold,
    transcript,
    interimTranscript,
    currentAgent,
    startSession,
    endSession,
    toggleMute,
    toggleHold,
    stopSpeaking,
    sendTextMessage,
    switchAgent,
    clearTranscript,
  };
}