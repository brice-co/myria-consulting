"use client";

import { useEffect, useRef, useState } from "react";
import { ExperienceHeader } from "./experience-header";
import { advisorContributions, advisoryProblem, advisors, initialInsights, opportunities, phasePrompts, phases, type AdvisorId, type AdvisorInsight, type DecisionBrief, type DiscoveryPhase } from "./lib/advisory";
import { AdvisorPanel, type AdvisorStatus } from "./advisor-panel";
import { DiscoverySession, type SessionEntry } from "./discovery-session";
import { AdvisorySynthesis } from "./advisory-synthesis";
import { LeadersSection } from '@/components/landing/leaders-section'

let seq = 0;
const nextId = () => `e${++seq}`;

function contributionsFor(phase: DiscoveryPhase, active: AdvisorId[]): SessionEntry[] {
  return advisors.filter((a) => active.includes(a.id) && advisorContributions[phase][a.id]).map((a) => ({
    id: nextId(), author: a.name, initials: a.initials, isAdvisor: true, text: advisorContributions[phase][a.id]!, phase,
  }));
}

export function AIAdvisoryExperience() {
  const [active, setActive] = useState<AdvisorId[]>(["lead", "strategy", "operations", "data", "people"]);
  const [phase, setPhase] = useState<DiscoveryPhase>("Frame");
  const [entries, setEntries] = useState<SessionEntry[]>(() => contributionsFor("Frame", ["lead", "strategy", "operations", "data", "people"]));
  const [insights, setInsights] = useState<AdvisorInsight[]>(initialInsights);
  const [captured, setCaptured] = useState<string[]>([]);
  const [pinned, setPinned] = useState<string[]>([]);
  const [selectedOpps, setSelectedOpps] = useState<string[]>([]);
  const [focusedOpp, setFocusedOpp] = useState<string | null>(null);
  const [committed, setCommitted] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Partial<Record<AdvisorId, AdvisorStatus>>>({});
  const [brief, setBrief] = useState<DecisionBrief | null>(null);
  const [briefCopied, setBriefCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const activeAdvisors = advisors.filter((a) => active.includes(a.id));

  function respond(build: () => SessionEntry[], contributing?: AdvisorId[]) {
    setThinking(true);
    const ids = contributing ?? active;
    setStatus(Object.fromEntries(ids.map((id) => [id, "thinking" as AdvisorStatus])));
    timer.current = setTimeout(() => {
      setEntries((prev) => [...prev, ...build()]);
      setThinking(false);
      setStatus(Object.fromEntries(ids.map((id) => [id, "contributing" as AdvisorStatus])));
    }, 900);
  }

  function advance() {
    const i = phases.indexOf(phase);
    if (i >= phases.length - 1) return;
    const next = phases[i + 1];
    if (!next) return;
    selectPhase(next);
  }

  function selectPhase(next: DiscoveryPhase) {
    if (next === phase) return;
    setPhase(next);
    respond(() => contributionsFor(next, active));
  }

  function reset() {
    const all: AdvisorId[] = ["lead", "strategy", "operations", "data", "people"];
    setActive(all);
    setPhase("Frame");
    setEntries(contributionsFor("Frame", all));
    setInsights(initialInsights);
    setCaptured([]);
    setPinned([]);
    setSelectedOpps([]);
    setFocusedOpp(null);
    setCommitted(false);
    setDraft("");
    setStatus({});
    setBrief(null);
    setBriefCopied(false);
  }

  function removeInsight(id: string) {
    setInsights((list) => list.filter((i) => i.id !== id));
    setCaptured((c) => c.filter((x) => x !== id));
    setPinned((p) => p.filter((x) => x !== id));
  }

  function togglePin(id: string) {
    setPinned((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function ask(text: string) {
    setEntries((prev) => [...prev, { id: nextId(), author: "You", initials: "YO", isAdvisor: false, text, phase }]);
    const mention = activeAdvisors.find((a) => a.id !== "lead" && text.toLowerCase().includes(`@${a.name.toLowerCase()}`));
    const specialists = activeAdvisors.filter((a) => a.id !== "lead");
    const pick = mention ?? specialists[Math.floor(Math.random() * specialists.length)];
    respond(() => [
      ...(pick ? [{ id: nextId(), author: pick.name, initials: pick.initials, isAdvisor: true, text: `From a ${pick.framework.toLowerCase()} lens: ${pick.focus.toLowerCase()} is where I'd look first on this question.`, phase }] : []),
      { id: nextId(), author: "Lead advisor", initials: "LA", isAdvisor: true, text: `Noted in the shared context. I'll connect this to the ${phase.toLowerCase()} work already underway.`, phase },
    ], pick ? [pick.id, "lead"] : ["lead"]);
  }

  function replyTo(e: SessionEntry) {
    setDraft(`@${e.author} `);
  }

  function capture(e: SessionEntry) {
    const advisor = advisors.find((a) => a.name === e.author);
    if (!advisor) return;
    setCaptured((c) => [...c, e.id]);
    setInsights((list) => [...list, { id: e.id, advisor: advisor.id, phase: e.phase, text: e.text }]);
  }

  function toggleAdvisor(id: AdvisorId) {
    const advisor = advisors.find((a) => a.id === id);
    const joining = !active.includes(id);
    setActive((list) => (joining ? [...list, id] : list.filter((x) => x !== id)));
    if (advisor) {
      setEntries((prev) => [...prev, {
        id: nextId(), author: "Lead advisor", initials: "LA", isAdvisor: true, phase,
        text: joining ? `${advisor.name} joins the session — adding the ${advisor.framework.toLowerCase()} perspective.` : `${advisor.name} steps out of the session.`,
      }]);
    }
  }

  function toggleOpp(id: string) {
    setCommitted(false);
    setBrief(null);
    setBriefCopied(false);
    setSelectedOpps((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }

  function generateBrief() {
    const chosen = opportunities.filter((o) => selectedOpps.includes(o.id));
    if (chosen.length === 0) return;
    const evidence = insights.filter((i) => pinned.includes(i.id));
    const lead = chosen[0]!;
    const summary = `The advisory team recommends ${chosen.length} move${chosen.length === 1 ? "" : "s"} for "${advisoryProblem.title}", starting with ${lead.title} (impact ${lead.impact}, effort ${lead.effort}). ${evidence.length > 0 ? `The recommendation is backed by ${evidence.length} pinned insight${evidence.length === 1 ? "" : "s"} from the session.` : "Pin insights as evidence to strengthen the brief."}`;
    setBrief({
      id: nextId(),
      title: `Decision brief — ${advisoryProblem.title}`,
      createdAt: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      phase,
      opportunities: chosen,
      evidence,
      summary,
    });
    setBriefCopied(false);
    setEntries((prev) => [...prev, { id: nextId(), author: "Lead advisor", initials: "LA", isAdvisor: true, text: `Decision brief generated covering ${chosen.length} committed move${chosen.length === 1 ? "" : "s"} — ready to share with leadership.`, phase }]);
  }

  async function copyBrief() {
    if (!brief) return;
    const lines = [
      brief.title,
      `${brief.createdAt} · Phase: ${brief.phase}`,
      "",
      brief.summary,
      "",
      "Committed moves:",
      ...brief.opportunities.map((o, n) => `${n + 1}. ${o.title} (owner: ${advisors.find((a) => a.id === o.advisor)?.name ?? o.advisor}, impact ${o.impact}, effort ${o.effort})`),
      ...(brief.evidence.length > 0 ? ["", "Evidence:", ...brief.evidence.map((i) => `- ${i.text}`)] : []),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setBriefCopied(true);
    } catch {
      setBriefCopied(false);
    }
  }

  function commit() {
    setCommitted(true);
    const titles = opportunities.filter((o) => selectedOpps.includes(o.id)).map((o) => o.title).join(", ");
    const evidence = pinned.length > 0 ? ` Backed by ${pinned.length} pinned insight${pinned.length === 1 ? "" : "s"}.` : "";
    setEntries((prev) => [...prev, { id: nextId(), author: "Lead advisor", initials: "LA", isAdvisor: true, text: `Decision committed: ${titles}.${evidence} Next steps assigned to owning advisors for follow-through.`, phase }]);
  }

  return (
    <>
    <div className="mx-auto max-w-7xl py-15 "> {/* Or whatever your root wrapper layout is */}
      
      {/* 1. Header goes at the very top of your markup */}
      <ExperienceHeader /> 
    </div>
    <div className="animate-rise overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_30px_80px_rgba(18,42,49,.10)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div><strong className="text-xs text-foreground">AI Advisory</strong><div className="text-[9px] text-muted-foreground">A virtual advisory team built around the problem · {activeAdvisors.length} advisors in session</div></div>
        <span className="text-[9px] font-semibold text-primary">● SESSION LIVE</span>
      </div>
      <div className="grid min-h-[520px] lg:grid-cols-[230px_1fr_290px]">
        <AdvisorPanel advisors={advisors} active={active} status={status} onToggle={toggleAdvisor} />
        <DiscoverySession problem={advisoryProblem} phases={phases} phase={phase} prompt={phasePrompts[phase]} entries={entries} advisors={activeAdvisors}
          captured={captured} draft={draft} onDraftChange={setDraft} onCapture={capture} onAdvance={advance} onSelectPhase={selectPhase} onAsk={ask} onReply={replyTo} thinking={thinking} />
        <AdvisorySynthesis insights={insights} opportunities={opportunities} advisors={advisors} selected={selectedOpps} focused={focusedOpp} pinned={pinned}
          onToggleOpportunity={toggleOpp} onFocusOpportunity={setFocusedOpp} onTogglePin={togglePin} committed={committed} onCommit={commit} onReset={reset} onRemoveInsight={removeInsight}
          brief={brief} onGenerateBrief={generateBrief} onCopyBrief={copyBrief} briefCopied={briefCopied} />
      </div>
      
    </div>
    <LeadersSection/>
    </>
  );
}
