"use client";

import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-6">

        {/* 🔥 HEADER */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Inside Myria Interactive Labs
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From AI Score to <span className="text-gradient">System Design</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we analyze AI systems, identify gaps, and design governance,
            architecture, and implementation roadmaps — all in one workspace.
          </p>
        </div>

        {/* 🎥 VIDEO */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-video group border border-border">

            {/* Preview Loop */}
            {!isPlaying && (
              <>
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  {/* 👉 Replace with your Notion / Labs demo */}
                  <source src="/interactive-session-labs.mp4" type="video/mp4" />
                </video>

                {/* ▶ Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play
                      className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1"
                      fill="currentColor"
                    />
                  </div>
                </button>
              </>
            )}

            {/* Main Video */}
            {isPlaying && (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/interactive-session-labs.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        {/* 🧠 VALUE BREAKDOWN */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Inside the platform, we help you:
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✔ Diagnose AI Governance Gaps</span>
            <span>✔ Map System Architecture</span>
            <span>✔ Identify AI Opportunities</span>
            <span>✔ Generate Implementation Roadmaps</span>
          </div>
        </div>

        {/* 🚀 CTA */}
        <div className="mt-12 text-center">
          <a
            href="/start-assessment"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-8 py-4 font-medium text-white hover:bg-cyan-500 transition"
          >
            Start with Your AI Governance Score
          </a>

          <p className="text-sm text-muted-foreground mt-4">
            Takes 2 minutes • Get your score + personalized roadmap
          </p>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;