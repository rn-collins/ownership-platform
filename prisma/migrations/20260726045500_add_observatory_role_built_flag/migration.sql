-- Preserve the original roster's role-built marker as a provisional flag.
ALTER TABLE "ObservatoryCase" ADD COLUMN "roleBuiltFlag" BOOLEAN NOT NULL DEFAULT false;
UPDATE "ObservatoryCase" SET "roleBuiltFlag" = true
WHERE "id" IN ('obs_provisional_01', 'obs_provisional_02', 'obs_provisional_04', 'obs_provisional_05', 'obs_provisional_06', 'obs_provisional_08', 'obs_provisional_09', 'obs_provisional_10', 'obs_provisional_12', 'obs_provisional_26', 'obs_provisional_27', 'obs_provisional_28', 'obs_provisional_29', 'obs_provisional_30', 'obs_provisional_31', 'obs_provisional_32', 'obs_provisional_33', 'obs_provisional_34', 'obs_provisional_35');
