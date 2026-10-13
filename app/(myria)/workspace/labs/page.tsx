import { redirect } from "next/navigation";
import { getLabsAdminAccess } from "@/features/intelligent-labs/auth/require-labs-admin";
import { LabsDashboard } from "@/features/intelligent-labs/components/admin/labs-dashboard";
import { getLabsDashboardData } from "@/features/intelligent-labs/queries/get-dashboard-data";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function LabsPage({ searchParams }: Props) {
  const access = await getLabsAdminAccess();

  if (access.status === "unauthenticated") {
    redirect("/auth/sign-in?returnTo=%2Fworkspace%2Flabs");
  }

  if (access.status === "forbidden") {
    return (
      <section>
        <h1 className="text-3xl font-semibold">Access denied</h1>
        <p className="mt-4">
          You must be an owner or admin of the Myria organization.
        </p>
      </section>
    );
  }

  const { page: requestedPage } = await searchParams;
  const parsedPage = Number(requestedPage);
  const page = Number.isSafeInteger(parsedPage)
    ? Math.min(10000, Math.max(1, parsedPage))
    : 1;

  const data = await getLabsDashboardData(page);
  return <LabsDashboard data={data} />;
}
