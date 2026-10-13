import type { LabsDashboardData } from "../../queries/get-dashboard-data";

type Props = { labs: LabsDashboardData["labs"] };

export function LabsStatistics({ labs }: Props) {
  return (
    <section aria-label="Lab interest" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {labs.map((lab) => (
        <article
          key={lab.id}
          className="rounded-xl border border-[#ded8cb] bg-white p-5"
        >
          <h2 className="font-semibold text-[#12313a]">{lab.title}</h2>
          <p className="mt-3 text-3xl font-semibold text-[#12313a]">{lab.first}</p>
          <p className="text-xs text-[#5f6b6f]">
            First choices · {lab.all} total selections
          </p>
        </article>
      ))}
    </section>
  );
}
