import Image, { StaticImageData } from "next/image";
import Container from "@/components/layout/Container";

import metamaskIcon from "@/assets/images/metamask.svg";
import coinbaseIcon from "@/assets/images/coinbase.png";
import cashappIcon from "@/assets/images/Square logo.svg";
import binanceIcon from "@/assets/images/binance.svg";
import revolutIcon from "@/assets/images/revolut.svg";

const providers: { name: string; icon: StaticImageData }[] = [
  { name: "MetaMask Card", icon: metamaskIcon },
  { name: "Coinbase Card", icon: coinbaseIcon },
  { name: "CashApp Card", icon: cashappIcon },
  { name: "Binance Card", icon: binanceIcon },
  { name: "Revolut Card", icon: revolutIcon },
];

const comparisons = [
  providers[0], providers[1], providers[2], providers[3],
  providers[1], providers[2], providers[4], providers[0],
  providers[3], providers[4], providers[0], providers[2],
  providers[1], providers[2], providers[4], providers[0],
];

export default function BuiltDifferent() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="font-google-sans font-normal text-[40px] leading-[114%] tracking-[-0.01em] text-ink">
            Built Different. On Purpose.
          </h2>
          <p className=" font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary">
            See how Bitsika compares to traditional cards and other virtual card providers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {comparisons.map((provider, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-surface-subtle rounded-[20px] px-5 md:px-6 py-[18.3px] md:py-5.25"
            >
              <Image
                src={provider.icon}
                alt={provider.name}
                width={48}
                height={48}
                className="shrink-0 w-12 h-12 rounded-[10px] object-contain"
              />
              <div className="flex flex-row md:flex-col">
                <span className="md:font-semibold text-lg leading-[130%] text-ink">
                  Bitsika vs.
                </span>
                <span className="md:font-semibold text-lg leading-[130%] text-ink">
                  {provider.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
