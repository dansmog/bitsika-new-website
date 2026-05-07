import type { Metadata } from "next";
import type { SeoLanguage } from "./api";

const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";

export function isHomeLocale(language: string, country: string): boolean {
  return language === HOME_LANGUAGE && country === HOME_COUNTRY;
}

export function pathForLocale(language: string, country: string): string {
  return isHomeLocale(language, country) ? "/" : `/${language}-${country}`;
}

export function buildLocaleAlternates(
  currentLanguage: string,
  currentCountry: string,
  languages: SeoLanguage[],
): NonNullable<Metadata["alternates"]> {
  const visible = languages.filter((l) => l.is_display);
  const homeKey = `${HOME_LANGUAGE}-${HOME_COUNTRY}`;

  const ordered: Record<string, string> = {};
  ordered[homeKey] = "/";

  const nonHome = visible
    .filter((l) => !isHomeLocale(l.language, l.country))
    .map((l) => ({
      key: `${l.language}-${l.country}`,
      path: pathForLocale(l.language, l.country),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));

  for (const { key, path } of nonHome) {
    ordered[key] = path;
  }

  ordered["x-default"] = "/";

  return {
    canonical: pathForLocale(currentLanguage, currentCountry),
    languages: ordered,
  };
}
