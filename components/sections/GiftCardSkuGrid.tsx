import Container from "@/components/layout/Container";
import GameCard from "@/components/ui/GameCard";
import type { GiftCardSku } from "@/content/giftcard";

type GiftCardSkuGridProps = {
  skus: GiftCardSku[];
};

/**
 * Top grid on a level-2 gift-card page: one card per SKU of the focus product,
 * in SKU-array order. Each card shows the product artwork, brand name and SKU
 * name; alt text is "[brand-name] Gift Card [sku-name] icon".
 */
export default function GiftCardSkuGrid({ skus }: GiftCardSkuGridProps) {
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
