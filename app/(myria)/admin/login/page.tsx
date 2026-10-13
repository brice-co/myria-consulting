import { redirect } from "next/navigation";

type Props = { searchParams: Promise<{ returnTo?: string }> };
export default async function AdminLoginRedirect({ searchParams }: Props) {
  const { returnTo } = await searchParams;
  const safeReturnTo = returnTo?.startsWith("/") && !returnTo.startsWith("//")
    ? returnTo
    : "/workspace/labs";
  redirect(`/auth/sign-in?returnTo=${encodeURIComponent(safeReturnTo)}`);
}
