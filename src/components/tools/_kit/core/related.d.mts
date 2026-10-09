import type { RelatedItem } from '../types.d.mts';
export interface Relation { a: string; b: string; kind: string; strength: 'hard' | 'soft'; reasonA: string; reasonB: string; status: 'approved' | 'needs-rn'; checked?: string; approvedOn?: string }
export interface FamilyIndex { schema: 'family-index/1'; tools: { id: string; title: string; url: string; site: string; siteName: string; built?: boolean; existing?: boolean }[] }
export function selectRelated(o: { relations: Relation[]; familyIndex: FamilyIndex; toolId: string }): { items: RelatedItem[]; waiting: Relation[]; skipped: Relation[] };
export function validateRelations(relations: Relation[], familyIndex: FamilyIndex): string[];
