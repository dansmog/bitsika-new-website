import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductDetailsView from "@/components/pages/ProductDetailsView";
import CompetitorView from "@/components/pages/CompetitorView";
import GiftCardView from "@/components/pages/GiftCardView";
import GiftCardProductView from "@/components/pages/GiftCardProductView";
import {
  getSeoLanguages,
  getSeoProduct,
  type SeoProduct,
} from "@/content/api";
import {
  competitorSlugFromRoute,
  getCompetitorContent,
  getCompetitorPageEntry,
  getCompetitorPages,
  type CompetitorPageEntry,
} from "@/content/competitors";
import {
  getGiftCardContent,
  getGiftCardEntry,
  getGiftCardLangCountries,
  getGiftCardProductContent,
  getGiftCardProductNames,
  type LangCountryEntry,
} from "@/content/giftcard";
import type { Content } from "@/content/shape";
import {
  buildCompetitorAlternates,
  buildGiftCardAlternates,
  buildGiftCardProductMetadata,
  buildProductMetadata,
  isHomeLocale,
} from "@/content/seo";

type RouteParams = { locale: string; product: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;
const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";

type ResolvedRoute =
  | { kind: "product"; language: string; country: string; product: SeoProduct }
  | {
      kind: "competitor";
      language: string;
      country: string;
      competitor: string;
      entry: CompetitorPageEntry;
    }
  | {
      kind: "giftcard";
      language: string;
      country: string;
      entry: LangCountryEntry;
    }
  | {
      kind: "giftcard-product";
      language: string;
      country: string;
      slug: string;
      content: Content;
      moreGamesHeading: string;
    };

async function resolveLocaleAndSegment(
  rawLocale: string,
  segment: string,
): Promise<ResolvedRoute> {
  // en-us level-2 gift-card product page: /gift-card/<product-slug>
  if (rawLocale === "gift-card") {
    const [entry, names] = await Promise.all([
      getGiftCardEntry(HOME_LANGUAGE, HOME_COUNTRY),
      getGiftCardProductNames(),
    ]);
    const productName = names.get(segment);
    if (!entry || !productName) notFound();
    const page = await getGiftCardProductContent(entry, segment, productName);
    if (!page) notFound();
    return {
      kind: "giftcard-product",
      language: HOME_LANGUAGE,
      country: HOME_COUNTRY,
      slug: segment,
      content: page.content,
      moreGamesHeading: page.moreGamesHeading,
    };
  }

  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;

  if (isHomeLocale(language, country)) redirect(`/${segment}`);

  if (segment === "gift-card") {
    const giftCardEntry = await getGiftCardEntry(language, country);
    if (!giftCardEntry) notFound();
    return { kind: "giftcard", language, country, entry: giftCardEntry };
  }

  const { data: languages } = await getSeoLanguages();
  const entry = languages.find(
    (l) => l.language === language && l.country === country,
  );
  if (!entry || !entry.is_display) notFound();

  const competitor = competitorSlugFromRoute(segment);
  if (competitor) {
    const competitorEntry = await getCompetitorPageEntry(
      competitor,
      language,
      country,
    );
    if (!competitorEntry) notFound();
    return {
      kind: "competitor",
      language,
      country,
      competitor,
      entry: competitorEntry,
    };
  }

  let product: SeoProduct;
  try {
    product = (await getSeoProduct(segment)).data;
  } catch {
    notFound();
  }
  if (!product.is_display) notFound();
  return { kind: "product", language, country, product };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, product: segment } = await params;
  const resolved = await resolveLocaleAndSegment(locale, segment);

  if (resolved.kind === "competitor") {
    const { language, country, competitor, entry } = resolved;
    const [content, pages] = await Promise.all([
      getCompetitorContent(entry),
      getCompetitorPages(),
    ]);
    return {
      title: content.meta.title,
      description: content.meta.description,
      alternates: buildCompetitorAlternates(competitor, language, country, pages),
      openGraph: {
        title: content.meta.title,
        description: content.meta.description,
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
        title: content.meta.title,
        description: content.meta.description,
        images: ["/images/bitsika-og-thumbnail.png"],
      },
    };
  }

  if (resolved.kind === "giftcard") {
    const { language, country, entry } = resolved;
    const [content, visible] = await Promise.all([
      getGiftCardContent(entry),
      getGiftCardLangCountries(),
    ]);
    return {
      title: content.meta.title,
      description: content.meta.description,
      alternates: buildGiftCardAlternates(
        `${language}-${country}`,
        visible.map((e) => e["href-code"]),
      ),
      openGraph: {
        title: content.meta.title,
        description: content.meta.description,
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
        title: content.meta.title,
        description: content.meta.description,
        images: ["/images/bitsika-og-thumbnail.png"],
      },
    };
  }

  if (resolved.kind === "giftcard-product") {
    return buildGiftCardProductMetadata(
      resolved.language,
      resolved.country,
      resolved.content,
      resolved.slug,
    );
  }

  return buildProductMetadata(
    resolved.language,
    resolved.country,
    resolved.product,
  );
}

export default async function LocaleProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, product: segment } = await params;
  const resolved = await resolveLocaleAndSegment(locale, segment);

  if (resolved.kind === "competitor") {
    return (
      <CompetitorView
        language={resolved.language}
        country={resolved.country}
        entry={resolved.entry}
      />
    );
  }

  if (resolved.kind === "giftcard") {
    return (
      <GiftCardView
        language={resolved.language}
        country={resolved.country}
        entry={resolved.entry}
      />
    );
  }

  if (resolved.kind === "giftcard-product") {
    return (
      <GiftCardProductView
        language={resolved.language}
        country={resolved.country}
        slug={resolved.slug}
        content={resolved.content}
        moreGamesHeading={resolved.moreGamesHeading}
      />
    );
  }

  return (
    <ProductDetailsView
      language={resolved.language}
      country={resolved.country}
      product={resolved.product}
    />
  );
}
