import type { Metadata } from "next";
import type { SeoLanguage, SeoProduct } from "./api";
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

export function buildLocaleAlternates(
  currentLanguage: string,
  currentCountry: string,
  languages: SeoLanguage[],
  productSlug?: string,
): NonNullable<Metadata["alternates"]> {
  const visible = languages.filter((l) => l.is_display);
  const homeKey = HOME_LANGUAGE;
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
