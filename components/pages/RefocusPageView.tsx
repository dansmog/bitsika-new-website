import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/FAQ";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import ProductGrid from "@/components/sections/ProductGrid";
import SkuGrid from "@/components/sections/SkuGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";
import { getFeatureNav } from "@/content/features";
import {
  getImages,
  getLanguageOptions,
  getProducts,
  getSkus,
  levelOnePath,
  productPath,
  type ProductKind,
  type RemoteImage,
} from "@/content/refocus";
import type { Content } from "@/content/shape";

/**
 * Artwork for the four CTA banners then the GetStarted card, in order. Level-1
 * pages use a fixed set per kind; level-2 pages use the focus product for all
 * five.
 */
const LEVEL_1_IMAGE_SLUGS: Record<ProductKind, string[]> = {
  "gift-card": ["minecraft", "steam", "fortnite", "roblox", "playstation"],
  "top-up": [
    "free-fire",
    "call-of-duty-mobile",
    "valorant",
    "mobile-legends-bang-bang",
    "pubg-mobile",
  ],
};

/** Which nav item is highlighted for each page family. */
const ACTIVE_FEATURE: Record<ProductKind, string> = {
  "gift-card": "gift-cards",
  "top-up": "top-ups",
};

type RefocusPageViewProps = {
  kind: ProductKind;
  language: string;
  content: Content;
} & (
  | { level: 1; slug?: never; moreGamesHeading?: never }
  | { level: 2; slug: string; moreGamesHeading: string }
);

/**
 * Shared body for all four page types (gift-card and top-up, levels 1 and 2).
 * The section order below is the refocused template: info-block rows 3 and 4,
 * the competitor "vs." section and the blog section are deliberately absent.
 * The comparison table stays.
 */
export default async function RefocusPageView(props: RefocusPageViewProps) {
  const { kind, language, content, level } = props;
  const imageSlugs =
    level === 2
      ? Array(5).fill(props.slug)
      : LEVEL_1_IMAGE_SLUGS[kind];

  const [products, featureNav, languageOptions, skus, images] =
    await Promise.all([
      getProducts(kind),
      getFeatureNav(language),
      getLanguageOptions((lang) =>
        level === 2
          ? productPath(kind, lang, props.slug)
          : levelOnePath(kind, lang),
      ),
      level === 2 ? getSkus(kind, props.slug) : Promise.resolve([]),
      getImages(kind, imageSlugs),
    ]);

  const ctaImages: RemoteImage[] = images.slice(0, 4);
  const stepsImage: RemoteImage = images[4];

  // The level-2 carousel is headed "More …", so the product whose page we are
  // on is left out of it.
  const moreProducts =
    level === 2 ? products.filter((p) => p.slug !== props.slug) : products;

  return (
    <main>
      <Header
        hero={content.hero}
        language={language}
        languageOptions={languageOptions}
        h2Href={level === 2 ? levelOnePath(kind, language) : undefined}
        activeFeature={ACTIVE_FEATURE[kind]}
      />

      {level === 2 ? (
        <SkuGrid skus={skus} />
      ) : (
        <ProductGrid products={products} kind={kind} language={language} />
      )}

      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner cta={content.ctas[0]} hero={content.hero} image={ctaImages[0]} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />

      {level === 2 && (
        <ProductGrid
          products={moreProducts}
          kind={kind}
          language={language}
          title={props.moreGamesHeading}
        />
      )}

      <CtaBanner cta={content.ctas[1]} hero={content.hero} image={ctaImages[1]} />
      <GetStarted steps={content.steps} image={stepsImage} />
      <CtaBanner cta={content.ctas[2]} hero={content.hero} image={ctaImages[2]} />
      <Testimonials testimonials={content.testimonials} />
      <CtaBanner cta={content.ctas[3]} hero={content.hero} image={ctaImages[3]} />
      <FAQ faq={content.faq} />
      <Footer
        footer={content.footer}
        hero={content.hero}
        featureNav={featureNav}
        language={language}
      />
    </main>
  );
}
