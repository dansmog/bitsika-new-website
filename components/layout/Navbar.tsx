import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import SearchBar from "@/components/ui/SearchBar";
import LanguageSelector from "@/components/ui/LanguageSelector";
import GameNav from "@/components/layout/GameNav";
import { getFeatureNav, type FeatureNavKey } from "@/content/features";
import { levelOnePath, type LanguageOption } from "@/content/refocus";

type NavbarProps = {
  language: string;
  /** Language dropdown options, pointing at this page's equivalent per language. */
  languageOptions: LanguageOption[];
  /** Feature whose page is currently open (highlighted in the nav). */
  activeFeature?: FeatureNavKey;
};

export default async function Navbar({
  language,
  languageOptions,
  activeFeature = "gift-cards",
}: NavbarProps) {
  const featureNav = await getFeatureNav(language);

  return (
    <nav className="pb-6">
      <Container className="flex items-center gap-3 md:gap-6 pt-5 md:pt-6">
        <Link
          href={levelOnePath("gift-card", language)}
          aria-label="Bitsika home"
          className="shrink-0"
        >
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

        <LanguageSelector
          options={languageOptions}
          activeLanguage={language}
        />
      </Container>

      <GameNav
        items={featureNav}
        language={language}
        activeKey={activeFeature}
      />
    </nav>
  );
}
