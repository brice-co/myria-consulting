import "server-only";

import { LABS } from "../constants/labs";
import { labInterest, listRegistrations } from "./registrations";

export async function getLabsDashboardData(page: number) {
  const [registrations, interest] = await Promise.all([
    listRegistrations(page),
    labInterest(),
  ]);

  const interestByLab = new Map<string, { first: number; all: number }>();

  for (const item of interest) {
    const current = interestByLab.get(item.labId) ?? { first: 0, all: 0 };
    current.all += item.count;
    if (item.rank === 1) {
      current.first += item.count;
    }
    interestByLab.set(item.labId, current);
  }

  return {
    registrations,
    page,
    labs: LABS.map((lab) => ({
      ...lab,
      ...(interestByLab.get(lab.id) ?? { first: 0, all: 0 }),
    })),
  };
}

export type LabsDashboardData = Awaited<ReturnType<typeof getLabsDashboardData>>;
