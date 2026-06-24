import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import type { GiftCardProduct } from "@/content/giftcard";

type GiftCardGamesGridProps = {
  products: GiftCardProduct[];
  title?: string;
};

/**
 * Product grid for the gift-card pages. Mirrors the homepage GamesGrid layout
 * but renders gift-card brands (image, alt, brand name — no in-game currency)
 * sourced from GitHub, and the cards do not link anywhere.
 */
export default function GiftCardGamesGrid({
  products,
  title,
}: GiftCardGamesGridProps) {
  return (
    <section className="bg-surface-white pt-5.75 md:pt-13.5 pb-13.25 md:pb-20">
      <Container>
        {title && (
          <h2 className="text-2xl md:text-3xl font-google-sans font-medium text-left mb-8">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {products.map((product) => (
            <GameCard
              key={product.slug}
              image={product.image}
              alt={product.alt}
              title={product.brandName}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
