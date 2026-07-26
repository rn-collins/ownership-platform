-- Alexandr Wang public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, establish global firstness, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_aw_memo','https://fortune.com/2025/07/02/key-takeaways-from-mark-zuckerbergs-memo-on-metas-new-superintelligence-ai-effort-and-key-hires/','Zuckerberg memo announcing MSL leadership','Meta via Fortune','reported_primary_text','2025-07-02T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_aw_scale_phase','https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution','Scale AI announces next phase','Scale AI','company_release','2025-06-12T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_aw_scale_trust','https://scale.com/blog/customer-trust-scale-meta-deal','Customer trust and the Scale-Meta deal','Scale AI','company_statement','2025-06-18T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_aw_meta_q2','https://www.sec.gov/Archives/edgar/data/1326801/000162828025036791/meta-20250630.htm','Meta Q2 2025 Form 10-Q','U.S. Securities and Exchange Commission','regulatory_filing','2025-07-31T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_aw_meta_q3','https://www.sec.gov/Archives/edgar/data/1326801/000162828025047240/meta-20250930.htm','Meta Q3 2025 Form 10-Q','U.S. Securities and Exchange Commission','regulatory_filing','2025-10-30T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_aw_meta_title','https://about.fb.com/news/2025/10/teen-ai-safety-approach/amp/','Teen AI safety approach','Meta','company_publication','2025-10-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_aw_reuters_zhao','https://www.reuters.com/business/meta-names-chatgpt-co-creator-chief-scientist-superintelligence-lab-2025-07-25/','Meta names MSL chief scientist','Reuters','independent_reporting','2025-07-25T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_aw_tc_msl','https://techcrunch.com/2025/06/30/meta-restructures-its-ai-unit-under-superintelligence-labs/','Meta restructures AI unit under MSL','TechCrunch','independent_reporting','2025-06-30T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_aw_tc_reorg','https://techcrunch.com/2025/08/19/meta-is-shaking-up-its-ai-org-again/','Meta shakes up AI organization again','TechCrunch','independent_reporting','2025-08-19T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_aw_ap_deal','https://apnews.com/article/4b55aabf7ea018e38ffdccb66e37cf26','Meta makes major Scale AI investment','Associated Press','independent_reporting','2025-06-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_aw_tc_deal','https://techcrunch.com/2025/06/13/scale-ai-confirms-significant-investment-from-meta-says-ceo-alexandr-wang-is-leaving/','Scale confirms Meta investment and CEO transition','TechCrunch','independent_reporting','2025-06-13T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET
"url"=EXCLUDED."url","title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_aw_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'appointment','Meta appointed Wang Chief AI Officer and MSL leader in 2025.','role_formation','observed','unreviewed',NULL,'Meta appointed Alexandr Wang Chief AI Officer in 2025 to lead Meta Superintelligence Labs.','Employment start-day precision unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'company_firstness','No earlier holder of Meta exact Chief AI Officer title was identified in the reviewed public record.','claim_restriction','observed','unreviewed',NULL,'Wang is the first publicly documented holder of Meta’s exact Chief AI Officer title in the reviewed record.','Not a global first; absence-bounded and exact-title specific.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'remit','MSL was announced as an umbrella for foundations, product, FAIR and a next-generation-model lab.','operating_authority','observed','unreviewed',NULL,'MSL was announced as an umbrella for Meta’s foundation-model, product, FAIR and next-generation-model work.','Announced scope is not proof of stable operating control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'distributed_leadership','Nat Friedman and Shengjia Zhao held named product, applied-research and scientific leadership roles alongside Wang.','governance_accountability','observed','unreviewed',NULL,'Wang’s MSL leadership operated alongside named product, applied-research and scientific leaders.','Do not portray Wang as sole author or decision-maker for all Meta AI work.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'investment','Meta recorded a $13.79B Scale investment; Scale said the transaction valued it above $29B and reporting described roughly $14.3B for 49%.','capital_ownership','observed','unreviewed',NULL,'Meta made a roughly $14B investment in Scale, which Scale said valued the company above $29B.','Distinguish carrying amount, consideration, reported percentage and valuation framing.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'non_control_boundary','Meta reports its Scale interest as non-voting minority and says it lacks significant influence.','control_rights','observed','unreviewed',NULL,'Meta reports a non-voting minority Scale stake and says it does not exercise significant influence.','Do not describe the transaction as acquisition or control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'role_transition','Wang left Scale CEO, Jason Droege became interim CEO, and Wang remained a director.','role_transition','observed','unreviewed',NULL,'Wang left Scale’s CEO role to join Meta but retained a Scale board seat.','Do not say he severed Scale ties or continued to run it.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'independence_representation','Scale represented that operations remained independent and Meta gained no customer-confidential or internal-system access.','governance_accountability','observed','unreviewed',NULL,'Scale represented that the transaction preserved operational independence and existing customer-data protections.','Company representation, not independent audit.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'organizational_change','Meta AI architecture changed after MSL was announced, including formation of four groups and Wang-led TBD Lab.','institution_building','observed','unreviewed',NULL,'Meta’s AI organization continued to change after MSL was announced.','All authority and remit claims must be time-indexed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_aw_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'ownership_authority_synthesis','The case combines founder governance continuity at Scale with delegated executive authority at Meta.','portfolio_architecture','interpretive','unreviewed',NULL,'Wang’s case distinguishes ownership and board continuity in one institution from delegated executive authority in another.','Interpretive only; not score, causation or psychology.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_aw_c01a','obs_claim_aw_c01','obs_src_aw_memo','supports',NULL,'Appointment paragraph','Memo text names exact title and MSL lead.',CURRENT_TIMESTAMP),
('obs_ev_aw_c01b','obs_claim_aw_c01','obs_src_aw_meta_title','supports',NULL,'Byline','Later first-party title confirmation.',CURRENT_TIMESTAMP),
('obs_ev_aw_c02','obs_claim_aw_c02','obs_src_aw_memo','qualifies',NULL,'Appointment paragraph','Supports title, not global or comprehensive firstness.',CURRENT_TIMESTAMP),
('obs_ev_aw_c03','obs_claim_aw_c03','obs_src_aw_memo','supports',NULL,'MSL structure paragraphs','Announced organizational scope.',CURRENT_TIMESTAMP),
('obs_ev_aw_c04a','obs_claim_aw_c04','obs_src_aw_memo','supports',NULL,'Nat Friedman paragraph','Shared product/applied-research leadership.',CURRENT_TIMESTAMP),
('obs_ev_aw_c04b','obs_claim_aw_c04','obs_src_aw_reuters_zhao','supports',NULL,'Chief scientist appointment','Scientific leadership boundary.',CURRENT_TIMESTAMP),
('obs_ev_aw_c05a','obs_claim_aw_c05','obs_src_aw_meta_q2','supports',NULL,'Non-marketable equity investments','Primary carrying amount.',CURRENT_TIMESTAMP),
('obs_ev_aw_c05b','obs_claim_aw_c05','obs_src_aw_scale_phase','supports',NULL,'Investment announcement','Company valuation framing.',CURRENT_TIMESTAMP),
('obs_ev_aw_c05c','obs_claim_aw_c05','obs_src_aw_ap_deal','qualifies',NULL,'Transaction reporting','Secondary percentage and consideration.',CURRENT_TIMESTAMP),
('obs_ev_aw_c06','obs_claim_aw_c06','obs_src_aw_meta_q2','supports',NULL,'Scale investment footnote','Primary non-voting/no-significant-influence boundary.',CURRENT_TIMESTAMP),
('obs_ev_aw_c07','obs_claim_aw_c07','obs_src_aw_scale_phase','supports',NULL,'Leadership transition','Company record.',CURRENT_TIMESTAMP),
('obs_ev_aw_c08','obs_claim_aw_c08','obs_src_aw_scale_trust','supports',NULL,'Independence and protections','Issuer representation.',CURRENT_TIMESTAMP),
('obs_ev_aw_c09','obs_claim_aw_c09','obs_src_aw_tc_reorg','supports',NULL,'Four-group reorganization','Post-launch reported change.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_aw_meta',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'organization','Meta','chief_ai_officer','2025-07-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_aw_memo',NULL,'Announcement date; exact employment date unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_aw_msl',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'organization','Meta Superintelligence Labs','announced_lead','2025-07-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_aw_memo',NULL,'Remit later reorganized',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_aw_scale_ceo',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'organization','Scale AI','cofounder_and_former_ceo',NULL,'2025-06-12T00:00:00Z','unreviewed','draft','obs_src_aw_scale_phase',NULL,'Founder date and exact CEO end date require precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_aw_scale_board',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'organization','Scale AI','director','2025-06-12T00:00:00Z',NULL,'unreviewed','draft','obs_src_aw_scale_phase',NULL,'Continuing board status announced; current status requires periodic verification',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_aw_friedman',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'person','Nat Friedman','named_msl_partner',NULL,NULL,'unreviewed','draft','obs_src_aw_memo',NULL,'Decision-right allocation unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_aw_zhao',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'person','Shengjia Zhao','msl_chief_scientist','2025-07-25T00:00:00Z',NULL,'unreviewed','draft','obs_src_aw_reuters_zhao',NULL,'Scientific authority distinct from CAIO',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_aw_deal',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'investment','Meta investment and Scale leadership transition announced','Non-voting minority boundary follows Meta filing.','2025-06-12T00:00:00Z','day','unreviewed','draft','obs_src_aw_scale_phase',NULL,'Announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_aw_trust',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'governance_statement','Scale publishes independence and customer-trust statement','Issuer representations require external verification.','2025-06-18T00:00:00Z','day','unreviewed','draft','obs_src_aw_scale_trust',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_aw_appointment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'appointment','Wang announced as Meta Chief AI Officer and MSL lead','Exact-title appointment.','2025-07-01T00:00:00Z','day','unreviewed','draft','obs_src_aw_memo',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_aw_zhao',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'appointment','Shengjia Zhao named MSL chief scientist','Scientific leadership boundary.','2025-07-25T00:00:00Z','day','unreviewed','draft','obs_src_aw_reuters_zhao',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_aw_reorg',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'reorganization','Meta AI organization restructured again','Four-group architecture reported.','2025-08-19T00:00:00Z','day','unreviewed','draft','obs_src_aw_tc_reorg',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_aw_title_confirm',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'title_confirmation','Meta publication retains Wang Chief AI Officer title','Current through later first-party publication.','2025-10-17T00:00:00Z','day','unreviewed','draft','obs_src_aw_meta_title',NULL,'Original publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_alexandr_wang_100','alexandr-wang-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'1.0.0',
'research/observatory/dossiers/alexandr-wang-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_aw_c01","obs_claim_aw_c02","obs_claim_aw_c03","obs_claim_aw_c04","obs_claim_aw_c05","obs_claim_aw_c06","obs_claim_aw_c07","obs_claim_aw_c08","obs_claim_aw_c09","obs_claim_aw_c10"],"relationshipIds":["obs_rel_aw_meta","obs_rel_aw_msl","obs_rel_aw_scale_ceo","obs_rel_aw_scale_board","obs_rel_aw_friedman","obs_rel_aw_zhao"],"eventIds":["obs_event_aw_deal","obs_event_aw_trust","obs_event_aw_appointment","obs_event_aw_zhao","obs_event_aw_reorg","obs_event_aw_title_confirm"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","global_first_claim_rejected","company_firstness_absence_bounded","employment_start_date_unresolved","scale_beneficial_ownership_unresolved","reported_49_percent_not_control","nonvoting_minority_boundary","scale_independence_not_independently_audited","meta_decision_rights_and_budget_unresolved","organization_evolved_after_launch","outcomes_not_established","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.82,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_alexandr_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='alexandr-wang'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_alexandr_wang_100',
'{"packageId":"alexandr-wang-1.0.0","sourcesAdded":11,"claimsAdded":10,"relationshipsAdded":6,"eventsAdded":6,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package separates Meta employment authority from Scale ownership and governance, rejects global firstness, preserves the non-voting minority boundary, and time-indexes the evolving MSL remit.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
