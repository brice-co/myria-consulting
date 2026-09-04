"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { buildInquiryMessage, isInquiryReady } from "@/lib/myria-contact-agent/contact/format";
import type { ContactInquiry } from "@/lib/myria-contact-agent/contact/schema";
import { InquiryField } from "./inquiry-field";

type Props = {
  inquiry: ContactInquiry;
  confirmationRequested: boolean;
  sending: boolean;
  sent: boolean;
  onUpdate: (patch: Partial<ContactInquiry>) => void;
  onConfirm: () => void;
};

export function InquiryPanel({ inquiry, confirmationRequested, sending, sent, onUpdate, onConfirm }: Props) {
  const ready = isInquiryReady(inquiry);
  return (
    <section className="rounded-[26px] border border-[#17313a]/10 bg-[#fbf8f3] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b57b2a]">Your inquiry</p>
          <h2 className="mt-1 font-serif text-2xl">Message being prepared</h2>
        </div>
        <span className="rounded-full border border-[#5d8f88]/20 bg-[#e9f0ed] px-3 py-1 text-[10px] text-[#52746f]">Structured live</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InquiryField label="Name" value={inquiry.name} onChange={(name) => onUpdate({ name })} />
        <InquiryField label="Email" value={inquiry.email} onChange={(email) => onUpdate({ email })} />
        <InquiryField label="Company" value={inquiry.company} onChange={(company) => onUpdate({ company })} />
        <InquiryField label="Role" value={inquiry.role} onChange={(role) => onUpdate({ role })} />
      </div>

      <div className="mt-5">
        <InquiryField label="Message" value={inquiry.message} multiline placeholder={buildInquiryMessage(inquiry) || "The advisor will help prepare your message…"} onChange={(message) => onUpdate({ message })} />
      </div>

      <div className="mt-5 grid gap-2 text-xs text-[#657478] sm:grid-cols-2">
        <p><span className="font-semibold text-[#17313a]">Area:</span> {inquiry.area}</p>
        <p><span className="font-semibold text-[#17313a]">Timing:</span> {inquiry.urgency}</p>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-[#5d8f88]/25 bg-[#e8f0ed] p-4">
            <div className="flex items-center gap-2 font-semibold text-[#345f59]"><CheckCircle2 className="h-4 w-4" /> Message sent to Myria</div>
            <p className="mt-2 text-xs leading-5 text-[#56716d]">Your inquiry was delivered successfully. The Myria team can reply directly to the email you provided.</p>
          </motion.div>
        ) : confirmationRequested ? (
          <motion.div key="confirmation" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-[#b57b2a]/25 bg-[#fff6e5] p-4">
            <div className="flex items-center gap-2 font-semibold text-[#77551f]"><ShieldCheck className="h-4 w-4" /> Your confirmation is required</div>
            <p className="mt-2 text-xs leading-5 text-[#82693f]">Review the details above. Nothing is sent until you choose Confirm &amp; Send.</p>
            <button type="button" onClick={onConfirm} disabled={!ready || sending}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b57b2a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a76f24] disabled:cursor-not-allowed disabled:opacity-45">
              <Send className="h-4 w-4" /> {sending ? "Sending…" : "Confirm & Send"}
            </button>
            {!ready ? <p className="mt-2 text-[10px] text-[#8a6b39]">A name, valid email and message are required.</p> : null}
          </motion.div>
        ) : (
          <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-2xl border border-dashed border-[#17313a]/12 px-4 py-4 text-xs leading-5 text-[#738084]">
            Continue the conversation. When the inquiry is ready, the advisor will ask you to review and confirm it.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
