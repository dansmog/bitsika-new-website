import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import enContent from "@/content/terms/en.json";
import LogoDark from "@/public/images/bitsika-logo.png";

export const metadata: Metadata = {
  title: enContent["meta-title"],
  description: enContent["meta-description"],
  openGraph: {
    title: enContent["meta-title"],
    description: enContent["meta-description"],
    type: "article",
    url: "https://bitsika.com/terms-conditions",
  },
  twitter: {
    card: "summary",
    title: enContent["meta-title"],
    description: enContent["meta-description"],
  },
};

function renderWithEmailLinks(text: string): React.ReactNode {
  const parts = text.split(/(\S+@\S+\.\S+)/g);
  return parts.map((part, i) =>
    /\S+@\S+\.\S+/.test(part) ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="text-brand-accent underline"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function formatBody(body: string) {
  const elements: React.ReactNode[] = [];

  body.split("\n").forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed === "") return;

    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <h2
          key={`h-${i}`}
          className="text-base font-bold text-ink mt-8 mb-3"
        >
          {trimmed}
        </h2>,
      );
      return;
    }

    if (/^[ivx]+\.\s/.test(trimmed)) {
      elements.push(
        <p key={`r-${i}`} className="text-base text-ink-secondary pl-6 mb-1">
          {renderWithEmailLinks(trimmed)}
        </p>,
      );
      return;
    }

    if (/^[a-z]\.\s/.test(trimmed)) {
      elements.push(
        <p key={`l-${i}`} className="text-base text-ink-secondary pl-6 mb-2">
          {renderWithEmailLinks(trimmed)}
        </p>,
      );
      return;
    }

    if (/^[A-Z][A-Za-z\s&]+$/.test(trimmed) && trimmed.length < 60) {
      elements.push(
        <h3
          key={`s-${i}`}
          className="text-lg font-bold text-ink mt-10 mb-3"
        >
          {trimmed}
        </h3>,
      );
      return;
    }

    elements.push(
      <p key={`p-${i}`} className="text-base text-ink-secondary mb-3">
        {renderWithEmailLinks(trimmed)}
      </p>,
    );
  });

  return elements;
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full border-b border-border-default">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <Link href="/">
            <Image
              src={LogoDark}
              alt="Bitsika logo"
              width={100}
              className="w-20 md:w-[100px] cursor-pointer"
              priority
            />
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-16">
        <h1 className="text-[24px] md:text-[48px] font-bold text-ink text-center mb-10">
          {enContent["h1-heading"]}
        </h1>

        <div>{formatBody(enContent.body)}</div>
      </div>
    </div>
  );
}
