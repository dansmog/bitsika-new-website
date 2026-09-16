# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

| Task | Command |
|---|---|
| Dev server | `pnpm dev` (Next dev on http://localhost:3000) |
| Production build | `pnpm build` |
| Start prod server | `pnpm start` |
| Lint | `pnpm lint` |
| Typecheck | `npx tsc --noEmit` |

There is no test suite configured in this repo.

## Architecture

### Next.js App Router — non-standard version

This project uses a version of Next.js whose APIs may differ from what's in training data. Before writing routing, data-fetching, metadata, or config code, consult `node_modules/next/dist/docs/` and heed deprecation notices. This is not optional — see `AGENTS.md`.

### Routing — language pages (the refocus structure)

The site is addressed by **language only**. There are no country pages. Two page families (gift cards, top-ups) × two levels = four page types:

| URL | Page |
|---|---|
| `/` | Gift-card level 1, English |
| `/<lang>-lang` | Gift-card level 1 |
| `/buy-<slug>-gift-card-with-crypto` | Gift-card level 2, English |
| `/<lang>-lang/buy-<slug>-gift-card-with-crypto` | Gift-card level 2 |
| `/top-up-with-crypto` | Top-up level 1, English |
| `/<lang>-lang/top-up-with-crypto` | Top-up level 1 |
| `/top-up-with-crypto/top-up-<slug>-with-crypto` | Top-up level 2, English |
| `/<lang>-lang/top-up-with-crypto/top-up-<slug>-with-crypto` | Top-up level 2 |

Two route files carry all of it: [app/page.tsx](app/page.tsx) for the root and [app/[...slug]/page.tsx](app/[...slug]/page.tsx) for everything else. Both delegate to **`resolvePage(segments)`** in [content/route.ts](content/route.ts) — the single place that decides what a path means. Static routes (`privacy-policy`, `user/…`, …) take precedence over the catch-all and are unaffected.

**Only the URLs above resolve — nothing is redirected.** Retired URLs from the old structure (`/en-ng/gift-card`, `/es-mx/roblox`, `/gift-card`, `/game-top-ups`, `/free-fire`, …) deliberately 404, as do non-canonical forms like `/en-lang/…` (English never carries a prefix) and `/top-up-with-crypto/<bare-slug>`. Don't add redirects for them. The one unrelated redirect is `/crypto-virtual-card-iran` → `/iran-ofac-clarification` in `next.config.ts`. [proxy.ts](proxy.ts) only sets the `x-pathname` header.

### The content pipeline (the most important thing to understand)

All user-visible copy is **fetched at request time from GitHub Pages**, not hardcoded. Everything funnels through one function:

**`buildContent(locale, Map<string,string>)`** in [content/shape.ts](content/shape.ts) turns a flat `variable → text` map into a typed `Content` object with one field per section. It fans out by naming convention: 12 info boxes → 4 groups of 3; `table-cell-{a..e}-{1..13}` → headers + 12 rows; 15 FAQs; 5 testimonials. Cardinalities are constants at the top of the file. **All four page types use identical variable names**, so this is the only parser in the codebase.

[content/refocus.ts](content/refocus.ts) is the data layer, parameterised by `kind` (`"gift-card" | "top-up"`). It owns the base URLs, path helpers (`levelOnePath`, `productPath`, `languageFromSegment`, `slugFromProductSegment`) and the fetchers: `getLanguages`, `getLevelOneContent`, `getLevelTwoContent`, `getProducts`, `getSkus`, `getImages`.

Remote tree, under `https://bitsika.github.io/game-homepage/refocus-pages/`:

```
general-tools/lang-list.json          feature-list.json
<kind>-pages/content/<lang>/level-1/content.json
<kind>-pages/content/<lang>/level-2/<slug>.json
<kind>-pages/tools/product-list.json   tools/images/…
```

**The two product lists have different schemas** — a real trap:

| | gift-card | top-up |
|---|---|---|
| brand field | `brand-name` | `brand_name` (underscore) |
| image | `image-name` field | none — file is `<slug>.webp` |
| display gate | `display-status` | none, show all |
| currency line | absent | `product-currency` |
| alt text | `<brand> gift card image` | `<brand> top up image` |

`getProducts()` normalises both into `RefocusProduct`. Products render in **JSON array order** — deliberately not re-sorted.

**Rules when touching content:**

- Components never fetch page copy. They receive their slice as a typed prop.
- Client components (`"use client"` — `FAQ`, `Testimonials`, `GetStarted`, `Footer`, `LanguageSelector`) cannot be `async`, but their server parent can be. Fetch on the server, pass serializable props down.
- Fetches use `cache: "no-store"` plus a `?t=` buster, because GitHub Pages' CDN ignores `no-store` and the content owner edits JSON expecting it live. `react`'s `cache()` wraps the hot fetchers so one render still makes one request.
- Some labels contain `**bold**`. [lib/formatText.ts](lib/formatText.ts) has `splitBold()` (two-line store buttons) and `splitAsteriskLink()` — the latter turns the bold span in a level-2 `hero-h2` into the "up one level" link, via `HeroBanner`'s `h2Href`.
- **Footer link URLs** live in `RESOURCE_URLS` / `SOCIAL_URLS` inside [components/layout/Footer.tsx](components/layout/Footer.tsx), matched to JSON labels **by position**. The JSON order is fixed across languages and kinds; if it ever changes, those arrays move with it.
- The **nav is JSON-driven**: [content/features.ts](content/features.ts) reads `feature-list.json`; every key but `lang` becomes an item. `featureHref()` resolves `gift-cards` and `top-ups` within the current language; other keys render as plain text, and `features` is the footer column heading rather than a nav item.

### Page template

[components/pages/RefocusPageView.tsx](components/pages/RefocusPageView.tsx) renders **all four page types**. Section order:

> Header → grid → Info 1 → CTA 1 → comparison table → Info 2 → (level 2: more-products) → CTA 2 → GetStarted → CTA 3 → Testimonials → CTA 4 → FAQ → Footer

Info-block rows 3 and 4, the competitor "vs." section and the blog section were **removed** in the refocus rebuild — their components are deleted. The comparison *table* stays. Level 2 shows a SKU grid (no links — you are already on that product's page) and excludes the focus product from its "more products" carousel.

### SEO

[content/seo.ts](content/seo.ts) builds absolute canonical + hreflang. Order is fixed: English first, other languages alphabetically, `x-default` (→ English) last; only display-on languages appear. `<html lang>` comes from [app/layout.tsx](app/layout.tsx) reading the `x-pathname` header that `proxy.ts` sets.

### Component layout

- [components/layout/](components/layout/) — `Header` → `Navbar` → `GameNav` + `LanguageSelector`; `Footer`; `Container`.
- [components/sections/](components/sections/) — one file per page section, each takes a typed content prop.
- [components/ui/](components/ui/) — leaf components (`GameCard`, `DownloadButtons`, `Qrcode`, `Ratings`, `ComparisonTable`). Leaf UI receives primitive props, not `Content` slices.

### Styling

Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — theme lives in [app/globals.css](app/globals.css) via `@theme`). Semantic color tokens are defined there (`bg-ink`, `text-ink-secondary`, `border-border-default`, `bg-brand-blue-light`, etc.) — prefer these over raw hex. Fonts are wired via `next/font` and exposed as CSS vars (`--font-google-sans`).

### Path aliases

`@/*` → repo root (configured in `tsconfig.json`). Import as `@/content`, `@/components/ui/...`, `@/lib/formatText`, `@/assets/images/...`.

### Type safety across the content boundary

Even though content is loaded at runtime from a remote URL, every component has a statically typed prop pulled from `content/shape.ts`. If you rename a field in `shape.ts`, TypeScript will flag every consumer. Run `npx tsc --noEmit` after shape changes.
