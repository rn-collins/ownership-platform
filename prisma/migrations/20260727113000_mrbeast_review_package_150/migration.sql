-- MrBeast public-evidence review package 1.5.0.
-- Draft expansion only. Does not publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb15_eightco_july9','https://www.sec.gov/Archives/edgar/data/1892492/000149315226032609/ex99-1.htm','Eightco Total Holdings Update July 9 2026','Eightco Holdings Inc. / SEC','sec_filed_exhibit','2026-07-09T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb15_eightco_may6','https://www.sec.gov/Archives/edgar/data/1892492/000149315226021420/ex99-1.htm','Eightco Total Holdings Update May 6 2026','Eightco Holdings Inc. / SEC','sec_filed_exhibit','2026-05-06T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb15_eightco_apr28','https://www.sec.gov/Archives/edgar/data/1892492/000149315226019259/ex99-1.htm','Eightco Total Holdings Update April 28 2026','Eightco Holdings Inc. / SEC','sec_filed_exhibit','2026-04-28T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb15_c30',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'post_expiration_investment','Eightco reported an 18 million dollar funded Beast Industries investment as of July 8 2026 after the disclosed additional call period expired.','economic_boundary','primary_filed_record','unreviewed',NULL,'Eightco continued to report an 18 million dollar funded Beast Industries position after the disclosed call period expired.','No present-value security-rights percentage disposition impairment dilution or personal-proceeds inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb15_c31',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'unfunded_commitment_boundary','The reviewed post-expiration SEC update did not report the additional 7 million dollars as funded under the previously disclosed commitment.','economic_boundary','primary_filed_record','unreviewed',NULL,'The reviewed filings do not show the additional 7 million dollars as funded under that disclosed commitment.','No proof that no later amended replacement or separate transaction occurred.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb15_c32',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'disclosure_wording_conflict','Some March through May SEC-filed press-release summaries described a 25 million dollar Beast Industries investment while also distinguishing 18 million funded from a 7 million future commitment.','contradiction_search','attributed_primary_statement','unreviewed',NULL,'Eightco filed communications used inconsistent shorthand for funded investment and maximum commitment.','No fraud liability intentional-deception accounting-error or closed-25-million-dollar inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb15_c33',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'economic_measure_boundary','Funded cost maximum commitment carrying value current fair value ownership percentage and personal proceeds are distinct measures.','economic_boundary','methodological_boundary','unreviewed',NULL,'Preserve the exact economic measure and date stated in each source.','No collapse of company investment data into Donaldson wealth or proceeds.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb15_c30','obs_claim_mb15_c30','obs_src_mb15_eightco_july9','supports',NULL,'Holdings as of July 8 2026','Later post-expiration funded-position disclosure.',CURRENT_TIMESTAMP),
('obs_ev_mb15_c31a','obs_claim_mb15_c31','obs_src_mb13_eightco_q1','supports',NULL,'Note 10 Other Investments','Records May 9 call-period expiration.',CURRENT_TIMESTAMP),
('obs_ev_mb15_c31b','obs_claim_mb15_c31','obs_src_mb15_eightco_july9','supports',NULL,'Beast Industries holdings line','Reports 18 million funded after expiration.',CURRENT_TIMESTAMP),
('obs_ev_mb15_c32a','obs_claim_mb15_c32','obs_src_mb15_eightco_may6','contradicts',NULL,'Headline summary and funded-versus-commitment detail','Retain wording conflict without misconduct inference.',CURRENT_TIMESTAMP),
('obs_ev_mb15_c32b','obs_claim_mb15_c32','obs_src_mb15_eightco_apr28','context',NULL,'Holdings summary and Creator Economy section','Aggregates commitment while separately identifying funded amount.',CURRENT_TIMESTAMP),
('obs_ev_mb15_c33','obs_claim_mb15_c33','obs_src_mb13_eightco_q1','context',NULL,'Accounting treatment and carrying value','Methodological boundary for distinct measures.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb15_eightco_post_expiration',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Eightco Holdings Inc.','outside_noncontrolling_investor_post_commitment_expiration','2026-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb15_eightco_july9',NULL,'18 million funded position reported as of July 8; percentage and rights unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb15_2026_july8_holdings',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_update','Eightco reports post-expiration funded Beast Industries position','Eightco reported an 18 million dollar funded Beast Industries investment in its holdings as of July 8 2026.','2026-07-08T00:00:00Z','day','unreviewed','draft','obs_src_mb15_eightco_july9',NULL,'Post-expiration holdings update; current fair value and rights unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_150','mrbeast-1.5.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.5.0',
'research/observatory/dossiers/mrbeast-1.5.0.md','078cf2a902bafe1d4f4026cadb5a9beffc288e28',
'{"claimIds":["obs_claim_mb15_c30","obs_claim_mb15_c31","obs_claim_mb15_c32","obs_claim_mb15_c33"],"relationshipIds":["obs_rel_mb15_eightco_post_expiration"],"eventIds":["obs_event_mb15_2026_july8_holdings"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_140_pass_one","post_expiration_18m_funded_position","press_release_wording_conflict","no_fraud_or_liability_inference","security_class_percentage_and_rights_unavailable","current_value_and_disposition_unavailable","beneficial_ownership_and_personal_economics_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.92,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_150',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_150',
'{"packageId":"mrbeast-1.5.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported after later SEC evidence confirmed an 18 million dollar funded position after commitment expiration and exposed inconsistent funded-versus-committed shorthand. Economics ownership liability causality psychology scoring publication and saturation remain unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
