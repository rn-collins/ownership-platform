-- MrBeast public-evidence review package 1.3.0.
-- Draft expansion only. Does not publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb13_eightco_q1','https://www.sec.gov/Archives/edgar/data/1892492/000149315226023890/R19.htm','Eightco Holdings Q1 2026 Note 6 Other Investments','U.S. Securities and Exchange Commission','filed_financial_statement',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb13_mavromatis','https://dockets.justia.com/docket/north-carolina/ncedce/4%3A2026cv00059/227231','Mavromatis v MrBeastYouTube LLC et al docket','U.S. District Court for the Eastern District of North Carolina via Justia','court_docket','2026-04-22T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb13_c22',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'outside_investment','During Q1 2026 Eightco acquired a non-controlling minority equity interest in Beast Industries for total cash consideration of 17999952 dollars.','economic_boundary','primary_record','unreviewed',NULL,'Eightco reported a non-controlling minority Beast Industries equity investment funded at approximately 18 million dollars.','No share-class percentage control current-value dilution or Donaldson-personal-economics inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb13_c23',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_commitment','Eightco committed up to 25 million dollars approximately 18 million was funded by March 31 2026 and the additional 7 million dollar call period expired May 9 2026.','economic_boundary','primary_record','unreviewed',NULL,'Describe the funded amount maximum commitment and expired call period exactly.','No inference that 25 million closed that Beast Industries received all cash or that Donaldson received proceeds.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb13_c24',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'corporate_parent','An April 24 2026 federal financial disclosure identifies Beast Industries Co. as corporate parent of GameChanger 24/7 LLC and a separate disclosure identifies it as parent of MrBeastYouTube LLC.','entity_boundary','procedural_record','unreviewed',NULL,'Federal disclosures identify Beast Industries Co. as corporate parent of the two named defendants.','No complete-graph beneficial-ownership operational-control disregarded-entity or personal-ownership inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb13_c25',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'litigation_posture','The Mavromatis docket names GameChanger 24/7 LLC and MrBeastYouTube LLC as defendants and records pleadings rather than a final merits determination.','adverse_context','procedural_record','unreviewed',NULL,'Describe the parties and procedural posture with attribution.','No liability damages causation misconduct or final-judgment inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb13_c22','obs_claim_mb13_c22','obs_src_mb13_eightco_q1','supports',NULL,'Note 6 Other Investments','Investor-specific cost and minority status only.',CURRENT_TIMESTAMP),
('obs_ev_mb13_c23','obs_claim_mb13_c23','obs_src_mb13_eightco_q1','supports',NULL,'Note 6 Other Investments','Maximum commitment funded amount and expired call period.',CURRENT_TIMESTAMP),
('obs_ev_mb13_c24','obs_claim_mb13_c24','obs_src_mb13_mavromatis','supports',NULL,'Docket entries 4 and 5 filed April 24 2026','Independent parent disclosures and exact docket entity spelling.',CURRENT_TIMESTAMP),
('obs_ev_mb13_c25','obs_claim_mb13_c25','obs_src_mb13_mavromatis','supports',NULL,'Docket entries 1 through 7','Procedural record only; no merits inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb13_eightco',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Eightco Holdings Inc.','outside_noncontrolling_minority_investor',NULL,NULL,'unreviewed','draft','obs_src_mb13_eightco_q1',NULL,'Investor-specific filed statement; security rights unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb13_gamechanger_exact',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','GameChanger 24/7, LLC','beast_industries_disclosed_corporate_parent',NULL,NULL,'unreviewed','draft','obs_src_mb13_mavromatis',NULL,'Exact docket spelling; relationship disclosed April 24 2026',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb13_2026_eightco',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'outside_investment','Eightco reports funded minority Beast Industries investment','Eightco reported 17999952 dollars cash consideration against a commitment of up to 25 million dollars.','2026-03-31T00:00:00Z','day','unreviewed','draft','obs_src_mb13_eightco_q1',NULL,'Quarter-end investor-specific accounting',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb13_2026_disclosure',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'corporate_disclosure','GameChanger 24/7 and MrBeastYouTube disclose Beast Industries parent','Separate federal financial disclosures name Beast Industries Co. as corporate parent.','2026-04-24T00:00:00Z','day','unreviewed','draft','obs_src_mb13_mavromatis',NULL,'Docket entries 4 and 5',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_130','mrbeast-1.3.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.3.0',
'research/observatory/dossiers/mrbeast-1.3.0.md','1918d751ce47a31e275283224d5b2f40fa83f720',
'{"claimIds":["obs_claim_mb13_c22","obs_claim_mb13_c23","obs_claim_mb13_c24","obs_claim_mb13_c25"],"relationshipIds":["obs_rel_mb13_eightco","obs_rel_mb13_gamechanger_exact"],"eventIds":["obs_event_mb13_2026_eightco","obs_event_mb13_2026_disclosure"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_120_pass_one","eightco_security_class_and_rights_unavailable","gamechanger_name_history_unresolved","complete_entity_graph_unavailable","beneficial_ownership_and_control_unavailable","original_deposition_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.88,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_130',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_130',
'{"packageId":"mrbeast-1.3.0","claimsLoaded":4,"relationshipsLoaded":2,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported after material Eightco investment evidence and an independently corroborated exact GameChanger entity name. Personal ownership complete entity graph investment rights economics causality psychology scoring publication and saturation remain unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
