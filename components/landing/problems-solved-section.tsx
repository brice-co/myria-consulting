'use client'

import { problems } from "@/data/challenges"
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronRight, CircleDot } from 'lucide-react'
import { useState } from 'react'

export function ProblemsSolvedSection() {
  const [activeId, setActiveId] = useState<(typeof problems)[number]['id']>('direction')
  const activeProblem = problems.find((problem) => problem.id === activeId) ?? problems[0]

  return (
    <section id="problems-solved" className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:px-10 lg:py-28">
        <div className="lg:sticky lg:top-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Problems we solve</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            The biggest challenges rarely come with simple <em>answers.</em>
          </h2>

          <p className="mt-6 max-w-md leading-7 text-muted-foreground">
            Myria helps organizations bring structure to complex decisions,
            identify what matters most, and move from uncertainty to focused
            action.
          </p>

          <p className="mt-6 max-w-md leading-7 text-muted-foreground">
            Select a challenge to see how a virtual Myria engagement turns complexity into an operating advantage.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
            <CircleDot className="text-primary" size={16} aria-hidden="true" />
            <span>Interactive advisory map</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2" role="tablist" aria-label="Problems Myria solves">
            {problems.map((problem, index) => {
              const isActive = problem.id === activeId
              return (
                <button
                  key={problem.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`problem-panel-${problem.id}`}
                  onClick={() => setActiveId(problem.id)}
                  className={`group flex w-full items-center gap-4 border-b px-1 py-5 text-left transition-colors ${isActive ? 'border-primary text-foreground' : 'border-border text-muted-foreground hover:text-foreground'}`}
                >
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <span className="flex-1 font-serif text-xl">{problem.label}</span>
                  <ChevronRight className={`transition-transform ${isActive ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'}`} size={18} />
                </button>
              )
            })}
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-[color:var(--navy)] p-7 text-white md:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProblem.id}
                id={`problem-panel-${activeProblem.id}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="flex h-full flex-col"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d9b273]">The challenge</p>
                <p className="mt-5 max-w-lg font-serif text-3xl leading-tight md:text-4xl">{activeProblem.problem}</p>
                <div className="my-7 h-px w-full bg-white/15" />
                <p className="max-w-lg leading-7 text-white/70">{activeProblem.description}</p>
                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8">
                  {activeProblem.outcomes.map((outcome) => (
                    <span key={outcome} className="flex items-center gap-2 text-sm text-[#f1d2a0]">
                      <Check size={15} aria-hidden="true" />
                      {outcome}
                    </span>
                  ))}
                </div>
                <a href="#labs" className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#f1d2a0]">
                  Explore a lab <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}