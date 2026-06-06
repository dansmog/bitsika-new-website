import { buildContent, type Content } from "./shape";
import { buildImageContent, type ImageContent } from "./imageShape";
import { getSeoLanguageProduct, getSeoTranslations } from "./api";
import {
  IMAGE_CONTENT_SOURCES,
  IMAGE_BASE_PATH,
  DEFAULT_LOCALE,
  type ImageLocale,
} from "./sources";

type ImageContentEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
};

export async function getContent(
  language: string,
  country: string,
): Promise<Content> {
  const res = await getSeoTranslations(language, country);
  const map = new Map(Object.entries(res.data.translations));
  return buildContent(`${language}-${country}`, map);
}

export async function getProductContent(
  slug: string,
  language: string,
  country: string,
): Promise<Content> {
  const res = await getSeoLanguageProduct(slug, language, country);
  const map = new Map(Object.entries(res.data.translations));
  return buildContent(`${language}-${country}`, map);
}

export async function getImageContent(
  locale: ImageLocale = DEFAULT_LOCALE,
): Promise<ImageContent> {
  const url = IMAGE_CONTENT_SOURCES[locale];
  console.log({url})
  const bustUrl = `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await fetch(bustUrl, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to load image content from ${url} for locale "${locale}" (${res.status})`,
    );
  }
  const entries = (await res.json()) as ImageContentEntry[];

  console.log({entries})

  const vrsImages = entries.filter((e) =>
    e.variable.startsWith("vrs-company-image-"),
  );
  console.log(
    "[getImageContent] vrs-company-image-* entries from image-content.json:",
    vrsImages,
  );
  console.log(
    "[getImageContent] resolved vrs image URLs:",
    vrsImages.map((e) => ({
      variable: e.variable,
      text: e.text,
      url: e.text ? `${IMAGE_BASE_PATH}/${e.text}` : "",
    })),
  );

  const map = new Map(entries.map((e) => [e.variable, e.text]));
  return buildImageContent(locale, map);
}

export type { Content, ImageContent };
