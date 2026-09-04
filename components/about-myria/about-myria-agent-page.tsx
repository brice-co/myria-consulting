"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mic,
  MicOff,
  PhoneOff,
  Radio,
  Sparkles,
} from "lucide-react";

import { ABOUT_MYRIA_STARTERS } from "@/config/about-myria-agent";
import {
  AI_LAYERS,
  SPECIALISTS,
} from "@/data/myria-about";
import { useAboutMyriaAgent } from "@/hooks/use-about-myria-agent";

export function AboutMyriaAgentPage() {
  const agent = useAboutMyriaAgent();
  const [text, setText] = useState("");

  const transcriptBottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!agent.transcript.length) return;

    transcriptBottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [agent.transcript]);

  const send = () => {
    const trimmed = text.trim();

    if (!trimmed) return;

    agent.sendText(trimmed);
    setText("");
  };

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#17313a]">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-24 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[#b57b2a]" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b57b2a]">
            About Myria
          </p>
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.04] tracking-[-0.035em] sm:text-6xl">
          Meet the virtual{" "}
          <span className="italic text-[#b57b2a]">
            consulting firm.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#607075]">
          Explore Myria&apos;s specialist advisors,
          Advisory Labs, virtual operating model, and
          what it means to embed AI into the
          organization as an operating layer.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="overflow-hidden rounded-[32px] border border-[#17313a]/10 bg-[#fbf8f3] shadow-[0_24px_80px_rgba(23,49,58,.08)]"
        >
          <div className="grid min-h-[740px] lg:h-[740px] lg:min-h-0 lg:grid-cols-[1.05fr_.95fr]">
            {/* LEFT: LIVE AGENT CONVERSATION */}
            <div className="flex min-h-[740px] min-w-0 flex-col border-b border-[#17313a]/10 lg:min-h-0 lg:border-b-0 lg:border-r">
              {/* HEADER */}
              <header className="shrink-0 flex items-center justify-between border-b border-[#17313a]/10 px-6 py-4">
                <div>
                  <p className="font-serif text-lg">
                    About Myria
                  </p>

                  <p className="text-[11px] text-[#738084]">
                    Virtual consulting guide
                  </p>
                </div>

                <span className="text-xs text-[#657478]">
                  {agent.status === "connected"
                    ? "● Live"
                    : "Ready"}
                </span>
              </header>

              {/* SILENCE WARNING */}
              {agent.silenceWarning && (
                <div className="shrink-0 mx-5 mt-4 rounded-full bg-[#fff4df] px-4 py-2 text-xs text-[#7b5b29]">
                  Still there? This session will close
                  automatically after a period of
                  silence.
                </div>
              )}

              {/* SCROLLABLE TRANSCRIPT */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
                <div className="space-y-4 p-6">
                  {!agent.transcript.length ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                      <Sparkles className="h-7 w-7 text-[#5d8f88]" />

                      <h2 className="mt-5 font-serif text-2xl">
                        Explore how Myria works.
                      </h2>

                      <p className="mt-3 max-w-md text-sm leading-6 text-[#68777a]">
                        Meet the specialists, explore AI
                        Enablement, or describe a
                        business problem.
                      </p>

                      <div className="mt-7 flex max-w-xl flex-wrap justify-center gap-2">
                        {ABOUT_MYRIA_STARTERS.map(
                          (prompt) => (
                            <button
                              key={prompt}
                              disabled={
                                agent.status !==
                                "connected"
                              }
                              onClick={() =>
                                agent.sendText(prompt)
                              }
                              className="rounded-full border border-[#17313a]/10 bg-white/60 px-3 py-2 text-xs transition hover:bg-white disabled:opacity-40"
                            >
                              {prompt}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  ) : (
                    agent.transcript.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className={`max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-6 ${
                          item.role === "user"
                            ? "ml-auto bg-[#17313a] text-white"
                            : "border border-[#17313a]/8 bg-white/65"
                        }`}
                      >
                        {item.text}
                      </motion.div>
                    ))
                  )}

                  <div
                    ref={transcriptBottomRef}
                    aria-hidden="true"
                    className="h-px"
                  />
                </div>
              </div>

              {/* COMPOSER + CONTROLS */}
              <div className="shrink-0 border-t border-[#17313a]/10 bg-[#fbf8f3] p-5">
                <div className="relative">
                  <input
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        send();
                      }
                    }}
                    disabled={
                      agent.status !== "connected"
                    }
                    placeholder="Ask about Myria…"
                    className="w-full rounded-full border border-[#17313a]/12 bg-white/70 py-3 pl-5 pr-12 text-sm outline-none transition focus:border-[#b57b2a]/50 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    onClick={send}
                    disabled={
                      agent.status !== "connected" ||
                      !text.trim()
                    }
                    className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#17313a] text-white transition hover:opacity-90 disabled:opacity-30"
                    aria-label="Send message"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>

                {agent.status !== "connected" ? (
                  <button
                    onClick={agent.connect}
                    disabled={
                      agent.status === "connecting"
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#b57b2a] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    <Radio className="h-4 w-4" />

                    {agent.status === "connecting"
                      ? "Connecting…"
                      : "Start About Myria"}
                  </button>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={agent.toggleMute}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#17313a]/12 px-4 py-3 text-sm font-semibold transition hover:bg-white/60"
                    >
                      {agent.muted ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}

                      {agent.muted
                        ? "Unmute"
                        : "Mute"}
                    </button>

                    <button
                      onClick={agent.endSession}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#17313a]/12 px-4 py-3 text-sm font-semibold transition hover:bg-white/60"
                    >
                      <PhoneOff className="h-4 w-4" />
                      End
                    </button>
                  </div>
                )}

                {agent.error && (
                  <p className="mt-3 text-xs text-red-700">
                    {agent.error}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT: MYRIA SYSTEM MAP + TOOL EVENTS */}
              <aside className="flex min-h-[740px] min-w-0 flex-col bg-[#f3eee6] p-6 lg:min-h-0">
                {/* SYSTEM MAP */}
                <div className="min-h-0 flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto overscroll-contain pr-1">
                    <div className="rounded-[26px] border border-[#17313a]/10 bg-[#fbf8f3] p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b57b2a]">
                        Myria system map
                      </p>

                      <h2 className="mt-1 font-serif text-2xl">
                        {agent.state.topic ||
                          "The virtual partner"}
                      </h2>

                      <p className="mt-5 text-sm leading-7 text-[#5f7074]">
                        {agent.state.summary ||
                          "Myria brings four specialist perspectives together around the business problem."}
                      </p>

                      {/* AI ENABLEMENT LAYERS */}
                      {agent.state.activeLayerId ? (
                        <div className="mt-5 space-y-2">
                          {AI_LAYERS.map(
                            ([
                              id,
                              number,
                              name,
                              purpose,
                            ]) => (
                              <motion.div
                                key={id}
                                initial={{
                                  opacity: 0,
                                  y: 4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className={`flex items-center gap-3 rounded-full border px-3 py-2.5 transition ${
                                  agent.state.activeLayerId ===
                                  id
                                    ? "border-[#b57b2a]/45 bg-[#fff6e7]"
                                    : "border-[#17313a]/8 bg-white/50"
                                }`}
                              >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8efec] text-[10px]">
                                  {number}
                                </span>

                                <div className="min-w-0">
                                  <p className="text-xs font-semibold">
                                    {name}
                                  </p>

                                  <p className="text-[9px] uppercase tracking-[0.12em] text-[#849093]">
                                    {purpose}
                                  </p>
                                </div>
                              </motion.div>
                            ),
                          )}
                        </div>
                      ) : (
                        /* SPECIALISTS */
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          {SPECIALISTS.map(
                            (specialist) => (
                              <motion.div
                                key={specialist.id}
                                initial={{
                                  opacity: 0,
                                  y: 4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className={`rounded-2xl border p-4 transition ${
                                  agent.state
                                    .activeSpecialistId ===
                                  specialist.id
                                    ? "border-[#b57b2a]/50 bg-[#fff6e7]"
                                    : "border-[#17313a]/8 bg-white/50"
                                }`}
                              >
                                <p className="text-sm font-semibold">
                                  {specialist.name}
                                </p>

                                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#788689]">
                                  {specialist.purpose}
                                </p>
                              </motion.div>
                            ),
                          )}
                        </div>
                      )}

                      {/* HIGHLIGHTS */}
                      {!!agent.state.highlights.length && (
                        <div className="mt-5">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#788689]">
                            What to notice
                          </p>

                          <div className="space-y-2">
                            {agent.state.highlights.map(
                              (item) => (
                                <motion.div
                                  key={item}
                                  initial={{
                                    opacity: 0,
                                    y: 4,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  className="rounded-2xl border border-[#17313a]/8 bg-white/55 px-4 py-3 text-xs leading-5 text-[#526368]"
                                >
                                  {item}
                                </motion.div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* RELATED PAGE */}
                      {agent.state.relatedHref &&
                        agent.state.relatedLabel && (
                          <Link
                            href={
                              agent.state.relatedHref
                            }
                            className="mt-5 flex items-center justify-between rounded-2xl bg-[#17313a] px-4 py-4 text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            <span>
                              {agent.state.relatedLabel}
                            </span>

                            <span>↗</span>
                          </Link>
                        )}
                    </div>
                  </div>
                </div>

                {/* TOOL EVENTS — ALWAYS VISIBLE */}
                <div className="mt-5 shrink-0">
                  <div className="rounded-[24px] border border-[#17313a]/10 bg-[#fbf8f3] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b57b2a]">
                          Tool events
                        </p>

                        <p className="mt-1 text-[11px] text-[#7b888b]">
                          Live specialist and system activity
                        </p>
                      </div>

                      {agent.events.length > 0 && (
                        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#e8efec] px-2 text-[10px] font-semibold text-[#17313a]">
                          {agent.events.length}
                        </span>
                      )}
                    </div>

                    {/* EVENT SCROLLER */}
                    <div className="mt-4 max-h-[170px] overflow-y-auto overscroll-contain pr-1">
                      <div className="space-y-2">
                        {agent.events.length ? (
                          agent.events.map(
                            (event) => (
                              <motion.div
                                key={event.id}
                                initial={{
                                  opacity: 0,
                                  y: 4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className={`rounded-2xl border px-3 py-3 text-xs ${
                                  event.status ===
                                  "running"
                                    ? "border-[#b57b2a]/30 bg-[#fff6e7]"
                                    : event.status ===
                                        "error"
                                      ? "border-red-200 bg-red-50 text-red-800"
                                      : "border-[#17313a]/8 bg-white/55"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className="mt-[1px] shrink-0">
                                    {event.status ===
                                    "running"
                                      ? "◌"
                                      : event.status ===
                                          "error"
                                        ? "!"
                                        : "✓"}
                                  </span>

                                  <span className="leading-5">
                                    {event.label}
                                  </span>
                                </div>
                              </motion.div>
                            ),
                          )
                        ) : (
                          <p className="rounded-2xl border border-dashed border-[#17313a]/10 px-4 py-5 text-xs leading-5 text-[#7b888b]">
                            Specialist and architecture
                            activity will appear here as
                            you explore Myria.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
          </div>
        </motion.div>
      </section>
    </main>
  );
}