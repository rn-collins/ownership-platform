-- Observatory evidence architecture.
-- Additive migration only: no existing table, column, or row is altered.

CREATE TABLE "ObservatoryCase" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "caseType" TEXT NOT NULL,
  "primaryField" TEXT,
  "jurisdiction" TEXT,
  "headline" TEXT,
  "summary" TEXT,
  "inclusionRationale" TEXT,
  "verificationStatus" TEXT NOT NULL DEFAULT 'provisional',
  "evidenceCoverage" DOUBLE PRECISION,
  "consentStatus" TEXT NOT NULL DEFAULT 'public_evidence',
  "publicStatus" TEXT NOT NULL DEFAULT 'draft',
  "firstObservedAt" TIMESTAMP(3),
  "lastReviewedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ObservatoryCase_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatorySource" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "publisher" TEXT,
  "sourceType" TEXT NOT NULL,
  "publishedAt" TIMESTAMP(3),
  "accessedAt" TIMESTAMP(3) NOT NULL,
  "archivedUrl" TEXT,
  "primarySource" BOOLEAN NOT NULL DEFAULT false,
  "publicStatus" TEXT NOT NULL DEFAULT 'internal',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ObservatorySource_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatoryClaim" (
  "id" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "claimType" TEXT NOT NULL,
  "statement" TEXT NOT NULL,
  "constructId" TEXT,
  "epistemicStatus" TEXT NOT NULL DEFAULT 'observed',
  "verificationStatus" TEXT NOT NULL DEFAULT 'unreviewed',
  "confidence" DOUBLE PRECISION,
  "permissibleLanguage" TEXT,
  "contradictionNote" TEXT,
  "publicStatus" TEXT NOT NULL DEFAULT 'draft',
  "observedAt" TIMESTAMP(3),
  "lastReviewedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ObservatoryClaim_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatoryClaimEvidence" (
  "id" TEXT NOT NULL,
  "claimId" TEXT NOT NULL,
  "sourceId" TEXT NOT NULL,
  "supportType" TEXT NOT NULL DEFAULT 'supports',
  "exactPassage" TEXT,
  "locator" TEXT,
  "analystNote" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ObservatoryClaimEvidence_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatoryRelationship" (
  "id" TEXT NOT NULL,
  "fromCaseId" TEXT NOT NULL,
  "toCaseId" TEXT,
  "targetType" TEXT NOT NULL,
  "targetName" TEXT NOT NULL,
  "relationshipType" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3),
  "endedAt" TIMESTAMP(3),
  "verificationStatus" TEXT NOT NULL DEFAULT 'unreviewed',
  "publicStatus" TEXT NOT NULL DEFAULT 'draft',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ObservatoryRelationship_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatoryEvent" (
  "id" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "occurredAt" TIMESTAMP(3),
  "precision" TEXT NOT NULL DEFAULT 'unknown',
  "verificationStatus" TEXT NOT NULL DEFAULT 'unreviewed',
  "publicStatus" TEXT NOT NULL DEFAULT 'draft',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ObservatoryEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ObservatoryConstructObservation" (
  "id" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "constructId" TEXT NOT NULL,
  "valueNumeric" DOUBLE PRECISION,
  "valueCategory" TEXT,
  "measurementMethod" TEXT NOT NULL,
  "instrumentVersion" TEXT,
  "evidenceCoverage" DOUBLE PRECISION,
  "verificationStatus" TEXT NOT NULL DEFAULT 'unreviewed',
  "observedAt" TIMESTAMP(3),
  "publicStatus" TEXT NOT NULL DEFAULT 'draft',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ObservatoryConstructObservation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ObservatoryCase_slug_key" ON "ObservatoryCase"("slug");
CREATE INDEX "ObservatoryCase_caseType_primaryField_idx" ON "ObservatoryCase"("caseType", "primaryField");
CREATE INDEX "ObservatoryCase_verificationStatus_publicStatus_idx" ON "ObservatoryCase"("verificationStatus", "publicStatus");
CREATE UNIQUE INDEX "ObservatorySource_url_key" ON "ObservatorySource"("url");
CREATE INDEX "ObservatorySource_sourceType_primarySource_idx" ON "ObservatorySource"("sourceType", "primarySource");
CREATE INDEX "ObservatoryClaim_caseId_claimType_idx" ON "ObservatoryClaim"("caseId", "claimType");
CREATE INDEX "ObservatoryClaim_verificationStatus_publicStatus_idx" ON "ObservatoryClaim"("verificationStatus", "publicStatus");
CREATE UNIQUE INDEX "ObservatoryClaimEvidence_claimId_sourceId_supportType_key" ON "ObservatoryClaimEvidence"("claimId", "sourceId", "supportType");
CREATE INDEX "ObservatoryClaimEvidence_sourceId_idx" ON "ObservatoryClaimEvidence"("sourceId");
CREATE INDEX "ObservatoryRelationship_fromCaseId_relationshipType_idx" ON "ObservatoryRelationship"("fromCaseId", "relationshipType");
CREATE INDEX "ObservatoryRelationship_targetType_targetName_idx" ON "ObservatoryRelationship"("targetType", "targetName");
CREATE INDEX "ObservatoryEvent_caseId_occurredAt_idx" ON "ObservatoryEvent"("caseId", "occurredAt");
CREATE INDEX "ObservatoryConstructObservation_caseId_constructId_observedAt_idx" ON "ObservatoryConstructObservation"("caseId", "constructId", "observedAt");

ALTER TABLE "ObservatoryClaim" ADD CONSTRAINT "ObservatoryClaim_caseId_fkey"
  FOREIGN KEY ("caseId") REFERENCES "ObservatoryCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ObservatoryClaimEvidence" ADD CONSTRAINT "ObservatoryClaimEvidence_claimId_fkey"
  FOREIGN KEY ("claimId") REFERENCES "ObservatoryClaim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ObservatoryClaimEvidence" ADD CONSTRAINT "ObservatoryClaimEvidence_sourceId_fkey"
  FOREIGN KEY ("sourceId") REFERENCES "ObservatorySource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ObservatoryRelationship" ADD CONSTRAINT "ObservatoryRelationship_fromCaseId_fkey"
  FOREIGN KEY ("fromCaseId") REFERENCES "ObservatoryCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ObservatoryRelationship" ADD CONSTRAINT "ObservatoryRelationship_toCaseId_fkey"
  FOREIGN KEY ("toCaseId") REFERENCES "ObservatoryCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ObservatoryEvent" ADD CONSTRAINT "ObservatoryEvent_caseId_fkey"
  FOREIGN KEY ("caseId") REFERENCES "ObservatoryCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ObservatoryConstructObservation" ADD CONSTRAINT "ObservatoryConstructObservation_caseId_fkey"
  FOREIGN KEY ("caseId") REFERENCES "ObservatoryCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
