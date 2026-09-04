'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, BrainCircuit, CircleDashed, Orbit } from 'lucide-react'
import { useState } from 'react'

const signals = [
  { label: 'Human judgment', detail: 'Context, nuance, consequence', icon: BrainCircuit },
  { label: 'Machine breadth', detail: 'Patterns, options, velocity', icon: Orbit },
  { label: 'Shared momentum', detail: 'One decision, fully connected', icon: CircleDashed },
]

export function IntelligenceLayer() {
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 })
  const rotate = useTransform(smoothX, [-300, 300], [-4, 4])

  return (
    <section className="relative overflow-hidden border-y border-border bg-[color:var(--navy)] text-white" onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      x.set(event.clientX - rect.left - rect.width / 2)
      y.set(event.clientY - rect.top - rect.height / 2)
    }}>
      <motion.div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-primary/15 blur-3xl" style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d9b273]">The Myria advantage</p>
          <motion.h2 style={{ rotate }} className="mt-5 max-w-xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">Intelligence is powerful. <em className="text-[#d9b273]">Together</em>, it becomes useful.</motion.h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/65">The future of consulting is not human versus machine. It is the right human question, amplified by an intelligence layer that keeps thinking when the room goes quiet.</p>
          <a href="/collaborative-advisory/demo-session" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#d9b273] hover:text-[#f1d2a0]">Enter the intelligence layer <ArrowUpRight size={16} /></a>
        </div>
        <div className="grid gap-3 self-center">
          {signals.map((signal, index) => {
            const Icon = signal.icon
            const isActive = active === index
            return <motion.button key={signal.label} type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} whileHover={{ x: 8 }} className={`flex items-center gap-5 border p-5 text-left transition-all ${isActive ? 'border-primary bg-white/10' : 'border-white/10 bg-white/[0.03]'}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${isActive ? 'border-primary text-primary' : 'border-white/15 text-white/50'}`}><Icon size={20} /></span>
              <span className="flex-1"><span className="block font-serif text-2xl">{signal.label}</span><span className="mt-1 block text-sm text-white/50">{signal.detail}</span></span>
              <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? 'bg-primary shadow-[0_0_16px_var(--primary)]' : 'bg-white/20'}`} />
            </motion.button>
          })}
        </div>
      </div>
    </section>
  )
}
