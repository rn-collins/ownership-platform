-- Suzie Reider expanded public-evidence review package 1.1.0.
-- Draft only. Preserves 1.0.0 and does not publish, verify, score, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_sr_s07','https://marketingsherpa.com/article/wrap-up/tech-new-york-wrapup-notes','Ad:Tech New York wrap-up notes','MarketingSherpa','journalism','2006-11-13T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s08','https://www.flickr.com/photos/toprankblog/1903724523/','Ad:Tech keynote event record','TopRank Marketing','event_record','2007-11-07T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s09','https://www.ana.net/conference/show/id/MLC-MAR14','2014 ANA Media Leadership Conference','Association of National Advertisers','event_record','2014-03-01T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s10','https://www.adexchanger.com/online-advertising/waze-ads-head-suzie-reider-sets-her-sights-on-qsr-retail-and-fuel/','Waze Ads Head Suzie Reider Sets Her Sights On QSR, Retail And Fuel','AdExchanger','first_person_interview','2018-05-10T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s11','https://medium.com/waze-for-brands/driving-forward-5e14deb45c58','Driving Forward','Waze Ads','first_person','2019-02-01T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s12','https://www.modernretail.co/retailers/wazes-suzie-reider-on-the-return-of-road-traffic-and-the-retailers-that-depend-on-it/','Waze’s Suzie Reider on the return of road traffic','Modern Retail','first_person_interview','2020-11-05T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s13','https://www.lyft.com/blog/posts/lyft-media-introduces-new-ad-solutions-to-engage-riders-on-the-move','Lyft Media introduces new ad solutions','Lyft','company_record','2025-06-12T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s14','https://www.axios.com/2025/06/12/lyft-ads-sponsored-rides','Exclusive: Lyft launches new ad formats','Axios','journalism','2025-06-12T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s15','https://www.linkedin.com/posts/suziereider_about-marketingads-for-a-long-activity-7348756437952581635-f4Z5','Suzie Reider on Lyft, YouTube, Waze and Sephora activation','Suzie Reider','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s16','https://www.linkedin.com/posts/suziereider_work-rides-just-got-more-rewarding-with-lyft-activity-7358279749674192900-tUVV','Suzie Reider on Lyft Business Rewards','Suzie Reider','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s17','https://www.sec.gov/Archives/edgar/data/1759509/000175950925000126/lyft-20250630.htm','Lyft 2025 Q2 Form 10-Q','U.S. Securities and Exchange Commission','regulatory_filing','2025-08-08T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s18','https://www.sec.gov/Archives/edgar/data/1759509/000162828026006960/lyft-20251231.htm','Lyft 2025 Form 10-K','U.S. Securities and Exchange Commission','regulatory_filing','2026-02-13T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_sr_110_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'youtube_cmo','A contemporaneous November 2006 report identifies Reider as YouTube CMO, and her 2019 essay says she joined YouTube as CMO in 2006.','operating_authority','observed','unreviewed',NULL,'Contemporaneous and first-person records identify Suzie Reider as YouTube CMO in 2006.','The exact start date and complete remit are not established.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'youtube_ad_sales','A contemporaneous November 2007 event record identifies Reider as YouTube head of ad sales.','operating_authority','observed','unreviewed',NULL,'A contemporaneous 2007 event record identifies Reider as YouTube head of ad sales.','Title wording, boundaries and precise transition from CMO require original records.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'google_brand_solutions','A 2014 ANA conference record identifies Reider as Google Managing Director, Brand Solutions—North America.','operating_authority','observed','unreviewed',NULL,'In 2014, an ANA conference record identified Reider as Google Managing Director, Brand Solutions—North America.','The record does not establish start or end dates or complete authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'waze_operating_role','In a 2018 interview Reider was identified as Waze head of ads in North America and discussed advertiser relationships, product collaboration, vertical focus and team hiring.','operating_authority','observed','unreviewed',NULL,'A 2018 interview documents Reider leading Waze ads in North America and publicly describing product, advertiser and team priorities.','The interview does not establish audited results or unilateral authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'waze_global_ads','A 2020 interview identifies Reider as managing director of global ads at Waze and records her discussion of pandemic advertising operations.','operating_authority','observed','unreviewed',NULL,'By 2020, an interview identified Reider as managing director of global ads at Waze.','Company observations in the interview are not person-level performance measures.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'lyft_media_products','Lyft announced three advertising formats in June 2025 and attributed a product-strategy statement to Reider; Axios independently reported the formats and interviewed her.','role_formation','observed','unreviewed',NULL,'During Reider’s Lyft tenure, Lyft announced Sponsored Map Vehicles, Sponsored Rides by Mode and Vertical Video.','Tenure and attributed statements do not prove personal origination or sole delivery.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'institutional_context','Lyft regulatory filings describe its advertising business as nascent and subject to advertiser, product, measurement, privacy, platform and adoption risks.','employer_platform_dependence','observed','unreviewed',NULL,'Lyft’s filings describe its advertising business as nascent and identify material operating risks.','Company-level disclosure is context and is not attributable to Reider personally.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'campaign_collaboration','Reider publicly described a Lyft, Sephora and Digitas activation, named collaborators and contrasted Lyft’s building environment with Google.','collaboration_infrastructure','observed','unreviewed',NULL,'Reider publicly documented named cross-company collaboration on a Lyft and Sephora activation.','Campaign metrics are self-reported and causal credit is not allocated.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'business_rewards','Reider publicly connected joining Lyft with its business-travel opportunity and promoted the Lyft Business Rewards launch.','role_formation','observed','unreviewed',NULL,'Reider publicly connected her Lyft role with business travel and participated in communicating the Lyft Business Rewards launch.','The post does not establish product authorship, decision rights or performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_110_c13',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'longitudinal_function_mobility','The record documents roles spanning marketing, advertising sales, brand solutions, Waze advertising and revenue, and Lyft Media and Business.','institutional_portability','classified','unreviewed',NULL,'The reviewed record supports studying Reider’s movement across platform-commercial functions.','This is a researcher classification, not proof of identical responsibilities or effectiveness.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_sr110_c02_s07','obs_claim_sr_110_c02','obs_src_sr_s07','supports',NULL,'2006 conference report','Contemporaneous title evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c02_s11','obs_claim_sr_110_c02','obs_src_sr_s11','supports',NULL,'First-person career reference','Corroborates year and title as self-report.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c03_s08','obs_claim_sr_110_c03','obs_src_sr_s08','supports',NULL,'Event caption dated 2007-11-07','Contemporaneous title evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c04_s09','obs_claim_sr_110_c04','obs_src_sr_s09','supports',NULL,'Conference speaker listing','Contemporaneous title evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c06_s10','obs_claim_sr_110_c06','obs_src_sr_s10','supports',NULL,'Edited interview','First-person operating account with publisher framing.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c07_s12','obs_claim_sr_110_c07','obs_src_sr_s12','supports',NULL,'Podcast article and edited highlights','Role and operating-context evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c09_s13','obs_claim_sr_110_c09','obs_src_sr_s13','supports',NULL,'Product announcement','Company product and attributed-statement evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c09_s14','obs_claim_sr_110_c09','obs_src_sr_s14','supports',NULL,'Independent report and interview','Independent product corroboration.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c10_s17','obs_claim_sr_110_c10','obs_src_sr_s17','supports',NULL,'Risk factors','Company legal context, not person-level attribution.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c10_s18','obs_claim_sr_110_c10','obs_src_sr_s18','supports',NULL,'Advertising-platform risk factors','Continuing company context.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c11_s15','obs_claim_sr_110_c11','obs_src_sr_s15','supports',NULL,'Professional post','First-person account; metrics remain self-reported.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c12_s16','obs_claim_sr_110_c12','obs_src_sr_s16','supports',NULL,'Professional post','First-person launch participation.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c13_s07','obs_claim_sr_110_c13','obs_src_sr_s07','supports',NULL,'YouTube CMO record','One component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c13_s10','obs_claim_sr_110_c13','obs_src_sr_s10','supports',NULL,'Waze interview','One component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_sr110_c13_s13','obs_claim_sr_110_c13','obs_src_sr_s13','supports',NULL,'Lyft product announcement','One component of classified synthesis.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_sr110_youtube_cmo',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','YouTube','chief_marketing_officer','2006-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s07',NULL,'2006 contemporaneous report; stored date is year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr110_youtube_ads',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','YouTube','head_of_ad_sales','2007-11-07T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s08',NULL,'2007 event record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr110_google_brand',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Google','managing_director_brand_solutions_north_america','2014-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s09',NULL,'2014 conference record; stored date is year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr110_waze_ads_na',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Waze','head_of_ads_north_america','2018-05-10T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s10',NULL,'2018 interview snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr110_waze_global',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Waze','managing_director_global_ads','2020-11-05T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s12',NULL,'2020 interview snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_sr110_2006',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_snapshot','Reider identified as YouTube CMO','Contemporaneous conference report.','2006-11-13T00:00:00Z','day','unreviewed','draft','obs_src_sr_s07',NULL,'Article publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr110_2007',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_snapshot','Reider identified as YouTube head of ad sales','Contemporaneous event record.','2007-11-07T00:00:00Z','day','unreviewed','draft','obs_src_sr_s08',NULL,'Event record date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr110_2014',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_snapshot','Reider identified in Google Brand Solutions role','ANA conference listing.','2014-03-01T00:00:00Z','approximate','unreviewed','draft','obs_src_sr_s09',NULL,'Conference record; month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr110_2018',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'first_person_interview','Waze operating interview published','Edited interview on products, verticals, team and success criterion.','2018-05-10T00:00:00Z','day','unreviewed','draft','obs_src_sr_s10',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr110_2020',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'first_person_interview','Waze pandemic operating interview published','Interview on traffic, advertising and customer operations.','2020-11-05T00:00:00Z','day','unreviewed','draft','obs_src_sr_s12',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr110_2025_products',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'product_announcement','Lyft Media announces three ad formats','Announcement during Reider tenure; personal origination is not inferred.','2025-06-12T00:00:00Z','day','unreviewed','draft','obs_src_sr_s13',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_suzie_reider_110','suzie-reider-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'1.1.0',
'research/observatory/dossiers/suzie-reider-1.1.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_sr_c01","obs_claim_sr_110_c02","obs_claim_sr_110_c03","obs_claim_sr_110_c04","obs_claim_sr_c05","obs_claim_sr_110_c06","obs_claim_sr_110_c07","obs_claim_sr_c06","obs_claim_sr_110_c09","obs_claim_sr_110_c10","obs_claim_sr_110_c11","obs_claim_sr_110_c12"],"relationshipIds":["obs_rel_sr_r01","obs_rel_sr110_youtube_cmo","obs_rel_sr110_youtube_ads","obs_rel_sr110_google_brand","obs_rel_sr110_waze_ads_na","obs_rel_sr110_waze_global","obs_rel_sr_r05"],"eventIds":["obs_event_sr110_2006","obs_event_sr110_2007","obs_event_sr110_2014","obs_event_sr110_2018","obs_event_sr110_2020","obs_event_sr_e02","obs_event_sr_e03","obs_event_sr110_2025_products"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","original_google_youtube_formation_record_missing","title_transition_dates_incomplete","derivative_sources_clustered","individual_causal_outcomes_unverified","decision_rights_unverified","personal_ownership_unmeasured","psychological_attributes_unmeasured","classified_syntheses_excluded_from_auto_publication"]}'::jsonb,
0.84,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_suzie_package_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_suzie_reider_110',
'{"packageId":"suzie-reider-1.1.0","sourcesAdded":12,"claimsAdded":10,"claimsInPublicationManifest":12,"relationshipsAdded":5,"eventsAdded":6,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Expanded evidence package imported as draft. Version 1.0.0 remains immutable. Classified syntheses are excluded and no saturation decision has been recorded.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
