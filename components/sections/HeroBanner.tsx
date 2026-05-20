"use client";

import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import Image from "next/image";
import Link from "next/link";
import Qrcode from "../ui/Qrcode";
import Ratings from "../ui/Ratings";
import { GodRays } from "@paper-design/shaders-react";
import type { HeroContent } from "@/content/shape";
import { splitAsteriskLink } from "@/lib/formatText";

type HeroBannerProps = {
  hero: HeroContent;
  h2Href?: string;
};

export default function HeroBanner({ hero, h2Href }: HeroBannerProps) {
  const h2Parts = h2Href ? splitAsteriskLink(hero.h2) : null;
  return (
    <section className="relative bg-brand-blue py-8.75 md:py-12 overflow-hidden">
      {/* Mobile: CSS sun rays from top-right corner */}
      <div className="md:hidden overflow-hidden  absolute inset-0" aria-hidden>
        <GodRays
          width={1280}
          height={720}
          colorBack="#00000000"
          // Using slightly transparent grays/whites to work on both dark/light backgrounds
          colors={["#a1a1aa40", "#e4e4e740", "#71717a40", "#52525b40"]}
          colorBloom="#a1a1aa"
          bloom={1}
          intensity={0.1}
          density={0.24}
          spotty={0}
          midSize={0.38}
          midIntensity={1}
          speed={0}
          scale={2.16}
          offsetX={1}
          offsetY={-1.6}
        />
      </div>
      <Image
        src="/images/hero_star.svg"
        alt=""
        fill
        className="hidden md:block object-cover object-top pointer-events-none select-none"
        aria-hidden
      />
      <div className="relative z-10 max-w-360 mx-auto grid grid-cols-3 gap-5 md:gap-10 items-center max-lg:grid-cols-1 px-5 md:px-19.25">
        <h1 className="text-white text-[22px] leading-7.5 md:leading-10  md:text-[28px] font-google-sans font-medium  tracking-[-0.8px] xl:text-[32px]">
          {hero.h1}
        </h1>
        <Qrcode label={hero.qrLabel} />
        <div className="flex flex-col">
          <Ratings
            googlePlayStat={hero.googlePlayStat}
            userCount={hero.userCount}
          />
          <div className="flex items-center gap-2 pt-[13.5px] pb-4.75">
            <AppStoreButton
              desktopLabel={hero.desktopAppStoreLabel}
              mobileLabel={hero.mobileAppStoreLabel}
            />
            <GooglePlayButton
              desktopLabel={hero.desktopGooglePlayLabel}
              mobileLabel={hero.mobileGooglePlayLabel}
            />
          </div>
          <h2 className="text-white text-base font-inter tracking-[-0.34px] leading-[24.14px]">
            {h2Parts && h2Parts.link ? (
              <>
                {h2Parts.prefix}
                <Link href={h2Href!} className="underline">
                  {h2Parts.link}
                </Link>
                {h2Parts.suffix}
              </>
            ) : (
              hero.h2
            )}
          </h2>
        </div>
      </div>
    </section>
  );
}
