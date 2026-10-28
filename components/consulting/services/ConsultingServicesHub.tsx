import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { consultingServices } from "@/data/consulting-services";
import { frenchServices } from "@/data/consulting-services-fr";
import { getServiceEditorial } from "@/data/service-editorial";
import { frenchEditorial } from "@/data/services-fr-editorial";

export function ConsultingServicesHub({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <section className="bg-[#142b35] px-6 pb-28 pt-28 text-white md:pb-32 md:pt-36"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">{fr ? "Myria Conseil / Services-conseils" : "Myria / Advisory services"}</p>
        <h1 className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-[1.04] md:text-7xl lg:text-8xl">{fr ? "Conseil en gestion et transformation des organisations." : "Management consulting services for stronger execution."}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">{fr ? "Myria Conseil est une firme de conseil en gestion établie à Montréal. Nous accompagnons les dirigeants en stratégie, transformation organisationnelle, excellence opérationnelle, gestion du changement et intelligence artificielle. Nous relions les décisions à leur mise en œuvre." : "Myria is a Montreal-based management consulting firm working across strategy, organizational transformation, operations, change management and AI advisory. We help leaders connect business decisions with practical execution."}</p>
      </div></section>
      <section className="px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Nos domaines d’expertise" : "Our consulting capabilities"}</p><h2 className="mt-6 max-w-4xl font-serif text-4xl font-normal md:text-6xl">{fr ? "Une expertise ciblée pour des défis d’affaires interconnectés." : "Focused expertise for interconnected business challenges."}</h2>
        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {consultingServices.map((service, index) => {
            const editorial = getServiceEditorial(service);
            return <article key={service.slug} className="border-t border-[#a87532] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#785330]">0{index + 1} / {fr ? frenchEditorial(frenchServices.find(s => s.englishSlug === service.slug)!, editorial).eyebrow : editorial.eyebrow}</p>
              <h3 className="mt-7 max-w-xl font-serif text-4xl font-normal leading-tight md:text-5xl">{fr ? frenchServices.find(s => s.englishSlug === service.slug)?.name : service.name}</h3>
              <p className="mt-3 font-serif text-2xl text-[#785330]">{fr ? frenchServices.find(s => s.englishSlug === service.slug)?.tagline : editorial.hero}</p>
              <p className="mt-6 max-w-xl leading-8 text-[#536166]">{fr ? frenchServices.find(s => s.englishSlug === service.slug)?.intro : service.intro}</p>
              <Link className="mt-8 inline-flex items-center gap-3 border-b border-[#142b35] pb-2 text-sm font-semibold" href={fr ? `/fr/services/${frenchServices.find(s => s.englishSlug === service.slug)?.slug}` : `/services/${service.slug}`}>{fr ? "Découvrir ce service" : service.name} <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>;
          })}
        </div>
      </div></section>
      <section className="bg-white px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Collaborer avec Myria Conseil" : "Working with Myria"}</p><h2 className="mt-6 font-serif text-4xl md:text-6xl">{fr ? "Commencer par les objectifs de l’organisation." : "Start with what the business needs to achieve."}</h2></div><div><p className="text-lg leading-9 text-[#536166]">{fr ? "Notre démarche commence par l’analyse de vos objectifs, de vos décisions, de vos équipes, de vos processus et de vos contraintes. Nous définissons ensuite l’accompagnement pertinent et les résultats à mesurer." : "Our work begins by understanding your objectives, decisions, people, processes and current constraints. From there, we frame the right engagement and define measurable progress."}</p><Link href={fr ? "/fr/contact" : "/contact-myria"} className="mt-9 inline-flex items-center gap-3 border-b border-[#142b35] pb-2 font-semibold">{fr ? "Entamer une conversation" : "Start a conversation"} <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
    </main>
  );
}
