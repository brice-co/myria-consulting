import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { consultingServices, getConsultingService } from "@/data/consulting-services";
import { getServiceEditorial } from "@/data/service-editorial";
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
    description: `${service.target} from Myria Consulting in Montreal. ${service.intro}`,
    pathname: `/services/${slug}`,
  });
}

function ServiceIllustration({ kind }: { kind: string }) {
  const labels: Record<string, [string, string, string]> = {
    decision: ["Context", "Choices", "Direction"],
    transformation: ["Strategy", "Capabilities", "Execution"],
    flow: ["Request", "Workflow", "Outcome"],
    people: ["Understand", "Prepare", "Adopt"],
    ai: ["Value", "Readiness", "Governance"],
    automation: ["Events", "Decisions", "Actions"],
  };
  const nodes = labels[kind] ?? labels.decision;
  return (
    <div role="img" aria-label={`Conceptual management diagram: ${nodes.join(", ")}`} className="relative overflow-hidden rounded-sm border border-white/20 bg-[#203a42] p-8 md:p-10">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#ddb888]/25" />
      <div className="absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#ddb888]/20" />
      <div className="relative border-b border-white/20 pb-6 text-xs font-semibold uppercase tracking-[.2em] text-[#d9b98f]">Myria / Operating perspective</div>
      <div className="relative flex min-h-64 flex-col justify-center gap-6 py-10">
        {nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9b98f] text-sm text-[#e7bd8a]">0{index + 1}</span>
            <span className="flex-1 border-b border-white/20 pb-3 font-serif text-2xl text-white md:text-3xl">{node}</span>
            <ArrowRight className="h-5 w-5 text-[#d9b98f]" aria-hidden="true" />
          </div>
        ))}
      </div>
      <p className="text-xs leading-6 text-[#c4d1d0]">A conceptual illustration of the advisory approach, not a client project or system screenshot.</p>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getConsultingService(slug);
  if (!service) notFound();
  const editorial = getServiceEditorial(service);
  const related = consultingServices.filter((item) => item.slug !== slug).slice(0, 3);
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
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="bg-[#142b35] px-6 pb-24 pt-28 text-white md:pb-32 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <Link href="/services" className="inline-flex items-center gap-2 border-b border-white/40 pb-2 text-sm text-[#e7bd8a]">Services <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">{editorial.eyebrow}</p>
          <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.05] md:text-7xl">{service.target}</h1>
              <p className="mt-7 max-w-3xl font-serif text-3xl leading-tight text-[#e7bd8a] md:text-4xl">{editorial.hero}</p>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#dfe7e5]">{service.intro}</p>
              <Link href="/contact-myria" className="mt-10 inline-flex items-center gap-3 border-b border-[#e7bd8a] pb-3 font-semibold text-[#e7bd8a]">Discuss your priorities <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <ServiceIllustration kind={editorial.visual} />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">The strategic question</p><h2 className="mt-5 font-serif text-4xl font-normal leading-tight md:text-5xl">{editorial.question}</h2></div>
          <div><p className="text-xl leading-9 text-[#536166]">{editorial.perspective}</p><p className="mt-8 border-l-2 border-[#a87532] pl-6 leading-8 text-[#536166]">{service.challenge}</p></div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Our advisory approach</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-normal md:text-6xl">Our approach to {service.name.toLowerCase()}.</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {editorial.steps.map(([title, description], index) => (
              <article key={title} className="border-t border-[#a87532] pt-7">
                <p className="text-sm font-semibold text-[#785330]">0{index + 1} / 03</p>
                <h3 className="mt-6 font-serif text-3xl font-normal md:text-4xl">{title}</h3>
                <p className="mt-5 leading-8 text-[#536166]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">When to engage a {service.name.toLowerCase()} advisor</p><h2 className="mt-6 font-serif text-4xl font-normal md:text-5xl">Recognize the signals.</h2>
            <ul className="mt-10 space-y-6">{editorial.signals.map((signal, index) => <li key={signal} className="flex gap-5 border-b border-[#142b35]/15 pb-5"><span className="text-sm text-[#785330]">0{index + 1}</span><span className="text-lg leading-7">{signal}</span></li>)}</ul>
          </div>
          <div className="bg-[#eae4d9] p-9 md:p-12"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Typical deliverables</p><h3 className="mt-5 font-serif text-4xl">{service.name} deliverables.</h3><ul className="mt-9 space-y-5">{service.outputs.map((output) => <li key={output} className="border-t border-[#142b35]/20 pt-5 leading-8">{output}</li>)}</ul><p className="mt-9 text-sm leading-7 text-[#536166]">Deliverables are defined to fit the organization's scope, priorities and readiness.</p></div>
        </div>
      </section>

      <section className="bg-[#142b35] px-6 py-24 text-white"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e7bd8a]">The intended outcome</p><h2 className="mt-6 max-w-5xl font-serif text-4xl font-normal leading-tight md:text-6xl">{editorial.outcome}</h2><div className="mt-12 flex flex-wrap items-center gap-8"><Link href="/contact-myria" className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#142b35]">Start a conversation</Link><Link href={service.related} className="inline-flex items-center gap-2 border-b border-[#e7bd8a] pb-2 text-[#e7bd8a]">Explore related insights <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>

      <section className="px-6 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Explore more expertise</p><div className="mt-8 grid gap-8 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group border-t border-[#a87532] pt-7"><h3 className="font-serif text-3xl">{item.name}</h3><p className="mt-4 leading-7 text-[#536166]">{item.intro}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Explore service <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div></div></section>
    </main>
  );
}
