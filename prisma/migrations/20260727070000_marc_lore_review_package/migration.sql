-- Marc Lore public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, assign sole causation, or mark saturation complete.

INSERT INTO "ObservatoryCase"
("id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary","inclusionRationale","roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus","publicStatus","createdAt","updatedAt")
VALUES
('obs_case_marc_lore','marc-lore','Marc Lore','professional','Commerce, technology and venture building','United States',
'Jet founder appointed to lead Walmart U.S. eCommerce after Walmart acquired Jet, before the separate organization was integrated into Walmart U.S.',
'A public-evidence case examining acquisition-linked executive authority, founder ownership before sale, organizational integration and mixed operating outcomes.',
'Selected to test and replace the causal claim that Walmart built U.S. e-commerce around Lore with a transaction- and governance-grounded account.',
false,'in_review',0.86,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET "headline"=EXCLUDED."headline","summary"=EXCLUDED."summary","inclusionRationale"=EXCLUDED."inclusionRationale","roleBuiltFlag"=false,"verificationStatus"='in_review',"evidenceCoverage"=0.86,"updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_ml_s01','https://corporate.walmart.com/news/2016/09/19/walmart-completes-acquisition-of-jet-com-inc','Walmart completes acquisition of Jet.com','Walmart','company_release','2016-09-19T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s02','https://www.sec.gov/Archives/edgar/data/104169/000167276417000039/p55218_def14a.htm','Walmart 2017 proxy statement','U.S. Securities and Exchange Commission','regulatory_filing','2017-04-20T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s03','https://www.sec.gov/Archives/edgar/data/104169/000120677421001200/wmt3839531-def14a.htm','Walmart 2021 proxy statement','U.S. Securities and Exchange Commission','regulatory_filing','2021-04-22T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s04','https://corporate.walmart.com/news/2019/06/12/update-on-our-u-s-ecommerce-strategy-and-the-role-of-jet','Update on Walmart U.S. eCommerce strategy and Jet','Walmart / Marc Lore','first_person_company_publication','2019-06-12T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s05','https://www.sec.gov/Archives/edgar/data/104169/000010416921000005/wmt-20210114.htm','Walmart 8-K on Marc Lore retirement','U.S. Securities and Exchange Commission','regulatory_filing','2021-01-15T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s06','https://corporate.walmart.com/news/2019/10/10/walmart-names-john-furner-president-ceo-of-walmart-u-s','Walmart names John Furner President and CEO of Walmart U.S.','Walmart','company_release','2019-10-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s07','https://www.forbes.com/sites/sharonedelson/2021/01/15/marc-lore-who-engineered-walmarts-digital-transformation-to-step-down/','Marc Lore to step down from Walmart','Forbes','independent_reporting','2021-01-15T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s08','https://techcrunch.com/2021/01/15/marc-lore-leaves-walmart-a-little-over-four-years-after-selling-jet-com-for-3b/','Marc Lore leaves Walmart after Jet sale','TechCrunch','independent_reporting','2021-01-15T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s09','https://fortune.com/2021/01/15/marc-lore-leaves-walmart-e-commerce/','Marc Lore leaves Walmart e-commerce','Fortune / Bloomberg','independent_reporting','2021-01-15T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s10','https://news.bloomberglaw.com/mergers-and-acquisitions/walmart-sells-bonobos-gets-235-million-less-than-what-it-paid','Walmart sells Bonobos below purchase price','Bloomberg Law','independent_reporting','2023-04-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s11','https://www.retailbrew.com/stories/2024/01/25/walmart-shutters-startup-incubator-as-innovation-moves-in-house','Walmart shutters Store No. 8 as innovation moves in-house','Retail Brew','independent_reporting_with_company_statement','2024-01-25T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ml_s12','https://about.wonder.com/news/details/2026/Wonder-Announces-650-Million-Series-D-Round-at-a-9-Billion-Pre-Money-Valuation/default.aspx','Wonder announces Series D financing','Wonder','company_release','2026-07-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_ml_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'acquisition_appointment','Walmart acquired Jet for approximately $3B cash plus $300M shares and appointed Lore to lead Walmart eCommerce U.S.','role_formation','observed','unreviewed',NULL,'Walmart appointed Jet founder Marc Lore to lead Walmart.com and Jet.com after acquiring Jet in 2016.','The transaction purchased Jet equity, technology and team; it was not merely an executive hire.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'employment_linked_transaction','Lore received RSUs and acquisition consideration payable over five years and generally linked to continued employment.','incentive_architecture','observed','unreviewed',NULL,'The Jet acquisition combined company purchase, executive appointment and multiyear employment-linked consideration.','Does not establish that Walmart itself was built around Lore.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'pre_sale_ownership','Lore held approximately 15.9% of Jet on a fully diluted basis before the merger and received rights to about $477M cash consideration for his shares.','capital_ownership','observed','unreviewed',NULL,'Lore held approximately 15.9% of Jet on a fully diluted basis before Walmart acquired it.','Pre-sale Jet ownership is not Walmart ownership or current wealth.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'delegated_remit','Lore led Walmart.com and Jet.com, reporting to Doug McMillon, with a broader mandate to accelerate Walmart eCommerce.','operating_authority','observed','unreviewed',NULL,'Lore received broad delegated authority over Walmart’s U.S. e-commerce businesses.','Authority remained corporate and delegated.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organizational_integration','Walmart progressively merged Jet and Walmart teams and then store and e-commerce teams into an omnichannel Walmart U.S. segment.','institution_building','observed','unreviewed',NULL,'The separate e-commerce organization was progressively integrated into Walmart U.S. rather than preserved around Lore.','Integration timing and internal decision rights require additional records.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'reported_growth','Walmart reported assortment, fulfillment, delivery, online grocery and e-commerce sales expansion during Lore’s tenure.','outcome_evidence','observed','unreviewed',NULL,'Walmart reported substantial U.S. e-commerce growth and operating expansion during Lore’s tenure.','Tenure association is not sole causation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'jet_discontinuation','Walmart discontinued Jet.com after integrating teams, technology and strategy into Walmart.com.','role_transition','observed','unreviewed',NULL,'Walmart discontinued the acquired Jet consumer brand while retaining parts of the team, technology and operating approach.','Brand closure alone does not prove total failure or success.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'mixed_outcomes','Lore-era initiatives included integrated capabilities as well as discontinued or divested assets including Jetblack, Bonobos and Store No. 8 as a standalone unit.','outcome_evidence','observed','unreviewed',NULL,'The Lore-era portfolio produced both integrated capabilities and discontinued or divested initiatives.','Later outcomes cannot all be assigned personally to Lore.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'departure_succession','Lore retired January 31 2021, advised through September, and U.S. retail e-commerce then reported to Walmart U.S. CEO John Furner.','role_transition','observed','unreviewed',NULL,'After Lore’s departure, Walmart placed all U.S. retail e-commerce within the Walmart U.S. reporting structure.','Advisory duties and influence are not fully public.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'current_venture','Lore is founder and CEO of Wonder, which announced a 2026 $650M financing at a $9B pre-money valuation.','portfolio_breadth','observed','unreviewed',NULL,'Lore is founder and CEO of Wonder, which announced a 2026 financing at a $9 billion pre-money valuation.','Company valuation is not Lore’s ownership, liquidity or wealth.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'bounded_causal_architecture','Walmart bought a founder-led company, installed the founder over a broader function, linked consideration to tenure and later absorbed the function into its core organization.','portfolio_architecture','interpretive','unreviewed',NULL,'Walmart structured the Jet transaction to place Lore and the acquired team in a central e-commerce transformation role for a defined period.','Prohibit the totalizing claim that Walmart built U.S. e-commerce around Lore.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ml_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'psychology_boundary','No reviewed source measures Lore’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case documents transactions, authority and outcomes; it does not measure psychology.','No inference from entrepreneurial chronology.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_ml_c01','obs_claim_ml_c01','obs_src_ml_s01','supports',NULL,'Deal and appointment','Primary company record.',CURRENT_TIMESTAMP),
('obs_ev_ml_c02','obs_claim_ml_c02','obs_src_ml_s02','supports',NULL,'RSU and consideration footnotes','Primary compensation architecture.',CURRENT_TIMESTAMP),
('obs_ev_ml_c03','obs_claim_ml_c03','obs_src_ml_s03','supports',NULL,'Related-party transaction','Primary ownership and consideration record.',CURRENT_TIMESTAMP),
('obs_ev_ml_c04a','obs_claim_ml_c04','obs_src_ml_s01','supports',NULL,'Appointment remit','Formal reporting line.',CURRENT_TIMESTAMP),
('obs_ev_ml_c04b','obs_claim_ml_c04','obs_src_ml_s04','supports',NULL,'First-person mandate','Delegated broader role.',CURRENT_TIMESTAMP),
('obs_ev_ml_c05a','obs_claim_ml_c05','obs_src_ml_s04','supports',NULL,'Team integration','First-person company account.',CURRENT_TIMESTAMP),
('obs_ev_ml_c05b','obs_claim_ml_c05','obs_src_ml_s05','supports',NULL,'Omnichannel integration','SEC-filed succession architecture.',CURRENT_TIMESTAMP),
('obs_ev_ml_c06a','obs_claim_ml_c06','obs_src_ml_s04','supports',NULL,'Reported growth and capabilities','Company/first-person outcomes.',CURRENT_TIMESTAMP),
('obs_ev_ml_c06b','obs_claim_ml_c06','obs_src_ml_s07','qualifies',NULL,'Independent tenure assessment','Adds operating detail while preserving attribution.',CURRENT_TIMESTAMP),
('obs_ev_ml_c07','obs_claim_ml_c07','obs_src_ml_s09','supports',NULL,'Jet closure and absorption','Independent mixed assessment.',CURRENT_TIMESTAMP),
('obs_ev_ml_c08a','obs_claim_ml_c08','obs_src_ml_s08','supports',NULL,'Mixed record','Jetblack and Jet adverse evidence.',CURRENT_TIMESTAMP),
('obs_ev_ml_c08b','obs_claim_ml_c08','obs_src_ml_s10','supports',NULL,'Bonobos sale','Later divestiture economics.',CURRENT_TIMESTAMP),
('obs_ev_ml_c08c','obs_claim_ml_c08','obs_src_ml_s11','qualifies',NULL,'Store No. 8 closure','Some work integrated into core.',CURRENT_TIMESTAMP),
('obs_ev_ml_c09','obs_claim_ml_c09','obs_src_ml_s05','supports',NULL,'Retirement and reporting','Primary SEC filing.',CURRENT_TIMESTAMP),
('obs_ev_ml_c10','obs_claim_ml_c10','obs_src_ml_s12','supports',NULL,'Financing announcement','Company-reported current role and valuation.',CURRENT_TIMESTAMP),
('obs_ev_ml_c11','obs_claim_ml_c11','obs_src_ml_s05','qualifies',NULL,'Integration and succession','Supports bounded synthesis only.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_ml_jet',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organization','Jet.com','founder_ceo_and_pre_sale_shareholder',NULL,'2016-09-19T00:00:00Z','unreviewed','draft','obs_src_ml_s03',NULL,'15.9% fully diluted before sale',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ml_walmart',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organization','Walmart','evp_president_ceo_us_ecommerce','2016-09-19T00:00:00Z','2021-01-31T00:00:00Z','unreviewed','draft','obs_src_ml_s05',NULL,'Executive term',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ml_mcmillon',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'person','Doug McMillon','reported_to','2016-09-19T00:00:00Z','2021-01-31T00:00:00Z','unreviewed','draft','obs_src_ml_s01',NULL,'Appointment reporting line',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ml_furner',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'person','John Furner','walmart_us_parallel_leader_and_reporting_successor','2019-11-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_ml_s06',NULL,'Organizational boundary',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ml_store8',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organization','Store No. 8','lore_era_incubator',NULL,NULL,'unreviewed','draft','obs_src_ml_s11',NULL,'Formation date requires primary record',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ml_wonder',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organization','Wonder','founder_and_ceo',NULL,NULL,'unreviewed','draft','obs_src_ml_s12',NULL,'Ownership percentage unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_ml_acquisition',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'acquisition_and_appointment','Walmart acquires Jet and appoints Lore','Transaction and appointment combined.','2016-09-19T00:00:00Z','day','unreviewed','draft','obs_src_ml_s01',NULL,'Closing date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ml_strategy',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'strategy_update','Lore describes integrated teams and Walmart.com focus','Company/first-person strategy account.','2019-06-12T00:00:00Z','day','unreviewed','draft','obs_src_ml_s04',NULL,'Publication date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ml_jet_close',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'brand_discontinuation','Walmart discontinues Jet.com','Technology and teams partly absorbed.','2020-05-01T00:00:00Z','month','unreviewed','draft','obs_src_ml_s09',NULL,'Month precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ml_retire',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'role_transition','Lore retires from Walmart executive role','Advisory period continued through September.','2021-01-31T00:00:00Z','day','unreviewed','draft','obs_src_ml_s05',NULL,'Effective date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ml_bonobos',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'divestiture','Walmart agrees to sell Bonobos','Reported consideration substantially below purchase price.','2023-04-14T00:00:00Z','day','unreviewed','draft','obs_src_ml_s10',NULL,'Announcement report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ml_store8',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'organizational_integration','Store No. 8 standalone unit closes','Company says innovation responsibility moved across the core.','2024-01-25T00:00:00Z','day','unreviewed','draft','obs_src_ml_s11',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_marc_lore_100','marc-lore-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'1.0.0',
'research/observatory/dossiers/marc-lore-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_ml_c01","obs_claim_ml_c02","obs_claim_ml_c03","obs_claim_ml_c04","obs_claim_ml_c05","obs_claim_ml_c06","obs_claim_ml_c07","obs_claim_ml_c08","obs_claim_ml_c09","obs_claim_ml_c10"],"relationshipIds":["obs_rel_ml_jet","obs_rel_ml_walmart","obs_rel_ml_mcmillon","obs_rel_ml_furner","obs_rel_ml_store8","obs_rel_ml_wonder"],"eventIds":["obs_event_ml_acquisition","obs_event_ml_strategy","obs_event_ml_jet_close","obs_event_ml_retire","obs_event_ml_bonobos","obs_event_ml_store8"],"observationIds":[],"excludedInterpretiveClaimIds":["obs_claim_ml_c11"],"methodBoundaryClaimIds":["obs_claim_ml_c12"],"limitations":["saturation_decision_not_yet_recorded","built_around_person_claim_rejected","pre_existing_walmart_infrastructure","growth_not_sole_causation","employment_linked_consideration_not_ordinary_compensation","jet_and_jetblack_discontinued","digital_brand_divestitures","internal_decision_rights_unresolved","wonder_ownership_unresolved","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.86,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_marc_lore_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='marc-lore'),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_marc_lore_100',
'{"packageId":"marc-lore-1.0.0","sourcesAdded":12,"claimsAdded":12,"claimsInPublicationManifest":10,"relationshipsAdded":6,"eventsAdded":6,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package replaces person-centered causation with acquisition-linked appointment, compensation, delegated authority, integration, mixed outcomes and succession evidence.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
