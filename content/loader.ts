import { buildContent, type Content } from "./shape";
import { buildImageContent, type ImageContent } from "./imageShape";
import {
  CONTENT_SOURCES,
  DEFAULT_LOCALE,
  IMAGE_CONTENT_SOURCES,
  type Locale,
} from "./sources";

type ContentEntry = {
  variable: string;
  html: string;
  context?: string;
  text: string;
};

async function fetchEntries(url: string, locale: Locale): Promise<Map<string, string>> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(
      `Failed to load content from ${url} for locale "${locale}" (${res.status})`,
    );
  }
  const entries = (await res.json()) as ContentEntry[];
  return new Map(entries.map((e) => [e.variable, e.text]));
}

export async function getContent(
  locale: Locale = DEFAULT_LOCALE,
): Promise<Content> {
  const map = await fetchEntries(CONTENT_SOURCES[locale], locale);
  return buildContent(locale, map);
}

export async function getImageContent(
  locale: Locale = DEFAULT_LOCALE,
): Promise<ImageContent> {
  const map = await fetchEntries(IMAGE_CONTENT_SOURCES[locale], locale);
  return buildImageContent(locale, map);
}

export type { Content, ImageContent };
