-- Jane Gilbert public-evidence review package 1.0.0.
-- Draft only. Does not publish, verify, score, causally attribute outcomes, or mark saturation complete.

INSERT INTO "ObservatorySource"
("id","url","title","publisher","sourceType","publishedAt","accessedAt","primarySource","publicStatus","createdAt")
VALUES
('obs_src_jg_appointment','https://www.miamidade.gov/releases/2021-04-30-mayor-chief-heat-officer.asp','Mayor announces first-ever Chief Heat Officer','Miami-Dade County','government_release','2021-04-30T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_profile','https://secure.miamidade.gov/employee/ithrive/archive/ithrive-rer-gilbert.page','Envisioning and building a green community','Miami-Dade County','government_profile',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_wef','https://www.weforum.org/stories/2023/05/chief-heat-officer/','The rise of the Chief Heat Officer','World Economic Forum','first_person_institutional_interview','2023-05-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_portal','https://www.miamidade.gov/heat/','Extreme Heat','Miami-Dade County','government_program_record',NULL,'2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_plan','https://www.miamidade.gov/environment/library/2022-heat-action-plan.pdf','Extreme Heat Action Plan','Miami-Dade County','government_plan','2022-12-14T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_bams','https://journals.ametsoc.org/view/journals/bams/105/5/BAMS-D-23-0055.1.xml','Rapidly Developing a Community- and Evidence-Based Heat Action Plan','Bulletin of the American Meteorological Society','peer_reviewed_research','2024-05-01T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_wlrn','https://www.wlrn.org/light/government-politics/2025-02-21/miami-dades-resilience-department-rebrand-staff-cuts','Miami-Dade resilience department rebrand and staff cuts','WLRN','local_public_media','2025-02-21T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP),
('obs_src_jg_ambassador','https://onebillionresilient.org/2025/11/06/appoint-chief-heat-ambassador/','Climate Resilience Center appoints Jane Gilbert Chief Heat Ambassador','Atlantic Council Climate Resilience Center','organization_release','2025-11-06T00:00:00Z','2026-07-26T00:00:00Z',true,'public',CURRENT_TIMESTAMP),
('obs_src_jg_weather','https://weather.com/news/climate/news/2021-06-01-miami-dade-chief-heat-officer','Miami-Dade appoints first-ever Chief Heat Officer','The Weather Channel','contemporaneous_interview','2021-06-03T00:00:00Z','2026-07-26T00:00:00Z',false,'public',CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO UPDATE SET
"url"=EXCLUDED."url","title"=EXCLUDED."title","publisher"=EXCLUDED."publisher","sourceType"=EXCLUDED."sourceType",
"publishedAt"=EXCLUDED."publishedAt","accessedAt"=EXCLUDED."accessedAt","primarySource"=EXCLUDED."primarySource","publicStatus"='public';

INSERT INTO "ObservatoryClaim"
("id","caseId","claimType","statement","constructId","epistemicStatus","verificationStatus","confidence","permissibleLanguage","contradictionNote","publicStatus","createdAt","updatedAt")
VALUES
('obs_claim_jg_c01',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'county_appointment','Miami-Dade announced Gilbert as its first-ever Interim Chief Heat Officer in April 2021.','role_formation','observed','unreviewed',NULL,'Miami-Dade appointed Jane Gilbert as its inaugural interim Chief Heat Officer in 2021.','Preserve interim status, initial foundation host and county scope.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c02',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'world_first_attributed','Government, program and peer-reviewed sources identify Gilbert as the first person to hold the exact Chief Heat Officer title.','claim_restriction','observed','unreviewed',NULL,'The originating program and multiple institutional sources identify Gilbert’s appointment as the first Chief Heat Officer appointment worldwide.','Highly corroborated but still attributed; no universal title registry excludes obscure prior use.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c03',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'cross_agency_remit','The role coordinated heat-health and economic-risk action across county departments, municipalities and partners.','operating_authority','observed','unreviewed',NULL,'The role coordinated heat-risk strategy across county departments, municipalities and external partners.','Do not attribute all heat activity or outcomes solely to Gilbert.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c04',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'heat_action_plan','The 2022 county plan contains three goals and nineteen actions developed through a multi-stakeholder process.','institution_building','observed','unreviewed',NULL,'Gilbert co-led a participatory process that produced Miami-Dade’s first Extreme Heat Action Plan.','Publication does not establish implementation or effectiveness of every action.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c05',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'evidence_method','Peer-reviewed research documents local vulnerability analysis, time-series analysis and community engagement informing the plan.','evidence_quality','observed','unreviewed',NULL,'The program combined local quantitative analysis and community engagement to inform heat planning.','Method documentation is not a causal estimate of the office’s effect.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c06',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'current_program_claim','The county reports a seasonal protocol and comparatively low recent heat-related emergency-room visit rates.','outcome_evidence','observed','unreviewed',NULL,'Miami-Dade operates a May-to-October heat protocol and reports comparatively low recent heat-related ER-visit rates.','No causal attribution without period, denominator, comparison method and causal design.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c07',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'office_transition','2025 reporting says the standalone role was eliminated and its duties absorbed by the resilience office.','role_transition','observed','unreviewed',NULL,'Miami-Dade folded Chief Heat Officer duties into a reorganized resilience function in 2025.','Does not establish program failure, abandonment or political cause.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c08',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'ambassador_role','The Climate Resilience Center appointed Gilbert Chief Heat Ambassador in November 2025.','role_transition','observed','unreviewed',NULL,'After county service, Gilbert became the Climate Resilience Center’s Chief Heat Ambassador.','The advisory title does not confer public authority over participating cities.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_claim_jg_c09',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'role_diffusion','Sources document later Chief Heat Officer appointments in other jurisdictions.','institutional_diffusion','interpretive','unreviewed',NULL,'The named Chief Heat Officer model spread to other jurisdictions after Miami-Dade.','Diffusion is not proof of direct causation, effectiveness or identical authority.','draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryClaimEvidence"
("id","claimId","sourceId","supportType","exactPassage","locator","analystNote","createdAt")
VALUES
('obs_ev_jg_c01','obs_claim_jg_c01','obs_src_jg_appointment','supports',NULL,'Appointment announcement','Primary government record.',CURRENT_TIMESTAMP),
('obs_ev_jg_c02_p','obs_claim_jg_c02','obs_src_jg_profile','supports',NULL,'Opening profile','County historical claim.',CURRENT_TIMESTAMP),
('obs_ev_jg_c02_b','obs_claim_jg_c02','obs_src_jg_bams','supports',NULL,'Abstract','Peer-reviewed repetition of exact-title firstness.',CURRENT_TIMESTAMP),
('obs_ev_jg_c03','obs_claim_jg_c03','obs_src_jg_appointment','supports',NULL,'Role remit','Cross-agency coordination.',CURRENT_TIMESTAMP),
('obs_ev_jg_c04','obs_claim_jg_c04','obs_src_jg_plan','supports',NULL,'Plan framework','Primary plan.',CURRENT_TIMESTAMP),
('obs_ev_jg_c05','obs_claim_jg_c05','obs_src_jg_bams','supports',NULL,'Abstract and methods','Peer-reviewed method account.',CURRENT_TIMESTAMP),
('obs_ev_jg_c06','obs_claim_jg_c06','obs_src_jg_portal','supports',NULL,'Heat Season and outcomes','Government current claim; causal restriction.',CURRENT_TIMESTAMP),
('obs_ev_jg_c07','obs_claim_jg_c07','obs_src_jg_wlrn','supports',NULL,'Reorganization report','Independent local reporting.',CURRENT_TIMESTAMP),
('obs_ev_jg_c08','obs_claim_jg_c08','obs_src_jg_ambassador','supports',NULL,'Appointment announcement','Organization record.',CURRENT_TIMESTAMP),
('obs_ev_jg_c09','obs_claim_jg_c09','obs_src_jg_wef','supports',NULL,'Two-years-on comparison','Institutional diffusion account.',CURRENT_TIMESTAMP)
ON CONFLICT ("claimId","sourceId","supportType") DO NOTHING;

INSERT INTO "ObservatoryRelationship"
("id","fromCaseId","targetType","targetName","relationshipType","startedAt","endedAt","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_rel_jg_county',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'government','Miami-Dade County','interim_then_chief_heat_officer','2021-04-30T00:00:00Z','2025-06-30T00:00:00Z','unreviewed','draft','obs_src_jg_appointment',NULL,'End date approximate pending personnel confirmation',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jg_foundation',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'organization','The Miami Foundation','initial_role_host',NULL,NULL,'unreviewed','draft','obs_src_jg_appointment',NULL,'Initial appointment structure',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jg_resilient305',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'network','Resilient305','implementation_partner',NULL,NULL,'unreviewed','draft','obs_src_jg_appointment',NULL,'Regional network',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jg_taskforce',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'organization','Climate and Heat Health Task Force','co_lead',NULL,NULL,'unreviewed','draft','obs_src_jg_plan',NULL,'Co-led with Dr Cheryl Holder',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_rel_jg_crc',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'organization','Climate Resilience Center','chief_heat_ambassador','2025-11-06T00:00:00Z',NULL,'unreviewed','draft','obs_src_jg_ambassador',NULL,'Current organization appointment',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryEvent"
("id","caseId","eventType","title","description","occurredAt","precision","verificationStatus","publicStatus","sourceId","exactPassage","sourceLocator","createdAt","updatedAt")
VALUES
('obs_event_jg_appointment',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'appointment','Gilbert appointed interim Chief Heat Officer','County-level appointment; initial role hosted by foundation.','2021-04-30T00:00:00Z','day','unreviewed','draft','obs_src_jg_appointment',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jg_plan',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'plan_publication','Extreme Heat Action Plan launched','Three goals and nineteen actions.','2022-12-14T00:00:00Z','day','unreviewed','draft','obs_src_jg_plan',NULL,'Plan date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jg_bams',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'research_publication','Peer-reviewed program-method article published','Documents preliminary evidence and planning method.','2024-05-01T00:00:00Z','month','unreviewed','draft','obs_src_jg_bams',NULL,'Issue month',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jg_reorg',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'role_reorganization','Standalone county role folded into resilience function','Duties retained in reorganized office.','2025-02-21T00:00:00Z','day','unreviewed','draft','obs_src_jg_wlrn',NULL,'Report date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('obs_event_jg_ambassador',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'appointment','Chief Heat Ambassador appointment','Post-county advisory role.','2025-11-06T00:00:00Z','day','unreviewed','draft','obs_src_jg_ambassador',NULL,'Announcement date',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "ObservatoryReviewPackage"
("id","packageId","caseId","version","dossierPath","contentHash","manifest","evidenceCoverage","status","createdAt","updatedAt")
VALUES
('obs_package_jane_gilbert_100','jane-gilbert-1.0.0',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'1.0.0',
'research/observatory/dossiers/jane-gilbert-1.0.0.md','pending-runtime-content-hash',
'{"claimIds":["obs_claim_jg_c01","obs_claim_jg_c02","obs_claim_jg_c03","obs_claim_jg_c04","obs_claim_jg_c05","obs_claim_jg_c06","obs_claim_jg_c07","obs_claim_jg_c08","obs_claim_jg_c09"],"relationshipIds":["obs_rel_jg_county","obs_rel_jg_foundation","obs_rel_jg_resilient305","obs_rel_jg_taskforce","obs_rel_jg_crc"],"eventIds":["obs_event_jg_appointment","obs_event_jg_plan","obs_event_jg_bams","obs_event_jg_reorg","obs_event_jg_ambassador"],"observationIds":[],"limitations":["saturation_decision_not_yet_recorded","world_first_requires_attribution","interim_to_permanent_chronology_incomplete","county_personnel_end_date_approximate","outcome_claims_not_causally_identified","plan_actions_not_all_verified_implemented","role_diffusion_not_causal","psychological_attributes_unmeasured","interpretive_synthesis_excluded_from_auto_publication"]}'::jsonb,
0.82,'draft',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
ON CONFLICT ("packageId") DO NOTHING;

INSERT INTO "ObservatoryAuditEvent"
("id","caseId","actorUserId","actorEmail","action","entityType","entityId","afterValue","note","createdAt")
VALUES
('obs_audit_jane_package_100',(SELECT "id" FROM "ObservatoryCase" WHERE "slug"='jane-gilbert'),'system:versioned-import','system@institutions-of-one.local',
'import_review_package','review_package','obs_package_jane_gilbert_100',
'{"packageId":"jane-gilbert-1.0.0","sourcesAdded":9,"claimsAdded":9,"relationshipsAdded":5,"eventsAdded":5,"publication":"draft","saturation":"incomplete"}'::jsonb,
'Draft package separates the exact-title firstness claim, county appointment, collective program method, outcome claims, office reorganization and post-county ambassador role.',
CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
