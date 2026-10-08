// The one registry file for the tools on this site. Add one import pair and one line in `tools` for each new tool.
// Every tool here has release "review": not in the sitemap, not in the site menu, reachable by address and from the /tools page, which is noindex too.
import type { ComponentType } from "react";
import type { ToolProps, ToolSpec } from "@/components/tools/_kit/types.d.mts";
import m1Spec from "@/components/tools/ed001-map/spec.json";
import FourQuestionsMap from "@/components/tools/ed001-map/Tool.mjs";
import m2Spec from "@/components/tools/ed002-ranker/spec.json";
import DependencyRanker from "@/components/tools/ed002-ranker/Tool.mjs";
import x3Spec from "@/components/tools/framework-strip/spec.json";
import StripPage from "@/components/tools/framework-strip/StripPage.mjs";

export interface RegisteredTool {
  id: string;
  slug: string;
  /** "tool" is a page of its own with a worksheet; "section" is a part of another page, shown here on its own for review. */
  kind: "tool" | "section";
  spec: ToolSpec;
  Tool: ComponentType<ToolProps>;
}

export const tools: RegisteredTool[] = [
  { id: "m1-four-questions-map", slug: "four-questions-map", kind: "tool", spec: m1Spec as unknown as ToolSpec, Tool: FourQuestionsMap },
  { id: "m2-dependency-ranker", slug: "dependency-ranker", kind: "tool", spec: m2Spec as unknown as ToolSpec, Tool: DependencyRanker },
  { id: "x3-framework-strip", slug: "framework-strip", kind: "section", spec: x3Spec as unknown as ToolSpec, Tool: StripPage },
];

export const bySlug = (slug: string) => tools.find((t) => t.slug === slug);
