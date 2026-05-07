"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";

import flagUK from "@/assets/images/countryflag/UK.svg";
import flagNG from "@/assets/images/countryflag/NG.svg";
import flagXOF from "@/assets/images/countryflag/XOF.svg";
import flagTZS from "@/assets/images/countryflag/TZS.svg";
import flagLIB from "@/assets/images/countryflag/LIB.svg";
import flagMLW from "@/assets/images/countryflag/MLW.svg";
import flagGHS from "@/assets/images/countryflag/GHS.svg";
import flagCHN from "@/assets/images/countryflag/CHN.svg";
import flagKOR from "@/assets/images/countryflag/KOR.svg";
import flagJPN from "@/assets/images/countryflag/JPN.svg";
import flagRUS from "@/assets/images/countryflag/RUS.svg";
import flagUSA from "@/assets/images/countryflag/USA.png";
import type { SeoLanguage } from "@/content/api";

const FLAGS_BY_COUNTRY: Record<string, StaticImageData> = {
  us: flagUSA,
  gb: flagUK,
  ng: flagNG,
  cm: flagXOF,
  sn: flagXOF,
  tz: flagTZS,
  lr: flagLIB,
  mw: flagMLW,
  gh: flagGHS,
  cn: flagCHN,
  kr: flagKOR,
  jp: flagJPN,
  ru: flagRUS,
};

const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";
const LOCALE_PATTERN = /^[a-z]{2}-[a-z]{2}$/;

type CountryOption = {
  id: string;
  language: string;
  country: string;
  locale: string;
  href: string;
  flag: StaticImageData | null;
};

function FlagIcon({ flag }: { flag: StaticImageData | null }) {
  if (!flag) {
    return <div className="w-5 h-5 rounded-full bg-border-input shrink-0" />;
  }
  return (
    <Image
      src={flag}
      alt=""
      width={20}
      height={20}
      className="w-5 h-5 rounded-full object-cover shrink-0"
    />
  );
}

function activeLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return LOCALE_PATTERN.test(seg) ? seg : `${HOME_LANGUAGE}-${HOME_COUNTRY}`;
}

type CountrySelectorProps = {
  languages: SeoLanguage[];
};

export default function CountrySelector({ languages }: CountrySelectorProps) {
  const pathname = usePathname();
  const router = useRouter();

  console.log({languages})

  const countries = useMemo<CountryOption[]>(
    () =>
      languages
        .filter((l) => l.is_display)
        .map((l) => {
          const isHome =
            l.language === HOME_LANGUAGE && l.country === HOME_COUNTRY;
          return {
            id: l.id,
            language: l.language,
            country: l.country,
            locale: `${l.language}-${l.country}`,
            href: isHome ? "/" : `/${l.language}-${l.country}`,
            flag: FLAGS_BY_COUNTRY[l.country] ?? null,
          };
        }),
    [languages],
  );

  const activeLocale = activeLocaleFromPath(pathname ?? "/");
  const selected =
    countries.find((c) => c.locale === activeLocale) ?? countries[0] ?? null;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!selected) return null;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.25 px-3 py-2 rounded-lg border border-border-input bg-surface-white cursor-pointer"
      >
        <FlagIcon flag={selected.flag} />
        <span className="hidden lg:block w-px h-4 bg-[#E1E1E1]" />
        <span className="hidden lg:block text-sm font-medium leading-none tracking-[-0.28px] text-black">
          {selected.locale}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="var(--color-ink-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 p-3 bg-[#F0F0F0] rounded-xl border border-[#DCDCDC] shadow-lg z-50 w-61.5 lg:w-117">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => {
                  setOpen(false);
                  if (country.locale !== selected.locale) {
                    router.push(country.href);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap transition-colors ${
                  selected.id === country.id
                    ? "border border-[#DFDFDF] bg-surface-white"
                    : "hover:bg-surface-secondary"
                }`}
              >
                <FlagIcon flag={country.flag} />
                <span className="border border-[#E1E1E1] h-full"></span>
                <span className="text-ink">{country.locale}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
