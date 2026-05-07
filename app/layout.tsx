import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bitsika.com"),
  icons: {
    shortcut: "/favicon.ico",
  },
};

const LOCALE_PATTERN = /^[a-z]{2}-[a-z]{2}$/;

function localeFromPathname(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0] ?? "";
  return LOCALE_PATTERN.test(seg) ? seg : "en-us";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "/";
  const lang = localeFromPathname(pathname);

  return (
    <html
      lang={lang}
      className={` ${googleSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
