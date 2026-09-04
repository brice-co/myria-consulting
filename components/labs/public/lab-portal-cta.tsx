"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import type { LabSlug } from "@/data/labs";

type LabPortalCtaProps = {
  title: string;
  slug: LabSlug;
};

export function LabPortalCta({
  title,
  slug,
}: LabPortalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-[#0f2a31] py-20 text-white sm:py-24 lg:py-28">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-[-12rem] top-[-12rem] size-[32rem] rounded-full border border-white/[0.05] sm:size-[40rem] lg:size-[48rem]"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            delay: 0.12,
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-[-4rem] top-[-4rem] size-[20rem] rounded-full border border-amber-300/[0.08] sm:size-[28rem] lg:size-[34rem]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          {/* Context */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex size-11 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-300">
              <LockKeyhole
                className="size-4"
                aria-hidden="true"
              />
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
              Client Portal
            </p>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 h-px w-20 origin-left bg-amber-300/50"
            />
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 36,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
              Continue the conversation inside
              the {` `}
              {title}.
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              The public page introduces the
              Lab. The Client Portal is where
              the actual advisory engagement
              takes place — with structured
              questions, evolving analysis,
              specialist perspectives, and a
              final synthesis tailored to your
              situation.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/client-portal"
                className="group inline-flex min-h-12 items-center justify-center gap-2 bg-amber-300 px-6 text-sm font-medium text-[#12313a] transition hover:bg-amber-200"
              >
                Access Client Portal

                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <div className="flex items-center gap-2 text-sm text-white/45">
                <Sparkles
                  className="size-4 text-amber-300/70"
                  aria-hidden="true"
                />

                Private advisory experience
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portal value strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            delay: 0.12,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 grid border-y border-white/10 sm:grid-cols-3 lg:mt-20"
        >
          <PortalValue
            number="01"
            title="Structured session"
            description="Work through the Lab stage by stage around your specific business situation."
          />

          <PortalValue
            number="02"
            title="Evolving advisory picture"
            description="See important observations, questions, risks, and opportunities emerge as the session develops."
          />

          <PortalValue
            number="03"
            title="Actionable synthesis"
            description="Finish with a structured advisory perspective on what matters and where to focus next."
          />
        </motion.div>
      </div>
    </section>
  );
}

type PortalValueProps = {
  number: string;
  title: string;
  description: string;
};

function PortalValue({
  number,
  title,
  description,
}: PortalValueProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.7,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 lg:px-8"
    >
      <span className="text-xs font-medium text-amber-300">
        {number}
      </span>

      <h3 className="mt-4 font-serif text-xl text-white">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-white/65">
        {description}
      </p>

      <div className="mt-6 h-px w-8 bg-amber-300/25 transition-all duration-300 group-hover:w-14 group-hover:bg-amber-300/60" />
    </motion.div>
  );
}