-- MrBeast public-evidence review package 1.4.0.
-- Draft expansion only. Does not publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb14_justia_portfolio','https://trademarks.justia.com/owners/beast-holdings-llc-4401179/','Beast Holdings LLC Trademarks','Justia','trademark_portfolio_index',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb14_usptoreport_portfolio','https://uspto.report/company/Beast-Holdings-L-L-C','Beast Holdings LLC USPTO Trademark and Patent Filings','USPTO.report','trademark_portfolio_index',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb14_c26',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_portfolio','Public trademark listings attribute a broad portfolio of MrBeast and Beast related applications and registrations to Beast Holdings LLC.','ip_boundary','public_record_index','unreviewed',NULL,'Public trademark listings identify Beast Holdings LLC as the named owner or applicant across a broad brand portfolio.','No complete-portfolio beneficial-ownership personal-ownership control value or licensing inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb14_c27',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_categories','The listed Beast Holdings portfolio spans entertainment apparel food philanthropy games consulting telecommunications athletics social platform membership and related categories.','ip_boundary','public_record_index','unreviewed',NULL,'Describe only the categories and marks actually listed in the public portfolio records.','No inference that every category is an operating business launched product revenue line or owned subsidiary.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb14_c28',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_applications','Public listings show 2026 Beast Holdings applications including MRBEAST ATHLETICS BEAST ATHLETICS WATCHTIME STUDIOS BEAST MEMBERSHIP BEAST PLATFORM CREATOR INDUSTRIES BEAST SOCIAL and MRBEAST SOCIAL.','ip_boundary','public_record_index','unreviewed',NULL,'Beast Holdings filed applications for marks associated with these concepts in 2026.','No registration approval active-use launch-certainty roadmap or commercial-success inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb14_c29',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'ip_status_boundary','Trademark applications registrations operating companies products and other intellectual-property rights remain legally and evidentially distinct.','ip_boundary','methodological_boundary','unreviewed',NULL,'Preserve record-specific status and entity attribution for each mark.','No collapse of marks entities products contracts and Donaldson personal rights into one owned system.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb14_c26a','obs_claim_mb14_c26','obs_src_mb14_justia_portfolio','supports',NULL,'Owner portfolio pages','Discovery index; individual official status review remains required.',CURRENT_TIMESTAMP),
('obs_ev_mb14_c26b','obs_claim_mb14_c26','obs_src_mb14_usptoreport_portfolio','supports',NULL,'Company portfolio index','Time-sensitive aggregate count is not treated as canonical.',CURRENT_TIMESTAMP),
('obs_ev_mb14_c27','obs_claim_mb14_c27','obs_src_mb14_justia_portfolio','supports',NULL,'Goods and services descriptions across listed marks','Categories do not establish operating businesses.',CURRENT_TIMESTAMP),
('obs_ev_mb14_c28','obs_claim_mb14_c28','obs_src_mb14_usptoreport_portfolio','supports',NULL,'2026 serial-number and application-date listings','Applications only; registration and use not established.',CURRENT_TIMESTAMP),
('obs_ev_mb14_c29','obs_claim_mb14_c29','obs_src_mb14_usptoreport_portfolio','context',NULL,'Mixed application and registration portfolio','Methodological boundary for status and rights.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb14_beast_holdings_portfolio',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Beast Holdings LLC','named_owner_or_applicant_across_trademark_portfolio',NULL,NULL,'unreviewed','draft','obs_src_mb14_justia_portfolio',NULL,'Entity-specific public trademark portfolio; beneficial ownership and licenses unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb14_2026_social_marks',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_application','Beast Holdings files BEAST SOCIAL and MRBEAST SOCIAL applications','Public portfolio listings record applications for BEAST SOCIAL and MRBEAST SOCIAL.','2026-03-05T00:00:00Z','day','unreviewed','draft','obs_src_mb14_usptoreport_portfolio',NULL,'Serial numbers 99685531 and 99685457; application status only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_140','mrbeast-1.4.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.4.0',
'research/observatory/dossiers/mrbeast-1.4.0.md','358030932108720371f3760bb3f29e07df69ffc3',
'{"claimIds":["obs_claim_mb14_c26","obs_claim_mb14_c27","obs_claim_mb14_c28","obs_claim_mb14_c29"],"relationshipIds":["obs_rel_mb14_beast_holdings_portfolio"],"eventIds":["obs_event_mb14_2026_social_marks"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_130_pass_one","portfolio_indexes_require_official_record_clustering","application_not_registration","mark_not_operating_business","complete_assignments_licenses_and_liens_unavailable","beneficial_ownership_and_control_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.91,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_140',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_140',
'{"packageId":"mrbeast-1.4.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported after material portfolio-wide trademark evidence. Applications registrations entities operations ownership economics causality psychology scoring publication and saturation remain separately unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
