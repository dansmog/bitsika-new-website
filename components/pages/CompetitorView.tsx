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
import { getImageContent } from "@/content";
import {
  getCompetitorContent,
  getCompetitorLocales,
  getCompetitorSlugsForLocale,
  type CompetitorPageEntry,
} from "@/content/competitors";
import { getSeoProduct, getSeoProducts, type SeoProduct } from "@/content/api";
import { pathForLocale } from "@/content/seo";

type CompetitorViewProps = {
  language: string;
  country: string;
  entry: CompetitorPageEntry;
};

export default async function CompetitorView({
  language,
  country,
  entry,
}: CompetitorViewProps) {
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
    competitorLocales,
  ] = await Promise.all([
    getCompetitorContent(entry),
    getImageContent(),
    getSeoProducts(),
    getSeoProduct("pubg-mobile"),
    getSeoProduct("free-fire"),
    getSeoProduct("call-of-duty-mobile"),
    getSeoProduct("afk-journey"),
    getSeoProduct("mobile-legends-bang-bang"),
    getCompetitorSlugsForLocale(language, country),
    getCompetitorLocales(entry.competitor),
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
        h2Href={pathForLocale(language, country)}
        competitorSlug={entry.competitor}
        competitorLocales={competitorLocales}
      />
      <GamesGrid products={products} language={language} country={country} />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner cta={content.ctas[0]} hero={content.hero} image={ctaImages[0]} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <CtaBanner cta={content.ctas[1]} hero={content.hero} image={ctaImages[1]} />
      <GetStarted steps={content.steps} image={stepsImage} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner cta={content.ctas[2]} hero={content.hero} image={ctaImages[2]} />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner cta={content.ctas[3]} hero={content.hero} image={ctaImages[3]} />
      <BuiltDifferent
        comparison={content.comparison}
        vrs={imageContent.vrs}
        language={language}
        country={country}
        linkedSlugs={linkedSlugs}
      />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
