'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { teamModes } from '@/data/teams'

export function VirtualTeamsSection() {
  return (
    <section id="virtual-team" className="border-y border-border bg-card/35">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10 lg:py-28">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">A virtual team, not a chatbot</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">Human judgment, multiplied by intelligence.</h2>
          <p className="mt-6 max-w-lg leading-7 text-muted-foreground">Myria gives your team access to a coordinated bench of virtual consultants. Move between perspectives without losing the thread of the decision.</p>
          <a href="#labs" className="mt-8 inline-flex items-center gap-1 border-b border-primary pb-1 text-sm font-semibold text-primary">Meet the advisory labs <ArrowUpRight size={15} /></a>
        </div>

        <div className="relative rounded-[2rem] border border-border bg-background p-4 shadow-xl shadow-primary/5 md:p-6">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative space-y-3">
            {teamModes.map((mode, index) => {
              const Icon = mode.icon
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  whileHover={{ x: 8, scale: 1.015 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/50 md:p-5"
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-primary-foreground ${mode.color}`}><Icon size={20} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{mode.label}</p>
                    <h3 className="mt-1 font-serif text-xl leading-tight">{mode.title}</h3>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{mode.copy}</p>
                  </div>
                  <span className="hidden text-primary opacity-0 transition-opacity group-hover:opacity-100 md:block"><ArrowUpRight size={18} /></span>
                </motion.div>
              )
            })}
          </div>
          <div className="relative mt-5 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>One room</span><span className="text-primary">Three lenses</span><span>Clearer moves</span>
          </div>
        </div>
      </div>
    </section>
  )
}