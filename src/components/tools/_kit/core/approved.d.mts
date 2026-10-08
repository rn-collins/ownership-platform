import type { ToolSpec } from '../types.d.mts';
export function isApproved(x: unknown): boolean;
export function filterApproved(spec: ToolSpec): ToolSpec;
export function collectNeedsRn(spec: ToolSpec, label?: string): { tool: string; path: string; id: string; text: string; why: string }[];
