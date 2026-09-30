import { buildContent, type Content } from "./shape";
import type { BlogArticle, RemoteImage, VrsCompany } from "./imageShape";
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
/** Placeholder in level-2 content replaced with the product's brand name. */
const PRODUCT_NAME_PLACEHOLDER = "[Product Name]";

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

/** A single SKU card for a level-2 product page. */
export type GiftCardSku = {
  brandName: string;
  image: string;
  sku: string;
  alt: string;
};

/** Level-2 content plus the heading for its "more gift cards" section. */
export type GiftCardProductPage = {
  content: Content;
  moreGamesHeading: string;
};

/** Product-list-derived data for a level-2 page: this product's SKU cards and
 * the "more gift cards" carousel. */
export type GiftCardProductExtras = {
  skus: GiftCardSku[];
  moreProducts: GiftCardProduct[];
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

/** Path to a gift-card level-2 product page for a lang-country. */
export function giftCardProductPath(hrefCode: string, slug: string): string {
  return `${giftCardPath(hrefCode)}/${slug}`;
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
 * Localized level-2 gift-card product content for a display-on entry, or null
 * when the lang-country has no content for this product yet (the file exists
 * but is empty / invalid). Callers should treat null as a 404. Also returns the
 * "more gift cards" section heading, which buildContent does not carry.
 */
export async function getGiftCardProductContent(
  entry: LangCountryEntry,
  slug: string,
  productName: string,
): Promise<GiftCardProductPage | null> {
  const code = entry["href-code"].toLowerCase();
  const url = `${GIFT_CARD_PAGES_BASE}/${code}/level-2/${slug}.json`;
  const bustUrl = `${url}?t=${Date.now()}`;
  const res = await fetch(bustUrl, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
  if (!res.ok) return null;

  const text = await res.text();
  if (!text.trim()) return null;

  let entries: ContentEntry[];
  try {
    entries = JSON.parse(text) as ContentEntry[];
  } catch {
    return null;
  }
  if (!Array.isArray(entries) || entries.length === 0) return null;

  const fill = (t: string) => t.split(PRODUCT_NAME_PLACEHOLDER).join(productName);
  const map = new Map(entries.map((e) => [e.variable, fill(e.text)]));
  return {
    content: buildContent(code, map),
    moreGamesHeading: map.get("more-games-heading") ?? "",
  };
}

/**
 * The SKU cards for a product plus its "more gift cards" carousel. The carousel
 * is the next `moreCount` display-on products after the focus product in list
 * order, wrapping around to the top of the list when needed.
 */
export async function getGiftCardProductExtras(
  slug: string,
  moreCount = PRODUCT_LIMIT,
): Promise<GiftCardProductExtras> {
  const all = await fetchJson<RawGiftCardProduct[]>(PRODUCT_LIST_URL);
  const visible = all.filter(
    (p) => (p["display-status"] ?? "").toLowerCase() === DISPLAY_ON,
  );

  const focus = visible.find((p) => p.slug === slug);
  const skus: GiftCardSku[] = focus
    ? focus.skus.map((sku) => ({
        brandName: focus["brand-name"],
        image: `${PRODUCT_IMAGE_BASE}/${focus["image-name"]}`,
        sku,
        alt: `${focus["brand-name"]} Gift Card ${sku} icon`,
      }))
    : [];

  const moreProducts: GiftCardProduct[] = [];
  const focusIndex = visible.findIndex((p) => p.slug === slug);
  if (focusIndex !== -1) {
    for (let i = 1; i <= moreCount; i++) {
      const p = visible[(focusIndex + i) % visible.length];
      if (p.slug === slug) break; // list shorter than moreCount; avoid the focus
      moreProducts.push({
        brandName: p["brand-name"],
        slug: p.slug,
        image: `${PRODUCT_IMAGE_BASE}/${p["image-name"]}`,
        alt: `${p["brand-name"]} Gift Card icon`,
      });
    }
  }

  return { skus, moreProducts };
}

/**
 * Resolves the given product slugs to their artwork, in the order requested.
 * Used for the level-1 CTA / GetStarted images. Alt text is "[brand-name] Game
 * icon". Unknown slugs yield empty src/alt.
 */
export async function getGiftCardImagesBySlugs(
  slugs: string[],
): Promise<RemoteImage[]> {
  const all = await fetchJson<RawGiftCardProduct[]>(PRODUCT_LIST_URL);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return slugs.map((slug) => {
    const p = bySlug.get(slug);
    return {
      src: p ? `${PRODUCT_IMAGE_BASE}/${p["image-name"]}` : "",
      alt: p ? `${p["brand-name"]} Game icon` : "",
    };
  });
}

/**
 * Maps each display-on product slug to its brand name (every product, not just
 * popular). Used to validate level-2 slugs and to fill the "[Product Name]"
 * placeholder in level-2 content.
 */
export async function getGiftCardProductNames(): Promise<Map<string, string>> {
  const all = await fetchJson<RawGiftCardProduct[]>(PRODUCT_LIST_URL);
  return new Map(
    all
      .filter((p) => (p["display-status"] ?? "").toLowerCase() === DISPLAY_ON)
      .map((p) => [p.slug, p["brand-name"]]),
  );
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
 * Country-dropdown options built from display-on entries: en-us first, the rest
 * in alphabetical order by href-code. `hrefFor` maps each entry to its target
 * page (level-1 home or a level-2 product page).
 */
async function buildGiftCardCountries(
  hrefFor: (hrefCode: string) => string,
): Promise<GiftCardCountry[]> {
  const visible = await getGiftCardLangCountries();
  return visible
    .map((e) => {
      const hrefCode = e["href-code"].toLowerCase();
      return {
        hrefCode,
        country: e.country.toLowerCase(),
        flagUrl: flagUrl(e.country),
        href: hrefFor(hrefCode),
        isHome: hrefCode === HOME_HREF_CODE,
      };
    })
    .sort((a, b) => {
      if (a.hrefCode === HOME_HREF_CODE) return -1;
      if (b.hrefCode === HOME_HREF_CODE) return 1;
      return a.hrefCode.localeCompare(b.hrefCode);
    });
}

/** Country-dropdown options linking to each entry's level-1 gift-card page. */
export function getGiftCardCountries(): Promise<GiftCardCountry[]> {
  return buildGiftCardCountries(giftCardPath);
}

/**
 * Country-dropdown options linking to each entry's level-2 page for the given
 * product slug.
 */
export function getGiftCardProductCountries(
  slug: string,
): Promise<GiftCardCountry[]> {
  return buildGiftCardCountries((hrefCode) =>
    giftCardProductPath(hrefCode, slug),
  );
}
