-- MrBeast public-evidence review package 1.8.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb18_bitmine_10q_may31','https://www.sec.gov/Archives/edgar/data/1829311/000162828026048157/bmnr-20260531.htm','BitMine Form 10-Q Note 6 Investments for period ended May 31 2026','BitMine Immersion Technologies / SEC','official_sec_financial_statement','2026-07-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb18_c42',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'side_letter_status','BitMine later filed Form 10-Q states that Beast Industries had not exercised the side-letter notification right and BitMine had not purchased additional preferred equity as of May 31 2026.','capital_structure','official_financial_statement','unreviewed',NULL,'The later filed 10-Q establishes non-exercise through May 31 2026.','No inference that the right expired was never later exercised was terminated amended replaced or waived.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb18_c43',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_carrying_amount','BitMine reported a $186.024 million carrying amount for its Beast Industries investment at May 31 2026.','capital_structure','official_financial_statement','unreviewed',NULL,'BitMine reported a $186.024 million carrying amount at May 31 2026.','No current-fair-value Beast-valuation realized-proceeds or Donaldson-wealth inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb18_c44',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_impairment_status','BitMine reported no impairment for the nine months ended May 31 2026.','capital_structure','official_financial_statement','unreviewed',NULL,'BitMine reported no impairment for the nine-month period ended May 31 2026.','No later-period impairment fair-value validation or business-performance inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb18_c45',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'chronology_extension','A later BitMine Form 10-Q independently extends the supported side-letter non-exercise endpoint from February 28 to May 31 2026; it does not make the earlier citation sufficient.','evidence_quality','official_record_extension','unreviewed',NULL,'New later evidence extends the supported endpoint from February 28 to May 31 2026.','No overwrite of immutable prior versions and no inference beyond May 31.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb18_c42','obs_claim_mb18_c42','obs_src_mb18_bitmine_10q_may31','supports',NULL,'Note 6 side-letter status as of May 31 2026','Later filing independently supplies the May 31 endpoint.',CURRENT_TIMESTAMP),
('obs_ev_mb18_c43','obs_claim_mb18_c43','obs_src_mb18_bitmine_10q_may31','supports',NULL,'Note 6 carrying amount as of May 31 2026','Cost-basis carrying amount is not current fair value.',CURRENT_TIMESTAMP),
('obs_ev_mb18_c44','obs_claim_mb18_c44','obs_src_mb18_bitmine_10q_may31','supports',NULL,'Note 6 impairment statement for nine months ended May 31 2026','Period-bounded investor accounting statement.',CURRENT_TIMESTAMP),
('obs_ev_mb18_c45','obs_claim_mb18_c45','obs_src_mb18_bitmine_10q_may31','supports',NULL,'Comparison with immutable dossier 1.7.0 chronology correction','New support does not retroactively change the sufficiency of the earlier source.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb18_bitmine_may31_accounting',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','BitMine Immersion Technologies','outside_minority_investor_with_may31_accounting_and_side_letter_status','2026-01-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb18_bitmine_10q_may31',NULL,'May 31 carrying amount and side-letter status; no personal-economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb18_2026_may31',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_accounting_and_side_letter_status','BitMine May 31 Beast Industries accounting and side-letter status','BitMine reported a $186.024 million carrying amount no nine-month impairment and no additional side-letter purchase through May 31.','2026-05-31T00:00:00Z','day','unreviewed','draft','obs_src_mb18_bitmine_10q_may31',NULL,'Date-specific accounting and contractual-status disclosure not current fair value or personal economics',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_180','mrbeast-1.8.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.8.0',
'research/observatory/dossiers/mrbeast-1.8.0.md','42b0be106d4c519b134d81009ee5042d5d8dc997',
'{"claimIds":["obs_claim_mb18_c42","obs_claim_mb18_c43","obs_claim_mb18_c44","obs_claim_mb18_c45"],"relationshipIds":["obs_rel_mb18_bitmine_may31_accounting"],"eventIds":["obs_event_mb18_2026_may31"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_170_pass_two","prior_versions_preserved","later_source_extends_endpoint","carrying_amount_not_current_fair_value","no_impairment_period_bounded","side_letter_status_only_through_2026_05_31","beneficial_ownership_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_180',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_180',
'{"packageId":"mrbeast-1.8.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false,"chronologyTreatment":"later_source_extension"}'::jsonb,
'Expanded package imported after a later BitMine Form 10-Q extended side-letter non-exercise carrying amount and no-impairment evidence through May 31 2026. No overwrite current-value ownership personal-economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
