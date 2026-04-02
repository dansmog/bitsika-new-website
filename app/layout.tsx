import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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
  title: "Bitsika - Crypto Virtual Cards - KYC in 1 Hour",
  description:
    "Get a Virtual Visa Debit Card with KYC approved in 1 hour. Pay with Bitcoin, USDT or other crypto. Compliant and user-friendly. Usable in 200+ countries. Can add to Apple Pay, Google Pay &amp; PayPal.",
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${googleSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
