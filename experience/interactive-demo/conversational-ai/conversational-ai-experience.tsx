"use client";

import { motion } from "framer-motion";
import { ExperienceHeader } from "./components/experience-header";
import { WorkspaceTopbar } from "./components/workspace-topbar";
import { AgentTeamPanel } from "./components/agent-team-panel";
import { ConversationStage } from "./components/conversation-stage";
import { IntelligencePanel } from "./components/intelligence-panel";
import { ScenarioRail } from "./components/scenario-rail";
import { useConversationDemo } from "./hooks/use-conversation-demo";

export function ConversationalAIExperience() {
  const demo = useConversationDemo();
  return (
    <section className="bg-[#f8f5ef] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ExperienceHeader />
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55}} className="mt-12 overflow-hidden rounded-[22px] border border-[#173039]/10 bg-white shadow-[0_28px_90px_rgba(23,48,57,.10)]">
          <WorkspaceTopbar channel={demo.channel} onChannel={demo.setChannel} />
          <div className="grid lg:grid-cols-[220px_minmax(0,1fr)_260px]">
            <AgentTeamPanel active={demo.activeAgent} onSelect={demo.setActiveAgent} />
            <ConversationStage messages={demo.messages} channel={demo.channel} activeAgent={demo.activeAgent} draft={demo.draft} onDraft={demo.setDraft} onSend={demo.sendMessage} />
            <IntelligencePanel insights={demo.scenario.insights} tools={demo.tools} onRun={demo.runTool} />
          </div>
          <ScenarioRail active={demo.scenarioId} onChange={demo.changeScenario} />
        </motion.div>
      </div>
    </section>
  );
}
