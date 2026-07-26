ALTER TABLE "ObservatoryRelationship"
  ADD COLUMN "sourceId" TEXT,
  ADD COLUMN "exactPassage" TEXT,
  ADD COLUMN "sourceLocator" TEXT;

ALTER TABLE "ObservatoryEvent"
  ADD COLUMN "sourceId" TEXT,
  ADD COLUMN "exactPassage" TEXT,
  ADD COLUMN "sourceLocator" TEXT;

CREATE INDEX "ObservatoryRelationship_sourceId_idx"
  ON "ObservatoryRelationship"("sourceId");

CREATE INDEX "ObservatoryEvent_sourceId_idx"
  ON "ObservatoryEvent"("sourceId");

ALTER TABLE "ObservatoryRelationship"
  ADD CONSTRAINT "ObservatoryRelationship_sourceId_fkey"
  FOREIGN KEY ("sourceId") REFERENCES "ObservatorySource"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ObservatoryEvent"
  ADD CONSTRAINT "ObservatoryEvent_sourceId_fkey"
  FOREIGN KEY ("sourceId") REFERENCES "ObservatorySource"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
