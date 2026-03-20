"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface VoiceWaveformProps {
  isActive?: boolean;
  barCount?: number;
  className?: string;
}

export const VoiceWaveform = ({ 
  isActive = true, 
  barCount = 40,
  className = "" 
}: VoiceWaveformProps) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barCount).fill(0.15));
      return;
    }

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, () => 
          0.15 + Math.random() * 0.85
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div className={`flex items-center justify-center gap-1 h-20 ${className}`}>
      {heights.map((height, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-primary rounded-full"
          initial={{ scaleY: 0.15 }}
          animate={{ 
            scaleY: height,
            opacity: isActive ? 0.6 + height * 0.4 : 0.3
          }}
          transition={{ 
            duration: 0.15,
            ease: "easeOut"
          }}
          style={{ 
            height: "100%",
            transformOrigin: "center",
            boxShadow: isActive ? `0 0 8px hsl(var(--primary) / ${height * 0.5})` : 'none'
          }}
        />
      ))}
    </div>
  );
};
