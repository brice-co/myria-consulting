"use client";

import { useEffect, useMemo, useState } from "react";
import Link from 'next/link'
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, Bot, Camera, Check, ChevronRight, CircleAlert, Clock3, Network, Paperclip, Radio, ShieldCheck, UserRound, X, Zap } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputButton, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools, captureScreenshot, usePromptInputAttachments } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { activity, domainOrder, enterpriseData, type EnterpriseDomain } from "./data";

const statusStyle: Record<"On track" | "Needs review" | "At risk", string> = {
  "On track": "text-success",
  "Needs review": "text-warning",
  "At risk": "text-destructive",
};

function CopilotAttachments({ onChange }: { onChange?: (count: number) => void }) {
  const attachments = usePromptInputAttachments();
  const count = attachments.files.length;
  useEffect(() => { onChange?.(count); }, [count, onChange]);
  if (count === 0) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {attachments.files.map((file) => (
        <span key={file.id} className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">
          {file.mediaType?.startsWith("image/") && file.url ? <img src={file.url} alt="" className="size-4 rounded-sm object-cover" /> : <Paperclip className="size-3 text-muted-foreground" />}
          <span className="max-w-36 truncate">{file.filename}</span>
          <button type="button" aria-label={`Remove ${file.filename}`} onClick={() => attachments.remove(file.id)} className="text-muted-foreground transition-colors hover:text-foreground"><X className="size-3" /></button>
        </span>
      ))}
    </div>
  );
}

function CopilotTools() {
  const attachments = usePromptInputAttachments();
  const [capturing, setCapturing] = useState(false);
  const handleScreenshot = async () => {
    if (capturing) return;
    setCapturing(true);
    try {
      const shot = await captureScreenshot();
      if (shot) attachments.add([shot]);
    } catch {
      // Screenshot picker dismissed or unsupported — nothing to add.
    } finally {
      setCapturing(false);
    }
  };
  return (
    <TooltipProvider delayDuration={200}>
      <PromptInputTools>
        <PromptInputButton aria-label="Attach files" tooltip="Attach files" onClick={() => attachments.openFileDialog()}><Paperclip className="size-4" /></PromptInputButton>
        <PromptInputButton aria-label="Capture screenshot" tooltip="Capture screenshot" disabled={capturing} onClick={() => void handleScreenshot()}><Camera className="size-4" /></PromptInputButton>
      </PromptInputTools>
    </TooltipProvider>
  );
}

export function EnterpriseExperience() {
  const [domain, setDomain] = useState<EnterpriseDomain>("executive");
  const [input, setInput] = useState("");
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [decision, setDecision] = useState<"pending" | "approved" | "deferred">("pending");
  const data = enterpriseData[domain];
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { domain } }), [domain]);
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const submit = (text: string, files?: FileUIPart[]) => {
    if ((!text.trim() && !(files && files.length > 0)) || status === "submitted" || status === "streaming") return;
    void sendMessage({ text: text.trim(), files: files ?? [] }, { body: { domain } });
    setInput("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="overflow-hidden border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-5 md:px-8 md:pb-14">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Network className="size-4" /></div><div><p className="font-display text-lg font-semibold">Myria OS</p><p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Intelligence layer</p></div></div>
            <div className="flex items-center gap-3"><span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-success" />All systems operational</span><Button asChild variant="outline" size="sm"><Link href="/experience/myria-os"><Zap /> Workflows</Link></Button><Button asChild variant="outline" size="sm"><Link href="/experience/myria-os"><ShieldCheck /> Approvals</Link></Button><Button asChild variant="outline" size="sm"><Link href="/experience/myria-os"><Bot /> Manage agents</Link></Button></div>
          </header>
          <div className="mt-16 max-w-4xl md:mt-24">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span className="h-px w-8 bg-primary" /> Enterprise AI</div>
            <h1 className="font-display text-4xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">See the AI-enabled<br />enterprise in motion.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">People, specialized agents, enterprise data, human decisions and durable workflows—operating through one connected intelligence layer.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-3 py-4 md:px-8 md:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-lg border border-border bg-card shadow-command">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <div><strong className="font-display text-sm">Enterprise Command Center</strong><p className="text-[11px] text-muted-foreground">Live operating picture · Updated moments ago</p></div>
            <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-[11px] font-medium text-secondary-foreground"><Radio className="size-3 text-success" />12 people <span className="text-border">·</span> 8 AI agents</div>
          </div>

          <div className="grid lg:grid-cols-[190px_minmax(0,1fr)_340px]">
            <nav className="border-b border-border bg-sidebar p-3 lg:border-b-0 lg:border-r" aria-label="Enterprise domains">
              <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Operating views</p>
              <div className="flex gap-1 overflow-x-auto lg:flex-col">
                {domainOrder.map((item) => {
                  const itemData = enterpriseData[item];
                  const Icon = itemData.icon;
                  const isActive = domain === item;

                  return (
                    <Button
                      key={item}
                      variant={isActive ? "secondary" : "ghost"}
                      onClick={() => {
                        setDomain(item);
                        setDecision("pending");
                      }}
                      className={isActive ? "min-w-max justify-start bg-primary/10 text-primary hover:bg-primary/15" : "min-w-max justify-start text-muted-foreground hover:text-foreground"}
                    >
                      <Icon />
                      {itemData.label}
                      <ChevronRight className="ml-auto hidden size-3 lg:block" />
                    </Button>
                  );
                })}
              </div>
              <div className="mt-7 hidden border-t border-border px-3 pt-5 lg:block"><p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Connected fabric</p><div className="mt-3 space-y-2 text-xs"><p className="flex items-center gap-2"><ShieldCheck className="size-3 text-success" />36 data sources</p><p className="flex items-center gap-2"><Activity className="size-3 text-primary" />14 workflows active</p></div></div>
            </nav>

            <div className="min-w-0 p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div key={domain} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}>
                  <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">{data.label} focus</p><h2 className="mt-2 max-w-xl font-display text-2xl font-semibold leading-tight md:text-3xl">{data.headline}</h2></div><div className="shrink-0 sm:text-right"><p className="font-display text-3xl font-semibold">{data.metric}</p><p className="text-xs text-muted-foreground">{data.metricLabel}</p><p className="mt-1 text-[11px] font-medium text-success">{data.delta}</p></div></div>

                  <div className="grid gap-7 pt-6 xl:grid-cols-[minmax(0,1fr)_220px]">
                    <div><div className="mb-4 flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Priority work</h3><span className="text-[11px] text-muted-foreground">3 active</span></div><div className="divide-y divide-border border-y border-border">{data.priorities.map((priority, index) => <div key={priority.title} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-4"><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span><div><p className="text-sm font-medium">{priority.title}</p><p className="mt-1 text-[11px] text-muted-foreground">{priority.owner} · {priority.progress}% complete</p><div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${priority.progress}%` }} className="h-full bg-primary" /></div></div><span className={`text-[10px] font-semibold ${statusStyle[priority.status]}`}>{priority.status}</span></div>)}</div></div>
                    <aside><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Operating health</h3><strong className="font-display text-2xl">{data.health}</strong></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><motion.div initial={{ width: 0 }} animate={{ width: `${data.health}%` }} className="h-full bg-success" /></div><div className="mt-6 space-y-4">{data.signals.map((signal, index) => <div key={signal} className="flex gap-3"><span className={`mt-1 size-1.5 shrink-0 rounded-full ${index === 0 ? "bg-warning" : "bg-primary"}`} /><p className="text-xs leading-5 text-muted-foreground">{signal}</p></div>)}</div></aside>
                  </div>

                  <div className="mt-7 border-l-2 border-warning bg-warning-soft p-4"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-warning"><CircleAlert className="size-3" /> Decision required</p><h3 className="mt-2 text-sm font-semibold">{data.decision.title}</h3><p className="mt-1 text-xs text-muted-foreground">{data.decision.detail} · {data.decision.due}</p></div>{decision === "pending" ? <div className="flex shrink-0 gap-2"><Button size="sm" variant="ghost" onClick={() => setDecision("deferred")}>Defer</Button><Button size="sm" onClick={() => setDecision("approved")}><Check />Approve</Button></div> : <span className={`flex items-center gap-2 text-xs font-semibold ${decision === "approved" ? "text-success" : "text-muted-foreground"}`}>{decision === "approved" ? <Check className="size-4" /> : <Clock3 className="size-4" />}{decision === "approved" ? "Approved" : "Deferred"}</span>}</div></div>
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="flex min-h-[560px] flex-col border-t border-border bg-ai-panel lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-3"><div className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Bot className="size-4" /></div><div><h2 className="text-sm font-semibold">Myria AI</h2><p className="text-[10px] text-muted-foreground">Operating copilot</p></div></div><span className="size-2 rounded-full bg-success" /></div>
              <Conversation className="min-h-0 flex-1"><ConversationContent className="gap-5 p-5">{messages.length === 0 && <div className="py-5"><p className="font-display text-xl font-semibold">What needs your attention?</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Ask Myria to synthesize the current {data.label.toLowerCase()} picture and recommend a next move.</p><button type="button" onClick={() => submit(data.prompt)} className="mt-5 flex w-full items-center justify-between border-y border-border py-3 text-left text-xs font-medium transition-colors hover:text-primary">{data.prompt}<ArrowRight className="size-3" /></button></div>}{messages.map((message) => <Message from={message.role} key={message.id}><MessageContent>{message.parts.map((part, index) => part.type === "text" ? <MessageResponse key={index}>{part.text}</MessageResponse> : part.type === "reasoning" ? <p key={index} className="text-[11px] italic text-muted-foreground">{part.text}</p> : part.type === "file" ? <span key={index} className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-[10px] text-secondary-foreground">{part.mediaType?.startsWith("image/") && part.url ? <img src={part.url} alt="" className="size-4 rounded-sm object-cover" /> : <Paperclip className="size-3 text-muted-foreground" />}<span className="max-w-36 truncate">{part.filename}</span></span> : null)}</MessageContent></Message>)}{status === "submitted" && <Shimmer className="text-xs">Analyzing enterprise signals…</Shimmer>}{error && <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">{error.message}</div>}</ConversationContent><ConversationScrollButton /></Conversation>
              <div className="border-t border-border p-4"><PromptInput onSubmit={({ text, files }) => submit(text, files)} className="bg-card" multiple maxFileSize={20 * 1024 * 1024}><CopilotAttachments onChange={setAttachmentCount} /><PromptInputTextarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={`Ask about ${data.label.toLowerCase()}…`} className="min-h-20" /><PromptInputFooter className="justify-between"><CopilotTools /><PromptInputSubmit status={status} onStop={stop} disabled={!input.trim() && attachmentCount === 0 && status === "ready"} /></PromptInputFooter></PromptInput></div>
            </aside>
          </div>

          <div className="border-t border-border bg-foreground px-5 py-4 text-background"><div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Live enterprise activity</p><span className="flex items-center gap-2 text-[10px] text-background/60"><span className="size-1.5 rounded-full bg-success" />Streaming</span></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{activity.map((item, index) => <motion.div key={item.target} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.08 }} className="flex gap-3 border-l border-background/20 pl-3"><div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-background/10">{index % 2 ? <UserRound className="size-3" /> : <Bot className="size-3" />}</div><p className="text-[10px] leading-4 text-background/65"><strong className="text-background">{item.actor}</strong> {item.action} <span className="text-background">{item.target}</span> · {item.time}</p></motion.div>)}</div></div>
        </motion.div>
      </section>
    </main>
  );
}
