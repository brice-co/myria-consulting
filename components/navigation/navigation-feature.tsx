import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { NavigationFeature as Feature } from "./data/navigation/main-navigation";

export function NavigationFeature({
  feature,
}: {
  feature: Feature;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-[#173039] p-6 text-white">
      <div>
        <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#c69242]">
          {feature.eyebrow}
        </div>

        <h3 className="mt-4 max-w-xs font-serif text-2xl leading-tight tracking-[-0.03em]">
          {feature.title}
        </h3>

        <p className="mt-4 max-w-xs text-xs leading-6 text-white/60">
          {feature.description}
        </p>
      </div>

      <Link
        href={feature.href}
        className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white"
      >
        {feature.cta}

        <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}