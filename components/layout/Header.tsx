import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/sections/HeroBanner";
import type { HeroContent } from "@/content/shape";
import type { FeatureNavKey } from "@/content/features";
import type { LanguageOption } from "@/content/refocus";

type HeaderProps = {
  hero: HeroContent;
  language: string;
  /** Language dropdown options, pointing at this page's equivalent per language. */
  languageOptions: LanguageOption[];
  /** Target for the `**bold**` span in the hero H2 — one level up. */
  h2Href?: string;
  /** Feature whose page is currently open (highlighted in the nav). */
  activeFeature?: FeatureNavKey;
};

export default function Header({
  hero,
  language,
  languageOptions,
  h2Href,
  activeFeature,
}: HeaderProps) {
  return (
    <header className="pb-5.75 bg-surface-subtle border-b border-border-default">
      <Navbar
        language={language}
        languageOptions={languageOptions}
        activeFeature={activeFeature}
      />
      <HeroBanner hero={hero} h2Href={h2Href} />
    </header>
  );
}
