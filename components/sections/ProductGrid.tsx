import Link from "next/link";
import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import { productPath, type ProductKind, type RefocusProduct } from "@/content/refocus";

type ProductGridProps = {
  products: RefocusProduct[];
  kind: ProductKind;
  /** Language of the current page, used to build the level-2 links. */
  language: string;
  title?: string;
};

/**
 * Product grid for level-1 pages and the "more products" carousel on level-2.
 * Blue text is the brand name; the black line under it is the in-game currency,
 * which only top-up products have. Each card links to its level-2 page.
 */
export default function ProductGrid({
  products,
  kind,
  language,
  title,
}: ProductGridProps) {
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
            <Link
              key={product.slug}
              href={productPath(kind, language, product.slug)}
            >
              <GameCard
                image={product.image}
                alt={product.alt}
                title={product.brandName}
                subtitle={product.currency}
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
