import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuiltDifferent from "@/components/sections/BuiltDifferent";
import FAQ from "@/components/sections/FAQ";
import InsideBitsika from "@/components/sections/InsideBitsika";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import GamesGrid from "@/components/sections/GamesGrid";
import ProductSkusGrid from "@/components/sections/ProductSkusGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";
import { getImageContent } from "@/content";
import { buildContent } from "@/content/shape";
import {
  getSeoLanguageProduct,
  getSeoProduct,
  type SeoProduct,
} from "@/content/api";
import { getCompetitorSlugsForLocale } from "@/content/competitors";
import { getFeatureNav } from "@/content/features";
import { pathForLocale } from "@/content/seo";

type ProductDetailsViewProps = {
  language: string;
  country: string;
  product: SeoProduct;
};

export default async function ProductDetailsView({
  language,
  country,
  product,
}: ProductDetailsViewProps) {
  const [imageContent, productRes, languageProductRes, linkedSlugs, featureNav] =
    await Promise.all([
      getImageContent(),
      getSeoProduct(product.slug),
      getSeoLanguageProduct(product.slug, language, country),
      getCompetitorSlugsForLocale(language, country),
      getFeatureNav(language),
    ]);

  const products = productRes.other_products || [];

  const localizedProduct = languageProductRes.data.product;
  const content = buildContent(
    `${language}-${country}`,
    new Map(Object.entries(languageProductRes.data.translations)),
  );

  const productImage = {
    src: localizedProduct.logo_url,
    alt: `${localizedProduct.name} game icon`,
  };

  const ctaImages = [productImage, productImage, productImage, productImage];
  const stepsImage = productImage;

  return (
    <main>
      <Header
        hero={content.hero}
        language={language}
        country={country}
        productSlug={product.slug}
        h2Href={pathForLocale(language, country)}
      />
      <ProductSkusGrid
        skus={localizedProduct.skus}
        productName={localizedProduct.name}
        productImage={localizedProduct.logo_url}
      />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner
        cta={content.ctas[0]}
        hero={content.hero}
        image={ctaImages[0]}
      />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <GamesGrid
        isProductView
        products={products}
        title={languageProductRes?.data?.translations["more-games-heading"]}
        language={language}
        country={country}
      />
      <CtaBanner
        cta={content.ctas[1]}
        hero={content.hero}
        image={ctaImages[1]}
      />
      <GetStarted steps={content.steps} image={stepsImage} />
      <InfoBlock cards={content.infoBoxGroups[2]} />

      <CtaBanner
        cta={content.ctas[2]}
        hero={content.hero}
        image={ctaImages[2]}
      />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner
        cta={content.ctas[3]}
        hero={content.hero}
        image={ctaImages[3]}
      />
      <BuiltDifferent
        comparison={content.comparison}
        vrs={imageContent.vrs}
        language={language}
        country={country}
        linkedSlugs={linkedSlugs}
      />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer
        footer={content.footer}
        hero={content.hero}
        featureNav={featureNav}
        language={language}
        country={country}
      />
    </main>
  );
}
