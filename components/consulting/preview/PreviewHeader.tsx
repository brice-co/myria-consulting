"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { previewNavigation } from "./content";

export function PreviewHeader() {
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <header className="mc-header">
      <div className="mc-container mc-header-inner">
        <a href="#top" className="mc-brand" title="Back to top" onClick={() => setOpen(false)}>
          <span className="mc-brand-symbol" aria-hidden="true">M</span>
          <span className="mc-brand-name">MYRIA<small>CONSULTING</small></span>
        </a>
        <nav id="mc-main-navigation" aria-label="Primary navigation" className={open ? "mc-navigation mc-navigation-open" : "mc-navigation"}>
          {previewNavigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <Link className="mc-nav-cta" href="/contact-myria" onClick={() => setOpen(false)}>
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link className="mc-portal-link" href="/client-portal" onClick={() => setOpen(false)}>
            Client portal
          </Link>
        </nav>
        <button
          type="button"
          ref={menuToggleRef}
          className="mc-menu-button"
          aria-controls="mc-main-navigation"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}
