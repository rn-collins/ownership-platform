-- Jack Conte and Claire Zau Observatory review packages 1.0.0.
-- Draft evidence records only. This migration does not publish or verify either case.

INSERT INTO "ObservatoryCase" (
"id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary","inclusionRationale",
"roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus","publicStatus","createdAt","updatedAt"
) VALUES
('obs_case_jack_conte','jack-conte','Jack Conte','creator','Creator economy and platforms','United States',
'Musician, Patreon cofounder, and CEO who helped turn a creator-payment problem into platform infrastructure',
'A public-evidence case concerning creator origin, platform cofounding, executive authority, outside financing, company-stated scale, and current organizational decisions.',
'Selected for Batch 1 to examine a creator who co-founded a platform used by other creators while preserving governance, ownership, and outcome limits.',
true,'in_review',0.78,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_case_claire_zau','claire-zau','Claire Zau','professional','Venture capital, AI, and media','United States',
'Early-stage investor combining venture work with new-media strategy and public AI communication',
'A public-evidence case concerning early-stage investing, firm media strategy, podcast hosting, prior AI investment coverage, and public knowledge production.',
'Selected for Batch 1 to examine an investor-media role while separating official mandate from unsupported deal attribution and investment performance.',
false,'in_review',0.70,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET
"headline"=EXCLUDED."headline","summary"=EXCLUDED."summary","inclusionRationale"=EXCLUDED."inclusionRationale",
"roleBuiltFlag"=EXCLUDED."roleBuiltFlag","verificationStatus"='in_review',
"evidenceCoverage"=EXCLUDED."evidenceCoverage","updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource" (
"id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt"
) VALUES
('obs_src_jc_s01','https://www.patreon.com/about','The story of Patreon','Patreon','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s02','https://news.patreon.com/articles/patreon-will-take-membership-to-the-next-level-with-60-m-in-funding','Patreon will take membership to the next level with $60M in funding','Patreon','company_record','2019-07-16T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s03','https://www.patreon.com/jackconte/posts/painful-update-164628951','A Painful Update about our Team','Jack Conte / Patreon','first_person','2026-07-23T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s04','https://www.patreon.com/patreon/posts/introducing-on-156303474','Introducing a network built on connection, not attention','Patreon','company_record','2026-04-28T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s05','https://www.theverge.com/podcast/952607/patreon-ceo-jack-conte','Patreon CEO Jack Conte on supporting artists','The Verge','journalism','2026-06-22T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s06','https://www.wired.com/story/the-big-interview-podcast-jack-conte-patreon/','Patreon CEO Jack Conte interview','WIRED','journalism','2025-10-07T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jc_s07','https://www.patreon.com/posts/patreon-fee-read-15754209','Patreon fee changes','Patreon','company_record','2017-12-07T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s01','https://lsvp.com/team-member/claire-zau/','Claire Zau at Lightspeed','Lightspeed Venture Partners','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s02','https://www.linkedin.com/posts/lightspeed-venture-partners_claire-zau-has-spent-six-years-both-investing-activity-7460417180044623872-fZUl','Claire Zau joins Lightspeed as Investor and New Media','Lightspeed Venture Partners','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s03','https://x.com/clairejyz/status/2054650703231033494','Claire Zau first-person Lightspeed announcement','Claire Zau','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s04','https://gsv.ventures/our-team/','GSV Ventures team biography','GSV Ventures','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s05','https://asugsvsummit.com/leadership/claire-zau','Claire Zau leadership biography','ASU+GSV Summit','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s06','https://aieducation.substack.com/','GSV: AI & Education','Claire Zau','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s07','https://www.businessinsider.com/why-lightspeed-ventures-hired-first-creator-seed-investor-claire-zau-2026-5','There is a new type of VC in Silicon Valley: the creator-investor','Business Insider','journalism','2026-05-23T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cz_s08','https://edupreneurship.stanford.edu/resource/education-innovation-newsletters/','Education Innovation Newsletters','Stanford Accelerator for Learning','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim" (
"id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence",
"permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt"
) VALUES
('obs_claim_jc_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'creator_origin','Patreon’s official history traces its 2013 origin to musician Jack Conte seeking a direct fan-payment system.','organizational_ownership','observed','unreviewed',NULL,'Patreon publicly traces its 2013 origin to creator Jack Conte’s effort to build a direct fan-payment system.','The narrative does not establish sole causation, sole ownership, or the complete contribution of cofounder Sam Yam and others.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'founder_executive_role','Current Patreon records and interviews identify Conte as Patreon cofounder and CEO.','operating_authority','observed','unreviewed',NULL,'Jack Conte is documented as Patreon’s cofounder and CEO.','Titles do not establish equity percentage, board control, unilateral authority, or compensation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'outside_capital','Patreon announced a $60 million financing round in July 2019.','capital_structure','observed','unreviewed',NULL,'Patreon announced a $60 million financing round in 2019.','Do not infer Conte’s dilution, current valuation, investor control, profitability, or later capital structure.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'company_reported_scale','Patreon’s official about page reports more than 300,000 creators and more than $10 billion sent to creators since 2013.','platform_scale','observed','unreviewed',NULL,'Patreon currently reports more than 300,000 creators and more than $10 billion sent to creators since 2013.','Figures are company-reported, mutable, and unaudited here and do not measure individual creator outcomes.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organizational_restructuring','Conte announced a reduction of 93 roles, described as 20% of Patreon’s workforce, in July 2026.','organizational_dependency','observed','unreviewed',NULL,'In July 2026, Conte announced that Patreon would reduce its workforce by 93 positions, or approximately 20%.','The company account does not independently establish every cause or future effect.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jc_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'creator_platform_architecture','The record combines creator authorship, platform cofounding, executive authority, outside capital, creator-payment infrastructure, and restructuring responsibility.','institutional_architecture','classified','unreviewed',NULL,'The record supports studying Conte as a creator who became the cofounder and executive operator of creator-economy infrastructure.','This is an Observatory classification, not a score or causal finding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'partner_appointment','Lightspeed identifies Zau as Partner and New Media and a pre-seed and seed investor.','operating_authority','observed','unreviewed',NULL,'Claire Zau joined Lightspeed as a partner working across early-stage investing and new media.','The title does not establish carried interest, check-writing authority, investment committee rights, compensation, or portfolio outcomes.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'dual_mandate','Lightspeed says Zau helps shape new-media strategy while investing in early-stage companies.','role_formation','observed','unreviewed',NULL,'Lightspeed publicly defines Zau’s role as combining early-stage investing with new-media strategy.','Do not state that the role was uniquely created for her or that media reach causes investment access or returns.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'podcast_role','Lightspeed identifies Zau as a co-host of its weekly AI podcast Lightwork.','knowledge_infrastructure','observed','unreviewed',NULL,'Lightspeed identifies Zau as a co-host of its weekly AI podcast, Lightwork.','The sources do not establish podcast IP ownership, economics, production control, audience, or permanence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'prior_ai_investment_role','GSV and ASU+GSV identify Zau as Partner and AI Lead with responsibility for AI investment coverage.','institutional_portability','observed','unreviewed',NULL,'Before Lightspeed, GSV records identified Zau as Partner and AI Lead with responsibility for AI investment coverage.','The employer biography may be stale after departure and does not establish sole deal attribution, decision rights, or performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'knowledge_surface','Zau publishes the GSV: AI & Education newsletter, which Stanford lists in an education-innovation resource directory.','knowledge_infrastructure','observed','unreviewed',NULL,'Zau publishes an AI-and-education newsletter that Stanford includes in an education-innovation resource directory.','Subscriber counts, influence, independence from former-employer branding, and causal investment value are excluded.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'investor_creator_architecture','The record combines early-stage investing, firm media strategy, podcast hosting, and an independently authored newsletter.','institutional_architecture','classified','unreviewed',NULL,'The record supports studying Zau as an investor whose role includes public knowledge and media production.','This is a classification, not a score or evidence of investment performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence" (
"id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt"
) VALUES
('obs_ev_jc_c01_s01','obs_claim_jc_c01','obs_src_jc_s01','supports',NULL,'Official history','Company origin account; sole causation excluded.',CURRENT_TIMESTAMP),
('obs_ev_jc_c01_s05','obs_claim_jc_c01','obs_src_jc_s05','supports',NULL,'Founder interview','Current first-person context.',CURRENT_TIMESTAMP),
('obs_ev_jc_c01_s06','obs_claim_jc_c01','obs_src_jc_s06','supports',NULL,'Origin discussion','Independent interview context.',CURRENT_TIMESTAMP),
('obs_ev_jc_c02_s03','obs_claim_jc_c02','obs_src_jc_s03','supports',NULL,'Author identity and company memo','Current CEO record.',CURRENT_TIMESTAMP),
('obs_ev_jc_c02_s05','obs_claim_jc_c02','obs_src_jc_s05','supports',NULL,'Interview introduction','Cofounder and CEO corroboration.',CURRENT_TIMESTAMP),
('obs_ev_jc_c03_s02','obs_claim_jc_c03','obs_src_jc_s02','supports',NULL,'2019 financing announcement','Company-reported financing.',CURRENT_TIMESTAMP),
('obs_ev_jc_c04_s01','obs_claim_jc_c04','obs_src_jc_s01','supports',NULL,'Our numbers','Attributed current company metrics.',CURRENT_TIMESTAMP),
('obs_ev_jc_c05_s03','obs_claim_jc_c05','obs_src_jc_s03','supports',NULL,'Workforce memo','First-person company decision record.',CURRENT_TIMESTAMP),
('obs_ev_jc_c06_s01','obs_claim_jc_c06','obs_src_jc_s01','supports',NULL,'Origin and scale','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_jc_c06_s02','obs_claim_jc_c06','obs_src_jc_s02','supports',NULL,'Financing','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_jc_c06_s03','obs_claim_jc_c06','obs_src_jc_s03','supports',NULL,'Restructuring','Component of classified synthesis and countercontext.',CURRENT_TIMESTAMP),
('obs_ev_cz_c01_s01','obs_claim_cz_c01','obs_src_cz_s01','supports',NULL,'Current team profile','Primary employer role record.',CURRENT_TIMESTAMP),
('obs_ev_cz_c01_s02','obs_claim_cz_c01','obs_src_cz_s02','supports',NULL,'Appointment announcement','Primary employer corroboration.',CURRENT_TIMESTAMP),
('obs_ev_cz_c01_s03','obs_claim_cz_c01','obs_src_cz_s03','supports',NULL,'First-person announcement','First-person corroboration.',CURRENT_TIMESTAMP),
('obs_ev_cz_c02_s01','obs_claim_cz_c02','obs_src_cz_s01','supports',NULL,'Role description','Documents stated dual mandate.',CURRENT_TIMESTAMP),
('obs_ev_cz_c02_s02','obs_claim_cz_c02','obs_src_cz_s02','supports',NULL,'Appointment announcement','Documents investing and media responsibilities.',CURRENT_TIMESTAMP),
('obs_ev_cz_c03_s01','obs_claim_cz_c03','obs_src_cz_s01','supports',NULL,'Current profile','Documents Lightwork co-host role.',CURRENT_TIMESTAMP),
('obs_ev_cz_c03_s02','obs_claim_cz_c03','obs_src_cz_s02','supports',NULL,'Appointment announcement','Corroborates show responsibility.',CURRENT_TIMESTAMP),
('obs_ev_cz_c04_s04','obs_claim_cz_c04','obs_src_cz_s04','supports',NULL,'GSV biography','Former-employer role record; page may be stale.',CURRENT_TIMESTAMP),
('obs_ev_cz_c04_s05','obs_claim_cz_c04','obs_src_cz_s05','supports',NULL,'Institutional biography','Corroborates prior AI coverage.',CURRENT_TIMESTAMP),
('obs_ev_cz_c05_s06','obs_claim_cz_c05','obs_src_cz_s06','supports',NULL,'Current newsletter page','Documents authored publication.',CURRENT_TIMESTAMP),
('obs_ev_cz_c05_s08','obs_claim_cz_c05','obs_src_cz_s08','supports',NULL,'University directory','Independent institutional listing.',CURRENT_TIMESTAMP),
('obs_ev_cz_c06_s01','obs_claim_cz_c06','obs_src_cz_s01','supports',NULL,'Current role','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_cz_c06_s06','obs_claim_cz_c06','obs_src_cz_s06','supports',NULL,'Newsletter','Component of classified synthesis.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship" (
"id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt",
"verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_rel_jc_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Patreon','cofounder','2013-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc_s01',NULL,'Year precision only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Patreon','chief_executive_officer',NULL,NULL,'unreviewed','draft','obs_src_jc_s03',NULL,'Current CEO-authored company memo',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'asset','Pomplamoose and creator work','musician_creator',NULL,NULL,'unreviewed','draft','obs_src_jc_s01',NULL,'Company origin account',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jc_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization','Outside Patreon investors','platform_financing_relationship','2019-07-16T00:00:00Z',NULL,'unreviewed','draft','obs_src_jc_s02',NULL,'$60M financing announcement; terms withheld',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'organization','Lightspeed Venture Partners','partner_new_media',NULL,NULL,'unreviewed','draft','obs_src_cz_s01',NULL,'Current team profile',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'organization','Lightspeed Venture Partners','preseed_seed_investor',NULL,NULL,'unreviewed','draft','obs_src_cz_s01',NULL,'Stated investment scope only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'asset','Lightwork','cohost',NULL,NULL,'unreviewed','draft','obs_src_cz_s01',NULL,'Current profile',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'organization','GSV Ventures','former_partner_ai_lead',NULL,'2026-05-01T00:00:00Z','unreviewed','draft','obs_src_cz_s05',NULL,'Prior institutional biography; exact endpoints unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz_r05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'asset','GSV: AI & Education','author_publisher',NULL,NULL,'unreviewed','draft','obs_src_cz_s06',NULL,'Current publication page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent" (
"id","caseId","eventType","title","description","occurredAt","precision",
"verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_event_jc_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'organization_foundation','Patreon founded','Company history gives 2013; exact day withheld.','2013-01-01T00:00:00Z','year','unreviewed','draft','obs_src_jc_s01',NULL,'Official history',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'financing_announcement','Patreon announces $60M financing','Valuation, dilution and governance terms withheld.','2019-07-16T00:00:00Z','day','unreviewed','draft','obs_src_jc_s02',NULL,'Financing announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'product_announcement','Patreon announces connection-oriented network product','Company strategy announcement, not outcome evidence.','2026-04-28T00:00:00Z','day','unreviewed','draft','obs_src_jc_s04',NULL,'Product announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'workforce_restructuring','Conte announces 20% workforce reduction','Company reports 93 affected positions.','2026-07-23T00:00:00Z','day','unreviewed','draft','obs_src_jc_s03',NULL,'CEO-authored memo',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jc_e05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'evidence_snapshot','Patreon about page metrics observed','Observation date; company-reported and mutable.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_jc_s01',NULL,'Our numbers',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'prior_role','Institutional records document Zau as GSV Partner and AI Lead','Exact appointment date missing; later page may be stale.','2025-01-01T00:00:00Z','approximate','unreviewed','draft','obs_src_cz_s05',NULL,'Institutional biography snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'executive_appointment','Zau announces Lightspeed partner appointment','Month precision from reviewed reporting and announcements.','2026-05-01T00:00:00Z','month','unreviewed','draft','obs_src_cz_s02',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'evidence_snapshot','Lightspeed profile documents dual investment and media role','Observation date, not appointment date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_cz_s01',NULL,'Current profile',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'evidence_snapshot','Newsletter and Stanford directory observed','Observation date for two current public knowledge surfaces.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_cz_s06',NULL,'Newsletter page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage" (
"id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt"
) VALUES
('obs_package_jack_conte_100','jack-conte-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'1.0.0',
'research/observatory/dossiers/jack-conte-1.0.0.md','23444ce2fcf2c3c5cdec0f8abf0fe50f3f73ef99',
'{"claimIds":["obs_claim_jc_c01","obs_claim_jc_c02","obs_claim_jc_c03","obs_claim_jc_c04","obs_claim_jc_c05"],"relationshipIds":["obs_rel_jc_r01","obs_rel_jc_r02","obs_rel_jc_r03","obs_rel_jc_r04"],"eventIds":["obs_event_jc_e01","obs_event_jc_e02","obs_event_jc_e03","obs_event_jc_e04","obs_event_jc_e05"],"observationIds":[],"limitations":["equity_percentage_and_board_control_unverified","company_metrics_attributed_and_unaudited","creator_outcome_distribution_unverified","current_capital_structure_unverified","platform_contract_terms_unverified","psychological_attributes_unmeasured","classified_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.78,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_package_claire_zau_100','claire-zau-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'1.0.0',
'research/observatory/dossiers/claire-zau-1.0.0.md','444f685ee5c924b7f3d7e9148c1165ff4390e958',
'{"claimIds":["obs_claim_cz_c01","obs_claim_cz_c02","obs_claim_cz_c03","obs_claim_cz_c04","obs_claim_cz_c05"],"relationshipIds":["obs_rel_cz_r01","obs_rel_cz_r02","obs_rel_cz_r03","obs_rel_cz_r04","obs_rel_cz_r05"],"eventIds":["obs_event_cz_e02","obs_event_cz_e03","obs_event_cz_e04"],"observationIds":[],"limitations":["specific_investment_attribution_missing","fund_decision_rights_and_carry_unverified","role_uniqueness_not_primary_source_verified","gsv_biography_may_be_stale","podcast_ip_and_economics_unverified","psychological_attributes_unmeasured","classified_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.70,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent" (
"id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt"
) VALUES
('obs_audit_jack_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jack-conte'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_jack_conte_100',
'{"packageId":"jack-conte-1.0.0","claimsLoaded":6,"claimsInPublicationManifest":5,"relationshipsLoaded":4,"eventsLoaded":5,"publication":"draft"}'::jsonb,
'Versioned evidence package imported as draft. Company metrics remain attributed and the classified synthesis remains excluded.',CURRENT_TIMESTAMP),
('obs_audit_claire_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_claire_zau_100',
'{"packageId":"claire-zau-1.0.0","claimsLoaded":6,"claimsInPublicationManifest":5,"relationshipsLoaded":5,"relationshipsInPublicationManifest":5,"eventsLoaded":4,"eventsInPublicationManifest":3,"publication":"draft"}'::jsonb,
'Versioned evidence package imported as draft. The stale former-employer snapshot event and classified synthesis remain excluded.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
