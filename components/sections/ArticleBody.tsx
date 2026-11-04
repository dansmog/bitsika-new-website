import Link from "next/link";
import type { ArticleBlock } from "@/content/blog";
import { splitAsteriskLinks } from "@/lib/formatText";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
  /** Where `**marked**` text in a paragraph links to (the parent product page). */
  linkHref: string;
};

/**
 * Renders a post body in order. Paragraphs and sub-headings get one unit of
 * space below; a section break adds two more, so the gap there totals three
 * units of empty space, not a line.
 */
export default function ArticleBody({ blocks, linkHref }: ArticleBodyProps) {
  return (
    <div className="font-google-sans text-xl leading-normal text-ink-secondary max-md:text-[17px]">
      {blocks.map((block, i) => {
        if (block.kind === "section-break") {
          return <hr key={i} className="h-4 border-0 max-md:h-8" />;
        }
        if (block.kind === "subheading") {
          return (
            <h2 key={i} className="pb-4 font-medium max-md:pb-4">
              {block.text}
            </h2>
          );
        }
        return (
          <p key={i} className="pb-4 max-md:pb-4">
            {splitAsteriskLinks(block.text).map((part, j) =>
              part.link ? (
                <Link
                  key={j}
                  href={linkHref}
                  className="font-medium text-brand-blue-mid underline"
                >
                  {part.text}
                </Link>
              ) : (
                part.text
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}
