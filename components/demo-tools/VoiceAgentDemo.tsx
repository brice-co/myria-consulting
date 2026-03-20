"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { VoiceWaveform } from "./VoiceWaveform";
import { Button } from "@/components/ui/button";

const demoConversation = [
  { role: "user", text: "Schedule a meeting with the team tomorrow at 2pm" },
  { role: "agent", text: "I'll schedule a team meeting for tomorrow at 2:00 PM. Should I send calendar invites to all team members?" },
  { role: "user", text: "Yes, and add a reminder 30 minutes before" },
  { role: "agent", text: "Done! Meeting scheduled with invites sent. I've also set a 30-minute reminder for everyone." },
];

export const VoiceAgentDemo = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentMessage(0);
      setDisplayedText("");
      return;
    }

    const message = demoConversation[currentMessage];
    if (!message) {
      setIsActive(false);
      return;
    }

    setIsTyping(true);
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= message.text.length) {
        setDisplayedText(message.text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          if (currentMessage < demoConversation.length - 1) {
            setCurrentMessage((prev) => prev + 1);
          } else {
            setIsActive(false);
          }
        }, 1500);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isActive, currentMessage]);

  const currentRole = demoConversation[currentMessage]?.role;

  return (
    <div className="glass-card p-6 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">AI Voice Agent Demo</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`} />
          <span className="text-xs text-muted-foreground">
            {isActive ? "Active" : "Idle"}
          </span>
        </div>
      </div>

      {/* Waveform Display */}
      <div className="mb-6 py-4 rounded-lg bg-background/50">
        <VoiceWaveform isActive={isActive && currentRole === "user"} barCount={30} />
      </div>

      {/* Conversation Display */}
      <div className="min-h-[120px] mb-6 space-y-3">
        <AnimatePresence mode="wait">
          {isActive && displayedText && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${currentRole === "agent" ? "flex-row-reverse" : ""}`}
            >
              <div className={`p-2 rounded-full ${
                currentRole === "user" ? "bg-primary/20" : "bg-secondary/20"
              }`}>
                {currentRole === "user" ? (
                  <Mic className="w-4 h-4 text-primary" />
                ) : (
                  <Volume2 className="w-4 h-4 text-secondary" />
                )}
              </div>
              <div className={`flex-1 p-3 rounded-lg ${
                currentRole === "user" 
                  ? "bg-primary/10 border border-primary/20" 
                  : "bg-secondary/10 border border-secondary/20"
              }`}>
                <p className="text-sm">{displayedText}</p>
                {isTyping && (
                  <span className="inline-block w-1 h-4 bg-foreground/50 ml-1 animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isActive && !displayedText && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Click the button to start a demo conversation
          </div>
        )}
      </div>

      {/* Control Button */}
      <Button
        onClick={() => setIsActive(!isActive)}
        className={`w-full transition-all duration-300 ${
          isActive 
            ? "bg-destructive hover:bg-destructive/90" 
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isActive ? (
          <>
            <MicOff className="w-4 h-4 mr-2" />
            Stop Demo
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Start Voice Demo
          </>
        )}
      </Button>
    </div>
  );
};
