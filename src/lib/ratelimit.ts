import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash sliding-window limiter. No-op (always allows) when Upstash env is unset,
// so local dev and the build work without keys.
// Accepts both naming schemes: UPSTASH_REDIS_REST_* (Upstash console) and
// KV_REST_API_* (injected when the store is connected via Vercel Storage).
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let limiter: Ratelimit | null = null;
if (REDIS_URL && REDIS_TOKEN) {
  limiter = new Ratelimit({
    redis: new Redis({ url: REDIS_URL, token: REDIS_TOKEN }),
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    prefix: "oi_rl",
  });
}

export async function limit(id: string): Promise<{ success: boolean }> {
  if (!limiter) return { success: true };
  const { success } = await limiter.limit(id);
  return { success };
}
