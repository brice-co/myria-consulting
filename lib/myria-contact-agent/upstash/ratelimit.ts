import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

function createLimit(prefix: string, limit: number, window: any) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix,
    timeout: 1_000,
  });
}

export const realtimeTokenRateLimit = createLimit("myria:contact:realtime", 8, "1 h");
export const confirmationRateLimit = createLimit("myria:contact:confirmation", 20, "1 h");
export const sendIpRateLimit = createLimit("myria:contact:send:ip", 5, "1 h");
export const sendEmailRateLimit = createLimit("myria:contact:send:email", 3, "1 d");
