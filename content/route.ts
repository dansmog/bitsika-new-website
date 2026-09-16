import { notFound, permanentRedirect } from "next/navigation";
import type { Content } from "./shape";
import {
  HOME_LANGUAGE,
  TOP_UP_SEGMENT,
  getLevelOneContent,
  getLevelTwoContent,
  isProduct,
  isSupportedLanguage,
  languageFromSegment,
  levelOnePath,
  productPath,
  slugFromProductSegment,
  type ProductKind,
} from "./refocus";

/**
 * Resolves a URL into the page it names. All four page types share one route
 * file, so this is the single place that decides what a path means.
 *
 *   /                                                  gift-card level 1
 *   /<lang>-lang                                       gift-card level 1
 *   /buy-<slug>-gift-card-with-crypto                  gift-card level 2
 *   /<lang>-lang/buy-<slug>-gift-card-with-crypto      gift-card level 2
 *   /top-up-with-crypto                                top-up level 1
 *   /<lang>-lang/top-up-with-crypto                    top-up level 1
 *   /top-up-with-crypto/top-up-<slug>-with-crypto      top-up level 2
 *   /<lang>-lang/top-up-with-crypto/top-up-<slug>-…    top-up level 2
 */
export type ResolvedPage =
  | { kind: ProductKind; level: 1; language: string; content: Content }
  | {
      kind: ProductKind;
      level: 2;
      language: string;
      slug: string;
      content: Content;
      moreGamesHeading: string;
    };

async function levelOne(
  kind: ProductKind,
  language: string,
): Promise<ResolvedPage> {
  const content = await getLevelOneContent(kind, language);
  if (!content) notFound();
  return { kind, level: 1, language, content };
}

async function levelTwo(
  kind: ProductKind,
  language: string,
  slug: string,
): Promise<ResolvedPage> {
  if (!(await isProduct(kind, slug))) notFound();
  const page = await getLevelTwoContent(kind, language, slug);
  if (!page) notFound();
  return {
    kind,
    level: 2,
    language,
    slug,
    content: page.content,
    moreGamesHeading: page.moreGamesHeading,
  };
}

export async function resolvePage(segments: string[]): Promise<ResolvedPage> {
  const [first, ...tail] = segments;

  // A leading `<lang>-lang` sets the language; English never carries one.
  const prefixLanguage = first ? languageFromSegment(first) : null;
  const language = prefixLanguage ?? HOME_LANGUAGE;
  const rest = prefixLanguage ? tail : segments;

  if (prefixLanguage) {
    if (language === HOME_LANGUAGE) permanentRedirect(`/${rest.join("/")}`);
    if (!(await isSupportedLanguage(language))) notFound();
  }

  // Gift cards are the site root.
  if (rest.length === 0) return levelOne("gift-card", language);

  if (rest.length === 1) {
    if (rest[0] === TOP_UP_SEGMENT) return levelOne("top-up", language);

    const giftCardSlug = slugFromProductSegment("gift-card", rest[0]);
    if (giftCardSlug) return levelTwo("gift-card", language, giftCardSlug);

    // Top-up product pages used to sit at the root (`/free-fire`). Those URLs
    // carry real traffic, so send the ones naming a real product to their new
    // home rather than 404-ing them.
    if (!prefixLanguage && (await isProduct("top-up", rest[0]))) {
      permanentRedirect(productPath("top-up", HOME_LANGUAGE, rest[0]));
    }

    notFound();
  }

  if (rest.length === 2 && rest[0] === TOP_UP_SEGMENT) {
    const slug = slugFromProductSegment("top-up", rest[1]);
    if (slug) return levelTwo("top-up", language, slug);
    // `/top-up-with-crypto/<bare-slug>` — tolerate the un-prefixed form.
    if (await isProduct("top-up", rest[1])) {
      permanentRedirect(productPath("top-up", language, rest[1]));
    }
  }

  notFound();
}

export { levelOnePath, productPath };
