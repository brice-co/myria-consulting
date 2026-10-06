import type { PlaybookChapter } from "../_types/playbook";
export function PlaybookChapters({ chapters }: { chapters: PlaybookChapter[] }) {
  return (
    <section className="bg-[#173039] text-[#f8f5ed]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c18a3a]">Inside the playbook</p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">A progression from AI experimentation to enterprise capability.</h2>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {chapters.map((chapter) => <article key={chapter.number} className="grid grid-cols-[48px_1fr] gap-4 border-t border-[#315159] py-6"><span className="text-xs font-semibold text-[#c18a3a]">{chapter.number}</span><div><h3 className="font-serif text-2xl">{chapter.title}</h3><p className="mt-2 text-sm leading-6 text-[#b9c7c7]">{chapter.description}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
