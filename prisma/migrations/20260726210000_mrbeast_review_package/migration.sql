-- MrBeast public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer current ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb_sec10k','https://www.sec.gov/Archives/edgar/data/1829311/000162828026048157/bmnr-20260531.htm','BitMine 2026 Form 10-K','U.S. Securities and Exchange Commission','regulatory_filing','2026-07-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_sec8k','https://www.sec.gov/Archives/edgar/data/1829311/000149315226002335/form8-k.htm','BitMine Form 8-K announcing Beast Industries investment','U.S. Securities and Exchange Commission','regulatory_filing','2026-01-15T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_nycourt','https://law.justia.com/cases/new-york/appellate-division-first-department/2025/index-no-653908-23-appeal-no-4397-case-no-2024-04155.html','Beast Investments, LLC v Celebrity Virtual Dining, LLC','New York Appellate Division','court_decision','2025-04-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_feastables','https://feastables.com/pages/feastables-and-tonys-open-chain-partnership-announcement','Feastables and Tony’s Open Chain partnership announcement','Feastables','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_jobs','https://www.mrbeastjobs.com/','MrBeast Jobs','Beast Industries','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_bi','https://www.businessinsider.com/mrbeast-revealed-ownership-stake-beast-industries-feastables-2025-11','MrBeast revealed how much of his $5 billion company he owned in a deposition','Business Insider','journalism','2025-11-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_fortune','https://fortune.com/2025/03/11/youtube-biggest-star-mrbeast-makes-more-money-chocolate-videos/','YouTube’s biggest star makes more money from chocolate than videos','Fortune','journalism','2025-03-11T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_verge','https://www.theverge.com/command-line-newsletter/626330/mrbeast-business-youtube-feastables-fundraising','MrBeast’s business and fundraising','The Verge','journalism',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_guardian_fund','https://www.theguardian.com/technology/2025/feb/27/youtube-star-mrbeast-planning-investment-round-that-could-value-company','MrBeast planning investment round that could value company','The Guardian','journalism','2025-02-27T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_wapo_burger','https://www.washingtonpost.com/food/2023/08/01/mrbeast-sues-partner/','MrBeast sues partner in burger venture','The Washington Post','journalism','2023-08-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_ap_investigation','https://apnews.com/article/d5d9519f84130543ec681c73e90a9332','MrBeast company investigation and employment actions','Associated Press','journalism',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_verge_lawsuit','https://www.theverge.com/tech/916903/mrbeast-sexual-harassment-lawsuit','Beast Industries employee lawsuit and company response','The Verge','journalism','2026-01-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'feastables_founder','Feastables identifies Jimmy Donaldson as its founder and says the company was founded in 2022.','venture_formation','observed','unreviewed',NULL,'Feastables says it was founded by Jimmy Donaldson in 2022.','First-party founder language does not establish current ownership percentage, voting control, or audited economics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'dated_ownership_statement','Business Insider reported that Donaldson testified in a November 2024 deposition that he owned a little over half of Beast Industries.','economic_ownership','observed','unreviewed',NULL,'Business Insider reported that Donaldson testified in November 2024 that he owned “a little over half” of Beast Industries.','The original deposition has not been located; the report does not establish the current, exact, fully diluted, or voting stake.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'reported_financing_valuation','Independent reporting described a 2024 financing at an approximately $5 billion valuation.','capital_access','observed','unreviewed',NULL,'Reporting described a Beast Industries financing at an approximately $5 billion valuation.','A private financing valuation is not audited present value, liquidation value, market capitalization, personal wealth, or proof of control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'bitmine_equity_transaction','BitMine reported acquiring 3,974,167 Series C preferred shares for $160 million and 709,672 common shares for $20 million, describing the aggregate position as roughly 4% of Beast Industries.','capital_structure','observed','unreviewed',NULL,'A 2026 SEC filing reports that BitMine invested $180 million in Beast Industries preferred and common equity and described its position as roughly 4%.','The mixed primary and secondary transaction does not establish a clean total valuation or Donaldson’s remaining stake.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'outside_equity_and_share_classes','Public filings confirm outside equity and at least common and Series C preferred shares in Beast Industries.','capital_structure','observed','unreviewed',NULL,'Public filings confirm outside equity and multiple Beast Industries share classes.','Share-class existence does not establish equal voting, liquidation, conversion, board, or control rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'burger_control_dispute','The MrBeast Burger relationship produced litigation over licensing, product quality, compensation, and control.','operating_authority','observed','unreviewed',NULL,'The MrBeast Burger licensing relationship produced litigation concerning quality, compensation, and control.','Party allegations are not adjudicated facts; brand association did not by itself establish full operating ownership or unilateral quality control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'multi_venture_organization','First-party records and reporting document creator-media and consumer-product activity associated with Beast Industries.','venture_formation','observed','unreviewed',NULL,'Beast Industries operates across creator media and consumer ventures.','This does not establish consolidated profitability or entity-level ownership of every branded activity.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'adverse_process_context','Public reporting documents workplace and production allegations, company responses, a commissioned investigation, and reported employment actions.','governance_accountability','observed','unreviewed',NULL,'Public records include allegations, company responses, reported investigation findings, and employment actions that must be evaluated separately.','Complaints are not findings, company denials are not disproof, and a company-commissioned investigation is not an independent adjudication.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb_c02_feastables','obs_claim_mb_c02','obs_src_mb_feastables','supports',NULL,'Company description','First-party founder evidence only.',CURRENT_TIMESTAMP),
('obs_ev_mb_c03_bi','obs_claim_mb_c03','obs_src_mb_bi','supports',NULL,'Report describing November 2024 deposition','Secondary report; original deposition remains outstanding.',CURRENT_TIMESTAMP),
('obs_ev_mb_c04_fortune','obs_claim_mb_c04','obs_src_mb_fortune','supports',NULL,'2024 Series C reporting','Financing report, not audited present valuation.',CURRENT_TIMESTAMP),
('obs_ev_mb_c04_verge','obs_claim_mb_c04','obs_src_mb_verge','supports',NULL,'Investor-material reporting','May share provenance with other financing reports.',CURRENT_TIMESTAMP),
('obs_ev_mb_c05_sec10k','obs_claim_mb_c05','obs_src_mb_sec10k','supports',NULL,'Investment disclosure','Primary legal filing.',CURRENT_TIMESTAMP),
('obs_ev_mb_c05_sec8k','obs_claim_mb_c05','obs_src_mb_sec8k','supports',NULL,'Investment announcement','Same investor filing cluster.',CURRENT_TIMESTAMP),
('obs_ev_mb_c06_sec10k','obs_claim_mb_c06','obs_src_mb_sec10k','supports',NULL,'Share counts and classes','Confirms outside equity and multiple classes.',CURRENT_TIMESTAMP),
('obs_ev_mb_c07_nycourt','obs_claim_mb_c07','obs_src_mb_nycourt','supports',NULL,'Appellate decision','Primary procedural evidence.',CURRENT_TIMESTAMP),
('obs_ev_mb_c07_wapo','obs_claim_mb_c07','obs_src_mb_wapo_burger','supports',NULL,'Contemporaneous dispute report','Allegations and context, not findings.',CURRENT_TIMESTAMP),
('obs_ev_mb_c08_jobs','obs_claim_mb_c08','obs_src_mb_jobs','supports',NULL,'First-party organization record','Operational context.',CURRENT_TIMESTAMP),
('obs_ev_mb_c08_feastables','obs_claim_mb_c08','obs_src_mb_feastables','supports',NULL,'First-party company record','Consumer-venture context.',CURRENT_TIMESTAMP),
('obs_ev_mb_c09_ap','obs_claim_mb_c09','obs_src_mb_ap_investigation','supports',NULL,'Investigation and employment-action report','Preserve commissioned status and scope.',CURRENT_TIMESTAMP),
('obs_ev_mb_c09_verge','obs_claim_mb_c09','obs_src_mb_verge_lawsuit','supports',NULL,'Lawsuit and response report','Allegations and denial must remain separate.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb_feastables',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'organization','Feastables','founder','2022-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb_feastables',NULL,'Year precision from company description',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_beast_industries',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'organization','Beast Industries','reported_majority_equity_holder','2024-11-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb_bi',NULL,'Attributed deposition statement; month precision; not current',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_burger',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'organization','Celebrity Virtual Dining','licensing_and_operating_partner_disputed',NULL,NULL,'unreviewed','draft','obs_src_mb_nycourt',NULL,'Relationship documented through litigation',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb_2024_deposition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'reported_testimony','Donaldson reportedly described his Beast Industries stake','Business Insider reported that he testified he owned a little over half; original deposition not located.','2024-11-01T00:00:00Z','month','unreviewed','draft','obs_src_mb_bi',NULL,'Secondary report of deposition testimony',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb_2026_bitmine',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'equity_investment','BitMine invests in Beast Industries','SEC filings report $180 million aggregate consideration for preferred and common shares and an approximate 4% position.','2026-01-15T00:00:00Z','day','unreviewed','draft','obs_src_mb_sec8k',NULL,'Form 8-K and later Form 10-K',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb_2025_burger_appeal',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'court_decision','Appellate decision in MrBeast Burger dispute','Decision records parties and procedural disposition without converting party allegations into findings.','2025-04-17T00:00:00Z','day','unreviewed','draft','obs_src_mb_nycourt',NULL,'Decision date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_100','mrbeast-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'1.0.0',
'research/observatory/dossiers/mrbeast-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_mb_c02","obs_claim_mb_c03","obs_claim_mb_c04","obs_claim_mb_c05","obs_claim_mb_c06","obs_claim_mb_c07","obs_claim_mb_c08","obs_claim_mb_c09"],"relationshipIds":["obs_rel_mb_feastables","obs_rel_mb_beast_industries","obs_rel_mb_burger"],"eventIds":["obs_event_mb_2024_deposition","obs_event_mb_2026_bitmine","obs_event_mb_2025_burger_appeal"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","original_deposition_not_located","current_cap_table_unavailable","voting_and_board_rights_unavailable","financing_valuation_not_present_value","derivative_financing_sources_clustered","legal_allegations_not_findings","personal_wealth_unmeasured","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.72,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_100',
'{"packageId":"mrbeast-1.0.0","sourcesAdded":12,"claimsAdded":8,"relationshipsAdded":3,"eventsAdded":3,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Claim-level package imported as draft. Present-tense majority ownership, exact current stake, voting control, present valuation, personal wealth and psychological attributes remain unverified.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
