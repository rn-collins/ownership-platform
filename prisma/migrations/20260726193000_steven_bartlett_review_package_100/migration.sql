-- Steven Bartlett public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Entrepreneur, investor and podcast host operating through distinct co-founded companies, investment relationships and media properties.',
    "summary"='A multi-entity public-evidence case separating founder branding from ownership, directorship, significant control, investment exposure, platform rights, distributed labor and reported valuations.',
    "inclusionRationale"='Tests property and venture boundaries across a founder-centered media and investment portfolio.',
    "roleBuiltFlag"=false,"verificationStatus"='in_review',"evidenceCoverage"=0.84,"publicStatus"='draft',"updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='steven-bartlett';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_sb_ch_group','https://find-and-update.company-information.service.gov.uk/company/13661275/filing-history','Flight Story Group Ltd filing history','Companies House','official_registry',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_ch_ltd','https://find-and-update.company-information.service.gov.uk/company/13441974/filing-history','Flight Story Limited filing history','Companies House','official_registry',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_about','https://stevenbartlett.com/about/','Steven Bartlett About','Steven Bartlett','first_party_biography',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_flight','https://www.flightstory.com/speakers/steven-bartlett','Steven Bartlett','Flight Story','affiliate_biography',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_fund','https://flightfund.com/','Flight Fund','Flight Fund','issuer_site',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_thirdweb','https://techcrunch.com/2022/08/24/thirdweb-raises-24m-at-a-160m-valuation-from-haun-ventures-shopify-and-coinbase-for-its-web3-development-kit/','Thirdweb raises $24M at a $160M valuation','TechCrunch','independent_reporting','2022-08-25T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sb_asa_huel','https://www.asa.org.uk/rulings/huel-ltd-g24-1237493-huel-ltd.html','ASA ruling on Huel Ltd','Advertising Standards Authority','regulator_decision','2024-08-14T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_asa_guide','https://www.asa.org.uk/advice-online/testimonials-and-endorsements.html','Testimonials and endorsements','Advertising Standards Authority','regulator_guidance','2025-04-22T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sb_bbc','https://www.bbc.com/news/articles/c4gpz163vg2o','Steven Bartlett sharing harmful health misinformation on Diary of a CEO podcast','BBC','independent_investigation','2024-12-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sb_apple','https://podcasts.apple.com/jm/podcast/the-diary-of-a-ceo-with-steven-bartlett/id1291423644','The Diary of a CEO with Steven Bartlett','Apple Podcasts','platform_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_sb_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'multi_entity_portfolio','Bartlett operates through distinct media, investment, software and portfolio-company relationships.','portfolio_architecture','observed','unreviewed',NULL,'Bartlett has public roles across distinct co-founded companies, investments and media properties.','Do not collapse the portfolio into one legal enterprise or assume uniform ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'significant_control','Companies House records Bartlett as a person with significant control of Flight Story Group.','governance_boundary','observed','unreviewed',NULL,'A UK registry records Bartlett as a person with significant control of Flight Story Group.','PSC is a statutory threshold category, not proof of 100-percent ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'director_transition','Companies House records Bartlett’s Flight Story Group directorship ending on 21 October 2025.','role_transition','observed','unreviewed',NULL,'Bartlett ceased to be a filed Flight Story Group director in October 2025.','A director termination does not prove an ownership, control, employment or branding exit.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'cofounder_relationship','Bartlett publicly co-founded thirdweb with Furqan Rydhan.','collaborative_formation','observed','unreviewed',NULL,'Bartlett and Rydhan are publicly identified as thirdweb cofounders.','Financing and valuation do not disclose Bartlett’s current stake, control or liquidity.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'fund_size_boundary','Flight Fund has been reported and marketed as a $100 million fund.','financial_boundary','attributed','unreviewed',NULL,'Flight Fund has been described as a $100 million investment fund.','Fund size is not Bartlett’s personal capital, deployed capital, performance or wealth.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'commercial_interest','The ASA documented Bartlett’s Huel directorship and Zoe investment as material commercial interests.','relationship_boundary','observed','unreviewed',NULL,'Regulatory records identify distinct Huel-director and Zoe-investor relationships.','These labels do not disclose stake size, voting rights or company control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'distributed_media_labor','The Diary of a CEO depends on guests, producers, staff, distributors and advertisers beyond Bartlett.','distributed_creation','observed','unreviewed',NULL,'The podcast is a multi-party media operation hosted by Bartlett.','Host visibility does not establish sole labor, complete IP title or sole economic receipt.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sb_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'psychology_boundary','No reviewed source validly measures Bartlett’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships, products and events, not psychology.','Do not infer motivation, resilience, cognition, personality or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_sb_c01','obs_claim_sb_c01','obs_src_sb_flight','supports',NULL,'Affiliated portfolio description','Issuer-cluster evidence; entity boundaries remain open.',CURRENT_TIMESTAMP),
('obs_ev_sb_c02','obs_claim_sb_c02','obs_src_sb_ch_group','supports',NULL,'PSC filings','Official filed-status evidence.',CURRENT_TIMESTAMP),
('obs_ev_sb_c03','obs_claim_sb_c03','obs_src_sb_ch_group','supports',NULL,'TM01 filed 22 October 2025','Official director-termination record.',CURRENT_TIMESTAMP),
('obs_ev_sb_c04','obs_claim_sb_c04','obs_src_sb_thirdweb','supports',NULL,'Funding and founder report','Independent cofounder and financing evidence.',CURRENT_TIMESTAMP),
('obs_ev_sb_c05','obs_claim_sb_c05','obs_src_sb_fund','supports',NULL,'Fund positioning','Issuer claim; not audited performance.',CURRENT_TIMESTAMP),
('obs_ev_sb_c06a','obs_claim_sb_c06','obs_src_sb_asa_huel','supports',NULL,'ASA Huel assessment','Regulator-established directorship relevance.',CURRENT_TIMESTAMP),
('obs_ev_sb_c06b','obs_claim_sb_c06','obs_src_sb_asa_guide','supports',NULL,'Commercial-interest guidance','Regulator identifies Zoe investment.',CURRENT_TIMESTAMP),
('obs_ev_sb_c07','obs_claim_sb_c07','obs_src_sb_apple','supports',NULL,'Show distribution record','Platform evidence; production credits incomplete.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_sb_flight',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'organization','Flight Story Group Ltd','founder_psc_and_former_director',NULL,'2025-10-21T00:00:00Z','unreviewed','draft','obs_src_sb_ch_group',NULL,'Directorship ended; PSC relationship separately filed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sb_yonchev',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'person','Oliver Yonchev','flight_story_cofounder',NULL,NULL,'unreviewed','draft','obs_src_sb_flight',NULL,'Equity and contribution not inferred',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sb_thirdweb',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'organization','thirdweb','cofounder',NULL,NULL,'unreviewed','draft','obs_src_sb_thirdweb',NULL,'Current stake and governance unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sb_huel',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'organization','Huel Ltd','director_and_financial_interest',NULL,NULL,'unreviewed','draft','obs_src_sb_asa_huel',NULL,'Stake size unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sb_zoe',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'organization','ZOE Ltd','investor',NULL,NULL,'unreviewed','draft','obs_src_sb_asa_guide',NULL,'Investment economics unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_sb_flight_formed',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'company_formation','Flight Story entities formed','Flight Story corporate entities enter the UK registry.','2021-01-01T00:00:00Z','year','unreviewed','draft','obs_src_sb_ch_group',NULL,'Registry chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sb_thirdweb',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'financing','thirdweb Series A reported','Thirdweb raises $24 million at a reported $160 million valuation.','2022-08-25T00:00:00Z','day','unreviewed','draft','obs_src_sb_thirdweb',NULL,'Independent funding report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sb_asa',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'regulatory_decision','ASA upholds Huel complaint','ASA finds omission of Bartlett’s Huel directorship and financial interest misleading.','2024-08-14T00:00:00Z','day','unreviewed','draft','obs_src_sb_asa_huel',NULL,'Regulator decision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sb_restructure',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'corporate_restructuring','Flight Story capital actions and demerger','Registry records capital changes, share actions and a demerger process.','2025-05-21T00:00:00Z','day','unreviewed','draft','obs_src_sb_ch_group',NULL,'Registry filings',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sb_director_end',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'role_transition','Flight Story Group directorship ends','Bartlett ceases to be a filed director.','2025-10-21T00:00:00Z','day','unreviewed','draft','obs_src_sb_ch_group',NULL,'TM01',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_steven_bartlett_100','steven-bartlett-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'1.0.0','research/observatory/dossiers/steven-bartlett-1.0.0.md','bd5f53e14f48eec9f945319b87116287031b94bb',
'{"claimIds":["obs_claim_sb_c01","obs_claim_sb_c02","obs_claim_sb_c03","obs_claim_sb_c04","obs_claim_sb_c05","obs_claim_sb_c06","obs_claim_sb_c07","obs_claim_sb_c08"],"relationshipIds":["obs_rel_sb_flight","obs_rel_sb_yonchev","obs_rel_sb_thirdweb","obs_rel_sb_huel","obs_rel_sb_zoe"],"eventIds":["obs_event_sb_flight_formed","obs_event_sb_thirdweb","obs_event_sb_asa","obs_event_sb_restructure","obs_event_sb_director_end"],"observationIds":[],"limitations":["saturation_open","multi_entity_cap_tables_incomplete","directorship_not_ownership","fund_economics_unavailable","platform_and_ip_rights_incomplete","distributed_labor_incomplete","adverse_claims_separately_attributed","role_built_false","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.84,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_steven_bartlett_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='steven-bartlett' LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_steven_bartlett_100',
'{"packageId":"steven-bartlett-1.0.0","claimsLoaded":8,"relationshipsLoaded":5,"eventsLoaded":5,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Public-evidence package imported as draft. Ownership, governance, IP, labor, fund economics, causality, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
