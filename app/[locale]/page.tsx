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
import ProductDetailsView from "@/components/pages/ProductDetailsView";
import { getContent, getImageContent } from "@/content";
import {
  getSeoLanguages,
  getSeoProduct,
  getSeoProducts,
  type SeoLanguage,
  type SeoProduct,
} from "@/content/api";
import {
  buildLocaleAlternates,
  buildProductMetadata,
  isHomeLocale,
} from "@/content/seo";

type RouteParams = { locale: string };

const HOME_LANGUAGE = "en";
const HOME_COUNTRY = "us";
const LOCALE_PATTERN = /^([a-z]{2})-([a-z]{2})$/;

type ResolvedSegment =
  | {
      kind: "locale";
      language: string;
      country: string;
      languages: SeoLanguage[];
    }
  | { kind: "product"; product: SeoProduct };

async function resolveSegment(segment: string): Promise<ResolvedSegment> {
  const match = LOCALE_PATTERN.exec(segment);
  if (match) {
    const [, language, country] = match;
    if (isHomeLocale(language, country)) redirect("/");

    const { data: languages } = await getSeoLanguages();
    const entry = languages.find(
      (l) => l.language === language && l.country === country,
    );
    if (!entry || !entry.is_display) notFound();

    return { kind: "locale", language, country, languages };
  }

  let product: SeoProduct;
  try {
    product = (await getSeoProduct(segment)).data;
  } catch {
    notFound();
  }
  if (!product.is_display) notFound();
  return { kind: "product", product };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = await resolveSegment(locale);

  if (resolved.kind === "product") {
    return buildProductMetadata(HOME_LANGUAGE, HOME_COUNTRY, resolved.product);
  }

  const { language, country, languages } = resolved;
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
          url: "/images/bitsika-og-thumbnail.png",
          width: 256,
          height: 256,
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

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale } = await params;
  const resolved = await resolveSegment(locale);

  if (resolved.kind === "product") {
    return (
      <ProductDetailsView
        language={HOME_LANGUAGE}
        country={HOME_COUNTRY}
        product={resolved.product}
      />
    );
  }

  const { language, country } = resolved;
  const [
    content,
    imageContent,
    productsRes,
    pubgMobileRes,
    freeFireRes,
    codMobileRes,
    afkJourneyRes,
    mlbbRes,
  ] = await Promise.all([
    getContent(language, country),
    getImageContent(),
    getSeoProducts(),
    getSeoProduct("pubg-mobile"),
    getSeoProduct("free-fire"),
    getSeoProduct("call-of-duty-mobile"),
    getSeoProduct("afk-journey"),
    getSeoProduct("mobile-legends-bang-bang"),
  ]);

  console.log(
    "[page.tsx] image content URL:",
    "https://bitsika.github.io/game-homepage/image-content.json",
    "\nresponse:",
    imageContent,
  );
  console.log(
    "[page.tsx] content URL:",
    `https://transaction-api.bartelssneath.com/api/v2/seo/languages/translation?language=${encodeURIComponent(language)}&country=${encodeURIComponent(country)}`,
    "\nresponse:",
    content,
  );
  console.log(
    "[page.tsx] seo products URL:",
    "https://transaction-api.bartelssneath.com/api/v2/seo/products",
    "\nresponse:",
    productsRes,
  );

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
      <Header hero={content.hero} />
      <GamesGrid products={products} language={language} country={country} />
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
      <BuiltDifferent comparison={content.comparison} vrs={imageContent.vrs} />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
