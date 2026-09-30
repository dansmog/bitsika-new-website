import Image from "next/image";
import Container from "@/components/layout/Container";

type ProductSkusGridProps = {
  skus: string[];
  productName: string;
  productImage: string;
};

export default function ProductSkusGrid({
  skus,
  productName,
  productImage,
}: ProductSkusGridProps) {
  return (
    <section className="bg-surface-white pt-5.75 md:pt-13.5 pb-13.25 md:pb-20">
      <Container>
        <div className="grid grid-cols-5 gap-y-8.75 gap-x-2.5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {skus.map((sku, i) => (
            <div key={`${sku}-${i}`} className="flex flex-col gap-4">
              <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden">
                <Image
                  src={productImage}
                  alt={`${productName} ${sku} icon`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#008CDF] font-google-sans text-sm font-medium leading-[130%] tracking-[-0.14px]">
                  {productName}
                </span>
                <span className="text-[#323232] font-google-sans text-base font-normal leading-[120%]">
                  {sku}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
