"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  mainNavigation,
  type NavigationGroup,
} from "./data/navigation/main-navigation";

import { NavigationDropdown } from "./navigation-dropdown";

export function DesktopNavigation() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      className="hidden items-center gap-1 xl:flex"
      onMouseLeave={() => setActive(null)}
    >
      {mainNavigation.map((group) => (
        <NavigationMenuItem
          key={group.label}
          group={group}
          active={active === group.label}
          onOpen={() => setActive(group.label)}
          onToggle={() =>
            setActive((current) =>
              current === group.label ? null : group.label,
            )
          }
        />
      ))}
    </nav>
  );
}

function NavigationMenuItem({
  group,
  active,
  onOpen,
  onToggle,
}: {
  group: NavigationGroup;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        className="flex items-center gap-1 rounded-full px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {group.label}

        <ChevronDown
          size={11}
          className={`transition-transform ${
            active ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.99,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 5,
            }}
            transition={{
              duration: 0.18,
            }}
          >
            <NavigationDropdown group={group} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}