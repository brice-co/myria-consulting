"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface FeatureItem {
  tag: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}

interface LiveblocksCarouselProps {
  features: FeatureItem[];
}

const AUTOPLAY_DELAY = 5000; // 5 seconds per slide

export default function LiveblocksCarousel({ features }: LiveblocksCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 25 },
    [Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Track the actual visual width percentage of the tracker line (0 to 100)
  const [progressWidth, setProgressWidth] = useState(0);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    let animationFrameId: number;

    // Frame-by-frame loop that pulls directly from Embla's time engine
    const updateProgress = () => {
      const timeLeft = autoplay.timeUntilNext(); // Returns ms left, or null if paused
      
      if (timeLeft === null) {
        // If user hovers mouse over slider, Embla pauses and timeLeft becomes null.
        // We catch this instantly and freeze the loading bar right where it is.
        setProgressWidth(0); 
      } else {
        // Calculate exactly what percentage of time has elapsed
        const elapsed = AUTOPLAY_DELAY - timeLeft;
        const percentage = (elapsed / AUTOPLAY_DELAY) * 100;
        setProgressWidth(percentage);
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Listeners to start and stop tracking along with Embla's core system
    emblaApi.on("autoplay:timerset", () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateProgress);
    });

    emblaApi.on("autoplay:timerstopped", () => {
      cancelAnimationFrame(animationFrameId);
      setProgressWidth(0);
    });

    // Fire initial tracker frame loop
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
      cancelAnimationFrame(animationFrameId);
    };
  }, [emblaApi, onSelect]);

  const handleTabClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.reset(); // Reset time on manual override
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
      
      {/* LEFT COLUMN: Text Tabs */}
      <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
        {features.map((item, index) => {
          const isActive = index === selectedIndex;
          
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`w-full text-left p-6 rounded-xl border transition-all duration-300 relative overflow-hidden text-black block ${
                isActive 
                  ? "bg-white border-gray-200 shadow-sm" 
                  : "bg-transparent border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <span className="text-xs font-bold tracking-wider text-purple-600 uppercase mb-1 block">
                {item.tag}
              </span>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="overflow-hidden text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Precise loading bar driven by state width styles */}
              {isActive && (
                <div 
                  className="absolute bottom-0 left-0 h-[3px] bg-purple-600 progress-bar-transition" 
                  style={{ 
                    width: `${progressWidth}%`,
                    // Dynamic configuration: if progress is 0, turn off transitions 
                    // to prevent visual snapping back animations
                    transitionDuration: progressWidth === 0 ? "0ms" : "16ms" 
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Media Slider */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        <div className="overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 shadow-xl" ref={emblaRef}>
          <div className="flex backface-hidden">
            {features.map((item, index) => (
              <div 
                key={index} 
                className="relative min-w-0 flex-[0_0_100%] aspect-[4/3] md:aspect-[16/10]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  className="object-cover p-4 md:p-8"
                  sizes="(max-w-1024px) 100vw, 700px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
