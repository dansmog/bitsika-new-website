export const DEFAULT_LOCALE = "en-US" as const;

export const GAME_HOMEPAGE_BASE = "https://bitsika.github.io/game-homepage";

export const IMAGE_CONTENT_SOURCES = {
  "en-US": `${GAME_HOMEPAGE_BASE}/image-content.json`,
} as const;

export const IMAGE_BASE_PATH = `${GAME_HOMEPAGE_BASE}/images`;

export type ImageLocale = keyof typeof IMAGE_CONTENT_SOURCES;
export type Locale = string;
