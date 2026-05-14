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
import { getContent, getImageContent } from "@/content";
import { getSeoProducts, type SeoProduct } from "@/content/api";
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
  const [content, imageContent, productsRes] = await Promise.all([
    getContent(language, country),
    getImageContent(),
    getSeoProducts(),
  ]);

  const products = productsRes.data
    .filter((p) => p.is_popular)
    .sort((a, b) => a.order - b.order);

  const productImage = {
    src: product.logo_url,
    alt: `${product.name} game icon`,
  };
  const ctaImages = [productImage, productImage, productImage, productImage];
  const stepsImage = productImage;

  console.log("the content", content)
  console.log("the product", products)
  console.log("the image content", imageContent)

  return (
    <main>
      <Header
        hero={content.hero}
        productSlug={product.slug}
        h2Href={pathForLocale(language, country)}
      />
      <ProductSkusGrid
        skus={product.skus}
        productName={product.name}
        productImage={product.logo_url}
      />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner
        cta={content.ctas[0]}
        hero={content.hero}
        image={ctaImages[0]}
      />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <GamesGrid isProductView products={products} language={language} country={country} />
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
      <BuiltDifferent comparison={content.comparison} vrs={imageContent.vrs} />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
