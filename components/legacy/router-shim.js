"use client";

import { useRouter as useNavRouter, usePathname } from "next/navigation";
import { useLocale } from "../../context/locale-context";

export function useRouter() {
  const router = useNavRouter();
  const asPath = usePathname() || "/";
  const { selectedlocale } = useLocale();
  const locale = selectedlocale || "en";

  const toUrl = (url) => {
    if (!url) return "/";
    if (typeof url === "string") return url;
    return url.pathname || url.href || "/";
  };

  return {
    push: (url) => router.push(toUrl(url)),
    replace: (url) => router.replace(toUrl(url)),
    back: () => router.back(),
    refresh: () => router.refresh(),
    prefetch: (url) => router.prefetch(toUrl(url)),
    asPath,
    pathname: asPath,
    route: asPath,
    locale,
    locales: ["en", "en-GB", "en-US", "fr", "fr-FR"],
    defaultLocale: "en",
    query: {},
    isReady: true,
    isFallback: false,
  };
}
