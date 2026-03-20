import { motion } from "framer-motion";

interface ConnectionLineProps {
  direction?: "horizontal" | "vertical" | "diagonal";
  animated?: boolean;
  className?: string;
}

export const ConnectionLine = ({ 
  direction = "horizontal",
  animated = true,
  className = ""
}: ConnectionLineProps) => {
  const isHorizontal = direction === "horizontal";
  const isDiagonal = direction === "diagonal";

  if (isDiagonal) {
    return (
      <svg 
        className={`w-16 h-16 ${className}`} 
        viewBox="0 0 64 64"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 8 8 Q 32 32 56 56"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animated ? [0, 1, 0] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {animated && (
          <motion.circle
            r="3"
            fill="hsl(var(--primary))"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ offsetPath: "path('M 8 8 Q 32 32 56 56')" }}
          />
        )}
      </svg>
    );
  }

  return (
    <div 
      className={`relative ${isHorizontal ? "w-12 h-0.5" : "w-0.5 h-12"} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary to-secondary/20 rounded-full" />
      {animated && (
        <motion.div
          className={`absolute ${isHorizontal ? "w-2 h-full" : "h-2 w-full"} bg-primary rounded-full`}
          initial={{ [isHorizontal ? "left" : "top"]: "0%" }}
          animate={{ [isHorizontal ? "left" : "top"]: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 10px hsl(var(--primary))" }}
        />
      )}
    </div>
  );
};
