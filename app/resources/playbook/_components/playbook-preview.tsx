import type { PlaybookPreviewPart } from "../_types/playbook";

type PlaybookPreviewProps = {
  parts: PlaybookPreviewPart[];
};

export function PlaybookPreview({ parts }: PlaybookPreviewProps) {
  return (
    <section id="preview" className="scroll-mt-8 border-y border-[#ded9cd] bg-[#f2eee4]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0b7c78]">
              Inside the Playbook
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              See the thinking before you request the complete edition.
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-[#667274]">
              Explore the ideas and progression of the Playbook here. The complete PDF and
              interactive digital edition are delivered only after you request the resource.
            </p>
            <a
              href="#get-playbook"
              className="mt-8 inline-flex rounded-full bg-[#173039] px-6 py-3 text-sm font-semibold text-[#f8f5ed]"
            >
              Get the complete Playbook →
            </a>
          </div>

          <div className="grid gap-5">
            {parts.map((part) => (
              <article
                key={part.number}
                className="grid gap-7 rounded-[28px] border border-[#d7d1c4] bg-[#f8f5ed] p-7 md:grid-cols-[76px_1fr] md:p-9"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8b38f] font-serif text-xl text-[#b17b35]">
                  {part.number}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b7c78]">
                    {part.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
                    {part.title}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-7 text-[#667274]">
                    {part.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {part.themes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-full border border-[#d7d1c4] px-3 py-1.5 text-xs text-[#5d6b6d]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
