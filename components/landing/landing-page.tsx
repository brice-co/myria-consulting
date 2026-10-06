'use client'

import { useScroll } from 'framer-motion'

import { HeroSection } from './hero-section'
import { ProblemsSolvedSection } from './problems-solved-section'
import { HowMyriaWorksSection } from './how-myria-works-section'
import { IntelligenceLayer } from './intelligence-layer'
import { VirtualTeam } from './virtual-teams-section'
import { TechnologySection } from '@/components/home/technology/technology-section'
import { ExperienceGallery } from "@/components/home/experience-gallery/experience-gallery"
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { LeadersSection } from './leaders-section'
import { Footer } from '@/components/layouts/Footer'




export function LandingPage() {
  const { scrollYProgress } = useScroll()
  

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      
      <main id="top">
        <HeroSection scrollYProgress={scrollYProgress} />
        <ScrollReveal direction="up"><IntelligenceLayer /></ScrollReveal>        
        <ScrollReveal direction="right" delay={0.05}><ProblemsSolvedSection /></ScrollReveal>        
        <ScrollReveal direction="left" delay={0.08}><HowMyriaWorksSection /></ScrollReveal>
        <ScrollReveal direction="right" delay={0.08}><VirtualTeam /></ScrollReveal>
        <ScrollReveal direction="up" delay={0.08}><TechnologySection /></ScrollReveal>
        <ScrollReveal direction="left" delay={0.08}><ExperienceGallery /></ScrollReveal>       
        <ScrollReveal direction="right" delay={0.08}><LeadersSection /></ScrollReveal>
        </main>
      <Footer />
    </div>
  )
}
