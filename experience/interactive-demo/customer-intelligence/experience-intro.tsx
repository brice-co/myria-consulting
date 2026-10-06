export function ExperienceIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl animate-rise">
      <div className="text-[11px] font-semibold tracking-[0.28em] text-primary">
        {eyebrow}
      </div>
      <h2 className="font-display mt-4 text-4xl leading-[1.08] tracking-tight text-spruce sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
