"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { WorkspaceType } from "./types/workspace";

import { WorkspaceSelector } from "./workspace-selector";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceStage } from "./workspace-stage";

export function CollaborativeWorkspaceShowcase() {
  const [active, setActive] =
    useState<WorkspaceType>("document");

  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionIntro />

        <div className="mt-10">
          <WorkspaceSelector
            active={active}
            onChange={setActive}
          />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-8 overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_30px_90px_rgba(15,39,46,0.10)]"
        >
          <WorkspaceHeader />

          <WorkspaceStage active={active} />
        </motion.div>

        <WorkspaceFooter />
      </div>
    </section>
  );
}

function SectionIntro() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-primary">
        <span className="h-px w-8 bg-primary" />
        The collaborative operating layer
        <span className="h-px w-8 bg-primary" />
      </div>

      <h2 className="mt-6 font-serif text-4xl tracking-[-0.04em] md:text-6xl">
        One workspace.
        <br />
        <em className="text-primary">
          Every way your team works.
        </em>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
        Documents, data, conversations,
        workflows and decisions stay connected—
        so people and AI work from the same
        context.
      </p>
    </div>
  );
}

function WorkspaceFooter() {
  return (
    <div className="mt-7 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>

        People and AI share the same workspace.
      </div>

      <a
        href="/experience/myria-os"
        className="font-semibold text-foreground transition-colors hover:text-primary"
      >
        Experience Myria OS →
      </a>
    </div>
  );
}