'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { VirtualRoom } from '@/components/landing/virtual-room-section'

export function VirtualTeam() {
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-14 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Sparkles size={15} /> Myria Labs / live decision rooms</div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">The room gets smarter when everyone is in it.</motion.h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">A working session where your leadership team and a coordinated virtual bench investigate the same challenge together—in real time.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 animate-pulse rounded-full bg-emerald-500" /> Rooms open now</span><span>Human-led. Machine-augmented.</span></div>
          </div>
          <VirtualRoom />
        </div>

        
      </section>
    </main>
  )
}
