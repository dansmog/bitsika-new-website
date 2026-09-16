import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import type { RefocusSku } from "@/content/refocus";

type SkuGridProps = {
  skus: RefocusSku[];
};

/**
 * Top grid on a level-2 page: one card per SKU of the focus product, in
 * SKU-array order. Blue text is the brand name, black text the SKU name. The
 * cards are not links — we are already on that product's page.
 */
export default function SkuGrid({ skus }: SkuGridProps) {
  return (
    <section className="bg-surface-white pt-5.75 md:pt-13.5 pb-13.25 md:pb-20">
      <Container>
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {skus.map((sku, i) => (
            <GameCard
              key={`${sku.sku}-${i}`}
              image={sku.image}
              alt={sku.alt}
              title={sku.brandName}
              subtitle={sku.sku}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
