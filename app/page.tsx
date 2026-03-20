'use client';

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { HeroFilm } from "@/components/marketing/HeroFilm";
import VideoSection from "@/components/sections/VideoSection";
import { VoiceAgentDemo } from "@/components/demo-tools/VoiceAgentDemo";
import { MultiAgentFlow } from "@/components/demo-tools/MultiAgentFlow";
import { ArchitectureDiagram } from "@/components/demo-tools/ArchitectureDiagram";
import FAQ from "@/components/landing/FAQ";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { PAGE_AGENTS } from "@/config/agentConfigs";

import Marquee from "@/components/sections/Marquee";

import dynamic from "next/dynamic";
import { Bot, Phone } from "lucide-react";

// Dynamically import the Scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/sections/Scene'), { ssr: false });

export default function Home() {
  return (
    
      <main className="min-h-screen flex flex-col">
   
        <Hero />
        <div className="fixed inset-0 z-0">
          <Scene />
        </div>
        <div className="relative z-10">

          <Features/>          
          <HeroFilm/>
          <VideoSection />
          <VoiceAgentDemo /> 
          <MultiAgentFlow />  
          <ArchitectureDiagram />      
          
          
          <div className="bg-background pt-10">
            <div className="container mx-auto px-4 md:px-6 ">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                Our Technology Stack
              </h2>
              <p className="text-muted-foreground text-lg text-center mb-8">
                We leverage the latest technologies to deliver a seamless experience.
              </p>
            </div>
            <div className="container mx-auto px-4 md:px-6">
              <Marquee />
            </div>  
            <FAQ />
          </div>      
         
        
          <ChatWidget
          title="Myria Assistant"
          subtitle="Your AI companion for seamless communication and productivity."
          accentColor="260 80% 60%"
          icon={<Phone className="h-12 w-12" />}
          voice="shimmer"
          systemPrompt={PAGE_AGENTS.home.systemPrompt}
          allowedTools={PAGE_AGENTS.home.allowedTools}
        />

        </div>
       
      </main>

  );
}
