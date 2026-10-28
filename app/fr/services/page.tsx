import Link from "next/link";
import type { Metadata } from "next";
import { frenchServices } from "@/data/consulting-services-fr";
export const metadata: Metadata = {
 title:"Services de conseil en gestion à Montréal | Myria Conseil",
 description:"Myria accompagne les organisations en conseil en gestion, transformation organisationnelle, excellence opérationnelle, gestion du changement et stratégie IA à Montréal.",
 alternates:{canonical:"/fr/services",languages:{"fr-CA":"/fr/services","en-CA":"/services","x-default":"/services"}},
 openGraph:{title:"Services de conseil en gestion | Myria Conseil",description:"Conseil en gestion et transformation des organisations au Québec et au Canada.",locale:"fr_CA",url:"/fr/services",type:"website"},
};
export default function FrenchServicesPage(){return <main lang="fr-CA" className="bg-[#f7f4ee] text-[#142b35]">
<section className="bg-[#142b35] px-6 pb-28 pt-28 text-white md:pb-32 md:pt-36"><div className="mx-auto max-w-7xl">
<p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">MYRIA CONSEIL / SERVICES-CONSEILS</p>
<h1 className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-tight md:text-7xl">Conseil en gestion et transformation des organisations.</h1>
<p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">Myria Conseil est une firme de conseil en gestion établie à Montréal. Nous aidons les dirigeants à améliorer leurs décisions, leurs opérations et la mise en œuvre de leurs stratégies.</p>
<Link className="mt-9 inline-block border-b border-[#e7bd8a] pb-2 font-semibold text-[#e7bd8a]" href="/fr">Découvrir Myria ↗</Link>
</div></section>
<section className="px-6 py-24"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">DOMAINES D’EXPERTISE</p><h2 className="mt-5 max-w-4xl font-serif text-4xl md:text-6xl">Une expertise adaptée aux défis de l’entreprise.</h2>
<div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">{frenchServices.map((s,i)=><article key={s.slug} className="border-t border-[#a87532] pt-7"><p className="text-sm text-[#785330]">0{i+1} / 06</p><h3 className="mt-6 font-serif text-4xl">{s.name}</h3><p className="mt-4 text-lg font-medium text-[#785330]">{s.tagline}</p><p className="mt-5 leading-8 text-[#536166]">{s.intro}</p><Link className="mt-7 inline-block border-b border-[#142b35] pb-2 font-semibold" href={`/fr/services/${s.slug}`}>Découvrir ce service ↗</Link></article>)}</div>
</div></section>
<section className="bg-white px-6 py-20"><div className="mx-auto max-w-7xl"><h2 className="font-serif text-4xl">Discutons de vos priorités.</h2><p className="mt-5 max-w-2xl leading-8 text-[#536166]">Nous commençons par comprendre vos enjeux, vos objectifs et vos contraintes pour définir l’accompagnement pertinent.</p><Link href="/contact-myria" className="mt-7 inline-block rounded-full bg-[#142b35] px-7 py-3 font-semibold text-white">Communiquer avec Myria</Link></div></section>
</main>}
