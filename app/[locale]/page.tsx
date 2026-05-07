import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuiltDifferent from "@/components/sections/BuiltDifferent";
import FAQ from "@/components/sections/FAQ";
import InsideBitsika from "@/components/sections/InsideBitsika";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import GamesGrid from "@/components/sections/GamesGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";
import { getContent, getImageContent } from "@/content";
import {
  getSeoLanguages,
  getSeoProducts,
  type SeoLanguage,
} from "@/content/api";
import { buildLocaleAlternates, isHomeLocale } from "@/content/seo";

type RouteParams = { locale: string };

const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

async function resolveLocale(rawLocale: string): Promise<{
  language: string;
  country: string;
  languages: SeoLanguage[];
}> {
  const match = LOCALE_PATTERN.exec(rawLocale);
  if (!match) notFound();

  const [, language, country] = match;

  if (isHomeLocale(language, country)) redirect("/");

  const { data: languages } = await getSeoLanguages();
  const entry = languages.find(
    (l) => l.language === language && l.country === country,
  );
  if (!entry || !entry.is_display) notFound();

  return { language, country, languages };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { language, country, languages } = await resolveLocale(locale);
  const content = await getContent(language, country);

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: buildLocaleAlternates(language, country, languages),
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      images: [
        {
          url: "/images/bitsika-logo-blue.png",
          width: 1200,
          height: 630,
          alt: "Bitsika",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/images/bitsika-logo-blue.png"],
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale } = await params;
  const { language, country } = await resolveLocale(locale);
  const [content, imageContent, productsRes] = await Promise.all([
    getContent(language, country),
    getImageContent(),
    getSeoProducts(),
  ]);

  const products = productsRes.data
    .filter((p) => p.is_display)
    .sort((a, b) => a.order - b.order);

  return (
    <main>
      <Header hero={content.hero} />
      <GamesGrid products={products} language={language} country={country} />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner
        cta={content.ctas[0]}
        hero={content.hero}
        image={imageContent.ctaImages[0]}
      />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <CtaBanner
        cta={content.ctas[1]}
        hero={content.hero}
        image={imageContent.ctaImages[1]}
      />
      <GetStarted steps={content.steps} image={imageContent.stepsImage} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner
        cta={content.ctas[2]}
        hero={content.hero}
        image={imageContent.ctaImages[2]}
      />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner
        cta={content.ctas[3]}
        hero={content.hero}
        image={imageContent.ctaImages[3]}
      />
      <BuiltDifferent comparison={content.comparison} vrs={imageContent.vrs} />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
