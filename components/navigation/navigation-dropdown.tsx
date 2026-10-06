"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NavigationGroup } from "./data/navigation/main-navigation";

import { NavigationFeature } from "./navigation-feature";

export function NavigationDropdown({
  group,
}: {
  group: NavigationGroup;
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[760px] -translate-x-1/2 pt-5">
      <div className="grid grid-cols-[1fr_260px] gap-5 rounded-[24px] border border-border bg-[#fbfaf7] p-5 shadow-[0_30px_80px_rgba(18,42,49,0.14)]">
        <div>
          <div className="grid grid-cols-2 gap-1">
            {group.items?.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-[#f1eee7]"
                >
                  {Icon && (
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                      <Icon size={14} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                      {item.title}

                      <ArrowRight
                        size={10}
                        className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </div>

                    <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {group.href && (
            <Link
              href={group.href}
              className="mt-3 inline-flex items-center gap-2 px-3 text-[10px] font-semibold text-primary"
            >
              View all {group.label.toLowerCase()}
              <ArrowRight size={11} />
            </Link>
          )}
        </div>

        {group.feature && (
          <NavigationFeature feature={group.feature} />
        )}
      </div>
    </div>
  );
}