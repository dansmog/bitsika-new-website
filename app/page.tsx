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
      <CtaBanner cta={content.ctas[0]} hero={content.hero} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <CtaBanner cta={content.ctas[1]} hero={content.hero} />
      <GetStarted steps={content.steps} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner cta={content.ctas[2]} hero={content.hero} />
      <Testimonials
        testimonials={content.testimonials}
        testimonialImages={imageContent.testimonialImages}
      />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner cta={content.ctas[3]} hero={content.hero} />
      <BuiltDifferent comparison={content.comparison} vrs={imageContent.vrs} />
      <InsideBitsika blog={content.blog} articles={imageContent.blogs} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
