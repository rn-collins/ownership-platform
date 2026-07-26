CREATE TABLE "ObservatoryReviewPackage" (
  "id" TEXT NOT NULL,
  "packageId" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "dossierPath" TEXT,
  "contentHash" TEXT,
  "manifest" JSONB NOT NULL,
  "evidenceCoverage" DOUBLE PRECISION,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "reviewedByUserId" TEXT,
  "reviewedByEmail" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ObservatoryReviewPackage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ObservatoryReviewPackage_packageId_key"
  ON "ObservatoryReviewPackage"("packageId");

CREATE INDEX "ObservatoryReviewPackage_caseId_status_idx"
  ON "ObservatoryReviewPackage"("caseId", "status");

ALTER TABLE "ObservatoryReviewPackage"
  ADD CONSTRAINT "ObservatoryReviewPackage_caseId_fkey"
  FOREIGN KEY ("caseId") REFERENCES "ObservatoryCase"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "ObservatoryReviewPackage" (
  "id","packageId","caseId","version","dossierPath","contentHash","manifest",
  "evidenceCoverage","status","reviewedByEmail","reviewedAt","publishedAt","createdAt","updatedAt"
) VALUES (
  'obs_package_issa_rae_100','issa-rae-1.0.0','obs_case_issa_rae','1.0.0',
  'research/observatory/dossiers/issa-rae-1.0.0.md',
  '7734aeea11d37f85c5e8c36b1b5473b465d0286b',
  '{"claimIds":["obs_claim_ir_c01","obs_claim_ir_c02","obs_claim_ir_c03","obs_claim_ir_c04","obs_claim_ir_c05","obs_claim_ir_c06","obs_claim_ir_c07","obs_claim_ir_c08","obs_claim_ir_c09"],"relationshipIds":["obs_rel_ir_r01","obs_rel_ir_r02","obs_rel_ir_r03","obs_rel_ir_r04","obs_rel_ir_r05","obs_rel_ir_r06"],"eventIds":["obs_event_ir_e01","obs_event_ir_e02","obs_event_ir_e03","obs_event_ir_e04"],"observationIds":[],"limitations":["ownership_percentages_unverified","financial_outcomes_unverified","platform_independence_unverified","psychological_attributes_unmeasured"]}'::jsonb,
  0.78,'published','collins.ra@northeastern.edu',
  '2026-07-25T20:30:05-10:00','2026-07-25T20:30:05-10:00',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
) ON CONFLICT ("packageId") DO NOTHING;
