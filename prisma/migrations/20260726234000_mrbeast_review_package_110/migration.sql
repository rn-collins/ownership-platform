-- MrBeast public-evidence review package 1.1.0.
-- Draft expansion only. Does not publish, verify, score, infer current ownership, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_mb11_10q','https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/form10-q.htm','BitMine Immersion Technologies Form 10-Q','U.S. Securities and Exchange Commission','regulatory_filing','2026-04-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb11_xbrl','https://www.sec.gov/Archives/edgar/data/1829311/000149315226016560/R15.htm','BitMine Note 6 Investments','U.S. Securities and Exchange Commission','regulatory_filing_data','2026-04-10T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb11_nabors','https://www.courtlistener.com/docket/69846366/mrbeastyoutube-llc-v-nabors/','MrBeastYouTube LLC v. Nabors docket','U.S. District Court for the Eastern District of North Carolina via CourtListener','court_docket','2025-04-04T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_mb11_mavromatis','https://www.pacermonitor.com/public/filings/D3NXMAUQ/Mavromatis_v_MrBeastYouTube_LLC_et_al__ncedce-26-00059__0006.0.pdf','Mavromatis v. MrBeastYouTube LLC et al. answer','U.S. District Court filing via PACERMonitor','court_filing','2026-04-24T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
"title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
"primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_mb11_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'entity_form','A 2026 SEC filing describes Beast Industries Co. as a privately held Delaware corporation.','entity_boundary','primary_record','unreviewed',NULL,'Beast Industries Co. is a privately held Delaware corporation.','No complete entity history good-standing beneficial-ownership or subsidiary inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'preferred_financing','BitMine acquired 3,974,167 Series C preferred shares at $40.26 per share for approximately $160 million on January 15 2026.','capital_structure','primary_record','unreviewed',NULL,'State the filing date share count price and consideration.','No Donaldson proceeds clean enterprise valuation or identical rights across classes.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c13',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'secondary_transaction','BitMine acquired 709,672 common shares for approximately $20 million from an unnamed existing shareholder.','capital_structure','primary_record','unreviewed',NULL,'BitMine acquired common shares in a secondary transaction from an existing shareholder.','The seller cannot be identified as Donaldson and seller economics remain unknown.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c14',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'share_conversion','The secondary shares were originally Class B common stock and automatically converted to Class A upon transfer under the certificate of incorporation.','control_boundary','primary_record','unreviewed',NULL,'The filing says transferred Class B shares converted to Class A.','No voting-ratio control-rights or Donaldson-class-holdings inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c15',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'contingent_financing','A side letter provided a time-limited right for Beast Industries to offer BitMine up to $20 million of additional preferred equity at the Series D price; no purchase had occurred by May 31 2026.','capital_structure','primary_record','unreviewed',NULL,'Describe the contingent right and dated non-exercise.','No completed Series D price valuation or future issuance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c16',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor_influence','BitMine characterized its aggregate position as 4% and stated it lacked control or significant influence over Beast Industries.','control_boundary','primary_record','unreviewed',NULL,'Attribute the 4% position and influence assessment to BitMine filing.','No Donaldson percentage board-control or other-investor-rights inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_mb11_c17',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'corporate_parent','A federal disclosure in MrBeastYouTube LLC v. Nabors identifies Beast Industries Co. as the LLC corporate parent.','entity_boundary','primary_record','unreviewed',NULL,'A federal case disclosure identifies Beast Industries Co. as MrBeastYouTube LLC corporate parent.','No complete subsidiary graph IP ownership or every-channel ownership inference.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_mb11_c11','obs_claim_mb11_c11','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Entity form.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c12','obs_claim_mb11_c12','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Primary purchase terms.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c13','obs_claim_mb11_c13','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Unnamed secondary seller preserved.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c14','obs_claim_mb11_c14','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Class conversion without voting inference.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c15','obs_claim_mb11_c15','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Contingent Series D-priced right.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c16','obs_claim_mb11_c16','obs_src_mb11_10q','supports',NULL,'Note 6 Investments','Investor-specific position and influence.',CURRENT_TIMESTAMP),
('obs_ev_mb11_c17','obs_claim_mb11_c17','obs_src_mb11_nabors','supports',NULL,'Financial disclosure statement','Corporate-parent boundary only.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_mb11_parent',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'organization','MrBeastYouTube LLC','beast_industries_disclosed_corporate_parent',NULL,NULL,'unreviewed','draft','obs_src_mb11_nabors',NULL,'One federal disclosure; complete entity graph unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_mb11_bitmine',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'investor','BitMine Immersion Technologies','minority_equity_investor', '2026-01-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_mb11_10q',NULL,'Investor reports no control or significant influence',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_mb11_2026_investment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'equity_investment','BitMine completes primary and secondary Beast Industries purchases','Series C preferred and transferred common shares produced an investor-reported 4% non-controlling position.','2026-01-15T00:00:00Z','day','unreviewed','draft','obs_src_mb11_10q',NULL,'Note 6 Investments',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_mb11_2026_nonexercise',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'financing_status','Additional preferred-equity right remained unexercised','The filing states no additional preferred purchase occurred by May 31 2026.','2026-05-31T00:00:00Z','day','unreviewed','draft','obs_src_mb11_10q',NULL,'Dated status only',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_mrbeast_110','mrbeast-1.1.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'1.1.0',
'research/observatory/dossiers/mrbeast-1.1.0.md','437d05efe1ef2079b414bbedc561472df42ea828',
'{"claimIds":["obs_claim_mb11_c11","obs_claim_mb11_c12","obs_claim_mb11_c13","obs_claim_mb11_c14","obs_claim_mb11_c15","obs_claim_mb11_c16","obs_claim_mb11_c17"],"relationshipIds":["obs_rel_mb11_parent","obs_rel_mb11_bitmine"],"eventIds":["obs_event_mb11_2026_investment","obs_event_mb11_2026_nonexercise"],"observationIds":[],"limitations":["expanded_not_saturated","material_evidence_found_in_pass_one","original_deposition_unavailable","current_cap_table_unavailable","voting_and_board_rights_unavailable","secondary_seller_unnamed","series_d_not_completed","complete_entity_and_ip_graph_unavailable","two_final_no_new_material_passes_required","publication_draft","scoring_prohibited","psychology_unmeasured"]}'::jsonb,
0.80,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_mrbeast_110',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='mrbeast' LIMIT 1),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_mrbeast_110',
'{"packageId":"mrbeast-1.1.0","claimsLoaded":7,"relationshipsLoaded":2,"eventsLoaded":2,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Expanded package imported as draft after material primary evidence. Present ownership voting control complete entity graph personal proceeds causality psychology scoring publication and saturation remain unresolved.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
