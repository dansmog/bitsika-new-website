export const DEFAULT_LOCALE = "en-US" as const;

export const IMAGE_CONTENT_SOURCES = {
  "en-US": "https://bitsika.github.io/game-homepage/image-content.json",
} as const;

export const IMAGE_BASE_PATH = "/images/images";

export type ImageLocale = keyof typeof IMAGE_CONTENT_SOURCES;
export type Locale = string;
