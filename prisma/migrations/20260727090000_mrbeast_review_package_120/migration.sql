-- MrBeast public-evidence review package 1.2.0.
-- Draft expansion only. Does not publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb12_uspto_app','https://tmng-al.uspto.gov/resting2/api/casedoc/ts/cd/88307131/RFA20190222133035/1/webcontent','MRBEAST trademark application serial 88307131','U.S. Patent and Trademark Office','administrative_record','2019-02-19T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb12_assignment','https://uspto.report/TM/assignment-tm-7224-0948.pdf','MRBEAST assignment reel frame 7224 0948','USPTO assignment record via public mirror','trademark_assignment','2021-02-23T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb12_justia','https://trademarks.justia.com/883/07/mrbeast-88307131.html','MRBEAST registration and owner history','Justia Trademarks','trademark_record_interface',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb12_russell','https://www.pacermonitor.com/public/case/59487240/Russell_Brands%2C_LLC_v_Beast_Holdings%2C_LLC_et_al','Russell Brands LLC v Beast Holdings LLC et al docket','U.S. District Court for the Western District of Kentucky via PACERMonitor','court_docket','2025-08-12T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb12_c18',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_origin','MrBeastYouTube LLC filed the federal MRBEAST application in 2019 and was the original registrant.','ip_boundary','primary_record','unreviewed',NULL,'MrBeastYouTube LLC was the original applicant and registrant for the federal MRBEAST mark.','No Donaldson-personal or all-persona-rights inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb12_c19',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_assignment','A recorded assignment dated February 23 2021 transferred the MRBEAST registration to Beast Holdings LLC which current records identify as owner.','ip_boundary','recorded_assignment','unreviewed',NULL,'The federal MRBEAST registration was assigned to Beast Holdings LLC in 2021.','No assignment-consideration all-assets licensing or personal-ownership inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb12_c20',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'corporate_parent','A May 4 2026 Rule 7.1 disclosure identifies Beast Industries Co. as corporate parent of Beast Holdings LLC GameChanger247 LLC and MrBeastYouTube LLC.','entity_boundary','primary_record','unreviewed',NULL,'A federal disclosure identifies Beast Industries Co. as corporate parent of the three named LLCs.','No complete graph beneficial-ownership operational-control or every-asset inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb12_c21',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'litigation_posture','Russell Brands named Beast Holdings LLC GameChanger247 LLC and MrBeastYouTube LLC as defendants in a pending trademark case.','adverse_context','procedural_record','unreviewed',NULL,'Describe the parties and procedural posture with attribution.','No infringement liability validity damages bad-faith or final-ownership inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb12_c18','obs_claim_mb12_c18','obs_src_mb12_uspto_app','supports',NULL,'Applicant information and serial 88307131','Original applicant and registration origin.',CURRENT_TIMESTAMP),
('obs_ev_mb12_c19','obs_claim_mb12_c19','obs_src_mb12_assignment','supports',NULL,'Reel frame 7224 0948','Recorded assignment; economics unavailable.',CURRENT_TIMESTAMP),
('obs_ev_mb12_c19b','obs_claim_mb12_c19','obs_src_mb12_justia','supports',NULL,'Current owner and owner history','Secondary interface for current status.',CURRENT_TIMESTAMP),
('obs_ev_mb12_c20','obs_claim_mb12_c20','obs_src_mb12_russell','supports',NULL,'Docket entry 29 Rule 7.1 disclosure','Three subsidiaries disclosed; graph incomplete.',CURRENT_TIMESTAMP),
('obs_ev_mb12_c21','obs_claim_mb12_c21','obs_src_mb12_russell','supports',NULL,'Docket parties and procedural history','No merits inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb12_beast_holdings',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Beast Holdings LLC','entity_holds_registered_mrbeast_mark','2021-02-23T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb12_assignment',NULL,'Registration-specific assignment only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb12_gamechanger',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','GameChanger247 LLC','beast_industries_disclosed_corporate_parent',NULL,NULL,'unreviewed','draft','obs_src_mb12_russell',NULL,'Rule 7.1 disclosure; complete graph unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb12_parent_holdings',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Beast Holdings LLC','beast_industries_disclosed_corporate_parent',NULL,NULL,'unreviewed','draft','obs_src_mb12_russell',NULL,'Rule 7.1 disclosure; beneficial ownership unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb12_2021_assignment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'ip_assignment','MRBEAST registration assigned to Beast Holdings LLC','Recorded assignment of registration 5930575 from MrBeastYouTube LLC to Beast Holdings LLC.','2021-02-23T00:00:00Z','day','unreviewed','draft','obs_src_mb12_assignment',NULL,'Reel frame 7224 0948',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb12_2026_disclosure',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'corporate_disclosure','Three Beast LLCs disclose Beast Industries Co. as corporate parent','Rule 7.1 filing names Beast Holdings LLC GameChanger247 LLC and MrBeastYouTube LLC.','2026-05-04T00:00:00Z','day','unreviewed','draft','obs_src_mb12_russell',NULL,'Docket entry 29',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_120','mrbeast-1.2.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.2.0',
'research/observatory/dossiers/mrbeast-1.2.0.md','9ae78207c204b61845b96c14f11f1e36ff1a74aa',
'{"claimIds":["obs_claim_mb12_c18","obs_claim_mb12_c19","obs_claim_mb12_c20","obs_claim_mb12_c21"],"relationshipIds":["obs_rel_mb12_beast_holdings","obs_rel_mb12_gamechanger","obs_rel_mb12_parent_holdings"],"eventIds":["obs_event_mb12_2021_assignment","obs_event_mb12_2026_disclosure"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_in_pass_two","trademark_portfolio_incomplete","assignment_consideration_unavailable","intercompany_licenses_unavailable","complete_entity_graph_unavailable","beneficial_ownership_and_control_unavailable","original_deposition_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.86,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_120',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_120',
'{"packageId":"mrbeast-1.2.0","claimsLoaded":4,"relationshipsLoaded":3,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported after material trademark-chain and corporate-parent evidence. Personal ownership complete entity graph intercompany rights economics causality psychology scoring publication and saturation remain unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
