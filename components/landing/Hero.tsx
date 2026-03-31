"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Sparkles, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* 🔹 Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-5 py-2.5 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Most AI Systems Lack Governance</span>
              <Zap className="w-4 h-4" />
            </motion.div>

            {/* 🔥 Headline */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your AI Isn’t Broken. <br />
              <span className="text-cyan-400">Your Governance Is.</span>
            </motion.h1>
            
            {/* 💡 Subheadline */}
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Most companies deploy AI without structure, risk controls, or evaluation systems.
              <br className="hidden md:block" />
              Find out where you stand in 2 minutes.
            </motion.p>

            {/* 🎯 Value bullets (NEW) */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-10 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>✔ AI Governance Score</span>
              <span>✔ Risk Analysis</span>
              <span>✔ PDF Report</span>
            </motion.div>
            
            {/* 🚀 CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              
              {/* PRIMARY CTA */}
              <Link href={'/start-assessment'} className="mx-auto sm:mx-0">
                <Button size="lg" className="group text-base px-8 py-6">
                  Get Your AI Governance Score
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* SECONDARY CTA */}
              <Link href={'/ai-system'} className="mx-auto sm:mx-0">
                <Button size="lg" variant="outline" className="text-base px-8 py-6">
                  Explore AI Systems
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