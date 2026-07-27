-- MrBeast public-evidence review package 1.10.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb110_dxyz_ncsr','https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm','Destiny Tech100 2025 certified shareholder report Form N-CSR','Destiny Tech100 Inc. via U.S. Securities and Exchange Commission','public_sec_filing','2026-03-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb110_dxyz_nport','https://www.sec.gov/Archives/edgar/data/1843974/000089418926007429/xslFormNPORT-P_X01/primary_doc.xml','Destiny Tech100 Form N-PORT portfolio report','Destiny Tech100 Inc. via U.S. Securities and Exchange Commission','public_sec_filing','2026-07-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb110_c50',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'outside_investor_position','Destiny Tech100 reported holding 372578 Beast Industries Series C preferred shares acquired October 28 2025.','institutional_economics','public_regulatory_filing','unreviewed',NULL,'Destiny Tech100 reported a direct Series C preferred equity position acquired October 28 2025.','No inference about percentage ownership of Beast Industries voting control board rights seller identity Donaldson dilution or personal proceeds.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb110_c51',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'fund_reported_cost_and_fair_value','Destiny Tech100 reported cost of 15299990 dollars and December 31 2025 fair value of 14999990 dollars for the position while Form N-PORT reported value of 14999990.28 dollars.','institutional_economics','public_regulatory_filing','unreviewed',NULL,'Preserve reported cost and time bounded fair value as distinct fund accounting measures.','No inference about current value Beast Industries enterprise or equity valuation impairment realized loss fraud or personal economics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb110_c52',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'portfolio_accounting_classification','Form N-PORT classified the Destiny position as restricted Level 3 long corporate preferred equity representing 3.4243098194 percent of Destiny Tech100 net assets.','institutional_economics','public_regulatory_filing','unreviewed',NULL,'Destiny classified its holding as restricted Level 3 preferred equity and reported its share of the fund net assets.','The percentage is not Destiny ownership of Beast Industries and Level 3 does not prove misvaluation impairment or misconduct.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb110_c53',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'evidence_boundary','Destiny Tech100 BitMine and Eightco are separate disclosed outside investors with different acquisition dates amounts instruments and reporting frameworks.','evidence_quality','cross_record_boundary','unreviewed',NULL,'Track each disclosed investor position independently.','No combined ownership percentage coordinated control identical rights shared seller aggregate dilution or personal economics inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb110_c50a','obs_claim_mb110_c50',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm' LIMIT 1),'supports',NULL,'Schedule of Investments and restricted-investments note','Investor position only; no cap-table or personal-economics inference.',CURRENT_TIMESTAMP),
('obs_ev_mb110_c50b','obs_claim_mb110_c50',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000089418926007429/xslFormNPORT-P_X01/primary_doc.xml' LIMIT 1),'supports',NULL,'Part C Beast Industries position','N-PORT independently reports the share count.',CURRENT_TIMESTAMP),
('obs_ev_mb110_c51a','obs_claim_mb110_c51',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm' LIMIT 1),'supports',NULL,'Schedule of Investments cost and fair value','Cost and year-end fair value remain distinct.',CURRENT_TIMESTAMP),
('obs_ev_mb110_c51b','obs_claim_mb110_c51',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000089418926007429/xslFormNPORT-P_X01/primary_doc.xml' LIMIT 1),'supports',NULL,'Part C Item C.2 value','Reported value is time bounded to the filing period.',CURRENT_TIMESTAMP),
('obs_ev_mb110_c52','obs_claim_mb110_c52',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000089418926007429/xslFormNPORT-P_X01/primary_doc.xml' LIMIT 1),'supports',NULL,'Part C Items C.2 through C.8','Fund portfolio classification only.',CURRENT_TIMESTAMP),
('obs_ev_mb110_c53a','obs_claim_mb110_c53',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm' LIMIT 1),'supports',NULL,'Destiny Schedule of Investments','Destiny is a separate disclosed investor.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb110_destiny_investor',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','Destiny Tech100 Inc.','reported_holder_of_372578_series_c_preferred_shares',NULL,NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm' LIMIT 1),NULL,'Fund-reported direct position; no personal ownership control or proceeds inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb110_2025_oct28_destiny',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'outside_equity_investment','Destiny Tech100 acquisition date','Destiny Tech100 reported October 28 2025 as the acquisition date for 372578 Beast Industries Series C preferred shares.','2025-10-28T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000121390026025304/ea0276106-01_ncsr.htm' LIMIT 1),NULL,'Acquisition date and reported holding only; seller terms and personal proceeds unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb110_2025_dec31_value',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'portfolio_valuation','Destiny Tech100 year-end reported value','Destiny Tech100 reported approximately 15 million dollars fair value for its Beast Industries position as of December 31 2025.','2025-12-31T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1843974/000089418926007429/xslFormNPORT-P_X01/primary_doc.xml' LIMIT 1),NULL,'Fund reported Level 3 fair value only; not current value company valuation or personal economics',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1100','mrbeast-1.10.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.10.0',
'research/observatory/dossiers/mrbeast-1.10.0.md','f4fc4fe3c1c50b8c11a7df17a699d48a978f2249',
'{"claimIds":["obs_claim_mb110_c50","obs_claim_mb110_c51","obs_claim_mb110_c52","obs_claim_mb110_c53"],"relationshipIds":["obs_rel_mb110_destiny_investor"],"eventIds":["obs_event_mb110_2025_oct28_destiny","obs_event_mb110_2025_dec31_value"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_190_pass_one","prior_versions_preserved","fund_percentage_not_company_ownership","reported_value_not_current_value","level_three_not_misvaluation","restricted_status_not_complete_rights","investors_tracked_separately","beneficial_ownership_voting_control_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.95,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1100',
'{"packageId":"mrbeast-1.10.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false,"accountingTreatment":"fund_measures_bounded"}'::jsonb,
'Expanded package imported after SEC filed Destiny Tech100 records disclosed a previously uncaptured Series C investor position. No overwrite company ownership current value control personal economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
