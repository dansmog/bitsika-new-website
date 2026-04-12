import type { Locale } from "./sources";

export type Meta = {
  title: string;
  description: string;
  hreflang: string;
};

export type HeroContent = {
  h1: string;
  h2: string;
  googlePlayStat: string;
  userCount: string;
  qrLabel: string;
  desktopGooglePlayLabel: string;
  desktopAppStoreLabel: string;
  mobileGooglePlayLabel: string;
  mobileAppStoreLabel: string;
};

export type InfoBoxCard = {
  title: string;
  description: string;
  checklistItems: string[];
};

export type CtaContent = {
  heading: string;
  text: string;
};

export type ComparisonContent = {
  heading: string;
  text: string;
};

export type TableContent = {
  heading: string;
  text: string;
  headers: string[];
  rows: Array<{ label: string; cells: string[] }>;
};

export type StepsContent = {
  heading: string;
  description: string;
  steps: Array<{ title: string; text: string }>;
};

export type TestimonialsContent = {
  heading: string;
  items: Array<{ user: string; location: string; text: string }>;
};

export type BlogContent = {
  heading: string;
  text: string;
};

export type FaqContent = {
  heading: string;
  items: Array<{ question: string; answer: string }>;
};

export type FooterContent = {
  resourceLabel: string;
  resources: string[];
  socialLabel: string;
  socials: string[];
  contactLabel: string;
  contactEmail: string;
  copyright: string;
};

export type Content = {
  locale: Locale;
  meta: Meta;
  hero: HeroContent;
  infoBoxGroups: InfoBoxCard[][];
  ctas: CtaContent[];
  comparison: ComparisonContent;
  table: TableContent;
  steps: StepsContent;
  testimonials: TestimonialsContent;
  blog: BlogContent;
  faq: FaqContent;
  footer: FooterContent;
};

const INFO_BOX_COUNT = 12;
const INFO_BOXES_PER_GROUP = 3;
const CTA_COUNT = 4;
const TABLE_COLUMNS = ["a", "b", "c", "d", "e"] as const;
const TABLE_DATA_ROW_COUNT = 12;
const STEPS_COUNT = 3;
const TESTIMONIAL_COUNT = 5;
const FAQ_COUNT = 15;
const FOOTER_RESOURCE_COUNT = 4;
const FOOTER_SOCIAL_COUNT = 4;

export function buildContent(
  locale: Locale,
  map: Map<string, string>,
): Content {
  const get = (key: string) => map.get(key) ?? "";

  const infoBoxes: InfoBoxCard[] = Array.from(
    { length: INFO_BOX_COUNT },
    (_, i) => {
      const n = i + 1;
      return {
        title: get(`info-box-heading-${n}`),
        description: get(`info-box-text-${n}`),
        checklistItems: [
          get(`info-box-point-a-${n}`),
          get(`info-box-point-b-${n}`),
          get(`info-box-point-c-${n}`),
        ],
      };
    },
  );

  const infoBoxGroups: InfoBoxCard[][] = [];
  for (let i = 0; i < infoBoxes.length; i += INFO_BOXES_PER_GROUP) {
    infoBoxGroups.push(infoBoxes.slice(i, i + INFO_BOXES_PER_GROUP));
  }

  const ctas: CtaContent[] = Array.from({ length: CTA_COUNT }, (_, i) => ({
    heading: get(`cta-heading-${i + 1}`),
    text: get(`cta-text-${i + 1}`),
  }));

  const tableHeaders = TABLE_COLUMNS.map((col) => get(`table-cell-${col}-1`));
  const tableDataCols = TABLE_COLUMNS.slice(1);
  const tableRows = Array.from({ length: TABLE_DATA_ROW_COUNT }, (_, i) => {
    const r = i + 2;
    return {
      label: get(`table-cell-a-${r}`),
      cells: tableDataCols.map((col) => get(`table-cell-${col}-${r}`)),
    };
  });

  const stepsItems = Array.from({ length: STEPS_COUNT }, (_, i) => ({
    title: get(`steps-title-${i + 1}`),
    text: get(`steps-text-${i + 1}`),
  }));

  const testimonialItems = Array.from(
    { length: TESTIMONIAL_COUNT },
    (_, i) => ({
      user: get(`testimonial-user-${i + 1}`),
      location: get(`testimonial-location-${i + 1}`),
      text: get(`testimonial-text-${i + 1}`),
    }),
  );

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: get(`faq-question-${i + 1}`),
    answer: get(`faq-answer-${i + 1}`),
  }));

  const rawResources = Array.from({ length: FOOTER_RESOURCE_COUNT }, (_, i) =>
    get(`footer-resource-${i + 1}`),
  );
  const rawSocials = Array.from({ length: FOOTER_SOCIAL_COUNT }, (_, i) =>
    get(`footer-social-${i + 1}`),
  );
  const isBlog = (label: string) => label.trim().toLowerCase() === "blog";
  const blogLabel =
    rawResources.find(isBlog) ?? rawSocials.find(isBlog) ?? "";
  const resources = [
    ...rawResources.filter((l) => l && !isBlog(l)),
    ...(blogLabel ? [blogLabel] : []),
  ];
  const socials = rawSocials.filter((l) => l && !isBlog(l));

  return {
    locale,
    meta: {
      title: get("meta-title"),
      description: get("meta-description"),
      hreflang: get("hreflang") || locale,
    },
    hero: {
      h1: get("hero-h1"),
      h2: get("hero-h2"),
      googlePlayStat: get("google-play-stat"),
      userCount: get("user-count"),
      qrLabel: get("qr-label"),
      desktopGooglePlayLabel: get("desktop-google-play-label"),
      desktopAppStoreLabel: get("desktop-app-store-label"),
      mobileGooglePlayLabel: get("mobile-google-play-label"),
      mobileAppStoreLabel: get("mobile-app-store-label"),
    },
    infoBoxGroups,
    ctas,
    comparison: {
      heading: get("comparison-heading"),
      text: get("comparison-text"),
    },
    table: {
      heading: get("table-heading"),
      text: get("table-text"),
      headers: tableHeaders,
      rows: tableRows,
    },
    steps: {
      heading: get("steps-heading"),
      description: get("steps-description"),
      steps: stepsItems,
    },
    testimonials: {
      heading: get("testimonial-heading"),
      items: testimonialItems,
    },
    blog: {
      heading: get("blog-heading"),
      text: get("blog-text"),
    },
    faq: {
      heading: get("faq-heading"),
      items: faqItems,
    },
    footer: {
      resourceLabel: get("footer-resource-label"),
      resources,
      socialLabel: get("footer-social-label"),
      socials,
      contactLabel: get("footer-contact-label"),
      contactEmail: get("footer-contact-1"),
      copyright: get("footer-copyright-label"),
    },
  };
}
