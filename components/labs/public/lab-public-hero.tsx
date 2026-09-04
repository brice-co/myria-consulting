"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";


type LabPublicHeroProps = {
  title: string;
  tagline: string;
  description: string;
};

export function LabPublicHero({
  title,
  tagline,
  description,
}: LabPublicHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f6f1e7]">
      {/* Background accent */}
      <motion.div
        aria-hidden="true"
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-[-8rem] top-[-8rem] size-[28rem] rounded-full border border-amber-700/10 sm:size-[38rem] lg:right-[-10rem] lg:top-[-10rem] lg:size-[48rem]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
          {/* Main content */}
          <div className="max-w-5xl">
            <motion.p
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-amber-700"
            >
              Myria Advisory Lab
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-slate-900 sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.16,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-3xl text-xl leading-8 text-slate-700 sm:text-2xl sm:leading-9"
            >
              {tagline}
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.24,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.32,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/client-portal"
                className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
              >
                Access Client Portal

                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <a
                href="#how-it-works"
                className="group inline-flex min-h-12 items-center justify-center gap-2 px-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:justify-start"
              >
                Explore how the Lab works

                <ArrowDownRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>

          {/* Context marker */}
          <motion.aside
            initial={{
              opacity: 0,
              x: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.28,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-l border-black/10 pl-6 lg:mb-1 lg:pl-8"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Structured advisory
            </p>

            <p className="mt-4 max-w-sm font-serif text-2xl leading-snug text-slate-900">
              A focused engagement designed to move from ambiguity toward a clearer direction.
            </p>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                delay: 0.55,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 h-px w-24 origin-left bg-amber-700/60"
            />

            <p className="mt-5 text-sm leading-6 text-slate-500">
              The full interactive advisory session is available through the Myria Client Portal.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}