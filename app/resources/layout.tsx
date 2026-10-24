
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ResourcesLayoutProps = {
  children: ReactNode;
};

export default function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  return (
    <>
      {children}

      <section
        id="for-leaders"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#704e35]">
            For leaders building what&apos;s next
          </p>

          <div>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              The best consulting experience is the one that leaves your team
              more capable.
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="/contact-myria"
                className="rounded-full bg-[#142b35] px-6 py-3.5 text-sm font-semibold text-white"
              >
                Talk to Myria{" "}
                <ArrowUpRight
                  className="ml-1 inline"
                  size={15}
                  aria-hidden="true"
                />
              </a>

              <span className="text-sm text-muted-foreground">
                Myria Consulting · Management expertise. Intelligent systems. Practical execution.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

