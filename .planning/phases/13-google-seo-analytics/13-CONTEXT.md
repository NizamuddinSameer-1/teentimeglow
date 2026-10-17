# Phase 13: Google Analytics 4, Search Console, Sitemap & Search Engine Optimization - Context

**Gathered:** 2026-10-18  
**Status:** Ready for planning

## Phase Boundary
Equip TeenTimeGlow (`https://teentimeglow.me`) with a production-grade SEO foundation, non-blocking Google Analytics 4 tracking, Google Search Console ownership verification, automated XML sitemap, `robots.txt`, rich JSON-LD structured schemas, and canonical tags so Google indexes and ranks the website.

## Implementation Decisions

### 1. Domain & Canonical URLs
- **DECIDED:** Canonical domain is `https://teentimeglow.me`.
- **DECIDED:** Every page rendered will output a dynamic canonical link: `<link rel="canonical" href="https://teentimeglow.me{path}" />` to prevent duplicate content penalties.

### 2. Google Analytics 4 (GA4) Tracking
- **DECIDED:** Build a dedicated non-blocking Astro component (`src/components/Analytics.astro`).
- **DECIDED:** Read Google Analytics ID from `import.meta.env.PUBLIC_GA_MEASUREMENT_ID` with graceful fallback if the environment variable is not yet configured.
- **DECIDED:** Mount asynchronously in `src/layouts/BaseLayout.astro` so it does not block the main thread or degrade Lighthouse performance scores.

### 3. Google Search Console Verification
- **DECIDED:** Provide both HTML meta tag verification (`<meta name="google-site-verification" content="..." />`) and document DNS/HTML file verification methods.
- **DECIDED:** Support verification code via `PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable.

### 4. XML Sitemap & Robots.txt
- **DECIDED:** Provide a clean, crawlable `public/sitemap.xml` containing all 7 main routes (`/`, `/wallpapers`, `/quotes`, `/rankings`, `/edits`, `/quiz`, `/gallery`) plus individual dynamic article URLs (`/edits/[slug]`).
- **DECIDED:** Provide `public/robots.txt` granting full crawl permissions to `User-agent: *` and explicitly pointing to `Sitemap: https://teentimeglow.me/sitemap.xml`.

### 5. Google Structured Data (JSON-LD Schemas)
- **DECIDED:** Include `WebSite` & `Organization` schema on the homepage.
- **DECIDED:** Include `BlogPosting` schema on `/edits/[slug]` for Google article rich snippets.
- **DECIDED:** Include `ItemList` schema on `/rankings` for star ratings and reviews in search results.
- **DECIDED:** Include `BreadcrumbList` schema across standalone subpages.

### 6. User Step-by-Step Action Guide
- **DECIDED:** Provide the user with a clear, numbered checklist of actions to take in Google Search Console and Google Analytics dashboard to finalize verification and request initial crawl indexing.

---
*Phase: 13-google-seo-analytics*  
*Context gathered: 2026-10-18*
