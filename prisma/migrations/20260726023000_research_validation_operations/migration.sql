CREATE TABLE "ResearchParticipant" (
  "id" TEXT NOT NULL,
  "studyCode" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "ageEligible" BOOLEAN NOT NULL,
  "remoteEligible" BOOLEAN NOT NULL,
  "relevantExperience" BOOLEAN NOT NULL,
  "instrumentInterest" TEXT NOT NULL,
  "profile" JSONB NOT NULL,
  "accessNeeds" TEXT,
  "availability" JSONB NOT NULL,
  "consentVersion" TEXT NOT NULL,
  "consentedAt" TIMESTAMP(3) NOT NULL,
  "quotationConsent" BOOLEAN NOT NULL DEFAULT false,
  "recordingConsent" BOOLEAN NOT NULL DEFAULT false,
  "contactConsent" BOOLEAN NOT NULL,
  "withdrawalTokenHash" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'screened',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "withdrawnAt" TIMESTAMP(3),
  CONSTRAINT "ResearchParticipant_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ResearchParticipant_studyCode_key" ON "ResearchParticipant"("studyCode");
CREATE UNIQUE INDEX "ResearchParticipant_email_key" ON "ResearchParticipant"("email");
CREATE UNIQUE INDEX "ResearchParticipant_withdrawalTokenHash_key" ON "ResearchParticipant"("withdrawalTokenHash");
CREATE INDEX "ResearchParticipant_status_createdAt_idx" ON "ResearchParticipant"("status", "createdAt");

CREATE TABLE "CognitiveInterviewSession" (
  "id" TEXT NOT NULL,
  "participantId" TEXT NOT NULL,
  "instrument" TEXT NOT NULL,
  "candidateVersion" TEXT NOT NULL,
  "round" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'requested',
  "scheduledStart" TIMESTAMP(3),
  "scheduledEnd" TIMESTAMP(3),
  "timezone" TEXT,
  "meetingLocation" TEXT,
  "researcherUserId" TEXT,
  "researcherEmail" TEXT,
  "consentReconfirmedAt" TIMESTAMP(3),
  "recordingUsed" BOOLEAN NOT NULL DEFAULT false,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CognitiveInterviewSession_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CognitiveInterviewSession_instrument_round_status_idx" ON "CognitiveInterviewSession"("instrument", "round", "status");
CREATE INDEX "CognitiveInterviewSession_participantId_createdAt_idx" ON "CognitiveInterviewSession"("participantId", "createdAt");
ALTER TABLE "CognitiveInterviewSession" ADD CONSTRAINT "CognitiveInterviewSession_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ResearchParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "ResponseProcessCode" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "domain" TEXT NOT NULL,
  "severity" TEXT NOT NULL,
  "evidence" TEXT NOT NULL,
  "proposedAction" TEXT,
  "coderUserId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ResponseProcessCode_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ResponseProcessCode_itemId_domain_severity_idx" ON "ResponseProcessCode"("itemId", "domain", "severity");
CREATE INDEX "ResponseProcessCode_sessionId_idx" ON "ResponseProcessCode"("sessionId");
ALTER TABLE "ResponseProcessCode" ADD CONSTRAINT "ResponseProcessCode_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CognitiveInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "InstrumentRevision" (
  "id" TEXT NOT NULL,
  "instrument" TEXT NOT NULL,
  "sourceVersion" TEXT NOT NULL,
  "targetVersion" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "changeType" TEXT NOT NULL,
  "beforeValue" JSONB NOT NULL,
  "afterValue" JSONB NOT NULL,
  "rationale" TEXT NOT NULL,
  "evidenceCodeIds" JSONB NOT NULL,
  "decisionStatus" TEXT NOT NULL DEFAULT 'proposed',
  "proposedBy" TEXT NOT NULL,
  "reviewedBy" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InstrumentRevision_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "InstrumentRevision_instrument_targetVersion_itemId_key" ON "InstrumentRevision"("instrument", "targetVersion", "itemId");
CREATE INDEX "InstrumentRevision_instrument_sourceVersion_decisionStatus_idx" ON "InstrumentRevision"("instrument", "sourceVersion", "decisionStatus");

CREATE TABLE "ValidationGateDecision" (
  "id" TEXT NOT NULL,
  "instrument" TEXT NOT NULL,
  "candidateVersion" TEXT NOT NULL,
  "gate" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'not_met',
  "evidence" JSONB NOT NULL,
  "decidedBy" TEXT,
  "decidedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ValidationGateDecision_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ValidationGateDecision_instrument_candidateVersion_gate_key" ON "ValidationGateDecision"("instrument", "candidateVersion", "gate");

CREATE TABLE "PilotProtocolRecord" (
  "id" TEXT NOT NULL,
  "instrument" TEXT NOT NULL,
  "candidateVersion" TEXT NOT NULL,
  "protocolVersion" TEXT NOT NULL,
  "preregistrationUrl" TEXT,
  "preregisteredAt" TIMESTAMP(3),
  "analysisPlanHash" TEXT NOT NULL,
  "samplingPlan" JSONB NOT NULL,
  "missingDataPlan" JSONB NOT NULL,
  "fairnessPlan" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "approvedBy" TEXT,
  "approvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PilotProtocolRecord_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "PilotProtocolRecord_instrument_candidateVersion_protocolVersion_key" ON "PilotProtocolRecord"("instrument", "candidateVersion", "protocolVersion");

CREATE TABLE "InstrumentActivationDecision" (
  "id" TEXT NOT NULL,
  "instrument" TEXT NOT NULL,
  "candidateVersion" TEXT NOT NULL,
  "decision" TEXT NOT NULL DEFAULT 'blocked',
  "gateSnapshot" JSONB NOT NULL,
  "methodologyRecordUrl" TEXT,
  "decidedBy" TEXT,
  "decidedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InstrumentActivationDecision_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "InstrumentActivationDecision_instrument_candidateVersion_key" ON "InstrumentActivationDecision"("instrument", "candidateVersion");
