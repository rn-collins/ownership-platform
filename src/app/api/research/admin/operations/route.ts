import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireResearcher } from "@/lib/researcher-auth";
import { ACTIVATION_REQUIREMENTS, RESPONSE_PROCESS_DOMAINS, scoringMayActivate } from "@/lib/research-validation";
import { logError } from "@/lib/log";

const schedule = z.object({ action: z.literal("schedule"), sessionId: z.string().min(1), start: z.string().datetime(), end: z.string().datetime(), timezone: z.string().max(80), meetingLocation: z.string().url().max(500) });
const sessionStatus = z.object({ action: z.literal("session_status"), sessionId: z.string().min(1), status: z.enum(["requested", "scheduled", "completed", "cancelled", "withdrawn"]), notes: z.string().max(10000).optional(), consentReconfirmed: z.boolean().optional(), recordingUsed: z.boolean().optional() });
const code = z.object({ action: z.literal("code"), sessionId: z.string().min(1), itemId: z.string().max(10), domain: z.enum(RESPONSE_PROCESS_DOMAINS.map((d) => d.id) as [string, ...string[]]), severity: z.enum(["none", "minor", "major", "critical"]), evidence: z.string().min(10).max(10000), proposedAction: z.string().max(2000).optional() });
const revision = z.object({ action: z.literal("revision"), instrument: z.enum(["ownership", "portfolio_professional"]), sourceVersion: z.string(), targetVersion: z.string().regex(/-candidate\./), itemId: z.string().max(10), changeType: z.enum(["retain", "clarify", "split", "reanchor", "route", "defer", "remove"]), beforeValue: z.record(z.unknown()), afterValue: z.record(z.unknown()), rationale: z.string().min(20).max(10000), evidenceCodeIds: z.array(z.string()).min(1), decisionStatus: z.enum(["proposed", "approved", "rejected"]) });
const gate = z.object({ action: z.literal("gate"), instrument: z.enum(["ownership", "portfolio_professional"]), candidateVersion: z.string(), gate: z.enum(ACTIVATION_REQUIREMENTS as unknown as [string, ...string[]]), status: z.enum(["not_met", "met", "waived"]), evidence: z.record(z.unknown()) });
const bodySchema = z.discriminatedUnion("action", [schedule, sessionStatus, code, revision, gate]);

export async function GET() {
  const researcher = await requireResearcher();
  if (!researcher) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!prisma) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  try {
    const [participants, gates, revisions] = await Promise.all([
      prisma.researchParticipant.findMany({ where: { withdrawnAt: null }, include: { sessions: { include: { codes: true }, orderBy: { createdAt: "desc" } } }, orderBy: { createdAt: "desc" }, take: 200 }),
      prisma.validationGateDecision.findMany({ orderBy: { updatedAt: "desc" } }),
      prisma.instrumentRevision.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    ]);
    const activation = ["ownership", "portfolio_professional"].map((instrument) => {
      const values = Object.fromEntries(gates.filter((g) => g.instrument === instrument).map((g) => [g.gate, g.status])) as Record<string, "met" | "not_met" | "waived">;
      return { instrument, scoringMayActivate: scoringMayActivate(values), missing: ACTIVATION_REQUIREMENTS.filter((requirement) => values[requirement] !== "met") };
    });
    return NextResponse.json({ participants, gates, revisions, activation });
  } catch (err) {
    logError("research.admin.operations.get", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const researcher = await requireResearcher();
  if (!researcher) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!prisma) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid", fields: parsed.error.flatten() }, { status: 422 });
  const d = parsed.data;
  try {
    if (d.action === "schedule") {
      const row = await prisma.cognitiveInterviewSession.update({ where: { id: d.sessionId }, data: { scheduledStart: new Date(d.start), scheduledEnd: new Date(d.end), timezone: d.timezone, meetingLocation: d.meetingLocation, researcherUserId: researcher.id, researcherEmail: researcher.email, status: "scheduled" } });
      return NextResponse.json({ ok: true, row });
    }
    if (d.action === "session_status") {
      if (d.status === "completed" && !d.consentReconfirmed) return NextResponse.json({ error: "consent_reconfirmation_required" }, { status: 422 });
      const row = await prisma.cognitiveInterviewSession.update({ where: { id: d.sessionId }, data: { status: d.status, notes: d.notes, consentReconfirmedAt: d.consentReconfirmed ? new Date() : undefined, recordingUsed: d.recordingUsed ?? false, researcherUserId: researcher.id, researcherEmail: researcher.email } });
      return NextResponse.json({ ok: true, row });
    }
    if (d.action === "code") {
      const row = await prisma.responseProcessCode.create({ data: { sessionId: d.sessionId, itemId: d.itemId, domain: d.domain, severity: d.severity, evidence: d.evidence, proposedAction: d.proposedAction, coderUserId: researcher.id } });
      return NextResponse.json({ ok: true, row });
    }
    if (d.action === "revision") {
      const codeCount = await prisma.responseProcessCode.count({ where: { id: { in: d.evidenceCodeIds }, itemId: d.itemId } });
      if (codeCount !== d.evidenceCodeIds.length) return NextResponse.json({ error: "evidence_link_invalid" }, { status: 422 });
      const row = await prisma.instrumentRevision.upsert({
        where: { instrument_targetVersion_itemId: { instrument: d.instrument, targetVersion: d.targetVersion, itemId: d.itemId } },
        update: { changeType: d.changeType, beforeValue: d.beforeValue, afterValue: d.afterValue, rationale: d.rationale, evidenceCodeIds: d.evidenceCodeIds, decisionStatus: d.decisionStatus, reviewedBy: d.decisionStatus === "approved" ? researcher.email : null, reviewedAt: d.decisionStatus === "approved" ? new Date() : null },
        create: { instrument: d.instrument, sourceVersion: d.sourceVersion, targetVersion: d.targetVersion, itemId: d.itemId, changeType: d.changeType, beforeValue: d.beforeValue, afterValue: d.afterValue, rationale: d.rationale, evidenceCodeIds: d.evidenceCodeIds, decisionStatus: d.decisionStatus, proposedBy: researcher.email, reviewedBy: d.decisionStatus === "approved" ? researcher.email : null, reviewedAt: d.decisionStatus === "approved" ? new Date() : null },
      });
      return NextResponse.json({ ok: true, row });
    }
    const row = await prisma.validationGateDecision.upsert({
      where: { instrument_candidateVersion_gate: { instrument: d.instrument, candidateVersion: d.candidateVersion, gate: d.gate } },
      update: { status: d.status, evidence: d.evidence, decidedBy: researcher.email, decidedAt: new Date() },
      create: { instrument: d.instrument, candidateVersion: d.candidateVersion, gate: d.gate, status: d.status, evidence: d.evidence, decidedBy: researcher.email, decidedAt: new Date() },
    });
    return NextResponse.json({ ok: true, row });
  } catch (err) {
    logError("research.admin.operations.post", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
