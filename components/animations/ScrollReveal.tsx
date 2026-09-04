"use client";

import { motion, type MotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type ScrollRevealProps = PropsWithChildren<MotionProps & { direction?: "up" | "down" | "left" | "right"; distance?: number; delay?: number }>;

export function ScrollReveal({ children, direction = "up", distance = 28, delay = 0, ...props }: ScrollRevealProps) {
  const offset = { up: { y: distance }, down: { y: -distance }, left: { x: distance }, right: { x: -distance } }[direction];
  return <motion.div initial={{ opacity: 0, ...offset }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</motion.div>;
}

export default ScrollReveal;
