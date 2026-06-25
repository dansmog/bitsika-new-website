import Link from "next/link";
import Container from "@/components/layout/Container";
import { featureHref, type FeatureNavItem } from "@/content/features";

type GameNavProps = {
  items: FeatureNavItem[];
  language: string;
  country: string;
  /** Which nav item is currently active (highlighted). */
  activeKey?: FeatureNavItem["key"];
};

export default function GameNav({
  items,
  language,
  country,
  activeKey = "top-ups",
}: GameNavProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Game categories" className="pt-6">
      <Container className="flex font-google-sans flex-nowrap items-center justify-start md:justify-center gap-x-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const baseClass = "shrink-0 whitespace-nowrap text-base tracking-tight";
          const colorClass = isActive ? "text-bitsikaBlue" : "text-black/50";
          const href = featureHref(item.key, language, country);

          console.log(href, item)

          if (href) {
            return (
              <Link
                key={item.key}
                href={href}
                className={`${baseClass} ${colorClass}`}
              >
                {item.label}
              </Link>
            );
          }
          if(item.key.toLowerCase() === 'features'){
            return null;
          }

          return (
            <span
              key={item.key}
              className={`${baseClass} ${
                isActive ? "font-medium text-bitsikaBlue" : "text-black/50"
              }`}
            >
              {item.label}
            </span>
          );
        })}
      </Container>
    </nav>
  );
}
