import { IMAGE_BASE_PATH, type Locale } from "./sources";

export type RemoteImage = {
  src: string;
  alt: string;
};

export type ProductCard = {
  name: string;
  credit: string;
  image: RemoteImage;
};

export type VrsCompany = {
  name: string;
  anchor: string;
  image: RemoteImage;
};

export type BlogArticle = {
  title: string;
  image: RemoteImage;
};

export type ImageContent = {
  locale: Locale;
  products: ProductCard[];
  ctaImages: RemoteImage[];
  stepsImage: RemoteImage;
  vrs: VrsCompany[];
  blogs: BlogArticle[];
  testimonialImages: RemoteImage[];
};

const PRODUCT_COUNT = 20;
const CTA_IMAGE_COUNT = 4;
const VRS_COUNT = 8;
const BLOG_COUNT = 6;
const TESTIMONIAL_COUNT = 5;

const toSrc = (filename: string) =>
  filename ? `${IMAGE_BASE_PATH}/${filename}` : "";

export function buildImageContent(
  locale: Locale,
  map: Map<string, string>,
): ImageContent {
  const get = (key: string) => map.get(key) ?? "";

  const products: ProductCard[] = Array.from(
    { length: PRODUCT_COUNT },
    (_, i) => {
      const n = i + 1;
      return {
        name: get(`product-name-${n}`),
        credit: get(`product-credit-${n}`),
        image: {
          src: toSrc(get(`product-image-${n}`)),
          alt: get(`product-alt-text-${n}`),
        },
      };
    },
  );

  const ctaImages: RemoteImage[] = Array.from(
    { length: CTA_IMAGE_COUNT },
    (_, i) => ({
      src: toSrc(get(`cta-image-${i + 1}`)),
      alt: get(`cta-alt-text-${i + 1}`),
    }),
  );

  const stepsImage: RemoteImage = {
    src: toSrc(get("steps-image")),
    alt: get("steps-alt-text"),
  };

  const vrs: VrsCompany[] = Array.from({ length: VRS_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      name: get(`vrs-company-name-${n}`),
      anchor: get(`vrs-company-anchor-${n}`),
      image: {
        src: toSrc(get(`vrs-company-image-${n}`)),
        alt: get(`vrs-company-alt-text-${n}`),
      },
    };
  });

  const blogs: BlogArticle[] = Array.from({ length: BLOG_COUNT }, (_, i) => {
    const n = i + 1;
    return {
      title: get(`blog-text-${n}`),
      image: {
        src: toSrc(get(`blog-image-${n}`)),
        alt: get(`blog-alt-text-${n}`),
      },
    };
  });

  const testimonialImages: RemoteImage[] = Array.from(
    { length: TESTIMONIAL_COUNT },
    (_, i) => ({
      src: toSrc(get(`testimonial-image-${i + 1}`)),
      alt: get(`testimonial-alt-text-${i + 1}`),
    }),
  );

  return {
    locale,
    products,
    ctaImages,
    stepsImage,
    vrs,
    blogs,
    testimonialImages,
  };
}
