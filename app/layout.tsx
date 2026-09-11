import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../assets/fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const metadataBaseUrl =
  process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.bitsika.com";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  icons: {
    shortcut: "/favicon.ico",
  },
};

const LANGUAGE_SEGMENT = /^([a-z]{2})-lang$/;

/**
 * The page's language declaration. Non-English pages are prefixed with a
 * `<lang>-lang` segment; everything else is English.
 */
function languageFromPathname(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return LANGUAGE_SEGMENT.exec(seg)?.[1] ?? "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "/";
  const lang = languageFromPathname(pathname);

  return (
    <html
      lang={lang}
      className={` ${googleSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#2F80ED" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
