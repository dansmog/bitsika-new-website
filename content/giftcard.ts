import { buildContent, type Content } from "./shape";
import type { BlogArticle, VrsCompany } from "./imageShape";
import { GAME_HOMEPAGE_BASE } from "./sources";

const LANG_COUNTRY_LIST_URL = `${GAME_HOMEPAGE_BASE}/general-tools/lang-country-list.json`;
const FLAG_BASE = `${GAME_HOMEPAGE_BASE}/general-tools/country-flags`;
const GIFT_CARD_PAGES_BASE = `${GAME_HOMEPAGE_BASE}/gift-card-pages/pages-by-lang-country`;
const PRODUCT_LIST_URL = `${GAME_HOMEPAGE_BASE}/gift-card-pages/tools/gift-card-product-list.json`;
const PRODUCT_IMAGE_BASE = `${GAME_HOMEPAGE_BASE}/gift-card-pages/tools/gift-card-images`;
const SECONDARY_CONTENT_URL = `${GAME_HOMEPAGE_BASE}/gift-card-pages/secondary-content/secondary-content.json`;
const SECONDARY_IMAGE_BASE = `${GAME_HOMEPAGE_BASE}/gift-card-pages/secondary-content/images`;

const HOME_HREF_CODE = "en-us";
const DISPLAY_STATUS_KEY = "gift-card-display-status";
const DISPLAY_ON = "on";
const PRODUCT_LIMIT = 20;
const VRS_COUNT = 8;
const BLOG_COUNT = 6;

/** A single entry from general-tools/lang-country-list.json. */
export type LangCountryEntry = {
  "href-code": string;
  lang: string;
  country: string;
  "country-english": string;
  "lang-english": string;
  "country-endo": string;
  "lang-endo": string;
  "payment-methods": string;
  "gift-card-display-status": string;
};

/** Resolved option used by the gift-card country dropdown. */
export type GiftCardCountry = {
  hrefCode: string;
  country: string;
  flagUrl: string;
  href: string;
  isHome: boolean;
};

type ContentEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
};

/** A raw entry from gift-card-pages/tools/gift-card-product-list.json. */
type RawGiftCardProduct = {
  "brand-name": string;
  slug: string;
  "image-name": string;
  position: number;
  popular: string;
  "display-status": string;
  skus: string[];
};

/** A gift-card product card (no in-game currency on these pages). */
export type GiftCardProduct = {
  brandName: string;
  slug: string;
  image: string;
  alt: string;
};

/** Secondary content shared by the competitor and blog sections. */
export type GiftCardSecondary = {
  vrs: VrsCompany[];
  blogs: BlogArticle[];
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

/** Path to a gift-card level-1 page: en-us is bare, others are prefixed. */
export function giftCardPath(hrefCode: string): string {
  return hrefCode === HOME_HREF_CODE ? "/gift-card" : `/${hrefCode}/gift-card`;
}

/** Flag image URL for a lang-country entry, keyed by its country code. */
export function flagUrl(country: string): string {
  return `${FLAG_BASE}/${country.toLowerCase()}.svg`;
}

function isDisplayOn(entry: LangCountryEntry): boolean {
  return (entry[DISPLAY_STATUS_KEY] ?? "").toLowerCase() === DISPLAY_ON;
}

/** All lang-country entries whose gift-card display status is on. */
export async function getGiftCardLangCountries(): Promise<LangCountryEntry[]> {
  const all = await fetchJson<LangCountryEntry[]>(LANG_COUNTRY_LIST_URL);
  return all.filter(isDisplayOn);
}

/**
 * The display-on entry for a lang-country, or null when the entry is missing
 * or its display status is off (callers should treat null as a 404).
 */
export async function getGiftCardEntry(
  language: string,
  country: string,
): Promise<LangCountryEntry | null> {
  const code = `${language}-${country}`.toLowerCase();
  const visible = await getGiftCardLangCountries();
  return (
    visible.find((e) => e["href-code"].toLowerCase() === code) ?? null
  );
}

/** Localized level-1 gift-card content for a display-on entry. */
export async function getGiftCardContent(
  entry: LangCountryEntry,
): Promise<Content> {
  const code = entry["href-code"].toLowerCase();
  const entries = await fetchJson<ContentEntry[]>(
    `${GIFT_CARD_PAGES_BASE}/${code}/level-1/main-content.json`,
  );
  const map = new Map(entries.map((e) => [e.variable, e.text]));
  return buildContent(code, map);
}

/**
 * Popular, display-on gift-card products, ordered by increasing position and
 * capped at 20. Image alt text is "[brand-name] Gift Card icon".
 */
export async function getGiftCardProducts(): Promise<GiftCardProduct[]> {
  const all = await fetchJson<RawGiftCardProduct[]>(PRODUCT_LIST_URL);
  return all
    .filter(
      (p) =>
        (p.popular ?? "").toLowerCase() === "yes" &&
        (p["display-status"] ?? "").toLowerCase() === DISPLAY_ON,
    )
    .sort((a, b) => a.position - b.position)
    .slice(0, PRODUCT_LIMIT)
    .map((p) => ({
      brandName: p["brand-name"],
      slug: p.slug,
      image: `${PRODUCT_IMAGE_BASE}/${p["image-name"]}`,
      alt: `${p["brand-name"]} Gift Card icon`,
    }));
}

/**
 * Secondary content (competitor "vrs" companies and blog articles) used by the
 * BuiltDifferent and InsideBitsika sections. Images and alt text come straight
 * from the JSON; on gift-card pages the competitors are not linked anywhere.
 */
export async function getGiftCardSecondary(): Promise<GiftCardSecondary> {
  const entries = await fetchJson<ContentEntry[]>(SECONDARY_CONTENT_URL);
  const map = new Map(entries.map((e) => [e.variable, e.text]));
  const get = (key: string) => map.get(key) ?? "";
  const toSrc = (base: string, file: string) => (file ? `${base}/${file}` : "");

  const vrs: VrsCompany[] = Array.from({ length: VRS_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      name: get(`vrs-company-name-${n}`),
      slug: get(`vrs-company-slug-${n}`),
      anchor: get(`vrs-company-anchor-${n}`),
      image: {
        src: toSrc(SECONDARY_IMAGE_BASE, get(`vrs-company-image-${n}`)),
        alt: get(`vrs-company-alt-text-${n}`),
      },
    };
  }).filter((c) => c.name);

  const blogs: BlogArticle[] = Array.from({ length: BLOG_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      title: get(`blog-text-${n}`),
      image: {
        src: toSrc(SECONDARY_IMAGE_BASE, get(`blog-image-${n}`)),
        alt: get(`blog-alt-text-${n}`),
      },
    };
  }).filter((b) => b.title);

  return { vrs, blogs };
}

/**
 * Country-dropdown options for the gift-card pages: display-on entries only,
 * en-us first, the rest in alphabetical order by href-code.
 */
export async function getGiftCardCountries(): Promise<GiftCardCountry[]> {
  const visible = await getGiftCardLangCountries();
  return visible
    .map((e) => {
      const hrefCode = e["href-code"].toLowerCase();
      return {
        hrefCode,
        country: e.country.toLowerCase(),
        flagUrl: flagUrl(e.country),
        href: giftCardPath(hrefCode),
        isHome: hrefCode === HOME_HREF_CODE,
      };
    })
    .sort((a, b) => {
      if (a.hrefCode === HOME_HREF_CODE) return -1;
      if (b.hrefCode === HOME_HREF_CODE) return 1;
      return a.hrefCode.localeCompare(b.hrefCode);
    });
}
