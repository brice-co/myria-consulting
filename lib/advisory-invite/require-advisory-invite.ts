import { verifyAdvisoryInviteToken } from "./token";

export function requireAdvisoryInvite(
  token: string | null | undefined,
) {
  if (!token) return null;

  return verifyAdvisoryInviteToken(token);
}
