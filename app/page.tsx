import type { Metadata } from "next";
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
  getSeoProduct,
  getSeoProducts,
  type SeoProduct,
} from "@/content/api";
import { getCompetitorSlugsForLocale } from "@/content/competitors";
import { getFeatureNav } from "@/content/features";
import { buildLocaleAlternates } from "@/content/seo";

const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";

export async function generateMetadata(): Promise<Metadata> {
  const [content, languages] = await Promise.all([
    getContent(HOME_LANGUAGE, HOME_COUNTRY),
    getSeoLanguages(),
  ]);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: buildLocaleAlternates(
      HOME_LANGUAGE,
      HOME_COUNTRY,
      languages.data,
    ),
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      images: [
        {
          url: "/images/bitsika-og-thumbnail.png",
          width: 100,
          height: 100,
          alt: "Bitsika",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/images/bitsika-og-thumbnail.png"],
    },
  };
}

export default async function HomePage() {
  const [
    content,
    imageContent,
    productsRes,
    pubgMobileRes,
    freeFireRes,
    codMobileRes,
    afkJourneyRes,
    mlbbRes,
    linkedSlugs,
    featureNav,
  ] = await Promise.all([
    getContent(HOME_LANGUAGE, HOME_COUNTRY),
    getImageContent(),
    getSeoProducts(),
    getSeoProduct("pubg-mobile"),
    getSeoProduct("free-fire"),
    getSeoProduct("call-of-duty-mobile"),
    getSeoProduct("afk-journey"),
    getSeoProduct("mobile-legends-bang-bang"),
    getCompetitorSlugsForLocale(HOME_LANGUAGE, HOME_COUNTRY),
    getFeatureNav(HOME_LANGUAGE),
  ]);

  const products = productsRes.data
    .filter((p) => p.is_popular)
    .sort((a, b) => a.order - b.order);

  const productImage = (p: SeoProduct) => ({
    src: p.logo_url,
    alt: `${p.name} game icon`,
  });
  const ctaImages = [
    productImage(freeFireRes.data),
    productImage(codMobileRes.data),
    productImage(afkJourneyRes.data),
    productImage(mlbbRes.data),
  ];
  const stepsImage = productImage(pubgMobileRes.data);

  return (
    <main>
      <Header
        hero={content.hero}
        language={HOME_LANGUAGE}
        country={HOME_COUNTRY}
      />
      <GamesGrid
        products={products}
        language={HOME_LANGUAGE}
        country={HOME_COUNTRY}
      />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner
        cta={content.ctas[0]}
        hero={content.hero}
        image={ctaImages[0]}
      />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <CtaBanner
        cta={content.ctas[1]}
        hero={content.hero}
        image={ctaImages[1]}
      />
      <GetStarted steps={content.steps} image={stepsImage} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner
        cta={content.ctas[2]}
        hero={content.hero}
        image={ctaImages[2]}
      />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner
        cta={content.ctas[3]}
        hero={content.hero}
        image={ctaImages[3]}
      />
      <BuiltDifferent
        comparison={content.comparison}
        vrs={imageContent.vrs}
        language={HOME_LANGUAGE}
        country={HOME_COUNTRY}
        linkedSlugs={linkedSlugs}
      />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer
        footer={content.footer}
        hero={content.hero}
        featureNav={featureNav}
        language={HOME_LANGUAGE}
        country={HOME_COUNTRY}
      />
    </main>
  );
}
