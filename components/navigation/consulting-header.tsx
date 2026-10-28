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
  const isHome = pathname === "/" || pathname === "/fr";
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

  const labelsFr: Record<string, string> = {
    "/services": "Services-conseils",
    "#capabilities": "Expertises",
    "/our-approach/management-model": "Notre approche",
    "#discovery": "Laboratoire de découverte",
    "#experience": "Expériences",
    "/insights": "Perspectives",
    "/resources/brochures": "Brochures",
  };
  const localizedTarget = (href: string) => {
    if (/^https?:\/\//.test(href)) return href;
    if (href.startsWith("#")) return `${isHome ? "" : isFrench ? "/fr" : "/"}${href}`;
    if (!isFrench) return href;
    const localized: Record<string, string> = { "/services": "/fr/services", "/insights": "/fr/perspectives" };
    return localized[href] ?? href;
  };

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
        <nav id="mc-main-navigation" aria-label={isFrench ? "Navigation principale" : "Primary navigation"} className={open ? "mc-navigation mc-navigation-open" : "mc-navigation"}>
          {consultingNavigation.map((item) => (
            <Link
              key={item.href}
              href={localizedTarget(item.href)}
              onClick={() => setOpen(false)}
            >
              {isFrench ? labelsFr[item.href] ?? item.label : item.label}
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
          aria-label={isFrench ? (open ? "Fermer le menu" : "Ouvrir le menu") : (open ? "Close menu" : "Open menu")}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      </header>
    </>
  );
}
