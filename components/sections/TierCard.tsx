import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";
import { useState } from "react";
import VoiceDemoDialog from "@/components/sections/VoiceDemoDialog";

interface TierCardProps {
  emoji: string;
  name: string;
  label: string;
  bestFor: string;
  features: string[];
  tagline: string;
  colorVar: string;
  delay?: number;
  featured?: boolean;
  tierId: "essential" | "professional" | "realtime";
}

const TierCard = ({
  emoji,
  name,
  label,
  bestFor,
  features,
  tagline,
  colorVar,
  delay = 0,
  featured = false,
  tierId,
}: TierCardProps) => {
  const [demoOpen, setDemoOpen] = useState(false);
  const glowColor = `hsl(var(${colorVar}) / 0.12)`;
  const solidColor = `hsl(var(${colorVar}))`;
  const dimColor = `hsl(var(${colorVar}) / 0.6)`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4 }}
        className="relative group"
      >
        {featured && (
          <div
            className="absolute -inset-[1px] rounded-xl opacity-60 blur-[1px] transition-opacity group-hover:opacity-100"
            style={{ background: `linear-gradient(135deg, ${solidColor}, transparent 60%)` }}
          />
        )}
        <div
          className="relative flex flex-col h-full rounded-xl border bg-card p-6 transition-shadow duration-300"
          style={{
            borderColor: featured ? solidColor : undefined,
            boxShadow: `0 0 0 0 transparent`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${glowColor}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 transparent`;
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <span
                className="text-xs font-mono font-medium uppercase tracking-wider"
                style={{ color: solidColor }}
              >
                {label}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5">
            Best for: <span className="text-secondary-foreground">{bestFor}</span>
          </p>

          <ul className="flex-1 space-y-2.5 mb-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: dimColor }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Demo button */}
          <button
            onClick={() => setDemoOpen(true)}
            className="flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 mb-3 text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{
              backgroundColor: `hsl(var(${colorVar}) / 0.15)`,
              color: solidColor,
              border: `1px solid hsl(var(${colorVar}) / 0.25)`,
            }}
          >
            <Play className="w-3.5 h-3.5" />
            Try Demo
          </button>

          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-mono"
            style={{ background: `hsl(var(${colorVar}) / 0.08)`, color: solidColor }}
          >
            🟢 {tagline}
          </div>
        </div>
      </motion.div>

      <VoiceDemoDialog
        open={demoOpen}
        onOpenChange={setDemoOpen}
        tier={tierId}
        tierName={name}
        colorVar={colorVar}
      />
    </>
  );
};

export default TierCard;
