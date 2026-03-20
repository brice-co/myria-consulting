"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Mic} from "lucide-react";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
      {/* Uncomment the following line to include the HeroCanvas */}
      {/* <HeroCanvas /> */}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >

            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-5 py-2.5 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Next-Generation Voice AI Technology</span>
            <Zap className="w-4 h-4" />
          </motion.div>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Custom AI Solutions for Your Business
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Myria Consulting designs and builds enterprise-grade AI solutions —
              starting with AI Voice Agents — and extending into multi-tenant
              collaboration platforms, task orchestration, and agentic systems
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={'/voice-diagnostic/apply'} className="mx-auto sm:mx-0">
              <Button size="lg" className="group">
                Request Custom Build
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>

              
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      
    </section>
  );
};

export default Hero;