import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { consultingServices } from "@/data/consulting-services";
import { getServiceEditorial } from "@/data/service-editorial";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Management Consulting Services | Myria Consulting",
  description: "Explore Myria's management consulting in strategy, business transformation, operational excellence, change management, AI advisory and automation.",
  pathname: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <section className="bg-[#142b35] px-6 pb-28 pt-28 text-white md:pb-32 md:pt-36"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">Myria / Advisory services</p>
        <h1 className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-[1.04] md:text-7xl lg:text-8xl">Management consulting services for stronger execution.</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#dfe7e5]">Myria is a Montreal-based management consulting firm working across strategy, organizational transformation, operations, change management and AI advisory. We help leaders connect business decisions with practical execution.</p>
      </div></section>
      <section className="px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Our consulting capabilities</p><h2 className="mt-6 max-w-4xl font-serif text-4xl font-normal md:text-6xl">Focused expertise for interconnected business challenges.</h2>
        <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {consultingServices.map((service, index) => {
            const editorial = getServiceEditorial(service);
            return <article key={service.slug} className="border-t border-[#a87532] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#785330]">0{index + 1} / {editorial.eyebrow}</p>
              <h3 className="mt-7 max-w-xl font-serif text-4xl font-normal leading-tight md:text-5xl">{service.name}</h3>
              <p className="mt-3 font-serif text-2xl text-[#785330]">{editorial.hero}</p>
              <p className="mt-6 max-w-xl leading-8 text-[#536166]">{service.intro}</p>
              <Link className="mt-8 inline-flex items-center gap-3 border-b border-[#142b35] pb-2 text-sm font-semibold" href={`/services/${service.slug}`}>{service.name} <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>;
          })}
        </div>
      </div></section>
      <section className="bg-white px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Working with Myria</p><h2 className="mt-6 font-serif text-4xl md:text-6xl">Start with what the business needs to achieve.</h2></div><div><p className="text-lg leading-9 text-[#536166]">Our work begins by understanding your objectives, decisions, people, processes and current constraints. From there, we frame the right engagement and define measurable progress.</p><Link href="/contact-myria" className="mt-9 inline-flex items-center gap-3 border-b border-[#142b35] pb-2 font-semibold">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
    </main>
  );
}
