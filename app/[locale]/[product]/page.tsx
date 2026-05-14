import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductDetailsView from "@/components/pages/ProductDetailsView";
import {
  getSeoLanguages,
  getSeoProduct,
  type SeoProduct,
} from "@/content/api";
import { buildProductMetadata, isHomeLocale } from "@/content/seo";

type RouteParams = { locale: string; product: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

async function resolveLocaleAndProduct(rawLocale: string, productSlug: string) {
  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;

  if (isHomeLocale(language, country)) redirect(`/${productSlug}`);

  const { data: languages } = await getSeoLanguages();
  const entry = languages.find(
    (l) => l.language === language && l.country === country,
  );
  if (!entry || !entry.is_display) notFound();

  let product: SeoProduct;
  try {
    product = (await getSeoProduct(productSlug)).data;
  } catch {
    notFound();
  }
  if (!product.is_display) notFound();
  return { language, country, product };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, product: productSlug } = await params;
  const { language, country, product } = await resolveLocaleAndProduct(
    locale,
    productSlug,
  );
  return buildProductMetadata(language, country, product);
}

export default async function LocaleProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, product: productSlug } = await params;
  const { language, country, product } = await resolveLocaleAndProduct(
    locale,
    productSlug,
  );
  return (
    <ProductDetailsView
      language={language}
      country={country}
      product={product}
    />
  );
}
