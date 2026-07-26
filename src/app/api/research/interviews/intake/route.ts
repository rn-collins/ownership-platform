import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limit } from "@/lib/ratelimit";
import { logError } from "@/lib/log";
import { CONSENT_VERSION } from "@/lib/research-validation";

const intakeSchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  age18OrOlder: z.literal(true),
  canJoinRemoteInterview: z.boolean(),
  relevantExperience: z.literal(true),
  instrumentInterest: z.enum(["ownership", "portfolio_professional", "either"]),
  workArrangement: z.array(z.string().max(80)).max(8).default([]),
  careerStage: z.string().max(80).optional().or(z.literal("")),
  jurisdiction: z.string().max(120).optional().or(z.literal("")),
  businessModel: z.string().max(120).optional().or(z.literal("")),
  structuralContexts: z.array(z.string().max(100)).max(12).default([]),
  availability: z.string().trim().min(3).max(1000),
  timezone: z.string().trim().min(2).max(80),
  accessNeeds: z.string().max(2000).optional().or(z.literal("")),
  voluntaryConsent: z.literal(true),
  privacyAcknowledged: z.literal(true),
  noScoreAcknowledged: z.literal(true),
  contactConsent: z.literal(true),
  recordingConsent: z.boolean().default(false),
  quotationConsent: z.boolean().default(false),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const rate = await limit(`interview-intake:${ip}`);
  if (!rate.success) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const parsed = intakeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  if (!prisma) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });

  const d = parsed.data;
  const eligible = d.age18OrOlder && d.canJoinRemoteInterview && d.relevantExperience && d.contactConsent;
  const token = randomBytes(32).toString("base64url");
  const studyCode = `IO1-${randomBytes(5).toString("hex").toUpperCase()}`;
  const candidateVersion = d.instrumentInterest === "portfolio_professional" ? "0.2.0-candidate.1" : "0.3.0-candidate.1";
  const instrument = d.instrumentInterest === "either" ? "ownership" : d.instrumentInterest;

  try {
    const participant = await prisma.researchParticipant.upsert({
      where: { email: d.email.toLowerCase() },
      update: {
        name: d.name || null,
        ageEligible: true,
        remoteEligible: d.canJoinRemoteInterview,
        relevantExperience: true,
        instrumentInterest: d.instrumentInterest,
        profile: { workArrangement: d.workArrangement, careerStage: d.careerStage || null, jurisdiction: d.jurisdiction || null, businessModel: d.businessModel || null, structuralContexts: d.structuralContexts },
        accessNeeds: d.accessNeeds || null,
        availability: { description: d.availability, timezone: d.timezone },
        consentVersion: CONSENT_VERSION,
        consentedAt: new Date(),
        quotationConsent: d.quotationConsent,
        recordingConsent: d.recordingConsent,
        contactConsent: true,
        withdrawalTokenHash: hashToken(token),
        status: eligible ? "eligible" : "ineligible",
        withdrawnAt: null,
      },
      create: {
        studyCode,
        email: d.email.toLowerCase(),
        name: d.name || null,
        ageEligible: true,
        remoteEligible: d.canJoinRemoteInterview,
        relevantExperience: true,
        instrumentInterest: d.instrumentInterest,
        profile: { workArrangement: d.workArrangement, careerStage: d.careerStage || null, jurisdiction: d.jurisdiction || null, businessModel: d.businessModel || null, structuralContexts: d.structuralContexts },
        accessNeeds: d.accessNeeds || null,
        availability: { description: d.availability, timezone: d.timezone },
        consentVersion: CONSENT_VERSION,
        consentedAt: new Date(),
        quotationConsent: d.quotationConsent,
        recordingConsent: d.recordingConsent,
        contactConsent: true,
        withdrawalTokenHash: hashToken(token),
        status: eligible ? "eligible" : "ineligible",
      },
    });
    if (eligible) {
      const existing = await prisma.cognitiveInterviewSession.findFirst({ where: { participantId: participant.id, round: 1, status: { in: ["requested", "scheduled"] } } });
      if (!existing) await prisma.cognitiveInterviewSession.create({ data: { participantId: participant.id, instrument, candidateVersion, round: 1, timezone: d.timezone, status: "requested" } });
    }
    return NextResponse.json({ ok: true, eligible, studyCode: participant.studyCode, withdrawalToken: token, next: eligible ? "The research team will review the purposive-sampling fit and contact you about scheduling." : "This study currently requires adults with relevant experience who can join a remote interview." });
  } catch (err) {
    logError("research.interviews.intake", err);
    return NextResponse.json({ ok: false, error: "error" }, { status: 500 });
  }
}
