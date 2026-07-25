-- CreateTable
CREATE TABLE "MethodologyVersion" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aggregation" TEXT NOT NULL DEFAULT 'additive',
    "weights" JSONB NOT NULL,
    "notes" TEXT,

    CONSTRAINT "MethodologyVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT,
    "region" TEXT,
    "archetype" TEXT,
    "primaryPlatform" TEXT,
    "followerBand" TEXT,
    "slug" TEXT,
    "ownedHeadline" TEXT,
    "ownedBio" TEXT,
    "customDomain" TEXT,
    "emailCapture" BOOLEAN NOT NULL DEFAULT false,
    "ownedPublished" BOOLEAN NOT NULL DEFAULT false,
    "ownedUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedLink" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'link',
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnedLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "broadcastAt" TIMESTAMP(3),
    "broadcastCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nomination" (
    "id" TEXT NOT NULL,
    "nomineeName" TEXT NOT NULL,
    "nomineeOrg" TEXT,
    "nomineeRole" TEXT,
    "why" TEXT NOT NULL,
    "nominatorEmail" TEXT,
    "source" TEXT NOT NULL DEFAULT 'web',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nomination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "handle" TEXT,
    "source" TEXT NOT NULL DEFAULT 'site',
    "interest" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "consentVersion" TEXT NOT NULL DEFAULT '2026-07',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "ResearchSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" TEXT,
    "kind" TEXT NOT NULL DEFAULT 'unspecified',
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "org" TEXT,
    "role" TEXT,
    "roleCreated" BOOLEAN NOT NULL DEFAULT false,
    "domain" TEXT,
    "indexScore" INTEGER,
    "band" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "venue" TEXT NOT NULL DEFAULT 'stage',
    "signal" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RosterEntry" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "label" TEXT,

    CONSTRAINT "RosterEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fact" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "predicate" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "evidenceTier" DOUBLE PRECISION NOT NULL DEFAULT 0.4,
    "source" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "methodologyRelevant" BOOLEAN NOT NULL DEFAULT true,
    "supersedesId" TEXT,
    "consentScope" TEXT,

    CONSTRAINT "Fact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instrument" TEXT NOT NULL DEFAULT 'ownership',
    "source" TEXT NOT NULL DEFAULT 'self',
    "responses" JSONB NOT NULL,
    "research" JSONB,
    "methodologyVersion" TEXT,
    "researchVersion" TEXT,
    "anonymous" BOOLEAN NOT NULL DEFAULT true,
    "total" INTEGER,
    "overallBand" TEXT,
    "confidence" DOUBLE PRECISION,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreEvent" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "creatorId" TEXT,
    "methodologyVersionId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "overallBand" TEXT NOT NULL,
    "dimensionScores" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MethodologyVersion_version_key" ON "MethodologyVersion"("version");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_authUserId_key" ON "Creator"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_slug_key" ON "Creator"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_customDomain_key" ON "Creator"("customDomain");

-- CreateIndex
CREATE INDEX "OwnedLink_creatorId_position_idx" ON "OwnedLink"("creatorId", "position");

-- CreateIndex
CREATE INDEX "Subscriber_creatorId_idx" ON "Subscriber"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_creatorId_email_key" ON "Subscriber"("creatorId", "email");

-- CreateIndex
CREATE INDEX "Post_creatorId_published_publishedAt_idx" ON "Post"("creatorId", "published", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Post_creatorId_slug_key" ON "Post"("creatorId", "slug");

-- CreateIndex
CREATE INDEX "Nomination_status_createdAt_idx" ON "Nomination"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchSubscriber_email_key" ON "ResearchSubscriber"("email");

-- CreateIndex
CREATE INDEX "ResearchSubscriber_source_createdAt_idx" ON "ResearchSubscriber"("source", "createdAt");

-- CreateIndex
CREATE INDEX "PartnerInquiry_status_createdAt_idx" ON "PartnerInquiry"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Guest_domain_idx" ON "Guest"("domain");

-- CreateIndex
CREATE INDEX "Episode_guestId_idx" ON "Episode"("guestId");

-- CreateIndex
CREATE UNIQUE INDEX "RosterEntry_orgId_creatorId_key" ON "RosterEntry"("orgId", "creatorId");

-- CreateIndex
CREATE INDEX "Fact_creatorId_predicate_idx" ON "Fact"("creatorId", "predicate");

-- CreateIndex
CREATE INDEX "Assessment_instrument_createdAt_idx" ON "Assessment"("instrument", "createdAt");

-- CreateIndex
CREATE INDEX "ScoreEvent_creatorId_computedAt_idx" ON "ScoreEvent"("creatorId", "computedAt");

-- AddForeignKey
ALTER TABLE "OwnedLink" ADD CONSTRAINT "OwnedLink_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RosterEntry" ADD CONSTRAINT "RosterEntry_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consent" ADD CONSTRAINT "Consent_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fact" ADD CONSTRAINT "Fact_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreEvent" ADD CONSTRAINT "ScoreEvent_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreEvent" ADD CONSTRAINT "ScoreEvent_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreEvent" ADD CONSTRAINT "ScoreEvent_methodologyVersionId_fkey" FOREIGN KEY ("methodologyVersionId") REFERENCES "MethodologyVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


