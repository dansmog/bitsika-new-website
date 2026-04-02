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
    <section className="bg-ink py-14 overflow-hidden">
      <Container className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-6 w-113 shrink-0">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-100.75 text-white font-google-sans text-[40px] font-normal leading-[114%] tracking-[-0.4px]">
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

        <div className="relative flex-1 rounded-2xl flex justify-end items-center min-h-70">
          <div className="relative w-130 h-70 rounded-2xl  shrink-0">
            <Image
              src={callOfDuty}
              alt="Call of Duty: Mobile"
              fill
              className="object-cover rounded-2xl "
            />
            <div className="absolute -left-22 -bottom-2.5 translate-y-0 z-10">
              <Qrcode variant="blue" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
