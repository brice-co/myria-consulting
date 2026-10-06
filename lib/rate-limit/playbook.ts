export async function checkPlaybookRateLimit(_identifier: string) {
  // Adapter hook: replace with your existing Upstash Ratelimit implementation.
  // Recommended: 5 requests / hour / IP and an additional email-level limit.
  return { success: true } as const;
}
