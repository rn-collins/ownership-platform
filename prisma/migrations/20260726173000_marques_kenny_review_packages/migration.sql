-- Marques Brownlee and Kenny Gold Observatory review packages 1.0.0.
-- Draft evidence records only. This migration does not publish or verify either case.

INSERT INTO "ObservatoryCase" (
  "id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary",
  "inclusionRationale","roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus",
  "publicStatus","createdAt","updatedAt"
) VALUES
('obs_case_marques_brownlee','marques-brownlee','Marques Brownlee','creator','Technology and media','United States',
 'Technology creator connecting owned publishing surfaces with podcast distribution and an equity-backed product partnership',
 'A public-evidence case concerning creator publishing, distinct media surfaces, podcast distribution, direct commerce, and documented equity, board, and creative roles at Ridge.',
 'Selected for Batch 1 to examine creator-led production infrastructure and external product and distribution relationships without inferring undisclosed ownership or revenue.',
 true,'in_review',0.73,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_case_kenny_gold','kenny-gold','Kenny Gold','professional','Agency and creator economy','United States',
 'Agency executive appointed to newly created creator-economy leadership roles at Edelman and Deloitte Digital',
 'A public-evidence case concerning newly created creator and social leadership roles, institutional practice leadership, and research outputs.',
 'Selected for Batch 1 to distinguish employer-created executive roles and institutional mandates from personal ownership or unsupported role-built claims.',
 false,'in_review',0.76,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET
 "headline"=EXCLUDED."headline","summary"=EXCLUDED."summary","inclusionRationale"=EXCLUDED."inclusionRationale",
 "roleBuiltFlag"=EXCLUDED."roleBuiltFlag","verificationStatus"='in_review',
 "evidenceCoverage"=EXCLUDED."evidenceCoverage","updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource" (
 "id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt"
) VALUES
('obs_src_mb_s01','https://mkbhd.com/','MKBHD official site','MKBHD','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s02','https://www.youtube.com/user/marquesbrownlee','Marques Brownlee YouTube channel','YouTube','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s03','https://www.businesswire.com/news/home/20240222018547/en/Marques-Brownlee-Joins-Ridge-as-Executive-Board-Member-Equity-Investor-and-Chief-Creative-Partner','Marques Brownlee joins Ridge','Ridge','company_record','2024-02-22T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s04','https://x.com/MKBHD/status/1760698224250130465','Brownlee Ridge announcement','Marques Brownlee','first_person','2024-02-22T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s05','https://www.voxmedia.com/2021/8/10/22617456/waveform-the-mkbhd-podcast-joins-vox-media-podcast-network/','Waveform joins Vox Media Podcast Network','Vox Media','company_record','2021-08-10T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s06','https://podcasts.voxmedia.com/show/waveform-the-mkbhd-podcast','Waveform show page','Vox Media','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s07','https://www.youtube.com/@TheStudio','The Studio channel','YouTube','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_s08','https://mkbhd.com/collections/all','MKBHD store','MKBHD','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s01','https://www.edelman.com/news-awards/kenny-gold-global-chief-creator-officer','Edelman appoints Kenny Gold Global Chief Creator Officer','Edelman','company_record','2026-06-02T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s02','https://www.linkedin.com/posts/edelman_were-excited-to-welcome-kenny-gold-as-edelman-activity-7467636476260962305-nzMJ','Edelman first Global Chief Creator Officer announcement','Edelman','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s03','https://www.linkedin.com/posts/kennethrgold_edelman-hires-first-global-chief-creator-activity-7467577686572285952-6HcL','Gold first-person Edelman announcement','Kenny Gold','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s04','https://www.deloitte.com/us/en/about/people/profiles.kenny-gold%2B7cf89b84.html','Kenny Gold biography','Deloitte','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s05','https://www.deloitte.com/us/en/services/consulting/services/creator-influencer-solutions.html','Creator and Influencer Solutions','Deloitte','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s06','https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/content-creator-economy.html','Creator Economy in 3D','Deloitte','academic',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s07','https://www.mediapost.com/publications/article/365791/deloitte-digital-hires-kenny-gold-as-first-head-of.html','Deloitte Digital hires first Head of Social, Content and Influencer','MediaPost','journalism','2021-08-06T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_kg_s08','https://aef.com/partnership-programs/honors-night/honors2021/2021-champions/champion-gold/','Talent Champion profile: Kenny Gold','Advertising Educational Foundation','official_record','2021-01-01T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
 "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
 "publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
 "primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim" (
 "id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus",
 "confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt"
) VALUES
('obs_claim_mb_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'creator_publishing_identity','Brownlee’s official site and YouTube page document an active technology-video publishing identity under MKBHD.','organizational_ownership','observed','unreviewed',NULL,'Marques Brownlee operates the MKBHD technology-media identity across an official site and YouTube channel.','The surfaces do not establish legal entity structure, revenue, profitability, or complete platform independence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'multi_surface_media','The official MKBHD site links distinct MKBHD, The Studio, Waveform, and AutoFocus publishing surfaces.','portfolio_breadth','observed','unreviewed',NULL,'The MKBHD site presents multiple named publishing surfaces, including The Studio, Waveform, and AutoFocus.','Naming and navigation do not establish separate legal ownership, equal scale, or financial contribution.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'podcast_distribution','Vox Media announced that Waveform joined its podcast network and that Vox would manage sales, marketing, and distribution.','distribution_infrastructure','observed','unreviewed',NULL,'Waveform joined the Vox Media Podcast Network in 2021 under a relationship covering sales, marketing, and distribution.','Contract terms, IP ownership, revenue share, exclusivity, and current economics are not public.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'equity_board_creative_roles','Ridge announced Brownlee as an executive board member, equity investor, and chief creative partner.','operating_authority','observed','unreviewed',NULL,'Ridge announced Marques Brownlee as an executive board member, equity investor, and chief creative partner in 2024.','No equity percentage, valuation, investment amount, voting rights, duration, or financial outcome is established.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'direct_commerce','The MKBHD site maintains a current store offering branded merchandise.','distribution_infrastructure','observed','unreviewed',NULL,'MKBHD maintains a first-party-branded online merchandise storefront.','The storefront does not establish manufacturing ownership, margins, revenue, inventory, or fulfillment control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'operating_architecture','The reviewed record combines creator publishing, multiple media surfaces, a distributed podcast, direct commerce, and an equity-linked corporate product role.','institutional_architecture','classified','unreviewed',NULL,'The reviewed record supports studying Brownlee as a creator-led media architecture with commerce and external corporate relationships.','This is an Observatory classification, not a score or ownership conclusion.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'executive_appointment','Edelman appointed Gold Global Chief Creator Officer in June 2026.','operating_authority','observed','unreviewed',NULL,'Edelman appointed Kenny Gold Global Chief Creator Officer in June 2026.','Appointment does not establish performance, compensation, tenure, or ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'role_novelty','Edelman describes Gold as its first Global Chief Creator Officer.','role_formation','observed','unreviewed',NULL,'Edelman described Gold’s appointment as its first Global Chief Creator Officer role.','First is employer-specific and does not prove the role was designed uniquely for Gold.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'stated_mandate','Edelman states Gold will lead Edelman Creator globally across creator, social, paid, and performance and identifies his reporting line.','operating_authority','observed','unreviewed',NULL,'Edelman’s announcement assigns Gold a global creator mandate spanning social, paid, and performance and identifies his reporting line.','Stated mandate is not evidence of budget, unilateral authority, delivered outcomes, or staffing controlled by Gold.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'prior_first_head_role','Deloitte and contemporaneous trade reporting document Gold’s 2021 appointment as managing director and first head of social, content, and influencer.','role_formation','observed','unreviewed',NULL,'Deloitte Digital appointed Gold managing director and its first Head of Social, Content and Influencer in 2021.','Role novelty is employer-specific and does not establish sole practice creation or financial performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'practice_and_research','Deloitte’s public record connects Gold to a creator-and-influencer practice and Creator Economy in 3D research.','knowledge_infrastructure','observed','unreviewed',NULL,'Deloitte’s public record connects Gold to a creator-and-influencer practice and its Creator Economy in 3D research.','A listed role or contact does not establish sole authorship, ownership, causal impact, or current status after departure.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_kg_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'institution_building_pattern','The reviewed record shows consecutive newly created creator and social leadership roles at Deloitte Digital and Edelman.','institutional_portability','classified','unreviewed',NULL,'The record supports studying Gold as a professional institution-building case across agency creator practices.','Do not infer personal ownership or that either institution was built around him.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence" (
 "id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt"
) VALUES
('obs_ev_mb_c01_s01','obs_claim_mb_c01','obs_src_mb_s01','supports',NULL,'Official site navigation','Documents named publishing identity and surfaces.',CURRENT_TIMESTAMP),
('obs_ev_mb_c01_s02','obs_claim_mb_c01','obs_src_mb_s02','supports',NULL,'Current channel page','Documents technology-video channel.',CURRENT_TIMESTAMP),
('obs_ev_mb_c02_s01','obs_claim_mb_c02','obs_src_mb_s01','supports',NULL,'Official site navigation','Documents multiple named surfaces.',CURRENT_TIMESTAMP),
('obs_ev_mb_c02_s07','obs_claim_mb_c02','obs_src_mb_s07','supports',NULL,'Current channel page','Documents distinct Studio surface.',CURRENT_TIMESTAMP),
('obs_ev_mb_c03_s05','obs_claim_mb_c03','obs_src_mb_s05','supports',NULL,'Partnership announcement','Documents stated sales, marketing and distribution scope.',CURRENT_TIMESTAMP),
('obs_ev_mb_c03_s06','obs_claim_mb_c03','obs_src_mb_s06','supports',NULL,'Current show page','Corroborates current network distribution.',CURRENT_TIMESTAMP),
('obs_ev_mb_c04_s03','obs_claim_mb_c04','obs_src_mb_s03','supports',NULL,'Ridge announcement','Primary company statement of three roles.',CURRENT_TIMESTAMP),
('obs_ev_mb_c04_s04','obs_claim_mb_c04','obs_src_mb_s04','supports',NULL,'First-person announcement','Brownlee corroborates chief creative and board roles.',CURRENT_TIMESTAMP),
('obs_ev_mb_c05_s08','obs_claim_mb_c05','obs_src_mb_s08','supports',NULL,'Current store collection','Documents current direct commerce surface.',CURRENT_TIMESTAMP),
('obs_ev_mb_c06_s01','obs_claim_mb_c06','obs_src_mb_s01','supports',NULL,'Official site','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_mb_c06_s03','obs_claim_mb_c06','obs_src_mb_s03','supports',NULL,'Ridge announcement','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_mb_c06_s05','obs_claim_mb_c06','obs_src_mb_s05','supports',NULL,'Vox announcement','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_kg_c01_s01','obs_claim_kg_c01','obs_src_kg_s01','supports',NULL,'Appointment announcement','Primary employer record.',CURRENT_TIMESTAMP),
('obs_ev_kg_c01_s03','obs_claim_kg_c01','obs_src_kg_s03','supports',NULL,'First-person announcement','Corroborates appointment.',CURRENT_TIMESTAMP),
('obs_ev_kg_c02_s01','obs_claim_kg_c02','obs_src_kg_s01','supports',NULL,'Appointment announcement','Employer-specific first-role claim.',CURRENT_TIMESTAMP),
('obs_ev_kg_c02_s02','obs_claim_kg_c02','obs_src_kg_s02','supports',NULL,'Company social announcement','Corroborates first-ever description.',CURRENT_TIMESTAMP),
('obs_ev_kg_c03_s01','obs_claim_kg_c03','obs_src_kg_s01','supports',NULL,'Mandate and reporting line','Documents stated authority, not outcomes.',CURRENT_TIMESTAMP),
('obs_ev_kg_c03_s02','obs_claim_kg_c03','obs_src_kg_s02','supports',NULL,'Company social announcement','Documents stated global practice scope.',CURRENT_TIMESTAMP),
('obs_ev_kg_c04_s04','obs_claim_kg_c04','obs_src_kg_s04','supports',NULL,'Deloitte biography','Employer record of 2021 role.',CURRENT_TIMESTAMP),
('obs_ev_kg_c04_s07','obs_claim_kg_c04','obs_src_kg_s07','supports',NULL,'Contemporaneous appointment report','Independent first-role corroboration.',CURRENT_TIMESTAMP),
('obs_ev_kg_c05_s05','obs_claim_kg_c05','obs_src_kg_s05','supports',NULL,'Service page','Documents practice surface and listed leadership.',CURRENT_TIMESTAMP),
('obs_ev_kg_c05_s06','obs_claim_kg_c05','obs_src_kg_s06','supports',NULL,'Research page','Documents research association.',CURRENT_TIMESTAMP),
('obs_ev_kg_c06_s01','obs_claim_kg_c06','obs_src_kg_s01','supports',NULL,'Edelman appointment','Component of classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_kg_c06_s04','obs_claim_kg_c06','obs_src_kg_s04','supports',NULL,'Deloitte biography','Component of classified synthesis.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship" (
 "id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt",
 "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_rel_mb_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'asset','MKBHD','creator_publisher',NULL,NULL,'unreviewed','draft','obs_src_mb_s01',NULL,'Official site',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'asset','Waveform','creator_host',NULL,NULL,'unreviewed','draft','obs_src_mb_s06',NULL,'Current show page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'organization','Vox Media','podcast_network_distribution','2021-08-10T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb_s05',NULL,'Partnership announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'organization','Ridge','board_equity_creative_partner','2024-02-22T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb_s03',NULL,'Ridge announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb_r05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'asset','The Studio','publisher',NULL,NULL,'unreviewed','draft','obs_src_mb_s07',NULL,'Current channel page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Edelman','global_chief_creator_officer','2026-06-02T00:00:00Z',NULL,'unreviewed','draft','obs_src_kg_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Edelman Creator','global_lead',NULL,NULL,'unreviewed','draft','obs_src_kg_s01',NULL,'Stated mandate',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Deloitte Digital','managing_director_head_social_content_influencer','2021-08-06T00:00:00Z','2026-06-02T00:00:00Z','unreviewed','draft','obs_src_kg_s04',NULL,'Employer biography and later transition announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'organization','Grey Group North America','executive_director_social_media',NULL,'2021-08-06T00:00:00Z','unreviewed','draft','obs_src_kg_s04',NULL,'Employer biography',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_kg_r05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'asset','Creator Economy in 3D','research_contributor_contact',NULL,NULL,'unreviewed','draft','obs_src_kg_s06',NULL,'Research page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent" (
 "id","caseId","eventType","title","description","occurredAt","precision",
 "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_event_mb_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'distribution_partnership','Waveform joins Vox Media Podcast Network','Vox states that it would manage sales, marketing and distribution.','2021-08-10T00:00:00Z','day','unreviewed','draft','obs_src_mb_s05',NULL,'Partnership announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'corporate_appointment','Ridge announces Brownlee’s board, equity-investor and chief creative partner roles','Equity percentage, investment amount and governance terms are undisclosed.','2024-02-22T00:00:00Z','day','unreviewed','draft','obs_src_mb_s03',NULL,'Ridge announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'evidence_snapshot','Official MKBHD site documents multi-surface publishing architecture','Observation date, not formation date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_mb_s01',NULL,'Official site snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'evidence_snapshot','Vox page documents current Waveform network distribution','Observation date, not contract renewal date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_mb_s06',NULL,'Current show page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'executive_appointment','Gold joins Deloitte Digital in first head role','Contemporaneous report and employer biography document the appointment.','2021-08-06T00:00:00Z','day','unreviewed','draft','obs_src_kg_s07',NULL,'Appointment report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'executive_appointment','Edelman announces Global Chief Creator Officer appointment','Employer-specific first-role claim and stated mandate.','2026-06-02T00:00:00Z','day','unreviewed','draft','obs_src_kg_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'evidence_snapshot','Deloitte service page documents creator and influencer practice','Observation date; does not establish ownership or outcomes.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_kg_s05',NULL,'Service page snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_kg_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'evidence_snapshot','Deloitte page documents Creator Economy in 3D research association','Observation date; authorship and causal impact remain bounded.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_kg_s06',NULL,'Research page snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage" (
 "id","packageId","caseId","version","dossierPath","contentHash","manifest",
 "evidenceCoverage","status","createdAt","updatedAt"
) VALUES
('obs_package_marques_brownlee_100','marques-brownlee-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'1.0.0',
 'research/observatory/dossiers/marques-brownlee-1.0.0.md','b43707de5ffe812288eb946f006c6274898b70d6',
 '{"claimIds":["obs_claim_mb_c01","obs_claim_mb_c02","obs_claim_mb_c03","obs_claim_mb_c04","obs_claim_mb_c05"],"relationshipIds":["obs_rel_mb_r01","obs_rel_mb_r02","obs_rel_mb_r03","obs_rel_mb_r04","obs_rel_mb_r05"],"eventIds":["obs_event_mb_e01","obs_event_mb_e02","obs_event_mb_e03","obs_event_mb_e04"],"observationIds":[],"limitations":["legal_entity_structure_unverified","ridge_equity_percentage_and_terms_unverified","podcast_ip_and_economics_unverified","audience_and_revenue_metrics_excluded","platform_contract_terms_unverified","psychological_attributes_unmeasured","classified_synthesis_excluded_from_auto_publication"]}'::jsonb,
 0.73,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_package_kenny_gold_100','kenny-gold-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'1.0.0',
 'research/observatory/dossiers/kenny-gold-1.0.0.md','c81d6e28e2740a3b6d7377482c00433f181eac89',
 '{"claimIds":["obs_claim_kg_c01","obs_claim_kg_c02","obs_claim_kg_c03","obs_claim_kg_c04","obs_claim_kg_c05"],"relationshipIds":["obs_rel_kg_r01","obs_rel_kg_r02","obs_rel_kg_r03","obs_rel_kg_r04","obs_rel_kg_r05"],"eventIds":["obs_event_kg_e01","obs_event_kg_e02","obs_event_kg_e03","obs_event_kg_e04"],"observationIds":[],"limitations":["employer_created_roles_do_not_establish_role_built_around_person","practice_ownership_unverified","budget_and_decision_rights_unverified","financial_outcomes_unverified","staffing_control_unverified","psychological_attributes_unmeasured","classified_synthesis_excluded_from_auto_publication"]}'::jsonb,
 0.76,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent" (
 "id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt"
) VALUES
('obs_audit_marques_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'system:versioned-import','system@institutions-of-one.local',
 'import_review_package','review_package','obs_package_marques_brownlee_100',
 '{"packageId":"marques-brownlee-1.0.0","claimsLoaded":6,"claimsInPublicationManifest":5,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft"}'::jsonb,
 'Versioned evidence package imported as draft. The classified synthesis remains outside the automatic publication manifest.',CURRENT_TIMESTAMP),
('obs_audit_kenny_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='kenny-gold'),'system:versioned-import','system@institutions-of-one.local',
 'import_review_package','review_package','obs_package_kenny_gold_100',
 '{"packageId":"kenny-gold-1.0.0","claimsLoaded":6,"claimsInPublicationManifest":5,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft"}'::jsonb,
 'Versioned evidence package imported as draft. Institutional first-role claims remain employer-specific and the classified synthesis remains excluded.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
