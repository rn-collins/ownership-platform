-- MrBeast public-evidence review package 1.6.0.
-- Draft expansion only. Does not publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb16_uspto_99400866','https://tmng-al.uspto.gov/resting2/api/casedoc/cms/case/99400866/office-action/OfficeAction8242365.pdf','Non-Final Action Serial 99400866 MRBEAST MODE','United States Patent and Trademark Office','official_trademark_office_action','2026-02-11T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb16_uspto_99401035','https://tmng-al.uspto.gov/resting2/api/casedoc/cms/case/99401035/office-action/OfficeAction8253122.pdf','Non-Final Action Serial 99401035 MRBEAST MODE','United States Patent and Trademark Office','official_trademark_office_action','2026-02-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb16_uspto_99440877','https://tmng-al.uspto.gov/resting2/api/casedoc/cms/case/99440877/office-action/OfficeAction8313422.pdf','Non-Final Action Serial 99440877 BEAST FINANCIAL','United States Patent and Trademark Office','official_trademark_office_action',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb16_ttab_98396373','https://ttabvue.uspto.gov/ttabvue/v?page=3&pnam=Monster','TTABVUE Opposition Index FEAST LIKE A BEAST Serial 98396373','USPTO Trademark Trial and Appeal Board','official_ttab_index','2025-10-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb16_c34',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_nonfinal_action','USPTO issued a February 11 2026 nonfinal office action for Beast Holdings LLC MRBEAST MODE application serial 99400866.','ip_boundary','official_procedural_record','unreviewed',NULL,'The application received a nonfinal office action.','No final-refusal abandonment invalidity infringement or registration-impossibility inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb16_c35',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_nonfinal_action','USPTO issued a February 17 2026 nonfinal office action for a separate Beast Holdings LLC MRBEAST MODE application serial 99401035.','ip_boundary','official_procedural_record','unreviewed',NULL,'A separate MRBEAST MODE application received a nonfinal office action.','No same-goods consolidation final-refusal or portfolio-wide-defect inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb16_c36',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_nonfinal_action','USPTO issued a nonfinal office action for Beast Holdings LLC BEAST FINANCIAL application serial 99440877.','ip_boundary','official_procedural_record','unreviewed',NULL,'The BEAST FINANCIAL application received a nonfinal office action.','No product-launch financial-operation regulatory-approval final-refusal or abandonment inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb16_c37',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'ttab_opposition','TTAB records show opposition activity involving Beast Holdings LLC FEAST LIKE A BEAST application serial 98396373 and Monster Energy Company.','adverse_evidence','official_procedural_record','unreviewed',NULL,'The application is involved in a TTAB opposition proceeding.','No final-judgment invalidity infringement confusion bad-faith liability or loss-of-rights inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb16_c34','obs_claim_mb16_c34','obs_src_mb16_uspto_99400866','supports',NULL,'Applicant mark serial and issue date','Nonfinal examination-stage action.',CURRENT_TIMESTAMP),
('obs_ev_mb16_c35','obs_claim_mb16_c35','obs_src_mb16_uspto_99401035','supports',NULL,'Applicant mark serial and issue date','Separate serial and nonfinal action.',CURRENT_TIMESTAMP),
('obs_ev_mb16_c36','obs_claim_mb16_c36','obs_src_mb16_uspto_99440877','supports',NULL,'Applicant mark serial and action type','Does not establish launch or final disposition.',CURRENT_TIMESTAMP),
('obs_ev_mb16_c37','obs_claim_mb16_c37','obs_src_mb16_ttab_98396373','supports',NULL,'Proceeding index parties mark and serial','Opposition status only; merits unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb16_beast_holdings_ip_proceedings',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Beast Holdings LLC','named_applicant_in_selected_uspto_proceedings',NULL,NULL,'unreviewed','draft','obs_src_mb16_uspto_99400866',NULL,'Selected official records only; no personal-ownership or portfolio-completeness inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb16_2026_feb11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_prosecution','USPTO nonfinal action for MRBEAST MODE serial 99400866','USPTO issued a nonfinal office action in the selected Beast Holdings application.','2026-02-11T00:00:00Z','day','unreviewed','draft','obs_src_mb16_uspto_99400866',NULL,'Procedural event not final disposition',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb16_2026_feb17',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_prosecution','USPTO nonfinal action for MRBEAST MODE serial 99401035','USPTO issued a nonfinal office action in a separate selected Beast Holdings application.','2026-02-17T00:00:00Z','day','unreviewed','draft','obs_src_mb16_uspto_99401035',NULL,'Procedural event not final disposition',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb16_2025_oct10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'ttab_proceeding','FEAST LIKE A BEAST opposition indexed','TTAB index records opposition activity involving Beast Holdings LLC and Monster Energy Company.','2025-10-10T00:00:00Z','day','unreviewed','draft','obs_src_mb16_ttab_98396373',NULL,'Proceeding activity not final merits ruling',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_160','mrbeast-1.6.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.6.0',
'research/observatory/dossiers/mrbeast-1.6.0.md','c99bd8ea2482e0f3547544b9a92b4103f24d6f31',
'{"claimIds":["obs_claim_mb16_c34","obs_claim_mb16_c35","obs_claim_mb16_c36","obs_claim_mb16_c37"],"relationshipIds":["obs_rel_mb16_beast_holdings_ip_proceedings"],"eventIds":["obs_event_mb16_2026_feb11","obs_event_mb16_2026_feb17","obs_event_mb16_2025_oct10"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_150_pass_one","selected_uspto_records_only","nonfinal_actions_not_final_refusals","ttab_opposition_not_merits_ruling","no_launch_or_operation_inference","portfolio_clustering_incomplete","beneficial_ownership_and_personal_economics_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.93,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_160',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_160',
'{"packageId":"mrbeast-1.6.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":3,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported after official USPTO records established selected nonfinal office actions and TTAB opposition activity. No final-refusal invalidity infringement liability ownership launch economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
