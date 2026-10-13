import type { LabsDashboardData } from "../../queries/get-dashboard-data";

type Props = { registrations: LabsDashboardData["registrations"] };

export function RegistrationsTable({ registrations }: Props) {
  return (
    <section className="overflow-x-auto rounded-xl border border-[#ded8cb] bg-white">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-[#f6f1e7] text-[#12313a]">
          <tr>
            <th scope="col" className="p-4">Name</th>
            <th scope="col" className="p-4">Email</th>
            <th scope="col" className="p-4">Company</th>
            <th scope="col" className="p-4">Role</th>
            <th scope="col" className="p-4">Motivation</th>
            <th scope="col" className="p-4">Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {registrations.rows.map((item) => (
            <tr key={item.id} className="border-t border-[#ded8cb]">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.email}</td>
              <td className="p-4">{item.company}</td>
              <td className="p-4">{item.role}</td>
              <td className="p-4">{item.motivation}</td>
              <td className="p-4">{item.confirmationStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {registrations.rows.length === 0 && (
        <p className="p-7 text-sm text-[#5f6b6f]">No registrations yet.</p>
      )}
    </section>
  );
}
