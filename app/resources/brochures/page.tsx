import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { brochures } from "@/lib/brochure-resources";
import { BrochurePdfActions } from "@/components/consulting/resources/BrochurePdfActions";

export const metadata: Metadata = {
  title: "Management Frameworks & Brochures | Myria Consulting",
  description:
    "Explore Myria Consulting's Management Model, Strategic Clarity Framework, and AI Governance & Architecture resources for organizational transformation.",
  alternates: { canonical: "/resources/brochures" },
  openGraph: {
    title: "Myria Consulting Management Frameworks and Brochures",
    description: "Practical frameworks for clearer strategy, more effective organizations and responsible AI.",
    url: "/resources/brochures",
    type: "website",
  },
};

export default function BrochuresPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#142b35]">
      <section className="border-b border-[#142b35]/15 px-6 pb-20 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <Link href="/resources/guides" className="text-sm font-medium text-[#785330] hover:underline">
            ← Guides and resources
          </Link>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[.22em] text-[#785330]">
            Myria publications
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-normal leading-[1.07] md:text-7xl">
            Our thinking, made accessible.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#536166]">
            Explore the models and frameworks that shape how we approach strategy,
            organizational performance, change and intelligent systems.
          </p>
        </div>
      </section>
      <section className="px-6 py-20" aria-label="Publications and management frameworks">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brochures.map((item) => (
            <article key={item.slug} className="flex min-h-[440px] flex-col border border-[#142b35]/15 bg-white">
              <div className="flex min-h-52 flex-col justify-between bg-[#173039] p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[.13em] text-[#e9c49c]">{item.category}</span>
                  <BookOpen size={19} aria-hidden="true" className="text-[#e9c49c]" />
                </div>
                <h2 className="font-serif text-[2.1rem] font-normal leading-[1.1]">{item.title}</h2>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="text-sm leading-7 text-[#536166]">{item.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Main topics">
                  {item.topics.map((topic) => (
                    <li key={topic} className="border border-[#142b35]/15 px-3 py-1 text-xs text-[#526068]">{topic}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pt-8">
                  <Link href={item.href} className="inline-flex items-center gap-2 self-start border-b border-[#142b35] pb-2 text-sm font-semibold hover:text-[#785330]">
                    Read the overview <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                  <BrochurePdfActions pdf={item.pdf} compact />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
