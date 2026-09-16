import Link from "next/link";
import Container from "@/components/layout/Container";
import { featureHref, type FeatureNavItem } from "@/content/features";

type GameNavProps = {
  items: FeatureNavItem[];
  language: string;
  /** Which nav item is currently active (highlighted). */
  activeKey?: FeatureNavItem["key"];
};

export default function GameNav({
  items,
  language,
  activeKey = "gift-cards",
}: GameNavProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Features" className="pt-6">
      <Container className="flex font-google-sans flex-nowrap items-center justify-start md:justify-center gap-x-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          // The "features" entry is a footer column heading, not a nav item.
          if (item.key.toLowerCase() === "features") return null;

          const isActive = item.key === activeKey;
          const baseClass =
            "shrink-0 whitespace-nowrap text-base tracking-tight";
          const href = featureHref(item.key, language);

          if (href) {
            return (
              <Link
                key={item.key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`${baseClass} ${
                  isActive ? "font-medium text-bitsikaBlue" : "text-black/50"
                }`}
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
