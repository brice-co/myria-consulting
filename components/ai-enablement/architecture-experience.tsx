"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  architectureLayers,
  type ArchitectureLayer,
} from "@/data/ai-enablement";
import { SectionHeading } from "./section-heading";

export function ArchitectureExperience() {
  const [selectedId, setSelectedId] = useState(architectureLayers[0].id);

  const selected = useMemo(
    () =>
      architectureLayers.find((layer) => layer.id === selectedId) ??
      architectureLayers[0],
    [selectedId],
  );

  return (
    <section id="architecture" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Enterprise Architecture"
        title="Eight connected layers. One operating system."
        description="Select a layer to see how business direction, people, decisions, workflows, systems, data, governance, and learning work together."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <ArchitectureMap
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <ArchitectureDetail layer={selected} />
      </div>
    </section>
  );
}

type ArchitectureMapProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

function ArchitectureMap({
  selectedId,
  onSelect,
}: ArchitectureMapProps) {
  return (
    <div className="relative min-h-[650px] overflow-hidden rounded-[30px] border border-[#17313a]/10 bg-[#fbf8f3] p-6 shadow-[0_24px_70px_rgba(23,49,58,.06)] sm:p-8">
      <div className="absolute inset-0 hidden lg:block">
        {[92, 80, 68, 56, 44].map((size, index) => (
          <motion.div
            key={size}
            className="absolute left-1/2 top-1/2 rounded-full border border-[#5d8f88]/20"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ opacity: [0.22, 0.42, 0.22] }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5d8f88]/40 bg-[#f7f3ec] shadow-[0_0_0_18px_rgba(93,143,136,.06)]"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="text-base font-semibold text-[#17313a]">People</span>
            <span className="mt-1 max-w-[90px] text-[10px] leading-4 text-[#6a777a]">
              Purpose, judgment & accountability
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-xl flex-col gap-3 lg:pt-3">
        {architectureLayers.map((layer, index) => {
          const active = selectedId === layer.id;

          return (
            <motion.button
              key={layer.id}
              type="button"
              onClick={() => onSelect(layer.id)}
              whileHover={{ x: 6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              animate={{
                y: active ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className={[
                "group flex w-full items-center gap-4 rounded-full border px-4 py-3 text-left backdrop-blur-sm transition",
                active
                  ? "border-[#b57b2a]/60 bg-[#fffaf0] shadow-[0_12px_30px_rgba(181,123,42,.12)]"
                  : "border-[#17313a]/12 bg-[#f7f3ec]/90 hover:border-[#5d8f88]/40",
              ].join(" ")}
              style={{
                marginLeft:
                  index < 4
                    ? `${index * 12}px`
                    : `${(7 - index) * 12}px`,
                width:
                  index < 4
                    ? `calc(100% - ${index * 24}px)`
                    : `calc(100% - ${(7 - index) * 24}px)`,
              }}
              aria-pressed={active}
            >
              <span
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  active
                    ? "border-[#b57b2a]/30 bg-[#b57b2a] text-white"
                    : "border-[#5d8f88]/20 bg-[#e9f0ed] text-[#3f756e]",
                ].join(" ")}
              >
                {layer.number}
              </span>

              <div className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#17313a]">
                  {layer.name}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.15em] text-[#7a878a]">
                  {layer.purpose}
                </span>
              </div>

              <span
                className={[
                  "text-lg transition-transform group-hover:translate-x-1",
                  active ? "text-[#b57b2a]" : "text-[#8a989b]",
                ].join(" ")}
              >
                →
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="relative z-10 mt-8 grid gap-3 border-t border-[#17313a]/10 pt-6 sm:grid-cols-3">
        <MapPrinciple title="People at the centre">
          Humans set direction, policy, judgment, and priorities.
        </MapPrinciple>
        <MapPrinciple title="Governed by design">
          Control, security, and accountability exist across every layer.
        </MapPrinciple>
        <MapPrinciple title="Continuous learning">
          Every action produces feedback that improves future performance.
        </MapPrinciple>
      </div>
    </div>
  );
}

function MapPrinciple({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#17313a]">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#6d797d]">{children}</p>
    </div>
  );
}

function ArchitectureDetail({ layer }: { layer: ArchitectureLayer }) {
  return (
    <div className="min-h-[650px] rounded-[30px] border border-[#17313a]/10 bg-[#17313a] p-7 text-[#f7f3ec] shadow-[0_24px_70px_rgba(23,49,58,.12)] sm:p-9">
      <AnimatePresence mode="wait">
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.26 }}
        >
          <p className="text-sm font-semibold text-[#d9a94d]">
            {layer.number}
          </p>

          <h3 className="mt-3 font-serif text-3xl tracking-[-0.02em]">
            {layer.name}
          </h3>

          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fc0b9]">
            {layer.purpose}
          </p>

          <p className="mt-7 text-sm leading-7 text-[#d9dfde]/80">
            {layer.description}
          </p>

          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a94d]">
              Key capabilities
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {layer.capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.04 * index }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white/90"
                >
                  {capability}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#d9a94d]/20 bg-[#d9a94d]/[0.08] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d9a94d]">
              Organizational effect
            </p>
            <p className="mt-3 text-sm leading-6 text-[#f7f3ec]/90">
              {layer.effect}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
