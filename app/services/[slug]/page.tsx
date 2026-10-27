import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { consultingServices, getConsultingService } from "@/data/consulting-services";
import { publicPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return consultingServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getConsultingService(slug);
  if (!service) return { robots: { index: false, follow: false } };
  return publicPageMetadata({
    title: `${service.target} | Myria Consulting`,
    description: `${service.intro} Explore Myria Consulting's approach, deliverables and practical advisory support.`,
    pathname: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getConsultingService(slug);
  if (!service) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.target,
    serviceType: service.name,
    description: service.intro,
    areaServed: [{ "@type": "Place", name: "Montreal, Quebec, Canada" }, { "@type": "Country", name: "Canada" }],
    provider: { "@type": "Organization", "@id": "https://myriaconsulting.com/#organization", name: "Myria Consulting" },
    url: `https://myriaconsulting.com/services/${service.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#f8f5ed] text-[#173039]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="px-6 py-24 md:py-32"><div className="mx-auto max-w-6xl">
        <Link href="/services" className="text-sm font-semibold underline underline-offset-4">All consulting services</Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[.2em] text-[#916f42]">Myria Consulting / {service.name}</p>
        <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">{service.target}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-[#506368]">{service.intro}</p>
      </div></section>
      <section className="border-y border-[#173039]/15 bg-white px-6 py-20"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div><h2 className="font-serif text-4xl">The business challenge</h2><p className="mt-5 leading-8 text-[#506368]">{service.challenge}</p></div>
        <div><h2 className="font-serif text-4xl">How we approach it</h2><ol className="mt-5 list-decimal space-y-4 pl-5 leading-8 text-[#506368]">{service.approach.map((step) => <li key={step}>{step}</li>)}</ol></div>
      </div></section>
      <section className="px-6 py-20"><div className="mx-auto max-w-6xl"><h2 className="font-serif text-4xl">Typical advisory outputs</h2><ul className="mt-8 grid gap-4 md:grid-cols-3">{service.outputs.map((output) => <li className="rounded-xl border border-[#173039]/15 bg-white p-6 leading-7" key={output}>{output}</li>)}</ul><p className="mt-8 text-[#506368]">The scope and deliverables are tailored to the organization's situation, priorities and readiness.</p></div></section>
      <section className="bg-[#173039] px-6 py-20 text-white"><div className="mx-auto max-w-6xl"><h2 className="font-serif text-4xl">Connect your next decision to action.</h2><p className="mt-5 max-w-2xl leading-8 text-white/80">Discuss your objectives and the operational challenges you want to address. We can identify the appropriate starting point together.</p><div className="mt-8 flex flex-wrap gap-6"><Link href="/contact-myria" className="rounded-full bg-white px-7 py-3 font-semibold text-[#173039]">Start a conversation</Link><Link href={service.related} className="self-center underline underline-offset-4">Explore related thinking</Link></div></div></section>
    </main>
  );
}
