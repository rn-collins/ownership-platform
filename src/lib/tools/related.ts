// The related-tools rail for one tool: only approved relations whose other end is in the family index (the kit's selectRelated).
import { selectRelated } from "@/components/tools/_kit/core/related.mjs";
import type { RelatedItem } from "@/components/tools/_kit/types.d.mts";
import relations from "./relations.json";
import familyIndex from "./family-index.json";

export function relatedFor(toolId: string): RelatedItem[] {
  return selectRelated({ relations: relations.relations, familyIndex, toolId }).items as RelatedItem[];
}
