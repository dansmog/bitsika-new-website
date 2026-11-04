import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ArticleBody from "@/components/sections/ArticleBody";
import InsideBitsika from "@/components/sections/InsideBitsika";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";
import {
  blogPostCards,
  nextBlogPosts,
  type BlogPostPage,
} from "@/content/blog";
import { getFeatureNav } from "@/content/features";
import { getGiftCardProductCountries } from "@/content/giftcard";

type BlogPostViewProps = {
  page: BlogPostPage;
};

/**
 * A blog post in the product-page frame: nav and feature list on top, the
 * post in the middle, then the blog section and footer.
 */
export default async function BlogPostView({ page }: BlogPostViewProps) {
  const { feature, language, country, productSlug, post } = page;
  const isGiftCard = feature === "gift-card";

  const [featureNav, giftCardCountries] = await Promise.all([
    getFeatureNav(language),
    isGiftCard ? getGiftCardProductCountries(productSlug) : undefined,
  ]);

  const { content } = post;
  const moreArticles = blogPostCards(
    nextBlogPosts(page.posts, post.slug),
    page.productPath,
    page.imageSrc,
  );

  return (
    <main>
      {/* The country selector behaves as on the parent product page. */}
      <Header
        language={language}
        country={country}
        productSlug={isGiftCard ? undefined : productSlug}
        giftCardCountries={giftCardCountries}
        activeFeature={isGiftCard ? "gift-cards" : "top-ups"}
      />
      <article className="pt-11.5 pb-24 max-md:pt-7 max-md:pb-16">
        <Container>
          <div className="flex flex-col items-center gap-9 max-md:gap-7">
            <h1 className="max-w-170 text-center font-google-sans font-medium text-[43px] leading-[1.016] tracking-[-0.03em] text-ink max-md:text-[26px] max-md:leading-[1.04]">
              {post.title}
            </h1>
            <div className="flex items-center gap-2">
              <AppStoreButton
                desktopLabel={content.hero.desktopAppStoreLabel}
                mobileLabel={content.hero.mobileAppStoreLabel}
                className="md:border md:border-[#E0E0E0]"
              />
              <GooglePlayButton
                desktopLabel={content.hero.desktopGooglePlayLabel}
                mobileLabel={content.hero.mobileGooglePlayLabel}
              />
            </div>
            <div className="relative w-full max-w-138.75 aspect-555/354 rounded-[26px] overflow-hidden max-md:rounded-[18px]">
              {/* Slightly overscaled, as in the design, so the artwork's own
                  rounded edges are cropped by the frame. */}
              <Image
                src={page.imageSrc}
                alt={page.imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 555px"
                className="object-cover scale-[1.047]"
              />
            </div>
          </div>
          <div className="max-w-300 mx-auto mt-16 max-md:mt-10">
            <ArticleBody blocks={post.blocks} linkHref={page.productPath} />
          </div>
        </Container>
      </article>
      {moreArticles.length > 0 && (
        <InsideBitsika blog={content.blog} articles={moreArticles} />
      )}
      <Footer
        footer={content.footer}
        hero={content.hero}
        featureNav={featureNav}
        language={language}
        country={country}
        roundedTop={false}
      />
    </main>
  );
}
