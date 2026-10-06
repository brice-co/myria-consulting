"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const flow = [
  "Business challenge",
  "Shared intelligence",
  "Decision",
  "Execution",
  "Outcome",
];

export function TechnologyFlow() {
  return (
    <div className="mt-16 border-y border-border py-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {flow.map((item, index) => (
          <div
            key={item}
            className="contents"
          >
            <motion.span
              initial={{
                opacity: 0,
                y: 5,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
              className={
                index === flow.length - 1
                  ? "text-xs font-semibold text-primary"
                  : "text-xs font-medium text-foreground"
              }
            >
              {item}
            </motion.span>

            {index < flow.length - 1 && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -5,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12 + 0.08,
                }}
              >
                <ArrowRight
                  size={13}
                  className="text-primary/50"
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}