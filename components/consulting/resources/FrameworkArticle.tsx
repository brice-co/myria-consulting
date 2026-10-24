import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type FrameworkPart = {
  title: string;
  summary: string;
};

export function FrameworkArticle({
  eyebrow,
  title,
  subtitle,
  introduction,
  parts,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  introduction: string;
  parts: readonly FrameworkPart[];
}) {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#142b35]">
      <section className="bg-[#142b35] px-6 pb-24 pt-24 text-white md:pb-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link href="/resources/brochures" className="text-sm text-[#e7bd8a] hover:underline">
            ← Publications and frameworks
          </Link>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[#e7bd8a]">{eyebrow}</p>
          <h1 className="mt-7 max-w-5xl font-serif text-5xl font-normal leading-[1.05] md:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[#e2e8e7]">{subtitle}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[.55fr_1fr]">
          <h2 className="font-serif text-4xl font-normal">The core idea.</h2>
          <p className="max-w-3xl text-lg leading-8 text-[#536166]">{introduction}</p>
        </div>
        <div className="mt-20 grid gap-px overflow-hidden border border-[#142b35]/15 bg-[#142b35]/15 md:grid-cols-2">
          {parts.map((part, index) => (
            <article key={part.title} className="bg-white p-8 md:p-10">
              <span className="text-xs font-semibold tracking-[.17em] text-[#785330]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-serif text-3xl font-normal">{part.title}</h3>
              <p className="mt-4 leading-8 text-[#536166]">{part.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-[#142b35]/15 bg-white px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#785330]">Connect the framework to your business</p>
            <h2 className="mt-4 font-serif text-4xl font-normal">Start with the challenge.</h2>
          </div>
          <Link href="/contact-myria" className="inline-flex items-center gap-3 rounded-full bg-[#142b35] px-6 py-4 text-sm font-semibold text-white">
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
