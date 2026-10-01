const API_BASE_URL = "https://transaction-api.bartelssneath.com/api/v2";

type ApiEnvelope<T> = {
  data: T;
  status: string;
  message: string;
};

export type SeoLanguage = {
  id: string;
  language: string;
  country: string;
  en_country: string;
  endo_country: string;
  en_lang: string;
  endo_lang: string;
  is_display: boolean;
  logo_url: string | null;
  translations: unknown[];
};

export type SeoTranslation = {
  id: string;
  language: string;
  country: string;
  en_country: string;
  endo_country: string;
  en_lang: string;
  endo_lang: string;
  is_display: boolean;
  translations: Record<string, string>;
};

export type SeoProduct = {
  id: string;
  bitsika_id: string;
  name: string;
  description: string;
  slug: string;
  logo_url: string;
  game_currency: string;
  is_display: boolean;
  is_popular: boolean;
  order: number;
  skus: string[];
  category: {
    id: string;
    name: string;
    description: string;
    slug: string;
    order: number;
    products_count: number | null;
    logo_url: string;
  };
};

async function fetchJson<T>(path: string): Promise<ApiEnvelope<T>> {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`);
  }
  return (await res.json()) as ApiEnvelope<T>;
}

export function getSeoLanguages() {
  return fetchJson<SeoLanguage[]>("/seo/languages");
}

export function getSeoTranslations(language: string, country: string) {
  return fetchJson<SeoTranslation>(
    `/seo/languages/translation?language=${encodeURIComponent(language)}&country=${encodeURIComponent(country)}`,
  );
}

export function getSeoProducts() {
  return fetchJson<SeoProduct[]>("/seo/products");
}

export type SeoProductResponse = ApiEnvelope<SeoProduct> & {
  other_products?: SeoProduct[];
};

export function getSeoProduct(slug: string): Promise<SeoProductResponse> {
  return fetchJson<SeoProduct>(
    `/seo/product?slug=${encodeURIComponent(slug)}`,
  ) as Promise<SeoProductResponse>;
}

export type SeoLanguageProduct = {
  id: string;
  product: SeoProduct;
  language: {
    id: string;
    language: string;
    country: string;
    logo_url: string | null;
    en_country: string;
    endo_country: string;
    en_lang: string;
    endo_lang: string;
    is_display: boolean;
  };
  translations: Record<string, string>;
};

export function getSeoLanguageProduct(
  slug: string,
  language: string,
  country: string,
) {
  return fetchJson<SeoLanguageProduct>(
    `/seo/language/product?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(language)}&country=${encodeURIComponent(country)}`,
  );
}
