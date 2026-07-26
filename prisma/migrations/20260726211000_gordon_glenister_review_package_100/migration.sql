-- Gordon Glenister public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Institutional influencer-marketing leader who gives a joint formation account for BCMA Influence with BCMA co-founder Andrew Canter.',
    "summary"='A role-construction case separating originating proposal, joint institutional launch, delegated leadership, distributed labor, ownership and causal performance.',
    "inclusionRationale"='Tests how a person can originate and lead a new institutional chapter without the evidence supporting sole founding, personal ownership or sole causation.',
    "roleBuiltFlag"=true,"verificationStatus"='in_review',"evidenceCoverage"=0.80,"publicStatus"='draft',"updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='gordon-glenister';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_gg_bcma','https://thebcma.info/about/chapters/bcma-influence.html','BCMA Influence','BCMA','institutional_page',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_gg_guidelines','https://www.thebcma.info/onewebmedia/DOWNLOADABLE%20DOCUMENTS/BCMA%20Influencer%20Marketing%20Guidelines%20and%20Best%20Practice%20UK.pdf','BCMA Influencer Marketing Guidelines and Best Practice UK','BCMA','institutional_pdf',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_gg_pitch','https://www.thebcma.info/onewebmedia/DOWNLOADABLE%20DOCUMENTS/BCMA%20-%20Pitch%20Influence%202020%20-%20Winners%20Announced.pdf','Pitch Influence 2020 winners announced','BCMA','institutional_pdf','2020-11-05T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_gg_interview','https://www.bigeyeagency.com/podcast/influencer-marketing-strategy-with-gordon-glenister','Influencer Marketing Strategy with Gordon Glenister','Bigeye / In Clear Focus','first_person_interview','2024-09-03T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_gg_bpma','https://www.sourcingcitynews.co.uk/gordon-glenister-resigns-from-bpma/','Gordon Glenister resigns from BPMA','Sourcing City News','trade_reporting','2018-05-16T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_gg_site','https://gordonglenister.com/','Gordon Glenister professional site','Gordon Glenister','first_party_portfolio',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_gg_podcast','https://podcasts.apple.com/gb/podcast/influence-global/id1463375054','Influence Global','Apple Podcasts','platform_record',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_gg_book','https://books.google.com/books/about/Influencer_Marketing_Strategy.html?id=KMsl0AEACAAJ','Influencer Marketing Strategy','Kogan Page / Google Books','publisher_record','2024-07-24T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_gg_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'career_transition','BPMA announced Glenister’s resignation as Director General in May 2018 after approximately twelve years of service.','role_history','observed','unreviewed',NULL,'Glenister left a long BPMA executive tenure in 2018.','Do not infer performance, ownership or private reasons for departure.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'role_construction','Glenister said he raised the absence of an influencer-marketing trade body in a meeting with BCMA co-founder Andrew Canter and that they decided to launch Influence.','institutional_role_construction','attributed','unreviewed',NULL,'A detailed first-person account supports Glenister as an originator within a joint formation decision involving Canter.','Do not rewrite the plural formation account as verified sole founding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'institutional_boundary','Glenister described Influence as a division of the pre-existing Branded Content Marketing Association.','institutional_ownership_boundary','attributed','unreviewed',NULL,'Influence was formed inside BCMA rather than documented as Glenister’s personal company.','Do not infer personal legal ownership, equity or unilateral control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'delegated_authority','BCMA identifies Glenister as Global Head of Influencer Marketing.','delegated_authority','observed','unreviewed',NULL,'BCMA publicly delegates a global influencer-marketing leadership role to Glenister.','A title does not establish ownership, voting rights, budget, compensation or unchanged authority over time.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'institutional_remit','BCMA describes Influence as a global chapter engaged in research, guidance and accreditation activity.','institutional_system','observed','unreviewed',NULL,'BCMA Influence has an institutional remit and infrastructure beyond one individual.','Do not attribute every chapter output or outcome personally to Glenister.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'distributed_governance','BCMA’s guidelines identify a founding Influencer Steering Group that includes Glenister and other participants.','distributed_labor','observed','unreviewed',NULL,'Standards work was multi-party and institutionally situated.','Do not call Glenister the sole creator of the guidelines or chapter.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'program_leadership','BCMA documented Glenister as organizer and head judge of Pitch Influence 2020.','program_authority','observed','unreviewed',NULL,'Glenister held identifiable program leadership within the chapter.','Program leadership does not prove chapter ownership or sole labor.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'portfolio_boundary','Glenister hosts Influence Global, authored Influencer Marketing Strategy and publicly presents several separate founder-led ventures.','portfolio_relationships','mixed','unreviewed',NULL,'His public system includes media, publishing, consulting and education properties with distinct counterparties.','Do not merge these properties into BCMA or infer their cap tables, IP, revenue or performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'ownership_boundary','No reviewed public record establishes Glenister’s equity, legal ownership, voting rights or contract economics in BCMA Influence.','claim_restriction','observed','unreviewed',NULL,'The public record establishes role and activity, not ownership economics.','Absence of public evidence is not proof that no private rights exist.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_gg_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'psychology_boundary','No reviewed source validly measures Glenister’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships and events, not psychology.','Do not infer motivation, cognition, resilience, personality or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_gg_c01','obs_claim_gg_c01','obs_src_gg_bpma','supports',NULL,'May 2018 resignation report','Institutional announcement reported by specialist trade source.',CURRENT_TIMESTAMP),
('obs_ev_gg_c02','obs_claim_gg_c02','obs_src_gg_interview','supports',NULL,'Career-origin narrative','Retrospective first-person account; supports attribution and joint wording.',CURRENT_TIMESTAMP),
('obs_ev_gg_c03','obs_claim_gg_c03','obs_src_gg_interview','supports',NULL,'Influence described as BCMA division','Institutional placement is consistent with BCMA chapter records.',CURRENT_TIMESTAMP),
('obs_ev_gg_c04','obs_claim_gg_c04','obs_src_gg_bcma','supports',NULL,'BCMA role page','Current public title snapshot.',CURRENT_TIMESTAMP),
('obs_ev_gg_c05','obs_claim_gg_c05','obs_src_gg_bcma','supports',NULL,'Chapter remit','Institutional self-description.',CURRENT_TIMESTAMP),
('obs_ev_gg_c06','obs_claim_gg_c06','obs_src_gg_guidelines','supports',NULL,'Founding steering group','Multi-party governance/labor evidence.',CURRENT_TIMESTAMP),
('obs_ev_gg_c07','obs_claim_gg_c07','obs_src_gg_pitch','supports',NULL,'Organizer and head-judge attribution','Program-specific leadership evidence.',CURRENT_TIMESTAMP),
('obs_ev_gg_c08a','obs_claim_gg_c08','obs_src_gg_podcast','supports',NULL,'Podcast host record','Distribution record; rights and economics unresolved.',CURRENT_TIMESTAMP),
('obs_ev_gg_c08b','obs_claim_gg_c08','obs_src_gg_book','supports',NULL,'Publisher record','Authorship and publisher relationship.',CURRENT_TIMESTAMP),
('obs_ev_gg_c08c','obs_claim_gg_c08','obs_src_gg_site','supports',NULL,'Current first-party portfolio','Founder labels remain first-party claims.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_gg_bpma',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'organization','British Promotional Merchandise Association','former_director_general','2007-01-01T00:00:00Z','2018-09-01T00:00:00Z','unreviewed','draft','obs_src_gg_bpma',NULL,'Month-level end varies across public chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_gg_canter',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'person','Andrew Canter','joint_formation_account_for_bcma_influence','2018-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_gg_interview',NULL,'Exact date and authority split unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_gg_bcma',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'organization','Branded Content Marketing Association','global_head_of_influencer_marketing','2019-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_gg_bcma',NULL,'Title does not establish ownership or contract terms',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_gg_influence',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'organization','BCMA Influence','originating_participant_and_operating_leader','2019-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_gg_interview',NULL,'Joint institutional formation; exact launch date unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_gg_podcast',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'product','Influence Global','host','2019-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_gg_podcast',NULL,'IP, production and revenue terms unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_gg_kogan',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'organization','Kogan Page','author_publisher_relationship','2021-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_gg_book',NULL,'Publishing economics unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_gg_bpma_exit',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'role_transition','BPMA announces departure','BPMA announces Glenister’s resignation after a long Director General tenure.','2018-05-16T00:00:00Z','day','unreviewed','draft','obs_src_gg_bpma',NULL,'Announcement date; operational end later reported',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_gg_influence_launch',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'role_construction','BCMA Influence launch period','Public accounts place the joint BCMA Influence formation in 2019.','2019-01-01T00:00:00Z','year','unreviewed','draft','obs_src_gg_interview',NULL,'Original launch record not located',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_gg_pitch',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'program_leadership','Pitch Influence 2020','BCMA documents Glenister as organizer and head judge.','2020-11-05T00:00:00Z','day','unreviewed','draft','obs_src_gg_pitch',NULL,'Institutional program record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_gg_book1',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'publication','Influencer Marketing Strategy first edition','First edition published through Kogan Page.','2021-01-01T00:00:00Z','year','unreviewed','draft','obs_src_gg_book',NULL,'Year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_gg_book2',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'publication','Influencer Marketing Strategy second edition','Second edition published through Kogan Page.','2024-07-24T00:00:00Z','day','unreviewed','draft','obs_src_gg_book',NULL,'Publisher record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_gordon_glenister_100','gordon-glenister-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'1.0.0','research/observatory/dossiers/gordon-glenister-1.0.0.md','5930fbf0e50a9e3811669c15949771db2124f1d1',
'{"claimIds":["obs_claim_gg_c01","obs_claim_gg_c02","obs_claim_gg_c03","obs_claim_gg_c04","obs_claim_gg_c05","obs_claim_gg_c06","obs_claim_gg_c07","obs_claim_gg_c08","obs_claim_gg_c09","obs_claim_gg_c10"],"relationshipIds":["obs_rel_gg_bpma","obs_rel_gg_canter","obs_rel_gg_bcma","obs_rel_gg_influence","obs_rel_gg_podcast","obs_rel_gg_kogan"],"eventIds":["obs_event_gg_bpma_exit","obs_event_gg_influence_launch","obs_event_gg_pitch","obs_event_gg_book1","obs_event_gg_book2"],"observationIds":[],"limitations":["saturation_open","joint_formation_account_attributed","sole_founder_language_prohibited","institutional_ownership_not_personal","internal_authority_unavailable","distributed_labor_incomplete","venture_cap_tables_unverified","ip_and_contract_terms_unavailable","causal_performance_unmeasured","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.80,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_gordon_glenister_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='gordon-glenister' LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_gordon_glenister_100',
'{"packageId":"gordon-glenister-1.0.0","claimsLoaded":10,"relationshipsLoaded":6,"eventsLoaded":5,"publication":"draft","saturation":"open","roleBuiltFlag":true}'::jsonb,
'Public-evidence package imported as draft. Joint-formation, institutional ownership, distributed labor, causality, contract, IP, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
