import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuiltDifferent from "@/components/sections/BuiltDifferent";
import FAQ from "@/components/sections/FAQ";
import InsideBitsika from "@/components/sections/InsideBitsika";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import GiftCardGamesGrid from "@/components/sections/GiftCardGamesGrid";
import GiftCardSkuGrid from "@/components/sections/GiftCardSkuGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";
import { getImageContent } from "@/content";
import { getFeatureNav } from "@/content/features";
import {
  getGiftCardImagesBySlugs,
  getGiftCardProductCountries,
  getGiftCardProductExtras,
  getGiftCardSecondary,
  giftCardPath,
} from "@/content/giftcard";
import type { Content } from "@/content/shape";

type GiftCardProductViewProps = {
  language: string;
  country: string;
  slug: string;
  content: Content;
  moreGamesHeading: string;
};

export default async function GiftCardProductView({
  language,
  country,
  slug,
  content,
  moreGamesHeading,
}: GiftCardProductViewProps) {
  const [
    imageContent,
    extras,
    secondary,
    focusImages,
    giftCardCountries,
    featureNav,
  ] = await Promise.all([
    getImageContent(),
    getGiftCardProductExtras(slug),
    getGiftCardSecondary(),
    getGiftCardImagesBySlugs([slug]),
    getGiftCardProductCountries(slug),
    getFeatureNav(language),
  ]);

  const langCountry = `${language}-${country}`;

  // All four CTAs and the GetStarted image use the focus product's artwork.
  const focusImage = focusImages[0];
  const ctaImages = [focusImage, focusImage, focusImage, focusImage];
  const stepsImage = focusImage;

  return (
    <main>
      <Header
        hero={content.hero}
        language={language}
        country={country}
        giftCardCountries={giftCardCountries}
        activeFeature="gift-cards"
        h2Href={giftCardPath(langCountry)}
      />
      <GiftCardSkuGrid skus={extras.skus} />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner cta={content.ctas[0]} hero={content.hero} image={ctaImages[0]} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <GiftCardGamesGrid
        products={extras.moreProducts}
        langCountry={langCountry}
        title={moreGamesHeading}
      />
      <CtaBanner cta={content.ctas[1]} hero={content.hero} image={ctaImages[1]} />
      <GetStarted steps={content.steps} image={stepsImage} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner cta={content.ctas[2]} hero={content.hero} image={ctaImages[2]} />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner cta={content.ctas[3]} hero={content.hero} image={ctaImages[3]} />
      <BuiltDifferent
        comparison={content.comparison}
        vrs={secondary.vrs}
        language={language}
        country={country}
        linkedSlugs={new Set()}
      />
      <InsideBitsika blog={content.blog} articles={secondary.blogs} />
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
