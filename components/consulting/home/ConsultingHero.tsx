"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const headline = [
  { text: "Better decisions.", accent: false },
  { text: "Stronger execution.", accent: true },
];

export function ConsultingHero({ locale = "en" }: { locale?: "en" | "fr" }) {
  // Keep the first server/client render identical before honoring reduced motion.
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const reducedMotion = hasMounted && Boolean(prefersReducedMotion);
  // Page scroll provides stable parallax without measuring an offset target.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 850], [0, 110]);

  return (
    <section className="mc-hero" id="top" aria-labelledby="mc-hero-title">
      <div className="mc-hero-picture" aria-hidden="true">
        <motion.div className="mc-hero-parallax" style={{ y: reducedMotion ? 0 : parallaxY }}>
          <motion.div
            className="mc-hero-image"
            animate={reducedMotion ? { scale: 1.04 } : { scale: [1.04, 1.16, 1.04] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 24, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
        <div className="mc-hero-tint" />
      </div>
      <div className="mc-container mc-hero-content">
        <motion.p className="mc-eyebrow mc-eyebrow-light" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          {locale === "fr" ? "CONSEIL EN GESTION / SYSTÈMES INTELLIGENTS" : "MANAGEMENT ADVISORY / INTELLIGENT SYSTEMS"}
        </motion.p>
        <h1 id="mc-hero-title" className="mc-hero-heading">
          {(locale === "fr" ? [{ text: "De meilleures décisions.", accent: false }, { text: "Une exécution plus solide.", accent: true }] : headline).map((line, i) => (
            <span className="mc-hero-line-clip" key={line.text}>
              <motion.span
                className={line.accent ? "mc-hero-line mc-hero-accent" : "mc-hero-line"}
                initial={reducedMotion ? false : { opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: reducedMotion ? 0 : .85, delay: reducedMotion ? 0 : .18 + i * .17, ease: [0.16, 1, 0.3, 1] }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div className="mc-hero-bottom" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: reducedMotion ? 0 : .75 }}>
          <p>
            {locale === "fr" ? "Myria Conseil accompagne les dirigeants dans la résolution de défis complexes et la transformation de la stratégie en progrès opérationnels. Nous réunissons expertise en gestion, systèmes intelligents et conseillers en IA pour relier personnes, processus, technologies et décisions aux résultats recherchés." : "Myria helps leaders solve complex business challenges and turn strategy into operational progress. We combine management expertise, intelligent systems, and AI advisors to connect people, processes, technology, and decisions around the outcomes that matter."}
          </p>
          <div className="mc-hero-actions">
            <a className="mc-button mc-button-white" href="#capabilities">{locale === "fr" ? "Explorer nos expertises" : "Explore our capabilities"} <ArrowUpRight size={17} /></a>
            <Link className="mc-button mc-button-ghost" href={locale === "fr" ? "/fr/contact" : "/contact-myria"}>{locale === "fr" ? "Nous joindre" : "Start a conversation"} <ArrowUpRight size={17} /></Link>
          </div>
        </motion.div>
      </div>
      <a className="mc-scroll-cue" href="#challenges">{locale === "fr" ? "Défiler pour explorer" : "Scroll to explore"} <ArrowDown size={14} aria-hidden="true" /></a>
    </section>
  );
}
