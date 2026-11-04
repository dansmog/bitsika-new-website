import { cache } from "react";
import { buildContent, type Content } from "./shape";
import type { BlogArticle } from "./imageShape";
import { GAME_HOMEPAGE_BASE } from "./sources";
import { getSeoLanguages, getSeoProduct } from "./api";
import {
  getGiftCardEntry,
  getGiftCardImagesBySlugs,
  getGiftCardProductContent,
  getGiftCardProductNames,
  giftCardProductPath,
} from "./giftcard";
import { isHomeLocale, pathForLocale } from "./seo";

const BLOG_PAGES_BASE = `${GAME_HOMEPAGE_BASE}/blog-pages`;
/** Max post cards shown in a blog section. */
const BLOG_CARD_COUNT = 6;
/** Value of an article's `error` row when it could not be written. */
const ERROR_YES = "yes";

/** Level-2 feature a post belongs to; matches the blog-pages folder name. */
export type BlogFeature = "gift-card" | "top-up";

/** A single entry from <feature>/tools/list-of-products.json. */
type RawBlogProduct = {
  product: string;
  locale: string;
  slug: string;
};

/** A single entry from <feature>/locales/<locale>/<product>/list-of-articles.json. */
type RawArticleListEntry = {
  "topic-id": number;
  id: string;
  title: string;
  slug: string;
  file: string;
  "created-at": string;
};

type ArticleEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
  type: string;
};

/** A post as listed for a product page, newest first. */
export type BlogPostSummary = {
  title: string;
  slug: string;
  file: string;
  createdAt: string;
};

/** One body element of a post, rendered in order after the title. */
export type ArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "section-break" };

/** A full post: its body plus the shared page copy (meta, blog section,
 * store buttons, footer) built from the article's `info` rows. */
export type BlogPost = {
  slug: string;
  title: string;
  createdAt: string;
  blocks: ArticleBlock[];
  content: Content;
};

/** Everything a post page needs, resolved from its URL. */
export type BlogPostPage = {
  feature: BlogFeature;
  language: string;
  country: string;
  productSlug: string;
  /** The parent level-2 product page; posts live under it. */
  productPath: string;
  /** This post's own path (also its canonical URL). */
  path: string;
  /** The parent product's artwork, used for the post and all its cards. */
  imageSrc: string;
  imageAlt: string;
  post: BlogPost;
  /** Every post for the parent product page, newest first. */
  posts: BlogPostSummary[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const bustUrl = `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await fetch(bustUrl, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
  if (!res.ok) {
    throw new Error(`Failed to load ${url} (${res.status})`);
  }
  return (await res.json()) as T;
}

function productFolder(
  feature: BlogFeature,
  hrefCode: string,
  productSlug: string,
): string {
  return `${BLOG_PAGES_BASE}/${feature}/locales/${hrefCode}/${productSlug}`;
}

/** Path to a post: the parent product page path plus the post slug. */
export function blogPostPath(productPath: string, postSlug: string): string {
  return `${productPath}/${postSlug}`;
}

/** Alt text for a post's image. */
export function blogPostImageAlt(title: string): string {
  return `Image for ${title} post`;
}

/**
 * Posts written for a level-2 product page, newest first. Empty when the page
 * isn't on the feature's product list, has no posts yet, or the lists can't
 * load — callers then keep the default blog section.
 */
export async function getBlogPosts(
  feature: BlogFeature,
  hrefCode: string,
  productSlug: string,
): Promise<BlogPostSummary[]> {
  const code = hrefCode.toLowerCase();
  try {
    const products = await fetchJson<RawBlogProduct[]>(
      `${BLOG_PAGES_BASE}/${feature}/tools/list-of-products.json`,
    );
    const listed = products.some(
      (p) => p.locale.toLowerCase() === code && p.slug === productSlug,
    );
    if (!listed) return [];

    const entries = await fetchJson<RawArticleListEntry[]>(
      `${productFolder(feature, code, productSlug)}/list-of-articles.json`,
    );
    if (!Array.isArray(entries)) return [];
    return entries
      .filter((e) => e.slug && e.title)
      .map((e) => ({
        title: e.title,
        slug: e.slug,
        file: e.file,
        createdAt: e["created-at"],
      }));
  } catch {
    return [];
  }
}

/** The latest posts for a product page's blog section. */
export function latestBlogPosts(posts: BlogPostSummary[]): BlogPostSummary[] {
  return posts.slice(0, BLOG_CARD_COUNT);
}

/**
 * The posts shown under a post: the next ones after it in list order, wrapping
 * to the top of the list, never including the post itself.
 */
export function nextBlogPosts(
  posts: BlogPostSummary[],
  currentSlug: string,
): BlogPostSummary[] {
  const index = posts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return latestBlogPosts(posts);
  const count = Math.min(BLOG_CARD_COUNT, posts.length - 1);
  return Array.from(
    { length: count },
    (_, i) => posts[(index + 1 + i) % posts.length],
  );
}

/** Blog-section cards for posts, all using the product's artwork. */
export function blogPostCards(
  posts: BlogPostSummary[],
  productPath: string,
  imageSrc: string,
): BlogArticle[] {
  return posts.map((p) => ({
    title: p.title,
    href: blogPostPath(productPath, p.slug),
    image: { src: imageSrc, alt: blogPostImageAlt(p.title) },
  }));
}

function toBlocks(entries: ArticleEntry[]): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  for (const e of entries) {
    if (e.type !== "content") continue;
    if (e.html === "p" && e.text) blocks.push({ kind: "paragraph", text: e.text });
    else if (e.html === "h2" && e.text) blocks.push({ kind: "subheading", text: e.text });
    else if (e.html === "hr") blocks.push({ kind: "section-break" });
  }
  return blocks;
}

/**
 * A listed post for a product page, or null when it isn't listed, its file is
 * missing or invalid, or it was flagged with `error: yes`.
 */
async function getBlogPost(
  feature: BlogFeature,
  hrefCode: string,
  productSlug: string,
  postSlug: string,
): Promise<{ post: BlogPost; posts: BlogPostSummary[] } | null> {
  const posts = await getBlogPosts(feature, hrefCode, productSlug);
  const summary = posts.find((p) => p.slug === postSlug);
  if (!summary) return null;

  let entries: ArticleEntry[];
  try {
    entries = await fetchJson<ArticleEntry[]>(
      `${productFolder(feature, hrefCode.toLowerCase(), productSlug)}/${summary.file}`,
    );
  } catch {
    return null;
  }
  if (!Array.isArray(entries) || entries.length === 0) return null;

  const map = new Map(entries.map((e) => [e.variable, e.text]));
  if ((map.get("error") ?? "").toLowerCase() === ERROR_YES) return null;

  const infoMap = new Map(
    entries.filter((e) => e.type === "info").map((e) => [e.variable, e.text]),
  );
  return {
    post: {
      slug: summary.slug,
      title: map.get("blog-title") || summary.title,
      createdAt: summary.createdAt,
      blocks: toBlocks(entries),
      content: buildContent(hrefCode.toLowerCase(), infoMap),
    },
    posts,
  };
}

/**
 * A gift-card post page, or null (404) when the post or its parent level-2
 * page doesn't exist. Cached so metadata and the page share one lookup.
 */
export const getGiftCardBlogPostPage = cache(
  async (
    language: string,
    country: string,
    productSlug: string,
    postSlug: string,
  ): Promise<BlogPostPage | null> => {
    const hrefCode = `${language}-${country}`;
    const found = await getBlogPost("gift-card", hrefCode, productSlug, postSlug);
    if (!found) return null;

    const [entry, names, images] = await Promise.all([
      getGiftCardEntry(language, country),
      getGiftCardProductNames(),
      getGiftCardImagesBySlugs([productSlug]),
    ]);
    const productName = names.get(productSlug);
    if (!entry || !productName) return null;
    // The post links back to its parent page, so that page must exist too.
    const parent = await getGiftCardProductContent(entry, productSlug, productName);
    if (!parent) return null;

    const productPath = giftCardProductPath(hrefCode, productSlug);
    return {
      feature: "gift-card",
      language,
      country,
      productSlug,
      productPath,
      path: blogPostPath(productPath, postSlug),
      imageSrc: images[0].src,
      imageAlt: blogPostImageAlt(found.post.title),
      ...found,
    };
  },
);

/**
 * A top-up post page, or null (404) when the post or its parent level-2 page
 * doesn't exist. Cached so metadata and the page share one lookup.
 */
export const getTopUpBlogPostPage = cache(
  async (
    language: string,
    country: string,
    productSlug: string,
    postSlug: string,
  ): Promise<BlogPostPage | null> => {
    const found = await getBlogPost(
      "top-up",
      `${language}-${country}`,
      productSlug,
      postSlug,
    );
    if (!found) return null;

    const [{ data: languages }, product] = await Promise.all([
      getSeoLanguages(),
      getSeoProduct(productSlug).then(
        (res) => res.data,
        () => null,
      ),
    ]);
    if (!product || !product.is_display) return null;
    if (!isHomeLocale(language, country)) {
      const entry = languages.find(
        (l) => l.language === language && l.country === country,
      );
      if (!entry || !entry.is_display) return null;
    }

    const productPath = pathForLocale(language, country, productSlug);
    return {
      feature: "top-up",
      language,
      country,
      productSlug,
      productPath,
      path: blogPostPath(productPath, postSlug),
      imageSrc: product.logo_url,
      imageAlt: blogPostImageAlt(found.post.title),
      ...found,
    };
  },
);
