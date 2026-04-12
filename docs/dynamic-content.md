# Dynamic Content System

This document explains how the Bitsika marketing site loads its copy (headings, button labels, FAQ answers, etc.) from a remote JSON file instead of hard-coding it in components. The goal is **i18n readiness**: swapping languages later should only require pointing to a different URL — no component changes.

---

## 1. The Big Picture

```
┌─────────────────────┐
│ main-content.json   │   (remote, per-locale)
│ (flat variable list)│
└──────────┬──────────┘
           │ fetch (Next cached)
           ▼
┌─────────────────────┐
│ content/loader.ts   │   parses JSON → Map<variable,text>
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ content/shape.ts    │   buildContent() groups flat entries
│                     │   into structured objects per section
└──────────┬──────────┘
           │ returns `Content`
           ▼
┌─────────────────────┐
│ app/page.tsx (async)│   awaits getContent(), passes slices
└──────────┬──────────┘
           │ props
           ▼
┌─────────────────────┐
│ <Header hero=…/>    │
│ <CtaBanner cta=…/>  │   each component receives only the
│ <FAQ faq=…/>        │   slice it needs
│ …                   │
└─────────────────────┘
```

The flat JSON is the **source of truth**. Components never read that shape directly — they receive a structured subtree matching their UI.

---

## 2. Why Not Just Hard-Code Strings?

- **Localization**: A Spanish or French build should be a different JSON URL, not a different component tree.
- **Editor workflow**: Copy can be updated without touching code (or redeploying, thanks to Next's revalidation).
- **Single source of truth**: The JSON is authored once and consumed everywhere.
- **Type safety**: Even though the source is dynamic, TypeScript still catches typos in component props because we shape the data into typed objects early.

---

## 3. The Three Layers

### Layer A — Source registry: [content/sources.ts](../content/sources.ts)

A locale → URL map. Today only `en-US` exists, but adding `es-ES` is a one-line change here. The registry also exports `DEFAULT_LOCALE` and a `Locale` type derived from the keys of the map (so TypeScript knows which locales are valid).

```ts
export const DEFAULT_LOCALE = "en-US" as const;
export const CONTENT_SOURCES = {
  "en-US": "https://bitsika.github.io/game-homepage/main-content.json",
} as const;
export type Locale = keyof typeof CONTENT_SOURCES;
```

**Why a registry?** Because the URL per locale will eventually come from a country/language selector. Centralizing it means nothing else in the codebase needs to know how URLs are picked.

### Layer B — Fetch + parse: [content/loader.ts](../content/loader.ts)

Responsible for exactly one thing: getting bytes from the network and handing them to the shape builder.

```ts
export async function getContent(
  locale: Locale = DEFAULT_LOCALE,
): Promise<Content> {
  const url = CONTENT_SOURCES[locale];
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(...);
  const entries = (await res.json()) as ContentEntry[];
  const map = new Map(entries.map((e) => [e.variable, e.text]));
  return buildContent(locale, map);
}
```

Key details:

- **`next: { revalidate: 3600 }`** — Next.js extends `fetch` with a caching layer. This tells Next to serve a cached copy for up to one hour, then refresh on the next request. Editors can update copy and it propagates within the hour without a redeploy.
- **Map conversion** — The JSON arrives as an array of `{variable, text}` rows. We convert it into a `Map` so downstream lookups are O(1) (`map.get("hero-h1")`).
- **Auto-dedup** — Next's `fetch` memoizes identical requests within a single render pass, so calling `getContent()` from both `generateMetadata` and the page component costs exactly **one** network hit.

### Layer C — Shape builder: [content/shape.ts](../content/shape.ts)

This is the heart of the system. The remote JSON is flat:

```json
[
  { "variable": "hero-h1", "text": "Pay online…" },
  { "variable": "info-box-heading-1", "text": "…" },
  { "variable": "info-box-point-a-1", "text": "…" },
  { "variable": "cta-heading-2", "text": "…" },
  { "variable": "faq-question-7", "text": "…" },
  …
]
```

`buildContent(locale, map)` walks that map and produces a structured object with **one field per UI section**:

```ts
export type Content = {
  locale: Locale;
  meta: Meta;                   // title, description, hreflang
  hero: HeroContent;            // h1, h2, button labels, stats
  infoBoxGroups: InfoBoxCard[][]; // 12 cards → 4 groups of 3
  ctas: CtaContent[];           // 4 CTA banners
  comparison: ComparisonContent;// BuiltDifferent heading/text
  table: TableContent;          // Comparison table headers + rows
  steps: StepsContent;          // GetStarted numbered steps
  testimonials: TestimonialsContent;
  blog: BlogContent;            // InsideBitsika heading/text
  faq: FaqContent;              // 15 Q&A
  footer: FooterContent;        // resources, socials, contact, copyright
};
```

Some subtleties:

- **Info box chunking**: The JSON has 12 info boxes (`info-box-heading-1…12`). The design uses the `<InfoBlock>` component **four times** on the page, each showing 3 cards. The shape builder pre-chunks the flat 12 into `infoBoxGroups[0..3]` so `page.tsx` can just write `infoBoxGroups[2]` without any slicing logic.
- **Table transposition**: The JSON stores table cells as `table-cell-a-1`, `table-cell-b-1`, …, `table-cell-e-12`. The shape builder walks columns `a..e` for the header row and rows `2..13` for data, producing `{headers: string[], rows: [{label, cells}]}` — the exact shape [ComparisonTable.tsx](../components/ui/ComparisonTable.tsx) renders.
- **Testimonials**: Each testimonial is three keys (`testimonial-user-N`, `testimonial-location-N`, `testimonial-text-N`). The shape collapses them into one object per entry. Note: the `location` field already contains the flag emoji (e.g., `"Rio de Janeiro, Brazil 🇧🇷"`), so components render it as a single string.
- **Meta**: Even though metadata isn't a visible "section", it lives in the same `Content` object so `generateMetadata()` in `app/layout.tsx` can share the cache with the page.

Counts used by the builder (all constants at the top of the file):

| Constant | Value | What it drives |
|---|---|---|
| `INFO_BOX_COUNT` | 12 | `info-box-heading-1…12` |
| `INFO_BOXES_PER_GROUP` | 3 | how infoBoxes chunk into groups |
| `CTA_COUNT` | 4 | four CTA banner variants |
| `TABLE_DATA_ROW_COUNT` | 12 | rows in the comparison table |
| `STEPS_COUNT` | 3 | GetStarted steps |
| `TESTIMONIAL_COUNT` | 5 | testimonial carousel items |
| `FAQ_COUNT` | 15 | FAQ accordion items |
| `FOOTER_RESOURCE_COUNT` / `FOOTER_SOCIAL_COUNT` | 4 / 4 | footer link groups |

If the JSON ever changes cardinality, you update the constant and every component affected picks up the new count automatically.

---

## 4. How `page.tsx` Ties It Together

[app/page.tsx](../app/page.tsx) is now an **async Server Component**:

```tsx
export default async function HomePage() {
  const content = await getContent();

  return (
    <main>
      <Header hero={content.hero} />
      <InfoBlock cards={content.infoBoxGroups[0]} />
      <CtaBanner cta={content.ctas[0]} hero={content.hero} />
      <Comparison table={content.table} />
      <InfoBlock cards={content.infoBoxGroups[1]} />
      <CtaBanner cta={content.ctas[1]} hero={content.hero} />
      <GetStarted steps={content.steps} />
      <InfoBlock cards={content.infoBoxGroups[2]} />
      <CtaBanner cta={content.ctas[2]} hero={content.hero} />
      <Testimonials testimonials={content.testimonials} />
      <InfoBlock cards={content.infoBoxGroups[3]} />
      <CtaBanner cta={content.ctas[3]} hero={content.hero} />
      <BuiltDifferent comparison={content.comparison} />
      <InsideBitsika blog={content.blog} />
      <FAQ faq={content.faq} />
      <Footer footer={content.footer} hero={content.hero} />
    </main>
  );
}
```

Notice:

- Each component gets **only the slice it needs**. `FAQ` doesn't see the hero. `Testimonials` doesn't see the footer. This keeps prop types narrow and intent clear.
- `CtaBanner` receives both `cta` *and* `hero`, because the CTA banners also render the App Store / Google Play buttons, and those labels live under `hero.*`.
- `Footer` also receives `hero` for the same reason (store buttons at the top of the footer).
- InfoBlock and CtaBanner appear multiple times with different slices — same component, different data.

### Why the page has to be async

Because components like `FAQ` and `Testimonials` are `"use client"` (they use `useState` for accordion/carousel state), they cannot be `async` themselves. But a **server** parent can be async. So the pattern is:

1. `page.tsx` is a server component → it can `await fetch`.
2. It passes plain serializable props down to client components.
3. Client components do their interactive thing with already-loaded data.

This is the canonical Next.js App Router pattern for "fetch on the server, render interactively on the client."

---

## 5. Metadata Side: [app/layout.tsx](../app/layout.tsx)

The root layout is also `async` and exports `generateMetadata`:

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    icons: { shortcut: "/favicon.ico" },
  };
}

export default async function RootLayout({ children }) {
  const content = await getContent();
  return <html lang={content.meta.hreflang}>…{children}…</html>;
}
```

Both `generateMetadata` and `RootLayout` call `getContent()`. Thanks to Next's request-scoped fetch cache, **this does not double-fetch** — the second call hits the memoized response. Same for `page.tsx` calling it a third time.

---

## 6. Handling `**bold**` Markers

Some labels in the JSON embed emphasis using `**asterisks**`, e.g.:

```
Download on the **App Store**
```

Desktop buttons show this as one line; mobile buttons split it into two stacked lines (small label above, bold brand below). [lib/formatText.ts](../lib/formatText.ts) has a tiny helper:

```ts
export function splitBold(text: string): { prefix: string; emphasis: string } {
  const match = text.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (!match) return { prefix: text, emphasis: "" };
  return { prefix: match[1].trim(), emphasis: match[2] };
}
```

[DownloadButtons.tsx](../components/ui/DownloadButtons.tsx) calls this on mobile to render the two-line variant. The JSON stays clean (no HTML), and the split is a presentation concern handled in the component.

---

## 7. What Each Wired Component Looks Like

| Component | Prop name | Type | Purpose |
|---|---|---|---|
| [Header.tsx](../components/layout/Header.tsx) | `hero` | `HeroContent` | Forwards to `HeroBanner` |
| [HeroBanner.tsx](../components/sections/HeroBanner.tsx) | `hero` | `HeroContent` | h1, h2, QR label, ratings, download buttons |
| [InfoBox.tsx](../components/sections/InfoBox.tsx) | `cards` | `InfoBoxCard[]` | Renders a group of 3 info cards |
| [CtaBanner.tsx](../components/sections/CtaBanner.tsx) | `cta`, `hero` | `CtaContent`, `HeroContent` | CTA heading/text + store buttons |
| [Comparison.tsx](../components/sections/Comparison.tsx) | `table` | `TableContent` | Section heading + `<ComparisonTable>` |
| [ComparisonTable.tsx](../components/ui/ComparisonTable.tsx) | `table` | `TableContent` | Renders headers + rows |
| [GetStarted.tsx](../components/sections/GetStarted.tsx) | `steps` | `StepsContent` | Heading, description, 3 steps |
| [Testimonials.tsx](../components/sections/Testimonials.tsx) | `testimonials` | `TestimonialsContent` | Carousel of 5 quotes |
| [BuiltDifferent.tsx](../components/sections/BuiltDifferent.tsx) | `comparison` | `ComparisonContent` | Heading + text (card providers stay hardcoded) |
| [InsideBitsika.tsx](../components/sections/InsideBitsika.tsx) | `blog` | `BlogContent` | Heading + text (articles stay hardcoded) |
| [FAQ.tsx](../components/sections/FAQ.tsx) | `faq` | `FaqContent` | Heading + 15 Q&A accordion |
| [Footer.tsx](../components/layout/Footer.tsx) | `footer`, `hero` | `FooterContent`, `HeroContent` | Labels + store buttons |

Notes on a couple of hybrid cases:

- **BuiltDifferent** and **InsideBitsika** only pull heading/text from the JSON. The provider card list and blog article thumbnails are still hardcoded because they're driven by a separate `image-content.json` source (images + titles tied to asset imports), which is out of scope for this text-content pipeline.
- **Footer resources/socials**: The JSON supplies the labels, but URLs live in a local constant array (`RESOURCE_URLS`, `SOCIAL_URLS`) inside [Footer.tsx](../components/layout/Footer.tsx) and are matched by index. This keeps external URLs out of the translatable content while letting labels still come from the JSON.

---

## 8. Adding a New Locale

1. Add the URL to `CONTENT_SOURCES` in [content/sources.ts](../content/sources.ts):
   ```ts
   "es-ES": "https://bitsika.github.io/game-homepage/main-content.es.json",
   ```
2. Call `getContent("es-ES")` from wherever the locale is decided (future: read from a cookie, country selector, or URL segment).
3. That's it — every component already uses the typed shape, so they'll render the new language automatically.

The only assumption is that every locale's JSON uses the **same variable names** and the **same cardinalities** (12 info boxes, 15 FAQs, etc.). If a locale needs different counts, update the constants in `shape.ts` or make them per-locale.

---

## 9. Adding a New Section

Say you want a "Press" section with heading, subheading, and 3 press logos.

1. **Extend the type** in `content/shape.ts`:
   ```ts
   export type PressContent = {
     heading: string;
     subheading: string;
     logos: Array<{ name: string }>;
   };
   // add `press: PressContent;` to `Content`
   ```
2. **Build it** inside `buildContent()`:
   ```ts
   press: {
     heading: get("press-heading"),
     subheading: get("press-subheading"),
     logos: Array.from({length: 3}, (_, i) => ({name: get(`press-logo-${i+1}`)}))
   }
   ```
3. **Create the component** `<PressSection press={…} />` with a typed prop.
4. **Pass the slice** in `page.tsx`: `<PressSection press={content.press} />`.

No component needs to fetch, no other section is affected.

---

## 10. Files Involved (Quick Reference)

- [content/sources.ts](../content/sources.ts) — locale → URL registry
- [content/loader.ts](../content/loader.ts) — fetch + parse + build
- [content/shape.ts](../content/shape.ts) — types + `buildContent()`
- [content/index.ts](../content/index.ts) — public barrel (`getContent`, types)
- [lib/formatText.ts](../lib/formatText.ts) — `**bold**` parser for button labels
- [app/layout.tsx](../app/layout.tsx) — async root + `generateMetadata`
- [app/page.tsx](../app/page.tsx) — async page, awaits content, drills props
- All wired components live under [components/sections/](../components/sections/) and [components/layout/](../components/layout/)

---

## 11. Mental Model in One Sentence

> **Fetch once on the server, reshape into typed section objects, pass each component only the slice it renders.**

Everything else (caching, i18n swapping, metadata) falls out of that pattern.
