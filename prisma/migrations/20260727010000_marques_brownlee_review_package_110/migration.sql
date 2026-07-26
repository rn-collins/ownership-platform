-- Marques Brownlee expanded public-evidence review package 1.1.0.
-- Draft only. Preserves 1.0.0; does not publish, verify, score, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb_fortune','https://fortune.com/2024/02/22/marques-brownlee-youtube-at-accessories-company-ridge/','Marques Brownlee joins Ridge as chief creative partner','Fortune','reported_interview','2024-02-22T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_atoms','https://atoms.com/collections/atoms-x-mkbhd','Atoms x MKBHD collection','Atoms','manufacturer_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_opal','https://www.prnewswire.com/news-releases/opal-camera-closes-17m-series-a-led-by-founders-fund-kindred-ventures-mkbhd-and-casey-neistat-301966530.html','Opal Camera closes Series A','Opal Camera','issuer_release','2023-10-25T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb_riverside','https://techcrunch.com/2024/12/09/riverside-raises-30-million-series-c-to-expand-its-podcast-and-video-recording-platform/','Riverside raises Series C','TechCrunch','reported_company_financing','2024-12-09T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_panels_launch','https://www.theverge.com/2024/9/24/24253023/mkbhd-panels-wallpaper-app-response-criticism','MKBHD responds to Panels criticism','The Verge','reported_first_person_response','2024-09-24T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_panels_price','https://www.theverge.com/2024/10/11/24267900/marques-brownlee-mkbhd-price-panels-wallpaper-app','MKBHD says Panels failed on price','The Verge','reported_first_person_response','2024-10-11T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_panels_close','https://www.theverge.com/news/835090/mkbhd-panels-wallpaper-app-shutdown','MKBHD is taking down Panels','The Verge','reported_first_party_notice','2025-12-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_mb_panels_metrics','https://techcrunch.com/2025/12/01/mkbhds-wallpaper-app-panels-is-shutting-down/','Panels wallpaper app is shutting down','TechCrunch','independent_reporting','2025-12-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb_110_team',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'staffed_production','The Studio surface documents a multi-person production operation around MKBHD output.','operating_capacity','observed','unreviewed',NULL,'MKBHD is produced through a visible team, not a literally solo workflow.','Complete roster, employment status, employer and headcount are unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_ridge_limits',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'ridge_economic_limits','Ridge identified Brownlee as an equity investor, board member and chief creative partner; the stake and responsibilities were undisclosed or still developing at announcement.','economic_ownership','observed','unreviewed',NULL,'Ridge announced an equity-linked board and creative role for Brownlee in 2024.','No stake size, consideration, security class, voting rights, vesting or current status is established.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_atoms',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'product_collaboration','Atoms markets multiple M251 products as collaborations or designs with MKBHD.','commercial_relationship','observed','unreviewed',NULL,'Brownlee collaborated with Atoms on multiple M251 footwear releases.','Collaboration is not evidence of Atoms equity, company ownership, royalty rate, IP ownership or sales.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_opal',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'startup_investment','Opal named Brownlee among investors in its 2023 Series A.','economic_ownership','observed','unreviewed',NULL,'Brownlee was publicly identified as an investor in Opal Camera’s Series A.','Amount, percentage, security, governance, dilution, current holding and return are undisclosed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_riverside',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'startup_investment','Riverside financing coverage identifies Brownlee as an angel investor.','economic_ownership','observed','unreviewed',NULL,'Brownlee has been publicly identified as an angel investor in Riverside.','Primary confirmation, round, amount, percentage, current holding and rights remain unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_panels_launch',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'software_venture_launch','Panels launched with advertising and subscription access and a stated 50/50 artist profit split.','business_model','observed','unreviewed',NULL,'Panels tested subscription and advertising access with a stated artist profit-sharing arrangement.','The split is an attributed statement, not audited payout evidence; entity and cap table are unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_panels_revision',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'product_revision','Brownlee acknowledged pricing and privacy-disclosure concerns and Panels revised pricing and its free experience.','governance_accountability','observed','unreviewed',NULL,'Panels changed pricing and product terms after criticism while Brownlee acknowledged launch mistakes.','Do not infer intent, illegality, actual collection of all disclosed data or complete remediation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_panels_close',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'venture_closure','Panels announced closure, cancellation or refunds, user-data deletion and an open-source plan.','exit_reversibility','observed','unreviewed',NULL,'Panels announced a December 2025 shutdown and a wind-down plan.','Verify completion of refunds, deletion and code release before stating they occurred; app estimates are unaudited.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb_110_synthesis',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'relationship_portfolio','The record distinguishes publishing, production, distribution, commerce, collaboration, minority investment and operating authority.','portfolio_architecture','interpretive','unreviewed',NULL,'Brownlee is a case for distinguishing ownership from distribution, collaboration, investment and operating authority.','This is not a score and must not collapse all relationships into companies owned.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb110_ridge','obs_claim_mb_110_ridge_limits','obs_src_mb_fortune','qualifies',NULL,'Appointment interview','Economics and duties withheld.',CURRENT_TIMESTAMP),
('obs_ev_mb110_atoms','obs_claim_mb_110_atoms','obs_src_mb_atoms','supports',NULL,'Collection and product pages','Manufacturer documents design collaboration.',CURRENT_TIMESTAMP),
('obs_ev_mb110_opal','obs_claim_mb_110_opal','obs_src_mb_opal','supports',NULL,'New investors section','Issuer financing announcement.',CURRENT_TIMESTAMP),
('obs_ev_mb110_river','obs_claim_mb_110_riverside','obs_src_mb_riverside','supports',NULL,'Financing report','Secondary report; seek primary confirmation.',CURRENT_TIMESTAMP),
('obs_ev_mb110_pl','obs_claim_mb_110_panels_launch','obs_src_mb_panels_launch','supports',NULL,'Launch response','Attributed model and artist split.',CURRENT_TIMESTAMP),
('obs_ev_mb110_pr','obs_claim_mb_110_panels_revision','obs_src_mb_panels_price','supports',NULL,'Pricing response','Acknowledged pricing failure and revisions.',CURRENT_TIMESTAMP),
('obs_ev_mb110_pc','obs_claim_mb_110_panels_close','obs_src_mb_panels_close','supports',NULL,'Closure notice','Announced actions, completion not assumed.',CURRENT_TIMESTAMP),
('obs_ev_mb110_pcm','obs_claim_mb_110_panels_close','obs_src_mb_panels_metrics','qualifies',NULL,'Third-party estimates','Unaudited app-intelligence estimates excluded from factual performance claims.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb110_atoms',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'organization','Atoms','product_design_collaborator',NULL,NULL,'unreviewed','draft','obs_src_mb_atoms',NULL,'M251 collection',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb110_opal',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'organization','Opal Camera','investor','2023-10-25T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb_opal',NULL,'Series A announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb110_riverside',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'organization','Riverside','angel_investor',NULL,NULL,'unreviewed','draft','obs_src_mb_riverside',NULL,'Secondary financing report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb110_panels',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'product','Panels','founder_facing_product_operator','2024-09-01T00:00:00Z','2025-12-31T00:00:00Z','unreviewed','draft','obs_src_mb_panels_close',NULL,'Month/year start; announced closure date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb110_opal',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'investment_disclosed','Opal identifies Brownlee as Series A investor','Stake economics and rights undisclosed.','2023-10-25T00:00:00Z','day','unreviewed','draft','obs_src_mb_opal',NULL,'Release date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb110_panels_launch',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'product_launch','Panels launches','Subscription and advertising wallpaper app; entity unresolved.','2024-09-01T00:00:00Z','month','unreviewed','draft','obs_src_mb_panels_launch',NULL,'Launch month',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb110_panels_revision',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'product_revision','Panels revises pricing and free experience','Response to launch criticism.','2024-10-11T00:00:00Z','day','unreviewed','draft','obs_src_mb_panels_price',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb110_panels_close',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'venture_closure_announced','Panels closure announced','Completion of wind-down commitments requires verification.','2025-12-01T00:00:00Z','day','unreviewed','draft','obs_src_mb_panels_close',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_marques_brownlee_110','marques-brownlee-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'1.1.0',
'research/observatory/dossiers/marques-brownlee-1.1.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_mb_110_team","obs_claim_mb_110_ridge_limits","obs_claim_mb_110_atoms","obs_claim_mb_110_opal","obs_claim_mb_110_riverside","obs_claim_mb_110_panels_launch","obs_claim_mb_110_panels_revision","obs_claim_mb_110_panels_close","obs_claim_mb_110_synthesis"],"relationshipIds":["obs_rel_mb110_atoms","obs_rel_mb110_opal","obs_rel_mb110_riverside","obs_rel_mb110_panels"],"eventIds":["obs_event_mb110_opal","obs_event_mb110_panels_launch","obs_event_mb110_panels_revision","obs_event_mb110_panels_close"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","mkbhd_legal_entity_and_cap_table_unresolved","team_employment_boundary_unresolved","vox_contract_economics_unavailable","ridge_stake_and_rights_unavailable","atoms_economics_and_ip_unavailable","startup_investment_terms_unavailable","panels_entity_and_cap_table_unresolved","panels_wind_down_completion_unverified","revenue_profit_and_valuation_unavailable","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.84,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_marques_package_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marques-brownlee'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_marques_brownlee_110',
'{"packageId":"marques-brownlee-1.1.0","newSources":8,"newClaims":9,"newRelationships":4,"newEvents":4,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Expanded package separates owned or controlled publishing from team operation, distribution, commerce, product collaboration, minority investment, formal Ridge authority and the Panels product lifecycle.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
