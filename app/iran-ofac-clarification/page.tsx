import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import content from "@/content/iran-clarification/iran.json";
import LogoDark from "@/public/images/bitsika-logo.png";

export const metadata: Metadata = {
  title: content["meta-title"],
  description: content["meta-description"],
  openGraph: {
    title: content["meta-title"],
    description: content["meta-description"],
    type: "article",
    url: "https://bitsika.com/iran-ofac-clarification",
  },
  twitter: {
    card: "summary",
    title: content["meta-title"],
    description: content["meta-description"],
  },
};

function renderTextWithLinks(text: string): React.ReactNode {
  const urlRegex = /(https?:\/\/\S+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, idx) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent underline break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function formatBody(body: string) {
  const elements: React.ReactNode[] = [];

  body.split("\n").forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed === "") return;

    if (/^\*\*\d+\.\s.*\*\*$/.test(trimmed)) {
      const headingText = trimmed.replace(/^\*\*/, "").replace(/\*\*$/, "");
      elements.push(
        <h2
          key={`h-${i}`}
          className="text-base font-bold text-ink mt-8 mb-3"
        >
          {headingText}
        </h2>,
      );
      return;
    }

    elements.push(
      <p key={`p-${i}`} className="text-base text-ink-secondary mb-3">
        {renderTextWithLinks(trimmed)}
      </p>,
    );
  });

  return elements;
}

export default function IranOfacClarificationPage() {
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
          {content["h1-heading"]}
        </h1>

        <div>{formatBody(content.body)}</div>
      </div>
    </div>
  );
}
