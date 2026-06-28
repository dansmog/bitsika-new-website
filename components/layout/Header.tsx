import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/sections/HeroBanner";
import type { HeroContent } from "@/content/shape";
import type { FeatureNavKey } from "@/content/features";
import type { GiftCardCountry } from "@/content/giftcard";

type HeaderProps = {
  hero: HeroContent;
  language: string;
  country: string;
  productSlug?: string;
  h2Href?: string;
  competitorSlug?: string;
  competitorLocales?: string[];
  /** When set, the country selector lists the gift-card lang-country pages. */
  giftCardCountries?: GiftCardCountry[];
  /** Feature whose level-1 page is currently open (highlighted in the nav). */
  activeFeature?: FeatureNavKey;
};

export default function Header({
  hero,
  language,
  country,
  productSlug,
  h2Href,
  competitorSlug,
  competitorLocales,
  giftCardCountries,
  activeFeature,
}: HeaderProps) {
  return (
    <header className="pb-5.75 bg-surface-subtle border-b border-border-default">
      <Navbar
        language={language}
        country={country}
        productSlug={productSlug}
        competitorSlug={competitorSlug}
        competitorLocales={competitorLocales}
        giftCardCountries={giftCardCountries}
        activeFeature={activeFeature}
      />
      <HeroBanner hero={hero} h2Href={h2Href} />
    </header>
  );
}
