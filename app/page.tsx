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

export default async function HomePage() {
  const [content, imageContent] = await Promise.all([
    getContent(),
    getImageContent(),
  ]);

  return (
    <main>
      <Header hero={content.hero} />
      <GamesGrid products={imageContent.products} />
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
