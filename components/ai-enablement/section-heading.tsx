type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="h-px w-9 bg-[#b57b2a]" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b57b2a]">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-5 font-serif text-3xl tracking-[-0.02em] text-[#17313a] sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#637277]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
