"use client";

import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import Image from "next/image";
import Qrcode from "../ui/Qrcode";
import Ratings from "../ui/Ratings";
import { GodRays } from "@paper-design/shaders-react";

export default function HeroBanner() {
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
          intensity={0.10}
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
        <h1 className="text-white text-[28px] md:text-[40px] font-google-sans font-medium leading-[31.92px] md:leading-[45.6px] tracking-[-0.8px] max-xl:text-3xl">
          Directly top-up your favourite mobile games with crypto like Bitcoin,
          USDT and more.
        </h1>
        <Qrcode />
        <div className="flex flex-col">
          <Ratings />
          <div className="flex items-center gap-2 pt-[13.5px] pb-4.75">
            <AppStoreButton />
            <GooglePlayButton />
          </div>
          <p className="text-white text-[17px]  tracking-[-0.34px] leading-[24.14px]">
            Instantly Recharge Your Favorite Mobile Games Using Bitcoin, USDT,
            and Other Top Cryptocurrencies for a Seamless, Secure, and
            Reward-Filled Experience.
          </p>
        </div>
      </div>
    </section>
  );
}
