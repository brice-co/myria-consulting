import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrochurePdfActions } from "@/components/consulting/resources/BrochurePdfActions";

const dimensionsFr = [
  {number:"01",title:"Réflexion approfondie",outcome:"Clarté",description:"Renforcer la capacité de l’organisation à comprendre les défis, analyser son environnement, explorer les possibilités et prendre des décisions éclairées."},
  {number:"02",title:"Structure intelligente",outcome:"Alignement",description:"Aligner les personnes, les processus d’affaires, les technologies et les communications autour des objectifs organisationnels et d’une exécution efficace."},
  {number:"03",title:"Culture de réflexion",outcome:"Intelligence collective",description:"Relier les perspectives, le savoir partagé, la pensée critique et l’apprentissage pour ancrer l’amélioration continue dans le travail quotidien."}
] as const;

const dimensions = [
  {
    number: "01",
    title: "In-Depth Thinking",
    outcome: "Clarity",
    description:
      "Strengthen how an organization understands challenges, studies its environment, explores possibilities and makes informed decisions.",
  },
  {
    number: "02",
    title: "Intelligent Structure",
    outcome: "Alignment",
    description:
      "Align people, business processes, technology and communication around organizational objectives and effective execution.",
  },
  {
    number: "03",
    title: "Thinking Culture",
    outcome: "Collective intelligence",
    description:
      "Connect perspectives, shared knowledge, critical thinking and learning so continuous improvement becomes part of everyday work.",
  },
] as const;

export function ManagementModelContent({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const items = fr ? dimensionsFr : dimensions;
  return (
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <section className="bg-[#142b35] px-6 pb-24 pt-24 text-white md:pb-32 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">
            {fr ? "Notre approche / Modèle de gestion" : "Our approach / Management model"}
          </p>
          <h1 className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-[1.04] md:text-7xl lg:text-8xl">
            {fr ? "Réfléchir en profondeur. Structurer intelligemment. Améliorer continuellement." : "Think deeper. Organize intelligently. Improve continuously."}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#e0e7e6]">
            {fr ? "Une approche intégrée et concrète pour renforcer la clarté, l’alignement et la capacité de l’organisation à s’améliorer et à évoluer dans le temps." : "A practical, integrated approach to strengthening organizational clarity, alignment and the capacity to improve and evolve over time."}
          </p>
          <div className="mc-pdf-on-dark mt-10 max-w-xl">
            <BrochurePdfActions pdf="/brochures/myria-management-model.pdf" compact />
          </div>
          <Link href="/resources/brochures" className="mt-8 inline-flex items-center gap-3 border-b border-[#e7bd8a] pb-2 text-sm font-semibold text-[#e7bd8a]">
            {fr ? "Explorer nos ressources en gestion" : "Explore our management resources"} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">
          {fr ? "Trois composantes complémentaires" : "Three mutually reinforcing components"}
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-tight md:text-6xl">
          {fr ? "Une réflexion, une structure et une culture qui se renforcent." : "Thinking, structure and culture working together."}
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.number} className="border-t border-[#a87532] pt-7">
              <p className="text-sm font-medium text-[#785330]">{item.number} / {item.outcome}</p>
              <h3 className="mt-7 font-serif text-4xl font-normal">{item.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#536166]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Du modèle à la pratique" : "From model to practice"}</p>
            <h2 className="mt-6 font-serif text-4xl font-normal leading-tight md:text-6xl">
              {fr ? "Une organisation qui réfléchit et agit de manière intégrée." : "An organization that thinks and works as a whole."}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#536166]">
            <p>
              {fr ? "La réflexion approfondie renforce la compréhension et le jugement. La structure intelligente relie les fonctions et les ressources de l’organisation. La culture de réflexion favorise la circulation des perspectives, des connaissances et des apprentissages." : "In-Depth Thinking strengthens understanding and judgment. Intelligent Structure connects the organization's functions and resources. Thinking Culture helps perspectives, knowledge and learning circulate."}
            </p>
            <p>
              {fr ? "Ensemble, ces composantes renforcent la capacité de l’organisation à réaliser son potentiel grâce à une action coordonnée, à l’évaluation et à l’amélioration continue." : "Together, the model supports the capacity to pursue organizational potential through coordinated action, assessment and continuous improvement."}
            </p>
            <Link href="/labs/discovery" className="inline-flex items-center gap-2 border-b border-[#142b35] pb-2 font-semibold text-[#142b35]">
              {fr ? "Explorer le laboratoire de découverte" : "Explore the Discovery Lab"} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
