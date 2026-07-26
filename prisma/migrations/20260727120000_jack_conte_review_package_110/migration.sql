-- Jack Conte public-evidence review package 1.1.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Musician and Patreon cofounder operating across creator media and venture-backed platform infrastructure.',
    "summary"='A longitudinal public-evidence case separating creator collaboration, corporate formation, distributed governance, outside capital, product decisions, acquisitions and adverse organizational evidence.',
    "inclusionRationale"='Tests a creator-to-platform operating system while preserving cofounder, board, capital, IP, labor, causality and psychology boundaries.',
    "roleBuiltFlag"=false,
    "verificationStatus"='in_review',
    "evidenceCoverage"=0.90,
    "publicStatus"='draft',
    "updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='jack-conte';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_jc11_sec','https://www.sec.gov/Archives/edgar/data/1860300/000173907421000007/xslFormDX08/primary_doc.xml','Patreon, Inc. Form D','U.S. Securities and Exchange Commission','regulatory_filing','2021-04-07T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_funding','https://www.prnewswire.com/news-releases/patreon-fuels-the-future-of-the-creator-economy-with-155-million-in-additional-funding-301263804.html','Patreon announces $155M Series F','Patreon / PR Newswire','issuer_release','2021-04-07T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_reuters','https://www.reuters.com/business/media-telecom/creators-platform-patreon-valued-4-bln-latest-funding-round-2021-04-07/','Patreon valued at $4B in latest funding round','Reuters','independent_reporting','2021-04-07T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_fee','https://www.tubefilter.com/2017/12/13/patreon-calls-off-fee-change/','Patreon calls off fee change','Tubefilter','trade_reporting','2017-12-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_layoffs22','https://techcrunch.com/2022/09/13/patreon-lays-off-17-of-staff-affecting-80-employees/','Patreon lays off 17% of staff','TechCrunch','independent_reporting','2022-09-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_security','https://techcrunch.com/2022/09/09/patreon-security-layoffs/','Patreon confirms security-team layoffs','TechCrunch','independent_reporting','2022-09-09T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_moment','https://news.patreon.com/articles/patreon-acquires-moment','Patreon acquires Moment','Patreon','company_announcement','2023-10-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_moment_ax','https://www.axios.com/2023/10/17/patreon-moment-livestream-platform-acquires','Patreon acquires livestream platform Moment','Axios','independent_reporting','2023-10-17T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_creator','https://www.patreon.com/cw/jackconte','Jack Conte creator page','Jack Conte / Patreon','first_person_platform_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc11_deadwax','https://podcasts.apple.com/us/podcast/dead-wax/id1724481206','Dead Wax podcast','Apple Podcasts','distribution_platform_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_jc11_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'formal_governance','A 2021 Form D identifies Conte as Patreon executive officer, director and promoter.','formal_authority','observed','unreviewed',NULL,'A 2021 securities filing identifies Jack Conte as an executive officer, director and promoter of Patreon, Inc.','Formal status does not establish current equity, voting control, compensation or unilateral authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'distributed_governance','The same filing identifies Sam Yam and five additional directors.','distributed_leadership','observed','unreviewed',NULL,'Patreon’s 2021 filing documents a multi-person board snapshot.','The filing is not a complete current governance record and does not establish individual voting power.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'outside_capital','Patreon announced a $155 million Series F in 2021 at a reported $4 billion transaction valuation.','capital_structure','observed','unreviewed',NULL,'Patreon announced a $155 million Series F in 2021; issuer and independent reporting placed that round at a $4 billion company valuation.','Transaction-date company valuation is not Conte personal wealth, current value, profitability or ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'product_governance_reversal','Patreon reversed a proposed 2017 fee change after creator and patron backlash.','counterevidence','attributed','unreviewed',NULL,'Patreon reversed its proposed 2017 fee change after public backlash.','Documents a decision and reversal, not a stable psychological characteristic.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'workforce_reduction','Patreon reduced five security positions and later 80 additional positions in September 2022.','organizational_dependency','attributed','unreviewed',NULL,'Independent reporting documented separate Patreon security and broader workforce reductions in September 2022.','Events require reconciliation and must not be indiscriminately summed; internal rationale is not independently proven.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'acquisition','Patreon acquired Moment in 2023 to add ticketed digital experiences.','institutional_expansion','observed','unreviewed',NULL,'Patreon acquired Moment in 2023 as part of its expansion into ticketed digital experiences.','Do not attribute the acquired team, product or IP solely to Conte; economics are undisclosed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'creator_portfolio','Conte publicly identifies with Pomplamoose and Scary Pockets in addition to Patreon.','portfolio_architecture','observed','unreviewed',NULL,'Conte publicly describes himself as part of Pomplamoose and Scary Pockets as well as Patreon cofounder and CEO.','The creator properties are collaborative and distinct from Patreon; ownership and rights remain undisclosed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'collaborative_media','Dead Wax identifies Conte and Ryan Lerman as hosts and lists additional production contributors.','distributed_creation','observed','unreviewed',NULL,'Dead Wax is publicly documented as a collaborative media property co-hosted by Conte and Ryan Lerman.','Do not infer sole ownership, sole labor, contract economics or catalog rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'role_built_boundary','Public evidence does not establish that an existing institution designed a unique role around Conte.','claim_restriction','observed','unreviewed',NULL,'Role-built status remains false.','Cofounder, director and CEO are formal roles but do not alone establish unique institutional role construction.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'ownership_boundary','No reviewed public record establishes Conte current equity percentage, voting control or board control.','claim_restriction','observed','unreviewed',NULL,'Conte’s current ownership and control remain unverified.','Do not infer ownership from creator, cofounder, director, promoter or CEO labels.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'causality_boundary','Company scale, financing, products and outcomes cannot be attributed solely to Conte.','claim_restriction','observed','unreviewed',NULL,'Patreon outcomes remain institution-level evidence unless person-level attribution is documented.','Cofounder visibility and executive title do not prove sole causation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc11_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'psychology_boundary','No reviewed source measures Conte psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships, decisions and outputs, not psychology.','Do not infer motivation, cognition, resilience, identity or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_jc11_c01','obs_claim_jc11_c01','obs_src_jc11_sec','supports',NULL,'Item 3 related persons','Executive officer, director and promoter boxes checked.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c02','obs_claim_jc11_c02','obs_src_jc11_sec','qualifies',NULL,'Item 3 related persons','Documents distributed formal governance.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c03a','obs_claim_jc11_c03','obs_src_jc11_funding','supports',NULL,'Series F announcement','Issuer financing and valuation statement.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c03b','obs_claim_jc11_c03','obs_src_jc11_reuters','supports',NULL,'Financing report','Independent corroboration.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c04','obs_claim_jc11_c04','obs_src_jc11_fee','supports',NULL,'Fee reversal report','Adverse product-governance evidence.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c05a','obs_claim_jc11_c05','obs_src_jc11_security','supports',NULL,'Security layoff report','Separate reduction and company response.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c05b','obs_claim_jc11_c05','obs_src_jc11_layoffs22','supports',NULL,'Broader reduction report','80 roles, 17% and office closures.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c06a','obs_claim_jc11_c06','obs_src_jc11_moment','supports',NULL,'Acquisition announcement','Primary company account.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c06b','obs_claim_jc11_c06','obs_src_jc11_moment_ax','supports',NULL,'Acquisition report','Independent corroboration.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c07','obs_claim_jc11_c07','obs_src_jc11_creator','supports',NULL,'Creator-page self-description','Current first-person portfolio snapshot.',CURRENT_TIMESTAMP),
('obs_ev_jc11_c08','obs_claim_jc11_c08','obs_src_jc11_deadwax','supports',NULL,'Show metadata and credits','Co-host and production attribution.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_jc11_board',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Patreon, Inc.','executive_officer_director_promoter',NULL,NULL,'unreviewed','draft','obs_src_jc11_sec',NULL,'2021 Form D snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc11_yam',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'person','Sam Yam','cofounder_and_fellow_director_promoter','2013-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc11_sec',NULL,'Formation year approximate; filing snapshot 2021',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc11_investors',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Patreon Series F investors','corporate_financing_counterparties','2021-04-07T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc11_funding',NULL,'Terms beyond announcement unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc11_moment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Moment','patreon_acquired_company','2023-10-17T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc11_moment',NULL,'Corporate acquisition; economics undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc11_deadwax',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'asset','Dead Wax','cohost','2024-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc11_deadwax',NULL,'Co-hosted with Ryan Lerman; exact start day unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_jc11_fee',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'product_decision_reversal','Patreon reverses proposed fee change','Creator and patron backlash and executive apology recorded.','2017-12-13T00:00:00Z','day','unreviewed','draft','obs_src_jc11_fee',NULL,'Trade report of first-person reversal',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc11_seriesf',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'financing','Patreon announces Series F','Issuer announced $155M at a reported $4B transaction valuation.','2021-04-07T00:00:00Z','day','unreviewed','draft','obs_src_jc11_funding',NULL,'Issuer announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc11_layoffs22',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'workforce_reduction','Patreon reduces workforce and closes offices','Reporting documented 80 positions, 17%, and Berlin and Dublin closures.','2022-09-13T00:00:00Z','day','unreviewed','draft','obs_src_jc11_layoffs22',NULL,'Independent report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc11_moment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'acquisition','Patreon acquires Moment','Adds ticketed digital-experience capability.','2023-10-17T00:00:00Z','day','unreviewed','draft','obs_src_jc11_moment',NULL,'Company announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_jack_conte_110','jack-conte-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'1.1.0',
'research/observatory/dossiers/jack-conte-1.1.0.md','767379cdb61342e4479e21177d3d2c2fa4d8e463',
'{"claimIds":["obs_claim_jc11_c01","obs_claim_jc11_c02","obs_claim_jc11_c03","obs_claim_jc11_c04","obs_claim_jc11_c05","obs_claim_jc11_c06","obs_claim_jc11_c07","obs_claim_jc11_c08","obs_claim_jc11_c09","obs_claim_jc11_c10","obs_claim_jc11_c11","obs_claim_jc11_c12"],"relationshipIds":["obs_rel_jc11_board","obs_rel_jc11_yam","obs_rel_jc11_investors","obs_rel_jc11_moment","obs_rel_jc11_deadwax"],"eventIds":["obs_event_jc11_fee","obs_event_jc11_seriesf","obs_event_jc11_layoffs22","obs_event_jc11_moment"],"observationIds":[],"limitations":["saturation_open","current_cap_table_unavailable","current_board_and_voting_control_unavailable","financials_and_profitability_unavailable","creative_property_ip_and_contracts_unavailable","creator_outcomes_not_person_attributable","role_built_false","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.90,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_jack_package_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_jack_conte_110',
'{"packageId":"jack-conte-1.1.0","claimsLoaded":12,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded public-evidence package imported as draft. Ownership, governance, valuation, causality, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
