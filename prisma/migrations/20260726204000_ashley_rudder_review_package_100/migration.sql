-- Ashley Rudder public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Creator-economy executive whose employers created company-specific Chief Creator Officer roles with distinct teams, remits and institutional dependencies.',
    "summary"='A role-construction case separating employer-specific appointments from global firstness, ownership, sole labor, performance attribution and psychology.',
    "inclusionRationale"='Tests how institutions create new executive roles around demonstrated creator-economy expertise while retaining organizational and evidentiary boundaries.',
    "roleBuiltFlag"=true,"verificationStatus"='in_review',"evidenceCoverage"=0.82,"publicStatus"='draft',"updatedAt"=CURRENT_TIMESTAMP
WHERE "slug"='ashley-rudder';

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_ar_whalar','https://www.prnewswire.com/news-releases/whalar-names-ashley-rudder-first-ever-chief-creator-officer-301729971.html','Whalar names Ashley Rudder first-ever Chief Creator Officer','Whalar / PR Newswire','issuer_release','2023-01-25T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ar_bi','https://www.businessinsider.com/whalar-global-chief-creator-officer-new-c-suite-role-position-2023-1','I am the first chief creator officer at my company','Business Insider','attributed_interview','2023-01-30T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ar_dny','https://attivogroup.co/news/deutsch-ny-unveils-integrated-agency-model-launches-socistudio-and-hires-ashley-rudder-to-chief-creator-officer/','Deutsch NY unveils integrated agency model','Attivo Group / Deutsch NY','employer_announcement','2024-07-24T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ar_campaign','https://www.campaignlive.com/article/deutsch-ny-revamps-offer-around-creators-content/1882169','Deutsch NY revamps offer around creators and content','Campaign','trade_reporting','2024-07-25T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ar_muse','https://musebyclios.com/culture-creators/ashley-rudder-on-steering-deutsch-n-y-deeper-into-creator-content/','Ashley Rudder on steering Deutsch NY deeper into creator content','Muse by Clio','trade_interview','2024-08-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ar_lbb','https://lbbonline.com/news/5-minutes-with-ashley-rudder','5 Minutes with Ashley Rudder','Little Black Book','trade_interview','2022-08-02T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ar_elc','https://www.elcompanies.com/en/news-and-media/newsroom/company-features/2020/black-history-month','ELC celebrates Black History Month','Estée Lauder Companies','corporate_record','2020-03-11T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ar_site','https://www.ashleyrudder.com/','Ashley Rudder professional site','Ashley Rudder','first_party_portfolio',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ar_whalar_case','https://ashleyrudder.com/whalar.html','Whalar case study','Ashley Rudder','first_party_case_study',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_ar_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'career_progression','Rudder progressed from makeup artistry into digital-content leadership at M·A·C before later creator-economy roles.','role_history','observed','unreviewed',NULL,'Corporate and trade records document a progression from artistry to digital-content leadership.','Do not infer ownership, sole authorship, budget authority or causal performance from title progression.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'role_construction','Rudder said she proposed expanded creator support at Whalar and management later created a Global Chief Creator Officer role that she began in December 2022.','institutional_role_construction','attributed','unreviewed',NULL,'An attributed first-person account supports deliberate creation of a new Whalar executive role after Rudder proposed expanded creator support.','This proves a company-specific formation account, not global firstness or unilateral creation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'firstness_boundary','Whalar called Rudder the industry’s first-ever Global Chief Creator Officer.','firstness_claim','attributed','unreviewed',NULL,'Whalar publicly described Rudder as its and the industry’s first Global Chief Creator Officer.','Keep the claim attributed; no exhaustive worldwide title registry establishes an absolute first.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'institutional_remit','Whalar described Rudder’s remit across creator sourcing, negotiations, contracts, consultation and performance analysis with team and data-system support.','delegated_authority','observed','unreviewed',NULL,'Whalar assigned a broad creator-support and campaign remit backed by a global team and institutional systems.','Executive remit is delegated authority, not personal ownership or sole labor.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'employer_specific_appointment','Deutsch NY appointed Rudder as its first Chief Creator Officer in July 2024.','role_transition','observed','unreviewed',NULL,'Rudder became the first holder of the Chief Creator Officer post at Deutsch NY.','Do not generalize an employer-specific first into a worldwide or industry-wide first.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'shared_operating_system','Deutsch NY launched SociStudio with Rudder over creative and Tom Lyons as studio president.','distributed_leadership','observed','unreviewed',NULL,'SociStudio launched within a multi-executive agency structure with distinct creative and presidential leadership.','Do not describe SociStudio as solely founded, owned or operated by Rudder.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'inherited_capability','Rudder stated that Deutsch NY already had a content shop when she joined and described her initial work as listening and forming hypotheses.','institutional_preexistence','attributed','unreviewed',NULL,'Rudder joined an agency with pre-existing content capability and began with an assessment phase.','This contradicts ex nihilo or sole-causation descriptions of the creator practice.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ar_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'psychology_boundary','No reviewed source validly measures Rudder’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships, teams and events, not psychology.','Do not infer motivation, cognition, resilience, personality or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_ar_c01','obs_claim_ar_c01','obs_src_ar_elc','supports',NULL,'2020 M·A·C panel participant title','Corporate title record; authority and ownership not inferred.',CURRENT_TIMESTAMP),
('obs_ev_ar_c02','obs_claim_ar_c02','obs_src_ar_bi','supports',NULL,'As-told-to role-formation account','Attributed first-person evidence, edited by publication.',CURRENT_TIMESTAMP),
('obs_ev_ar_c03','obs_claim_ar_c03','obs_src_ar_whalar','supports',NULL,'Appointment headline and release body','Employer publicity claim; universal firstness unverified.',CURRENT_TIMESTAMP),
('obs_ev_ar_c04','obs_claim_ar_c04','obs_src_ar_whalar','supports',NULL,'Stated CCO remit','Employer-defined authority and support systems.',CURRENT_TIMESTAMP),
('obs_ev_ar_c05a','obs_claim_ar_c05','obs_src_ar_dny','supports',NULL,'DNY appointment announcement','Employer-specific appointment evidence.',CURRENT_TIMESTAMP),
('obs_ev_ar_c05b','obs_claim_ar_c05','obs_src_ar_muse','supports',NULL,'First holder at agency','Independent trade interview narrows scope to agency.',CURRENT_TIMESTAMP),
('obs_ev_ar_c06','obs_claim_ar_c06','obs_src_ar_dny','supports',NULL,'SociStudio launch and Tom Lyons appointment','Multi-executive formation evidence.',CURRENT_TIMESTAMP),
('obs_ev_ar_c07','obs_claim_ar_c07','obs_src_ar_muse','supports',NULL,'Early-role interview','Attributed evidence of inherited capability and assessment phase.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_ar_mac',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'organization','M·A·C Cosmetics','former_artist_and_digital_content_executive',NULL,NULL,'unreviewed','draft','obs_src_ar_elc',NULL,'Employee role; ownership and IP not inferred',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ar_whalar',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'organization','Whalar','former_head_of_creator_partnerships_and_global_chief_creator_officer','2021-09-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ar_whalar',NULL,'Exact departure terms unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ar_dny',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'organization','Deutsch New York','chief_creator_officer','2024-07-24T00:00:00Z',NULL,'unreviewed','draft','obs_src_ar_dny',NULL,'Current status and contract unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ar_soci',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'organization','SociStudio','creative_oversight','2024-07-24T00:00:00Z',NULL,'unreviewed','draft','obs_src_ar_dny',NULL,'Tom Lyons separately appointed president',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ar_lyons',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'person','Tom Lyons','parallel_soci_studio_executive','2024-07-24T00:00:00Z',NULL,'unreviewed','draft','obs_src_ar_dny',NULL,'Distinct authority and contribution',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_ar_mac_2020',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'role_snapshot','M·A·C digital-content title documented','ELC identifies Rudder as Director, Digital Content & Artistry.','2020-03-11T00:00:00Z','day','unreviewed','draft','obs_src_ar_elc',NULL,'Corporate event record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ar_whalar_join',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'role_transition','Rudder joins Whalar','Rudder joins as North American Head of Creator Partnerships.','2021-09-01T00:00:00Z','month','unreviewed','draft','obs_src_ar_whalar',NULL,'Employer chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ar_whalar_cco',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'role_construction','Whalar CCO role begins','Attributed account dates the new Global Chief Creator Officer role to December 2022.','2022-12-01T00:00:00Z','month','unreviewed','draft','obs_src_ar_bi',NULL,'Attributed first-person chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ar_dny_cco',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'role_transition','Deutsch NY appoints Chief Creator Officer','DNY appoints Rudder and launches SociStudio with separate presidential leadership.','2024-07-24T00:00:00Z','day','unreviewed','draft','obs_src_ar_dny',NULL,'Employer announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_ashley_rudder_100','ashley-rudder-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'1.0.0','research/observatory/dossiers/ashley-rudder-1.0.0.md','1801e74ed422b75613d3e090df0caec453b77e8c',
'{"claimIds":["obs_claim_ar_c01","obs_claim_ar_c02","obs_claim_ar_c03","obs_claim_ar_c04","obs_claim_ar_c05","obs_claim_ar_c06","obs_claim_ar_c07","obs_claim_ar_c08"],"relationshipIds":["obs_rel_ar_mac","obs_rel_ar_whalar","obs_rel_ar_dny","obs_rel_ar_soci","obs_rel_ar_lyons"],"eventIds":["obs_event_ar_mac_2020","obs_event_ar_whalar_join","obs_event_ar_whalar_cco","obs_event_ar_dny_cco"],"observationIds":[],"limitations":["saturation_open","global_firstness_unverified","employer_specific_roles_only","delegated_authority_not_ownership","distributed_labor_incomplete","current_role_status_incomplete","contract_and_ip_terms_unavailable","self_reported_metrics_not_independently_verified","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.82,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_ashley_rudder_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='ashley-rudder' LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_ashley_rudder_100',
'{"packageId":"ashley-rudder-1.0.0","claimsLoaded":8,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft","saturation":"open","roleBuiltFlag":true}'::jsonb,
'Public-evidence package imported as draft. Global firstness, ownership, sole labor, causality, contract, IP, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
