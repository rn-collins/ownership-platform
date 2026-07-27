-- MrBeast public-evidence review package 1.11.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb111_dxyz_mar31','https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm','Destiny Tech100 Prospectus Supplement No. 6','Destiny Tech100 Inc. via U.S. Securities and Exchange Commission','public_sec_filing','2026-05-12T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb111_bitmine_jul19','https://www.sec.gov/Archives/edgar/data/1829311/000149315226033855/ex99-1.htm','BitMine July 20 2026 investor communication','BitMine Immersion Technologies Inc. via U.S. Securities and Exchange Commission','public_sec_filing','2026-07-20T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb111_c54',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'fund_portfolio_weight','Destiny Tech100 reported its Beast Industries Series C preferred stock position as 2.0 percent of an approximately 742.5 million dollar portfolio as of March 31 2026.','institutional_economics','public_regulatory_filing','unreviewed',NULL,'Destiny reported the Beast Industries position as 2.0 percent of its portfolio at March 31 2026.','The percentage is not Destiny ownership of Beast Industries and does not establish Beast Industries valuation or Donaldson ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb111_c55',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'evidence_boundary','The March 31 Destiny supplement carries the Series C position forward but does not state a revised share count position specific fair value impairment disposition voting rights or board rights.','evidence_quality','public_regulatory_filing','unreviewed',NULL,'The later portfolio table continues to list the Series C position without resolving its detailed rights or current position level value.','No inference that share count was unchanged no transaction occurred value changed by an analyst derived amount or silence proves absence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb111_c56',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'outside_investor_reporting','BitMine reported a 180 million dollar Beast Industries stake as of July 19 2026.','institutional_economics','public_regulatory_filing','unreviewed',NULL,'BitMine continued to describe its Beast Industries stake as 180 million dollars as of July 19 2026.','No inference about current fair value carrying amount ownership percentage impairment company valuation Donaldson dilution or personal proceeds.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb111_c57',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'measurement_boundary','Destiny portfolio percentage and BitMine stake description are investor level reporting measures governed by different dates and reporting frameworks.','evidence_quality','cross_record_boundary','unreviewed',NULL,'Track each measure with its investor measurement basis and date.','Do not combine the measures infer company valuation or ownership or treat them as equivalent accounting measures.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb111_c54','obs_claim_mb111_c54',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm' LIMIT 1),'supports',NULL,'Portfolio table as of March 31 2026','Fund portfolio weight only; not Beast Industries ownership.',CURRENT_TIMESTAMP),
('obs_ev_mb111_c55','obs_claim_mb111_c55',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm' LIMIT 1),'supports',NULL,'Portfolio table and filing scope','Absence of position detail is not evidence of no change.',CURRENT_TIMESTAMP),
('obs_ev_mb111_c56','obs_claim_mb111_c56',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226033855/ex99-1.htm' LIMIT 1),'supports',NULL,'Holdings statement as of July 19 2026','Company reported stake description only.',CURRENT_TIMESTAMP),
('obs_ev_mb111_c57a','obs_claim_mb111_c57',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm' LIMIT 1),'supports',NULL,'Destiny portfolio table','Destiny measure has a fund portfolio denominator.',CURRENT_TIMESTAMP),
('obs_ev_mb111_c57b','obs_claim_mb111_c57',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226033855/ex99-1.htm' LIMIT 1),'supports',NULL,'BitMine holdings statement','BitMine measure is separately reported shorthand.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb111_destiny_mar31',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Destiny Tech100 Inc.','reported_series_c_position_at_two_percent_of_fund_portfolio',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm' LIMIT 1),NULL,'Fund portfolio percentage only; not ownership of Beast Industries',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb111_bitmine_jul19',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','BitMine Immersion Technologies Inc.','reported_180_million_dollar_stake_as_of_2026_07_19',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226033855/ex99-1.htm' LIMIT 1),NULL,'Investor reported stake description; not current fair value company valuation or personal economics',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb111_2026_mar31_destiny',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'portfolio_reporting','Destiny March 31 portfolio report','Destiny Tech100 reported its Beast Industries Series C position as 2.0 percent of its approximately 742.5 million dollar portfolio.','2026-03-31T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000157587226000288/dxyz100_424b3.htm' LIMIT 1),NULL,'Fund portfolio weight only; no company ownership valuation or personal economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb111_2026_jul19_bitmine',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor_reporting','BitMine July 19 stake report','BitMine continued to describe its Beast Industries stake as 180 million dollars as of July 19 2026.','2026-07-19T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226033855/ex99-1.htm' LIMIT 1),NULL,'Company reported shorthand only; no current fair value ownership company valuation or personal economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1110','mrbeast-1.11.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.11.0',
'research/observatory/dossiers/mrbeast-1.11.0.md','5010f2670774a323bcd1e51a207fc6b5ec27ff1a',
'{"claimIds":["obs_claim_mb111_c54","obs_claim_mb111_c55","obs_claim_mb111_c56","obs_claim_mb111_c57"],"relationshipIds":["obs_rel_mb111_destiny_mar31","obs_rel_mb111_bitmine_jul19"],"eventIds":["obs_event_mb111_2026_mar31_destiny","obs_event_mb111_2026_jul19_bitmine"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_1100_pass_one","prior_versions_preserved","fund_portfolio_weight_not_company_ownership","approximate_portfolio_total_not_position_value","stake_description_not_current_fair_value","investor_measures_not_combined","beneficial_ownership_voting_control_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1110',
'{"packageId":"mrbeast-1.11.0","claimsLoaded":4,"relationshipsLoaded":2,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false,"accountingTreatment":"dated_investor_measures_bounded"}'::jsonb,
'Expanded package imported after later SEC filed investor reporting extended the Destiny and BitMine position chronology. No overwrite company ownership current fair value valuation control personal economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;