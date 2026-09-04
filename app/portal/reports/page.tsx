import Link from "next/link";
import {
  ArrowRight,
  FileText,
  FolderOpen,
  LockKeyhole,
} from "lucide-react";

export default function PortalReportsPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      {/* Header */}
      <section className="border-b border-black/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-amber-700">
              <LockKeyhole
                className="size-4"
                aria-hidden="true"
              />

              <p className="text-xs font-medium uppercase tracking-[0.2em]">
                Client Portal
              </p>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-5xl lg:text-6xl">
              Advisory Reports
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700">
              Your completed advisory work will live here.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
              As Lab sessions are completed, their syntheses and future
              advisory deliverables will be collected in one place so you can
              return to decisions, priorities, risks, and recommended next
              steps.
            </p>
          </div>
        </div>
      </section>

      {/* Reports workspace */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            {/* Context */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                Advisory library
              </p>

              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-slate-900 sm:text-4xl">
                A record of the work you have completed with Myria.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
                Reports will capture the structured synthesis produced at the
                end of each completed Lab session and provide a reference point
                for future work.
              </p>
            </div>

            {/* Empty state */}
            <div className="border border-black/10 bg-[#fbf8f1]">
              <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
                <div className="flex size-14 items-center justify-center border border-black/10 bg-white text-[#12313a]">
                  <FolderOpen
                    className="size-6"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-amber-700">
                  No reports yet
                </p>

                <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-slate-900">
                  Complete an advisory session to create your first report.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
                  When a Lab session reaches its final synthesis, the resulting
                  advisory output will become available here for future review.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/portal/labs"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#12313a] px-6 text-sm font-medium text-white transition hover:bg-[#183d47]"
                  >
                    Explore Advisory Labs

                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href="/portal"
                    className="inline-flex min-h-12 items-center justify-center border border-black/10 bg-white px-6 text-sm font-medium text-slate-700 transition hover:border-black/20 hover:text-slate-900"
                  >
                    Return to portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future report structure */}
      <section className="border-t border-black/10 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                What will appear here
              </p>

              <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                More than a transcript.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
                The intent is to preserve the advisory result of the session,
                not simply the conversation that produced it.
              </p>
            </div>

            <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
              <ReportFeature
                number="01"
                title="Session synthesis"
                description="The consolidated view of the situation developed through the Lab."
              />

              <ReportFeature
                number="02"
                title="Key findings"
                description="Important observations, implications, opportunities, and risks surfaced during the session."
              />

              <ReportFeature
                number="03"
                title="Advisory direction"
                description="The direction that emerges from the combined analysis rather than isolated answers."
              />

              <ReportFeature
                number="04"
                title="Recommended next steps"
                description="A practical bridge from advisory clarity toward decisions and action."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#12313a] py-14 text-white sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex size-10 shrink-0 items-center justify-center border border-white/15 text-amber-300">
              <FileText
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="font-serif text-2xl">
                Ready to create your first advisory output?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Start with the Lab that best matches the business question you
                want to work through.
              </p>
            </div>
          </div>

          <Link
            href="/portal/labs"
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-amber-300 px-6 text-sm font-medium text-[#12313a] transition hover:bg-amber-200"
          >
            Start a Lab

            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

type ReportFeatureProps = {
  number: string;
  title: string;
  description: string;
};

function ReportFeature({
  number,
  title,
  description,
}: ReportFeatureProps) {
  return (
    <article className="min-h-[210px] bg-[#fbf8f1] p-7">
      <span className="text-xs font-medium text-amber-700">
        {number}
      </span>

      <h3 className="mt-5 font-serif text-xl text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </article>
  );
}