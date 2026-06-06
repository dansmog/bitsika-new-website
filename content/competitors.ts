import { buildContent, type Content } from "./shape";
import { GAME_HOMEPAGE_BASE } from "./sources";

const LIST_URL = `${GAME_HOMEPAGE_BASE}/competitor-pages/lists/all-level-1-pages.json`;
const SLUG_SUFFIX = "-alternative";

export type CompetitorPageEntry = {
  competitor: string;
  locale: string;
  path: string;
};

type ContentEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
};

async function fetchJson<T>(url: string): Promise<T> {
  const bustUrl = `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await fetch(bustUrl, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
  if (!res.ok) {
    throw new Error(`Failed to load ${url} (${res.status})`);
  }
  return (await res.json()) as T;
}

function localeOf(language: string, country: string): string {
  return `${language}-${country}`.toLowerCase();
}

export async function getCompetitorPages(): Promise<CompetitorPageEntry[]> {
  return fetchJson<CompetitorPageEntry[]>(LIST_URL);
}

/**
 * Maps a route segment like `codashop-alternative` back to its competitor
 * slug (`codashop`). Returns null when the segment is not a competitor slug.
 */
export function competitorSlugFromRoute(segment: string): string | null {
  if (!segment.endsWith(SLUG_SUFFIX)) return null;
  const slug = segment.slice(0, -SLUG_SUFFIX.length);
  return slug || null;
}

/** Competitor slugs that have a page for the given lang-country. */
export async function getCompetitorSlugsForLocale(
  language: string,
  country: string,
): Promise<Set<string>> {
  const locale = localeOf(language, country);
  const pages = await getCompetitorPages();
  return new Set(
    pages.filter((p) => p.locale.toLowerCase() === locale).map((p) => p.competitor),
  );
}

export async function getCompetitorPageEntry(
  competitor: string,
  language: string,
  country: string,
): Promise<CompetitorPageEntry | null> {
  const locale = localeOf(language, country);
  const pages = await getCompetitorPages();
  return (
    pages.find(
      (p) =>
        p.competitor.toLowerCase() === competitor.toLowerCase() &&
        p.locale.toLowerCase() === locale,
    ) ?? null
  );
}

export async function getCompetitorContent(
  entry: CompetitorPageEntry,
): Promise<Content> {
  const entries = await fetchJson<ContentEntry[]>(
    `${GAME_HOMEPAGE_BASE}/${entry.path}`,
  );
  const map = new Map(entries.map((e) => [e.variable, e.text]));
  return buildContent(entry.locale, map);
}
