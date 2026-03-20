"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, PhoneOff, Send, Minus, X, Maximize2, Volume2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRealtimeWebRTC, type AgentConfig } from "@/hooks/useRealtimeWebRTC";
import type { ToolName } from "@/config/agentConfigs";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "it", label: "Italiano" },
  { code: "ru", label: "Русский" },
];

const DEFAULT_PROMPT =
  "You are a friendly, concise AI assistant for VoiceAI. Help users with questions about our voice agent platform, pricing, and capabilities. Be conversational and helpful.";

function buildAgent(
  langLabel: string,
  agentVoice: string,
  agentTitle: string,
  systemPrompt: string,
  allowedTools?: ToolName[]
): AgentConfig {
  return {
    id: "assistant",
    name: agentTitle,
    systemPrompt: `${systemPrompt}\n\nIMPORTANT: You MUST respond in ${langLabel} at all times. Every reply—spoken and written—must be in ${langLabel}.`,
    greeting:
      langLabel === "English"
        ? `Hi! I'm your ${agentTitle}. How can I help you today?`
        : `Hi! I'm your ${agentTitle}. (Responding in ${langLabel})`,
    voice: agentVoice,
    allowedTools,
  };
}

type WidgetState = "collapsed" | "minimized" | "open";

interface ChatWidgetProps {
  title?: string;
  subtitle?: string;
  description?: string;
  accentColor?: string;
  icon?: React.ReactNode;
  voice?: string;
  systemPrompt?: string;
  allowedTools?: ToolName[];
}

const ChatWidget = ({
  title = "VoiceAI Assistant",
  subtitle = "AI-powered voice assistant",
  description,
  accentColor,
  icon,
  voice = "shimmer",
  systemPrompt = DEFAULT_PROMPT,
  allowedTools,
}: ChatWidgetProps) => {
  const [widgetState, setWidgetState] = useState<WidgetState>("collapsed");
  const [textInput, setTextInput] = useState("");
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    isMuted,
    transcript,
    interimTranscript,
    startSession,
    endSession,
    toggleMute,
    sendTextMessage,
  } = useRealtimeWebRTC();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, interimTranscript]);

  const handleSend = () => {
    const msg = textInput.trim();
    if (!msg) return;
    sendTextMessage(msg);
    setTextInput("");
  };

  const currentAgent = () => buildAgent(selectedLang.label, voice, title, systemPrompt, allowedTools);

  const handleOpen = async () => {
    setWidgetState("open");
    if (!isActive) {
      await startSession(currentAgent());
    }
  };

  const handleClose = () => {
    endSession();
    setWidgetState("collapsed");
  };

  const handleLanguageChange = async (lang: typeof LANGUAGES[number]) => {
    setSelectedLang(lang);
    setLangOpen(false);
    if (isActive) {
      endSession();
      setTimeout(() => {
        startSession(buildAgent(lang.label, voice, title, systemPrompt, allowedTools));
      }, 300);
    }
  };

  // Status label
  const statusLabel = isActive
    ? isSpeaking
      ? "Speaking…"
      : isListening
      ? "Listening…"
      : isProcessing
      ? "Thinking…"
      : "Connected"
    : "Connecting…";

  // Collapsed — floating button with animated sound wave
  if (widgetState === "collapsed") {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Open voice assistant"
      >
        {icon || (
          <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
            <div
              className="absolute inset-0 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
              style={{ backgroundColor: accentColor ? `hsl(${accentColor})` : "hsl(var(--primary))" }}
            />
            <div
              className="relative w-full h-full rounded-2xl shadow-xl flex items-end justify-center gap-[3px] pb-3 overflow-hidden"
              style={{ backgroundColor: accentColor ? `hsl(${accentColor})` : "hsl(var(--primary))" }}
            >
              {[0.6, 1, 0.75, 0.9, 0.5].map((scale, i) => (
                <span
                  key={i}
                  className="w-[4px] rounded-full bg-primary-foreground/90"
                  style={{
                    height: `${scale * 28}px`,
                    animation: `voice-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </button>
    );
  }

  // Minimized — small bar
  if (widgetState === "minimized") {
    return (
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 shadow-lg">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {isActive && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
        <button onClick={() => setWidgetState("open")} className="text-muted-foreground hover:text-foreground">
          <Maximize2 className="h-4 w-4" />
        </button>
        <button onClick={handleClose} className="text-muted-foreground hover:text-destructive">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Open — voice-first widget
  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[380px] max-h-[560px] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/40">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor ? `hsl(${accentColor} / 0.2)` : "hsl(var(--primary) / 0.2)" }}
          >
            {icon || (
              <Volume2
                className="h-4 w-4"
                style={{ color: accentColor ? `hsl(${accentColor})` : "hsl(var(--primary))" }}
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground">{statusLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1"
              title="Select language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-[10px] font-medium uppercase">{selectedLang.code}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 max-h-48 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg z-10">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-sm hover:bg-secondary transition-colors",
                      lang.code === selectedLang.code ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setWidgetState("minimized")} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary">
            <Minus className="h-4 w-4" />
          </button>
          <button onClick={handleClose} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Customizable description area */}
      {(description || subtitle) && (
        <div className="px-4 py-2.5 border-b border-border bg-secondary/20">
          {subtitle && <p className="text-xs font-medium text-foreground">{subtitle}</p>}
          {description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>}
        </div>
      )}

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
        {transcript.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Speak or type to start a conversation.
          </p>
        )}
        {transcript.map((entry, i) => {
          const isUser = entry.speaker === "You";
          const isSystem = entry.speaker === "System";
          if (isSystem) {
            return (
              <p key={i} className="text-center text-xs text-muted-foreground italic">
                {entry.text}
              </p>
            );
          }
          return (
            <div key={i} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                )}
              >
                {!isUser && <p className="text-xs font-semibold text-muted-foreground mb-0.5">{entry.speaker}</p>}
                <p>{entry.text}</p>
              </div>
            </div>
          );
        })}
        {interimTranscript && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-secondary text-muted-foreground rounded-bl-sm italic">
              {interimTranscript}
            </div>
          </div>
        )}
      </div>

      {/* Voice controls + text input */}
      <div className="border-t border-border px-3 py-3 space-y-3">
        {/* Voice controls row */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMute}
            disabled={!isActive}
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-40",
              isMuted ? "bg-destructive/20 text-destructive" : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* AI status indicator */}
          <div className="relative h-12 w-12 flex items-center justify-center">
            {isActive && (isListening || isSpeaking) && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: accentColor ? `hsl(${accentColor} / 0.2)` : "hsl(var(--primary) / 0.2)",
                }}
              />
            )}
            <span
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                !isActive
                  ? "bg-secondary text-muted-foreground"
                  : isSpeaking
                  ? "bg-primary/30 text-primary"
                  : isListening
                  ? "bg-accent/30 text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {!isActive ? "…" : isSpeaking ? "AI" : isListening ? "You" : "…"}
            </span>
          </div>

          <button
            onClick={handleClose}
            disabled={!isActive}
            className="h-10 w-10 rounded-full bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors disabled:opacity-40"
            title="End call"
          >
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>

        {/* Text input row */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={isActive ? "Type a message…" : "Connecting…"}
            disabled={!isActive}
            className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isActive || !textInput.trim()}
            className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
