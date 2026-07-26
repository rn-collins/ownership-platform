-- Kenny Gold expanded public-evidence review package 1.1.0.
-- Preserves 1.0.0. Draft only: no publication, verification, scoring or saturation decision.

UPDATE "ObservatoryCase"
SET "headline"='Agency executive appointed to successive newly created social and creator leadership roles at Deloitte Digital and Edelman',
    "summary"='A public-evidence case separating employer-created executive roles, practice building, collaborative campaigns and knowledge production from personal ownership and unsupported global firstness.',
    "roleBuiltFlag"=false,
    "verificationStatus"='in_review',
    "evidenceCoverage"=0.84,
    "updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='kenny-gold';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_kg_s09','https://www.deloitte.com/us/en/services/consulting/articles/creator-economy-growth-and-trends.html','Social platform creator growth drivers','Deloitte','employer_research','2024-01-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s10','https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/social-commerce-strategy.html','Social commerce and the creator economy','Deloitte','employer_research','2023-01-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s11','https://www.wpp.com/case-studies/grey---p_g-distancedance','Grey: P&G DistanceDance','WPP','parent_company_case_study','2020-04-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s12','https://www.adweek.com/agencies/pg-teamed-up-with-tiktok-star-charli-damelio-to-create-a-dance-challenge-for-social-distancing/','TikTok star Charli D’Amelio and P&G create DistanceDance','Adweek','independent_trade_reporting','2020-04-07T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s13','https://www.prweek.com/article/1679533/p-g-tiktok-grey-make-difference-distancedance-campaign','P&G, TikTok and Grey make a difference with DistanceDance','PRWeek','independent_trade_reporting','2020-04-06T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s14','https://www.forbes.com/sites/kimberlywhitler/2021/10/23/leveraging-influencers-to-drive-growth-insight-from-managing-director-of-deloitte-digital/','Leveraging influencers to drive growth: interview with Kenny Gold','Forbes','reported_interview','2021-10-23T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s15','https://www.prweek.com/article/1960080/edelman-hires-first-global-chief-creator-officer','Edelman hires first global chief creator officer','PRWeek','independent_trade_reporting','2026-06-02T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s16','https://www.odwyerpr.com/story/public/24835/2026-06-02/move-edelman-names-first-global-chief-creator-officer.html','Edelman names first Global Chief Creator Officer','O’Dwyer’s','independent_trade_reporting','2026-06-02T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_kg11_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'edelman_appointment','Edelman appointed Gold Global Chief Creator Officer in June 2026.','role_formation','observed','unreviewed',NULL,'Edelman appointed Kenny Gold Global Chief Creator Officer in June 2026.','Appointment alone does not establish tenure, compensation, performance, control or ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'employer_specific_firstness','Edelman describes the newly created position as its first-ever Global Chief Creator Officer role.','claim_restriction','observed','unreviewed',NULL,'Gold is Edelman’s first publicly announced Global Chief Creator Officer.','Global describes title and remit; evidence does not establish world or industry firstness.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'edelman_remit','Edelman assigned Gold global leadership of Edelman Creator across creator, social, paid and performance and a reporting line to Tristan Roy.','operating_authority','observed','unreviewed',NULL,'Edelman’s announcement gives Gold a global creator mandate spanning social, paid and performance and identifies his reporting line.','No public budget, P&L, hiring, veto or delivered-outcome evidence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'existing_foundation','Gold described joining an existing foundation and team; Edelman reported approximately 200 creator specialists globally.','institution_building','observed','unreviewed',NULL,'Gold joined an existing Edelman creator organization rather than founding it from zero.','Employer-reported 200-person figure is not a direct-report count.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'deloitte_appointment','Deloitte Digital appointed Gold managing director and first Head of Social, Content and Influencer in 2021.','role_formation','observed','unreviewed',NULL,'Deloitte Digital appointed Gold managing director and its first Head of Social, Content and Influencer in 2021.','Firstness is employer- and exact-function-specific.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'practice_building_attribution','Edelman and trade coverage state that Gold built Deloitte Digital’s social and creator practice from the ground up.','institution_building','observed','unreviewed',NULL,'Edelman credits Gold with building Deloitte Digital’s social and creator practice.','Retain attribution; operating baseline, staffing, revenue, margin and sole causation are not independently verified.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'knowledge_production','Deloitte identifies Gold as co-author or contact across creator-economy research using survey, interview, panel and public-data inputs.','knowledge_infrastructure','observed','unreviewed',NULL,'Gold contributed to Deloitte creator-economy research and its translation into client-facing frameworks.','Not sole authorship or independent academic validation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'grey_role','Employer and institutional biographies document Gold as Executive Director of Social Media at Grey Group North America.','portfolio_breadth','observed','unreviewed',NULL,'Before Deloitte, Gold led agency-wide social-media work at Grey Group North America.','Exact start and end dates and full decision rights remain unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'campaign_contribution','WPP and independent reporting document Grey, P&G, TikTok and Charli D’Amelio as DistanceDance collaborators and quote Gold for Grey.','collaborative_output','observed','unreviewed',NULL,'Gold participated in Grey’s work on P&G’s multi-party DistanceDance campaign.','Do not assign sole creation, views, donations, behavior change or causal effects to Gold.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'professional_institution_building','The record shows operation through employer-created roles, practice formation, collaborative campaigns and knowledge products.','portfolio_architecture','interpretive','unreviewed',NULL,'Gold’s case illustrates professional institution-building without personal ownership of the employing institutions.','Interpretive only; not an Ownership or Portfolio Professional score.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'ownership_boundary','No reviewed source shows Gold owned Edelman, Deloitte Digital, Grey or their creator practices.','control_rights','observed','unreviewed',NULL,'The documented mechanism is delegated professional authority, not personal ownership.','Absence of public evidence does not rule out private compensation-linked equity or contractual rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg11_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'psychology_boundary','No reviewed source measures Gold’s motivation, risk tolerance, identity, cognition or other psychological construct.','claim_restriction','observed','unreviewed',NULL,'The case documents roles, outputs and institutional relationships; it does not measure psychology.','No psychological inference is permissible from career chronology or titles.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_kg11_c01_a','obs_claim_kg11_c01','obs_src_kg_s01','supports',NULL,'Appointment announcement','Primary employer record.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c01_b','obs_claim_kg11_c01','obs_src_kg_s03','supports',NULL,'First-person announcement','Corroborates appointment.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c02_a','obs_claim_kg11_c02','obs_src_kg_s01','supports',NULL,'Newly created role','Employer-specific firstness.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c02_b','obs_claim_kg11_c02','obs_src_kg_s15','supports',NULL,'Appointment report','Independent contemporaneous corroboration.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c03','obs_claim_kg11_c03','obs_src_kg_s01','supports',NULL,'Mandate and reporting line','Announced authority.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c04_a','obs_claim_kg11_c04','obs_src_kg_s03','supports',NULL,'Existing foundation statement','First-person boundary against founder inference.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c04_b','obs_claim_kg11_c04','obs_src_kg_s01','supports',NULL,'Specialist count','Employer-reported organizational scale.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c05_a','obs_claim_kg11_c05','obs_src_kg_s04','supports',NULL,'Deloitte biography','Employer record.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c05_b','obs_claim_kg11_c05','obs_src_kg_s07','supports',NULL,'2021 appointment report','Independent contemporaneous record.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c06','obs_claim_kg11_c06','obs_src_kg_s01','supports',NULL,'Prior-role description','Employer-attributed practice-building claim.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c07_a','obs_claim_kg11_c07','obs_src_kg_s06','supports',NULL,'Creator Economy in 3D page','Research association.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c07_b','obs_claim_kg11_c07','obs_src_kg_s09','supports',NULL,'Methods and citation notes','Documents co-authorship citation and methods.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c07_c','obs_claim_kg11_c07','obs_src_kg_s10','supports',NULL,'Named contact and study citations','Research-to-practice surface.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c08','obs_claim_kg11_c08','obs_src_kg_s04','supports',NULL,'Prior-role biography','Employer chronology.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c09_a','obs_claim_kg11_c09','obs_src_kg_s11','supports',NULL,'Campaign case','Documents multi-party campaign.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c09_b','obs_claim_kg11_c09','obs_src_kg_s12','supports',NULL,'Contemporaneous quote','Documents Gold as Grey spokesperson/contributor.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c09_c','obs_claim_kg11_c09','obs_src_kg_s13','qualifies',NULL,'Campaign development','Reinforces multi-party attribution.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c10','obs_claim_kg11_c10','obs_src_kg_s01','qualifies',NULL,'Career description','Component of interpretive synthesis only.',CURRENT_TIMESTAMP),
('obs_ev_kg11_c11','obs_claim_kg11_c11','obs_src_kg_s01','qualifies',NULL,'Employment appointment','Documents employment authority, not ownership.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_kg11_edelman',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Edelman','global_chief_creator_officer','2026-06-02T00:00:00Z',NULL,'unreviewed','draft','obs_src_kg_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_creator',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Edelman Creator','global_lead','2026-06-02T00:00:00Z',NULL,'unreviewed','draft','obs_src_kg_s01',NULL,'Existing team; announced remit',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_roy',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'person','Tristan Roy','announced_reporting_line','2026-06-02T00:00:00Z',NULL,'unreviewed','draft','obs_src_kg_s01',NULL,'Reporting relationship may change',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_deloitte',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Deloitte Digital','former_managing_director_and_head','2021-08-06T00:00:00Z','2026-05-01T00:00:00Z','unreviewed','draft','obs_src_kg_s04',NULL,'Departure month approximate',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_grey',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Grey Group North America','former_executive_director_social_media',NULL,'2021-08-06T00:00:00Z','unreviewed','draft','obs_src_kg_s04',NULL,'Start date unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_campaign',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'campaign','P&G DistanceDance','agency_side_contributor','2020-03-01T00:00:00Z','2020-04-30T00:00:00Z','unreviewed','draft','obs_src_kg_s12',NULL,'Multi-party work; date range approximate',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg11_research',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'asset','Creator Economy in 3D','coauthor_and_contact','2022-01-01T00:00:00Z','2026-05-01T00:00:00Z','unreviewed','draft','obs_src_kg_s09',NULL,'Collaborative employer research',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_kg11_distance',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'campaign_launch','DistanceDance launches','Multi-party P&G, Grey, TikTok and Charli D’Amelio collaboration.','2020-03-24T00:00:00Z','day','unreviewed','draft','obs_src_kg_s13',NULL,'Launch timing from contemporaneous coverage',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg11_deloitte',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'executive_appointment','Deloitte Digital appoints first Head of Social, Content and Influencer','Employer-specific exact-function firstness.','2021-08-06T00:00:00Z','day','unreviewed','draft','obs_src_kg_s07',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg11_research',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'research_publication','Creator Economy in 3D research program documented','Collaborative employer research, not academic validation.','2022-01-01T00:00:00Z','year','unreviewed','draft','obs_src_kg_s09',NULL,'Year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg11_departure',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'role_transition','Gold publicly marks departure from Deloitte','Exact final employment date unresolved.','2026-05-01T00:00:00Z','month','unreviewed','draft','obs_src_kg_s03',NULL,'First-person transition context',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg11_edelman',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'executive_appointment','Edelman appoints Global Chief Creator Officer','New Edelman role; not a global-industry first.','2026-06-02T00:00:00Z','day','unreviewed','draft','obs_src_kg_s01',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_kenny_gold_110','kenny-gold-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'1.1.0',
'research/observatory/dossiers/kenny-gold-1.1.0.md','pending-runtime-content-hash',
'{"supersedes":"kenny-gold-1.0.0","claimIds":["obs_claim_kg11_c01","obs_claim_kg11_c02","obs_claim_kg11_c03","obs_claim_kg11_c04","obs_claim_kg11_c05","obs_claim_kg11_c06","obs_claim_kg11_c07","obs_claim_kg11_c08","obs_claim_kg11_c09","obs_claim_kg11_c11"],"relationshipIds":["obs_rel_kg11_edelman","obs_rel_kg11_creator","obs_rel_kg11_roy","obs_rel_kg11_deloitte","obs_rel_kg11_grey","obs_rel_kg11_campaign","obs_rel_kg11_research"],"eventIds":["obs_event_kg11_distance","obs_event_kg11_deloitte","obs_event_kg11_research","obs_event_kg11_departure","obs_event_kg11_edelman"],"observationIds":[],"excludedInterpretiveClaimIds":["obs_claim_kg11_c10"],"methodBoundaryClaimIds":["obs_claim_kg11_c12"],"limitations":["saturation_decision_not_yet_recorded","global_and_industry_firstness_rejected","firstness_limited_to_edelman","role_created_not_role_built_around_person","existing_edelman_capability_predated_appointment","specialist_count_not_direct_reports","deloitte_practice_metrics_unverified","campaign_is_multi_party","ownership_and_equity_terms_unverified","decision_rights_and_budget_unverified","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.84,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_kenny_package_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_kenny_gold_110',
'{"packageId":"kenny-gold-1.1.0","supersedes":"kenny-gold-1.0.0","sourcesAdded":8,"claimsAdded":12,"claimsInPublicationManifest":10,"relationshipsAdded":7,"eventsAdded":5,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Expanded draft corrects firstness to Edelman-specific, distinguishes a newly created title from an existing creator capability, preserves collaborative campaign attribution, and separates professional authority from ownership.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
