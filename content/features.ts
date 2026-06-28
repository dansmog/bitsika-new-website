import { GAME_HOMEPAGE_BASE } from "./sources";
import { pathForLocale } from "./seo";

const FEATURE_LIST_URL = `${GAME_HOMEPAGE_BASE}/general-tools/feature-list.json`;
const FALLBACK_LANGUAGE = "en";

/**
 * Route segment each feature links to, relative to the locale. `top-ups` maps
 * to the locale home (empty segment). Keys not listed here are not yet
 * linkable and render as plain text.
 */
const FEATURE_SLUGS: Partial<Record<FeatureNavKey, string>> = {
  "top-ups": "",
  "gift-cards": "gift-card",
};

/**
 * Returns the href for a feature in the given locale, or `null` when the
 * feature isn't linkable yet. Shared by the header nav and the footer so they
 * stay in sync.
 */
export function featureHref(
  key: FeatureNavKey,
  language: string,
  country: string,
): string | null {
  const slug = FEATURE_SLUGS[key];
  if (slug === undefined) return null;
  return pathForLocale(language, country, slug || undefined);
}

/**
 * A nav item key — a property name from a feature-list entry (e.g. "top-ups",
 * "gift-cards"). Which items appear and their order are driven by the JSON on
 * GitHub, not by the app, so the nav can be edited there.
 */
export type FeatureNavKey = string;

/** A single language object from the feature list. */
type FeatureListEntry = { lang: string } & Record<string, string>;

export type FeatureNavItem = {
  key: FeatureNavKey;
  label: string;
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

/**
 * Returns the localized feature-nav items for the given language, matched by
 * language only (not country). Falls back to English when the language is
 * missing from the list, and returns an empty array if the list can't load.
 */
export async function getFeatureNav(language: string): Promise<FeatureNavItem[]> {
  let entries: FeatureListEntry[];
  try {
    entries = await fetchJson<FeatureListEntry[]>(FEATURE_LIST_URL);
  } catch {
    return [];
  }

  const lang = language.toLowerCase();
  const entry =
    entries.find((e) => e.lang?.toLowerCase() === lang) ??
    entries.find((e) => e.lang?.toLowerCase() === FALLBACK_LANGUAGE);
  if (!entry) return [];

  // The JSON drives the nav: every key except `lang` (with a non-empty label)
  // becomes an item, in the order it appears in the entry.
  return Object.entries(entry)
    .filter(([key, label]) => key !== "lang" && Boolean(label))
    .map(([key, label]) => ({ key, label }));
}
