import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogPostView from "@/components/pages/BlogPostView";
import {
  getGiftCardBlogPostPage,
  getTopUpBlogPostPage,
  type BlogPostPage,
} from "@/content/blog";
import { buildBlogPostMetadata, isHomeLocale } from "@/content/seo";

type RouteParams = { locale: string; product: string; slug: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;
const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";

/**
 * Blog posts three segments deep:
 * - en-us gift-card post: /gift-card/<product>/<post>
 * - top-up post:          /<lang-country>/<product>/<post>
 */
async function resolve(
  first: string,
  product: string,
  slug: string,
): Promise<BlogPostPage> {
  if (first === "gift-card") {
    const page = await getGiftCardBlogPostPage(
      HOME_LANGUAGE,
      HOME_COUNTRY,
      product,
      slug,
    );
    if (!page) notFound();
    return page;
  }

  const match = LOCALE_PATTERN.exec(first);
  if (!match) notFound();

  const [, language, country] = match;
  if (isHomeLocale(language, country)) redirect(`/${product}/${slug}`);

  const page = await getTopUpBlogPostPage(language, country, product, slug);
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

export default async function BlogPostPageRoute({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, product, slug } = await params;
  return <BlogPostView page={await resolve(locale, product, slug)} />;
}
