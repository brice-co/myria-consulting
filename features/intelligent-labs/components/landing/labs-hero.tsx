import Link from "next/link";

export function LabsHero() {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b9802c]">
        Myria Consulting · Intelligent Labs
      </p>
      <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight tracking-tight sm:text-6xl">
        Experience a new way of working together.
      </h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-[#5f6b6f]">
        Join a small group of professionals to explore how human expertise,
        intelligent systems and real-time collaboration can address practical
        business challenges.
      </p>
      <Link
        href="/experience/intelligent-labs/register"
        className="mt-9 inline-flex rounded-full bg-[#12313a] px-7 py-4 text-sm font-semibold text-white"
      >
        Choose your two Labs →
      </Link>
    </header>
  );
}
