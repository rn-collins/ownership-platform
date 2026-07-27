-- MrBeast public-evidence review package 1.14.0.
-- Draft extension only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb114_bitmine_note','https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm','BitMine Investment Note for Six Months Ended February 28 2026','United States Securities and Exchange Commission','sec_financial_statement_note','2026-04-13T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb114_c66',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor_security_acquisition','BitMine reported acquiring 3974167 Beast Industries Series C preferred shares at 40.26 dollars per share on January 15 2026.','institutional_investment','sec_filed_investor_report','unreviewed',NULL,'BitMine reported acquiring 3974167 Series C preferred shares at 40.26 dollars per share.','No inference of current ownership present value voting rights board rights or Donaldson personal economics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb114_c67',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'secondary_common_share_acquisition','BitMine reported acquiring 709672 common shares in a secondary transaction; shares originally issued as Class B automatically converted to Class A upon transfer.','institutional_investment','sec_filed_investor_report','unreviewed',NULL,'Describe the reported secondary acquisition and automatic Class B to Class A conversion.','The filing does not identify the selling shareholder or establish seller proceeds Donaldson as seller or undisclosed class rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb114_c68',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'acquisition_date_equity_percentage','BitMine reported that its combined position represented approximately 4 percent of Beast Industries equity at the time of the transaction and did not provide control or significant influence.','institutional_investment','sec_filed_investor_report','unreviewed',NULL,'BitMine reported approximately 4 percent equity at acquisition without control or significant influence.','No inference of current fully diluted or voting percentage Donaldson dilution or governance rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb114_c69',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'follow_on_side_letter_ceiling','BitMine reported a limited-period side letter under which Beast Industries could notify BitMine of an election to sell up to 20 million dollars of additional preferred equity at the Series D price.','institutional_investment','sec_filed_investor_report','unreviewed',NULL,'Describe the 20 million dollar ceiling and limited notification mechanism.','No inference of an obligation completed follow-on purchase Series D valuation current exercisability or Donaldson proceeds.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb114_c66','obs_claim_mb114_c66',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),'supports',NULL,'Investment in Beast Industries: Series C acquisition','Acquisition-date security and share-count disclosure only.',CURRENT_TIMESTAMP),
('obs_ev_mb114_c67','obs_claim_mb114_c67',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),'supports',NULL,'Investment in Beast Industries: secondary common transaction','Seller unidentified; class conversion does not establish complete rights.',CURRENT_TIMESTAMP),
('obs_ev_mb114_c68','obs_claim_mb114_c68',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),'supports',NULL,'Investment in Beast Industries: approximately 4 percent at transaction','Acquisition-date investor-reported percentage only.',CURRENT_TIMESTAMP),
('obs_ev_mb114_c69','obs_claim_mb114_c69',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),'supports',NULL,'Investment in Beast Industries: side letter','Ceiling and mechanism only; later non-exercise separately preserved in prior versions.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb114_bitmine_four_percent',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','BitMine Immersion Technologies Inc.','reported_approximately_four_percent_equity_at_acquisition','2026-01-15T00:00:00Z',NULL,'unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),NULL,'Acquisition-date investor-reported percentage; no current ownership voting or control inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb114_2026_jan15_bitmine_acquisition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'institutional_investment','BitMine acquires disclosed Beast Industries securities','BitMine reported acquiring Series C preferred and transferred Class A common shares representing approximately 4 percent of Beast Industries equity at acquisition without control or significant influence.','2026-01-15T00:00:00Z','day','unreviewed','draft',(SELECT "id" FROM "ObservatorySource" WHERE "url"='https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm' LIMIT 1),NULL,'Investor-reported acquisition facts only; no current cap table seller identity or personal-economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_1140','mrbeast-1.14.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.14.0',
'research/observatory/dossiers/mrbeast-1.14.0.md','6ba8683c77f9ef30495ad707231f3eea95c8d309',
'{"claimIds":["obs_claim_mb114_c66","obs_claim_mb114_c67","obs_claim_mb114_c68","obs_claim_mb114_c69"],"relationshipIds":["obs_rel_mb114_bitmine_four_percent"],"eventIds":["obs_event_mb114_2026_jan15_bitmine_acquisition"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_1130_pass_one","prior_versions_preserved","acquisition_percentage_not_current_or_fully_diluted","security_classes_not_complete_rights","secondary_seller_unidentified","side_letter_ceiling_not_completed_purchase","donaldson_ownership_control_dilution_and_personal_economics_unavailable","two_final_no_new_material_passes_reset","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.98,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_1140',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_1140',
'{"packageId":"mrbeast-1.14.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":1,"publication":"draft","saturation":"open","roleBuiltFlag":false,"bitmineSecurityTreatment":"acquisition_date_investor_report_bounded"}'::jsonb,
'Expanded package imported after an SEC-filed BitMine note resolved acquisition-date share classes counts approximate equity percentage and side-letter ceiling. No overwrite current ownership voting control seller Donaldson dilution personal economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
