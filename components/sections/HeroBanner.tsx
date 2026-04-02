"use client";

import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import Image from "next/image";
import Qrcode from "../ui/Qrcode";
import Ratings from "../ui/Ratings";

export default function HeroBanner() {
  return (
    <section className="bg-brand-blue py-8.75 md:py-12 mx-4 rounded-2xl relative overflow-hidden">
      <Image
        src="/images/hero_star.svg"
        alt=""
        fill
        className="object-cover object-top pointer-events-none select-none"
        aria-hidden
      />
      <div className="grid grid-cols-3 gap-5 md:gap-10 items-center max-lg:grid-cols-1 px-5 md:px-19.25">
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
