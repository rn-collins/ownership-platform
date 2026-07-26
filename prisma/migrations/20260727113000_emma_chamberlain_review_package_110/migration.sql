-- Emma Chamberlain public-evidence review package 1.1.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Creator, director and co-CEO operating across creator media and a venture-backed consumer company.',
    "summary"='A longitudinal public-evidence case separating creator authorship, corporate governance, shared executive authority, outside capital, licensed media distribution and adverse operating evidence.',
    "inclusionRationale"='Tests creator-linked institution building while preserving corporate, team, capital, contract, causality and psychology boundaries.',
    "roleBuiltFlag"=false,
    "verificationStatus"='in_review',
    "evidenceCoverage"=0.88,
    "publicStatus"='draft',
    "updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='emma-chamberlain';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_ec11_s02','https://www.forbes.com/sites/douglasyu/2022/08/16/chamberlain-coffee-feels-like-an-extension-of-myself-youtube-influencer-emma-chamberlain-founded-coffee-company-closes-7-million-series-a-funding/','Chamberlain Coffee closes Series A','Forbes','interview_reporting','2022-08-16T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s05','https://www.prnewswire.com/news-releases/answering-popular-demand-chamberlain-coffee-launches-ready-to-drink-oatmilk-lattes-302012435.html','Ready-to-drink oatmilk reformulation','Chamberlain Coffee / PR Newswire','issuer_release','2023-12-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s06','https://www.sec.gov/Archives/edgar/data/1982731/000198273124000001/xslFormDX01/primary_doc.xml','Chamberlain Coffee Inc. Form D','U.S. Securities and Exchange Commission','regulatory_filing','2024-05-15T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s08','https://www.worldcoffeeportal.com/news/influencer-emma-chamberlain-assumes-co-ceo-role-at-chamberlain-coffee/','Emma Chamberlain assumes co-CEO role','World Coffee Portal','independent_trade_reporting','2024-08-20T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s09','https://newsroom.spotify.com/2022-11-17/emma-chamberlains-anything-goes-podcast-comes-exclusively-to-spotify/','Anything Goes comes exclusively to Spotify','Spotify','platform_announcement','2022-11-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s10','https://variety.com/2022/digital/news/emma-chamberlain-spotify-podcast-anything-goes-1235435401/','Emma Chamberlain inks exclusive Spotify podcast deal','Variety','independent_trade_reporting','2022-11-17T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s12','https://people.com/emma-chamberlain-is-taking-an-indefinite-break-from-podcast-anything-goes-11958151','Emma Chamberlain announces indefinite podcast break','People','first_person_announcement_reporting','2026-04-24T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s13','https://likeandsubscribenews.substack.com/p/exclusive-inside-emma-chamberlains','Inside Emma Chamberlain fundraising scramble','Like and Subscribe / The Ankler','investigative_reporting','2025-03-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec11_s14','https://sprudge.com/internal-documents-dont-paint-a-rosy-picture-of-chamberlain-coffee-309553.html','Internal documents do not paint a rosy picture of Chamberlain Coffee','Sprudge','trade_reporting','2025-03-21T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_ec11_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'corporate_formation','Chamberlain Coffee Inc. reported Delaware incorporation in 2019.','organizational_form','observed','unreviewed',NULL,'A 2024 Form D identifies Chamberlain Coffee Inc. as a Delaware corporation formed in 2019.','Issuer-supplied Form D; SEC states it has not necessarily reviewed accuracy or completeness.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'formal_governance','The 2024 Form D identifies Emma Chamberlain as a director and promoter.','formal_authority','observed','unreviewed',NULL,'A 2024 securities filing identifies Emma Chamberlain as a director and promoter of Chamberlain Coffee Inc.','The filing did not mark her as executive officer and does not disclose equity, votes or current board control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'distributed_governance','The same filing identifies Christopher Gallant, Paul Yoo and Adam Kaller as additional related persons.','distributed_leadership','observed','unreviewed',NULL,'The company filing identifies multiple related persons in addition to Chamberlain.','Related-person status is not a complete current governance chart.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'outside_capital','Public records document outside financing without disclosing a current cap table.','capital_structure','observed','unreviewed',NULL,'Chamberlain Coffee used outside capital; current ownership and control remain undisclosed.','Do not sum similarly described rounds or infer valuation, dilution or investor control without reconciliation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'shared_executive_authority','Chamberlain became co-CEO with Gustav Hossy in August 2024 after serving as chief creative officer.','formal_authority','observed','unreviewed',NULL,'Emma Chamberlain became co-CEO alongside Gustav Hossy in August 2024.','Co-CEO does not mean unilateral authority, sole operation or sole ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'licensed_media_distribution','Spotify announced a multiyear exclusive license for Anything Goes covering its catalog and future episodes beginning in 2023.','platform_dependency','observed','unreviewed',NULL,'Spotify announced a multiyear exclusive license for Anything Goes beginning in 2023.','The public announcement does not disclose economics, underlying IP ownership or retained rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'production_state_change','Chamberlain announced an indefinite pause in new podcast production in April 2026.','portfolio_state','observed','unreviewed',NULL,'Chamberlain announced an indefinite Anything Goes production pause in April 2026.','Archive availability must not be described as continuing production.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'product_iteration','Chamberlain Coffee reformulated its ready-to-drink latte after its original launch.','operating_iteration','observed','unreviewed',NULL,'Chamberlain Coffee publicly documented a ready-to-drink product reformulation.','Issuer language about consumer demand is not independently measured outcome evidence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'adverse_financial_context','Investigative and trade reporting attributed a 2024 operating loss and fundraising difficulty to internal investor materials.','counterevidence','attributed','unreviewed',NULL,'2025 reporting attributed operating losses and fundraising difficulty to internal Chamberlain Coffee materials and sources.','Not audited public financial statements; exact figures remain excluded from automatic publication.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'role_built_boundary','Public evidence does not establish that an institution designed a unique role around Chamberlain.','claim_restriction','observed','unreviewed',NULL,'Role-built status remains false.','A namesake company and formal titles do not alone prove unique institutional role construction.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'ownership_boundary','No reviewed public record establishes Chamberlain current equity percentage, voting control or board majority.','claim_restriction','observed','unreviewed',NULL,'Current equity and voting control remain unverified.','Do not infer ownership from founder, director, promoter, chief creative officer or co-CEO labels.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec11_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'psychology_boundary','No reviewed source measures Chamberlain psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships and outputs, not psychology.','Do not infer motivation, cognition, resilience, identity or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_ec11_c01','obs_claim_ec11_c01','obs_src_ec11_s06','supports',NULL,'Items 1 and 2','Issuer identity and formation year.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c02','obs_claim_ec11_c02','obs_src_ec11_s06','supports',NULL,'Item 3 related persons','Director and promoter boxes checked.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c03','obs_claim_ec11_c03','obs_src_ec11_s06','qualifies',NULL,'Item 3 related persons','Prevents single-person governance inference.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c04','obs_claim_ec11_c04','obs_src_ec11_s02','supports',NULL,'Series A reporting','Financing evidence; terms incomplete.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c04b','obs_claim_ec11_c04','obs_src_ec11_s06','qualifies',NULL,'Items 7 through 13','Exempt offering evidence requires round reconciliation.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c05','obs_claim_ec11_c05','obs_src_ec11_s08','supports',NULL,'Appointment report','Shared executive appointment and prior remit.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c06','obs_claim_ec11_c06','obs_src_ec11_s09','supports',NULL,'Spotify announcement','Primary platform statement of license scope.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c06b','obs_claim_ec11_c06','obs_src_ec11_s10','supports',NULL,'Variety report','Independent corroboration.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c07','obs_claim_ec11_c07','obs_src_ec11_s12','supports',NULL,'April 2026 announcement reporting','First-person production-state change.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c08','obs_claim_ec11_c08','obs_src_ec11_s05','supports',NULL,'Product announcement','Issuer-documented reformulation.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c09','obs_claim_ec11_c09','obs_src_ec11_s13','supports',NULL,'Investor-material investigation','Attributed adverse evidence.',CURRENT_TIMESTAMP),
('obs_ev_ec11_c09b','obs_claim_ec11_c09','obs_src_ec11_s14','supports',NULL,'Trade summary','Corroborating attributed context.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_ec11_corp',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'organization','Chamberlain Coffee Inc.','director_promoter','2019-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec11_s06',NULL,'Formation year approximate; filing status observed 2024-05-15',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec11_coceo',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'organization','Chamberlain Coffee Inc.','co_ceo','2024-08-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec11_s08',NULL,'Shares title with Gustav Hossy',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec11_spotify',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'platform','Spotify','exclusive_multiyear_podcast_license','2023-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec11_s09',NULL,'Exact term and economics undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec11_hossy',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'person','Gustav Hossy','shared_co_ceo_authority','2024-08-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec11_s08',NULL,'Authority and governance terms undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_ec11_formd',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'regulatory_filing','Chamberlain Coffee files Form D','Filing identifies corporate formation and related-person status.','2024-05-15T00:00:00Z','day','unreviewed','draft','obs_src_ec11_s06',NULL,'SEC filing',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec11_spotify',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'license_announcement','Spotify announces exclusive multiyear Anything Goes license','Covers back catalog and future episodes beginning in 2023.','2022-11-17T00:00:00Z','day','unreviewed','draft','obs_src_ec11_s09',NULL,'Spotify newsroom',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec11_reformulation',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'product_reformulation','Chamberlain Coffee announces oatmilk RTD reformulation','Issuer-documented product iteration.','2023-12-01T00:00:00Z','month','unreviewed','draft','obs_src_ec11_s05',NULL,'Issuer release',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec11_pause',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'production_pause','Anything Goes enters indefinite production pause','Archive availability remains distinct from new production.','2026-04-23T00:00:00Z','day','unreviewed','draft','obs_src_ec11_s12',NULL,'First-person announcement reported April 24',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_emma_chamberlain_110','emma-chamberlain-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'1.1.0',
'research/observatory/dossiers/emma-chamberlain-1.1.0.md','44c16c07d700049eda70d98fc88fbb0fd4d954b9',
'{"claimIds":["obs_claim_ec11_c01","obs_claim_ec11_c02","obs_claim_ec11_c03","obs_claim_ec11_c04","obs_claim_ec11_c05","obs_claim_ec11_c06","obs_claim_ec11_c07","obs_claim_ec11_c08","obs_claim_ec11_c09","obs_claim_ec11_c10","obs_claim_ec11_c11","obs_claim_ec11_c12"],"relationshipIds":["obs_rel_ec11_corp","obs_rel_ec11_coceo","obs_rel_ec11_spotify","obs_rel_ec11_hossy"],"eventIds":["obs_event_ec11_formd","obs_event_ec11_spotify","obs_event_ec11_reformulation","obs_event_ec11_pause"],"observationIds":[],"limitations":["saturation_open","cap_table_unavailable","shared_governance_incomplete","financial_reporting_attributed_not_audited","spotify_economics_and_ip_schedule_unavailable","role_built_false","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.88,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_emma_package_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_emma_chamberlain_110',
'{"packageId":"emma-chamberlain-1.1.0","claimsLoaded":12,"relationshipsLoaded":4,"eventsLoaded":4,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded public-evidence package imported as draft. Attribution, ownership, role-built, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
