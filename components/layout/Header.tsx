import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/sections/HeroBanner";
import type { HeroContent } from "@/content/shape";

type HeaderProps = {
  hero: HeroContent;
  productSlug?: string;
  h2Href?: string;
  competitorSlug?: string;
  competitorLocales?: string[];
};

export default function Header({
  hero,
  productSlug,
  h2Href,
  competitorSlug,
  competitorLocales,
}: HeaderProps) {
  return (
    <header className="pb-5.75 bg-surface-subtle border-b border-border-default">
      <Navbar
        productSlug={productSlug}
        competitorSlug={competitorSlug}
        competitorLocales={competitorLocales}
      />
      <HeroBanner hero={hero} h2Href={h2Href} />
    </header>
  );
}
