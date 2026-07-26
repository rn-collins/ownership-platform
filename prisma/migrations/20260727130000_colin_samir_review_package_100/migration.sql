-- Colin & Samir public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, infer psychology, or mark saturation complete.

UPDATE "ObservatoryCase"
SET "headline"='Cofounders of a creator-focused media company spanning video, audio, newsletters, education and events.',
    "summary"='A collaborative public-evidence case separating two people, a sold predecessor venture, current media products, staff labor, platform distribution and institutional counterparties.',
    "inclusionRationale"='Tests a jointly branded creator operating system while preserving person, entity, ownership, governance, IP, labor, economics, causality and psychology boundaries.',
    "roleBuiltFlag"=false,
    "verificationStatus"='in_review',
    "evidenceCoverage"=0.86,
    "publicStatus"='draft',
    "updatedAt"=CURRENT_TIMESTAMP
WHERE "slug" IN ('colin-and-samir','colin-samir');

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_cs_about','https://www.colinandsamir.com/','Colin & Samir About','Colin & Samir','company_site',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_publish','https://news.thepublishpress.com/authors','The Publish Press Our Story','The Publish Press','publication_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_substack','https://publishpress.substack.com/about','The Publish Press About','The Publish Press / Substack','archived_platform_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_whistle','https://variety.com/2014/digital/news/youtube-sports-mcn-the-whistle-acquires-the-lacrosse-network-exclusive-1201213647/','The Whistle acquires The Lacrosse Network','Variety','independent_reporting','2014-06-04T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_digiday','https://digiday.com/future-of-tv/how-youtube-stars-colin-and-samir-went-from-nearly-quitting-to-creating-their-own-media-company/','Colin and Samir create their media company','Digiday','independent_interview','2022-04-12T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_support','https://news.thepublishpress.com/p/new-channel','Why Colin & Samir launched a new channel','The Publish Press','first_person_company_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_course','https://www.fastcompany.com/91008575/colin-samir-30-day-creator-startup-course-kajabi','Colin and Samir made a 30-day course','Fast Company','independent_reporting','2024-01-17T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_lighthouse','https://www.fastcompany.com/90995030/creator-economy-campus-whalar-lighthouse-colin-samir','Creator economy campus','Fast Company','independent_reporting','2023-12-11T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_adobe','https://www.adobe.com/max/2025/sessions/creator-support-qa-with-colin-and-samir-os555.html','Creator Support Q&A with Colin and Samir','Adobe MAX','institutional_record','2025-10-28T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_cs_event','https://www.tubefilter.com/2026/03/10/colin-and-samir-press-publish-la-creator-event/','Press Publish LA','Tubefilter','independent_reporting','2026-03-10T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_cs_linkedin','https://www.linkedin.com/company/colin-and-samir','Colin & Samir company page','LinkedIn / Colin & Samir','issuer_platform_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET "url"=EXCLUDED."url", "title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType","publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_cs_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'longitudinal_collaboration','Rosenblum and Chaudry report working together since 2012 and building and selling their first YouTube channel.','collaborative_history','attributed','unreviewed',NULL,'Colin Rosenblum and Samir Chaudry report working together since 2012 and building and selling a predecessor YouTube channel.','Does not establish equal ownership, identical contribution or current rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'predecessor_acquisition','The Whistle acquired The Lacrosse Network in 2014.','transaction_history','observed','unreviewed',NULL,'Independent reporting documents The Whistle’s 2014 acquisition of The Lacrosse Network.','Transaction terms, founder proceeds and later retained rights remain unavailable.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'adverse_financial_history','Chaudry reported that their 2019 P&L was approximately $18,000 negative and freelance work funded the channel.','counterevidence','attributed','unreviewed',NULL,'In a 2022 interview, Chaudry described an approximately $18,000 loss in 2019 and reliance on freelance production work.','Historical first-person figure is not audited current financial evidence.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'commercial_contract','The pair reported a 2020 annual Samsung brand-ambassador contract.','institutional_dependency','attributed','unreviewed',NULL,'The pair attributed financial room to focus the channel to a 2020 Samsung annual ambassador contract.','Contract economics, renewal and causal performance remain unavailable.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'portfolio_architecture','The current system spans video, audio, newsletter, education and event products.','portfolio_architecture','observed','unreviewed',NULL,'The public portfolio includes the Colin & Samir show, The Publish Press, Creator Support, education products and Press Publish events.','Distinct products have different counterparties, labor, distribution and rights.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'product_development','Creator Support developed from an audio-only format into a separate YouTube channel.','product_evolution','observed','unreviewed',NULL,'Creator Support developed from a weekly audio format into a separate YouTube channel.','Its initial no-revenue description is dated and not a current monetization finding.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'platform_partnership','Creator Startup was released with Kajabi as a paid cohort product.','institutional_dependency','observed','unreviewed',NULL,'Creator Startup was released in partnership with Kajabi as a paid cohort product.','Course IP, revenue share, customer ownership and contribution rights are unavailable.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'delegated_role','Whalar named the pair co-chairs of The Lighthouse creator council and creators-in-residence.','delegated_authority','observed','unreviewed',NULL,'Whalar appointed Rosenblum and Chaudry to creator-council and creator-in-residence roles.','The roles do not establish ownership of The Lighthouse.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'distributed_labor','Public descriptions document team, producer, editor, brand-partner and outside-platform dependencies.','distributed_creation','observed','unreviewed',NULL,'The media system depends on staff, collaborators, platforms and commercial counterparties beyond the two founders.','Issuer employee-range metadata is not a complete roster or proof of employment terms.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c10',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'ownership_boundary','No reviewed public record establishes equal equity, current cap-table positions or voting control.','claim_restriction','observed','unreviewed',NULL,'Current ownership and governance remain unverified.','Joint branding, cofounder labels and self-owned platform metadata do not prove a 50/50 partnership.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c11',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'rights_boundary','No reviewed public record establishes ownership of channel accounts, newsletter list, show masters, trademarks, course materials or event IP.','claim_restriction','observed','unreviewed',NULL,'Asset and IP ownership remain unverified.','Control of public-facing accounts does not disclose legal title or contractual allocation.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_cs_c12',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'psychology_boundary','No reviewed source measures either person’s psychological constructs.','claim_restriction','observed','unreviewed',NULL,'The case measures public roles, relationships, products and events, not psychology.','Do not infer compatibility, motivation, cognition, resilience or mental state.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_cs_c01','obs_claim_cs_c01','obs_src_cs_substack','supports',NULL,'About page','First-party collaboration chronology.',CURRENT_TIMESTAMP),
('obs_ev_cs_c02','obs_claim_cs_c02','obs_src_cs_whistle','supports',NULL,'Acquisition report','Independent predecessor-transaction evidence.',CURRENT_TIMESTAMP),
('obs_ev_cs_c03','obs_claim_cs_c03','obs_src_cs_digiday','supports',NULL,'2019 P&L discussion','Attributed adverse financial evidence.',CURRENT_TIMESTAMP),
('obs_ev_cs_c04','obs_claim_cs_c04','obs_src_cs_digiday','supports',NULL,'Samsung contract discussion','Attributed commercial dependency.',CURRENT_TIMESTAMP),
('obs_ev_cs_c05a','obs_claim_cs_c05','obs_src_cs_about','supports',NULL,'Current offerings','First-party portfolio snapshot.',CURRENT_TIMESTAMP),
('obs_ev_cs_c05b','obs_claim_cs_c05','obs_src_cs_adobe','qualifies',NULL,'Speaker description','Institutional multi-format description.',CURRENT_TIMESTAMP),
('obs_ev_cs_c06','obs_claim_cs_c06','obs_src_cs_support','supports',NULL,'Channel launch account','First-party product history.',CURRENT_TIMESTAMP),
('obs_ev_cs_c07','obs_claim_cs_c07','obs_src_cs_course','supports',NULL,'Course announcement and interview','Independent partnership evidence.',CURRENT_TIMESTAMP),
('obs_ev_cs_c08','obs_claim_cs_c08','obs_src_cs_lighthouse','supports',NULL,'Leadership description','Independent delegated-role evidence.',CURRENT_TIMESTAMP),
('obs_ev_cs_c09','obs_claim_cs_c09','obs_src_cs_linkedin','qualifies',NULL,'Company metadata','Issuer-controlled company-size snapshot.',CURRENT_TIMESTAMP),
('obs_ev_cs_c10','obs_claim_cs_c10','obs_src_cs_linkedin','qualifies',NULL,'Self-owned label','Label does not disclose cap table or equal ownership.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_cs_pair',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'person','Colin Rosenblum and Samir Chaudry','long_term_collaborators','2012-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cs_substack',NULL,'Year-level first-party chronology',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_whistle',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'organization','The Whistle / The Lacrosse Network','predecessor_acquisition_relationship',NULL,'2016-12-31T00:00:00Z','unreviewed','draft','obs_src_cs_whistle',NULL,'Acquisition and later departure boundary',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_samsung',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'organization','Samsung','brand_ambassador_counterparty','2020-01-01T00:00:00Z',NULL,'unreviewed','draft','obs_src_cs_digiday',NULL,'Annual contract; exact dates and economics unavailable',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_kajabi',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'organization','Kajabi','course_platform_partner','2024-01-17T00:00:00Z',NULL,'unreviewed','draft','obs_src_cs_course',NULL,'Creator Startup partnership',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_cs_whalar',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'organization','Whalar / The Lighthouse','creator_council_cochairs_and_creators_in_residence','2023-12-11T00:00:00Z',NULL,'unreviewed','draft','obs_src_cs_lighthouse',NULL,'Delegated program roles; no ownership established',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_cs_sale',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'acquisition','The Whistle acquires The Lacrosse Network','Predecessor channel/network enters The Whistle.','2014-06-04T00:00:00Z','day','unreviewed','draft','obs_src_cs_whistle',NULL,'Independent acquisition report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cs_samsung',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'commercial_contract','Samsung ambassador contract','Pair report an annual brand-ambassador agreement.','2020-01-01T00:00:00Z','year','unreviewed','draft','obs_src_cs_digiday',NULL,'First-person interview evidence',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cs_course',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'product_launch','Creator Startup launches with Kajabi','Paid cohort education product announced.','2024-01-17T00:00:00Z','day','unreviewed','draft','obs_src_cs_course',NULL,'Independent report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_cs_press',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'live_event','Press Publish expands to Los Angeles','Creator-economy event series continues after New York edition.','2026-03-10T00:00:00Z','day','unreviewed','draft','obs_src_cs_event',NULL,'Trade report',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_colin_samir_100','colin-and-samir-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'1.0.0',
'research/observatory/dossiers/colin-and-samir-1.0.0.md','18f82e5c1ec2ca2b7aad22142172400b1cc2521a',
'{"claimIds":["obs_claim_cs_c01","obs_claim_cs_c02","obs_claim_cs_c03","obs_claim_cs_c04","obs_claim_cs_c05","obs_claim_cs_c06","obs_claim_cs_c07","obs_claim_cs_c08","obs_claim_cs_c09","obs_claim_cs_c10","obs_claim_cs_c11","obs_claim_cs_c12"],"relationshipIds":["obs_rel_cs_pair","obs_rel_cs_whistle","obs_rel_cs_samsung","obs_rel_cs_kajabi","obs_rel_cs_whalar"],"eventIds":["obs_event_cs_sale","obs_event_cs_samsung","obs_event_cs_course","obs_event_cs_press"],"observationIds":[],"limitations":["saturation_open","two_people_not_composite_identity","current_entity_family_and_cap_table_unavailable","equal_ownership_and_voting_unverified","financials_and_contract_economics_unavailable","ip_and_platform_account_ownership_unavailable","distributed_labor_incomplete","role_built_false","psychological_attributes_unmeasured","scoring_prohibited"]}'::jsonb,
0.86,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_colin_samir_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug" IN ('colin-and-samir','colin-samir') LIMIT 1),'system:versioned-import','system@institutions-of-one.local','import_review_package','review_package','obs_package_colin_samir_100',
'{"packageId":"colin-and-samir-1.0.0","claimsLoaded":12,"relationshipsLoaded":5,"eventsLoaded":4,"publication":"draft","saturation":"open","roleBuiltFlag":false}'::jsonb,
'Public-evidence package imported as draft. Person, ownership, governance, IP, labor, economics, causality, psychology and saturation restrictions remain active.',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
