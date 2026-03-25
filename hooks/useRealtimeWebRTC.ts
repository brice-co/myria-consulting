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
const NOISE_GATE_INTERVAL_MS = 50;

// Tune these on device testing
const NOISE_FLOOR = 7;
const OPEN_GATE_GAIN = 1;
const CLOSED_GATE_GAIN = 0.015;
const ATTACK_STEP = 0.18;
const RELEASE_STEP = 0.08;

export function useRealtimeWebRTC() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micTrackRef = useRef<MediaStreamTrack | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const processedStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const noiseGateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gateGainRef = useRef<GainNode | null>(null);

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

  const fnCallBuffers = useRef<Record<string, { name: string; args: string; callId: string }>>({});

  const clearNoiseGateMonitor = useCallback(() => {
    if (noiseGateIntervalRef.current) {
      clearInterval(noiseGateIntervalRef.current);
      noiseGateIntervalRef.current = null;
    }
  }, []);

  const cleanupAudioProcessing = useCallback(async () => {
    clearNoiseGateMonitor();

    processedStreamRef.current?.getTracks().forEach((t) => t.stop());
    processedStreamRef.current = null;

    analyserRef.current = null;
    gateGainRef.current = null;

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        await audioContextRef.current.close();
      } catch {
        // ignore
      }
    }

    audioContextRef.current = null;
  }, [clearNoiseGateMonitor]);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const endSession = useCallback(
    (reason?: string) => {
      clearSilenceTimer();

      try {
        if (dcRef.current?.readyState === "open") {
          dcRef.current.send(JSON.stringify({ type: "response.cancel" }));
        }
      } catch {
        // ignore
      }

      clearNoiseGateMonitor();

      dcRef.current?.close();
      dcRef.current = null;

      pcRef.current?.close();
      pcRef.current = null;

      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;

      processedStreamRef.current?.getTracks().forEach((t) => t.stop());
      processedStreamRef.current = null;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.srcObject = null;
        audioRef.current = null;
      }

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        void audioContextRef.current.close().catch(() => {});
      }
      audioContextRef.current = null;
      analyserRef.current = null;
      gateGainRef.current = null;

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
    },
    [clearNoiseGateMonitor, clearSilenceTimer],
  );

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

        const rawStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: { ideal: true },
            noiseSuppression: { ideal: true },
            autoGainControl: { ideal: true },
            channelCount: { ideal: 1 },
            sampleRate: { ideal: 48000 },
            sampleSize: { ideal: 16 },
          },
          video: false,
        });

        streamRef.current = rawStream;

        const rawMicTrack = rawStream.getAudioTracks()[0];

        try {
          await rawMicTrack.applyConstraints({
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
            sampleRate: 48000,
          });
        } catch (err) {
          console.warn("Mic constraints partially unsupported:", err);
        }

        const AudioContextClass =
          window.AudioContext ||
          (window as Window & {
            webkitAudioContext?: typeof AudioContext;
          }).webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error("Web Audio API is not supported in this browser");
        }

        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;

        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        const source = audioContext.createMediaStreamSource(rawStream);

        const highpass = audioContext.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 120;
        highpass.Q.value = 0.7;

        const lowpass = audioContext.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.value = 4200;
        lowpass.Q.value = 0.7;

        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.value = -45;
        compressor.knee.value = 18;
        compressor.ratio.value = 10;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.2;

        const gateGain = audioContext.createGain();
        gateGain.gain.value = 1;
        gateGainRef.current = gateGain;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.85;
        analyserRef.current = analyser;

        const destination = audioContext.createMediaStreamDestination();

        source.connect(highpass);
        highpass.connect(lowpass);
        lowpass.connect(compressor);
        compressor.connect(gateGain);
        gateGain.connect(analyser);
        gateGain.connect(destination);

        const processedStream = destination.stream;
        processedStreamRef.current = processedStream;

        const processedMicTrack = processedStream.getAudioTracks()[0];
        micTrackRef.current = processedMicTrack;

        pc.addTrack(processedMicTrack, processedStream);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        clearNoiseGateMonitor();
        noiseGateIntervalRef.current = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }

          const avg = sum / dataArray.length;
          const targetGain = avg > NOISE_FLOOR ? OPEN_GATE_GAIN : CLOSED_GATE_GAIN;
          const currentGain = gateGain.gain.value;

          if (targetGain > currentGain) {
            gateGain.gain.value = Math.min(OPEN_GATE_GAIN, currentGain + ATTACK_STEP);
          } else {
            gateGain.gain.value = Math.max(CLOSED_GATE_GAIN, currentGain - RELEASE_STEP);
          }
        }, NOISE_GATE_INTERVAL_MS);

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

        const sdpRes = await fetch("https://api.openai.com/v1/realtime?model=gpt-realtime-mini", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        });

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
        void cleanupAudioProcessing();
        toast.error("Failed to start voice session");
        throw error;
      }
    },
    [cleanupAudioProcessing, clearNoiseGateMonitor, endSession, handleRealtimeEvent, resetSilenceTimer],
  );

  const toggleMute = useCallback(() => {
    if (!micTrackRef.current) return;

    const nextEnabled = !micTrackRef.current.enabled;
    micTrackRef.current.enabled = nextEnabled;
    setIsMuted(!nextEnabled);

    if (nextEnabled) {
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

      setTranscript((prev) => [...prev, { speaker: "You", text, timestamp: Date.now() }]);

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

      void cleanupAudioProcessing();

      if (isActiveRef.current) {
        endSession();
      } else {
        clearSilenceTimer();
      }
    };
  }, [cleanupAudioProcessing, endSession, clearSilenceTimer]);

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