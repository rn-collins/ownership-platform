-- Issa Rae Observatory review package 1.0.0.
-- This migration creates draft evidence records only. It does not constitute researcher review
-- and does not publish or verify the case.

INSERT INTO "ObservatoryCase" (
  "id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary",
  "inclusionRationale","roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus",
  "publicStatus","createdAt","updatedAt"
) VALUES (
  'obs_case_issa_rae','issa-rae','Issa Rae','creator','Media and entertainment','United States',
  'Creator, producer, and founder building connected media, talent, audio, and investment infrastructure',
  'A public-evidence case about documented organizational formation, multi-vertical media infrastructure, creator-development systems, platform partnerships, and investments.',
  'Selected as the first flagship case because multiple first-party organizations publicly document founder roles, operating scope, partnerships, and ownership relationships.',
  true,'in_review',0.78,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "headline"=EXCLUDED."headline","summary"=EXCLUDED."summary",
  "inclusionRationale"=EXCLUDED."inclusionRationale","verificationStatus"='in_review',
  "evidenceCoverage"=0.78,"updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource" (
  "id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt"
) VALUES
('obs_src_ir_s01','https://www.hoorae.co/','HOORAE home','HOORAE','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s02','https://www.hoorae.co/ourcompanies','HOORAE — Our Companies','HOORAE','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s03','https://colorcreative.co/','ColorCreative','ColorCreative','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s04','https://www.theraedio.com/','Raedio','Raedio','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s05','https://press.wbd.com/na/media-release/hbo-0/warnermedia-extends-relationship-issa-rae-five-year-overall-deal','WarnerMedia Extends Relationship With Issa Rae With Five-Year Overall Deal','WarnerMedia','official_record','2021-03-24T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s06','https://www.sandiegofc.com/club/ownership','San Diego FC ownership','San Diego FC','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ir_s07','https://variety.com/2021/tv/news/issa-rae-hbo-max-warnermedia-film-television-deal-1234935944/','Issa Rae Inks New Eight-Figure Overall Deal With WarnerMedia','Variety','journalism','2021-03-24T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
  "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
  "publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
  "primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim" (
  "id","caseId","claimType","statement","constructId","epistemicStatus",
  "verificationStatus","confidence","permissibleLanguage","contradictionNote",
  "publicStatus","createdAt","updatedAt"
) VALUES
('obs_claim_ir_c01','obs_case_issa_rae','organizational_formation','HOORAE’s official site identifies Issa Rae as its founder.','organizational_ownership','observed','unreviewed',NULL,'Issa Rae founded HOORAE.','Founding does not establish sole ownership, current equity percentage, or unilateral control.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c02','obs_case_issa_rae','ownership_self_description','HOORAE describes itself as Black-owned and woman-owned.','organizational_ownership','observed','unreviewed',NULL,'HOORAE describes itself as a Black-owned, woman-owned media company.','This is a company self-description; corporate ownership filings have not been reviewed.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c03','obs_case_issa_rae','operating_scope','HOORAE says its work spans film, television, digital content, music, and talent development.','portfolio_breadth','observed','unreviewed',NULL,'HOORAE publicly operates across film, television, digital content, music, and talent development.','Scope does not establish equal activity, revenue, ownership, or success in every vertical.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c04','obs_case_issa_rae','organizational_formation','ColorCreative identifies Issa Rae, Deniese Davis, and Talitha Watkins as co-founders.','organizational_ownership','observed','unreviewed',NULL,'Issa Rae co-founded ColorCreative with Deniese Davis and Talitha Watkins.','ColorCreative should not be described as Rae’s sole company.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c05','obs_case_issa_rae','talent_infrastructure','ColorCreative states that its mission includes empowering creators and championing inclusive entertainment.','talent_infrastructure','observed','unreviewed',NULL,'ColorCreative says its mission is to empower creators and champion inclusive entertainment.','A mission statement does not establish measured outcomes for represented creators.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c06','obs_case_issa_rae','company_architecture','HOORAE’s official companies page presents ColorCreative, Ensemble, and Raedio within its company architecture.','portfolio_breadth','observed','unreviewed',NULL,'HOORAE publicly presents ColorCreative, Ensemble, and Raedio as its companies.','The page does not disclose legal-subsidiary status, equity percentages, consolidated financials, or governance rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c07','obs_case_issa_rae','operating_scope','Raedio states that it works through record-label, publishing, music-supervision, and podcast divisions.','portfolio_breadth','observed','unreviewed',NULL,'Raedio operates across recorded music, publishing, music supervision, and podcasts.','Operating scope does not establish revenue diversification or profitability.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c08','obs_case_issa_rae','platform_partnership','WarnerMedia announced a five-year overall film and television deal with Issa Rae in 2021 involving HOORAE.','platform_relationship','observed','unreviewed',NULL,'In March 2021, WarnerMedia announced a five-year overall film and television deal with Issa Rae involving HOORAE.','The reported dollar value is withheld because the reviewed public record does not include the contract. An overall deal does not establish platform independence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ir_c09','obs_case_issa_rae','capital_ownership','San Diego FC identifies Issa Rae as a club partner joining through a partnership with Pave Investments.','capital_ownership','observed','unreviewed',NULL,'San Diego FC identifies Issa Rae as a partner in the club through a partnership with Pave Investments.','The public page does not disclose investment amount, equity percentage, voting rights, or economic return.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence" (
  "id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt"
) VALUES
('obs_ev_ir_c01_s01','obs_claim_ir_c01','obs_src_ir_s01','supports','Founded by Issa Rae.','Home page, founder heading','Direct first-party founder identification.',CURRENT_TIMESTAMP),
('obs_ev_ir_c02_s01','obs_claim_ir_c02','obs_src_ir_s01','supports','HOORAE Media is a Black-owned, woman-owned media company.','Home page, company description','Verify as attributed self-description only.',CURRENT_TIMESTAMP),
('obs_ev_ir_c03_s01','obs_claim_ir_c03','obs_src_ir_s01','supports','film, television, digital content, music, and talent development.','Home page, mission paragraph','Documents stated operating scope.',CURRENT_TIMESTAMP),
('obs_ev_ir_c04_s03','obs_claim_ir_c04','obs_src_ir_s03','supports','co-founded by Issa Rae, Deniese Davis, and Talitha Watkins.','Home page, company description','Direct first-party co-founder identification.',CURRENT_TIMESTAMP),
('obs_ev_ir_c05_s03','obs_claim_ir_c05','obs_src_ir_s03','supports','empower creators to reach their greatest potential.','Home page, mission description','Mission evidence, not outcome evidence.',CURRENT_TIMESTAMP),
('obs_ev_ir_c05_s02','obs_claim_ir_c05','obs_src_ir_s02','supports',NULL,'Our Companies, ColorCreative','Second first-party statement of the mission.',CURRENT_TIMESTAMP),
('obs_ev_ir_c06_s02','obs_claim_ir_c06','obs_src_ir_s02','supports',NULL,'Our Companies','Documents the public company architecture without proving legal subsidiary status.',CURRENT_TIMESTAMP),
('obs_ev_ir_c07_s04','obs_claim_ir_c07','obs_src_ir_s04','supports','record label, publishing, music supervision, and podcast divisions.','Home page, company description','Documents operating divisions.',CURRENT_TIMESTAMP),
('obs_ev_ir_c08_s05','obs_claim_ir_c08','obs_src_ir_s05','supports',NULL,'Press release dated March 24, 2021','Announcement by a party to the relationship.',CURRENT_TIMESTAMP),
('obs_ev_ir_c08_s07','obs_claim_ir_c08','obs_src_ir_s07','supports',NULL,'Article dated March 24, 2021','Independent journalistic confirmation.',CURRENT_TIMESTAMP),
('obs_ev_ir_c09_s06','obs_claim_ir_c09','obs_src_ir_s06','supports','Issa Rae is a partner of San Diego FC.','Ownership page, Issa Rae entry','Direct organization record; stake terms undisclosed.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship" (
  "id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt",
  "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_rel_ir_r01','obs_case_issa_rae','organization','HOORAE','founder',NULL,NULL,'unreviewed','draft','obs_src_ir_s01','Founded by Issa Rae.','Home page, founder heading',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ir_r02','obs_case_issa_rae','organization','ColorCreative','co_founder',NULL,NULL,'unreviewed','draft','obs_src_ir_s03','co-founded by Issa Rae, Deniese Davis, and Talitha Watkins.','Home page, company description',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ir_r03','obs_case_issa_rae','organization','Raedio','company_architecture',NULL,NULL,'unreviewed','draft','obs_src_ir_s02',NULL,'Our Companies, Raedio',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ir_r04','obs_case_issa_rae','organization','WarnerMedia','overall_deal_partner','2021-03-24T00:00:00Z',NULL,'unreviewed','draft','obs_src_ir_s05',NULL,'Press release dated March 24, 2021',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ir_r05','obs_case_issa_rae','organization','San Diego FC','club_partner',NULL,NULL,'unreviewed','draft','obs_src_ir_s06','Issa Rae is a partner of San Diego FC.','Ownership page, Issa Rae entry',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ir_r06','obs_case_issa_rae','organization','Pave Investments','investment_partner',NULL,NULL,'unreviewed','draft','obs_src_ir_s06',NULL,'Ownership page, Issa Rae entry',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent" (
  "id","caseId","eventType","title","description","occurredAt","precision",
  "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_event_ir_e01','obs_case_issa_rae','partnership_announcement','WarnerMedia announces five-year overall deal with Issa Rae involving HOORAE','The public announcement documents a major institutional partnership; it does not establish platform independence.','2021-03-24T00:00:00Z','day','unreviewed','draft','obs_src_ir_s05',NULL,'Press release dated March 24, 2021',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ir_e02','obs_case_issa_rae','evidence_snapshot','HOORAE site identifies Rae as founder and describes multi-vertical scope','This is an observation date for the webpage, not a founding date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_ir_s01','Founded by Issa Rae.','Home page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ir_e03','obs_case_issa_rae','evidence_snapshot','ColorCreative site identifies Rae, Davis, and Watkins as co-founders','This is an observation date for the webpage, not a founding date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_ir_s03','co-founded by Issa Rae, Deniese Davis, and Talitha Watkins.','Home page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ir_e04','obs_case_issa_rae','evidence_snapshot','San Diego FC ownership page identifies Rae as a club partner','This is an observation date for the webpage, not the investment date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_ir_s06','Issa Rae is a partner of San Diego FC.','Ownership page, Issa Rae entry',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent" (
  "id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt"
) VALUES (
  'obs_audit_issa_rae_package_100','obs_case_issa_rae','system:versioned-import','system@institutions-of-one.local',
  'import_review_package','case','obs_case_issa_rae',
  '{"package":"research/observatory/dossiers/issa-rae-1.0.0.md","claims":9,"relationships":6,"events":4,"publication":"draft"}'::jsonb,
  'Versioned evidence package imported as draft. This is not a researcher review or publication decision.',
  CURRENT_TIMESTAMP
) ON CONFLICT ("id") DO NOTHING;
