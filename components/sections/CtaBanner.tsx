import Image from "next/image";
import Container from "@/components/layout/Container";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import Qrcode from "@/components/ui/Qrcode";
import type { CtaContent, HeroContent } from "@/content/shape";
import type { RemoteImage } from "@/content/imageShape";

type CtaBannerProps = {
  cta: CtaContent;
  hero: HeroContent;
  image: RemoteImage;
};

export default function CtaBanner({ cta, hero, image }: CtaBannerProps) {
  return (
    <section className="bg-ink py-10 md:py-14 overflow-hidden">
      <Container className="flex flex-col lg:flex-row xl:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-6 md:w-113 shrink-0">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-100.75 text-white font-google-sans text-[32px] md:text-[40px] font-normal leading-[114%] tracking-[-0.4px]">
              {cta.heading}
            </h2>
            <p className="text-[#AAA] text-base font-normal leading-[130%]">
              {cta.text}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AppStoreButton
              desktopLabel={hero.desktopAppStoreLabel}
              mobileLabel={hero.mobileAppStoreLabel}
            />
            <GooglePlayButton
              desktopLabel={hero.desktopGooglePlayLabel}
              mobileLabel={hero.mobileGooglePlayLabel}
            />
          </div>
        </div>

        <div className="relative w-full md:flex-1 rounded-2xl flex md:justify-end items-center min-h-70">
          <div className="relative w-full md:w-160 lg:w-130 xl:w-130 h-70 md:h-90 lg:h-90 xl:h-90 rounded-2xl shrink-0">
            {image.src && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                priority
                className="object-cover rounded-2xl"
              />
            )}
            <div className="hidden md:flex absolute md:-left-20 lg:-left-22 xl:-left-22 -bottom-2.5 translate-y-0 z-10">
              <Qrcode variant="blue" label={hero.qrLabel} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
