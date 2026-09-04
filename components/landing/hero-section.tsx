'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { ConsultantNetwork } from './consultant-network'

const proofPoints = ['Executive-grade thinking', 'Structured in 90-minute labs', 'Actionable roadmaps, not decks']

export function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -80])
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.96])
  return (
    <motion.section style={{ y: heroY, scale: heroScale }} className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-48">
      <div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary"><span className="h-px w-10 bg-primary" />The virtual management consulting firm</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-balance md:text-7xl">The clarity to move from <em className="text-primary">ambition</em> to action.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Myria pairs proven management consulting thinking with a virtual team of specialist advisors—available when the decision cannot wait.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 flex flex-col gap-4 sm:flex-row"><a href="/advisory-lab" className="rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1">Try AI Voice Advisory <ArrowUpRight className="ml-1 inline" size={16} /></a><a href="#approach" className="rounded-full border border-border px-6 py-3.5 text-center text-sm font-semibold transition-colors hover:bg-card">See how Myria works <ChevronDown className="ml-1 inline" size={16} /></a></motion.div>
        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground">{proofPoints.map((point) => <span key={point}><Check className="mr-1 inline text-primary" size={14} />{point}</span>)}</div>
      </div>
      <ConsultantNetwork />
    </motion.section>
  )
}
