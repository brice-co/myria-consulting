"use client";

import { useEffect, useState } from 'react';
import { getSessions } from '@/app/(tools)/customer-support/lib/db';
import type { CallSession } from '@/app/(tools)/customer-support/lib/schemas';
import { agentLabels } from '@/app/(tools)/customer-support/lib/schemas';
import { History, Clock } from 'lucide-react';

export function SessionHistory() {
  const [sessions, setSessions] = useState<CallSession[]>([]);

  useEffect(() => {
    getSessions().then(setSessions).catch(console.error);
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="glass-panel p-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">History</h3>
        <div className="flex items-center justify-center py-6">
          <div className="text-center">
            <History className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No sessions yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">History</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {sessions.slice(0, 5).map(session => {
          const duration = session.endedAt
            ? Math.round((session.endedAt - session.startedAt) / 1000)
            : 0;
          const mins = Math.floor(duration / 60);
          const secs = duration % 60;

          return (
            <div key={session.id} className="p-2 rounded-lg bg-muted/30 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground truncate">{session.scenarioTitle}</span>
                <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono">{mins}:{secs.toString().padStart(2, '0')}</span>
                </div>
              </div>
              <div className="flex gap-1 mt-1">
                {session.agentTypes.map(a => (
                  <span key={a} className="text-[9px] font-mono px-1 py-0.5 rounded bg-secondary text-secondary-foreground">
                    {agentLabels[a]}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
