import { randomBytes } from "node:crypto";
import type { ContactInquiry } from "./schema";
import { redis } from "@/lib/myria-contact-agent/upstash/redis";

const TTL_SECONDS = 5 * 60;

type StoredConfirmation = {
  inquiry: ContactInquiry;
  createdAt: string;
};

export async function createConfirmation(inquiry: ContactInquiry) {
  const token = randomBytes(32).toString("base64url");
  const value: StoredConfirmation = { inquiry, createdAt: new Date().toISOString() };

  await redis.set(`myria:contact:confirm:${token}`, value, { ex: TTL_SECONDS });
  return { token, expiresInSeconds: TTL_SECONDS };
}

export async function consumeConfirmation(token: string): Promise<StoredConfirmation | null> {
  const key = `myria:contact:confirm:${token}`;
  const value = await redis.get<StoredConfirmation>(key);
  if (!value) return null;
  await redis.del(key);
  return value;
}
