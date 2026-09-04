'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { steps } from "@/data/steps"
import { ArrowUpRight, Check } from 'lucide-react'


export function HowMyriaWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const active = steps[activeStep]
  const ActiveIcon = active.icon

  return (
    <section id="how-it-works" className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">How Myria works</p>
            <h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              From a hard question to a <em>clear next move.</em>
            </h2>
            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              A human-led, intelligence-amplified process designed for the decisions that cannot wait for perfect certainty.
            </p>
            <a href="/collaborative-advisory/demo-session" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
              Start a working session <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-border md:block" aria-hidden="true" />
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                return (
                  <motion.button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className={`relative w-full rounded-2xl border p-5 text-left transition-colors md:p-6 ${isActive ? 'border-primary bg-card shadow-lg shadow-primary/10' : 'border-border bg-card/35 hover:border-primary/50'}`}
                    aria-pressed={isActive}
                  >
                    <div className="relative z-10 flex items-start gap-4 md:gap-6">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs transition-colors ${isActive ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>
                        {isActive ? <Check size={15} /> : step.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center justify-between gap-3">
                          <span className="font-serif text-2xl md:text-3xl">{step.title}</span>
                          <Icon size={20} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-muted-foreground">{step.short}</span>
                        <motion.span initial={false} animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 16 : 0 }} className="block overflow-hidden">
                          <span className="block max-w-xl text-sm leading-7 text-foreground/75">{step.detail}</span>
                          <span className="mt-4 inline-flex items-center gap-2 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary"><Check size={13} /> {step.deliverable}</span>
                        </motion.span>
                      </span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
            <div className="mt-6 flex items-center gap-3 md:pl-16">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} transition={{ type: 'spring', stiffness: 160, damping: 24 }} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{activeStep + 1} / {steps.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}