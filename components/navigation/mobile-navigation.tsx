"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { mainNavigation } from "./data/navigation/main-navigation";

import { MobileNavigationGroup } from "./mobile-navigation-group";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
      >
        {open ? <X size={17} /> : <Menu size={17} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-border bg-[#f8f5ef] px-6 pb-8 shadow-xl">
          {mainNavigation.map((group) => (
            <MobileNavigationGroup
              key={group.label}
              group={group}
            />
          ))}

          <div className="mt-6 grid gap-3">
            <Link
              href="/client-portal"
              className="rounded-full border border-border px-5 py-3 text-center text-sm font-semibold"
            >
              Client portal
            </Link>

            <Link
              href="/resources/playbook"
              className="rounded-full bg-[#173039] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              AI-Enabled E-Book
              <ArrowUpRight
                size={14}
                className="ml-1 inline"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}