import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductDetailsView from "@/components/pages/ProductDetailsView";
import CompetitorView from "@/components/pages/CompetitorView";
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
  buildCompetitorAlternates,
  buildProductMetadata,
  isHomeLocale,
} from "@/content/seo";

type RouteParams = { locale: string; product: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

type ResolvedRoute =
  | { kind: "product"; language: string; country: string; product: SeoProduct }
  | {
      kind: "competitor";
      language: string;
      country: string;
      competitor: string;
      entry: CompetitorPageEntry;
    };

async function resolveLocaleAndSegment(
  rawLocale: string,
  segment: string,
): Promise<ResolvedRoute> {
  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;

  if (isHomeLocale(language, country)) redirect(`/${segment}`);

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

  return (
    <ProductDetailsView
      language={resolved.language}
      country={resolved.country}
      product={resolved.product}
    />
  );
}
