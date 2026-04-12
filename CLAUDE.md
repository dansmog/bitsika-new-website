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

### The dynamic content pipeline (the most important thing to understand)

All user-visible copy on the marketing page is **fetched at request time from a remote JSON**, not hardcoded in components. The pipeline is three layers:

1. **[content/sources.ts](content/sources.ts)** — a locale → URL registry (`CONTENT_SOURCES`). Adding a language is a one-line change here.
2. **[content/loader.ts](content/loader.ts)** — `getContent(locale)` fetches the JSON with `fetch(url, { next: { revalidate: 3600 } })`, converts the flat `{variable, text}[]` into a `Map`, and calls the shape builder. Next's request-scoped fetch cache means calling `getContent()` from both `generateMetadata` and `page.tsx` hits the network only once per request.
3. **[content/shape.ts](content/shape.ts)** — `buildContent()` turns the flat map into a typed `Content` object with one field per section (`hero`, `infoBoxGroups`, `ctas`, `table`, `steps`, `testimonials`, `comparison`, `blog`, `faq`, `footer`, `meta`). It also handles fan-out: 12 info boxes → 4 groups of 3; table cells `a..e × 1..13` → headers + rows; etc. Cardinalities are constants at the top of the file.

[app/page.tsx](app/page.tsx) is an **async Server Component** that awaits `getContent()` and drills typed slices into each section (e.g., `<CtaBanner cta={content.ctas[2]} hero={content.hero} />`). [app/layout.tsx](app/layout.tsx) does the same from `generateMetadata` and `RootLayout` for `<title>`, `<meta name="description">`, and `<html lang>`.

**Rules when touching content:**

- Components never fetch. They receive their slice as a typed prop from `page.tsx`.
- Client components (those marked `"use client"` for state/animation — e.g., `FAQ`, `Testimonials`, `GetStarted`) cannot be `async`, but their server parent can be. Fetch on the server, pass plain serializable props down.
- The same component can appear multiple times with different slices (`InfoBlock` renders 4 times with `infoBoxGroups[0..3]`; `CtaBanner` renders 4 times with `ctas[0..3]`). This is intentional — don't collapse them.
- Some JSON labels contain `**bold**` markers. [lib/formatText.ts](lib/formatText.ts) exports `splitBold()` which parses `"Download on the **App Store**"` into `{prefix, emphasis}`. [components/ui/DownloadButtons.tsx](components/ui/DownloadButtons.tsx) uses it for the mobile two-line variant; desktop renders the raw string.
- Adding a new section: extend `Content` and `buildContent()` in `shape.ts`, then pass the slice from `page.tsx`. See [docs/dynamic-content.md](docs/dynamic-content.md) for a walk-through.
- **Hybrid sections**: `BuiltDifferent` and `InsideBitsika` only pull heading/text from the JSON — their card/article lists (with image imports) stay hardcoded because they're driven by a separate `image-content.json` source that is out of scope for this text pipeline. `GamesGrid` is the same — not wired to the text JSON.
- **Footer link URLs** are hardcoded in local `RESOURCE_URLS` / `SOCIAL_URLS` arrays inside [components/layout/Footer.tsx](components/layout/Footer.tsx) and matched to JSON-supplied labels by index. URLs are not translatable; labels are.

### Component layout

- [components/layout/](components/layout/) — `Header`, `Footer`, `Container`. Header forwards `hero` to `HeroBanner`.
- [components/sections/](components/sections/) — one file per page section, each takes a typed content prop.
- [components/ui/](components/ui/) — leaf components (`DownloadButtons`, `Qrcode`, `Ratings`, `ComparisonTable`). Leaf UI receives primitive props, not `Content` slices.

### Styling

Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — theme lives in [app/globals.css](app/globals.css) via `@theme`). Semantic color tokens are defined there (`bg-ink`, `text-ink-secondary`, `border-border-default`, `bg-brand-blue-light`, etc.) — prefer these over raw hex. Fonts are wired via `next/font` and exposed as CSS vars (`--font-google-sans`).

### Path aliases

`@/*` → repo root (configured in `tsconfig.json`). Import as `@/content`, `@/components/ui/...`, `@/lib/formatText`, `@/assets/images/...`.

### Type safety across the content boundary

Even though content is loaded at runtime from a remote URL, every component has a statically typed prop pulled from `content/shape.ts`. If you rename a field in `shape.ts`, TypeScript will flag every consumer. Run `npx tsc --noEmit` after shape changes.
