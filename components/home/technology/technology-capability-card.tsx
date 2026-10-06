import { motion } from "framer-motion";

import type { TechnologyCapability } from "./types/technology";
import { TechnologyBadge } from "./technology-badge";

type Props = {
  capability: TechnologyCapability;
  index: number;
};

export function TechnologyCapabilityCard({
  capability,
  index,
}: Props) {
  const Icon = capability.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
      }}
      className="group relative border-l border-border px-5 py-2 first:border-l-0"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/8 text-primary transition-transform duration-300 group-hover:-translate-y-1">
        <Icon size={17} />
      </div>

      <div className="mt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-primary">
        {capability.eyebrow}
      </div>

      <h3 className="mt-2 font-serif text-xl tracking-[-0.02em]">
        {capability.title}
      </h3>

      <p className="mt-3 min-h-[72px] text-xs leading-6 text-muted-foreground">
        {capability.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {capability.technologies.map((technology) => (
          <TechnologyBadge
            key={technology.name}
            name={technology.name}
          />
        ))}
      </div>
    </motion.article>
  );
}