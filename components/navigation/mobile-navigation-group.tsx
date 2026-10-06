"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { NavigationGroup } from "./data/navigation/main-navigation";

export function MobileNavigationGroup({
  group,
}: {
  group: NavigationGroup;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-serif text-xl"
      >
        {group.label}

        <ChevronDown
          size={15}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5">
          {group.items?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-lg px-3 py-3 hover:bg-muted/40"
            >
              <div className="text-sm font-medium">
                {item.title}
              </div>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}