-- MrBeast public-evidence review package 1.15.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb115_aexa_424b4','https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm','American Exceptionalism Acquisition Corp. A Form 424B4 Prospectus','United States Securities and Exchange Commission','sec_offering_prospectus','2025-09-12T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb115_c70',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'institutional_investor_relationship','American Exceptionalism Acquisition Corp. A reported Social Capital as an investor in Beast Industries Co.','institutional_investment','sec_filed_third_party_disclosure','unreviewed',NULL,'A 2025 SEC-filed prospectus identifies Social Capital as a Beast Industries investor.','No inference of investment amount security class acquisition date current holding control or Donaldson personal economics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb115_c71',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'director_relationship','American Exceptionalism Acquisition Corp. A listed Chamath Palihapitiya as a director of Beast Industries Co.','corporate_governance','sec_filed_third_party_disclosure','unreviewed',NULL,'The prospectus lists Chamath Palihapitiya as a Beast Industries director.','No inference of appointment date current status after the filing board rights voting power compensation or personal ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb115_c72',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'filed_entity_business_characterization','The prospectus used the entity label Beast Industries Co. and classified its business as Media Company in its fiduciary-duty table.','entity_identity','sec_filed_third_party_disclosure','unreviewed',NULL,'Attribute the Beast Industries Co. label and Media Company classification to the prospectus.','No inference of definitive legal form jurisdiction domicile audited segment classification or exclusion of other activities.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb115_c73',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'qualitative_investment_characterization','The prospectus included Beast Industries among Social Capital investments it characterized as having strong private-market value creation.','institutional_investment','sec_filed_issuer_characterization','unreviewed',NULL,'Attribute the qualitative private-market value-creation characterization to the filer.','No inference of quantified return realized gain current valuation audited performance causality or Donaldson wealth.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb115_c70','obs_claim_mb115_c70',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),'supports',NULL,'Prospectus pages 3 and 116: Social Capital investment list','Third-party filed investor identification only.',CURRENT_TIMESTAMP),
('obs_ev_mb115_c71','obs_claim_mb115_c71',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),'supports',NULL,'Prospectus page 164: fiduciary-duty table','Filed director listing; appointment date and later status unavailable.',CURRENT_TIMESTAMP),
('obs_ev_mb115_c72','obs_claim_mb115_c72',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),'supports',NULL,'Prospectus page 164: entity and business labels','Filer-used labels only; legal form domicile and audited segments unresolved.',CURRENT_TIMESTAMP),
('obs_ev_mb115_c73','obs_claim_mb115_c73',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),'supports',NULL,'Prospectus pages 3 and 116: private-market value-creation discussion','Qualitative issuer characterization only; no quantified or audited return.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb115_social_capital_investor',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Social Capital','reported_investor',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),NULL,'Prospectus identifies Social Capital investment; amount class timing and current holding unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb115_chamath_director',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'person','Chamath Palihapitiya','reported_director',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),NULL,'Prospectus director listing; appointment date rights compensation and later status unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb115_2025_sep12_aexa_prospectus',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'institutional_relationship_disclosure','Prospectus discloses Social Capital and Palihapitiya relationships','American Exceptionalism Acquisition Corp. A filed a prospectus identifying Social Capital as a Beast Industries investor and listing Chamath Palihapitiya as a Beast Industries director.','2025-09-12T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/2079173/000119312525221814/d38750d424b4.htm' LIMIT 1),NULL,'Filing-date disclosure event only; underlying relationship start dates and later status unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1150','mrbeast-1.15.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.15.0',
'research/observatory/dossiers/mrbeast-1.15.0.md','bc0b94680179da690922af316c1db22b625f9627',
'{"claimIds":["obs_claim_mb115_c70","obs_claim_mb115_c71","obs_claim_mb115_c72","obs_claim_mb115_c73"],"relationshipIds":["obs_rel_mb115_social_capital_investor","obs_rel_mb115_chamath_director"],"eventIds":["obs_event_mb115_2025_sep12_aexa_prospectus"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_1140_pass_one","prior_versions_preserved","third_party_sec_filing_not_beast_originated","social_capital_amount_class_timing_and_current_holding_unavailable","director_appointment_rights_compensation_and_later_status_unavailable","entity_and_media_labels_not_legal_form_domicile_or_audited_segments","value_creation_characterization_not_quantified_or_audited_return","donaldson_ownership_control_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.98,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1150',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1150',
'{"packageId":"mrbeast-1.15.0","claimsLoaded":4,"relationshipsLoaded":2,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false,"relationshipTreatment":"third_party_sec_filed_bounded"}'::jsonb,
'Expanded package imported after an SEC-filed prospectus identified Social Capital as an investor and Chamath Palihapitiya as a director. No overwrite investment amount class timing current holding appointment rights compensation later status legal form domicile Donaldson ownership personal economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
