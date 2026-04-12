import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import type { ProductCard } from "@/content/imageShape";

type GamesGridProps = {
  products: ProductCard[];
};

export default function GamesGrid({ products }: GamesGridProps) {
  return (
    <section className="bg-surface-white pt-5.75 md:pt-13.5 pb-13.25 md:pb-20">
      <Container>
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {products.map((product, index) => (
            <GameCard
              key={index}
              image={product.image.src}
              alt={product.image.alt}
              title={product.name}
              subtitle={product.credit}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
