import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AgentNodeProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  isActive?: boolean;
  delay?: number;
  className?: string;
}

export const AgentNode = ({ 
  icon: Icon, 
  label, 
  description,
  isActive = false,
  delay = 0,
  className = ""
}: AgentNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className={`glass-card p-4 cursor-pointer transition-all duration-300 ${
        isActive ? "glow-effect border-primary/50" : "hover:border-primary/30"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isActive ? "bg-primary/20" : "bg-muted"
        }`}>
          <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div>
          <p className="font-medium text-sm">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {isActive && (
        <motion.div
          className="absolute -inset-px rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent)"
          }}
        />
      )}
    </motion.div>
  );
};
