'use client'

import { motion } from 'framer-motion'


const disciplines = [['01', 'Strategy', 'Clarify the choices that matter most.'], 
['02', 'Architecture', 'Turn ambition into a system that can run.'], 
['03', 'Operations', 'Make the change durable in the real world.']]

export function ApproachSection() 
{ return <section id="approach" className="border-y border-border bg-card/45">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28"><div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">A different kind of partner</p>
        <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-tight md:text-5xl">Senior thinking, made <em>continuous.</em></h2></div>
        <div className="grid gap-10 md:grid-cols-3">
            {disciplines.map(([number, title, copy], index) => 
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08 }} 
            className="border-t border-border pt-5"><span className="font-mono text-xs text-primary">{number}</span>
            <h3 className="mt-12 font-serif text-2xl">{title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
            </motion.div>)}
            </div>
            </div>
            </section> }

