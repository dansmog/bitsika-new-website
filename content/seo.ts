import type { Metadata } from "next";
import type { Content } from "./shape";
import {
  HOME_LANGUAGE,
  getLanguages,
  levelOnePath,
  productPath,
  type ProductKind,
} from "./refocus";

/**
 * Canonical origin. Hrefs are built absolute rather than leaning on
 * `metadataBase`, so the emitted tags match the agreed SEO spec exactly —
 * including the root canonical having no trailing slash.
 */
const SITE_URL = "https://www.bitsika.com";

const OG_IMAGE = {
  url: "/images/bitsika-og-thumbnail.png",
  width: 256,
  height: 256,
  alt: "Bitsika",
};

function absolute(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * hreflang set, ordered per spec: English first, the other languages
 * alphabetically in the middle, and x-default (pointing at English) last. Only
 * display-on languages are included.
 */
async function buildAlternates(
  currentLanguage: string,
  pathFor: (language: string) => string,
): Promise<NonNullable<Metadata["alternates"]>> {
  const languages = await getLanguages();
  const codes = languages.map((l) => l["href-code"].toLowerCase());
  const hasHome = codes.includes(HOME_LANGUAGE);

  const ordered: Record<string, string> = {};
  if (hasHome) ordered[HOME_LANGUAGE] = absolute(pathFor(HOME_LANGUAGE));

  for (const code of codes
    .filter((c) => c !== HOME_LANGUAGE)
    .sort((a, b) => a.localeCompare(b))) {
    ordered[code] = absolute(pathFor(code));
  }

  if (hasHome) ordered["x-default"] = absolute(pathFor(HOME_LANGUAGE));

  return {
    canonical: absolute(pathFor(currentLanguage)),
    languages: ordered,
  };
}

function socialMeta(content: Content) {
  const { title, description } = content.meta;
  return {
    openGraph: { title, description, images: [OG_IMAGE] },
    twitter: {
      card: "summary" as const,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Metadata for a level-1 page. */
export async function buildLevelOneMetadata(
  kind: ProductKind,
  language: string,
  content: Content,
): Promise<Metadata> {
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: await buildAlternates(language, (lang) =>
      levelOnePath(kind, lang),
    ),
    ...socialMeta(content),
  };
}

/** Metadata for a level-2 page. */
export async function buildLevelTwoMetadata(
  kind: ProductKind,
  language: string,
  slug: string,
  content: Content,
): Promise<Metadata> {
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: await buildAlternates(language, (lang) =>
      productPath(kind, lang, slug),
    ),
    ...socialMeta(content),
  };
}
