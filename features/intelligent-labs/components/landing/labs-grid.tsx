import { LABS } from "../../constants/labs";

export function LabsGrid() {
  return (
    <section aria-label="Available Labs" className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {LABS.map((lab) => (
        <article
          key={lab.id}
          className="rounded-2xl border border-[#ded8cb] bg-[#fbf8f1] p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b9802c]">
            Interactive experience
          </p>
          <h2 className="mt-4 font-serif text-2xl">{lab.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5f6b6f]">{lab.description}</p>
          <p className="mt-5 text-xs text-[#5f6b6f]">{lab.audience}</p>
        </article>
      ))}
    </section>
  );
}
