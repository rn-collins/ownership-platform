import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Upstash sliding-window limiter. No-op (always allows) when Upstash env is unset,
// so local dev and the build work without keys.
let limiter: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    prefix: "oi_rl",
  });
}

export async function limit(id: string): Promise<{ success: boolean }> {
  if (!limiter) return { success: true };
  const { success } = await limiter.limit(id);
  return { success };
}
