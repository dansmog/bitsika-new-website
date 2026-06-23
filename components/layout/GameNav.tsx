import Link from "next/link";
import Container from "@/components/layout/Container";
import type { FeatureNavItem } from "@/content/features";
import { pathForLocale } from "@/content/seo";

type GameNavProps = {
  items: FeatureNavItem[];
  language: string;
  country: string;
  /** Which nav item is currently active (highlighted). */
  activeKey?: FeatureNavItem["key"];
};

/**
 * Route segment each feature links to, relative to the locale. `top-ups` maps
 * to the locale home (empty segment). Keys not listed here are not yet
 * linkable and render as plain text.
 */
const FEATURE_SLUGS: Partial<Record<FeatureNavItem["key"], string>> = {
  "top-ups": "",
  "gift-cards": "gift-card",
};

export default function GameNav({
  items,
  language,
  country,
  activeKey = "top-ups",
}: GameNavProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Game categories">
      <Container className="flex font-google-sans flex-nowrap items-center justify-start md:justify-center gap-x-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const baseClass = "shrink-0 whitespace-nowrap text-sm tracking-tight";
          const slug = FEATURE_SLUGS[item.key];
          const colorClass = isActive ? "text-bitsikaBlue" : "text-black/50";

          if (slug !== undefined) {
            return (
              <Link
                key={item.key}
                href={pathForLocale(language, country, slug || undefined)}
                className={`${baseClass} font-medium ${colorClass}`}
              >
                {item.label}
              </Link>
            );
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
