import type { LabsDashboardData } from "../../queries/get-dashboard-data";
import { LabsStatistics } from "./labs-statistics";
import { RegistrationsTable } from "./registrations-table";
import { RegistrationsPagination } from "./registrations-pagination";

type Props = { data: LabsDashboardData };

export function LabsDashboard({ data }: Props) {
  return (
    <div className="space-y-9">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#b9802c]">
          Myria · Administration
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#12313a]">
          Intelligent Labs registrations
        </h1>
        <p className="mt-3 text-[#5f6b6f]">
          {data.registrations.count} registered participants
        </p>
      </header>
      <LabsStatistics labs={data.labs} />
      <RegistrationsTable registrations={data.registrations} />
      <RegistrationsPagination
        page={data.page}
        count={data.registrations.count}
        pageSize={data.registrations.pageSize}
      />
    </div>
  );
}
