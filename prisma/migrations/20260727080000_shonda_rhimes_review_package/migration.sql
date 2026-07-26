-- Shonda Rhimes public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, resolve private IP/equity, or mark saturation complete.

INSERT INTO "ObservatoryCase"
("id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary","inclusionRationale","roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus","publicStatus","createdAt","updatedAt")
VALUES
('obs_case_shonda_rhimes','shonda-rhimes','Shonda Rhimes','professional','Television, media and storytelling','United States',
'Shondaland founder whose company expanded from broadcast television into streaming, editorial, audio, merchandise and experiences through multiple institutional partnerships.',
'A public-evidence case separating founder authority, company formation, production partnerships, platform infrastructure, project IP and distributed operating leadership.',
'Selected to replace the causal claim that Netflix built a multi-format apparatus around Rhimes with a project-, rights- and institution-specific account.',
false,'in_review',0.85,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET "headline"=EXCLUDED."headline","summary"=EXCLUDED."summary","inclusionRationale"=EXCLUDED."inclusionRationale","roleBuiltFlag"=false,"verificationStatus"='in_review',"evidenceCoverage"=0.85,"updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_sr_s01','https://www.shondaland.com/about-us/shonda-rhimes','Shonda Rhimes biography','Shondaland','company_biography',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s02','https://about.netflix.com/en/news/shonda-rhimes-and-shondland-come-to-netflix','Shonda Rhimes and Shondaland come to Netflix','Netflix','company_release','2017-08-14T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s03','https://about.netflix.com/en/news/netflix-and-shonda-rhimes-expand-creative-pact','Netflix and Shonda Rhimes expand creative pact','Netflix','company_release','2021-07-08T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s04','https://www.shondalandmedia.com/about-us/','About Shondaland Media','Shondaland','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s05','https://www.shondaland.com/about-us','About Shondaland','Shondaland','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s06','https://www.iheartmedia.com/press/shondaland-partners-iheartmedia-launch-shondaland-audio','Shondaland partners with iHeartMedia to launch Shondaland Audio','iHeartMedia','partner_release','2019-10-16T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s07','https://www.shondalandmedia.com/audio/','Shondaland Audio','Shondaland','company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s08','https://www.shondaland.com/shonda/shonda-rhimes-and-betsy-beers-reflect-on-the-moment-their-legendary-partnership-began','Rhimes and Beers reflect on their partnership','Shondaland','first_party_interview',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s09','https://www.shondaland.com/shonda/office-hours-betsy-beers','Office Hours: Betsy Beers','Shondaland','company_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s10','https://www.foxbusiness.com/features/netflix-signs-scandal-creator-shonda-rhimes-away-from-abc-as-battle-for-talent-escalates','Netflix signs Shonda Rhimes away from ABC','Fox Business / Wall Street Journal','independent_reporting','2017-08-14T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s11','https://techcrunch.com/2019/10/16/shonda-rhimes-iheartmedia/','Shonda Rhimes signs podcast deal with iHeartMedia','TechCrunch','independent_reporting','2019-10-16T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s12','https://ew.com/tv/netflix-sues-unofficial-bridgerton-musical-creators-for-infringement/','Netflix sues Unofficial Bridgerton Musical creators','Entertainment Weekly','independent_reporting','2022-07-30T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s13','https://www.shondaland.com/shonda/shonda-rhimes-and-betsy-beers-on-shondaland-s-growth-and-what-s-next','Rhimes and Beers on Shondaland growth','Shondaland','first_party_retrospective',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_sr_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'company_formation','Rhimes created Shondaland in 2004.','organizational_ownership','observed','unreviewed',NULL,'Shonda Rhimes founded Shondaland in 2004.','Current legal entities, capitalization and equity percentages are undisclosed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'abc_foundation','Shondaland’s original television apparatus developed through ABC and ABC Studios productions.','institution_building','observed','unreviewed',NULL,'Shondaland’s institutional foundation predates Netflix and was built through a long-running ABC production relationship.','Distinguish creator, producer, studio and network rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'netflix_transition','Netflix signed a multiyear deal for new work while existing ABC productions remained at ABC; Betsy Beers moved with Shondaland.','distribution_infrastructure','observed','unreviewed',NULL,'In 2017, Shondaland moved future development to Netflix while its existing ABC productions remained at ABC.','Netflix did not acquire Shondaland or inherit every legacy property.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'expanded_formats','The 2021 Netflix pact expanded into films, potential games and VR, branding, merchandise, live events and experiences.','portfolio_breadth','observed','unreviewed',NULL,'Netflix and Shondaland expanded their pact beyond series into additional production and commercial formats.','Contractual opportunity is not proof every format was produced or succeeded.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'specified_infrastructure','Netflix committed financial and technical infrastructure to specified Shondaland DEIA programs.','distribution_infrastructure','observed','unreviewed',NULL,'Netflix committed financial and technical infrastructure to specified Shondaland DEIA programs.','Do not generalize the clause into whole-company financing.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'multi_partner_expansion','Shondaland expanded editorial through Hearst Digital Networks and audio through iHeartMedia.','institutional_portability','observed','unreviewed',NULL,'Shondaland’s multi-format expansion also relied on separate Hearst and iHeartMedia partnerships.','Platform partnership is not platform ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'distributed_leadership','Betsy Beers and Sandie Bailey held documented content, production and digital-media operating roles.','governance_accountability','observed','unreviewed',NULL,'Shondaland’s operating apparatus is collaborative and includes named content and digital-media executives.','Do not assign every function and outcome solely to Rhimes.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'current_architecture','Shondaland’s public surface includes shows, films, editorial, audio, newsletters and partnerships.','portfolio_architecture','observed','unreviewed',NULL,'Shondaland now presents itself as a multi-format storytelling and media company.','Navigation does not establish legal units, revenue, profitability or ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'ip_boundaries','Bridgerton rights include Julia Quinn source material, Shondaland production and Netflix distribution and enforcement interests.','control_rights','observed','unreviewed',NULL,'Bridgerton’s rights architecture includes source-material rights, Shondaland production and Netflix distribution and enforcement interests.','Do not state that Rhimes or Shondaland solely owns Bridgerton IP.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'deal_value_boundary','Official Netflix announcements do not disclose complete economic terms.','claim_restriction','observed','unreviewed',NULL,'Netflix and Shondaland did not publicly disclose the pact’s complete economics.','Reported nine-figure values are not verified contract values.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'bounded_causal_architecture','Netflix extended Shondaland production and commercialization but did not originate the company, ABC catalog, editorial channel or audio partnership.','portfolio_architecture','interpretive','unreviewed',NULL,'Netflix helped extend Shondaland’s production and commercialization architecture; it did not create the institution from nothing.','Prohibit the claim that Netflix built a multi-format apparatus around Rhimes.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'ownership_boundary','Rhimes is Shondaland founder but current beneficial ownership, voting rights and complete IP allocations are undisclosed.','control_rights','observed','unreviewed',NULL,'Rhimes founded Shondaland; specific company equity and property rights require project- and entity-level documentation.','Founder status alone does not resolve present ownership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c13',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'psychology_boundary','No reviewed source measures Rhimes’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case documents institutions, rights and outputs; it does not measure psychology.','Do not convert creative-freedom or exhaustion accounts into scored traits.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_sr_c01','obs_claim_sr_c01','obs_src_sr_s01','supports',NULL,'Company biography','First-party formation year.',CURRENT_TIMESTAMP),
('obs_ev_sr_c02','obs_claim_sr_c02','obs_src_sr_s02','supports',NULL,'Legacy ABC series','Confirms pre-Netflix foundation.',CURRENT_TIMESTAMP),
('obs_ev_sr_c03a','obs_claim_sr_c03','obs_src_sr_s02','supports',NULL,'2017 deal announcement','Primary new-work and legacy boundary.',CURRENT_TIMESTAMP),
('obs_ev_sr_c03b','obs_claim_sr_c03','obs_src_sr_s10','qualifies',NULL,'Staff and writer boundaries','Independent transition detail.',CURRENT_TIMESTAMP),
('obs_ev_sr_c04','obs_claim_sr_c04','obs_src_sr_s03','supports',NULL,'Expanded pact bullets','Primary announced format scope.',CURRENT_TIMESTAMP),
('obs_ev_sr_c05','obs_claim_sr_c05','obs_src_sr_s03','supports',NULL,'DEIA infrastructure clause','Narrowly scoped commitment.',CURRENT_TIMESTAMP),
('obs_ev_sr_c06a','obs_claim_sr_c06','obs_src_sr_s04','supports',NULL,'Digital-media biography','Hearst and audio relationships.',CURRENT_TIMESTAMP),
('obs_ev_sr_c06b','obs_claim_sr_c06','obs_src_sr_s06','supports',NULL,'Audio launch','Partner primary record.',CURRENT_TIMESTAMP),
('obs_ev_sr_c07a','obs_claim_sr_c07','obs_src_sr_s09','supports',NULL,'Beers title','Content leadership boundary.',CURRENT_TIMESTAMP),
('obs_ev_sr_c07b','obs_claim_sr_c07','obs_src_sr_s04','supports',NULL,'Bailey remit','Digital operating boundary.',CURRENT_TIMESTAMP),
('obs_ev_sr_c08','obs_claim_sr_c08','obs_src_sr_s05','supports',NULL,'Current public navigation','Multi-format surface.',CURRENT_TIMESTAMP),
('obs_ev_sr_c09','obs_claim_sr_c09','obs_src_sr_s12','supports',NULL,'Rights dispute reporting','Source, production and enforcement interests.',CURRENT_TIMESTAMP),
('obs_ev_sr_c10','obs_claim_sr_c10','obs_src_sr_s02','qualifies',NULL,'Official announcement','No economics disclosed.',CURRENT_TIMESTAMP),
('obs_ev_sr_c11','obs_claim_sr_c11','obs_src_sr_s03','qualifies',NULL,'Expanded pact','Component of bounded synthesis.',CURRENT_TIMESTAMP),
('obs_ev_sr_c12','obs_claim_sr_c12','obs_src_sr_s01','qualifies',NULL,'Founder biography','Supports formation, not full beneficial ownership.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_sr_shondaland',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'organization','Shondaland','founder_and_creative_leader','2004-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s01',NULL,'Equity unresolved',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_beers',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'person','Betsy Beers','producing_partner_and_chief_content_officer',NULL,NULL,'unreviewed','draft','obs_src_sr_s09',NULL,'Longstanding collaborative role',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_abc',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'organization','ABC and ABC Studios','legacy_production_relationship',NULL,NULL,'unreviewed','draft','obs_src_sr_s02',NULL,'Project-specific rights',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_netflix',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'organization','Netflix','exclusive_overall_deal_partner','2017-08-14T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s03',NULL,'Complete terms undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_hearst',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'organization','Hearst Digital Networks','editorial_platform_partner','2017-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s04',NULL,'Exact agreement terms undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_iheart',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'organization','iHeartMedia','audio_partner','2019-10-16T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s06',NULL,'Audio economics and rights undisclosed',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_bridgerton',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'asset','Bridgerton','executive_producer_and_shondaland_production',NULL,NULL,'unreviewed','draft','obs_src_sr_s12',NULL,'Julia Quinn source and Netflix rights boundaries',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_sr_found',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'company_formation','Rhimes creates Shondaland','Legal formation details unresolved.','2004-01-01T00:00:00Z','year','unreviewed','draft','obs_src_sr_s01',NULL,'Year precision',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_netflix',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'overall_deal','Netflix announces Shondaland overall deal','New work moves; legacy ABC shows remain.','2017-08-14T00:00:00Z','day','unreviewed','draft','obs_src_sr_s02',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_audio',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'format_expansion','Shondaland Audio launches with iHeartMedia','Separate audio partnership.','2019-10-16T00:00:00Z','day','unreviewed','draft','obs_src_sr_s06',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_bridgerton',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'series_premiere','Bridgerton premieres','Project rights remain distributed.','2020-12-25T00:00:00Z','day','unreviewed','draft','obs_src_sr_s03',NULL,'Referenced success context',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_expand',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'deal_expansion','Netflix and Shondaland expand pact','Adds film, potential interactive formats, merchandise and experiences.','2021-07-08T00:00:00Z','day','unreviewed','draft','obs_src_sr_s03',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_shonda_rhimes_100','shonda-rhimes-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'1.0.0','research/observatory/dossiers/shonda-rhimes-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_sr_c01","obs_claim_sr_c02","obs_claim_sr_c03","obs_claim_sr_c04","obs_claim_sr_c05","obs_claim_sr_c06","obs_claim_sr_c07","obs_claim_sr_c08","obs_claim_sr_c09","obs_claim_sr_c10","obs_claim_sr_c12"],"relationshipIds":["obs_rel_sr_shondaland","obs_rel_sr_beers","obs_rel_sr_abc","obs_rel_sr_netflix","obs_rel_sr_hearst","obs_rel_sr_iheart","obs_rel_sr_bridgerton"],"eventIds":["obs_event_sr_found","obs_event_sr_netflix","obs_event_sr_audio","obs_event_sr_bridgerton","obs_event_sr_expand"],"observationIds":[],"excludedInterpretiveClaimIds":["obs_claim_sr_c11"],"methodBoundaryClaimIds":["obs_claim_sr_c13"],"limitations":["saturation_decision_not_yet_recorded","netflix_built_apparatus_claim_rejected","shondaland_predates_netflix","abc_legacy_rights_separate","multiple_platform_partners","distributed_operating_leadership","project_ip_not_company_ip","deal_economics_unverified","equity_and_voting_rights_unverified","announced_formats_not_completed_outputs","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.85,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_shonda_rhimes_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='shonda-rhimes'),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_shonda_rhimes_100',
'{"packageId":"shonda-rhimes-1.0.0","sourcesAdded":13,"claimsAdded":13,"claimsInPublicationManifest":11,"relationshipsAdded":7,"eventsAdded":5,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package separates Shondaland formation, ABC legacy rights, Netflix deal scope, Hearst and iHeart partnerships, distributed leadership and project-level IP; it rejects sole-platform causal architecture.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
