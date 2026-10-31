import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Communiquer avec Myria Conseil | Conseil en gestion à Montréal",
  description: "Parlez à Myria Conseil de vos enjeux de stratégie, de transformation organisationnelle, d'amélioration des processus et d'intelligence artificielle.",
  alternates: { canonical: "/fr/contact", languages: { "fr-CA": "/fr/contact", "en-CA": "/contact-myria", "x-default": "/contact-myria" } },
  openGraph: { title: "Nous joindre | Myria Conseil", description: "Échangeons sur vos objectifs et les défis de votre organisation.", locale: "fr_CA", url: "/fr/contact", type: "website" }
};
export default function ContactConseilPage() {
  return <main lang="fr-CA" className="bg-[#f7f4ee] text-[#142b35]">
    <section className="bg-[#142b35] px-6 pb-28 pt-28 text-white md:pb-32 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">MYRIA CONSEIL / CONTACT</p>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Parlons de votre prochain défi.</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">Présentez-nous vos priorités, vos enjeux opérationnels ou votre projet de transformation. Nous pourrons déterminer ensemble la meilleure façon de poursuivre la conversation.</p>
        <a href="mailto:info@myriaconsulting.com?subject=Demande%20de%20renseignements%20%E2%80%94%20Myria%20Conseil" className="mt-10 inline-block rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#142b35]">Écrire à Myria Conseil</a>
      </div>
    </section>
    <section className="px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
      <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">POUR PRÉPARER L’ÉCHANGE</p><h2 className="mt-6 font-serif text-4xl md:text-5xl">Qu’aimeriez-vous améliorer?</h2></div>
      <div><p className="text-lg leading-9 text-[#536166]">Vous pouvez nous parler de vos objectifs, des difficultés rencontrées, des équipes concernées et des résultats attendus. Une première discussion permet de clarifier le besoin, sans présumer de la solution.</p><Link href="/fr/services" className="mt-8 inline-block border-b border-[#142b35] pb-2 font-semibold">Découvrir nos services-conseils ↗</Link></div>
    </div></section>
  </main>;
}
