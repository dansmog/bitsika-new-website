import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SearchBar from "@/components/ui/SearchBar";
import CountrySelector from "@/components/ui/CountrySelector";
import GameNav from "@/components/layout/GameNav";
import { getSeoLanguages } from "@/content/api";
import { getFeatureNav, type FeatureNavKey } from "@/content/features";
import type { GiftCardCountry } from "@/content/giftcard";

type NavbarProps = {
  language: string;
  country: string;
  productSlug?: string;
  competitorSlug?: string;
  competitorLocales?: string[];
  /** When set, the country selector lists the gift-card lang-country pages. */
  giftCardCountries?: GiftCardCountry[];
  /** Feature whose level-1 page is currently open (highlighted in the nav). */
  activeFeature?: FeatureNavKey;
};

export default async function Navbar({
  language,
  country,
  productSlug,
  competitorSlug,
  competitorLocales,
  giftCardCountries,
  activeFeature = "top-ups",
}: NavbarProps) {
  const [{ data: languages }, featureNav] = await Promise.all([
    getSeoLanguages(),
    getFeatureNav(language),
  ]);

  return (
    <nav className="pb-6">
      <Container className="flex items-center gap-3 md:gap-6 pt-5 md:pt-6">
        <Link href="/" aria-label="Bitsika home" className="shrink-0">
          <Image
            src="/images/bitsika-logo.png"
            alt="Bitsika"
            width={94}
            height={35.96}
            className="object-contain w-21.75 h-auto lg:w-23.5"
            priority
          />
        </Link>

        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        <CountrySelector
          languages={languages}
          productSlug={productSlug}
          competitorSlug={competitorSlug}
          competitorLocales={competitorLocales}
          giftCardCountries={giftCardCountries}
        />
      </Container>

      <GameNav
        items={featureNav}
        language={language}
        country={country}
        activeKey={activeFeature}
      />
    </nav>
  );
}
