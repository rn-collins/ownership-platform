-- Suzie Reider public-evidence review package 1.2.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Commercial platform executive with documented formation and leadership work across YouTube, Google, Waze and Lyft.',
    "summary"='A bounded public-evidence case separating contemporaneous role and group-formation records from sole causation, ownership, company-level performance and psychology.',
    "inclusionRationale"='Tests professional institution building inside employer-owned platform systems while preserving team, authority, ownership and causal boundaries.',
    "roleBuiltFlag"=false,
    "verificationStatus"='in_review',
    "evidenceCoverage"=0.91,
    "publicStatus"='draft',
    "updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='suzie-reider';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_sr12_s06','https://www.chiefmarketer.com/youtube-gets-cmo/','YouTube Gets CMO','Chief Marketer','contemporaneous_trade_reporting','2006-09-29T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s07','https://www.chiefmarketer.com/live-from-adtech-youtube-cmo-others-ponder-online-video/','Live from AdTech: YouTube CMO','Chief Marketer','contemporaneous_interview_reporting','2006-11-08T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s09','https://techcrunch.com/2011/06/24/funny-video-youtube-project-spaghetti-tim-armstrong-suzie-reider/','Project Spaghetti and YouTube advertising integration','TechCrunch','independent_reporting','2011-06-24T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s10','https://www.prnewswire.com/news-releases/six-digital-industry-leaders-join-forces-to-create-the-first-digital-content-newfronts-as-us-2012-online-ad-spend-forecast-to-hit-395-billion-140008693.html','Digital Content NewFronts formation','Digital Content NewFronts / PR Newswire','consortium_release','2012-02-23T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s15','https://sites.middlebury.edu/middblogs/2023/04/04/check-out-the-recorded-leaders-in-technology-discuss-the-future-panel-with-jennifer-bailey-84-suzie-reider-87-and-lan-ye-98-in-the-next-middvantage-exploring-careers-in-t/','Leaders in Technology panel biography','Middlebury College','institutional_biography','2023-04-04T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s18','https://www.forbes.com/sites/shelleykohan/2025/07/01/sephora-takes-on-prime-day-shopping-with-lyft-partnership/','Sephora and Lyft activation','Forbes','independent_reporting','2025-07-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s19','https://mmaglobal.com/about/board-of-directors/media-data-board','MMA Media and Data Board','MMA Global','trade_association_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s21','https://investor.lyft.com/news-events-presentations/press-releases/detail/197/lyft-reports-strong-q1-2026-financial-results','Lyft Q1 2026 results','Lyft Investor Relations','issuer_financial_release','2026-05-07T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr12_s22','https://www.investing.com/news/transcripts/earnings-call-transcript-lyft-q1-2026-shows-revenue-beat-eps-miss-93CH-4670951','Lyft Q1 2026 earnings call transcript','Investing.com','earnings_call_transcript_mirror','2026-05-07T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_sr12_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'formal_role','Contemporaneous September 2006 reports identify Reider as YouTube''s first CMO.','role_formation','observed','unreviewed',NULL,'Contemporaneous trade reports identified Reider as YouTube''s first chief marketing officer in September 2006.','One outlet said YouTube had not confirmed the appointment by press time.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization_formation','A November 2006 report says Reider joined YouTube to build its sales and marketing groups.','institution_building','observed','unreviewed',NULL,'A contemporaneous 2006 report said Reider joined YouTube to build its sales and marketing groups.','Formation responsibility does not establish sole creation or ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'team_context','A Reider-led YouTube sales team operated amid Google-wide advertising-process integration.','distributed_leadership','observed','unreviewed',NULL,'YouTube advertising development involved a Reider-led team and Google integration.','The reported internal artifact is not a complete authority map.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_evolution','Records identify Reider in industry-development, brand-solutions, Waze advertising and revenue roles over time.','institutional_portability','observed','unreviewed',NULL,'Reider''s public role record spans several commercial functions across Google and Waze.','Waze titles require chronological treatment; exact transitions remain incomplete.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'lyft_preexisting_system','Lyft Media existed before Reider''s December 2024 appointment.','claim_restriction','observed','unreviewed',NULL,'Reider joined and led a pre-existing Lyft media business.','Do not attribute pre-appointment formation or results to her.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'current_role','Current 2026 records identify Reider as EVP, Lyft Media and Business.','formal_authority','observed','unreviewed',NULL,'Current public records identify Reider as EVP, Lyft Media and Business.','Title does not establish ownership or unilateral authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'product_and_campaign_context','Lyft released ad products and participated in named campaigns during Reider''s tenure.','resource_assembly','observed','unreviewed',NULL,'Products and campaigns were released during Reider''s Lyft tenure.','Tenure does not prove sole authorship or causal performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'financial_boundary','Lyft financial disclosures are company-level evidence, not person-level performance measures.','claim_restriction','observed','unreviewed',NULL,'Lyft''s filings provide institutional context only.','Do not assign company results to Reider without person-level causal evidence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'bounded_classification','The record supports studying Reider as a professional institution-building case inside employer-owned platforms.','institution_building','interpretive','unreviewed',NULL,'The public record supports a bounded institution-building classification.','Exclude from automatic publication; no sole causation, ownership or unique-role inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_built_boundary','The public record does not establish that an employer created a unique role around Reider.','claim_restriction','observed','unreviewed',NULL,'Role-built status remains false.','Emerging-function work is not proof of a uniquely designed role.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr12_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'psychology_boundary','No reviewed source measures Reider''s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships and outputs, not psychology.','Do not infer motivation, identity, confidence, cognition or resilience.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_sr12_c01','obs_claim_sr12_c01','obs_src_sr12_s06','supports',NULL,'September 2006 appointment report','Reported first CMO; confirmation caveat retained.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c02','obs_claim_sr12_c02','obs_src_sr12_s07','supports',NULL,'November 2006 AdTech report','Contemporaneous group-formation language.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c03','obs_claim_sr12_c03','obs_src_sr12_s09','qualifies',NULL,'Project Spaghetti report','Team and integration context complicates sole-causation claim.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c04a','obs_claim_sr12_c04','obs_src_sr12_s10','supports',NULL,'NewFronts steering committee title','2012 title evidence.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c04b','obs_claim_sr12_c04','obs_src_sr12_s15','qualifies',NULL,'Middlebury career chronology','Attributed transition and P&L biography.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c06','obs_claim_sr12_c06','obs_src_sr12_s19','supports',NULL,'Current board roster','Current title snapshot.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c07','obs_claim_sr12_c07','obs_src_sr12_s18','supports',NULL,'Sephora activation','Partnered campaign during tenure.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c08','obs_claim_sr12_c08','obs_src_sr12_s21','qualifies',NULL,'Q1 2026 company results','Institutional context; no individual attribution.',CURRENT_TIMESTAMP),
('obs_ev_sr12_c09','obs_claim_sr12_c09','obs_src_sr12_s07','qualifies',NULL,'Formation role evidence','Bounded classification only.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_sr12_youtube',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','YouTube','reported_first_cmo_and_sales_marketing_builder','2006-09-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr12_s07',NULL,'Exact end and title transitions incomplete',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr12_google',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Google','commercial_executive',NULL,NULL,'unreviewed','draft','obs_src_sr12_s10',NULL,'17/18-year wording varies by source date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr12_waze',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Waze','advertising_and_revenue_leader','2017-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr12_s15',NULL,'Exact title transitions incomplete',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr12_lyft',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Lyft','evp_media_and_business','2024-12-10T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr12_s19',NULL,'No equity or compensation evidence',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr12_mma',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','MMA Media + Data Board','board_member',NULL,NULL,'unreviewed','draft','obs_src_sr12_s19',NULL,'Current association record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr12_sephora',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Sephora','lyft_media_campaign_partner','2025-07-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr12_s18',NULL,'Campaign-level relationship, not personal ownership',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_sr12_first_cmo',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'appointment','Reported as YouTube first CMO','Contemporaneous report with company-confirmation caveat.','2006-09-29T00:00:00Z','day','unreviewed','draft','obs_src_sr12_s06',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr12_groups',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization_formation','Sales and marketing group formation reported','Contemporaneous report says Reider joined to build the groups.','2006-11-08T00:00:00Z','day','unreviewed','draft','obs_src_sr12_s07',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr12_integration',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'integration','YouTube advertising-process integration context','Later reporting describes a Reider-led team within Google integration.','2008-01-01T00:00:00Z','year','unreviewed','draft','obs_src_sr12_s09',NULL,'Artifact year',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr12_newfronts',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'industry_initiative','Digital Content NewFronts formation','Reider listed for Google/YouTube as Global Head of Industry Development.','2012-02-23T00:00:00Z','day','unreviewed','draft','obs_src_sr12_s10',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr12_sephora',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'campaign','Sephora and Lyft activation','Named campaign during Reider tenure.','2025-07-01T00:00:00Z','day','unreviewed','draft','obs_src_sr12_s18',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr12_q1_2026',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'company_context','Lyft Q1 2026 results','Company context only; no person-level causal attribution.','2026-05-07T00:00:00Z','day','unreviewed','draft','obs_src_sr12_s21',NULL,'Release date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_suzie_reider_120','suzie-reider-1.2.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'1.2.0','research/observatory/dossiers/suzie-reider-1.2.0.md','pending-runtime-content-hash',
'{"newClaimIds":["obs_claim_sr12_c01","obs_claim_sr12_c02","obs_claim_sr12_c03","obs_claim_sr12_c04","obs_claim_sr12_c05","obs_claim_sr12_c06","obs_claim_sr12_c07","obs_claim_sr12_c08"],"excludedInterpretiveClaimIds":["obs_claim_sr12_c09"],"methodBoundaryClaimIds":["obs_claim_sr12_c10","obs_claim_sr12_c11"],"newRelationshipIds":["obs_rel_sr12_youtube","obs_rel_sr12_google","obs_rel_sr12_waze","obs_rel_sr12_lyft","obs_rel_sr12_mma","obs_rel_sr12_sephora"],"newEventIds":["obs_event_sr12_first_cmo","obs_event_sr12_groups","obs_event_sr12_integration","obs_event_sr12_newfronts","obs_event_sr12_sephora","obs_event_sr12_q1_2026"],"limitations":["saturation_incomplete","special_sauce_full_transcript_unavailable","original_google_youtube_personnel_records_unavailable","internal_authority_unavailable","sole_causation_not_supported","lyft_media_preexisting","ownership_unmeasured","psychology_unmeasured"]}'::jsonb,
0.91,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_suzie_reider_120',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_suzie_reider_120',
'{"packageId":"suzie-reider-1.2.0","sourcesReviewed":22,"newSourcesLoaded":9,"newClaimsLoaded":11,"newRelationshipsLoaded":6,"newEventsLoaded":6,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package adds contemporaneous 2006 formation evidence, team and Google-integration context, title evolution, current 2026 role evidence, campaign evidence and explicit causal, ownership, role-built and psychology boundaries.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
