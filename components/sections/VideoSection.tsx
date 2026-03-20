"use client";

import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            See It In Action
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Watch how our <span className="text-gradient">AI agents</span> transform conversations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience real-time Voice AI orchestration in production.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-video group border border-border">

            {/* Animated Preview */}
            {!isPlaying && (
              <>
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/myria-voice.mov" type="video/mp4" />
                </video>

                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </button>
              </>
            )}

            {/* Main Demo Video */}
            {isPlaying && (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
                onEnded={() => setIsPlaying(false)} // ← return to animated preview
              >
                <source src="/videos/myria-voice.mov" type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
