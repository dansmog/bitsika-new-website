import { cache } from "react";
import { buildContent, type Content } from "./shape";
import { GAME_HOMEPAGE_BASE } from "./sources";

/**
 * Data layer for the "refocus" content tree — the language-only rebuild of the
 * site. Gift-card and top-up pages are the same page four times over (two
 * features × two levels), so everything here is parameterised by `kind`.
 *
 * The key property of this tree is that its page JSON uses exactly the same
 * variable names for every kind and level, so `buildContent()` in shape.ts
 * consumes all of it unchanged.
 */

const REFOCUS_BASE = `${GAME_HOMEPAGE_BASE}/refocus-pages`;
const GENERAL_TOOLS_BASE = `${REFOCUS_BASE}/general-tools`;
const LANG_LIST_URL = `${GENERAL_TOOLS_BASE}/lang-list.json`;

/** The language served without a path prefix. */
export const HOME_LANGUAGE = "en";
/** Suffix marking a non-home language segment, e.g. `es-lang`. */
const LANG_SUFFIX = "-lang";
const DISPLAY_ON = "on";

/** The two page families. */
export type ProductKind = "gift-card" | "top-up";

/** Route segment that roots the top-up section. Gift cards sit at the root. */
export const TOP_UP_SEGMENT = "top-up-with-crypto";

const KIND_CONFIG = {
  "gift-card": {
    base: `${REFOCUS_BASE}/gift-card-pages`,
    altSuffix: "gift card image",
  },
  "top-up": {
    base: `${REFOCUS_BASE}/top-up-pages`,
    altSuffix: "top up image",
  },
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A raw entry from general-tools/lang-list.json. */
export type RefocusLanguage = {
  "href-code": string;
  lang: string;
  "lang-english": string;
  "lang-endo": string;
  "display-status": string;
};

/** A gift-card entry from gift-card-pages/tools/product-list.json. */
type RawGiftCardProduct = {
  "brand-name": string;
  slug: string;
  "image-name": string;
  "display-status": string;
  skus: string[];
};

/**
 * A top-up entry from top-up-pages/tools/product-list.json. Note the different
 * shape: `brand_name` with an underscore, no `image-name` (artwork is named
 * after the slug) and no `display-status` (every entry is shown).
 */
type RawTopUpProduct = {
  brand_name: string;
  slug: string;
  "product-currency": string;
  skus: string[];
};

/** An image with its alt text. */
export type RemoteImage = {
  src: string;
  alt: string;
};

/** A product card. `currency` is the in-game currency line — top-ups only. */
export type RefocusProduct = {
  brandName: string;
  slug: string;
  image: string;
  alt: string;
  currency?: string;
};

/** A single SKU card on a level-2 page. */
export type RefocusSku = {
  brandName: string;
  image: string;
  sku: string;
  alt: string;
};

/** Level-2 page copy plus the heading for its "more products" section. */
export type RefocusLevel2 = {
  content: Content;
  moreGamesHeading: string;
};

/** One option in the header language dropdown. */
export type LanguageOption = {
  /** Bare language code, e.g. "en". */
  code: string;
  /** English name of the language, used as the link title. */
  name: string;
  /** Endonym, e.g. "Español". */
  endonym: string;
  href: string;
  isHome: boolean;
};

type ContentEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
};

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

export function isHomeLanguage(language: string): boolean {
  return language.toLowerCase() === HOME_LANGUAGE;
}

/** Builds a path under a language prefix. English carries no prefix. */
function withLang(language: string, ...segments: string[]): string {
  const parts = isHomeLanguage(language)
    ? []
    : [`${language.toLowerCase()}${LANG_SUFFIX}`];
  parts.push(...segments);
  return `/${parts.join("/")}`;
}

/** Level-1 path: `/` or `/<lang>-lang` for gift cards, `…/top-up-with-crypto`
 * for top-ups. */
export function levelOnePath(kind: ProductKind, language: string): string {
  return kind === "top-up"
    ? withLang(language, TOP_UP_SEGMENT)
    : withLang(language);
}

/** The level-2 route segment for a product slug. */
export function productSegment(kind: ProductKind, slug: string): string {
  return kind === "top-up"
    ? `top-up-${slug}-with-crypto`
    : `buy-${slug}-gift-card-with-crypto`;
}

/** Level-2 path for a product in a language. */
export function productPath(
  kind: ProductKind,
  language: string,
  slug: string,
): string {
  const segment = productSegment(kind, slug);
  return kind === "top-up"
    ? withLang(language, TOP_UP_SEGMENT, segment)
    : withLang(language, segment);
}

/**
 * Reads a language code out of a route segment like `es-lang`. Returns null
 * when the segment is not a language segment.
 */
export function languageFromSegment(segment: string): string | null {
  const match = /^([a-z]{2})-lang$/.exec(segment);
  return match ? match[1] : null;
}

/**
 * Reads a product slug out of a level-2 route segment. Returns null when the
 * segment does not match that kind's pattern.
 */
export function slugFromProductSegment(
  kind: ProductKind,
  segment: string,
): string | null {
  const pattern =
    kind === "top-up"
      ? /^top-up-(.+)-with-crypto$/
      : /^buy-(.+)-gift-card-with-crypto$/;
  const match = pattern.exec(segment);
  return match?.[1] || null;
}

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

/**
 * GitHub Pages sits behind a CDN that ignores `no-store`, so content edits only
 * show up promptly if the URL itself changes. The cache buster is deliberate;
 * `cache()` keeps it from costing us duplicate requests inside one render.
 */
async function fetchRefocus(url: string): Promise<Response> {
  const bustUrl = `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  return fetch(bustUrl, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetchRefocus(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${url} (${res.status})`);
  }
  return (await res.json()) as T;
}

/** Fetches a content document, returning null for missing/empty/invalid files. */
async function fetchEntries(url: string): Promise<ContentEntry[] | null> {
  const res = await fetchRefocus(url);
  if (!res.ok) return null;

  const text = await res.text();
  if (!text.trim()) return null;

  let entries: unknown;
  try {
    entries = JSON.parse(text);
  } catch {
    return null;
  }
  if (!Array.isArray(entries) || entries.length === 0) return null;
  return entries as ContentEntry[];
}

function toMap(entries: ContentEntry[]): Map<string, string> {
  return new Map(entries.map((e) => [e.variable, e.text]));
}

// ---------------------------------------------------------------------------
// Languages
// ---------------------------------------------------------------------------

/** Every language whose display status is on, in list order. */
export const getLanguages = cache(async (): Promise<RefocusLanguage[]> => {
  const all = await fetchJson<RefocusLanguage[]>(LANG_LIST_URL);
  return all.filter(
    (l) => (l["display-status"] ?? "").toLowerCase() === DISPLAY_ON,
  );
});

/** True when the language is served and display-on. */
export async function isSupportedLanguage(language: string): Promise<boolean> {
  const languages = await getLanguages();
  return languages.some((l) => l["href-code"].toLowerCase() === language);
}

/**
 * Dropdown options, English first and the rest alphabetical. `hrefFor` decides
 * where each option points — the level-1 page, or a level-2 page for a product.
 */
export async function getLanguageOptions(
  hrefFor: (language: string) => string,
): Promise<LanguageOption[]> {
  const languages = await getLanguages();
  return languages
    .map((l) => {
      const code = l["href-code"].toLowerCase();
      return {
        code,
        name: l["lang-english"],
        endonym: l["lang-endo"],
        href: hrefFor(code),
        isHome: code === HOME_LANGUAGE,
      };
    })
    .sort((a, b) => {
      if (a.code === HOME_LANGUAGE) return -1;
      if (b.code === HOME_LANGUAGE) return 1;
      return a.code.localeCompare(b.code);
    });
}

// ---------------------------------------------------------------------------
// Page content
// ---------------------------------------------------------------------------

/** Level-1 copy for a kind and language, or null when it has none. */
export async function getLevelOneContent(
  kind: ProductKind,
  language: string,
): Promise<Content | null> {
  const entries = await fetchEntries(
    `${KIND_CONFIG[kind].base}/content/${language}/level-1/content.json`,
  );
  return entries ? buildContent(language, toMap(entries)) : null;
}

/** Level-2 copy for a kind, language and product, or null when it has none. */
export async function getLevelTwoContent(
  kind: ProductKind,
  language: string,
  slug: string,
): Promise<RefocusLevel2 | null> {
  const entries = await fetchEntries(
    `${KIND_CONFIG[kind].base}/content/${language}/level-2/${slug}.json`,
  );
  if (!entries) return null;

  const map = toMap(entries);
  return {
    content: buildContent(language, map),
    moreGamesHeading: map.get("more-games-heading") ?? "",
  };
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

function imageAlt(kind: ProductKind, brandName: string): string {
  return `${brandName} ${KIND_CONFIG[kind].altSuffix}`;
}

function imageUrl(kind: ProductKind, fileName: string): string {
  return `${KIND_CONFIG[kind].base}/tools/images/${fileName}`;
}

/**
 * Normalised product list for a kind, in the order the JSON lists them. The
 * list is authored in display order, so it is deliberately not re-sorted.
 */
const getProductsFor = cache(
  async (kind: ProductKind): Promise<RefocusProduct[]> => {
    const url = `${KIND_CONFIG[kind].base}/tools/product-list.json`;

    if (kind === "top-up") {
      const all = await fetchJson<RawTopUpProduct[]>(url);
      return all.map((p) => ({
        brandName: p.brand_name,
        slug: p.slug,
        // Top-up artwork has no `image-name` field; files are named by slug.
        image: imageUrl(kind, `${p.slug}.webp`),
        alt: imageAlt(kind, p.brand_name),
        currency: p["product-currency"],
      }));
    }

    const all = await fetchJson<RawGiftCardProduct[]>(url);
    return all
      .filter((p) => (p["display-status"] ?? "").toLowerCase() === DISPLAY_ON)
      .map((p) => ({
        brandName: p["brand-name"],
        slug: p.slug,
        image: imageUrl(kind, p["image-name"]),
        alt: imageAlt(kind, p["brand-name"]),
      }));
  },
);

export function getProducts(kind: ProductKind): Promise<RefocusProduct[]> {
  return getProductsFor(kind);
}

/** True when the slug names a listed product of that kind. */
export async function isProduct(
  kind: ProductKind,
  slug: string,
): Promise<boolean> {
  return (await getProductsFor(kind)).some((p) => p.slug === slug);
}

const getRawSkus = cache(
  async (kind: ProductKind, slug: string): Promise<string[]> => {
    const url = `${KIND_CONFIG[kind].base}/tools/product-list.json`;
    const all = await fetchJson<Array<{ slug: string; skus: string[] }>>(url);
    return all.find((p) => p.slug === slug)?.skus ?? [];
  },
);

/** SKU cards for one product, in array order. */
export async function getSkus(
  kind: ProductKind,
  slug: string,
): Promise<RefocusSku[]> {
  const [products, skus] = await Promise.all([
    getProductsFor(kind),
    getRawSkus(kind, slug),
  ]);
  const product = products.find((p) => p.slug === slug);
  if (!product) return [];

  return skus.map((sku) => ({
    brandName: product.brandName,
    image: product.image,
    sku,
    alt: product.alt,
  }));
}

/** Artwork for the CTA banners and the GetStarted card, by product slug. */
export async function getImages(
  kind: ProductKind,
  slugs: string[],
): Promise<RemoteImage[]> {
  const products = await getProductsFor(kind);
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs.map((slug) => {
    const p = bySlug.get(slug);
    return { src: p?.image ?? "", alt: p?.alt ?? "" };
  });
}
