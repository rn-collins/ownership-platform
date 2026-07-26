-- Codie Sanchez public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, aggregate portfolio revenue, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_cs_privacy','https://www.contrarianthinking.co/privacy-statement','Contrarian Thinking Privacy Statement','Contrarian Thinking','legal_terms','2025-10-30T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_terms','https://codiesanchez.com/terms-of-service/','Codie Sanchez Terms of Service','Contrarian Thinking','legal_terms','2024-10-15T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_about','https://www.contrarianthinking.co/about','About Contrarian Thinking','Contrarian Thinking','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_press','https://www.contrarianthinking.co/press','Contrarian Thinking Press','Contrarian Thinking','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_academy','https://www.contrarianthinking.co/contrarian-academy','Contrarian Academy','Contrarian Thinking','marketing_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_annual','https://www.contrarianthinking.co/newsletter-articles/annual-letter-2025','Contrarian Thinking 2025 Annual Letter','Contrarian Thinking','company_record','2025-01-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_capital','https://contrarianthinkingcapital.com/','Contrarian Thinking Capital','Contrarian Thinking Capital','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_iapd','https://adviserinfo.sec.gov/firm/summary/321673','Contrarian Thinking Capital LLC Investment Adviser Firm Summary','SEC Investment Adviser Public Disclosure','regulatory_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_formd','https://www.sec.gov/Archives/edgar/data/1931184/000193118425000001/xslFormDX01/primary_doc.xml','Contrarian Thinking Capital I Form D amendment','U.S. Securities and Exchange Commission','regulatory_filing','2025-01-13T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_resibrands','https://resibrands.com/our-story','Our Story','ResiBrands','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_city','https://citylifestyle.com/articles/codies-contrarian-thinking','Codie’s Contrarian Thinking','City Lifestyle','first_person_interview',NULL,'2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_august','https://dockets.justia.com/docket/texas/txwdce/1%3A2026cv01655/1172915851','August Image LLC v Sanchez et al','U.S. District Court docket index','court_docket','2026-06-18T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_shaykhoun','https://trellis.law/case/36061/tcn-671237/sonya-h-shaykhoun-esq-v-dan-vega-bellwether-alliance-llc-zion-kim-atlas-assistants-llc-hum-homes-inc-codie-sanchez-contrarian-thinking-llc-registered-agents-inc','Shaykhoun v Vega et al docket index','New York Supreme Court docket index via Trellis','court_docket','2026-02-09T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_cs_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'contrarian_legal_operator','Legal pages identify Contrarian Thinking LLC as operator of Contrarian Thinking and CodieSanchez.com properties.','asset_boundary','observed','unreviewed',NULL,'Contrarian Thinking, LLC operates the reviewed media and education properties.','The record does not establish Sanchez’s personal membership percentage or complete affiliate structure.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'founder_ceo','Company materials identify Sanchez as founder and CEO of Contrarian Thinking.','operating_authority','observed','unreviewed',NULL,'Codie Sanchez is founder and CEO of Contrarian Thinking.','Title does not establish sole ownership or sole operation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'mixed_business_model','Contrarian Thinking describes itself as an investment firm and media company with education, advisory and community products.','business_model','observed','unreviewed',NULL,'Contrarian Thinking describes itself as an investment and media company.','Do not treat every business line as investment-adviser activity or every member acquisition as company-owned.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'main_street_holdco_description','Sanchez and company materials describe Main Street Holding Company as holding larger or controlling interests in operating businesses.','economic_ownership','observed','unreviewed',NULL,'Sanchez describes Main Street Holding Company as a vehicle for larger operating-company interests.','Legal name, exact holdings, stakes and consolidated financials remain unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'self_reported_portfolio_counts','In an interview Sanchez said the Main Street holding company had more than 20 businesses and the venture company about 31, generally with smaller venture stakes.','portfolio_breadth','observed','unreviewed',NULL,'In a dated interview, Sanchez reported more than 20 holdco businesses and about 31 venture investments.','Self-reported counts are not a current audited schedule and do not establish personal ownership of each company.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'capital_founder_gp','Contrarian Thinking Capital identifies Sanchez as founder and general partner.','operating_authority','observed','unreviewed',NULL,'Sanchez is identified as founder and GP of Contrarian Thinking Capital.','Fund management does not equal personal ownership of portfolio-company assets.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'era_status','IAPD lists Contrarian Thinking Capital LLC as an exempt reporting adviser and not currently registered.','regulatory_status','observed','unreviewed',NULL,'Contrarian Thinking Capital, LLC files as an exempt reporting adviser.','Do not call the firm unregulated, SEC-approved or a registered investment adviser.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'fund_offering','A January 2025 Form D amendment reports offering information for Contrarian Thinking Capital I.','capital_structure','observed','unreviewed',NULL,'A Form D filing documents a private fund offering by Contrarian Thinking Capital I.','Offering amount is not AUM, performance, portfolio value or Sanchez’s personal capital.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'resibrands_coowner','ResiBrands identifies Sanchez as a co-owner who joined in 2024.','economic_ownership','observed','unreviewed',NULL,'ResiBrands identifies Sanchez as a co-owner since 2024.','Exact percentage, direct or indirect holder, voting rights and control are not disclosed by the reviewed page.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'venture_portfolio_snapshot','Contrarian Thinking’s annual letter reported 28 venture portfolio businesses after 15 investments during 2024.','portfolio_breadth','observed','unreviewed',NULL,'The company reported 28 venture portfolio businesses in its 2025 annual letter.','This does not establish current count, fair value, returns or direct personal ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'academy_marketing_metrics','Contrarian Academy publishes aggregate faculty deal and membership metrics and customer testimonials.','evidence_quality','observed','unreviewed',NULL,'Contrarian Academy publishes company-reported aggregate and testimonial evidence.','Do not treat faculty totals or selected testimonials as typical participant outcomes or Sanchez-owned acquisitions.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'earnings_disclaimer','The company terms state that testimonials are not typical and no result is guaranteed.','claim_restriction','observed','unreviewed',NULL,'Company terms expressly disclaim typical results and guarantees.','Outcome marketing must not be presented without this limitation and denominator review.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c13',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'pending_litigation','2026 docket indexes name Sanchez and Contrarian Thinking LLC in copyright and trade-secret-related complaints.','governance_accountability','observed','unreviewed',NULL,'Public dockets show pending complaints naming Sanchez and Contrarian Thinking, LLC.','Filing and allegations do not establish liability, infringement, misappropriation or any merits finding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_cs_c01_priv','obs_claim_cs_c01','obs_src_cs_privacy','supports',NULL,'Who we are and footer','Also creates affiliate-name conflict.',CURRENT_TIMESTAMP),
('obs_ev_cs_c01_terms','obs_claim_cs_c01','obs_src_cs_terms','supports',NULL,'General terms','Names site operator.',CURRENT_TIMESTAMP),
('obs_ev_cs_c02_about','obs_claim_cs_c02','obs_src_cs_about','supports',NULL,'Team section','First-party title evidence.',CURRENT_TIMESTAMP),
('obs_ev_cs_c03_about','obs_claim_cs_c03','obs_src_cs_about','supports',NULL,'Company description','Issuer characterization.',CURRENT_TIMESTAMP),
('obs_ev_cs_c04_city','obs_claim_cs_c04','obs_src_cs_city','supports',NULL,'Portfolio interview','First-person structure description.',CURRENT_TIMESTAMP),
('obs_ev_cs_c05_city','obs_claim_cs_c05','obs_src_cs_city','supports',NULL,'Portfolio count answer','Dated self-report.',CURRENT_TIMESTAMP),
('obs_ev_cs_c06_cap','obs_claim_cs_c06','obs_src_cs_capital','supports',NULL,'Team section','Firm first-party title.',CURRENT_TIMESTAMP),
('obs_ev_cs_c07_iapd','obs_claim_cs_c07','obs_src_cs_iapd','supports',NULL,'Firm summary','Primary regulatory status.',CURRENT_TIMESTAMP),
('obs_ev_cs_c08_formd','obs_claim_cs_c08','obs_src_cs_formd','supports',NULL,'Form D amendment','Primary offering filing.',CURRENT_TIMESTAMP),
('obs_ev_cs_c09_resi','obs_claim_cs_c09','obs_src_cs_resibrands','supports',NULL,'2024 Meet Codie timeline','Issuer co-owner statement.',CURRENT_TIMESTAMP),
('obs_ev_cs_c10_annual','obs_claim_cs_c10','obs_src_cs_annual','supports',NULL,'Venture section','Company-reported snapshot.',CURRENT_TIMESTAMP),
('obs_ev_cs_c11_acad','obs_claim_cs_c11','obs_src_cs_academy','supports',NULL,'Metrics and testimonials','Marketing evidence requiring denominator.',CURRENT_TIMESTAMP),
('obs_ev_cs_c12_terms','obs_claim_cs_c12','obs_src_cs_terms','supports',NULL,'Earnings disclaimer','Explicit claim limitation.',CURRENT_TIMESTAMP),
('obs_ev_cs_c13_aug','obs_claim_cs_c13','obs_src_cs_august','supports',NULL,'Docket index','Procedural fact only.',CURRENT_TIMESTAMP),
('obs_ev_cs_c13_shay','obs_claim_cs_c13','obs_src_cs_shaykhoun','supports',NULL,'Docket index','Procedural fact and allegations only.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_cs_ct',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'organization','Contrarian Thinking','founder_and_ceo',NULL,NULL,'unreviewed','draft','obs_src_cs_about',NULL,'Current company page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_capital',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'organization','Contrarian Thinking Capital','founder_and_general_partner',NULL,NULL,'unreviewed','draft','obs_src_cs_capital',NULL,'Current firm page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_resibrands',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'organization','ResiBrands','co_owner','2024-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cs_resibrands',NULL,'Year precision; percentage unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_holdco',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'organization','Main Street Holding Company','self_reported_operating_owner',NULL,NULL,'unreviewed','draft','obs_src_cs_city',NULL,'Legal entity and holdings unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_cs_2024_resi',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'ownership_interest','ResiBrands identifies Sanchez as co-owner','Issuer record supports co-owner status but not stake size or rights.','2024-01-01T00:00:00Z','year','unreviewed','draft','obs_src_cs_resibrands',NULL,'Company timeline year',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cs_2025_formd',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'regulatory_filing','Contrarian Thinking Capital I files Form D amendment','Private offering filing; not evidence of fund performance.','2025-01-13T00:00:00Z','day','unreviewed','draft','obs_src_cs_formd',NULL,'Filing date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cs_2026_copyright',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'complaint_filed','Copyright complaint filed','Docket names Sanchez and Contrarian Thinking LLC; merits unresolved.','2026-06-18T00:00:00Z','day','unreviewed','draft','obs_src_cs_august',NULL,'Docket filing date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_codie_sanchez_100','codie-sanchez-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'1.0.0',
'research/observatory/dossiers/codie-sanchez-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_cs_c01","obs_claim_cs_c02","obs_claim_cs_c03","obs_claim_cs_c04","obs_claim_cs_c05","obs_claim_cs_c06","obs_claim_cs_c07","obs_claim_cs_c08","obs_claim_cs_c09","obs_claim_cs_c10","obs_claim_cs_c11","obs_claim_cs_c12","obs_claim_cs_c13"],"relationshipIds":["obs_rel_cs_ct","obs_rel_cs_capital","obs_rel_cs_resibrands","obs_rel_cs_holdco"],"eventIds":["obs_event_cs_2024_resi","obs_event_cs_2025_formd","obs_event_cs_2026_copyright"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","contrarian_affiliate_structure_unresolved","main_street_holdco_legal_entity_unresolved","portfolio_schedule_unavailable","ownership_percentages_unavailable","fund_interests_not_personal_portfolio_ownership","combined_revenue_undefined_and_unaudited","academy_member_companies_excluded","resibrands_stake_and_rights_unresolved","pending_complaints_not_findings","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.68,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_codie_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='codie-sanchez'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_codie_sanchez_100',
'{"packageId":"codie-sanchez-1.0.0","sourcesAdded":13,"claimsAdded":13,"relationshipsAdded":4,"eventsAdded":3,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package separates the media company, holdco, fund, operating interests, member outcomes and book/media assets. Portfolio ownership and revenue remain unverified at company level.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
