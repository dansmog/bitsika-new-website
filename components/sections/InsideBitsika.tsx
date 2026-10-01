import Image from "next/image";
import Container from "@/components/layout/Container";
import type { BlogContent } from "@/content/shape";
import type { BlogArticle } from "@/content/imageShape";

type ArticleCardProps = {
  article: BlogArticle;
};

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer group">
      <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
        <Image
          src={article.image.src}
          alt={article.image.alt || article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <p className="font-google-sans font-normal text-[17px] leading-[130%] tracking-[-0.01em] text-white">
        {article.title}
      </p>
    </div>
  );
}

type InsideBitsikaProps = {
  blog: BlogContent;
  articles: BlogArticle[];
};

export default function InsideBitsika({ blog, articles }: InsideBitsikaProps) {
  return (
    <section className="bg-ink py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="font-google-sans font-normaln text-2xl md:text-[40px] leading-[114%] tracking-[-0.01em] text-white">
            {blog.heading}
          </h2>
          <p className="font-normal text-base leading-[130%] tracking-[-0.01em] text-[#8A8A8A] max-w-sm">
            {blog.text}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
