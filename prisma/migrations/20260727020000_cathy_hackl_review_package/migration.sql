-- Cathy Hackl public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_ch_digiday','https://digiday.com/marketing/my-title-was-non-negotiable-a-qa-with-cathy-hackl-chief-metaverse-officer-at-journey/','My title was non-negotiable: Cathy Hackl Q&A','Digiday','first_person_interview','2022-06-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_journey','https://www.prnewswire.com/news-releases/journey-announces-acquisition-of-icrave-skilled-creative-and-futures-intelligence-creating-a-leading-innovation-and-design-agency-301553295.html','Journey announces acquisitions and launch','Journey','acquirer_release','2022-05-24T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_forbes','https://www.forbes.com/sites/pauleannareid/2022/08/18/meet-the-worlds-first-chief-metaverse-officer-how-cathy-hackl-is-demystifying-web3-for-female-professionals/','Meet the world’s first chief metaverse officer','Forbes contributor','contributor_profile','2022-08-18T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ch_boson','https://www.prnewswire.com/news-releases/boson-protocol-names-cathy-hackls-futures-intelligence-group-as-metaverse-agency-of-record-301432590.html','Boson names Futures Intelligence Group agency of record','Boson Protocol','client_release','2021-11-30T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_spatial','https://www.prnewswire.com/news-releases/cathy-hackl-to-launch-spatial-dynamics-a-new-spatial-computing--ai-solutions-company-302049977.html','Cathy Hackl to launch Spatial Dynamics','Spatial Dynamics','company_release','2024-02-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_wef','https://www.weforum.org/people/cathy-hackl/','Cathy Hackl profile','World Economic Forum','institutional_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_wired','https://www.wired.com/story/where-have-all-the-chief-metaverse-officers-gone','Where have all the chief metaverse officers gone?','WIRED','independent_reporting','2024-10-07T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ch_future','https://www.linkedin.com/company/futuredynamicslab','Future Dynamics organization profile','Future Dynamics','company_controlled_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ch_linkedin','https://www.linkedin.com/in/cathyhackl','Cathy Hackl professional profile','LinkedIn','self_authored_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET
"url"=EXCLUDED."url","title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_ch_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'title_self_selection','Hackl said she chose the chief metaverse officer title while running Futures Intelligence Group.','role_construction','observed','unreviewed',NULL,'Hackl deliberately created or adopted the chief metaverse officer title to describe her work.','Self-selection does not establish global historical firstness.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'global_first_unverified','Profiles describe Hackl as the world’s first chief metaverse officer without documenting an exhaustive prior-art method or comparison universe.','claim_restriction','observed','unreviewed',NULL,'Hackl has been widely described as an early or pioneering chief metaverse officer.','Do not state world’s first as verified; preserve it only as an attributed publicity claim.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'fig_founder','Contemporaneous records identify Hackl as founder and executive of Futures Intelligence Group.','operating_authority','observed','unreviewed',NULL,'Hackl founded and led Futures Intelligence Group.','Legal entity, cap table, exact founding date, revenue and client outcomes are unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'fig_acquisition','Journey announced acquiring Futures Intelligence Group in May 2022.','exit_reversibility','observed','unreviewed',NULL,'Journey acquired Futures Intelligence Group in 2022.','Price, consideration, retained equity and earnout are undisclosed; seven-figure descriptions remain unverified.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'journey_role','Journey identified Hackl as chief metaverse officer and a co-founder.','operating_authority','observed','unreviewed',NULL,'After the acquisition, Hackl served as Journey chief metaverse officer and was identified as a co-founder.','Title does not establish equity, board authority, client-work ownership or sole authorship.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'spatial_dynamics','A 2024 issuer release described Spatial Dynamics as newly formed and Hackl as co-CEO; later profiles call her CEO.','role_transition','observed','unreviewed',NULL,'Hackl launched and led Spatial Dynamics, repositioning company work toward spatial computing and AI.','Co-CEO/CEO chronology, legal entity, ownership, team, technology and outcomes require resolution.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'future_dynamics','Company-controlled profiles describe Future Dynamics as Hackl’s foresight and public thought-leadership lab.','asset_boundary','observed','unreviewed',NULL,'Hackl presents Future Dynamics as her foresight and thought-leadership lab.','Legal and operating relationship to Spatial Dynamics is unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'field_transition','Independent reporting notes both a retreat from metaverse-specific executive language and Hackl’s shift toward spatial-computing and AI terminology.','role_transition','observed','unreviewed',NULL,'Hackl’s public positioning evolved alongside a broader shift toward spatial computing and AI.','This does not prove abandonment or a causal market explanation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ch_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'role_invention_synthesis','Evidence supports purposeful role construction and portability through acquisition, not verified global firstness.','portfolio_architecture','interpretive','unreviewed',NULL,'Hackl illustrates how an emerging remit can be named and institutionalized through a company and acquisition.','Interpretive synthesis; not a score, causal proof or psychological inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_ch_c01','obs_claim_ch_c01','obs_src_ch_digiday','supports',NULL,'Title selection answer','First-person account.',CURRENT_TIMESTAMP),
('obs_ev_ch_c02_f','obs_claim_ch_c02','obs_src_ch_forbes','qualifies',NULL,'Headline and profile','Firstness asserted without method.',CURRENT_TIMESTAMP),
('obs_ev_ch_c02_d','obs_claim_ch_c02','obs_src_ch_digiday','contradicts',NULL,'Title selection answer','Supports self-adoption, not bestowal or global firstness.',CURRENT_TIMESTAMP),
('obs_ev_ch_c03','obs_claim_ch_c03','obs_src_ch_boson','supports',NULL,'Issuer bio','Contemporaneous FIG role.',CURRENT_TIMESTAMP),
('obs_ev_ch_c04','obs_claim_ch_c04','obs_src_ch_journey','supports',NULL,'Acquisition announcement','Acquirer record; terms withheld.',CURRENT_TIMESTAMP),
('obs_ev_ch_c05','obs_claim_ch_c05','obs_src_ch_journey','supports',NULL,'Leadership description','Journey roles.',CURRENT_TIMESTAMP),
('obs_ev_ch_c06_s','obs_claim_ch_c06','obs_src_ch_spatial','supports',NULL,'Launch and quote','Initial co-CEO description.',CURRENT_TIMESTAMP),
('obs_ev_ch_c06_w','obs_claim_ch_c06','obs_src_ch_wef','qualifies',NULL,'Current profile','Later CEO description.',CURRENT_TIMESTAMP),
('obs_ev_ch_c07','obs_claim_ch_c07','obs_src_ch_future','supports',NULL,'Organization about section','Company-controlled positioning.',CURRENT_TIMESTAMP),
('obs_ev_ch_c08','obs_claim_ch_c08','obs_src_ch_wired','supports',NULL,'Role-transition analysis','Independent temporal context.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_ch_fig',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'organization','Futures Intelligence Group','founder_and_executive',NULL,'2022-05-24T00:00:00Z','unreviewed','draft','obs_src_ch_journey',NULL,'Acquired company',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ch_journey',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'organization','Journey','co_founder_and_chief_metaverse_officer','2022-05-24T00:00:00Z',NULL,'unreviewed','draft','obs_src_ch_journey',NULL,'End date unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ch_spatial',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'organization','Spatial Dynamics','co_ceo_then_ceo','2024-02-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ch_spatial',NULL,'Title chronology unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ch_future',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'organization','Future Dynamics','founder_or_ceo_self_reported','2024-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ch_future',NULL,'Legal entity boundary unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ch_boson',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'organization','Boson Protocol','agency_of_record_via_fig','2021-11-30T00:00:00Z',NULL,'unreviewed','draft','obs_src_ch_boson',NULL,'Client outcome unverified',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_ch_boson',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'client_appointment','Boson appoints FIG agency of record','Contemporaneous evidence of FIG and title use.','2021-11-30T00:00:00Z','day','unreviewed','draft','obs_src_ch_boson',NULL,'Release date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ch_acquisition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'acquisition','Journey acquires Futures Intelligence Group','Transaction terms undisclosed.','2022-05-24T00:00:00Z','day','unreviewed','draft','obs_src_ch_journey',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ch_first_claim',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'publicity_claim','Forbes publishes world-first framing','Claim lacks documented comparison method.','2022-08-18T00:00:00Z','day','unreviewed','draft','obs_src_ch_forbes',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ch_spatial',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'company_launch','Spatial Dynamics launch announced','Issuer describes Hackl as co-CEO.','2024-02-01T00:00:00Z','day','unreviewed','draft','obs_src_ch_spatial',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ch_transition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'role_transition','WIRED documents shift in metaverse executive language','Contextual evidence, not causal proof.','2024-10-07T00:00:00Z','day','unreviewed','draft','obs_src_ch_wired',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_cathy_hackl_100','cathy-hackl-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'1.0.0',
'research/observatory/dossiers/cathy-hackl-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_ch_c01","obs_claim_ch_c02","obs_claim_ch_c03","obs_claim_ch_c04","obs_claim_ch_c05","obs_claim_ch_c06","obs_claim_ch_c07","obs_claim_ch_c08","obs_claim_ch_c09"],"relationshipIds":["obs_rel_ch_fig","obs_rel_ch_journey","obs_rel_ch_spatial","obs_rel_ch_future","obs_rel_ch_boson"],"eventIds":["obs_event_ch_boson","obs_event_ch_acquisition","obs_event_ch_first_claim","obs_event_ch_spatial","obs_event_ch_transition"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","global_first_claim_unverified","fig_legal_entity_and_cap_table_unresolved","fig_founding_date_conflict","acquisition_economics_unavailable","journey_equity_and_governance_unavailable","spatial_future_dynamics_boundary_unresolved","current_title_chronology_unresolved","client_outcomes_unverified","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.76,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_cathy_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='cathy-hackl'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_cathy_hackl_100',
'{"packageId":"cathy-hackl-1.0.0","sourcesAdded":9,"claimsAdded":9,"relationshipsAdded":5,"eventsAdded":5,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package replaces unsupported global-first language with documented role self-selection, acquisition portability and dated organizational transitions.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
