import Image, { StaticImageData } from "next/image";
import Container from "@/components/layout/Container";
import blogImage1 from "@/assets/images/blog/blog_image_1.png";
import blogImage2 from "@/assets/images/blog/blog_image_2.png";
import blogImage3 from "@/assets/images/blog/blog_image_3.png";

const articles: { title: string; image: StaticImageData }[] = [
  {
    title: "Introducing Reusable Premium Cards for Ongoing Online Payments",
    image: blogImage1,
  },
  {
    title: "How Bitsika Protects Your Card Details When You Pay Online",
    image: blogImage2,
  },
  {
    title: "Updates to Our Virtual Cards: What Changed and Why It Matters",
    image: blogImage3,
  },
  {
    title: "Bitsika's New Look: A Simpler, More Intuitive Virtual Card Experience",
    image: blogImage1,
  },
  {
    title: "Maximize Card Security with Bitsika's Advanced Fraud Protection Features",
    image: blogImage2,
  },
  {
    title: "Unlock Global Shopping: How Bitsika Makes Online Payments Easy",
    image: blogImage3,
  },
];

function ArticleCard({ title, image }: { title: string; image: StaticImageData }) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer group">
      <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <p className="font-google-sans font-normal text-[17px] leading-[130%] tracking-[-0.01em] text-white">
        {title}
      </p>
    </div>
  );
}

export default function InsideBitsika() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="font-google-sans font-normaln text-2xl md:text-[40px] leading-[114%] tracking-[-0.01em] text-white">
            Inside Bitsika
          </h2>
          <p className="font-normal text-base leading-[130%] tracking-[-0.01em] text-[#8A8A8A] max-w-sm">
            Product updates, feature breakdowns, and ideas shaping how people pay online across borders.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
