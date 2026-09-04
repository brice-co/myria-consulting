"use client";

import { motion } from "framer-motion";
import { CONTACT_STARTERS } from "@/config/contact-agent";
import { useContactAgent } from "@/hooks/use-contact-agent";
import { AgentHeader } from "./agent-header";
import { AgentControls } from "./agent-controls";
import { InquiryPanel } from "./inquiry-panel";
import { SilenceNotice } from "./silence-notice";
import { SuggestedPrompts } from "./suggested-prompts";
import { TextComposer } from "./text-composer";
import { ToolEventList } from "./tool-event-list";
import { Transcript } from "./transcript";

export function ContactAgentPage() {
  const agent = useContactAgent();
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#17313a]">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:px-8 lg:px-10">
        <div className="flex items-center gap-4"><span className="h-px w-10 bg-[#b57b2a]" /><p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b57b2a]">Contact Myria</p></div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.04] tracking-[-0.035em] sm:text-6xl">Tell us what you&apos;re <span className="italic text-[#b57b2a]">working on.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#607075]">Speak or type with the Myria Contact Advisor. It will help structure your inquiry, let you review the message, and only send it after your explicit confirmation.</p>
          </div>
          <div className="text-sm leading-6 text-[#68777a] lg:text-right">Voice + text · structured inquiry · human confirmation</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[32px] border border-[#17313a]/10 bg-[#fbf8f3] shadow-[0_24px_80px_rgba(23,49,58,.08)]">
          <div className="grid min-h-[720px] lg:grid-cols-[1.08fr_.92fr]">
            <div className="flex h-[720px] min-h-0 flex-col">
              <AgentHeader status={agent.status} />

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <SilenceNotice visible={agent.silenceWarning} />

              <Transcript
                items={agent.transcript}
                connected={agent.status === "connected"}
              />

              {agent.transcript.length === 0 ? (
                <SuggestedPrompts
                  prompts={CONTACT_STARTERS}
                  disabled={agent.status !== "connected"}
                  onChoose={agent.sendText}
                />
              ) : null}
            </div>

            <div className="shrink-0 border-t border-[#17313a]/10 p-4 sm:p-5">
              <TextComposer
                disabled={agent.status !== "connected"}
                onSend={agent.sendText}
              />

              <AgentControls
                status={agent.status}
                muted={agent.muted}
                onConnect={agent.connect}
                onMute={agent.toggleMute}
                onEnd={agent.endSession}
              />
            </div>
            </div>
            <aside className="grid content-start gap-6 bg-[#f3eee6] p-5 sm:p-7">
              <InquiryPanel inquiry={agent.inquiry} confirmationRequested={agent.confirmationRequested} sending={agent.sending} sent={agent.sent} onUpdate={agent.updateInquiry} onConfirm={agent.confirmAndSend} />
              <ToolEventList events={agent.events} />
            </aside>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
