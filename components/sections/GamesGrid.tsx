import Link from "next/link";
import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import type { SeoProduct } from "@/content/api";
import { isHomeLocale } from "@/content/seo";

type GamesGridProps = {
  products: SeoProduct[];
  language: string;
  country: string;
};

export default function GamesGrid({
  products,
  language,
  country,
}: GamesGridProps) {
  const productHref = (slug: string) =>
    isHomeLocale(language, country)
      ? `/${slug}`
      : `/${language}-${country}/${slug}`;

  return (
    <section className="bg-surface-white pt-5.75 md:pt-13.5 pb-13.25 md:pb-20">
      <Container>
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {products.map((product) => (
            <Link key={product.id} href={productHref(product.slug)}>
              <GameCard
                image={product.logo_url}
                alt={`${product.name} game icon`}
                title={product.name}
                subtitle={product.game_currency}
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
