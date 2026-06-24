import type { Metadata } from "next";
import type { SeoLanguage, SeoProduct } from "./api";
import type { CompetitorPageEntry } from "./competitors";
import { getSeoLanguages } from "./api";
import { getProductContent } from "./loader";

const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";

export function isHomeLocale(language: string, country: string): boolean {
  return language === HOME_LANGUAGE && country === HOME_COUNTRY;
}

export function pathForLocale(
  language: string,
  country: string,
  productSlug?: string,
): string {
  const base = isHomeLocale(language, country) ? "" : `/${language}-${country}`;
  if (productSlug) return `${base}/${productSlug}`;
  return base || "/";
}

export function pathForCompetitor(
  language: string,
  country: string,
  competitorSlug: string,
): string {
  const base = isHomeLocale(language, country) ? "" : `/${language}-${country}`;
  return `${base}/${competitorSlug}-alternative`;
}

/**
 * hreflang alternates for a competitor page. Unlike locale/product pages, a
 * competitor only exists in the lang-countries listed for it, so we build the
 * alternate set from those entries rather than from every display locale.
 */
export function buildCompetitorAlternates(
  competitor: string,
  currentLanguage: string,
  currentCountry: string,
  pages: CompetitorPageEntry[],
): NonNullable<Metadata["alternates"]> {
  const homeKey = `${HOME_LANGUAGE}-${HOME_COUNTRY}`;
  const localeEntries = pages
    .filter((p) => p.competitor === competitor)
    .map((p) => {
      const [language, country] = p.locale.toLowerCase().split("-");
      return {
        key: `${language}-${country}`,
        language,
        country,
        path: pathForCompetitor(language, country, competitor),
      };
    });

  const ordered: Record<string, string> = {};
  const home = localeEntries.find((e) => e.key === homeKey);
  if (home) ordered[homeKey] = home.path;

  for (const { key, path } of localeEntries
    .filter((e) => e.key !== homeKey)
    .sort((a, b) => a.key.localeCompare(b.key))) {
    ordered[key] = path;
  }

  if (home) ordered["x-default"] = home.path;

  return {
    canonical: pathForCompetitor(currentLanguage, currentCountry, competitor),
    languages: ordered,
  };
}

/**
 * hreflang alternates for a gift-card page. en-us is listed first and also as
 * x-default; the rest follow in alphabetical order by href-code. Only display-on
 * entries are passed in, so all of them are emitted.
 */
export function buildGiftCardAlternates(
  currentHrefCode: string,
  hrefCodes: string[],
): NonNullable<Metadata["alternates"]> {
  const homeKey = `${HOME_LANGUAGE}-${HOME_COUNTRY}`;
  const giftCardPath = (code: string) =>
    code === homeKey ? "/gift-card" : `/${code}/gift-card`;

  const ordered: Record<string, string> = {};
  ordered[homeKey] = giftCardPath(homeKey);

  const nonHome = hrefCodes
    .map((c) => c.toLowerCase())
    .filter((c) => c !== homeKey)
    .sort((a, b) => a.localeCompare(b));
  for (const code of nonHome) {
    ordered[code] = giftCardPath(code);
  }

  ordered["x-default"] = giftCardPath(homeKey);

  return {
    canonical: giftCardPath(currentHrefCode),
    languages: ordered,
  };
}

export function buildLocaleAlternates(
  currentLanguage: string,
  currentCountry: string,
  languages: SeoLanguage[],
  productSlug?: string,
): NonNullable<Metadata["alternates"]> {
  const visible = languages.filter((l) => l.is_display);
  const homeKey = `${HOME_LANGUAGE}-${HOME_COUNTRY}`;
  const defaultPath = pathForLocale(HOME_LANGUAGE, HOME_COUNTRY, productSlug);

  const ordered: Record<string, string> = {};
  ordered[homeKey] = defaultPath;

  const nonHome = visible
    .filter((l) => !isHomeLocale(l.language, l.country))
    .map((l) => ({
      key: `${l.language}-${l.country}`,
      path: pathForLocale(l.language, l.country, productSlug),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));

  for (const { key, path } of nonHome) {
    ordered[key] = path;
  }

  ordered["x-default"] = defaultPath;

  return {
    canonical: pathForLocale(currentLanguage, currentCountry, productSlug),
    languages: ordered,
  };
}

export async function buildProductMetadata(
  language: string,
  country: string,
  product: SeoProduct,
): Promise<Metadata> {
  const [productContent, languages] = await Promise.all([
    getProductContent(product.slug, language, country),
    getSeoLanguages(),
  ]);
  const title = productContent.meta.title;
  const description = productContent.meta.description;
  return {
    title,
    description,
    alternates: buildLocaleAlternates(
      language,
      country,
      languages.data,
      product.slug,
    ),
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/bitsika-og-thumbnail.png",
          width: 256,
          height: 256,
          alt: "Bitsika",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/images/bitsika-og-thumbnail.png"],
    },
  };
}
