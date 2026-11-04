import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogPostView from "@/components/pages/BlogPostView";
import { getGiftCardBlogPostPage, type BlogPostPage } from "@/content/blog";
import { buildBlogPostMetadata, isHomeLocale } from "@/content/seo";

type RouteParams = { locale: string; product: string; slug: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

// Blog post under a gift-card level-2 page: /<lang-country>/gift-card/<product>/<post>
async function resolve(
  rawLocale: string,
  product: string,
  slug: string,
): Promise<BlogPostPage> {
  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;
  if (isHomeLocale(language, country)) redirect(`/gift-card/${product}/${slug}`);

  const page = await getGiftCardBlogPostPage(language, country, product, slug);
  if (!page) notFound();
  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, product, slug } = await params;
  return buildBlogPostMetadata(await resolve(locale, product, slug));
}

export default async function LocaleGiftCardBlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, product, slug } = await params;
  return <BlogPostView page={await resolve(locale, product, slug)} />;
}
