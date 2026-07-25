import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { classifyAssessmentRecord, type RecordClass } from "@/lib/research-governance";
import { logError } from "@/lib/log";

export const dynamic = "force-dynamic";

const CLASSES: RecordClass[] = ["canonical", "recoverable", "ambiguous", "unusable"];

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: "Research-integrity diagnostic is unavailable because the database is not configured." },
      { status: 503 },
    );
  }
  try {
    const rows = await prisma.assessment.findMany({
      select: {
        instrument: true,
        responses: true,
        research: true,
        methodologyVersion: true,
        total: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const counts = Object.fromEntries(CLASSES.map((key) => [key, 0])) as Record<RecordClass, number>;
    const byInstrument: Record<string, Record<RecordClass, number>> = {};
    const reasons: Record<string, number> = {};
    let earliest: Date | null = null;
    let latest: Date | null = null;

    for (const row of rows) {
      const diagnosis = classifyAssessmentRecord(row);
      counts[diagnosis.classification] += 1;
      const instrument = diagnosis.inferredInstrument ?? row.instrument ?? "unknown";
      byInstrument[instrument] ??= Object.fromEntries(CLASSES.map((key) => [key, 0])) as Record<RecordClass, number>;
      byInstrument[instrument][diagnosis.classification] += 1;
      reasons[diagnosis.reason] = (reasons[diagnosis.reason] ?? 0) + 1;
      earliest = !earliest || row.createdAt < earliest ? row.createdAt : earliest;
      latest = !latest || row.createdAt > latest ? row.createdAt : latest;
    }

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      mutationPolicy: "read-only; no source rows altered",
      grain: "one stored Assessment row",
      totalRows: rows.length,
      classes: counts,
      byInstrument,
      reasons: Object.entries(reasons)
        .map(([reason, count]) => ({ reason, count }))
        .sort((a, b) => b.count - a.count),
      temporalCoverage: {
        earliest: earliest?.toISOString() ?? null,
        latest: latest?.toISOString() ?? null,
      },
      publicFindingsEligibility: counts.canonical,
      definitions: {
        canonical: "Complete, reproducible, current-version row with canonical event metadata.",
        recoverable: "Complete and reproducible row that predates or lacks canonical event/version metadata.",
        ambiguous: "Instrument, completeness, or stored-score consistency cannot be resolved without unsupported assumptions.",
        unusable: "No valid response set exists for scoring or recovery.",
      },
    });
  } catch (error) {
    logError("research-integrity.get", error);
    return NextResponse.json(
      { error: "Research-integrity diagnostic is temporarily unavailable." },
      { status: 503 },
    );
  }
}
