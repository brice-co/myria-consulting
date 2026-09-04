import Link from "next/link";

export function AIEnablementHero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-24 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-28 lg:pt-28">
      <div className="max-w-3xl">
        <div className="mb-7 flex items-center gap-4">
          <span className="h-px w-10 bg-[#b57b2a]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#b57b2a]">
            AI Enablement Architecture
          </p>
        </div>

        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.035em] text-[#17313a] sm:text-6xl lg:text-7xl">
          AI as an operating system
          <span className="block italic text-[#b57b2a]">
            for the organization.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#596a6f]">
          The opportunity is not to place AI beside the business. It is to embed
          intelligence into how the organization senses, understands, decides,
          coordinates, executes, and learns.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/labs"
            className="rounded-full bg-[#b57b2a] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(181,123,42,.18)] transition hover:-translate-y-0.5 hover:bg-[#a76f24]"
          >
            Explore the Advisory Labs
          </Link>

          <a
            href="#architecture"
            className="rounded-full border border-[#17313a]/15 bg-white/45 px-6 py-3 text-sm font-semibold text-[#17313a] transition hover:bg-white/80"
          >
            Explore the architecture
          </a>
        </div>
      </div>

      <div className="self-end rounded-[32px] border border-[#17313a]/10 bg-[#fbf8f3] p-8 shadow-[0_24px_70px_rgba(23,49,58,.08)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b57b2a]">
          The architectural shift
        </p>

        <div className="mt-8 grid gap-7 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7a878a]">
              Traditional approach
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#17313a]">
              AI as a tool
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#637277]">
              A user opens an AI application, asks a question, receives an
              answer, then manually continues the work elsewhere.
            </p>
          </div>

          <span className="hidden text-2xl text-[#b57b2a] sm:block">→</span>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#5d8f88]">
              AI-enabled enterprise
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#17313a]">
              AI as an operating layer
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#637277]">
              AI participates continuously in decisions, workflows, systems,
              governance, and learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
