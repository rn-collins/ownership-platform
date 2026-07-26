-- Claire Zau public-evidence review package 1.1.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Early-stage investor combining venture work with collaborative new-media strategy and public AI communication.',
    "summary"='A firm-specific hybrid-role case separating appointment novelty, pre-existing capabilities, institutional infrastructure, collaborative labor, ownership, authority and causal performance.',
    "inclusionRationale"='Tests how an institution can combine investment and creator functions without evidence supporting worldwide firstness, sole role construction, personal ownership or sole causation.',
    "roleBuiltFlag"=false,"verificationStatus"='in_review',"evidenceCoverage"=0.79,"publicStatus"='draft',"updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='claire-zau';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_cz11_lsvp','https://lsvp.com/team-member/claire-zau/','Claire Zau','Lightspeed Venture Partners','institutional_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_machiz','https://www.linkedin.com/posts/joshmachiz_lightspeed-just-did-something-completely-activity-7460417381257949185-iSGr','Lightspeed hired its first investor + creator','Josh Machiz / LinkedIn','executive_announcement',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_zau','https://www.linkedin.com/posts/clairezau_im-beyond-excited-to-announce-that-im-joining-activity-7460414042734706688-8Xjn','Claire Zau joins Lightspeed','Claire Zau / LinkedIn','first_person_announcement',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_bi','https://www.businessinsider.com/why-lightspeed-ventures-hired-first-creator-seed-investor-claire-zau-2026-5','There is a new type of VC in Silicon Valley: the creator-investor','Business Insider','journalism','2026-05-23T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_gsv','https://gsv.ventures/our-team/','GSV Ventures team','GSV Ventures','institutional_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_asugsv','https://asugsvsummit.com/leadership/claire-zau','Claire Zau','ASU+GSV Summit','institutional_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_fortune','https://fortune.com/media/a9e68e36-f547-4aed-ad61-fcb1ebfff0a9','This creator investor on the truth about the AI gold rush','Fortune','editorial_interview','2026-05-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cz11_stanford','https://edupreneurship.stanford.edu/resource/education-innovation-newsletters/','Education innovation newsletters','Stanford University','university_directory',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_cz11_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'role_appointment','Lightspeed identifies Zau as Partner & New Media and a pre-seed and seed investor.','hybrid_professional_role','observed','unreviewed',NULL,'Zau holds a combined investment and new-media role at Lightspeed.','Title does not establish equity, carry, voting power, compensation or unilateral control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'collaborative_remit','Lightspeed says Zau helps shape new-media strategy and co-hosts Lightwork.','distributed_labor','observed','unreviewed',NULL,'Her media remit is collaborative and institutionally situated.','Do not rewrite helps shape or co-hosts as sole creation, ownership or operation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'firstness_boundary','A Lightspeed executive described Zau as the firm’s first investor + creator.','role_firstness','attributed','unreviewed',NULL,'Lightspeed publicly describes this as its first combined investor-creator appointment.','Do not claim first worldwide or first across venture capital.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'prior_role','Before Lightspeed, GSV and ASU+GSV described Zau as Partner and AI Lead with responsibility for AI investment coverage.','role_history','observed','unreviewed',NULL,'The investment component of her current role predates Lightspeed.','Do not attribute GSV funds, deals, portfolio results or decision rights personally to Zau.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'preexisting_media','Zau built personal social distribution and published AI-and-education knowledge work while at GSV.','preexisting_capability','mixed','unreviewed',NULL,'Her personal media activity predates the Lightspeed appointment.','Follower counts do not prove audience ownership, revenue, deal flow, influence or investment performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'institutional_boundary','Lightspeed’s investing, marketing, founder-support and media infrastructure pre-existed Zau’s appointment.','institutional_system','observed','unreviewed',NULL,'The hybrid role entered an existing multi-team institution.','Do not say Lightspeed’s platform or media apparatus was built solely around Zau.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'ownership_boundary','No reviewed public record establishes Zau’s partnership economics, voting power, investment-committee authority, content IP, audience-data rights or compensation.','claim_restriction','observed','unreviewed',NULL,'Public evidence establishes role and activity, not private economics or control.','Absence of public evidence is not proof that no private rights exist.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cz11_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'psychology_boundary','No reviewed source validly measures Zau’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships and events, not psychology.','Do not infer motivation, cognition, resilience, personality or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_cz11_c01','obs_claim_cz11_c01','obs_src_cz11_lsvp','supports',NULL,'Current role profile','Employer role description.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c02','obs_claim_cz11_c02','obs_src_cz11_lsvp','supports',NULL,'Role summary','Narrow verbs preserve collaborative attribution.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c03','obs_claim_cz11_c03','obs_src_cz11_machiz','supports',NULL,'Appointment announcement','Firm-specific attributed firstness only.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c04a','obs_claim_cz11_c04','obs_src_cz11_gsv','supports',NULL,'Claire Zau biography','Former-employer role snapshot may be stale.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c04b','obs_claim_cz11_c04','obs_src_cz11_asugsv','supports',NULL,'Leadership biography','Institutional corroboration.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c05a','obs_claim_cz11_c05','obs_src_cz11_bi','supports',NULL,'Audience and publishing chronology','Reported scale remains time-sensitive.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c05b','obs_claim_cz11_c05','obs_src_cz11_stanford','supports',NULL,'Newsletter directory','Independent listing, not performance validation.',CURRENT_TIMESTAMP),
('obs_ev_cz11_c06','obs_claim_cz11_c06','obs_src_cz11_lsvp','supports',NULL,'Institutional site context','Role sits inside a multi-person firm system.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_cz11_gsv',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'organization','GSV Ventures','former_partner_and_ai_lead','2020-01-01T00:00:00Z','2026-05-01T00:00:00Z','unreviewed','draft','obs_src_cz11_gsv',NULL,'Start and end dates bounded; exact personnel record unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz11_asugsv',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'organization','ASU+GSV Summit','program_and_thought_leadership_collaborator',NULL,'2026-05-01T00:00:00Z','unreviewed','draft','obs_src_cz11_asugsv',NULL,'Full project and labor history unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz11_lsvp',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'organization','Lightspeed Venture Partners','partner_and_new_media','2026-05-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cz11_lsvp',NULL,'Economics, voting and contract terms unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz11_machiz',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'person','Josh Machiz','media_collaborator_and_cohost','2026-05-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cz11_machiz',NULL,'Authority split and rights unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz11_lightwork',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'product','Lightwork','cohost','2026-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cz11_lsvp',NULL,'Production, IP and economics unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cz11_personalmedia',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'product','Claire Zau personal social accounts','creator_publisher','2024-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cz11_bi',NULL,'Reported independent from firm; platform and contract dependencies remain',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_cz11_gsv',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'role_history','GSV investment tenure begins','Later profiles describe an approximately six-year GSV investment tenure.','2020-01-01T00:00:00Z','year_approximate','unreviewed','draft','obs_src_cz11_gsv',NULL,'Exact start date unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz11_media',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'media_launch','Regular short-form AI publishing','Later reporting places regular social publishing in 2024.','2024-01-01T00:00:00Z','year','unreviewed','draft','obs_src_cz11_bi',NULL,'Exact first-publication date unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz11_forbes',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'recognition','Forbes venture-capital profile','Forbes includes Zau in its 2025 30 Under 30 venture-capital list.','2025-01-01T00:00:00Z','year','unreviewed','draft','obs_src_cz11_fortune',NULL,'Recognition is not investment-performance proof',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz11_lsvp',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'role_appointment','Lightspeed appointment','Lightspeed appoints Zau to a combined Partner & New Media role.','2026-05-01T00:00:00Z','month','unreviewed','draft','obs_src_cz11_machiz',NULL,'Public announcement month',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cz11_snapshot',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'role_snapshot','Lightspeed role snapshot','Current profile describes investment, new-media strategy and Lightwork co-hosting.','2026-07-26T00:00:00Z','day','unreviewed','draft','obs_src_cz11_lsvp',NULL,'Access-date snapshot',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_claire_zau_110','claire-zau-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'1.1.0','research/observatory/dossiers/claire-zau-1.1.0.md','aefaa7b206bb3f4615e36b636c54400da39111e8',
'{"claimIds":["obs_claim_cz11_c01","obs_claim_cz11_c02","obs_claim_cz11_c03","obs_claim_cz11_c04","obs_claim_cz11_c05","obs_claim_cz11_c06","obs_claim_cz11_c07","obs_claim_cz11_c08"],"relationshipIds":["obs_rel_cz11_gsv","obs_rel_cz11_asugsv","obs_rel_cz11_lsvp","obs_rel_cz11_machiz","obs_rel_cz11_lightwork","obs_rel_cz11_personalmedia"],"eventIds":["obs_event_cz11_gsv","obs_event_cz11_media","obs_event_cz11_forbes","obs_event_cz11_lsvp","obs_event_cz11_snapshot"],"observationIds":[],"limitations":["saturation_open","firm_specific_firstness_only","worldwide_firstness_prohibited","role_built_flag_false","institutional_ownership_not_personal","distributed_labor_incomplete","deal_attribution_unverified","audience_and_ip_rights_unavailable","partnership_economics_unavailable","causal_performance_unmeasured","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.79,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_claire_zau_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='claire-zau' LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_claire_zau_110',
'{"packageId":"claire-zau-1.1.0","claimsLoaded":8,"relationshipsLoaded":6,"eventsLoaded":5,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded public-evidence package imported as draft. Firm-specific-firstness, collaboration, institutional ownership, audience, IP, investment attribution, economics, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
