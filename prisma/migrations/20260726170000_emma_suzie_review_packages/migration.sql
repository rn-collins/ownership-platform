-- Emma Chamberlain and Suzie Reider Observatory review packages 1.0.0.
-- Draft evidence records only. This migration does not publish or verify either case.

INSERT INTO "ObservatoryCase" (
  "id","slug","displayName","caseType","primaryField","jurisdiction","headline","summary",
  "inclusionRationale","roleBuiltFlag","verificationStatus","evidenceCoverage","consentStatus",
  "publicStatus","createdAt","updatedAt"
) VALUES
('obs_case_emma_chamberlain','emma-chamberlain','Emma Chamberlain','creator','Consumer and media','United States',
 'Creator and co-CEO connecting media authorship with an operating consumer brand',
 'A public-evidence case concerning creator authorship, an operating consumer company, executive authority, outside capital, retail distribution, and a separately distributed audio property.',
 'Selected for Batch 1 to examine how creator attention becomes operating and distribution infrastructure while preserving limits around ownership and control.',
 true,'in_review',0.74,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_case_suzie_reider','suzie-reider','Suzie Reider','professional','Media and platform business','United States',
 'Revenue and media executive credited with building commercial organizations across YouTube, Waze, and Lyft',
 'A public-evidence case concerning formation and leadership of revenue, marketing, sales, and media systems within major platform businesses.',
 'Selected for Batch 1 to distinguish documented institution building inside employers from unsupported claims that a unique role was built around the professional.',
 false,'in_review',0.71,'public_evidence','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO UPDATE SET
  "headline"=EXCLUDED."headline","summary"=EXCLUDED."summary",
  "inclusionRationale"=EXCLUDED."inclusionRationale","verificationStatus"='in_review',
  "evidenceCoverage"=EXCLUDED."evidenceCoverage","updatedAt"=CURRENT_TIMESTAMP;

INSERT INTO "ObservatorySource" (
  "id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt"
) VALUES
('obs_src_ec_s01','https://chamberlaincoffee.com/pages/about-us','Chamberlain Coffee — About','Chamberlain Coffee','company_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s02','https://www.prnewswire.com/news-releases/chamberlain-coffee-raises-7m-in-funding-from-previous-and-new-investors-301840027.html','Chamberlain Coffee raises $7M','Chamberlain Coffee','company_record','2023-06-01T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s03','https://www.prnewswire.com/news-releases/chamberlain-coffee-brings-a-new-wave-of-innovation-with-ready-to-drink-latte-launch-301802639.html','Ready-to-drink latte launch','Chamberlain Coffee','company_record','2023-04-20T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s04','https://www.bevnet.com/news/2024/chamberlain-coffees-influencer-founder-emma-chamberlain-takes-co-ceo-mantle/','Emma Chamberlain takes co-CEO role','BevNet','journalism','2024-08-15T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s05','https://www.walmart.com/brand/chamberlaincoffee/10002532','Chamberlain Coffee at Walmart','Walmart','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s06','https://open.spotify.com/show/5VzFvh1JlEhBMS6ZHZ8CNO','Anything Goes with Emma Chamberlain','Spotify','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_ec_s07','https://www.linkedin.com/posts/cbgallant_emma-chamberlain-appointed-co-ceo-at-chamberlain-activity-7233952385520254976-WSno','Former CEO on leadership transition','Christopher Gallant','first_person',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s01','https://www.lyft.com/blog/posts/lyft-welcomes-suzie-reider','Lyft welcomes Suzie Reider','Lyft','company_record','2024-12-04T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s02','https://www.middlebury.edu/about-middlebury/suzanne-reider-87','Suzanne Reider ’87','Middlebury College','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s03','https://www.middlebury.edu/middcore/suzie-reider','Suzie Reider','Middlebury College','official_record',NULL,'2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s04','https://www.mediapost.com/publications/article/401629/googles-suzie-reider-joins-lyft.html','Google’s Suzie Reider joins Lyft','MediaPost','journalism','2024-12-04T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s05','https://podcasts.apple.com/us/podcast/suzie-reider-evp-at-lyft/id1761181222?i=1000700581856','Suzie Reider, EVP at Lyft — Special Sauce','Apple Podcasts','first_person','2025-03-24T00:00:00Z','2026-07-25T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_sr_s06','https://www.businesstravelnews.com/Transportation/Ground/Reider-to-Oversee-Lyft-Business','Reider to oversee Lyft Business','Business Travel News','journalism','2024-12-04T00:00:00Z','2026-07-25T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("url") DO UPDATE SET
  "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
  "publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt",
  "primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim" (
  "id","caseId","claimType","statement","constructId","epistemicStatus",
  "verificationStatus","confidence","permissibleLanguage","contradictionNote",
  "publicStatus","createdAt","updatedAt"
) VALUES
('obs_claim_ec_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'brand_origin','Chamberlain Coffee’s official about page connects the brand’s origin to Emma Chamberlain’s YouTube work and interest in coffee.','organizational_ownership','observed','unreviewed',NULL,'Chamberlain Coffee publicly connects its origin to Emma Chamberlain’s creator career and interest in coffee.','The account does not establish sole ownership, legal formation, initial capitalization, or sole causation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'outside_capital','Chamberlain Coffee announced a $7 million financing round in June 2023 involving existing and new investors.','capital_structure','observed','unreviewed',NULL,'Chamberlain Coffee announced a $7 million financing round in 2023.','The announcement does not establish valuation, ownership percentage, dilution, voting rights, or profitability.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'product_breadth','Company announcements describe Chamberlain Coffee as operating across packaged coffee and ready-to-drink products.','portfolio_breadth','observed','unreviewed',NULL,'By 2023, Chamberlain Coffee publicly described a portfolio extending beyond packaged coffee into ready-to-drink beverages.','Product breadth does not establish revenue diversification, margins, or durable demand.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'retail_distribution','Chamberlain Coffee announced a Walmart ready-to-drink launch, and Walmart maintains a Chamberlain Coffee brand storefront.','distribution_infrastructure','observed','unreviewed',NULL,'Chamberlain Coffee launched ready-to-drink products through Walmart, which maintains a Chamberlain Coffee brand storefront.','The evidence does not establish nationwide store count, current inventory, sales, or continuing exclusivity.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'executive_authority','Trade reporting and the outgoing CEO’s first-person announcement identify Emma Chamberlain as becoming co-CEO alongside Gustav Hossy in 2024.','operating_authority','observed','unreviewed',NULL,'Emma Chamberlain became co-CEO of Chamberlain Coffee in 2024 alongside Gustav Hossy.','The title does not establish unilateral authority, board control, or ownership percentage.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'audio_property','Spotify maintains a current show page for Anything Goes with Emma Chamberlain.','portfolio_breadth','observed','unreviewed',NULL,'Anything Goes with Emma Chamberlain is distributed as a distinct podcast property on Spotify.','The platform page does not establish intellectual-property ownership, exclusivity, audience size, or revenue.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_ec_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'operating_architecture','The documented case combines creator authorship, a namesake consumer brand, executive authority, external financing, retail distribution, and a separately distributed audio property.','institutional_architecture','classified','unreviewed',NULL,'The reviewed public record supports classifying Chamberlain’s work as a creator-led operating architecture spanning media authorship and a venture-backed consumer company.','This is an Observatory classification, not a score and not evidence that every asset is owned or controlled by Chamberlain.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'executive_appointment','Lyft announced that Reider would join as EVP of Lyft Media and Lyft Business on December 10, 2024, reporting to CEO David Risher.','operating_authority','observed','unreviewed',NULL,'Lyft appointed Suzie Reider EVP of Lyft Media and Lyft Business effective December 10, 2024.','The appointment does not establish subsequent performance, current tenure beyond the reviewed record, or compensation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'career_tenure','Lyft and Middlebury report that Reider spent 17 years at Google in commercial leadership roles.','institutional_portability','observed','unreviewed',NULL,'Lyft and Middlebury report that Reider spent 17 years at Google in commercial leadership roles.','Exact start and end dates and every intervening role are not established by this package.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization_formation','Lyft and Middlebury biographies credit Reider with founding YouTube’s Revenue and Marketing Organization.','role_formation','observed','unreviewed',NULL,'Institutional biographies from Lyft and Middlebury credit Reider with founding YouTube’s Revenue and Marketing Organization.','Preserve attribution. No original Google or YouTube organizational record was located, and sole causation is not established.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'sales_leadership','Middlebury reports that Reider ran YouTube’s sales organization for five years.','operating_authority','observed','unreviewed',NULL,'A Middlebury profile reports that Reider ran YouTube’s sales organization for five years.','Exact dates, remit, revenue, collaborators, and outcomes require additional records.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'program_formation','Middlebury credits Reider with launching BrandLab and Google’s Brandcast.','role_formation','observed','unreviewed',NULL,'A Middlebury profile credits Reider with launching BrandLab and Google’s Brandcast.','The evidence does not establish sole authorship, exact launch dates, scale, or causal performance.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'revenue_authority','Lyft identifies Reider as a former Global Chief Revenue Officer for Waze.','operating_authority','observed','unreviewed',NULL,'Before Lyft, Reider served as Global Chief Revenue Officer for Waze.','A title does not establish revenue outcomes, ownership, or unilateral authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_sr_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'institution_building_pattern','The reviewed record documents repeated formation or leadership of commercial systems across YouTube, Waze, and Lyft.','institutional_portability','classified','unreviewed',NULL,'The reviewed public record supports studying Reider as a professional institution-building case across several platform businesses.','Do not state that employers built unique roles around Reider unless role-creation evidence is obtained.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence" (
  "id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt"
) VALUES
('obs_ev_ec_c01_s01','obs_claim_ec_c01','obs_src_ec_s01','supports',NULL,'About page, first-person origin account','Documents the company’s stated origin, not legal ownership.',CURRENT_TIMESTAMP),
('obs_ev_ec_c02_s02','obs_claim_ec_c02','obs_src_ec_s02','supports',NULL,'Release dated June 1, 2023','Company announcement of financing; terms remain undisclosed.',CURRENT_TIMESTAMP),
('obs_ev_ec_c03_s02','obs_claim_ec_c03','obs_src_ec_s02','supports',NULL,'Product-category discussion','Documents stated product breadth.',CURRENT_TIMESTAMP),
('obs_ev_ec_c03_s03','obs_claim_ec_c03','obs_src_ec_s03','supports',NULL,'Ready-to-drink launch announcement','Documents ready-to-drink product expansion.',CURRENT_TIMESTAMP),
('obs_ev_ec_c04_s03','obs_claim_ec_c04','obs_src_ec_s03','supports',NULL,'Walmart launch announcement','Documents the announced retail launch.',CURRENT_TIMESTAMP),
('obs_ev_ec_c04_s05','obs_claim_ec_c04','obs_src_ec_s05','supports',NULL,'Current brand storefront','Retailer-controlled record of current online brand/category presence.',CURRENT_TIMESTAMP),
('obs_ev_ec_c05_s04','obs_claim_ec_c05','obs_src_ec_s04','supports',NULL,'Article dated August 15, 2024','Trade report of appointment.',CURRENT_TIMESTAMP),
('obs_ev_ec_c05_s07','obs_claim_ec_c05','obs_src_ec_s07','supports',NULL,'Leadership-transition post','First-person corroboration from the outgoing CEO.',CURRENT_TIMESTAMP),
('obs_ev_ec_c06_s06','obs_claim_ec_c06','obs_src_ec_s06','supports',NULL,'Current show page','Documents distribution, not ownership or economics.',CURRENT_TIMESTAMP),
('obs_ev_ec_c07_s01','obs_claim_ec_c07','obs_src_ec_s01','supports',NULL,'Origin account','One component of the classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_ec_c07_s02','obs_claim_ec_c07','obs_src_ec_s02','supports',NULL,'Financing announcement','One component of the classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_ec_c07_s06','obs_claim_ec_c07','obs_src_ec_s06','supports',NULL,'Show page','One component of the classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_sr_c01_s01','obs_claim_sr_c01','obs_src_sr_s01','supports',NULL,'Appointment announcement','Company announcement of the role and reporting line.',CURRENT_TIMESTAMP),
('obs_ev_sr_c01_s04','obs_claim_sr_c01','obs_src_sr_s04','supports',NULL,'Article dated December 4, 2024','Independent trade corroboration.',CURRENT_TIMESTAMP),
('obs_ev_sr_c01_s06','obs_claim_sr_c01','obs_src_sr_s06','supports',NULL,'Article dated December 4, 2024','Independent trade corroboration.',CURRENT_TIMESTAMP),
('obs_ev_sr_c02_s01','obs_claim_sr_c02','obs_src_sr_s01','supports',NULL,'Career biography','Company-attributed career duration.',CURRENT_TIMESTAMP),
('obs_ev_sr_c02_s02','obs_claim_sr_c02','obs_src_sr_s02','supports',NULL,'Institutional biography','Corroborating institutional career duration.',CURRENT_TIMESTAMP),
('obs_ev_sr_c03_s01','obs_claim_sr_c03','obs_src_sr_s01','supports',NULL,'Career biography','Attributed formation claim.',CURRENT_TIMESTAMP),
('obs_ev_sr_c03_s02','obs_claim_sr_c03','obs_src_sr_s02','supports',NULL,'Institutional biography','Corroborates attributed formation claim; original employer record still absent.',CURRENT_TIMESTAMP),
('obs_ev_sr_c04_s03','obs_claim_sr_c04','obs_src_sr_s03','supports',NULL,'YouTube career section','Institutional biography reports five-year sales leadership.',CURRENT_TIMESTAMP),
('obs_ev_sr_c05_s03','obs_claim_sr_c05','obs_src_sr_s03','supports',NULL,'YouTube career section','Attributed program-launch claims.',CURRENT_TIMESTAMP),
('obs_ev_sr_c06_s01','obs_claim_sr_c06','obs_src_sr_s01','supports',NULL,'Career biography','Company-attributed Waze title.',CURRENT_TIMESTAMP),
('obs_ev_sr_c06_s02','obs_claim_sr_c06','obs_src_sr_s02','supports',NULL,'Institutional biography','Corroborating Waze title.',CURRENT_TIMESTAMP),
('obs_ev_sr_c07_s01','obs_claim_sr_c07','obs_src_sr_s01','supports',NULL,'Career biography','One component of the classified synthesis.',CURRENT_TIMESTAMP),
('obs_ev_sr_c07_s05','obs_claim_sr_c07','obs_src_sr_s05','supports',NULL,'Interview description and episode','First-person context about early YouTube and building Lyft media business.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship" (
  "id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt",
  "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_rel_ec_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'organization','Chamberlain Coffee','brand_originator_namesake',NULL,NULL,'unreviewed','draft','obs_src_ec_s01',NULL,'About page, first-person origin account',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'organization','Chamberlain Coffee','co_ceo','2024-08-15T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec_s04',NULL,'Article dated August 15, 2024',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'organization','Walmart','retail_distribution_partner','2023-04-20T00:00:00Z',NULL,'unreviewed','draft','obs_src_ec_s03',NULL,'Ready-to-drink launch announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'asset','Anything Goes with Emma Chamberlain','creator_host',NULL,NULL,'unreviewed','draft','obs_src_ec_s06',NULL,'Current show page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_ec_r05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'platform','Spotify','podcast_distribution',NULL,NULL,'unreviewed','draft','obs_src_ec_s06',NULL,'Current show page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Lyft','evp_media_and_business','2024-12-10T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'platform','YouTube','chief_marketing_officer','2006-06-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_sr_s03',NULL,'Institutional biography; summer 2006, stored as approximate',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'platform','YouTube','sales_organization_leader',NULL,NULL,'unreviewed','draft','obs_src_sr_s03',NULL,'Institutional biography reports five-year duration',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'platform','YouTube','attributed_revenue_marketing_org_founder',NULL,NULL,'unreviewed','draft','obs_src_sr_s01',NULL,'Lyft career biography; preserve attribution',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'platform','Waze','global_chief_revenue_officer',NULL,NULL,'unreviewed','draft','obs_src_sr_s01',NULL,'Lyft career biography',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_sr_r06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'organization','Google','commercial_executive_tenure',NULL,NULL,'unreviewed','draft','obs_src_sr_s01',NULL,'Lyft reports a 17-year tenure; exact endpoints withheld',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent" (
  "id","caseId","eventType","title","description","occurredAt","precision",
  "verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt"
) VALUES
('obs_event_ec_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'distribution_launch','Chamberlain Coffee announces Walmart ready-to-drink launch','Announcement evidence; sales and continuing exclusivity remain unverified.','2023-04-20T00:00:00Z','day','unreviewed','draft','obs_src_ec_s03',NULL,'Release dated April 20, 2023',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'financing_announcement','Chamberlain Coffee announces $7 million financing','Financing terms, valuation, and ownership consequences are not disclosed.','2023-06-01T00:00:00Z','day','unreviewed','draft','obs_src_ec_s02',NULL,'Release dated June 1, 2023',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'executive_appointment','Emma Chamberlain becomes co-CEO of Chamberlain Coffee','Appointment reported by trade press and corroborated by the outgoing CEO.','2024-08-15T00:00:00Z','day','unreviewed','draft','obs_src_ec_s04',NULL,'Article dated August 15, 2024',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'evidence_snapshot','Walmart storefront documents Chamberlain Coffee brand/category presence','Observation date for the retailer page, not a launch or inventory date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_ec_s05',NULL,'Current brand storefront',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_ec_e05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'evidence_snapshot','Spotify page documents Anything Goes podcast distribution','Observation date for the platform page, not the show’s origin date.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_ec_s06',NULL,'Current show page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_e01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'executive_appointment','Reider joins YouTube as CMO','Middlebury reports summer 2006; stored date is approximate.','2006-06-01T00:00:00Z','approximate','unreviewed','draft','obs_src_sr_s03',NULL,'Institutional biography',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_e02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'appointment_announcement','Lyft announces Reider’s appointment','Company announcement identifies role, effective date, and reporting line.','2024-12-04T00:00:00Z','day','unreviewed','draft','obs_src_sr_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_e03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'role_start','Reider begins EVP role at Lyft','Effective date stated in Lyft’s announcement.','2024-12-10T00:00:00Z','day','unreviewed','draft','obs_src_sr_s01',NULL,'Appointment announcement',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_e04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'first_person_interview','Interview discusses early YouTube and building Lyft’s media business','The interview supplies first-person context, not audited outcome evidence.','2025-03-24T00:00:00Z','day','unreviewed','draft','obs_src_sr_s05',NULL,'Episode page',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_sr_e05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'evidence_snapshot','Middlebury biography records Lyft role and prior career','Observation date for the institutional biography.','2026-07-25T00:00:00Z','day','unreviewed','draft','obs_src_sr_s02',NULL,'Current institutional biography',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage" (
  "id","packageId","caseId","version","dossierPath","contentHash","manifest",
  "evidenceCoverage","status","createdAt","updatedAt"
) VALUES
('obs_package_emma_chamberlain_100','emma-chamberlain-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'1.0.0',
 'research/observatory/dossiers/emma-chamberlain-1.0.0.md','369538084380274c5c0e85d869f72e33244de7aa',
 '{"claimIds":["obs_claim_ec_c01","obs_claim_ec_c02","obs_claim_ec_c03","obs_claim_ec_c04","obs_claim_ec_c05","obs_claim_ec_c06"],"relationshipIds":["obs_rel_ec_r01","obs_rel_ec_r02","obs_rel_ec_r03","obs_rel_ec_r04","obs_rel_ec_r05"],"eventIds":["obs_event_ec_e01","obs_event_ec_e02","obs_event_ec_e03","obs_event_ec_e04","obs_event_ec_e05"],"observationIds":[],"limitations":["ownership_percentage_unverified","financial_outcomes_unverified","platform_contract_terms_unverified","psychological_attributes_unmeasured","classified_synthesis_excluded_from_auto_publication"]}'::jsonb,
 0.74,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_package_suzie_reider_100','suzie-reider-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'1.0.0',
 'research/observatory/dossiers/suzie-reider-1.0.0.md','6d77d46dbb0226af3e7099c388f480f22956c6a7',
 '{"claimIds":["obs_claim_sr_c01","obs_claim_sr_c02","obs_claim_sr_c06"],"relationshipIds":["obs_rel_sr_r01","obs_rel_sr_r05","obs_rel_sr_r06"],"eventIds":["obs_event_sr_e02","obs_event_sr_e03","obs_event_sr_e05"],"observationIds":[],"limitations":["original_google_youtube_records_missing","attributed_formation_claims_excluded_from_auto_publication","role_built_flag_not_supported","financial_outcomes_unverified","psychological_attributes_unmeasured"]}'::jsonb,
 0.71,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent" (
  "id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt"
) VALUES
('obs_audit_emma_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='emma-chamberlain'),'system:versioned-import','system@institutions-of-one.local',
 'import_review_package','review_package','obs_package_emma_chamberlain_100',
 '{"packageId":"emma-chamberlain-1.0.0","claimsLoaded":7,"claimsInPublicationManifest":6,"relationshipsLoaded":5,"eventsLoaded":5,"publication":"draft"}'::jsonb,
 'Versioned evidence package imported as draft. The classified synthesis remains outside the automatic publication manifest.',
 CURRENT_TIMESTAMP),
('obs_audit_suzie_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='suzie-reider'),'system:versioned-import','system@institutions-of-one.local',
 'import_review_package','review_package','obs_package_suzie_reider_100',
 '{"packageId":"suzie-reider-1.0.0","claimsLoaded":7,"claimsInPublicationManifest":3,"relationshipsLoaded":6,"relationshipsInPublicationManifest":3,"eventsLoaded":5,"eventsInPublicationManifest":3,"publication":"draft"}'::jsonb,
 'Versioned evidence package imported as draft. Attributed YouTube formation claims and the classified synthesis remain outside the automatic publication manifest.',
 CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
