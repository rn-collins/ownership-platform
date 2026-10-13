export declare const RELEASE_TIMEZONE: string;
export declare function todayInHawaii(now?: Date): string;
export declare function isIsoDate(s: string | undefined): boolean;
export declare function isReleasedRecord(record: { releasedAt: string; hold: boolean } | undefined, today: string): boolean;
export declare function reviewRenderFor(env: Record<string, string | undefined>): boolean;
export declare function publicIds(
  releases: { pieces: { id: string; releasedAt: string; hold: boolean }[]; related: { id: string; releasedAt: string; hold: boolean }[] },
  today: string,
  review?: boolean,
): string[];
