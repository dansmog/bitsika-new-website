import Image from "next/image";
import Container from "@/components/layout/Container";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import Qrcode from "@/components/ui/Qrcode";
import callOfDuty from "@/assets/images/games/call_of_duty.png";

export default function CtaBanner() {
  return (
    <section className="bg-ink py-10 md:py-14 overflow-hidden">
      <Container className="flex flex-col lg:flex-row xl:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-6 md:w-113 shrink-0">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-100.75 text-white font-google-sans text-[32px] md:text-[40px] font-normal leading-[114%] tracking-[-0.4px]">
              Start spending in over 200 countries, today.
            </h2>
            <p className="text-[#AAA] text-base font-normal leading-[130%]">
              Bitsika Virtual Cards can be used in more than 200 countries,
              allowing users anywhere in the world to shop online, pay for
              subscriptions, and make secure payments.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AppStoreButton />
            <GooglePlayButton />
          </div>
        </div>

        <div className="relative w-full md:flex-1 rounded-2xl flex md:justify-end items-center min-h-70">
          <div className="relative w-full md:w-160 lg:w-130 xl:w-130 md:h-90 lg:h-70 xl:h-70 rounded-2xl shrink-0">
            <Image
              src={callOfDuty}
              alt="Call of Duty: Mobile"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              priority
              className="object-cover rounded-2xl"
            />
            <div className="hidden md:flex absolute md:-left-20 lg:-left-22 xl:-left-22 -bottom-2.5 translate-y-0 z-10">
              <Qrcode variant="blue" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
