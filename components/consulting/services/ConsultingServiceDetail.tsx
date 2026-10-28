import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { consultingServices, getConsultingService } from "@/data/consulting-services";
import { frenchServices } from "@/data/consulting-services-fr";
import { getServiceEditorial } from "@/data/service-editorial";
import { serviceEvidence } from "@/data/service-evidence";
import { frenchEditorial, frenchEvidence } from "@/data/services-fr-editorial";

function ServiceIllustration({ kind, locale = "en" }: { kind: string; locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const labels: Record<string, [string, string, string]> = {
    decision: ["Context", "Choices", "Direction"],
    transformation: ["Strategy", "Capabilities", "Execution"],
    flow: ["Request", "Workflow", "Outcome"],
    people: ["Understand", "Prepare", "Adopt"],
    ai: ["Value", "Readiness", "Governance"],
    automation: ["Events", "Decisions", "Actions"],
  };
  const original = labels[kind] ?? labels.decision;
  const translated: Record<string, [string,string,string]> = {decision:["Contexte","Choix","Orientation"],transformation:["Stratégie","Capacités","Exécution"],flow:["Demande","Processus","Résultat"],people:["Comprendre","Préparer","Adopter"],ai:["Valeur","Préparation","Gouvernance"],automation:["Événements","Décisions","Actions"]};
  const nodes = fr ? (translated[kind] ?? translated.decision) : original;
  return (
    <div role="img" aria-label={`${fr ? "Schéma conceptuel de gestion" : "Conceptual management diagram"} : ${nodes.join(", ")}`} className="relative overflow-hidden rounded-sm border border-white/20 bg-[#203a42] p-8 md:p-10">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#ddb888]/25" />
      <div className="absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#ddb888]/20" />
      <div className="relative border-b border-white/20 pb-6 text-xs font-semibold uppercase tracking-[.2em] text-[#d9b98f]">{fr ? "Myria Conseil / Perspective opérationnelle" : "Myria / Operating perspective"}</div>
      <div className="relative flex min-h-64 flex-col justify-center gap-6 py-10">
        {nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9b98f] text-sm text-[#e7bd8a]">0{index + 1}</span>
            <span className="flex-1 border-b border-white/20 pb-3 font-serif text-2xl text-white md:text-3xl">{node}</span>
            <ArrowRight className="h-5 w-5 text-[#d9b98f]" aria-hidden="true" />
          </div>
        ))}
      </div>
      <p className="text-xs leading-6 text-[#c4d1d0]">{fr ? "Illustration conceptuelle de notre démarche, et non une réalisation client ou une capture de logiciel." : "A conceptual illustration of the advisory approach, not a client project or system screenshot."}</p>
    </div>
  );
}

export function ConsultingServiceDetail({ slug, locale = "en" }: { slug: string; locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const translation = frenchServices.find(s => s.slug === slug || s.englishSlug === slug);
  const service = getConsultingService(fr ? translation?.englishSlug ?? "" : slug);
  if (!service || (fr && !translation)) notFound();
  const editorial = fr && translation ? frenchEditorial(translation, getServiceEditorial(service)) : getServiceEditorial(service);
  const evidence = fr && translation ? frenchEvidence(translation) : serviceEvidence[service.slug];
  const related = consultingServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const name = fr && translation ? translation.name : service.name;
  const target = fr && translation ? translation.title : service.target;
  const intro = fr && translation ? translation.intro : service.intro;
  const challenge = fr && translation ? translation.challenge : service.challenge;
  const outputs = fr && translation ? translation.deliverables : service.outputs;
  const serviceHref = (englishSlug: string) => fr ? `/fr/services/${frenchServices.find(s => s.englishSlug === englishSlug)?.slug ?? ""}` : `/services/${englishSlug}`;
  const contactHref = fr ? "/fr/contact" : "/contact-myria";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: target,
    serviceType: name,
    description: intro,
    areaServed: [{ "@type": "Place", name: "Montreal, Quebec, Canada" }, { "@type": "Country", name: "Canada" }],
    provider: { "@type": "Organization", "@id": "https://myriaconsulting.com/#organization", name: fr ? "Myria Conseil" : "Myria Consulting" },
    url: `https://myriaconsulting.com${serviceHref(service.slug)}`,
  };

  return (
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="bg-[#142b35] px-6 pb-24 pt-28 text-white md:pb-32 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <Link href={fr ? "/fr/services" : "/services"} className="inline-flex items-center gap-2 border-b border-white/40 pb-2 text-sm text-[#e7bd8a]">{fr ? "Services-conseils" : "Services"} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">{editorial.eyebrow}</p>
          <div className="mt-6 grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.05] md:text-7xl">{target}</h1>
              <p className="mt-7 max-w-3xl font-serif text-3xl leading-tight text-[#e7bd8a] md:text-4xl">{editorial.hero}</p>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#dfe7e5]">{intro}</p>
              <Link href={contactHref} className="mt-10 inline-flex items-center gap-3 border-b border-[#e7bd8a] pb-3 font-semibold text-[#e7bd8a]">{fr ? "Discuter de vos priorités" : "Discuss your priorities"} <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <ServiceIllustration kind={editorial.visual} locale={locale} />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "La question stratégique" : "The strategic question"}</p><h2 className="mt-5 font-serif text-4xl font-normal leading-tight md:text-5xl">{editorial.question}</h2></div>
          <div><p className="text-xl leading-9 text-[#536166]">{editorial.perspective}</p><p className="mt-8 border-l-2 border-[#a87532] pl-6 leading-8 text-[#536166]">{challenge}</p></div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Notre démarche-conseil" : "Our advisory approach"}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-normal md:text-6xl">{fr ? `Notre approche en ${name.toLowerCase()}.` : `Our approach to ${name.toLowerCase()}.`}</h2>
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
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? `Quand faire appel à un spécialiste en ${name.toLowerCase()}` : `When to engage a ${name.toLowerCase()} advisor`}</p><h2 className="mt-6 font-serif text-4xl font-normal md:text-5xl">{fr ? "Reconnaître les signaux." : "Recognize the signals."}</h2>
            <ul className="mt-10 space-y-6">{editorial.signals.map((signal, index) => <li key={signal} className="flex gap-5 border-b border-[#142b35]/15 pb-5"><span className="text-sm text-[#785330]">0{index + 1}</span><span className="text-lg leading-7">{signal}</span></li>)}</ul>
          </div>
          <div className="bg-[#eae4d9] p-9 md:p-12"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Livrables habituels" : "Typical deliverables"}</p><h3 className="mt-5 font-serif text-4xl">{fr ? `Livrables en ${name.toLowerCase()}.` : `${name} deliverables.`}</h3><ul className="mt-9 space-y-5">{outputs.map((output) => <li key={output} className="border-t border-[#142b35]/20 pt-5 leading-8">{output}</li>)}</ul><p className="mt-9 text-sm leading-7 text-[#536166]">{fr ? "Les livrables sont adaptés à la portée, aux priorités et à la préparation de l’organisation." : "Deliverables are defined to fit the organization’s scope, priorities and readiness."}</p></div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "La démarche en pratique" : "The work in practice"}</p>
            <h2 className="mt-6 font-serif text-4xl font-normal md:text-5xl">{fr ? `Les conditions d’une démarche efficace en ${name.toLowerCase()}.` : `What effective ${name.toLowerCase()} requires.`}</h2>
            <p className="mt-8 text-lg leading-9 text-[#536166]">{evidence.context}</p>
            <h3 className="mt-12 font-serif text-3xl">{fr ? "Situation illustrative" : "An illustrative situation"}</h3>
            <p className="mt-5 leading-8 text-[#536166]">{evidence.example}</p>
            <p className="mt-4 text-sm italic text-[#785330]">{fr ? "Scénario hypothétique, et non un mandat client ni un résultat revendiqué." : "Illustrative scenario, not a client case or claimed result."}</p>
          </div>
          <div className="border-t border-[#a87532] pt-7">
            <h3 className="font-serif text-3xl">{fr ? "Questions à examiner" : "Questions worth answering"}</h3>
            <ul className="mt-7 space-y-4">{evidence.questions.map((question) => <li className="border-b border-[#142b35]/15 pb-4 leading-7" key={question}>{question}</li>)}</ul>
            <h3 className="mt-12 font-serif text-3xl">{fr ? "Indicateurs à considérer" : "Measures to consider"}</h3>
            <ul className="mt-7 space-y-4">{evidence.metrics.map((metric) => <li className="border-b border-[#142b35]/15 pb-4 leading-7" key={metric}>{metric}</li>)}</ul>
            <p className="mt-6 text-sm leading-7 text-[#536166]">{fr ? "Les indicateurs et les valeurs de référence sont définis avec l’organisation avant de conclure à une amélioration." : "Measures are selected and baselined with the organization before any improvement claims are made."}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#142b35] px-6 py-24 text-white"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e7bd8a]">{fr ? "Le résultat recherché" : "The intended outcome"}</p><h2 className="mt-6 max-w-5xl font-serif text-4xl font-normal leading-tight md:text-6xl">{editorial.outcome}</h2><div className="mt-12 flex flex-wrap items-center gap-8"><Link href={contactHref} className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#142b35]">{fr ? "Entamer une conversation" : "Start a conversation"}</Link><Link href={fr ? "/fr/perspectives" : service.related} className="inline-flex items-center gap-2 border-b border-[#e7bd8a] pb-2 text-[#e7bd8a]">{fr ? "Explorer des perspectives liées" : "Explore related insights"} <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>

      <section className="px-6 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Explorer d’autres expertises" : "Explore more expertise"}</p><div className="mt-8 grid gap-8 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={serviceHref(item.slug)} className="group border-t border-[#a87532] pt-7"><h3 className="font-serif text-3xl">{fr ? frenchServices.find(s => s.englishSlug === item.slug)?.name : item.name}</h3><p className="mt-4 leading-7 text-[#536166]">{fr ? frenchServices.find(s => s.englishSlug === item.slug)?.intro : item.intro}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">{fr ? "Découvrir le service" : "Explore service"} <ArrowUpRight size={16} aria-hidden="true" /></span></Link>)}</div></div></section>
    </main>
  );
}
