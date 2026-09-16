import type { Metadata } from "next";
import RefocusPageView from "@/components/pages/RefocusPageView";
import { resolvePage } from "@/content/route";
import { buildLevelOneMetadata } from "@/content/seo";

/**
 * Site root: the English level-1 gift-card page. Every other page is handled by
 * the [...slug] catch-all.
 */

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolvePage([]);
  return buildLevelOneMetadata(page.kind, page.language, page.content);
}

export default async function HomePage() {
  const page = await resolvePage([]);

  return (
    <RefocusPageView
      kind={page.kind}
      level={1}
      language={page.language}
      content={page.content}
    />
  );
}
