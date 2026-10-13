import { NextRequest, NextResponse } from "next/server";
import { getLabsAdminAccess } from "@/features/intelligent-labs/auth/require-labs-admin";
import { listRegistrations, labInterest } from "@/features/intelligent-labs/queries/registrations";

export async function GET(request: NextRequest) {
  const access = await getLabsAdminAccess();
  if (access.status === "unauthenticated") {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (access.status !== "authorized") {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
  const safePage = Number.isFinite(page) ? Math.min(10000, Math.max(1, page)) : 1;
  const [registrations, interest] = await Promise.all([
    listRegistrations(safePage),
    labInterest(),
  ]);
  return NextResponse.json({ registrations, interest });
}
