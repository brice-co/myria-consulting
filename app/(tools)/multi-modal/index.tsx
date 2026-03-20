"use client"

import { VoiceOrb } from '@/app/(tools)/multi-modal/components/VoiceOrb';
import { TranscriptPanel } from '@/app/(tools)/multi-modal/components/TranscriptPanel';
import { ToolCallsPanel } from '@/app/(tools)/multi-modal/components/ToolCallsPanel';
import { AgentStatusBar } from '@/app/(tools)/multi-modal/components/AgentStatusBar';
import { useVoiceAgent } from '@/app/(tools)/multi-modal/hooks/useVoiceAgent';
import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';
import { getAllSessions } from '@/app/(tools)/multi-modal/lib/indexedDB';
import { useEffect } from 'react';
import { Bot, Zap, Globe, Mail, Search } from 'lucide-react';
import { TextInputBar } from '@/app/(tools)/multi-modal/components/TextInputBar';

const MultiModalAgents = () => {
  const { startSession, endSession, toggleMute, sendTextMessage } = useVoiceAgent();
  const { isActive, pastSessions, setPastSessions } = useVoiceAgentStore();

  useEffect(() => {
    getAllSessions().then(setPastSessions);
  }, [setPastSessions]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 glass">
        <div className="container flex items-center justify-between py-4">
          
          <AgentStatusBar />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8 flex gap-6">
        {/* Left: Transcript */}
        <div className="flex-1 flex flex-col glass rounded-xl p-5 min-h-0">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-sm">Live Transcript</h2>
          </div>
          <TranscriptPanel />
          {isActive && <TextInputBar onSend={sendTextMessage} />}
          <ToolCallsPanel />
        </div>

        {/* Right: Controls */}
        <div className="w-80 flex flex-col gap-6 mt-25">
          {/* Voice Control */}
          <div className="glass rounded-xl p-6 flex flex-col items-center">
            <VoiceOrb onStart={startSession} onEnd={endSession} onToggleMute={toggleMute} />
          </div>

          {/* Capabilities */}
          {!isActive && (
            <div className="glass rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Capabilities</h3>
              {[
                { icon: Search, label: 'Web Search', desc: 'Search & summarize info', color: 'text-agent-search' },
                { icon: Mail, label: 'Send Email', desc: 'Email via Resend', color: 'text-agent-email' },
                { icon: Globe, label: 'Open URL', desc: 'Open links in browser', color: 'text-agent-browser' },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past sessions count */}
          {pastSessions.length > 0 && (
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-xs font-mono text-muted-foreground">
                {pastSessions.length} past session{pastSessions.length > 1 ? 's' : ''} saved
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MultiModalAgents;
