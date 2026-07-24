// Minimal structured error logging. Empty catch blocks hide data-loss in
// production; this restores visibility at near-zero cost. On Vercel these lines
// land in the function logs / log drains. Swap the sink for Sentry later without
// touching call sites.
export function logError(scope: string, err: unknown, meta?: Record<string, unknown>) {
  const detail = err instanceof Error ? { message: err.message, stack: err.stack } : { value: String(err) };
  // eslint-disable-next-line no-console
  console.error(JSON.stringify({ level: "error", scope, ts: new Date().toISOString(), ...detail, ...(meta ?? {}) }));
}
