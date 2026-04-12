import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { getContent } from "@/content";
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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    icons: {
      shortcut: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  return (
    <html
      lang={content.meta.hreflang}
      className={` ${googleSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
