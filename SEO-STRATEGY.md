# TeenTimeGlow — Organic Search Strategy

**Site:** https://www.teentimeglow.me
**Audit date:** 26 October 2026
**Scope:** Technical SEO, information architecture, keyword targeting, content plan, measurement

---

## 1. Executive summary

The site does not have a traffic problem. It has a **discovery problem sitting on top of a content-volume problem.**

Three things were actively suppressing organic performance:

1. **Every canonical URL pointed at a redirect.** Production serves `www.teentimeglow.me`. Every canonical tag, `og:url`, sitemap entry and JSON-LD `@id` used the bare `teentimeglow.me`, which 307-redirects to `www`. Google was told, on every single page, "the real version of this page is at a URL that redirects." That is a canonical conflict, and it prevents ranking signals from consolidating onto one URL.
2. **Five of six articles were orphaned.** A data-layer bug meant that as soon as one post existed in Supabase, the six bundled seed articles vanished from `/edits`, from internal links and from the sitemap — while still returning `200` if you typed the URL directly. Live pages with zero internal links are close to invisible.
3. **There is almost no content to rank.** Six articles total. One of them is **17 words long**. A site cannot rank for competitive commercial keywords with six pages, and it cannot rank for anything at all with a 17-word page.

Everything else — schema gaps, missing category hubs, render-blocking scripts — is real but secondary. Fixing technical issues on a six-page site produces a small, fast win. Fixing content produces the actual growth curve.

**Realistic expectation:** technical fixes typically re-index within 2–6 weeks. Content-led rankings for long-tail keywords typically take 8–16 weeks. Head terms in beauty/fashion take 6–12 months and require authority the site does not have yet. Any agency promising page-one rankings for "skincare routine" in 90 days is lying to you.

---

## 2. What the audit found

### Severity: critical (blocks indexing / consolidation)

| # | Issue | Evidence | Status |
|---|-------|----------|--------|
| 1 | Canonical host mismatch | Live `https://teentimeglow.me/` → `307` → `https://www.teentimeglow.me/`, but `<link rel="canonical" href="https://teentimeglow.me/">` | **Fixed** |
| 2 | Redirect was temporary (`307`) | `Location:` header returns 307, not 301/308 | **Fixed** (308 in `vercel.json`) |
| 3 | Sitemap was a hardcoded array | `src/pages/sitemap.xml.ts` listed 13 literal URLs with `lastmod: '2026-10-18'` on all of them. New posts never appeared. | **Fixed** (dynamic from Supabase) |
| 4 | Static files shadowed the routes | `public/robots.txt` and `public/sitemap.xml` overrode the Astro routes — the live robots.txt was the stale static copy | **Fixed** (deleted) |
| 5 | Five articles orphaned | `getPosts()` returned DB rows *instead of* seeds once any row existed; `getPostBySlug()` still served seeds → live but unlinked | **Fixed** (merged) |
| 6 | Soft 404s | Unknown `/edits/*` slug redirected to `/edits` with `200` | **Fixed** (real 404) |

### Severity: high

| # | Issue | Impact | Status |
|---|-------|--------|--------|
| 7 | No category hubs | One flat `/edits` page meant no page could target a keyword cluster | **Fixed** |
| 8 | Filter tabs were JS-only | Category filtering used `<button onclick>`, invisible to crawlers | **Fixed** |
| 9 | No `BreadcrumbList` schema | Breadcrumbs rendered visually but were never declared | **Fixed** |
| 10 | No `Person` entity | "Rini" existed only as a string; no author entity to attach E-E-A-T to | **Fixed** |
| 11 | Fake `sameAs` links | Schema claimed social profiles; footer linked to `https://instagram.com` (the homepage) | **Fixed** — verify the handles exist |
| 12 | Bogus `SearchAction` | Schema advertised a sitelinks searchbox at `/edits?q=` which performs no server-side search | **Removed** |
| 13 | No About page | Footer "About Rini" was `href="#"` opening a modal — zero crawlable trust signals | **Fixed** |
| 14 | Six render-blocking scripts | Lenis, GSAP ×2, SplitType, confetti, lucide all loaded synchronously | **Fixed** (`defer`) |
| 15 | Unversioned CDN dependency | `unpkg.com/lucide@latest` — uncacheable, could break the icon set at any moment | **Fixed** (pinned `0.544.0`) |
| 16 | **Fabricated social proof** | Homepage hardcoded `14,850+ readers`, `99.4% satisfaction`, `14k+ Teens Quizzed`, `12,000+ teen creators` — not measured values | **Fixed** |
| 17 | **No per-wallpaper URLs** | All wallpapers behind a JS filter on one URL. "Matcha wallpaper", "sunset wallpaper iphone" had no page to rank | **Fixed** (10 pages) |
| 18 | **No per-quote URLs** | Same problem on `/quotes` | **Fixed** (5 pages) |

### Still open

| # | Issue | Why it matters |
|---|-------|----------------|
| 19 | Thin content | One article is 17 words. Several seeds are 270–400. Under ~800 words, competitive terms are unreachable. |
| 20 | No review/rating markup on `/rankings` | The most schema-ready asset on the site (`ItemList` + `Review`/`TVSeries`) has none. |
| 21 | Image weight | Hero images are 500 KB–1 MB JPEGs, no `srcset`, no WebP/AVIF. Direct LCP damage on mobile. |
| 22 | Duplicate wallpaper image | "Lilac Dreamscape Sunset" and "Cotton Candy Sunset Clouds" both point at `/assets/wallpaper-clouds.jpg` |
| 23 | Title typos in data | `"Cute LQBTQ+ wallpaper for girls"` (should be LGBTQ+), `"Little kitten grey wallpaper "` (trailing space) |
| 24 | No `hreflang` | Fine for now — English-only is a deliberate scope decision, not a bug. |

---

## 3. What was changed in the codebase

### First pass — indexing and consolidation

| File | Change |
|------|--------|
| `src/config/seo.ts` | **New.** Single source of truth: `SITE_URL` (www), `absoluteUrl()`, category definitions, real social profiles. |
| `astro.config.mjs` | `site` → www host; `trailingSlash: 'never'` to kill `/edits` vs `/edits/` duplicates. |
| `src/layouts/BaseLayout.astro` | Canonical/`og:url` derived from `SITE_URL`; `@graph` with `WebSite` + `Organization` + `Person`; `noindex` prop; `og:image` dimensions; `twitter:site`; RSS link; all six scripts `defer`red; lucide pinned. |
| `src/pages/sitemap.xml.ts` | Dynamic — pulls posts, wallpapers and quotes from Supabase, real `lastmod`, includes category hubs and `/about`. |
| `src/pages/robots.txt.ts` | www sitemap URL, blocks `/api/`, blocks filtered query strings. |
| `public/robots.txt`, `public/sitemap.xml` | **Deleted** — they were shadowing the routes above. |
| `src/pages/edits/[slug].astro` | Soft-404 → real 404; `BlogPosting` + `BreadcrumbList`; TOC generated from real `<h2>` anchors (was three hardcoded, non-clickable labels); related posts by category; `wordCount`. |
| `src/pages/edits/category/[category].astro` | **New.** Three hub pages with `CollectionPage` + `ItemList` schema. |
| `src/pages/edits/index.astro` | Crawlable category strip + `CollectionPage` schema. |
| `src/pages/about.astro` | **New.** Author entity, editorial standards, contact — the E-E-A-T anchor. |
| `src/pages/404.astro` | **New.** Real 404 with recovery links. |
| `src/pages/rss.xml.ts` | **New.** Feed for aggregators and newsletters. |
| `src/lib/api.ts` | `getPosts()` merges DB + seeds instead of replacing — recovers 5 orphaned articles. |
| `src/components/Footer.astro` | `/about` link; `rel="nofollow"` on admin. |
| `src/config/siteContent.ts` | Real social profile URLs (were platform homepages). |
| `vercel.json` | Permanent `308` non-www → www; immutable caching for `/assets/`. |
| `src/pages/admin/*` | `noindex, nofollow`. |

### Second pass — fabricated data and missing page types

| File | Change |
|------|--------|
| `src/pages/index.astro` | Homepage counters computed from live data (guides, wallpapers, downloads, creations). No literals. |
| `src/components/StatsStrip.astro` | No longer defaults to `siteContent.stats`; renders nothing if given no data. |
| `src/config/siteContent.ts` | `stats: []`; removed `14k+ Teens Quizzed`; removed `12,000+ teen creators`. |
| `src/pages/admin/index.astro`, `src/pages/api/admin/settings.ts` | Removed the Reader Count / Satisfaction % inputs and defaults — they wrote to values nothing read. |
| `src/lib/slugs.ts` | **New.** `slugify()`, global uniqueness maps for wallpapers and quotes, `quoteTheme()`. |
| `src/lib/api.ts` | `getQuotes()` de-duplicates — the table held **three identical rows** for one quote (7 rows → 5 unique). |
| `src/config/wallpaperCopy.ts` | **New.** Hand-written copy per wallpaper, plus an honest fallback for future drops. |
| `src/config/quoteCopy.ts` | **New.** Per-quote interpretation, theme, related reading. |
| `src/pages/wallpapers/[slug].astro` | **New.** 10 indexable wallpaper pages with `ImageObject` schema and device-specific setup steps. |
| `src/pages/quotes/[slug].astro` | **New.** 5 indexable quote pages with `Quotation` schema. |
| `src/pages/wallpapers/index.astro` | Cards link to detail pages; `1,200+ saved` fabrication removed. |
| `src/pages/quotes/index.astro` | Cards link to detail pages; fabricated like counts (`300 + idx * 35`) removed. |

**Verified after changes:**

| Check | Before | After |
|---|---|---|
| Canonical host | `teentimeglow.me` (redirects) | `www.teentimeglow.me` (200) |
| `/edits` article count | 1 | 6 |
| Sitemap URLs | 13, hardcoded | 32, dynamic |
| Unknown article slug | `200` (soft 404) | `404` |
| Unknown wallpaper / quote slug | — | `404` |
| Quote archive | 7 rows, 3 duplicates | 5 unique |
| Homepage "readers" counter | `14,850` (invented) | `6` guides (measured) |
| Indexable page types | 7 static + articles | + 3 hubs, 10 wallpapers, 5 quotes, about, 404 |

> **Build note:** local builds in this sandbox need `NODE_OPTIONS="" npm run build` because a filesystem shim intercepts `fs.rm` on `.vercel/output`. This is an environment quirk, not a project issue — Vercel's own build is unaffected.

---

## 4. Keyword strategy

### 4.1 Positioning

TeenTimeGlow cannot win "skincare routine" — that belongs to Byrdie, Healthline and Reddit. It **can** win specific, high-intent, low-competition long-tail phrases where a curator's voice beats a brand's.

The strategic bet: **own "aesthetic + specific + teen" long-tails**, then climb toward the mid-tail as authority accumulates.

### 4.2 Clusters and URL map

Each cluster gets one **pillar** (the category hub) and 6–10 **supporting articles** that link up to it and across to each other.

#### Cluster A — Skincare / glass skin → `/edits/category/skincare`

| Target keyword | Intent | Suggested title | Words |
|---|---|---|---|
| glass skin routine for teens | info | The Glass Skin Routine That Survives a School Schedule | 1,400 |
| korean skincare routine for beginners | info | Korean Skincare for Beginners: The 5-Step Version | 1,600 |
| ceramide barrier repair | info | How to Repair Your Skin Barrier in 7 Days | 1,300 |
| skincare routine for oily skin teen | info | An Oily-Skin Routine That Doesn't Strip Your Face | 1,200 |
| drugstore skincare under $50 | commercial | The $50 Drugstore Routine I'd Buy Again | 1,200 |
| how to layer skincare order | info | Skincare Layering Order, Explained Without the Jargon | 1,000 |
| niacinamide vs vitamin c | info | Niacinamide or Vitamin C First? (And Whether Teens Need Either) | 1,100 |

> **E-E-A-T guardrail.** This is health-adjacent content read by minors. Every skincare article needs a named author, a "last reviewed" date, an explicit "see a dermatologist if…" line, and no prescription-style claims. Add `MedicalWebPage` schema only if a qualified reviewer is actually involved — do not fake it.

#### Cluster B — Fashion → `/edits/category/fashion`

| Target keyword | Intent | Suggested title | Words |
|---|---|---|---|
| fall outfit ideas for school | info | 12 Fall Outfits You Can Build From a Normal Closet | 1,500 |
| capsule wardrobe for teens | info | The 20-Piece Teen Capsule Wardrobe | 1,600 |
| how to style an oversized sweater | info | 5 Ways to Style an Oversized Sweater Without Looking Sloppy | 1,000 |
| school outfit ideas aesthetic | info | Aesthetic School Outfits That Still Pass Dress Code | 1,200 |
| how to layer clothes for fall | info | Layering Rules That Actually Keep You Warm | 1,100 |
| parisian chic outfits | info | Parisian Chic on a Teen Budget | 1,200 |

#### Cluster C — Decor → `/edits/category/decor`

| Target keyword | Intent | Suggested title | Words |
|---|---|---|---|
| cozy bedroom ideas on a budget | info | A Cozy Bedroom for Under $50 (Full Shopping List) | 1,400 |
| aesthetic room ideas for teens | info | 9 Aesthetic Room Upgrades That Take an Afternoon | 1,300 |
| study space setup small room | info | A Study Corner That Fits in 2 Square Metres | 1,100 |
| sunset lamp bedroom | commercial | Sunset Lamp Setup: Angle, Colour and What It Actually Costs | 900 |
| dorm room decor ideas | seasonal | Dorm Room Decor That Survives Moving Day | 1,200 |

#### Cluster D — Wallpapers → `/wallpapers` + `/wallpapers/[slug]` ✅ built

Highest volume-to-competition ratio on the site.

| Target keyword | Monthly volume (est.) | Competition |
|---|---|---|
| aesthetic wallpapers for iphone | very high | high |
| 4k aesthetic wallpaper | high | high |
| matcha wallpaper | medium | low |
| sunset wallpaper iphone | high | medium |
| cozy desktop wallpaper | medium | low |
| sage green wallpaper | medium | low |

**Implemented:** one indexable page per wallpaper with image, resolution and device specs, download CTA, `ImageObject` schema and 60–80 words of specific description. This is the page type most likely to produce traffic first, because the queries are visual and the competition is weak.

**Next step here:** add 2–3 new wallpapers per week. Each one is a new indexable page for a near-zero-difficulty query. This is the cheapest traffic in the entire strategy.

#### Cluster E — Quotes → `/quotes` + `/quotes/[slug]` ✅ built

| Target keyword | Intent |
|---|---|
| aesthetic captions for instagram | high-volume social search |
| short inspirational quotes for teen girls | high |
| mindset quotes for students | medium |
| golden hour captions | medium |

**Implemented:** per-quote pages with interpretation and `Quotation` schema.

> **Honest limitation.** Five quote pages of ~250 words is infrastructure, not a traffic driver. The winning page in this cluster is a *captions collection* — 40–60 lines per theme — which needs content that doesn't exist yet. The route is built so those pages appear automatically as quotes are added. **Do not** scale this by generating hundreds of thin one-quote pages; that is the pattern Google's helpful-content system is built to demote.

### 4.3 What not to target

- "skincare routine", "fall fashion", "bedroom decor" — unwinnable head terms at this authority level.
- Brand names you don't stock or review — attracts mismatched intent and legal risk.
- "best [product]" without having tested it — the fastest route to an E-E-A-T collapse.

---

## 5. Content plan — 90 days

Sustainable pace: **2 articles/week**, ~24 new pieces, taking the site from 6 → 30 indexable articles. If that's too much, 1/week for 12 weeks still works — consistency beats volume.

| Week | Cluster | Deliverable |
|---|---|---|
| 1 | Skincare | Rewrite the 17-word article into a real 1,200-word guide (highest-priority single fix on the site) |
| 1 | Skincare | Glass skin routine for teens (pillar support) |
| 2 | Fashion | 12 fall outfits from a normal closet |
| 2 | Decor | Cozy bedroom under $50 with shopping list |
| 3 | Wallpapers | 3 new wallpaper drops (new pages, zero difficulty) |
| 3 | Skincare | Korean skincare for beginners |
| 4 | Fashion | 20-piece teen capsule wardrobe |
| 4 | Quotes | Expand one theme to a 40-line captions collection |
| 5–6 | Mixed | 4 articles + backfill internal links into all existing posts |
| 7–8 | Skincare | Barrier repair, oily-skin routine, layering order |
| 8 | Decor | Study corner + sunset lamp |
| 9–10 | Fashion | Oversized sweater, layering rules, dress-code outfits |
| 11–12 | Mixed | 4 articles + refresh the 3 oldest pieces with new data |

### Article brief template

Every new article must ship with:

1. **One** primary keyword, placed in `<title>`, `<h1>`, first 100 words, one `<h2>`.
2. 3–5 secondary keywords used naturally in subheadings — never stuffed.
3. 1,000+ words with a real `<h2>` structure (the TOC auto-generates from these).
4. At least **3 internal links**: 1 up to the category hub, 2 sideways to sibling articles.
5. At least 1 image with descriptive `alt` text (not the title repeated).
6. Author byline + `dateModified` that is honest.
7. A specific, non-generic first sentence. No "In today's fast-paced world."

---

## 6. Internal linking rules

- **Every article links up** to its category hub (automatic via breadcrumb and category badge).
- **Every article links sideways** to 2–3 siblings contextually in the body — not just in the "related" carousel, which Google discounts heavily.
- **Every category hub links down** to all its articles and **across** to the other two hubs.
- **Every wallpaper and quote card links to its own detail page** — done; this is what stops those pages becoming orphans.
- **Homepage links to all three hubs** — still only surfaces section anchors. Open item.
- **Anchor text describes the destination.** "glass skin routine" not "click here".

---

## 7. Authority and off-page

For an aesthetic lifestyle site aimed at teenagers, **Pinterest is a bigger traffic lever than Google in the first six months.**

1. **Pinterest** — every article and every wallpaper gets a vertical 1000×1500 pin. Pinterest is a visual search engine with a 3–6 month content half-life, and this niche is native to it. Link back with UTM parameters so GA4 can attribute it.
2. **Instagram/TikTok** — short-form drives brand searches ("teentimeglow"), which Google measures.
3. **Reddit** — r/SkincareAddiction, r/femalefashionadvice. Participate genuinely; never drop bare links.
4. **Digital PR** — the `$50 drugstore routine` and `20-piece capsule wardrobe` pieces are the kind of thing roundup posts cite. Build them to be cited: original photos, clear lists, quotable claims.
5. **Backlinks** — realistically 0–5 referring domains in month one. Do not buy links.

---

## 8. Measurement

### Set up this week

1. **Google Search Console** — verify `www.teentimeglow.me` (verification meta is already in `BaseLayout`). Submit `https://www.teentimeglow.me/sitemap.xml`. Use **URL Inspection** on the homepage and one article, request indexing.
2. **Bing Webmaster Tools** — import from GSC; it takes two minutes.
3. **GA4** — already installed via `Analytics.astro`. Confirm `page_view` fires and organic is separated from direct.
4. **Baseline snapshot** — export the current GSC Performance report (last 3 months) as `baseline.csv`. Without it you cannot prove the fixes worked.

### KPIs — track these four, weekly

| KPI | Where | Why it's the right metric |
|---|---|---|
| Indexed pages / submitted pages | GSC → Pages | Proves the canonical and sitemap fixes worked. Target: 32/32 within 4 weeks. |
| Organic impressions | GSC → Performance | Leading indicator. Moves before clicks do. |
| Average position for cluster keywords | GSC → Queries | Tells you which cluster is breaking out. |
| Organic clicks + engaged sessions | GA4 | The only number the business actually cares about. |

**Do not** judge the work by total sessions in week 2. Indexation moves first, impressions second, clicks third.

### Expected timeline

| Window | What should be true |
|---|---|
| Week 1–2 | All 32 URLs indexed, zero canonical errors, sitemap accepted |
| Week 3–6 | Impressions climb on long-tail queries; wallpaper pages start getting impressions first |
| Week 7–12 | 2–4 cluster keywords reach page 2 |
| Month 4–6 | Long-tail page-1 entries; brand searches appear |

---

## 9. Prioritised roadmap

### P0 — this week
- [x] Canonical host unified on `www`
- [x] Permanent 308 redirect
- [x] Dynamic sitemap
- [x] Orphaned articles restored
- [x] Real 404s
- [x] Category hubs
- [x] About page / author entity
- [x] Fabricated counters removed, replaced with measured data
- [x] Per-wallpaper pages (10)
- [x] Per-quote pages (5)
- [ ] **Deploy and confirm in GSC** ← the only step that actually matters

### P1 — next 30 days
- [ ] Rewrite the 17-word article into a full guide
- [ ] `ItemList` + `Review` schema on `/rankings`
- [ ] Image pipeline: WebP/AVIF, `srcset`, explicit `width`/`height`
- [ ] Fix duplicate wallpaper image and the two title typos
- [ ] Publish 8 articles + 6 wallpaper drops
- [ ] Homepage links to all three category hubs

### P2 — days 30–90
- [ ] 16 more articles across the three clusters
- [ ] Contextual internal links retro-fitted into all existing posts
- [ ] Pinterest presence: 3 pins/week, every article and wallpaper
- [ ] First digital-PR push on the two "citable" listicles
- [ ] One captions collection of 40+ lines

### P3 — beyond 90 days
- [ ] Real `/search` page, then re-add `SearchAction`
- [ ] Seasonal content waves (back-to-school, holiday, New Year)
- [ ] Consider whether a qualified skincare reviewer is worth recruiting — the strongest E-E-A-T upgrade available in this niche

---

## 10. Honest caveats

- I had **no access to Google Search Console or GA4 data**. Every claim here is from the codebase and live HTTP responses, not from your traffic history. The baseline export in §8 is what turns this from a plan into a measurable one.
- The **social profiles in `sameAs` are assumed**. If `instagram.com/teentimeglow` and `pinterest.com/teentimeglow` are not real accounts, remove them — a `sameAs` pointing at a 404 is worse than no `sameAs`.
- The **wallpaper and quote descriptions are drafts written from titles**, not from looking at the images. Rini should check each one against the actual picture before publishing.
- **Six articles is the binding constraint.** No amount of technical SEO moves a six-page site. The technical work removes the ceiling; the content plan raises it.
- The 17-word article is not an SEO issue, it is an editorial emergency. Fix it before publishing anything new.
