"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/Logo.png";
import Instragm from "../../public/icons/instagram.svg";
import LinkedIn from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";
import TikTok from "../../public/icons/tiktok.svg";
import TalkRoom from "../../public/icons/talkroom.svg";
import Telegram from "../../public/icons/telegram.svg";
import Email from "../../public/icons/email.svg";
import translate from "../../translations/footer";

const langPrefixes = {
  en: "",
  es: "/es-lang",
  ar: "/ar-lang",
  de: "/de-lang",
  fr: "/fr-lang",
  it: "/it-lang",
  pt: "/pt-lang",
  ru: "/ru-lang",
};

export const Footer = ({ locale }) => {
  // Default to 'en' if locale is undefined
  const currentLocale = locale || "en";
  const t = translate[currentLocale] || translate.en;
  const langPrefix = langPrefixes[currentLocale] || "";
  return (
    <div className=" bg-[#FAFAFA] mx-auto max-w-md">
      <footer className="bg-[#FAFAFA] mx-auto max-w-md px-5  pb-14">
        <div className="py-7 border-y-[1px] border-[#DDDDDD]">
          <Link href="/bitsika">
            <p className="text-base text-gray-500 cursor-pointer">
              {t.bitsikaup}
            </p>
          </Link>
          <a href="https://atsudavoh.com" target="_blank" rel="noreferrer">
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.ceo}
            </p>
          </a>
          <Link
            href="https://www.youtube.com/watch?v=ZBNoQ-Eyoao"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.bitsika}
            </p>
          </Link>

          <Link href="/privacy-policy">
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.policy}
            </p>
          </Link>
          <Link href="/terms-conditions">
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.terms}
            </p>
          </Link>
          <Link href="/delete-account">
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.delete}
            </p>
          </Link>
          <Link href="/contact-us">
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.contact}
            </p>
          </Link>
          <Link href={`${langPrefix}/kyc-aml`}>
            <p className="text-base text-gray-500 mt-5 cursor-pointer">
              {t.kycPolicy}
            </p>
          </Link>
        </div>

        <div className="mt-10 flex gap-2">
          <a href="mailto:info@bitsika.africa">
            <span className="mr-2 cursor-pointer">
              <Image src={Email} alt="logo" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://twitter.com/bitsikaafrica?lang=en"
            rel="noreferrer"
          >
            <span className="mr-2 cursor-pointer">
              <Image src={Twitter} alt="logo" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/bitsikaafrica/"
            rel="noreferrer"
          >
            <span className="mr-2 cursor-pointer">
              <Image src={Instragm} alt="logo" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/11803195/"
            rel="noreferrer"
          >
            <span className="mr-2 cursor-pointer">
              <Image src={LinkedIn} alt="logo" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://www.tiktok.com/@bitsikaafrica"
            rel="noreferrer"
          >
            <span className="mr-2 cursor-pointer">
              <Image src={TikTok} alt="logo" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://t.me/joinchat/HpZSlBezu_dt46yGTpj6uQ"
            rel="noreferrer"
          >
            <span className="mr-2 cursor-pointer">
              <Image src={Telegram} alt="logo" />
            </span>
          </a>
        </div>

        <div className=""></div>
        <div className="mb-[500px]" />
      </footer>
    </div>
  );
};
