"use client";

import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "./router-shim";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useLocale } from "../../context/locale-context";
import LogoDark from "../../public/images/bitsika-logo.png";
import translate from "../../translations/header";

const options = [
  {
    handle: () => null,
    name: "🇬🇧 English",
    key: "en",
    flag: "🇬🇧",
  },
  {
    handle: () => null,
    name: "🇫🇷 French",
    key: "fr",
    flag: "🇫🇷",
  },
];

const extraOptions = [
  {
    handle: () => null,
    name: "🇫🇷 French",
    key: "fr-FR",
    flag: "🇫🇷",
  },
];
export const Header = ({ homepage, type, hideLogout, ...props }) => {
  const router = useRouter();
  const { handleSetLocale } = useLocale();
  const { logoutUser } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    // Access browser information
    const userAgent = window.navigator.userAgent;
    if (userAgent) {
      checkIsMobile(userAgent);
    }
    if (typeof window !== "undefined") {
      if (window.navigator.maxTouchPoints > 0) {
        setIsTouchScreen(true);
      }
    }
  }, []);

  function checkIsMobile(userAgent) {
    const wordsToCheck = [
      "Mobile",
      "iPad",
      "iPhone",
      "android",
      "Android",
      "ios",
      "iOS",
    ];
    const pattern = new RegExp(
      "\\b" + wordsToCheck.join("\\b|\\b") + "\\b",
      "i"
    );
    if (pattern.test(userAgent)) {
      setIsMobile(true);
    }
  }

  const openMobileApp = () => {
    if (router.asPath === "/" || router.asPath === "/top-users") {
      return /android/i.test(navigator.userAgent)
        ? (window.location = `bitsika://bitsika.com/#Intent;scheme=bitsika;package=africa.bitsika.bitsika_mobile;end`)
        : (window.location = `bitsika://bitsika.com`);
    }
    /android/i.test(navigator.userAgent)
      ? (window.location = `bitsika://bitsika.com${router.asPath}/#Intent;scheme=bitsika;package=africa.bitsika.bitsika_mobile;end`)
      : (window.location = `bitsika://bitsika.com${router.asPath}`);
  };

  const onDownload = () => {
    router.push("/download-app");
  };

  const goToHome = () => {
    if (router.asPath === "/") return;
    router.push("/");
  };

  const onLogout = () => {
    logoutUser();
  };

  const selectLanguage = (value) => {
    handleSetLocale(value.key);
    router.push(`${router.asPath}`, `${router.asPath}`, { locale: value.key });
  };

  return (
    <div className="mx-auto max-w-md  bg-white py-2 px-6 sm:px-6 relative border-b border-gray-200">
      <div className="flex items-center justify-between mt-3">
        <div className="cursor-pointer logo flex items-center justify-start">
          <a className=" flex justify-start" href="https://www.bitsika.com">
            <Image
              src={LogoDark}
              alt="logo"
              width={100}
              className="w-20 md:w-25"
              priority
            />
          </a>
        </div>
        {router.asPath.split("/")[1] !== "download-app" && (
          <div className="flex items-center justify-end flex-1 w-6/12">
            {["logout"].includes(type) ? (
              <div
                className={classNames(
                  "w-fit bg-[#2F80ED1A] py-1.25 px-3 rounded-[22px] text-center mr-2"
                )}
                onClick={onLogout}
              >
                <p className="text-[12px] cursor-pointer text-[#2F80ED] font-medium">
                  {translate[router.locale].logout}
                </p>
              </div>
            ) : !["logedin", "auth"].includes(type) ? (
              <>
                <div
                  className={classNames(
                    "w-fit bg-[#2F80ED1A] py-[5px] px-3 rounded-[22px] text-center mr-[-5px]"
                  )}
                  onClick={onDownload}
                >
                  <p className="text-[12px] cursor-pointer text-[#2F80ED] font-[500]">
                    {translate[router.locale].download}
                  </p>
                </div>
                {(isMobile || isTouchScreen) && !hideLogout && (
                  <div
                    className={classNames(
                      "ml-4 w-fit bg-[#2F80ED1A] py-[5px] px-3 rounded-[22px] text-center"
                    )}
                    onClick={openMobileApp}
                  >
                    <p className="text-[12px] cursor-pointer text-[#2F80ED] font-[500]">
                      {translate[router.locale].openApp}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
