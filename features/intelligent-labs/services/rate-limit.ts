import "server-only";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const configured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const limiter = configured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "myria:labs:registration",
    })
  : null;

export async function allowRegistration(key: string) {
  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Registration rate limiting is not configured.");
    }
    return true;
  }
  const result = await limiter.limit(key);
  return result.success;
}
