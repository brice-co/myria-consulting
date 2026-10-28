"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { consultingNavigation } from "@/components/consulting/home/content";
import { equivalentLocalePath } from "@/lib/i18n/marketing-routes";

export function ConsultingHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const alternatePath = equivalentLocalePath(pathname);
  const isFullScreenApp = /^\/(portal|workspace|auth|admin)(\/|$)/.test(pathname);
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

  if (isFullScreenApp) return null;

  return (
    <>
      {isHome && <a className="mc-skip-link" href="#mc-main">Skip to content</a>}
      <header className={isHome ? "mc-header mc-header--overlay" : "mc-header mc-header--solid"}>
      <div className="mc-container mc-header-inner">
        <Link href={isFrench ? "/fr" : (isHome ? "#top" : "/")} className="mc-brand" title={isFrench ? "Myria Conseil – Accueil" : "Myria Consulting home"} onClick={() => setOpen(false)}>
          <span className="mc-brand-logo" aria-hidden="true">
            <Image src="/images/myria-logo.png" alt="" width={52} height={52} priority />
          </span>
          <span className="mc-brand-name">MYRIA<small>{isFrench ? "CONSEIL" : "CONSULTING"}</small></span>
        </Link>
        <nav id="mc-main-navigation" aria-label="Primary navigation" className={open ? "mc-navigation mc-navigation-open" : "mc-navigation"}>
          {(isFrench ? [
            { label: "Accueil", href: "/fr" },
            { label: "Services-conseils", href: "/fr/services" },
            { label: "Conseil en gestion", href: "/fr/services/conseil-en-gestion" },
            { label: "Transformation", href: "/fr/services/transformation-organisationnelle" },
            { label: "Perspectives", href: "/fr/perspectives" },
            { label: "Gestion du changement", href: "/fr/services/gestion-du-changement" },
          ] : consultingNavigation).map((item) => (
            <Link key={item.href} href={item.href.startsWith("#") ? (isHome ? item.href : `/${item.href}`) : item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={alternatePath} hrefLang={isFrench ? "en-CA" : "fr-CA"} onClick={() => setOpen(false)}>{isFrench ? "English" : "Français"}</Link>
          <Link className="mc-nav-cta" href={isFrench ? "/fr/contact" : "/contact-myria"} onClick={() => setOpen(false)}>
            {isFrench ? "Nous joindre" : "Start a conversation"} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link className="mc-portal-link" href="/client-portal" onClick={() => setOpen(false)}>
            {isFrench ? "Portail client" : "Client portal"}
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
    </>
  );
}
