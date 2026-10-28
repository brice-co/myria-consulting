import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Perspectives en gestion et transformation | Myria Conseil",
  description: "Réflexions de Myria Conseil sur l'exécution de la stratégie, l'excellence opérationnelle, la gestion du changement et l'adoption de l'intelligence artificielle.",
  alternates: { canonical: "/fr/perspectives" },
  openGraph: { title: "Perspectives | Myria Conseil", description: "Des idées pour mieux décider et mieux exécuter.", url: "/fr/perspectives", locale: "fr_CA", type: "website" }
};
const subjects = [
  { name:"Transformer la stratégie en actions concrètes",summary:"Relier les décisions, les processus, la responsabilité et les mesures de performance.",link:"/fr/services/transformation-organisationnelle" },
  { name:"Améliorer la performance opérationnelle",summary:"Comprendre les processus de bout en bout et cibler les causes des difficultés récurrentes.",link:"/fr/services/excellence-operationnelle" },
  { name:"Réussir l'adoption du changement",summary:"Préparer les équipes et mesurer l'adoption au-delà du lancement d'un projet.",link:"/fr/services/gestion-du-changement" },
  { name:"Identifier les bonnes occasions d'utiliser l'IA",summary:"Commencer par les objectifs d'affaires, la préparation et les mécanismes de gouvernance.",link:"/fr/services/strategie-ia" }
];
export default function FrenchPerspectivesPage(){
 return <main lang="fr-CA" className="bg-[#f7f4ee] text-[#142b35]"><section className="bg-[#142b35] px-6 pb-28 pt-28 text-white md:pb-32 md:pt-36"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">MYRIA CONSEIL / PERSPECTIVES</p><h1 className="mt-8 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">Des idées à examiner. Des décisions à améliorer.</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">Nos perspectives relient les enjeux de gestion aux décisions et aux pratiques qui font progresser les organisations.</p></div></section><section className="px-6 py-24"><div className="mx-auto max-w-7xl"><h2 className="font-serif text-4xl md:text-6xl">Explorer nos domaines de réflexion.</h2><div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">{subjects.map(subject=><article key={subject.name} className="border-t border-[#a87532] pt-7"><h3 className="font-serif text-3xl">{subject.name}</h3><p className="mt-5 leading-8 text-[#536166]">{subject.summary}</p><Link className="mt-7 inline-block border-b border-[#142b35] pb-2 font-semibold" href={subject.link}>Explorer notre approche ↗</Link></article>)}</div><p className="mt-16 max-w-3xl text-sm leading-7 text-[#536166]">Ces perspectives présentent notre approche. Les articles de fond et les références en français seront ajoutés à mesure de leur révision éditoriale.</p></div></section></main>;
}
