import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import { requireSession } from "./require-session";

export async function requireWorkspace() {
  const session = await requireSession();
  const organizations = await auth.api.listOrganizations({ headers: await headers() });
  if (!organizations?.length) redirect("/auth/invitations");
  return { session, organizations };
}
