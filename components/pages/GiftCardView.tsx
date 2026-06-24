import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuiltDifferent from "@/components/sections/BuiltDifferent";
import FAQ from "@/components/sections/FAQ";
import InsideBitsika from "@/components/sections/InsideBitsika";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import GiftCardGamesGrid from "@/components/sections/GiftCardGamesGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";
import { getImageContent } from "@/content";
import { getSeoProduct, type SeoProduct } from "@/content/api";
import { getFeatureNav } from "@/content/features";
import {
  getGiftCardContent,
  getGiftCardCountries,
  getGiftCardProducts,
  getGiftCardSecondary,
  type LangCountryEntry,
} from "@/content/giftcard";

type GiftCardViewProps = {
  language: string;
  country: string;
  entry: LangCountryEntry;
};

export default async function GiftCardView({
  language,
  country,
  entry,
}: GiftCardViewProps) {
  const [
    content,
    imageContent,
    products,
    secondary,
    pubgMobileRes,
    freeFireRes,
    codMobileRes,
    afkJourneyRes,
    mlbbRes,
    giftCardCountries,
    featureNav,
  ] = await Promise.all([
    getGiftCardContent(entry),
    getImageContent(),
    getGiftCardProducts(),
    getGiftCardSecondary(),
    getSeoProduct("pubg-mobile"),
    getSeoProduct("free-fire"),
    getSeoProduct("call-of-duty-mobile"),
    getSeoProduct("afk-journey"),
    getSeoProduct("mobile-legends-bang-bang"),
    getGiftCardCountries(),
    getFeatureNav(language),
  ]);

  const productImage = (p: SeoProduct) => ({
    src: p.logo_url,
    alt: `${p.name} game icon`,
  });
  const ctaImages = [
    productImage(freeFireRes.data),
    productImage(codMobileRes.data),
    productImage(afkJourneyRes.data),
    productImage(mlbbRes.data),
  ];
  const stepsImage = productImage(pubgMobileRes.data);

  return (
    <main>
      <Header
        hero={content.hero}
        language={language}
        country={country}
        giftCardCountries={giftCardCountries}
        activeFeature="gift-cards"
      />
      <GiftCardGamesGrid products={products} />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner cta={content.ctas[0]} hero={content.hero} image={ctaImages[0]} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
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
