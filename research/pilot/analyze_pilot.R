#!/usr/bin/env Rscript
# Institutions of One candidate pilot analysis.
# Run only against a frozen, preregistered candidate dataset.
# This script does not calculate or activate individual scores.

required <- c("jsonlite", "readr", "dplyr", "tidyr", "psych", "lavaan", "semTools")
missing_packages <- required[!vapply(required, requireNamespace, logical(1), quietly = TRUE)]
if (length(missing_packages)) stop("Install required packages: ", paste(missing_packages, collapse = ", "))

args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 3) stop("Usage: analyze_pilot.R responses.csv preregistration.json output_directory")
input_path <- args[[1]]
registration_path <- args[[2]]
output_dir <- args[[3]]
dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)

registration <- jsonlite::read_json(registration_path, simplifyVector = TRUE)
required_registration <- c("instrument", "candidate_version", "registered_at", "item_ids", "models", "missing_data", "fairness_groups")
if (!all(required_registration %in% names(registration))) stop("Preregistration record is incomplete")
if (!grepl("-candidate\\.", registration$candidate_version)) stop("A frozen candidate version is required")

data <- readr::read_csv(input_path, show_col_types = FALSE)
missing_items <- setdiff(registration$item_ids, names(data))
if (length(missing_items)) stop("Missing preregistered item columns: ", paste(missing_items, collapse = ", "))
items <- dplyr::select(data, dplyr::all_of(registration$item_ids))

# Preserve distinct missing states in source data. Analysis copy converts only
# preregistered numeric response codes; NA, DK, and NAP are reported separately.
missing_report <- items |>
  tidyr::pivot_longer(dplyr::everything(), names_to = "item_id", values_to = "response") |>
  dplyr::mutate(state = dplyr::case_when(is.na(response) ~ "omitted", response == "DK" ~ "do_not_know", response == "NAP" ~ "not_applicable", TRUE ~ "observed")) |>
  dplyr::count(item_id, state, name = "n") |>
  dplyr::group_by(item_id) |>
  dplyr::mutate(proportion = n / sum(n)) |>
  dplyr::ungroup()
readr::write_csv(missing_report, file.path(output_dir, "missingness.csv"))

numeric_items <- dplyr::mutate(items, dplyr::across(dplyr::everything(), ~ suppressWarnings(as.numeric(.x))))
item_distributions <- numeric_items |>
  tidyr::pivot_longer(dplyr::everything(), names_to = "item_id", values_to = "response") |>
  dplyr::filter(!is.na(response)) |>
  dplyr::count(item_id, response, name = "n") |>
  dplyr::group_by(item_id) |>
  dplyr::mutate(proportion = n / sum(n)) |>
  dplyr::ungroup()
readr::write_csv(item_distributions, file.path(output_dir, "item_distributions.csv"))

complete_for_correlation <- numeric_items[rowSums(!is.na(numeric_items)) >= registration$missing_data$minimum_answered_items, , drop = FALSE]
poly <- psych::polychoric(complete_for_correlation, correct = 0)
readr::write_csv(as.data.frame(poly$rho), file.path(output_dir, "polychoric_correlations.csv"))

fit_rows <- list()
for (model_name in names(registration$models)) {
  syntax <- registration$models[[model_name]]
  fit <- lavaan::cfa(syntax, data = numeric_items, ordered = registration$item_ids, estimator = "WLSMV", missing = "pairwise")
  measures <- lavaan::fitMeasures(fit, c("chisq", "df", "cfi", "tli", "rmsea", "srmr"))
  fit_rows[[model_name]] <- data.frame(model = model_name, metric = names(measures), value = as.numeric(measures))
  reliability <- semTools::compRelSEM(fit)
  readr::write_csv(data.frame(scale = names(reliability), reliability = as.numeric(reliability)), file.path(output_dir, paste0("reliability_", model_name, ".csv")))
  capture.output(summary(fit, fit.measures = TRUE, standardized = TRUE), file = file.path(output_dir, paste0("cfa_", model_name, ".txt")))
}
readr::write_csv(dplyr::bind_rows(fit_rows), file.path(output_dir, "model_fit.csv"))

# DIF/fairness analyses are deliberately gated by the preregistered group and
# minimum cell-size rules. Underpowered comparisons remain recorded as gaps.
fairness <- lapply(registration$fairness_groups, function(group) {
  if (!group %in% names(data)) return(data.frame(group = group, status = "missing_variable"))
  counts <- table(data[[group]], useNA = "no")
  if (length(counts) < 2 || any(counts < registration$minimum_group_n)) return(data.frame(group = group, status = "insufficient_sample"))
  data.frame(group = group, status = "eligible_for_preregistered_DIF_method")
})
readr::write_csv(dplyr::bind_rows(fairness), file.path(output_dir, "fairness_availability.csv"))

manifest <- list(
  instrument = registration$instrument,
  candidate_version = registration$candidate_version,
  registered_at = registration$registered_at,
  analyzed_at = format(Sys.time(), tz = "UTC", usetz = TRUE),
  rows_received = nrow(data),
  scoring_activated = FALSE,
  interpretation = "Instrument-development evidence only; activation requires a separate dated decision."
)
jsonlite::write_json(manifest, file.path(output_dir, "analysis_manifest.json"), auto_unbox = TRUE, pretty = TRUE)
