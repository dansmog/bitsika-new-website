import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import GiftCardProductView from "@/components/pages/GiftCardProductView";
import {
  getGiftCardEntry,
  getGiftCardProductContent,
  getGiftCardProductNames,
} from "@/content/giftcard";
import type { Content } from "@/content/shape";
import { buildGiftCardProductMetadata, isHomeLocale } from "@/content/seo";

type RouteParams = { locale: string; product: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

type Resolved = {
  language: string;
  country: string;
  slug: string;
  content: Content;
  moreGamesHeading: string;
};

async function resolve(rawLocale: string, slug: string): Promise<Resolved> {
  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;
  if (isHomeLocale(language, country)) redirect(`/gift-card/${slug}`);

  const [entry, names] = await Promise.all([
    getGiftCardEntry(language, country),
    getGiftCardProductNames(),
  ]);
  const productName = names.get(slug);
  if (!entry || !productName) notFound();

  const page = await getGiftCardProductContent(entry, slug, productName);
  if (!page) notFound();

  return {
    language,
    country,
    slug,
    content: page.content,
    moreGamesHeading: page.moreGamesHeading,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, product: slug } = await params;
  const { language, country, content } = await resolve(locale, slug);
  return buildGiftCardProductMetadata(language, country, content, slug);
}

export default async function LocaleGiftCardProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, product: slug } = await params;
  const { language, country, content, moreGamesHeading } = await resolve(
    locale,
    slug,
  );
  return (
    <GiftCardProductView
      language={language}
      country={country}
      slug={slug}
      content={content}
      moreGamesHeading={moreGamesHeading}
    />
  );
}
