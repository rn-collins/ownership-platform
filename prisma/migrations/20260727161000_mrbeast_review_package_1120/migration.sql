-- MrBeast public-evidence review package 1.12.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb112_ttab_91306970','https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP','TTAB Opposition No. 91306970','United States Patent and Trademark Office, Trademark Trial and Appeal Board','official_trademark_proceeding','2026-04-29T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb112_c58',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_opposition','Beast Holdings LLC instituted TTAB Opposition No. 91306970 on April 29 2026 against MoneyRiot Brand LLC MRB application serial 99244549.','institutional_ip','official_procedural_record','unreviewed',NULL,'Beast Holdings instituted an opposition to the MRB application.','No inference that Beast Holdings won or that MRB was refused cancelled confusing or infringing.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb112_c59',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'proceeding_parties','The opposition identifies Beast Holdings LLC as plaintiff MoneyRiot Brand LLC as defendant and MRBEAST registration 5930575 as the pleaded registration.','entity_relationship','official_procedural_record','unreviewed',NULL,'Identify the institutional parties and pleaded registration exactly as recorded.','No inference that Donaldson personally brought the proceeding or personally owns the registration or litigation rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb112_c60',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'procedural_status','TTABVUE records a notice of default and suspended status dated July 9 2026 in Opposition No. 91306970.','legal_procedure','official_procedural_record','unreviewed',NULL,'The proceeding was listed as suspended following a notice of default.','No inference of final default judgment merits victory cancellation abandonment settlement liability or damages.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb112_c61',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'registration_status','TTABVUE records pleaded MRBEAST registration 5930575 as Section 8 and 15 accepted and acknowledged.','institutional_ip','official_register_status','unreviewed',NULL,'The pleaded registration was recorded with Section 8 and 15 accepted and acknowledged.','No inference of universal validity ownership of every related right product operation commercial success or personal ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb112_c58','obs_claim_mb112_c58',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),'supports',NULL,'Proceeding header parties and application','Institution and party identity only; no merits inference.',CURRENT_TIMESTAMP),
('obs_ev_mb112_c59','obs_claim_mb112_c59',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),'supports',NULL,'Plaintiff and pleaded registrations','Institutional party and registration record only.',CURRENT_TIMESTAMP),
('obs_ev_mb112_c60','obs_claim_mb112_c60',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),'supports',NULL,'Status and prosecution history dated July 9 2026','Procedural posture only; no final disposition.',CURRENT_TIMESTAMP),
('obs_ev_mb112_c61','obs_claim_mb112_c61',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),'supports',NULL,'Pleaded registration status','Register maintenance status only.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb112_beast_moneyriot_opposition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','MoneyRiot Brand LLC','beast_holdings_opposed_mrb_application_99244549',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),NULL,'TTAB Opposition No. 91306970; procedural relationship only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb112_2026_apr29_ttab',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_proceeding','Beast Holdings institutes MRB opposition','Beast Holdings LLC instituted TTAB Opposition No. 91306970 against MoneyRiot Brand LLC MRB application serial 99244549.','2026-04-29T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),NULL,'Institution only; no merits outcome inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb112_2026_jul09_ttab',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_procedure','TTAB opposition suspended after notice of default','TTABVUE records a notice of default and suspended status in Opposition No. 91306970.','2026-07-09T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://ttabvue.uspto.gov/ttabvue/v?pno=91306970&pty=OPP' LIMIT 1),NULL,'Procedural status only; no final default judgment or merits inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1120','mrbeast-1.12.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.12.0',
'research/observatory/dossiers/mrbeast-1.12.0.md','8cf1958826f780dd672db1f3d297c7e664154ea8',
'{"claimIds":["obs_claim_mb112_c58","obs_claim_mb112_c59","obs_claim_mb112_c60","obs_claim_mb112_c61"],"relationshipIds":["obs_rel_mb112_beast_moneyriot_opposition"],"eventIds":["obs_event_mb112_2026_apr29_ttab","obs_event_mb112_2026_jul09_ttab"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_1110_pass_one","prior_versions_preserved","opposition_not_merits_ruling","notice_of_default_not_final_judgment","suspension_not_disposition","registration_status_not_personal_ownership","beneficial_ownership_voting_control_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1120',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1120',
'{"packageId":"mrbeast-1.12.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false,"proceduralTreatment":"ttab_opposition_bounded"}'::jsonb,
'Expanded package imported after official TTAB evidence established an affirmative Beast Holdings opposition and its current procedural posture. No overwrite merits personal ownership control economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
