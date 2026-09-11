import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Redirects the retired lang-country URLs onto their language equivalents, so
 * the refocus restructure doesn't drop the ranking those pages carry.
 *
 * Kept dependency-free on purpose — this runs on every request, so the path
 * helpers are duplicated here rather than imported from content/refocus.ts.
 */

const HOME_LANGUAGE = "en";
const TOP_UP_SEGMENT = "top-up-with-crypto";

/** `/es-mx`, `/en-ng/gift-card`, … — two-letter language, two-letter country. */
const LANG_COUNTRY = /^\/([a-z]{2})-([a-z]{2})(?:\/(.*))?$/;
/** `/gift-card` and `/gift-card/<slug>` from the old structure. */
const OLD_GIFT_CARD = /^\/gift-card(?:\/([^/]+))?\/?$/;
/** The provisional top-up path used before the top-up URLs were specified. */
const PARKED_TOP_UP = /^\/game-top-ups(?:\/([^/]+))?\/?$/;

function langPrefix(language: string): string {
  return language === HOME_LANGUAGE ? "" : `/${language}-lang`;
}

function giftCardLevelOne(language: string): string {
  return langPrefix(language) || "/";
}

function giftCardProduct(language: string, slug: string): string {
  return `${langPrefix(language)}/buy-${slug}-gift-card-with-crypto`;
}

function topUpLevelOne(language: string): string {
  return `${langPrefix(language)}/${TOP_UP_SEGMENT}`;
}

function topUpProduct(language: string, slug: string): string {
  return `${topUpLevelOne(language)}/top-up-${slug}-with-crypto`;
}

/** Where an old URL should land, or null when it isn't an old URL. */
function retiredUrlTarget(pathname: string): string | null {
  const parked = PARKED_TOP_UP.exec(pathname);
  if (parked) {
    const [, slug] = parked;
    return slug
      ? topUpProduct(HOME_LANGUAGE, slug)
      : topUpLevelOne(HOME_LANGUAGE);
  }

  const oldGiftCard = OLD_GIFT_CARD.exec(pathname);
  if (oldGiftCard) {
    const [, slug] = oldGiftCard;
    return slug
      ? giftCardProduct(HOME_LANGUAGE, slug)
      : giftCardLevelOne(HOME_LANGUAGE);
  }

  const langCountry = LANG_COUNTRY.exec(pathname);
  if (!langCountry) return null;

  const [, language, , rest = ""] = langCountry;
  const trimmed = rest.replace(/\/$/, "");

  // /<lang>-<country>
  if (!trimmed) return giftCardLevelOne(language);

  // /<lang>-<country>/gift-card[/<slug>]
  const giftCard = /^gift-card(?:\/([^/]+))?$/.exec(trimmed);
  if (giftCard) {
    const [, slug] = giftCard;
    return slug ? giftCardProduct(language, slug) : giftCardLevelOne(language);
  }

  // The competitor pages were retired outright — no equivalent to send them to.
  if (trimmed.endsWith("-alternative")) return null;

  // Anything else under a lang-country prefix was a top-up product page.
  if (!trimmed.includes("/")) return topUpProduct(language, trimmed);

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const target = retiredUrlTarget(pathname);
  if (target && target !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
