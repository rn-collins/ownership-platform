-- Append-only audit trail for Observatory researcher mutations.
CREATE TABLE "ObservatoryAuditEvent" (
  "id" TEXT NOT NULL,
  "caseId" TEXT,
  "actorUserId" TEXT NOT NULL,
  "actorEmail" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "beforeValue" JSONB,
  "afterValue" JSONB,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ObservatoryAuditEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ObservatoryAuditEvent_caseId_createdAt_idx" ON "ObservatoryAuditEvent"("caseId","createdAt");
CREATE INDEX "ObservatoryAuditEvent_entityType_entityId_createdAt_idx" ON "ObservatoryAuditEvent"("entityType","entityId","createdAt");
CREATE INDEX "ObservatoryAuditEvent_actorEmail_createdAt_idx" ON "ObservatoryAuditEvent"("actorEmail","createdAt");
ALTER TABLE "ObservatoryAuditEvent" ADD CONSTRAINT "ObservatoryAuditEvent_caseId_fkey"
  FOREIGN KEY ("caseId") REFERENCES "ObservatoryCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
