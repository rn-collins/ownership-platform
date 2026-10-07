// Small, framework-free helpers shared by the public forms and the assessments.
// Validation and response interpretation are pure so they can be unit-tested.

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

/** First field (in visual order) that currently has an error. */
export function firstInvalid<K extends string>(order: readonly K[], errors: FieldErrors<K>): K | undefined {
  return order.find((key) => Boolean(errors[key]));
}

export function hasErrors<K extends string>(errors: FieldErrors<K>): boolean {
  return Object.values(errors).some(Boolean);
}

/** Count of fields with errors, phrased for the form-level alert. */
export function errorSummary<K extends string>(errors: FieldErrors<K>): string {
  const n = Object.values(errors).filter(Boolean).length;
  return n === 1 ? "One field needs attention before this can be sent." : `${n} fields need attention before this can be sent.`;
}

export const NETWORK_ERROR = "We couldn’t reach the server. Check your connection and try again.";

/** Friendly message for a failed submission. `status` is null for a network failure. */
export function describeFailure(status: number | null): string {
  if (status == null) return NETWORK_ERROR;
  if (status === 429) return "Too many attempts in a short time. Please wait a minute and try again.";
  if (status >= 400 && status < 500) return "Some details weren’t accepted. Please check the form and try again.";
  return "Something went wrong on our side, so this wasn’t sent. Please try again in a moment.";
}

/** `synced` is present only when the server reports whether the signup reached the outside mailing list. */
export type SubmitOutcome = { ok: true; synced?: boolean; notified?: boolean } | { ok: false; message: string };

/**
 * Interpret a response body + status. A JSON body with `ok: true` is success
 * (e.g. stored but not yet synced). A 2xx without an `ok` flag is also success.
 */
export function interpretResponse(status: number, body: unknown): SubmitOutcome {
  const flag = body && typeof body === "object" && "ok" in body ? (body as { ok: unknown }).ok : undefined;
  if (flag === true) {
    const synced = body && typeof body === "object" && "synced" in body ? (body as { synced: unknown }).synced : undefined;
    const notified = body && typeof body === "object" && "notified" in body ? (body as { notified: unknown }).notified : undefined;
    return { ok: true, ...(typeof synced === "boolean" ? { synced } : {}), ...(typeof notified === "boolean" ? { notified } : {}) };
  }
  if (flag === undefined && status >= 200 && status < 300) return { ok: true };
  return { ok: false, message: describeFailure(status >= 200 && status < 300 ? 500 : status) };
}

export async function postJson(url: string, payload: unknown): Promise<SubmitOutcome> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, message: describeFailure(null) };
  }
  let body: unknown = null;
  try { body = await res.json(); } catch { /* non-JSON body */ }
  return interpretResponse(res.status, body);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Move focus to an element and bring it into view, honouring reduced motion. */
export function focusAndReveal(el: HTMLElement | null, block: ScrollLogicalPosition = "start"): void {
  if (!el) return;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block });
}
