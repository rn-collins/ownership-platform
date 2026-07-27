-- MrBeast public-evidence review package 1.9.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb19_russell_doc30','https://law.justia.com/cases/federal/district-courts/kentucky/kywdce/1%3A2025cv00107/140442/30/','Russell Brands v Beast Holdings Document 30 memorandum opinion and order','U.S. District Court W.D. Kentucky via Justia','public_federal_court_order','2026-07-14T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb19_uspto_99361495','https://tsdr.uspto.gov/#caseNumber=99361495&caseSearchType=US_APPLICATION&caseType=DEFAULT&searchType=statusSearch','USPTO TSDR MRBEAST serial 99361495 status record','United States Patent and Trademark Office','official_uspto_status_record','2026-07-14T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb19_c46',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'litigation_procedural_status','On July 14 2026 the Western District of Kentucky denied the superseded first dismissal motion as moot and administratively remanded the renewed dismissal motion pending limited jurisdictional discovery and supplemental briefing.','legal_proceeding','public_court_order','unreviewed',NULL,'The renewed dismissal motion remains unresolved while limited jurisdictional discovery proceeds.','No inference that jurisdiction exists dismissal was denied on the merits infringement occurred or liability was imposed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb19_c47',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'jurisdictional_discovery_schedule','The July 14 order required limited jurisdictional discovery within sixty days and authorized supplemental response and reply briefing afterward.','legal_proceeding','public_court_order','unreviewed',NULL,'The order set limited jurisdictional discovery and supplemental briefing.','No merits-discovery predicted-outcome misconduct compliance or noncompliance inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb19_c48',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_registration_status','USPTO status records report that MRBEAST serial 99361495 attributed to Beast Holdings LLC for footballs registered on July 14 2026.','institutional_ip','official_administrative_record','unreviewed',NULL,'The identified application reached federal registration for footballs.','No inference that all uses are registered Donaldson personally owns the mark a product or business launched sales occurred validity was adjudicated or the mark is immune from challenge.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb19_c49',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'evidence_boundary','The July 14 trademark registration and court order are distinct procedural and administrative events and neither resolves the Russell Brands infringement claims.','evidence_quality','cross_record_boundary','unreviewed',NULL,'The registration and litigation posture must be tracked separately.','No inference that registration proves noninfringement defeats the plaintiff mark resolves confusion or controls jurisdiction.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb19_c46','obs_claim_mb19_c46','obs_src_mb19_russell_doc30','supports',NULL,'Document 30 court description and ordering paragraphs','Procedural posture only; allegations and merits remain unresolved.',CURRENT_TIMESTAMP),
('obs_ev_mb19_c47','obs_claim_mb19_c47','obs_src_mb19_russell_doc30','supports',NULL,'Document 30 limited jurisdictional discovery and supplemental briefing schedule','Jurisdictional discovery is not merits discovery.',CURRENT_TIMESTAMP),
('obs_ev_mb19_c48','obs_claim_mb19_c48','obs_src_mb19_uspto_99361495','supports',NULL,'TSDR status and owner fields for serial 99361495','Registration is bounded to the identified mark goods and owner-of-record.',CURRENT_TIMESTAMP),
('obs_ev_mb19_c49a','obs_claim_mb19_c49','obs_src_mb19_russell_doc30','supports',NULL,'Document 30 procedural disposition','Court order does not resolve infringement merits.',CURRENT_TIMESTAMP),
('obs_ev_mb19_c49b','obs_claim_mb19_c49','obs_src_mb19_uspto_99361495','supports',NULL,'TSDR registration status','Registration status does not decide the separate litigation.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb19_beast_holdings_reg_99361495',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Beast Holdings LLC','institutional_owner_of_record_for_registered_mrbeast_football_mark',NULL,NULL,'unreviewed','draft','obs_src_mb19_uspto_99361495',NULL,'Serial 99361495 registration status; no personal-ownership inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb19_russell_pending_litigation',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Russell Brands LLC','opposing_party_in_pending_trademark_litigation_with_jurisdictional_discovery',NULL,NULL,'unreviewed','draft','obs_src_mb19_russell_doc30',NULL,'Pending procedural relationship only; no merits or liability finding',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb19_2026_jul14_court',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'litigation_procedural_order','Russell Brands jurisdictional-discovery order','The court administratively remanded the renewed dismissal motion pending limited jurisdictional discovery and supplemental briefing and denied the superseded first motion as moot.','2026-07-14T00:00:00Z','day','unreviewed','draft','obs_src_mb19_russell_doc30',NULL,'Procedural order only; no jurisdictional or merits disposition',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb19_2026_jul14_registration',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'trademark_registration','MRBEAST football mark registration','USPTO records report registration of MRBEAST serial 99361495 attributed to Beast Holdings LLC for footballs.','2026-07-14T00:00:00Z','day','unreviewed','draft','obs_src_mb19_uspto_99361495',NULL,'Registration status only; no personal ownership commercial-success or litigation-outcome inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_190','mrbeast-1.9.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.9.0',
'research/observatory/dossiers/mrbeast-1.9.0.md','354ac284c711cc0d4812bf5b2e8937ae096eba6d',
'{"claimIds":["obs_claim_mb19_c46","obs_claim_mb19_c47","obs_claim_mb19_c48","obs_claim_mb19_c49"],"relationshipIds":["obs_rel_mb19_beast_holdings_reg_99361495","obs_rel_mb19_russell_pending_litigation"],"eventIds":["obs_event_mb19_2026_jul14_court","obs_event_mb19_2026_jul14_registration"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_180_pass_one","prior_versions_preserved","court_order_procedural_only","jurisdiction_unresolved","merits_unresolved","registration_not_personal_ownership","registration_not_product_or_business_launch","litigation_and_registration_separate","beneficial_ownership_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_190',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_190',
'{"packageId":"mrbeast-1.9.0","claimsLoaded":4,"relationshipsLoaded":2,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false,"proceduralTreatment":"registration_and_litigation_separate"}'::jsonb,
'Expanded package imported after a July 14 court order changed the Russell Brands procedural posture and USPTO records reported registration of MRBEAST serial 99361495. No overwrite merits ownership personal-economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
