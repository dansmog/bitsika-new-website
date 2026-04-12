import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/sections/HeroBanner";
import type { HeroContent } from "@/content/shape";

type HeaderProps = {
  hero: HeroContent;
};

export default function Header({ hero }: HeaderProps) {
  return (
    <header className="pb-5.75 bg-surface-subtle border-b border-border-default">
      <Navbar />
      <HeroBanner hero={hero} />
    </header>
  );
}
