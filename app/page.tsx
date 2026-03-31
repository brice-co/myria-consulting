'use client';

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { HeroFilm } from "@/components/marketing/HeroFilm";
import VideoSection from "@/components/sections/VideoSection";
import { ArchitectureDiagram } from "@/components/demo-tools/ArchitectureDiagram";
import FAQ from "@/components/landing/FAQ";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { PAGE_AGENTS } from "@/config/agentConfigs";
import dynamic from "next/dynamic";
import { Bot, Phone } from "lucide-react";

// Dynamically import the Scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/sections/Scene'), { ssr: false });

export default function Home() {
  return (
    
      <main className="min-h-screen flex flex-col">
   
        <Hero />
        <div className="fixed top-0 left-0 w-full h-[400px] md:h-screen z-0 overflow-hidden">
          <Scene />
        </div>
        <div className="relative z-10">

          <Features/>          
          <HeroFilm/>
          <VideoSection />                  
          <ArchitectureDiagram />      
          
          
          <div className="bg-background pt-10">
            
            
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
