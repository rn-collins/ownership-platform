-- MrBeast public-evidence review package 1.7.0.
-- Draft expansion and prospective correction only. Does not overwrite prior versions, publish, verify, score, infer personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb17_bitmine_may31','https://www.sec.gov/Archives/edgar/data/1829311/000149315226026543/ex99-1.htm','BitMine holdings update as of May 31 2026','BitMine Immersion Technologies / SEC','official_sec_filed_exhibit','2026-06-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb17_bitmine_jan26','https://www.sec.gov/Archives/edgar/data/1829311/000149315226003536/ex99-1.htm','BitMine January 26 2026 press release','BitMine Immersion Technologies / SEC','official_sec_filed_exhibit','2026-01-26T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb17_c38',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_purchase_consideration','BitMine filed financial statements report approximately $180 million of cash consideration for 3,974,167 Series C preferred shares and 709,672 secondary common shares in Beast Industries.','capital_structure','official_financial_statement','unreviewed',NULL,'The filed financial statements report approximately $180 million of purchase consideration.','No inference that Donaldson was the secondary seller or received proceeds; no current-value or complete-transaction-economics inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb17_c39',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_carrying_amount','BitMine capitalized $6.024 million of transaction costs and reported a $186.024 million Beast Industries carrying amount at February 28 2026 with no impairment recorded for the quarter.','capital_structure','official_financial_statement','unreviewed',NULL,'Preserve purchase consideration transaction costs carrying amount date and impairment status as separate measures.','No current-value realized-loss permanent-impairment Beast-valuation or Donaldson-wealth inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb17_c40',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'later_investor_description','BitMine SEC-filed May 31 2026 holdings update described its Beast Industries stake as $180 million.','capital_structure','official_filed_company_statement','unreviewed',NULL,'BitMine described the stake as $180 million in its May 31 holdings update.','No audited-fair-value sale write-down impairment share-count or rights-change inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb17_c41',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'chronology_correction','The cited BitMine 10-Q establishes that Beast Industries had not exercised the side-letter notification right and BitMine had not purchased additional preferred equity as of February 28 2026; it does not support the earlier dossier 1.1.0 May 31 endpoint.','evidence_quality','official_record_correction','unreviewed',NULL,'The reviewed 10-Q establishes non-exercise through February 28 2026.','No inference that the right was never later exercised expired amended replaced or separately transacted.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb17_c38','obs_claim_mb17_c38','obs_src_mb11_10q','supports',NULL,'Note 6 lines describing Series C and secondary common purchases','Dollar figures presented in thousands; approximately $180 million total cash consideration.',CURRENT_TIMESTAMP),
('obs_ev_mb17_c39','obs_claim_mb17_c39','obs_src_mb11_10q','supports',NULL,'Note 6 transaction costs carrying amount and impairment statement','Accounting measures are date-specific and distinct from current fair value.',CURRENT_TIMESTAMP),
('obs_ev_mb17_c40','obs_claim_mb17_c40','obs_src_mb17_bitmine_may31','supports',NULL,'Holdings summary as of May 31 2026','Company-description evidence; not audited fair value.',CURRENT_TIMESTAMP),
('obs_ev_mb17_c41','obs_claim_mb17_c41','obs_src_mb11_10q','supports',NULL,'Note 6 side-letter status as of February 28 2026','Prospectively corrects the unsupported May 31 endpoint in immutable 1.1.0.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb17_bitmine_accounting_measures',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','BitMine Immersion Technologies','outside_minority_investor_with_date_specific_accounting_measures','2026-01-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb11_10q',NULL,'Approximately $180 million cash consideration plus $6.024 million capitalized transaction costs; no personal-economics inference',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb17_2026_feb28',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investment_accounting','BitMine February 28 Beast Industries carrying amount','BitMine reported a $186.024 million carrying amount including capitalized transaction costs and no quarterly impairment.','2026-02-28T00:00:00Z','day','unreviewed','draft','obs_src_mb11_10q',NULL,'Date-specific accounting statement not current fair value',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb17_2026_may31',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor_holdings_update','BitMine May 31 holdings description','BitMine described its Beast Industries stake as $180 million in a later filed holdings update.','2026-05-31T00:00:00Z','day','unreviewed','draft','obs_src_mb17_bitmine_may31',NULL,'Attributed company description not audited fair value or impairment finding',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_170','mrbeast-1.7.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.7.0',
'research/observatory/dossiers/mrbeast-1.7.0.md','ed3ca9b83414b1df21f10b994cdd6b9297e51f9b',
'{"claimIds":["obs_claim_mb17_c38","obs_claim_mb17_c39","obs_claim_mb17_c40","obs_claim_mb17_c41"],"relationshipIds":["obs_rel_mb17_bitmine_accounting_measures"],"eventIds":["obs_event_mb17_2026_feb28","obs_event_mb17_2026_may31"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_post_160_pass_one","prior_version_preserved","purchase_consideration_not_carrying_value","carrying_amount_not_current_fair_value","no_impairment_statement_date_bounded","may31_stake_description_not_audit","side_letter_status_only_through_2026_02_28","beneficial_ownership_and_personal_economics_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.94,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_170',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_170',
'{"packageId":"mrbeast-1.7.0","claimsLoaded":4,"relationshipsLoaded":1,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false,"priorVersionCorrection":"prospective"}'::jsonb,
'Expanded package imported after official SEC records separated approximately $180 million purchase consideration from transaction costs and carrying amount and corrected the earlier unsupported May 31 side-letter endpoint to February 28. No overwrite fraud impairment current-value ownership personal-economics scoring publication psychology or saturation inference.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
