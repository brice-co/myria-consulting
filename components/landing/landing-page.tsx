'use client'

import { useState } from 'react'
import { useScroll } from 'framer-motion'
import { Header } from './header'
import { HeroSection } from './hero-section'
import { ProblemsSolvedSection } from './problems-solved-section'
import { HowMyriaWorksSection } from './how-myria-works-section'
import { IntelligenceLayer } from './intelligence-layer'
import { VirtualTeamsSection } from './virtual-teams-section'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { LeadersSection } from './leaders-section'
import { Footer } from '@/components/layouts/Footer'
import { ApproachSection } from './approach-section'
import { LabsSection } from './labs-section'


export function LandingPage() {
  const { scrollYProgress } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)  
    

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="top">
        <HeroSection scrollYProgress={scrollYProgress} />
        <ScrollReveal direction="up"><IntelligenceLayer /></ScrollReveal>
        <ScrollReveal direction="left" delay={0.05}><ApproachSection /></ScrollReveal>
        <ScrollReveal direction="right" delay={0.05}><ProblemsSolvedSection /></ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}><LabsSection /></ScrollReveal>
        <ScrollReveal direction="left" delay={0.08}><HowMyriaWorksSection /></ScrollReveal>
        <ScrollReveal direction="right" delay={0.08}><VirtualTeamsSection /></ScrollReveal>
        <ScrollReveal direction="up" delay={0.08}><LeadersSection /></ScrollReveal>
        </main>
      <Footer />
    </div>
  )
}
