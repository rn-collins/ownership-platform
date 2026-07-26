-- Alex Cooper public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Host, executive producer and cofounder operating across a flagship podcast, a multi-show network and licensed platform programming.',
    "summary"='A rights-aware public-evidence case separating Cooper’s public brand from cofounders, entities, talent, staff, platform licenses and reported contract values.',
    "inclusionRationale"='Tests a founder-centered media system while preserving ownership, governance, IP, labor, contract, economics, causality and psychology boundaries.',
    "roleBuiltFlag"=false,"verificationStatus"='in_review',"evidenceCoverage"=0.84,"publicStatus"='draft',"updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='alex-cooper';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_ac_spotify','https://newsroom.spotify.com/2021-06-15/call-her-daddy-is-making-it-exclusive-with-spotify/','Call Her Daddy Is Making It Exclusive With Spotify','Spotify','platform_announcement','2021-06-15T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ac_trending','https://deadline.com/2023/06/call-her-daddy-xo-kitty-alex-cooper-matt-kaplan-launch-trending-gen-z-media-venture-1235417071/','Alex Cooper and Matt Kaplan launch Trending','Deadline','independent_reporting','2023-06-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ac_sirius','https://investor.siriusxm.com/news-events/press-releases/detail/2096/siriusxm-inks-new-multi-year-agreement-with-alex-cooper','SiriusXM multi-year agreement with Alex Cooper','SiriusXM','public_company_announcement','2024-08-20T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ac_variety','https://variety.com/2024/digital/news/alex-cooper-deal-siriusxm-call-her-daddy-exclusive-content-1236112140/','Alex Cooper SiriusXM agreement','Variety','independent_reporting','2024-08-20T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ac_forbes','https://www.forbes.com/sites/alexyork/2024/11/22/talk-aint-cheap-inside-alex-coopers-125-million-deal-to-grow-her-multi-media-empire/','Inside Alex Cooper agreement and company','Forbes','independent_interview','2024-11-22T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ac_live','https://investor.siriusxm.com/news-events/press-releases/detail/2141/alex-coopers-unwell-network-announces-new-live-content','Unwell live content exclusive to SiriusXM','SiriusXM','public_company_announcement','2025-01-28T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ac_ankler','https://theankler.com/alex-coopers-unwell-deals-what-the-contracts-reveal-and-why-talent-thinks-twice/','Alex Cooper Unwell talent agreements','The Ankler','independent_reporting',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ac_inc','https://www.inc.com/kevin-haynes/were-all-mean-girls-at-this-company-inside-the-explosive-workplace-allegations-against-alex-cooper-and-matt-kaplan/91360734','Workplace allegations against Unwell leadership','Inc.','independent_reporting','2026-06-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_ac_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'platform_exclusivity','Spotify announced Call Her Daddy exclusivity beginning in July 2021.','institutional_dependency','observed','unreviewed',NULL,'Spotify announced an exclusive distribution relationship beginning in July 2021.','Exclusivity does not establish underlying IP ownership or personal receipt.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'cofounder_relationship','Cooper and Matt Kaplan launched Trending together.','collaborative_formation','observed','unreviewed',NULL,'Cooper and Kaplan are publicly identified as Trending cofounders.','Cofounder status does not disclose equity, voting or contribution.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'entity_architecture','SiriusXM identifies Unwell Audio Network, LLC as a Trending subsidiary launched by Cooper and Kaplan.','portfolio_architecture','observed','unreviewed',NULL,'Unwell Audio Network is publicly described as a Trending subsidiary launched by Cooper and Kaplan.','Founder-centered branding does not prove sole personal ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'licensed_rights','SiriusXM secured specified advertising-sales and programming rights for Call Her Daddy and the Unwell roster.','institutional_dependency','observed','unreviewed',NULL,'SiriusXM holds specified distribution, advertising-sales and programming rights under a multi-year agreement.','The complete contract, guarantees and rights schedule are unavailable.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'reported_deal_value','Independent publications reported the SiriusXM agreement at up to approximately $125 million.','financial_boundary','attributed','unreviewed',NULL,'The agreement has been reported as worth up to approximately $125 million over three years.','Do not present as guaranteed personal compensation, cash received, profit, net worth or enterprise value.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'distributed_labor','Unwell programming depends on multiple hosts, talent, producers, staff and SiriusXM infrastructure.','distributed_creation','observed','unreviewed',NULL,'Unwell is a multi-person, platform-dependent operating system.','Executive-producer or curator credit does not establish sole labor.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'ownership_boundary','Current equity, voting control, IP allocation and contract economics are not publicly established.','claim_restriction','observed','unreviewed',NULL,'Current ownership, governance, IP allocation and economics remain unverified.','Do not substitute founder, CEO, host or brand labels for legal title.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ac_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'psychology_boundary','No reviewed source measures Cooper’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships, products and events, not psychology.','Do not infer motivation, resilience, cognition, personality or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_ac_c01','obs_claim_ac_c01','obs_src_ac_spotify','supports',NULL,'2021 exclusivity announcement','Primary platform evidence.',CURRENT_TIMESTAMP),
('obs_ev_ac_c02','obs_claim_ac_c02','obs_src_ac_trending','supports',NULL,'Trending launch','Independent cofounder evidence.',CURRENT_TIMESTAMP),
('obs_ev_ac_c03','obs_claim_ac_c03','obs_src_ac_sirius','supports',NULL,'Company description','Public-company counterparty evidence.',CURRENT_TIMESTAMP),
('obs_ev_ac_c04','obs_claim_ac_c04','obs_src_ac_sirius','supports',NULL,'Rights description','Public release describes specified rights.',CURRENT_TIMESTAMP),
('obs_ev_ac_c05a','obs_claim_ac_c05','obs_src_ac_variety','supports',NULL,'Reported agreement value','Attributed value.',CURRENT_TIMESTAMP),
('obs_ev_ac_c05b','obs_claim_ac_c05','obs_src_ac_forbes','qualifies',NULL,'Agreement profile','Does not establish net receipt.',CURRENT_TIMESTAMP),
('obs_ev_ac_c06','obs_claim_ac_c06','obs_src_ac_live','supports',NULL,'Live-show roster','Multi-person programming evidence.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_ac_spotify',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'organization','Spotify','exclusive_distribution_counterparty','2021-07-21T00:00:00Z','2024-12-31T00:00:00Z','unreviewed','draft','obs_src_ac_spotify',NULL,'Public exclusivity announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ac_kaplan',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'person','Matt Kaplan','spouse_business_partner_and_cofounder','2023-06-14T00:00:00Z',NULL,'unreviewed','draft','obs_src_ac_trending',NULL,'Cofounder relationship; economics unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ac_trending',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'organization','Trending','cofounder','2023-06-14T00:00:00Z',NULL,'unreviewed','draft','obs_src_ac_trending',NULL,'Ownership and governance unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ac_unwell',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'organization','Unwell Audio Network, LLC','cofounder_and_host','2023-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ac_sirius',NULL,'Trending subsidiary; cap table unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ac_sirius',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'organization','SiriusXM','distribution_ad_sales_and_programming_counterparty','2024-08-20T00:00:00Z',NULL,'unreviewed','draft','obs_src_ac_sirius',NULL,'Multi-year agreement; complete contract unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_ac_spotify',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'platform_agreement','Spotify exclusivity begins','Call Her Daddy enters Spotify-exclusive distribution.','2021-07-21T00:00:00Z','day','unreviewed','draft','obs_src_ac_spotify',NULL,'Platform announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ac_trending',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'company_launch','Trending launches','Cooper and Kaplan launch a Gen Z-focused media venture.','2023-06-14T00:00:00Z','day','unreviewed','draft','obs_src_ac_trending',NULL,'Independent trade report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ac_sirius',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'platform_agreement','SiriusXM agreement announced','Specified Unwell and Call Her Daddy rights shift to SiriusXM under a multi-year agreement.','2024-08-20T00:00:00Z','day','unreviewed','draft','obs_src_ac_sirius',NULL,'Public-company release',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ac_live',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'product_launch','Unwell live channels announced','SiriusXM announces Unwell Music and Unwell On Air programming.','2025-01-28T00:00:00Z','day','unreviewed','draft','obs_src_ac_live',NULL,'Public-company release',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_alex_cooper_100','alex-cooper-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'1.0.0','research/observatory/dossiers/alex-cooper-1.0.0.md','ce9a1af50abc723d04f8bff9e87916b59501c0ac',
'{"claimIds":["obs_claim_ac_c01","obs_claim_ac_c02","obs_claim_ac_c03","obs_claim_ac_c04","obs_claim_ac_c05","obs_claim_ac_c06","obs_claim_ac_c07","obs_claim_ac_c08"],"relationshipIds":["obs_rel_ac_spotify","obs_rel_ac_kaplan","obs_rel_ac_trending","obs_rel_ac_unwell","obs_rel_ac_sirius"],"eventIds":["obs_event_ac_spotify","obs_event_ac_trending","obs_event_ac_sirius","obs_event_ac_live"],"observationIds":[],"limitations":["saturation_open","cap_table_and_governance_unavailable","platform_and_ip_rights_incomplete","reported_deal_value_not_personal_receipt","distributed_labor_incomplete","adverse_claims_unadjudicated","role_built_false","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.84,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_alex_cooper_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alex-cooper' LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_alex_cooper_100',
'{"packageId":"alex-cooper-1.0.0","claimsLoaded":8,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Public-evidence package imported as draft. Ownership, governance, IP, labor, economics, causality, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
