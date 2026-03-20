import { Headphones } from 'lucide-react';
import { AgentPanel } from '@/app/(tools)/customer-support/components/AgentPanel';
import { TranscriptPanel } from '@/app/(tools)/customer-support/components/TranscriptPanel';
import { CallControls } from '@/app/(tools)/customer-support/components/CallControls';
import { ScenarioSelector } from '@/app/(tools)/customer-support/components/ScenarioSelector';
import { TTSSelector } from '@/app/(tools)/customer-support/components/TTSSelector';
import { SessionHistory } from '@/app/(tools)/customer-support/components/SessionHistory';

const CustomerSupport = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="mb-25">
        <div className="flex items-center gap-3">
          
          <Headphones className="w-6 h-6 text-primary" />
        </div>
      </header>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-120px)]">
        {/* Left sidebar */}
        <div className="lg:col-span-3 space-y-4 overflow-y-auto">
          <ScenarioSelector />
          <TTSSelector />
          <SessionHistory />
        </div>

        {/* Center — transcript */}
        <div className="lg:col-span-6 flex flex-col gap-4 min-h-0">
          <CallControls />
          <div className="flex-1 min-h-0">
            <TranscriptPanel />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <AgentPanel />
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
