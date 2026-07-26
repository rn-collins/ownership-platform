-- Pieter Levels public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer legal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_pl_projects','https://levels.io/projects/','List of all my projects ever','Pieter Levels','first_person_ledger','2026-06-29T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_million','https://levels.io/4-years-to-1m-revenue-nomad-list-remote-ok','It took 4 years to reach $1m annual revenue with Nomad List and Remote OK','Pieter Levels','first_person','2019-05-30T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_startups','https://levels.io/startups','Turning side projects into profitable startups','Pieter Levels','first_person','2018-01-24T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_nomadjobs','https://levels.io/how-i-built-a-remote-jobs-board','How I built Nomad Jobs','Pieter Levels','first_person','2014-08-31T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_remoteok','https://levels.io/remote-ok/','How I built Remote OK','Pieter Levels','first_person',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_lex','https://levels.io/conversation-on-startups-ai-indie-hacking','Conversation on startups, AI and indie hacking','Pieter Levels / Lex Fridman','first_person_interview',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_mfm','https://levels.io/my-first-million/','My First Million interview transcript','Pieter Levels / My First Million','first_person_interview',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_interior','https://interiorai.com/faq/who-built-and-is-behind-interior-ai','Who built and is behind Interior AI?','Interior AI','product_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_vc','https://levels.vc/','levels.vc - my investment fund','Pieter Levels','first_person_ledger','2025-10-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_pl_home','https://pieter.com/~pieter/','Pieter official homepage','Pieter Levels','first_person_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_pl_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'lifetime_project_ledger','Levels maintains a first-party ledger of lifetime projects and classifies their outcomes.','portfolio_breadth','observed','unreviewed',NULL,'Levels publicly maintains a lifetime project ledger.','Entries include software, events, music, experiments and noncommercial work; they are not uniformly companies or assets.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'project_status_counts','The June 29, 2026 ledger classifies 9 successes, 11 okay, 19 failures, 68 noncommercial/N/A and 6 new entries.','portfolio_breadth','observed','unreviewed',NULL,'In his June 2026 self-ledger, Levels classified 9 entries as successes, 11 as okay, 19 as failures, 68 as noncommercial/N/A and 6 as new.','These are self-classifications and do not represent 113 current or profitable businesses.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'self_reported_zero_exits','The June 2026 ledger lists zero entries classified as exited or acquired.','asset_disposition','observed','unreviewed',NULL,'Levels’s June 2026 ledger listed no project exit.','This does not independently exclude unrecorded asset, domain or product transfers.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'principal_products','First-party records document Nomads.com/Nomad List, Remote OK, Photo AI and Interior AI among Levels’s current or long-running products.','venture_formation','observed','unreviewed',NULL,'Levels publicly documents building and operating Nomad List/Nomads.com, Remote OK, Photo AI and Interior AI.','Creation and operation do not independently prove present legal title, cap-table ownership or profitability.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'bootstrapped_model','Levels describes most of his product portfolio as bootstrapped and his model as excluding venture capital.','capital_structure','observed','unreviewed',NULL,'Levels describes his principal product-building model as self-funded and bootstrapped.','This is self-report and does not verify absence of debt, grants, credits, minority interests or every other outside-capital category.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'dated_zero_funding_report','In 2019 Levels reported zero funding for Nomad List and Remote OK.','capital_structure','observed','unreviewed',NULL,'Levels reported zero funding for Nomad List and Remote OK in 2019.','A dated report about two products is not a current financing audit of the full portfolio.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'contractor_supported_solo_operation','Levels described himself as the only full-time operator while disclosing part-time support, community moderation and DevOps contractor functions.','collaboration_infrastructure','observed','unreviewed',NULL,'Levels described a one-principal full-time operation supported by limited contractors.','Do not state that there is no team, no human labor or sole authorship of every operational output.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'interior_ai_builder','Interior AI identifies Levels as its builder and says it operates without staff.','operating_authority','observed','unreviewed',NULL,'Interior AI identifies Levels as its builder and says it has no staff.','The product still depends on vendors, infrastructure, model providers and potentially portfolio-level contractors.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'self_reported_revenue','Public revenue figures are published or stated by Levels and are time-specific self-reports.','economic_outcomes','observed','unreviewed',NULL,'Levels has publicly reported dated revenue figures for specific products.','Do not present self-reported revenue as audited profit, valuation, personal income or present performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'personal_angel_investing','Levels publicly describes personal angel investments under the levels.vc label and expressly disclaims that it is an actual investment fund.','capital_allocation','observed','unreviewed',NULL,'Levels publicly describes personal angel investments under the levels.vc label.','Do not infer that levels.vc is a regulated fund or that these investments are external financing of his own products.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_pl_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'raw_count_invalidity','A raw count such as 40-plus products is not a valid current-portfolio measure without classifying active businesses, experiments, failures, predecessors and noncommercial projects.','measurement_validity','classified','unreviewed',NULL,'The Observatory should distinguish lifetime launches from current material businesses.','This methodological classification is not an ownership fact and cannot be scored automatically.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_pl_c01_projects','obs_claim_pl_c01','obs_src_pl_projects','supports',NULL,'Full project ledger','Canonical first-party ledger.',CURRENT_TIMESTAMP),
('obs_ev_pl_c02_projects','obs_claim_pl_c02','obs_src_pl_projects','supports',NULL,'Status totals displayed 2026-06-29','Self-classified counts.',CURRENT_TIMESTAMP),
('obs_ev_pl_c03_projects','obs_claim_pl_c03','obs_src_pl_projects','supports',NULL,'Exited category displays zero','Not an independent transaction search.',CURRENT_TIMESTAMP),
('obs_ev_pl_c04_projects','obs_claim_pl_c04','obs_src_pl_projects','supports',NULL,'Active/success entries','Product existence and first-party classification.',CURRENT_TIMESTAMP),
('obs_ev_pl_c04_lex','obs_claim_pl_c04','obs_src_pl_lex','supports',NULL,'Product discussion','First-person product descriptions.',CURRENT_TIMESTAMP),
('obs_ev_pl_c05_startups','obs_claim_pl_c05','obs_src_pl_startups','supports',NULL,'Bootstrapping presentation','First-person financing model.',CURRENT_TIMESTAMP),
('obs_ev_pl_c06_million','obs_claim_pl_c06','obs_src_pl_million','supports',NULL,'Zero funding line','Dated self-report for two products.',CURRENT_TIMESTAMP),
('obs_ev_pl_c07_mfm','obs_claim_pl_c07','obs_src_pl_mfm','supports',NULL,'Interview around 00:10','Discloses three contractor functions.',CURRENT_TIMESTAMP),
('obs_ev_pl_c08_interior','obs_claim_pl_c08','obs_src_pl_interior','supports',NULL,'Builder FAQ','Product first-party statement.',CURRENT_TIMESTAMP),
('obs_ev_pl_c09_million','obs_claim_pl_c09','obs_src_pl_million','supports',NULL,'Revenue metrics','Self-reported, dated.',CURRENT_TIMESTAMP),
('obs_ev_pl_c09_lex','obs_claim_pl_c09','obs_src_pl_lex','supports',NULL,'Remote OK revenue discussion','Self-reported interview statement.',CURRENT_TIMESTAMP),
('obs_ev_pl_c10_vc','obs_claim_pl_c10','obs_src_pl_vc','supports',NULL,'Investment ledger and disclaimer','Personal investment page.',CURRENT_TIMESTAMP),
('obs_ev_pl_c11_projects','obs_claim_pl_c11','obs_src_pl_projects','supports',NULL,'Mixed project types and statuses','Supports measurement-classification finding.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_pl_nomads',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product','Nomads.com / Nomad List','principal_builder_operator','2014-07-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_pl_projects',NULL,'First-party ledger; month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_pl_remoteok',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product','Remote OK','principal_builder_operator','2015-02-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_pl_remoteok',NULL,'First-person launch account; month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_pl_photoai',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product','Photo AI','principal_builder_operator','2022-10-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_pl_projects',NULL,'First-party ledger; month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_pl_interiorai',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product','Interior AI','principal_builder_operator','2022-10-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_pl_interior',NULL,'Product FAQ and ledger; month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_pl_2014_nomad',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product_launch','Nomad List launched','First-party ledger records the launch; current legal ownership remains unresolved.','2014-07-01T00:00:00Z','month','unreviewed','draft','obs_src_pl_projects',NULL,'Ledger month',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_pl_2015_remoteok',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'product_launch','Remote OK launched','First-person launch account.','2015-02-22T00:00:00Z','day','unreviewed','draft','obs_src_pl_remoteok',NULL,'Product Hunt launch timestamp described by Levels',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_pl_2019_revenue',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'self_reported_milestone','Levels reports $1 million annualized revenue across Nomad List and Remote OK','Dated self-report also states zero funding.','2019-05-30T00:00:00Z','day','unreviewed','draft','obs_src_pl_million',NULL,'Post publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_pl_2026_ledger',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'portfolio_snapshot','Lifetime project ledger updated','Ledger displays mixed outcome categories exceeding one hundred entries.','2026-06-29T00:00:00Z','day','unreviewed','draft','obs_src_pl_projects',NULL,'Displayed update date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_pieter_levels_100','pieter-levels-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'1.0.0',
'research/observatory/dossiers/pieter-levels-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_pl_c01","obs_claim_pl_c02","obs_claim_pl_c03","obs_claim_pl_c04","obs_claim_pl_c05","obs_claim_pl_c06","obs_claim_pl_c07","obs_claim_pl_c08","obs_claim_pl_c09","obs_claim_pl_c10","obs_claim_pl_c11"],"relationshipIds":["obs_rel_pl_nomads","obs_rel_pl_remoteok","obs_rel_pl_photoai","obs_rel_pl_interiorai"],"eventIds":["obs_event_pl_2014_nomad","obs_event_pl_2015_remoteok","obs_event_pl_2019_revenue","obs_event_pl_2026_ledger"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","legal_entities_unresolved","cap_tables_unavailable","ip_ownership_unverified","funding_absence_self_reported","contractor_history_incomplete","lifetime_projects_not_current_businesses","project_status_self_classified","revenue_self_reported_not_audited","vendor_and_platform_dependencies_incomplete","psychological_attributes_unmeasured","classified_measurement_finding_excluded_from_auto_publication"]}'::jsonb,
0.70,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_pieter_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='pieter-levels'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_pieter_levels_100',
'{"packageId":"pieter-levels-1.0.0","sourcesAdded":10,"claimsAdded":11,"relationshipsAdded":4,"eventsAdded":4,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package replaces the unbounded 40-plus solo-owner claim with product-state, labor, funding and evidence distinctions.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
