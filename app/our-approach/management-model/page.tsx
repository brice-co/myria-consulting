import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Myria Management Model | Integrated Management Approach",
  description:
    "Explore In-Depth Thinking, Intelligent Structure and Thinking Culture: three integrated components of the Myria Management Model for clarity, alignment and continuous improvement.",
  alternates: { canonical: "/our-approach/management-model" },
  openGraph: {
    title: "The Myria Management Model",
    description: "Think deeper. Organize intelligently. Improve continuously.",
    url: "/our-approach/management-model",
    type: "article",
  },
};

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

export default function ManagementModelPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#142b35]">
      <section className="bg-[#142b35] px-6 pb-24 pt-24 text-white md:pb-32 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#e7bd8a]">
            Our approach / Management model
          </p>
          <h1 className="mt-8 max-w-5xl font-serif text-5xl font-normal leading-[1.04] md:text-7xl lg:text-8xl">
            Think deeper. Organize intelligently. Improve continuously.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#e0e7e6]">
            A practical, integrated approach to strengthening organizational clarity,
            alignment and the capacity to improve and evolve over time.
          </p>
          <Link href="/resources/brochures" className="mt-10 inline-flex items-center gap-3 border-b border-[#e7bd8a] pb-2 text-sm font-semibold text-[#e7bd8a]">
            Explore our management resources <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">
          Three mutually reinforcing components
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-tight md:text-6xl">
          Thinking, structure and culture working together.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {dimensions.map((item) => (
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
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">From model to practice</p>
            <h2 className="mt-6 font-serif text-4xl font-normal leading-tight md:text-6xl">
              An organization that thinks and works as a whole.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#536166]">
            <p>
              In-Depth Thinking strengthens understanding and judgment. Intelligent
              Structure connects the organization's functions and resources.
              Thinking Culture helps perspectives, knowledge and learning circulate.
            </p>
            <p>
              Together, the model supports the capacity to pursue organizational
              potential through coordinated action, assessment and continuous improvement.
            </p>
            <Link href="/labs/discovery" className="inline-flex items-center gap-2 border-b border-[#142b35] pb-2 font-semibold text-[#142b35]">
              Explore the Discovery Lab <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
