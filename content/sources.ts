export const DEFAULT_LOCALE = "en-US" as const;

export const CONTENT_SOURCES = {
  "en-US": "https://bitsika.github.io/game-homepage/main-content.json",
} as const;

export const IMAGE_CONTENT_SOURCES = {
  "en-US": "https://bitsika.github.io/game-homepage/image-content.json",
} as const;

export const IMAGE_BASE_PATH = "/images/images";

export type Locale = keyof typeof CONTENT_SOURCES;
