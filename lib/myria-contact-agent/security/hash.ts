import { createHash } from "node:crypto";

export function hashIdentifier(value: string) {
  const salt = process.env.RATE_LIMIT_SALT ?? "myria-contact-agent";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}
