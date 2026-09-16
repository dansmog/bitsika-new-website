import type { Metadata } from "next";
import RefocusPageView from "@/components/pages/RefocusPageView";
import { resolvePage } from "@/content/route";
import { buildLevelOneMetadata, buildLevelTwoMetadata } from "@/content/seo";

type RouteParams = { slug: string[] };

/**
 * Every page below the root. Static routes (privacy-policy, user/…, etc.) take
 * precedence over this catch-all, so they are unaffected.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await resolvePage(slug);

  return page.level === 1
    ? buildLevelOneMetadata(page.kind, page.language, page.content)
    : buildLevelTwoMetadata(
        page.kind,
        page.language,
        page.slug,
        page.content,
      );
}

export default async function RefocusPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const page = await resolvePage(slug);

  if (page.level === 1) {
    return (
      <RefocusPageView
        kind={page.kind}
        level={1}
        language={page.language}
        content={page.content}
      />
    );
  }

  return (
    <RefocusPageView
      kind={page.kind}
      level={2}
      language={page.language}
      slug={page.slug}
      content={page.content}
      moreGamesHeading={page.moreGamesHeading}
    />
  );
}
