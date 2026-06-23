import { GAME_HOMEPAGE_BASE } from "./sources";

const FEATURE_LIST_URL = `${GAME_HOMEPAGE_BASE}/general-tools/feature-list.json`;
const FALLBACK_LANGUAGE = "en";

/** Keys to render, in display order. `top-ups` is the only clickable one. */
export const FEATURE_NAV_KEYS = [
  "gta-6",
  "game-discussions",
  "top-ups",
  "gift-cards",
  "features",
] as const;

export type FeatureNavKey = (typeof FEATURE_NAV_KEYS)[number];

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

  return FEATURE_NAV_KEYS.filter((key) => entry[key]).map((key) => ({
    key,
    label: entry[key],
  }));
}
