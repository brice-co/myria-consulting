'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, Check, Loader2, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function InsightsSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/insights/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to subscribe')
      setStatus('success')
      setMessage(data.message)
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to subscribe right now')
    }
  }

  return (
    <section id="insights" className="border-y border-border bg-card/45">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            <Mail size={14} aria-hidden="true" /> Myria Insights
          </div>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight md:text-4xl">Subscribe to the latest Myria Insights on the topics you care about.</h2>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">Practical perspectives on strategy, AI, operating models, and the decisions shaping what comes next.</p>
        </div>
        <motion.form onSubmit={handleSubmit} whileHover={{ y: -2 }} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
          <label htmlFor="insights-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="insights-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" disabled={status === 'loading'} className="min-w-0 flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60" />
            <button type="submit" disabled={status === 'loading'} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {status === 'loading' ? <Loader2 className="mx-auto animate-spin" size={18} aria-label="Subscribing" /> : <>Subscribe <ArrowUpRight className="ml-1 inline" size={15} /></>}
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">One considered note at a time. Unsubscribe whenever you choose.</p>
          {message && <p role="status" className={`mt-4 flex items-center gap-2 text-sm ${status === 'success' ? 'text-emerald-600' : 'text-destructive'}`}>{status === 'success' && <Check size={15} />}{message}</p>}
        </motion.form>
      </div>
    </section>
  )
}

export default InsightsSignup
