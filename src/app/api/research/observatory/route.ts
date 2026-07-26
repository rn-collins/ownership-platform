import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireResearcher } from "@/lib/researcher-auth";
import { logError } from "@/lib/log";

const optionalText = z.string().trim().max(10000).optional();
const updateCase = z.object({
  action: z.literal("update_case"), caseId: z.string().min(1),
  displayName: z.string().trim().min(1).max(200), caseType: z.enum(["creator","professional"]),
  primaryField: z.string().trim().max(120).optional(), jurisdiction: z.string().trim().max(120).optional(),
  headline: z.string().trim().max(500).optional(), summary: optionalText, inclusionRationale: optionalText,
  roleBuiltFlag: z.boolean().optional(),
});
const createClaim = z.object({
  action: z.literal("create_claim"), caseId: z.string().min(1), claimType: z.string().trim().min(1).max(100),
  statement: z.string().trim().min(10).max(10000), constructId: z.string().trim().max(120).optional(),
  epistemicStatus: z.enum(["observed","classified","interpreted","hypothesized"]),
  permissibleLanguage: optionalText,
});
const attachEvidence = z.object({
  action: z.literal("attach_evidence"), claimId: z.string().min(1), url: z.string().url().max(2000),
  title: z.string().trim().min(1).max(500), publisher: z.string().trim().max(300).optional(),
  sourceType: z.enum(["official_record","company_record","first_person","government","academic","journalism","other"]),
  primarySource: z.boolean(), publishedAt: z.string().datetime().optional(), accessedAt: z.string().datetime(),
  supportType: z.enum(["supports","qualifies","contradicts"]), exactPassage: optionalText,
  locator: z.string().trim().max(500).optional(), analystNote: optionalText,
});
const reviewClaim = z.object({
  action: z.literal("review_claim"), claimId: z.string().min(1),
  verificationStatus: z.enum(["unreviewed","partially_supported","verified","disputed","rejected"]),
  confidence: z.number().min(0).max(1).optional(), contradictionNote: optionalText,
  publicStatus: z.enum(["draft","public","withheld"]),
});
const relationship = z.object({
  action: z.literal("create_relationship"), caseId: z.string().min(1),
  targetType: z.enum(["person","organization","platform","asset","venture","institution"]),
  targetName: z.string().trim().min(1).max(300), relationshipType: z.string().trim().min(1).max(120),
  startedAt: z.string().datetime().optional(), endedAt: z.string().datetime().optional(),
});
const event = z.object({
  action: z.literal("create_event"), caseId: z.string().min(1), eventType: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(500), description: optionalText,
  occurredAt: z.string().datetime().optional(), precision: z.enum(["day","month","year","approximate","unknown"]),
});
const observation = z.object({
  action: z.literal("create_observation"), caseId: z.string().min(1), constructId: z.string().trim().min(1).max(120),
  valueNumeric: z.number().optional(), valueCategory: z.string().trim().max(200).optional(),
  measurementMethod: z.enum(["direct_assessment","coded_public_evidence","consented_interview","administrative_record"]),
  instrumentVersion: z.string().trim().max(120).optional(), evidenceCoverage: z.number().min(0).max(1).optional(),
});
const reviewEntity = z.object({
  action: z.literal("review_entity"), entityType: z.enum(["relationship","event","construct_observation"]),
  entityId: z.string().min(1), verificationStatus: z.enum(["unreviewed","partially_supported","verified","disputed","rejected"]),
  publicStatus: z.enum(["draft","public","withheld"]), note: z.string().trim().min(10).max(10000),
});
const caseDecision = z.object({
  action: z.literal("case_decision"), caseId: z.string().min(1),
  verificationStatus: z.enum(["provisional","in_review","verified","disputed","rejected"]),
  publicStatus: z.enum(["draft","public","withheld"]), note: z.string().trim().min(10).max(10000),
});
const bodySchema = z.discriminatedUnion("action", [updateCase,createClaim,attachEvidence,reviewClaim,relationship,event,observation,reviewEntity,caseDecision]);
const json = (value: unknown) => JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;

async function audit(researcher: { id: string; email: string }, data: {
  caseId?: string | null; action: string; entityType: string; entityId: string;
  beforeValue?: unknown; afterValue?: unknown; note?: string;
}) {
  if (!prisma) return;
  await prisma.observatoryAuditEvent.create({ data: {
    caseId: data.caseId ?? null, actorUserId: researcher.id, actorEmail: researcher.email,
    action: data.action, entityType: data.entityType, entityId: data.entityId,
    beforeValue: data.beforeValue === undefined ? undefined : json(data.beforeValue),
    afterValue: data.afterValue === undefined ? undefined : json(data.afterValue), note: data.note,
  }});
}

export async function GET() {
  const researcher = await requireResearcher();
  if (!researcher) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!prisma) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  try {
    const cases = await prisma.observatoryCase.findMany({
      include: {
        claims: { include: { evidence: { include: { source: true } } }, orderBy: { createdAt: "desc" } },
        relationshipsFrom: { orderBy: { createdAt: "desc" } },
        events: { orderBy: { occurredAt: "desc" } },
        observations: { orderBy: { createdAt: "desc" } },
        auditEvents: { orderBy: { createdAt: "desc" }, take: 30 },
      },
      orderBy: [{ verificationStatus: "asc" }, { displayName: "asc" }],
      take: 500,
    });
    return NextResponse.json({ cases, researcher });
  } catch (err) {
    logError("observatory.studio.get", err);
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
    if (d.action === "update_case") {
      const before = await prisma.observatoryCase.findUniqueOrThrow({ where: { id: d.caseId } });
      const row = await prisma.observatoryCase.update({ where: { id: d.caseId }, data: {
        displayName: d.displayName, caseType: d.caseType, primaryField: d.primaryField || null,
        jurisdiction: d.jurisdiction || null, headline: d.headline || null, summary: d.summary || null,
        inclusionRationale: d.inclusionRationale || null, roleBuiltFlag: d.roleBuiltFlag ?? false,
      }});
      await audit(researcher,{caseId:d.caseId,action:"update",entityType:"case",entityId:row.id,beforeValue:before,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "create_claim") {
      const row = await prisma.observatoryClaim.create({ data: {
        caseId:d.caseId,claimType:d.claimType,statement:d.statement,constructId:d.constructId||null,
        epistemicStatus:d.epistemicStatus,permissibleLanguage:d.permissibleLanguage||null,
      }});
      await audit(researcher,{caseId:d.caseId,action:"create",entityType:"claim",entityId:row.id,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "attach_evidence") {
      const claim = await prisma.observatoryClaim.findUniqueOrThrow({where:{id:d.claimId}});
      const source = await prisma.observatorySource.upsert({where:{url:d.url},update:{
        title:d.title,publisher:d.publisher||null,sourceType:d.sourceType,publishedAt:d.publishedAt?new Date(d.publishedAt):null,
        accessedAt:new Date(d.accessedAt),primarySource:d.primarySource,publicStatus:"public",
      },create:{
        url:d.url,title:d.title,publisher:d.publisher||null,sourceType:d.sourceType,publishedAt:d.publishedAt?new Date(d.publishedAt):null,
        accessedAt:new Date(d.accessedAt),primarySource:d.primarySource,publicStatus:"public",
      }});
      const row = await prisma.observatoryClaimEvidence.upsert({
        where:{claimId_sourceId_supportType:{claimId:d.claimId,sourceId:source.id,supportType:d.supportType}},
        update:{exactPassage:d.exactPassage||null,locator:d.locator||null,analystNote:d.analystNote||null},
        create:{claimId:d.claimId,sourceId:source.id,supportType:d.supportType,exactPassage:d.exactPassage||null,locator:d.locator||null,analystNote:d.analystNote||null},
      });
      await audit(researcher,{caseId:claim.caseId,action:"attach_evidence",entityType:"claim_evidence",entityId:row.id,afterValue:{row,source}});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "review_claim") {
      const before=await prisma.observatoryClaim.findUniqueOrThrow({where:{id:d.claimId}});
      const evidenceCount=await prisma.observatoryClaimEvidence.count({where:{claimId:d.claimId}});
      if (d.verificationStatus==="verified" && evidenceCount===0) return NextResponse.json({error:"verified_claim_requires_evidence"},{status:422});
      if (d.publicStatus==="public" && !["verified","partially_supported"].includes(d.verificationStatus)) return NextResponse.json({error:"public_claim_requires_support"},{status:422});
      const row=await prisma.observatoryClaim.update({where:{id:d.claimId},data:{
        verificationStatus:d.verificationStatus,confidence:d.confidence,contradictionNote:d.contradictionNote||null,
        publicStatus:d.publicStatus,lastReviewedAt:new Date(),
      }});
      await audit(researcher,{caseId:row.caseId,action:"review",entityType:"claim",entityId:row.id,beforeValue:before,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "create_relationship") {
      const row=await prisma.observatoryRelationship.create({data:{
        fromCaseId:d.caseId,targetType:d.targetType,targetName:d.targetName,relationshipType:d.relationshipType,
        startedAt:d.startedAt?new Date(d.startedAt):null,endedAt:d.endedAt?new Date(d.endedAt):null,
      }});
      await audit(researcher,{caseId:d.caseId,action:"create",entityType:"relationship",entityId:row.id,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "create_event") {
      const row=await prisma.observatoryEvent.create({data:{
        caseId:d.caseId,eventType:d.eventType,title:d.title,description:d.description||null,
        occurredAt:d.occurredAt?new Date(d.occurredAt):null,precision:d.precision,
      }});
      await audit(researcher,{caseId:d.caseId,action:"create",entityType:"event",entityId:row.id,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "create_observation") {
      if (d.valueNumeric===undefined && !d.valueCategory) return NextResponse.json({error:"observation_value_required"},{status:422});
      const row=await prisma.observatoryConstructObservation.create({data:{
        caseId:d.caseId,constructId:d.constructId,valueNumeric:d.valueNumeric,valueCategory:d.valueCategory||null,
        measurementMethod:d.measurementMethod,instrumentVersion:d.instrumentVersion||null,evidenceCoverage:d.evidenceCoverage,
      }});
      await audit(researcher,{caseId:d.caseId,action:"create",entityType:"construct_observation",entityId:row.id,afterValue:row});
      return NextResponse.json({ok:true,row});
    }
    if (d.action === "review_entity") {
      let before: any;
      let row: any;
      let caseId: string;
      if (d.entityType === "relationship") {
        before = await prisma.observatoryRelationship.findUniqueOrThrow({where:{id:d.entityId}});
        caseId = before.fromCaseId;
        if (d.publicStatus==="public" && !["verified","partially_supported"].includes(d.verificationStatus))
          return NextResponse.json({error:"public_relationship_requires_support"},{status:422});
        row = await prisma.observatoryRelationship.update({where:{id:d.entityId},data:{verificationStatus:d.verificationStatus,publicStatus:d.publicStatus}});
      } else if (d.entityType === "event") {
        before = await prisma.observatoryEvent.findUniqueOrThrow({where:{id:d.entityId}});
        caseId = before.caseId;
        if (d.publicStatus==="public" && !["verified","partially_supported"].includes(d.verificationStatus))
          return NextResponse.json({error:"public_event_requires_support"},{status:422});
        row = await prisma.observatoryEvent.update({where:{id:d.entityId},data:{verificationStatus:d.verificationStatus,publicStatus:d.publicStatus}});
      } else {
        before = await prisma.observatoryConstructObservation.findUniqueOrThrow({where:{id:d.entityId}});
        caseId = before.caseId;
        if (d.publicStatus==="public" && d.verificationStatus!=="verified")
          return NextResponse.json({error:"public_observation_requires_verification"},{status:422});
        row = await prisma.observatoryConstructObservation.update({where:{id:d.entityId},data:{verificationStatus:d.verificationStatus,publicStatus:d.publicStatus}});
      }
      await audit(researcher,{caseId,action:"review",entityType:d.entityType,entityId:d.entityId,beforeValue:before,afterValue:row,note:d.note});
      return NextResponse.json({ok:true,row});
    }
    const before=await prisma.observatoryCase.findUniqueOrThrow({where:{id:d.caseId}});
    if (d.verificationStatus==="verified") {
      const supported=await prisma.observatoryClaim.count({where:{caseId:d.caseId,verificationStatus:"verified",evidence:{some:{}}}});
      if (supported===0) return NextResponse.json({error:"verified_case_requires_verified_evidenced_claim"},{status:422});
    }
    if (d.publicStatus==="public" && d.verificationStatus!=="verified" && before.publicStatus!=="public")
      return NextResponse.json({error:"new_publication_requires_verified_case"},{status:422});
    const row=await prisma.observatoryCase.update({where:{id:d.caseId},data:{
      verificationStatus:d.verificationStatus,publicStatus:d.publicStatus,lastReviewedAt:new Date(),
    }});
    await audit(researcher,{caseId:d.caseId,action:"case_decision",entityType:"case",entityId:row.id,beforeValue:before,afterValue:row,note:d.note});
    return NextResponse.json({ok:true,row});
  } catch (err) {
    logError("observatory.studio.post", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
