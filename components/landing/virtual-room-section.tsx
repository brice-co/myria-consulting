'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, CircleDot, Users } from 'lucide-react'

const agents = [
  { name: 'Mira', role: 'Strategist', x: '18%', y: '28%', color: 'bg-primary' },
  { name: 'Atlas', role: 'Operator', x: '72%', y: '23%', color: 'bg-accent' },
  { name: 'Sage', role: 'Customer lens', x: '23%', y: '72%', color: 'bg-chart-2' },
  { name: 'Pulse', role: 'Data intelligence', x: '72%', y: '70%', color: 'bg-chart-3' },
]

export function VirtualRoom() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative flex items-center justify-between"><div><h2 className="mt-2 font-serif text-3xl">A room that thinks with you.</h2></div><span className="flex items-center gap-2 text-xs text-muted-foreground"><CircleDot size={14} className="text-green-500" /> 4 agents online</span></div>
      <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-primary/10"><motion.div animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-5 rounded-full border border-primary/30" /><div className="relative flex flex-col items-center gap-2 text-center"><BrainCircuit className="text-primary" size={30} /><span className="text-xs font-semibold">Your challenge</span></div></div>
      {agents.map((agent, index) => <motion.div key={agent.name} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.12 }} whileHover={{ scale: 1.08 }} className="absolute z-10 flex items-center gap-3 rounded-xl border border-border bg-background/90 px-3 py-2 shadow-lg backdrop-blur" style={{ left: agent.x, top: agent.y }}><span className={`size-3 rounded-full ${agent.color}`} /><span><strong className="block text-sm">{agent.name}</strong><small className="text-xs text-muted-foreground">{agent.role}</small></span></motion.div>)}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-muted-foreground"><Users size={16} /> Human judgment stays at the center</div>
    </div>
  )
}
