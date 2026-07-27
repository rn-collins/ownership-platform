-- MrBeast public-evidence review package 1.13.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb113_destiny_n2','https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm','Destiny Tech100 Inc. Form N-2 Registration Statement','United States Securities and Exchange Commission','sec_registration_statement','2026-05-26T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb113_c62',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'company_location_description','Destiny Tech100 May 26 2026 Form N-2 describes Beast Industries Co. as North Carolina-based.','entity_description','investor_filed_description','unreviewed',NULL,'Destiny Tech100 described Beast Industries as North Carolina-based.','No inference of definitive headquarters incorporation jurisdiction principal place of business or tax domicile without separate corporate records.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb113_c63',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'business_scope_description','The Destiny Tech100 filing describes Beast Industries as an entertainment and consumer-products company built around MrBeast.','business_scope','investor_filed_description','unreviewed',NULL,'Attribute the entertainment and consumer-products description to Destiny Tech100 filing.','No inference that Beast Industries or Donaldson adopted the description or that it states audited operating segments or complete business scope.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb113_c64',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'consumer_products_description','The Destiny Tech100 filing says Beast Industries had extended its brand into consumer packaged goods.','business_scope','investor_filed_description','unreviewed',NULL,'The investor filing says the brand had extended into consumer packaged goods.','No inference of product-level ownership revenue profitability complete subsidiaries licenses or Donaldson personal economics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb113_c65',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'digital_services_expansion_description','The Destiny Tech100 filing says Beast Industries was expanding into branded digital services and seeking to build large-scale brand-driven enterprises.','business_strategy','investor_filed_description','unreviewed',NULL,'Attribute the stated expansion direction to the investor filing.','No inference that every service launched or received regulatory approval or achieved commercial success or current valuation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb113_c62','obs_claim_mb113_c62',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),'supports',NULL,'Portfolio-company description: Beast Industries Co.','Investor-filed location description only.',CURRENT_TIMESTAMP),
('obs_ev_mb113_c63','obs_claim_mb113_c63',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),'supports',NULL,'Portfolio-company description: Beast Industries Co.','Investor-filed business-scope description only.',CURRENT_TIMESTAMP),
('obs_ev_mb113_c64','obs_claim_mb113_c64',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),'supports',NULL,'Portfolio-company description: consumer packaged goods','No product ownership revenue or profitability inference.',CURRENT_TIMESTAMP),
('obs_ev_mb113_c65','obs_claim_mb113_c65',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),'supports',NULL,'Portfolio-company description: branded digital services','Strategy description only; no launch success or valuation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb113_destiny_describes_beast',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Destiny Tech100 Inc.','investor_filed_portfolio_company_description',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),NULL,'Form N-2 portfolio-company description; not Beast Industries-originated disclosure',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb113_2026_may26_n2',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor_filing','Destiny files Beast Industries business description','Destiny Tech100 filed a Form N-2 containing a portfolio-company description of Beast Industries business scope and expansion direction.','2026-05-26T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000354/dxyz101_n2.htm' LIMIT 1),NULL,'Investor-filed description only; no audited segment launch revenue ownership or personal-economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1130','mrbeast-1.13.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.13.0',
'research/observatory/dossiers/mrbeast-1.13.0.md','7e10538f1430eaee2e3c074eb271458deb46e467',
'{"claimIds":["obs_claim_mb113_c62","obs_claim_mb113_c63","obs_claim_mb113_c64","obs_claim_mb113_c65"],"relationshipIds":["obs_rel_mb113_destiny_describes_beast"],"eventIds":["obs_event_mb113_2026_may26_n2"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_1120_pass_one","prior_versions_preserved","investor_description_not_issuer_originated","location_description_not_corporate_domicile","business_scope_not_audited_segments","expansion_language_not_launch_or_success","beneficial_ownership_voting_control_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1130',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1130',
'{"packageId":"mrbeast-1.13.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false,"businessScopeTreatment":"investor_filed_description_bounded"}'::jsonb,
'Expanded package imported after an SEC-filed investor registration statement described Beast Industries business scope and expansion direction. No overwrite issuer adoption launch revenue profitability ownership control economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
