// OWNED → Ownership Graph fusion.
//
// The reflexive core of the platform: when a creator actually OWNS more of their
// business through OWNED (their own page, their own domain, their own audience
// capture), that is not a self-reported claim — it is an observable fact the
// system can see. So OWNED activity writes AUTO-VERIFIED (0.8-tier) evidence into
// the graph, on the same predicates the self-report assessment feeds. Verified
// evidence outranks self-report, so building on OWNED literally raises the score.
//
// This module is pure: it derives the fact list from page state. Persistence
// (writing Fact rows, superseding prior evidence) is done by the API route.

import { EVIDENCE_TIER, type ItemId } from "./engine";

export interface OwnedLinkInput {
  kind: string;    // link | newsletter | membership | shop | social
  owned: boolean;  // destination the creator owns
  url: string;
}

export interface OwnedState {
  published: boolean;
  customDomain?: string | null;
  emailCapture: boolean;
  links: OwnedLinkInput[];
}

export interface DerivedFact {
  predicate: ItemId;   // maps onto a scored item the graph already understands
  value: number;       // 0..5, the evidence-implied level for that item
  source: string;      // provenance string stored on the Fact
  note: string;        // human-readable why (for the creator + audit trail)
}

// The mapping. Each rule fires only when OWNED shows the thing is real, and emits
// evidence at the 0.8 (auto-verified) tier. Values are conservative floors: OWNED
// proves a minimum, never the maximum, so we never overwrite a higher self-report.
export function deriveFacts(state: OwnedState): DerivedFact[] {
  const facts: DerivedFact[] = [];
  const src = "owned:platform";
  if (!state.published) return facts; // nothing is verified until the page is live

  // A1 — owned audience destination exists (newsletter/membership/community link live).
  const ownedAudience = state.links.some(
    (l) => l.owned && (l.kind === "newsletter" || l.kind === "membership"),
  );
  if (ownedAudience) {
    facts.push({
      predicate: "A1",
      value: 3,
      source: src,
      note: "Owned audience destination (newsletter/membership) is live on your OWNED page.",
    });
  }

  // A2 — direct email capture on a property the creator controls.
  if (state.emailCapture) {
    facts.push({
      predicate: "A2",
      value: 3,
      source: src,
      note: "Email capture is enabled on your OWNED page — you collect the relationship directly.",
    });
  }

  // B1 — business infrastructure: a home base the creator publishes and controls.
  facts.push({
    predicate: "B1",
    value: 3,
    source: src,
    note: "You publish a home base you control, not a profile you rent.",
  });

  // B2 — owns the domain the audience arrives through.
  if (state.customDomain) {
    facts.push({
      predicate: "B2",
      value: 4,
      source: src,
      note: `You serve your page on your own domain (${state.customDomain}).`,
    });
  }

  // V1 — a revenue destination the creator owns (shop/membership), not a marketplace.
  const ownedRevenue = state.links.some(
    (l) => l.owned && (l.kind === "shop" || l.kind === "membership"),
  );
  if (ownedRevenue) {
    facts.push({
      predicate: "V1",
      value: 3,
      source: src,
      note: "You route revenue through a destination you own.",
    });
  }

  return facts;
}

export const OWNED_FACT_TIER = EVIDENCE_TIER.auto; // 0.8

// A friendly summary of the score impact, for the editor UI: "Publishing lifts
// your verified evidence on Audience, Revenue and Business Infrastructure."
export function fusionSummary(state: OwnedState): string[] {
  const facts = deriveFacts({ ...state, published: true });
  const dims = new Set(
    facts.map((f) =>
      f.predicate[0] === "A" ? "Audience Ownership"
      : f.predicate[0] === "V" ? "Revenue Ownership"
      : f.predicate[0] === "B" ? "Business Infrastructure"
      : "Ownership",
    ),
  );
  return [...dims];
}
