import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { consultingServices } from "@/data/consulting-services";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Management Consulting Services | Myria Consulting",
  description: "Explore Myria's management consulting services in strategy, business transformation, operational excellence, change management and AI advisory.",
  pathname: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ed] text-[#173039]">
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#916f42]">Myria Consulting / Services</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Management consulting that connects thinking with execution.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#506368]">Myria is a Montreal-based management consulting firm working with organizations on strategy, operations, business transformation, organizational change and AI adoption. We connect business objectives with practical execution.</p>
        </div>
      </section>
      <section className="border-t border-[#173039]/15 bg-white px-6 py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="services-heading" className="font-serif text-4xl">Explore our consulting services</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {consultingServices.map((service) => (
              <article key={service.slug} className="rounded-xl border border-[#173039]/15 bg-[#f8f5ed] p-8">
                <h3 className="font-serif text-3xl">{service.name}</h3>
                <p className="mt-4 leading-7 text-[#506368]">{service.intro}</p>
                <Link className="mt-7 inline-flex items-center gap-2 font-semibold underline underline-offset-4" href={`/services/${service.slug}`}>Explore {service.name.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="font-serif text-4xl">Start with your business challenge.</h2><p className="mt-4 max-w-2xl leading-7 text-[#506368]">We begin by understanding the decisions, outcomes and constraints that matter to your organization.</p><Link className="mt-6 inline-block rounded-full bg-[#173039] px-7 py-3 font-semibold text-white" href="/contact-myria">Talk to Myria</Link></div></section>
    </main>
  );
}
