# SEO API migration

This document tracks the in-progress migration of dynamic content away from
the GitHub-hosted JSON files (see [dynamic-content.md](./dynamic-content.md))
and onto the live SEO API.

> **Status:** Step 1 complete (API plumbing + `CountrySelector` cut over).
> The legacy GitHub JSON pipeline (`getContent` / `getImageContent`) is still
> the source of truth for everything else and **has not been removed**.

## Endpoints

Base URL: `https://transaction-api.bartelssneath.com/api/v2`

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/seo/languages` | List of supported language/country pairs (drives the country selector) |
| `GET` | `/seo/languages/translation?language=<lang>&country=<country>` | Full translation map for a given locale |
| `GET` | `/seo/products` | Game products + categories |

All three responses use the same envelope:

```json
{
  "data": ...,
  "status": "success",
  "message": "..."
}
```

## API client — [content/api.ts](../content/api.ts)

A new module that wraps the three endpoints with typed helpers:

- `getSeoLanguages()` → `ApiEnvelope<SeoLanguage[]>`
- `getSeoTranslations(language, country)` → `ApiEnvelope<SeoTranslation>`
- `getSeoProducts()` → `ApiEnvelope<SeoProduct[]>`

Each call uses `fetch(url, { next: { revalidate: 3600 } })`, so multiple
server components calling the same endpoint within one request share a single
network round-trip (Next's request-scoped fetch cache), and responses are
revalidated every hour at the edge.

The exported types (`SeoLanguage`, `SeoTranslation`, `SeoProduct`) are the
single source of truth for the API shape — components consume them by import,
not by re-declaring.

## Wiring into [app/page.tsx](../app/page.tsx)

The home page now fetches all three endpoints in parallel alongside the
existing GitHub JSON loaders:

```ts
const [content, imageContent, seoLanguages, seoTranslations, seoProducts] =
  await Promise.all([
    getContent(),
    getImageContent(),
    getSeoLanguages(),
    getSeoTranslations("en", "us"),
    getSeoProducts(),
  ]);
```

A `console.log("[SEO] ... →", JSON.stringify(...))` line per response prints
to the **server terminal** (where `pnpm dev` is running) — not the browser
console, since these are server components.

The `seoTranslations` and `seoProducts` logs are currently commented out;
uncomment them when you want to inspect those payloads.

## CountrySelector — first real consumer

The country dropdown is now driven by `/seo/languages` instead of a
hardcoded array.

### [components/layout/Navbar.tsx](../components/layout/Navbar.tsx)

`Navbar` became an async server component that fetches the languages list and
forwards `data` as a prop:

```tsx
const { data: languages } = await getSeoLanguages();
// ...
<CountrySelector languages={languages} />
```

### [components/ui/CountrySelector.tsx](../components/ui/CountrySelector.tsx)

Now receives `languages: SeoLanguage[]` as a prop, filters by `is_display`,
and renders one button per option. Notable changes:

- Removed the hardcoded `countries` array.
- Removed `disabled` from the trigger — the dropdown opens on click again.
- Locale label is built as `${language}-${country}` (e.g. `en-us`, `fr-sn`).
- `FLAGS_BY_COUNTRY` maps the API's 2-letter country code to a flag asset.
  Codes with no asset (currently `rw`) render the existing grey-circle
  placeholder — adding `RW.svg` in `assets/images/countryflag/` and a
  `rw: flagRW` entry will light it up.

### Flag coverage

| Country code | Flag asset | Status |
|---|---|---|
| `us` | `USA.png` | ✅ |
| `gb` | `UK.svg` | ✅ (not currently returned by API) |
| `ng` | `NG.svg` | ✅ |
| `cm` | `XOF.svg` | ✅ (West African franc) |
| `sn` | `XOF.svg` | ✅ (West African franc) |
| `tz` | `TZS.svg` | ✅ |
| `lr` | `LIB.svg` | ✅ |
| `mw` | `MLW.svg` | ✅ |
| `gh` | `GHS.svg` | ✅ |
| `cn` | `CHN.svg` | ✅ |
| `kr` | `KOR.svg` | ✅ |
| `jp` | `JPN.svg` | ✅ |
| `ru` | `RUS.svg` | ✅ |
| `rw` | — | ⚠️ Placeholder until `RW.svg` is added |

## What's still on the GitHub JSON pipeline

Everything outside the country selector. The next steps are:

1. Replace `getContent()` calls with `getSeoTranslations(language, country)`
   and adapt `content/shape.ts` to consume the API's translation map keys
   (e.g. `meta-title`, `hero-h1`, `info-box-heading-1`) instead of the
   GitHub JSON's `{variable, text}[]` rows.
2. Replace the hardcoded games grid with `getSeoProducts()`.
3. Once both consumers are migrated, delete `content/loader.ts`,
   `content/sources.ts`, and the GitHub JSON references.

## Cache notes

- All `fetch` calls use `revalidate: 3600` (1 hour). Lower this in
  [content/api.ts](../content/api.ts) if you need faster iteration during
  testing.
- The GitHub JSON loader still uses `cache: "no-store"` so unrelated content
  changes don't get blocked by API caching during the migration.
