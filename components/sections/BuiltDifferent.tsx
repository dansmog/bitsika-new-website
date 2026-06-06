import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import type { ComparisonContent } from "@/content/shape";
import type { VrsCompany } from "@/content/imageShape";
import { pathForCompetitor } from "@/content/seo";

type BuiltDifferentProps = {
  comparison: ComparisonContent;
  vrs: VrsCompany[];
  language: string;
  country: string;
  /** Competitor slugs that have a page for the current lang-country. */
  linkedSlugs: Set<string>;
};

export default function BuiltDifferent({
  comparison,
  vrs,
  language,
  country,
  linkedSlugs,
}: BuiltDifferentProps) {
  const cardClassName =
    "flex items-center gap-3 bg-surface-subtle rounded-[20px] px-5 md:px-6 py-[18.3px] md:py-5.25";

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="max-w-180 font-google-sans font-normal text-[40px] leading-[114%] tracking-[-0.01em] text-ink">
            {comparison.heading}
          </h2>
          <p className=" max-w-168.5 font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary">
            {comparison.text}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {vrs.map((company, index) => {
            const isLinked = linkedSlugs.has(company.slug);
            const labelClassName = `md:font-semibold text-lg leading-[130%] text-ink${
              isLinked ? " underline" : ""
            }`;

            const content = (
              <>
                <Image
                  src={company.image.src}
                  alt={company.image.alt || company.name}
                  width={48}
                  height={48}
                  className="shrink-0 w-12 h-12 rounded-[10px] object-contain"
                />
                <div className="flex flex-row md:flex-col">
                  <span className={labelClassName}>Bitsika vs.</span>
                  <span className={`pl-1 md:pl-0 ${labelClassName}`}>
                    {company.name}
                  </span>
                </div>
              </>
            );

            return isLinked ? (
              <Link
                key={index}
                href={pathForCompetitor(language, country, company.slug)}
                className={cardClassName}
              >
                {content}
              </Link>
            ) : (
              <div key={index} className={cardClassName}>
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
