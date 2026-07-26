-- Huda Kattan public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer sole personal ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_hk_buyback','https://www.prnewswire.com/news-releases/huda-beauty-reclaims-full-ownership-as-an-independent-beauty-brand-302471853.html','Huda Beauty Reclaims Full Ownership as an Independent Beauty Brand','Huda Beauty','company_record','2025-06-03T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_hk_ga_kayali','https://www.generalatlantic.com/media-article/huda-beauty-announces-kayalis-transition-into-a-standalone-fragrance-powerhouse/','Huda Beauty Announces KAYALI’s Transition Into a Standalone Fragrance Powerhouse','General Atlantic','transaction_party_record','2025-02-17T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_hk_reuters','https://www.reuters.com/markets/deals/dubai-based-huda-beauty-sells-fragrance-line-kayali-co-founder-general-atlantic-2025-02-17/','Dubai-based Huda Beauty sells fragrance line KAYALI','Reuters','journalism','2025-02-17T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_hk_forbes2018','https://www.forbes.com/sites/chloesorvino/2018/07/11/huda-kattan-huda-beauty-billion-influencer/','How Huda Kattan Built A Billion-Dollar Cosmetics Brand','Forbes','journalism','2018-07-11T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_hk_forbesprofile','https://www.forbes.com/profile/huda-kattan/','Huda Kattan profile','Forbes','publisher_profile','2023-09-26T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_hk_wwd','https://uk.finance.yahoo.com/news/exclusive-huda-kattan-takes-full-111500837.html','Huda Kattan Takes Full Ownership of Huda Beauty','WWD','journalism','2025-06-03T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_hk_cosmetics','https://cosmeticsbusiness.com/huda-kattan-regains-full-control-of-huda-beauty','Huda Kattan regains full control of Huda Beauty','Cosmetics Business','trade_journalism','2025-06-03T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_hk_hbangels','https://hudabeauty.com/en-it/blogs/wellness/we-invested-in-our-employee-meet-our-first-huda-beauty-angels-brand-ketish','We Invested In Our Employee: KETISH','Huda Beauty','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_hk_people','https://people.com/huda-kattans-video-about-israel-removed-tiktok-11784487','TikTok Removes Huda Kattan Video','People','journalism','2025-08-01T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_hk_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'founder_role','Huda Kattan founded Huda Beauty; common reporting places the product company launch in 2013.','venture_formation','observed','unreviewed',NULL,'Huda Kattan founded Huda Beauty.','Do not use sole-founder language when discussing Mona and Alya Kattan’s documented founder-family roles; exact incorporation date remains unresolved.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'tsg_minority_investment','TSG Consumer acquired a minority interest in Huda Beauty in 2017.','capital_structure','observed','unreviewed',NULL,'TSG Consumer acquired a minority stake in Huda Beauty in 2017.','Exact stake, price, board rights and preferred terms are not established by the reviewed primary record.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'reported_2017_valuation','Forbes reported that the 2017 TSG transaction valued Huda Beauty at approximately $1.2 billion.','capital_access','observed','unreviewed',NULL,'Forbes reported a roughly $1.2 billion valuation in connection with the 2017 TSG transaction.','This is a historical reported transaction valuation, not present value, audited value, liquidation value or Kattan’s personal wealth.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'kayali_separation','Huda Beauty announced that it would sell its KAYALI ownership and that Mona Kattan and General Atlantic would jointly own the standalone company.','asset_boundary','observed','unreviewed',NULL,'KAYALI was separated from Huda Beauty and announced as jointly owned by Mona Kattan and General Atlantic.','Deal value, buyer percentages and closing mechanics were not disclosed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'tsg_redemption_structure','The KAYALI separation was announced together with full redemption of TSG Consumer’s Huda Beauty interest.','capital_structure','observed','unreviewed',NULL,'The announced transaction structure connected the KAYALI separation with redemption of TSG’s Huda Beauty interest.','Do not infer that all KAYALI proceeds funded the redemption or infer an undisclosed dollar amount.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'control_reacquisition','Huda Beauty announced on June 3, 2025 that Kattan bought back TSG’s interest and regained full control.','operating_authority','observed','unreviewed',NULL,'Huda Beauty announced that Kattan repurchased TSG’s interest and regained full control in 2025.','Full control does not prove that Huda Kattan personally owns 100% of every equity interest.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'founder_owned_status','Huda Beauty described itself after the transaction as fully independent and founder-fully-owned.','economic_ownership','observed','unreviewed',NULL,'Huda Beauty describes itself as fully founder-owned after the 2025 buyback.','The issuer characterization is not a disclosed post-buyback cap table and does not establish absence of debt or contractual dependencies.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'founder_holder_uncertainty','Public sources identify Huda, Mona and Alya Kattan in founder or founder-family roles but do not disclose the post-buyback allocation among founder holders.','economic_ownership','observed','unreviewed',NULL,'The reviewed sources support founder ownership but do not publicly allocate the post-buyback equity among founder holders.','Do not convert founder-owned into Huda Kattan personally owns 100%.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'kayali_current_perimeter','KAYALI is outside the current Huda Beauty ownership perimeter following its announced separation.','asset_boundary','observed','unreviewed',NULL,'KAYALI is a standalone company jointly owned by Mona Kattan and General Atlantic.','Do not count KAYALI as a current Huda Beauty asset or Huda Kattan holding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_hk_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'platform_misinformation_action','Reporting states that TikTok removed a Kattan video for violating misinformation rules amid public criticism.','governance_accountability','observed','unreviewed',NULL,'Reporting states that TikTok removed a Kattan video under its misinformation policy.','This platform action is not an adjudicated corporate-governance finding and does not establish a psychological attribute.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_hk_c01_f18','obs_claim_hk_c01','obs_src_hk_forbes2018','supports',NULL,'Founder history','Independent historical reporting.',CURRENT_TIMESTAMP),
('obs_ev_hk_c02_buy','obs_claim_hk_c02','obs_src_hk_buyback','supports',NULL,'2017 minority-investment statement','Issuer retrospective.',CURRENT_TIMESTAMP),
('obs_ev_hk_c02_f18','obs_claim_hk_c02','obs_src_hk_forbes2018','supports',NULL,'2017 transaction reporting','Independent contemporaneous reporting.',CURRENT_TIMESTAMP),
('obs_ev_hk_c03_fp','obs_claim_hk_c03','obs_src_hk_forbesprofile','supports',NULL,'Publisher valuation statement','Attributed estimate/report.',CURRENT_TIMESTAMP),
('obs_ev_hk_c04_ga','obs_claim_hk_c04','obs_src_hk_ga_kayali','supports',NULL,'Joint transaction announcement','Transaction-party record.',CURRENT_TIMESTAMP),
('obs_ev_hk_c04_reu','obs_claim_hk_c04','obs_src_hk_reuters','supports',NULL,'Deal report','Independent reporting; value undisclosed.',CURRENT_TIMESTAMP),
('obs_ev_hk_c05_ga','obs_claim_hk_c05','obs_src_hk_ga_kayali','supports',NULL,'TSG redemption statement','Transaction-party record.',CURRENT_TIMESTAMP),
('obs_ev_hk_c05_reu','obs_claim_hk_c05','obs_src_hk_reuters','supports',NULL,'Transaction structure','Independent report based partly on joint statement.',CURRENT_TIMESTAMP),
('obs_ev_hk_c06_buy','obs_claim_hk_c06','obs_src_hk_buyback','supports',NULL,'Completed buyback announcement','Issuer statement.',CURRENT_TIMESTAMP),
('obs_ev_hk_c06_wwd','obs_claim_hk_c06','obs_src_hk_wwd','supports',NULL,'Buyback report','Trade press follow-up.',CURRENT_TIMESTAMP),
('obs_ev_hk_c07_buy','obs_claim_hk_c07','obs_src_hk_buyback','supports',NULL,'Founder-ownership characterization','Issuer wording; no cap table.',CURRENT_TIMESTAMP),
('obs_ev_hk_c08_f18','obs_claim_hk_c08','obs_src_hk_forbes2018','supports',NULL,'Founder-family stakes','Historical reporting.',CURRENT_TIMESTAMP),
('obs_ev_hk_c08_buy','obs_claim_hk_c08','obs_src_hk_buyback','supports',NULL,'Founder-owned wording','Does not allocate founder holdings.',CURRENT_TIMESTAMP),
('obs_ev_hk_c09_ga','obs_claim_hk_c09','obs_src_hk_ga_kayali','supports',NULL,'Standalone KAYALI structure','Transaction-party record.',CURRENT_TIMESTAMP),
('obs_ev_hk_c11_people','obs_claim_hk_c11','obs_src_hk_people','supports',NULL,'Reported TikTok removal','Adverse-context lead; not ownership evidence.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_hk_hudabeauty',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'organization','Huda Beauty','founder_and_controlling_executive','2013-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_hk_buyback',NULL,'Founder role; year precision; control reconfirmed in 2025 issuer announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_hk_tsg',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'organization','TSG Consumer Partners','minority_investor_relationship','2017-01-01T00:00:00Z','2025-06-03T00:00:00Z','unreviewed','draft','obs_src_hk_buyback',NULL,'Issuer-described eight-year partnership; precise closing dates require confirmation',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_hk_kayali',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'organization','KAYALI','former_parent_company_ownership_relationship','2018-01-01T00:00:00Z','2025-02-17T00:00:00Z','unreviewed','draft','obs_src_hk_ga_kayali',NULL,'Separation announced 2025-02-17; closing date requires confirmation',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_hk_2017_tsg',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'minority_investment','TSG acquires minority Huda Beauty interest','Issuer and independent sources describe a minority investment; terms remain incomplete.','2017-01-01T00:00:00Z','year','unreviewed','draft','obs_src_hk_forbes2018',NULL,'Year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_hk_2025_kayali',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'asset_separation','KAYALI standalone transaction announced','KAYALI ownership was announced for transfer to Mona Kattan and General Atlantic; value undisclosed.','2025-02-17T00:00:00Z','day','unreviewed','draft','obs_src_hk_ga_kayali',NULL,'Announcement date; closing confirmation pending',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_hk_2025_buyback',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'equity_buyback','Huda Beauty announces TSG buyback completed','Issuer says Kattan regained control and company returned to full founder ownership.','2025-06-03T00:00:00Z','day','unreviewed','draft','obs_src_hk_buyback',NULL,'Announcement date; post-buyback cap table unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_huda_kattan_100','huda-kattan-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'1.0.0',
'research/observatory/dossiers/huda-kattan-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_hk_c01","obs_claim_hk_c02","obs_claim_hk_c03","obs_claim_hk_c04","obs_claim_hk_c05","obs_claim_hk_c06","obs_claim_hk_c07","obs_claim_hk_c08","obs_claim_hk_c09","obs_claim_hk_c11"],"relationshipIds":["obs_rel_hk_hudabeauty","obs_rel_hk_tsg","obs_rel_hk_kayali"],"eventIds":["obs_event_hk_2017_tsg","obs_event_hk_2025_kayali","obs_event_hk_2025_buyback"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","legal_entities_and_jurisdictions_unresolved","2017_transaction_documents_missing","post_buyback_cap_table_unavailable","founder_holder_allocation_unavailable","deal_values_undisclosed","control_not_equivalent_to_sole_personal_ownership","kayali_excluded_from_current_huda_beauty_perimeter","reported_valuation_not_current_value","sales_figures_not_audited","adverse_platform_action_not_governance_finding","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.74,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_huda_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='huda-kattan'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_huda_kattan_100',
'{"packageId":"huda-kattan-1.0.0","sourcesAdded":9,"claimsAdded":10,"relationshipsAdded":3,"eventsAdded":3,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package distinguishes full founder ownership and Kattan control from unproven sole personal ownership. KAYALI is outside the current Huda Beauty perimeter.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
