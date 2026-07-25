import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";
import { RESEARCH_VERSION } from "@/lib/research";
import { assess } from "@/lib/engine";
import { assessProfessional } from "@/lib/engine_professional";

// The anonymous benchmark. POST stores ONLY banded answers + the computed total
// (no identity; IP is an ephemeral rate-limit key, never stored). GET reads the
// distribution back so a participant sees where they land and the site can show a
// live "N measured" number — the value-return loop that makes the quiz a research
// instrument. A small-N guard prevents noisy or de-anonymizing early percentiles.
const MIN_N = 30; // below this, no percentile is shown (too few to be meaningful)

const postSchema = z.object({
  responses: z.record(z.string(), z.number().min(0).max(5)),
  research: z.record(z.string(), z.any()).optional(),
  instrument: z.enum(["ownership", "portfolio_professional"]).default("ownership"),
  methodologyVersion: z.string().max(20).optional(),
});

function totalFor(instrument: string, responses: Record<string, number>): number {
  return instrument === "portfolio_professional"
    ? assessProfessional(responses).total
    : assess(responses).total;
}

export async function POST(req: Request) {
  const ipKey = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { success } = await limit(`bm:${ipKey}`);
  if (!success) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 422 });

  if (!prisma) return NextResponse.json({ ok: true, stored: false });

  try {
    const total = totalFor(parsed.data.instrument, parsed.data.responses);
    await prisma.assessment.create({
      data: {
        instrument: parsed.data.instrument,
        source: "self",
        anonymous: true,
        responses: parsed.data.responses,
        research: parsed.data.research ?? undefined,
        methodologyVersion: parsed.data.methodologyVersion,
        researchVersion: RESEARCH_VERSION,
        total,
      },
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    logError("benchmark.create", err);
    return NextResponse.json({ ok: true, stored: false });
  }
}

// GET /api/benchmark?instrument=ownership[&score=61]
// Returns { n } always; when n >= MIN_N adds { mean, median, distribution } and,
// if a score is supplied, { percentile } (share of respondents at or below it).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const instrument = url.searchParams.get("instrument") === "portfolio_professional"
    ? "portfolio_professional" : "ownership";
  const scoreParam = url.searchParams.get("score");
  const score = scoreParam != null ? Number(scoreParam) : null;

  if (!prisma) return NextResponse.json({ n: 0, enough: false });

  try {
    const rows = await prisma.assessment.findMany({
      where: { instrument, anonymous: true, total: { not: null } },
      select: { total: true },
    });
    const totals = rows.map((r) => r.total as number).filter((t) => typeof t === "number");
    const n = totals.length;
    if (n < MIN_N) return NextResponse.json({ n, enough: false });

    const sorted = [...totals].sort((a, b) => a - b);
    const mean = Math.round(totals.reduce((a, b) => a + b, 0) / n);
    const median = sorted[Math.floor(n / 2)];

    // Coarse distribution in 10-point bins, for the Findings page.
    const bins = Array.from({ length: 10 }, () => 0);
    totals.forEach((t) => { bins[Math.min(9, Math.floor(t / 10))]++; });

    let percentile: number | null = null;
    if (score != null && Number.isFinite(score)) {
      const atOrBelow = sorted.filter((t) => t <= score).length;
      percentile = Math.round((atOrBelow / n) * 100);
    }

    return NextResponse.json({ n, enough: true, mean, median, distribution: bins, percentile });
  } catch (err) {
    logError("benchmark.get", err);
    return NextResponse.json({ n: 0, enough: false });
  }
}
