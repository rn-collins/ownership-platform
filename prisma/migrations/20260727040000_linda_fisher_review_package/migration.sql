-- Linda Fisher public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, validate DuPont sustainability, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_lf_dupont','https://www.prnewswire.com/news-releases/dupont-names-krysta-harden-as-vice-president-of-public-policy-and-chief-sustainability-officer-300229502.html','DuPont names Krysta Harden VP and CSO','DuPont','company_release','2016-03-02T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_lf_2004','https://www.pcimag.com/articles/85276-names-in-the-news-august-2004','Names in the News August 2004','PCI Magazine','contemporaneous_trade_report','2004-08-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_lf_sec','https://www.sec.gov/Archives/edgar/data/225648/000022564815000051/cva-123114xdef14a.htm','Covanta 2015 proxy statement','U.S. Securities and Exchange Commission','regulatory_filing','2015-03-20T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_lf_smj','https://sms.onlinelibrary.wiley.com/doi/10.1002/smj.3113','Chief sustainability officers and corporate social irresponsibility','Strategic Management Journal','peer_reviewed_research','2020-04-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_lf_edf','https://www.forbes.com/sites/edfenergyexchange/2017/09/28/raising-the-bar-on-corporate-sustainability-a-one-on-one-with-former-dupont-cso-linda-fisher/','Raising the bar on corporate sustainability','Environmental Defense Fund via Forbes','advocacy_interview','2017-09-28T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_lf_guardian','https://www.theguardian.com/sustainable-business/dupont-cso-innovation-critics','DuPont CSO: focus on innovation and listen to critics','The Guardian','first_person_reported_interview','2013-01-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_lf_results','https://www.prweb.com/releases/new_report_dupont_achieves_most_sustainability_goals_3_years_ahead_of_schedule/prweb11388938.htm','DuPont reports sustainability goal progress','DuPont','company_reported_results','2013-12-04T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_lf_pfoa','https://www.taipeitimes.com/News/bizfocus/archives/2004/08/08/2003197953','DuPont in deep water over Teflon hidden danger','Taipei Times','independent_reporting','2004-08-08T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_lf_nature','https://naturebridge.org/about-us/leadership/linda-fisher','Linda Fisher board biography','NatureBridge','organization_biography',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_lf_eli','https://www.eli.org/news/eli-welcomes-nine-new-members-its-leadership-council','ELI welcomes Leadership Council members','Environmental Law Institute','organization_record','2020-12-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET
"url"=EXCLUDED."url","title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_lf_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'appointment','DuPont appointed Fisher vice president and Chief Sustainability Officer effective July 12, 2004.','role_formation','observed','unreviewed',NULL,'DuPont appointed Linda Fisher vice president and Chief Sustainability Officer in 2004.','Do not infer C-suite reporting line from title alone.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'first_public_company','DuPont says the appointment made it the first publicly traded company to name a CSO.','claim_restriction','observed','unreviewed',NULL,'DuPont identifies Fisher’s appointment as the first CSO appointment by a publicly traded company.','World-first language is unsupported; private, nonprofit, academic, government and equivalent-title populations are excluded.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'remit','Fisher’s remit combined sustainability strategy, environment and health, product stewardship and global regulatory work.','operating_authority','observed','unreviewed',NULL,'Fisher’s DuPont remit combined sustainability strategy with environmental, health, product-stewardship and regulatory responsibilities.','Remit changed over time and does not prove final authority across business units.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'market_facing_goals','DuPont introduced market-facing sustainability goals in 2006 linking R&D and revenue to environmental benefits.','institution_building','observed','unreviewed',NULL,'Under Fisher’s leadership, DuPont introduced market-facing sustainability goals tied to product innovation and revenue.','Contribution is not sole causation; definitions and assurance must accompany metrics.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'governance_process','Fisher described annual business reviews and an eleven-criterion product-development screen.','governance_accountability','observed','unreviewed',NULL,'Fisher described mechanisms for integrating sustainability into portfolio and new-product review.','Interview evidence does not prove universal compliance or decision results.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'company_reported_results','DuPont reported footprint, R&D and product-revenue progress against its goals.','outcome_evidence','observed','unreviewed',NULL,'DuPont reported progress against several footprint and market-facing goals during Fisher’s tenure.','Retain company-reported; do not assume independent assurance, impact or additionality.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'pfoa_adverse_evidence','PFOA controversy and regulatory scrutiny were material during Fisher’s sustainability tenure.','governance_accountability','observed','unreviewed',NULL,'Fisher’s tenure included sustainability governance amid material PFOA controversy and phaseout efforts.','Do not attribute pre-appointment conduct personally or treat dialogue and phaseout as full resolution.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'retirement_succession','Fisher retired in February 2016 and Krysta Harden succeeded her.','role_transition','observed','unreviewed',NULL,'Fisher retired in 2016 and DuPont appointed Krysta Harden as successor.','Use personnel records for exact final-day precision.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'career_boundary','Fisher worked in senior EPA, Monsanto, Latham and Watkins, DuPont and governance roles.','portfolio_breadth','observed','unreviewed',NULL,'Fisher moved among environmental regulation, regulated industry, legal practice, corporate sustainability and governance roles.','Chronology does not establish conflict, capture, impropriety or ideology.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_lf_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'institutionalization_synthesis','The appointment formalized an executive sustainability remit but does not validate company sustainability.','portfolio_architecture','interpretive','unreviewed',NULL,'Fisher’s case separates institutionalized sustainability authority from empirical evaluation of corporate conduct.','Interpretive framework only; not a score or causal finding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_lf_c01','obs_claim_lf_c01','obs_src_lf_2004','supports',NULL,'Appointment item','Contemporaneous report.',CURRENT_TIMESTAMP),
('obs_ev_lf_c02','obs_claim_lf_c02','obs_src_lf_dupont','supports',NULL,'Succession quote','Issuer uses narrower population.',CURRENT_TIMESTAMP),
('obs_ev_lf_c03','obs_claim_lf_c03','obs_src_lf_sec','supports',NULL,'Director biography','Regulatory filing.',CURRENT_TIMESTAMP),
('obs_ev_lf_c04','obs_claim_lf_c04','obs_src_lf_dupont','supports',NULL,'Succession quote','Company chronology.',CURRENT_TIMESTAMP),
('obs_ev_lf_c05','obs_claim_lf_c05','obs_src_lf_guardian','supports',NULL,'Governance discussion','First-person process description.',CURRENT_TIMESTAMP),
('obs_ev_lf_c06','obs_claim_lf_c06','obs_src_lf_results','supports',NULL,'Reported milestones','Company-authored results.',CURRENT_TIMESTAMP),
('obs_ev_lf_c07_a','obs_claim_lf_c07','obs_src_lf_pfoa','supports',NULL,'2004 controversy','Contemporaneous adverse context.',CURRENT_TIMESTAMP),
('obs_ev_lf_c07_g','obs_claim_lf_c07','obs_src_lf_guardian','qualifies',NULL,'PFOA discussion','Later first-person phaseout account.',CURRENT_TIMESTAMP),
('obs_ev_lf_c08','obs_claim_lf_c08','obs_src_lf_dupont','supports',NULL,'Succession announcement','Company personnel record.',CURRENT_TIMESTAMP),
('obs_ev_lf_c09','obs_claim_lf_c09','obs_src_lf_nature','supports',NULL,'Biography','Organization career account.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_lf_dupont',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'organization','DuPont','vice_president_and_chief_sustainability_officer','2004-07-12T00:00:00Z','2016-02-29T00:00:00Z','unreviewed','draft','obs_src_lf_dupont',NULL,'End day approximate',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_lf_epa',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'government','U.S. Environmental Protection Agency','former_deputy_administrator_and_senior_official',NULL,'2003-07-11T00:00:00Z','unreviewed','draft','obs_src_lf_nature',NULL,'Multiple periods require chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_lf_monsanto',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'organization','Monsanto','former_vice_president_government_affairs',NULL,NULL,'unreviewed','draft','obs_src_lf_nature',NULL,'Dates unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_lf_latham',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'organization','Latham & Watkins','former_of_counsel',NULL,NULL,'unreviewed','draft','obs_src_lf_nature',NULL,'Dates and matters unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_lf_eli',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'organization','Environmental Law Institute','leadership_council_member','2020-12-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_lf_eli',NULL,'Organization record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_lf_appointment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'appointment','Fisher joins DuPont as VP and CSO','Exact-title appointment.','2004-07-12T00:00:00Z','day','unreviewed','draft','obs_src_lf_2004',NULL,'Effective date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_lf_goals',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'program_launch','DuPont launches market-facing sustainability goals','Metrics require definition and assurance review.','2006-01-01T00:00:00Z','year','unreviewed','draft','obs_src_lf_dupont',NULL,'Year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_lf_results',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'company_results_report','DuPont reports progress against goals','Company-authored results, not causal validation.','2013-12-04T00:00:00Z','day','unreviewed','draft','obs_src_lf_results',NULL,'Release date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_lf_retirement',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'retirement','Fisher retires from DuPont','Exact final day unresolved.','2016-02-01T00:00:00Z','month','unreviewed','draft','obs_src_lf_dupont',NULL,'Retirement month',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_lf_successor',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'succession','DuPont announces Krysta Harden as successor','Continuity of CSO function.','2016-03-02T00:00:00Z','day','unreviewed','draft','obs_src_lf_dupont',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_linda_fisher_100','linda-fisher-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'1.0.0',
'research/observatory/dossiers/linda-fisher-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_lf_c01","obs_claim_lf_c02","obs_claim_lf_c03","obs_claim_lf_c04","obs_claim_lf_c05","obs_claim_lf_c06","obs_claim_lf_c07","obs_claim_lf_c08","obs_claim_lf_c09","obs_claim_lf_c10"],"relationshipIds":["obs_rel_lf_dupont","obs_rel_lf_epa","obs_rel_lf_monsanto","obs_rel_lf_latham","obs_rel_lf_eli"],"eventIds":["obs_event_lf_appointment","obs_event_lf_goals","obs_event_lf_results","obs_event_lf_retirement","obs_event_lf_successor"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","world_first_claim_rejected","firstness_limited_to_publicly_traded_companies","original_2004_dupont_release_not_recovered","equivalent_pre_2004_titles_not_exhausted","reporting_line_and_budget_unresolved","company_results_not_independently_assured","pfoa_prevents_title_as_performance_proxy","career_chronology_incomplete","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.79,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_linda_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='linda-fisher'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_linda_fisher_100',
'{"packageId":"linda-fisher-1.0.0","sourcesAdded":10,"claimsAdded":10,"relationshipsAdded":5,"eventsAdded":5,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package narrows firstness to publicly traded companies and separates title institutionalization, remit, company-reported goals, adverse PFOA evidence and actual corporate performance.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
