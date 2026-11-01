# Full SEO & AI Search Audit Report

**Domain:** `https://www.teentimeglow.me`  
**Publisher:** TeenTimeGlow (Founder & Editor: Rini)  
**Audit Framework:** Claude SEO (26 Sub-skills & 19 Specialist Agents)  
**Audit Date:** 2026-11-01  
**Overall SEO Health Score:** **88 / 100** (Grade: **A-**)

---

## 1. Executive Scorecard

| Category | Score | Grade | Status | Priority Focus |
|:---|:---:|:---:|:---|:---|
| **Technical SEO & Routing** | 94 / 100 | A | Excellent | Explicit AI crawler groups in robots.txt |
| **Content Quality & E-E-A-T** | 90 / 100 | A | Superior | External dermatology citations for actives |
| **Structured Data (Schema.org)** | 86 / 100 | B+ | Very Strong | HowTo & FAQPage rich snippet expansion |
| **AI Search & GEO Readiness** | 82 / 100 | B | Strong | Publish `/llms.txt` and markdown negotiation |
| **Performance & Resource Hints** | 88 / 100 | B+ | Very Fast | Speculation Rules API & CDN bundling |
| **Backlink & Off-Page Authority** | N/A* | Fresh | Growing | Social syndication & high-DA backlinks |

*\*Note: Domain is fresh; not yet indexed in Common Crawl's historical graph.*

---

## 2. Technical SEO Diagnostics

### 2.1 HTTP & Edge Configuration
- **Status:** HTTP 200 OK
- **Edge Network:** Vercel Edge Cache with Gzip/Brotli compression.
- **Canonicalization:**
  - Origin strictly redirects apex `teentimeglow.me` to `www.teentimeglow.me` at edge.
  - `<link rel="canonical" href="https://www.teentimeglow.me/">` is validated.
  - `trailingSlash: 'never'` prevents duplicated indexation of `/edits` vs `/edits/`.
- **Security Headers (A+):**
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-Xss-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 2.2 Robots.txt & Sitemap
- **Robots.txt Location:** `https://www.teentimeglow.me/robots.txt` (HTTP 200)
- **Directives:**
  - `Disallow: /admin`, `Disallow: /admin/`, `Disallow: /api/` protects private surfaces.
  - `Disallow: /*?q=`, `Disallow: /*?category=`, `Disallow: /*?sort=` prevents query param crawl traps.
  - `AhrefsBot: Crawl-delay: 10`
- **Sitemap Location:** `https://www.teentimeglow.me/sitemap.xml`
  - Valid XML urlset with 30+ URLs covering homepage, editorial category hubs, individual routine guides, wallpapers, quotes, and quiz.
  - Proper `<lastmod>`, `<changefreq>`, and `<priority>` attributes.

### 2.3 Soft-404 Validation
- Automated probe URL (`/claude-seo-404-probe-9016ab52`) confirmed a **clean HTTP 404** response. No soft-404 false 200s detected.

---

## 3. Content Quality, E-E-A-T & Voice Analysis

Evaluated using `content_quality.py` (QRG-aligned content scorer):

| URL | Tokens | Unique Tokens | Information Density | Filler Score | AI Pattern Score | Overall Quality |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/` (Homepage) | 13,605 | 2,544 | 0.520 | 2 | 1 | **84 / 100** |
| `/edits/glass-skin-korean-routine` | 6,837 | 1,577 | 0.664 | 0 | 0 | **89 / 100** |
| `/edits/capsule-wardrobe-for-teens` | 5,834 | 1,474 | 0.672 | 0 | 0 | **89 / 100** |
| `/edits/small-bedroom-ideas` | 6,079 | 1,513 | 0.651 | 4 | 0 | **88 / 100** |
| `/about` | 3,776 | 985 | 0.779 | 0 | 0 | **91 / 100** |
| `/wallpapers` | 6,486 | 1,127 | 0.862 | 0 | 0 | **93 / 100** |

### Key Strengths:
1. **Authentic Editorial Voice:** Virtually 0 filler and 0 repetitive AI tropes. The content reads as a genuine, well-researched teen lifestyle publication.
2. **High Information Density:** Dense actionable advice, specific budget breakdowns (e.g. thrift formulas, room dimensions, low-pH ingredients).
3. **Transparent E-E-A-T Disclaimer:** Rini's author bio explicitly clarifies that recommendations come from independent ingredient research rather than formal medical licensure, preventing algorithmic penalties for non-credentialed health claims.

---

## 4. Structured Data (Schema.org) Audit

Audited via `parse_html.py` & JSON-LD extractors:

```
Homepage:
├── WebSite (@id: #website)
├── Organization (@id: #organization, logo, contactPoint, sameAs)
└── Person (@id: #person-rini, founder, jobTitle)

Article Pages (/edits/*):
├── WebPage
├── BreadcrumbList (Home > Edits > Article)
├── BlogPosting (headline, description, author -> #person-rini, publisher -> #organization)
└── WebSite

Wallpaper Pages (/wallpapers/*):
├── BreadcrumbList (Home > Wallpapers > Asset)
└── ImageObject (url, dimensions)

Quote Pages (/quotes/*):
├── BreadcrumbList
└── Quotation (text, author)

About Page (/about):
├── AboutPage
├── BreadcrumbList
└── Person & Organization
```

### Opportunities for Rich Results:
- **`HowTo` Schema:** Step-based guides like the *Korean Glass Skin Routine* (Cleanser → Toner → Serum → Moisturizer → SPF) should include `HowToStep` schema for rich snippets in Google mobile SERP.
- **`FAQPage` Schema:** Articles containing frequently asked questions should be annotated to earn search accordion dropdowns.
- **`CreativeWork` Schema:** Upgrade wallpaper listings from basic `ImageObject` to `CreativeWork` with download formats and license details.

---

## 5. AI Search & Generative Engine Optimization (GEO)

Evaluated via `agentic_check.py` against OpenAI, Anthropic, Perplexity, and Google AI crawler behaviors:

| Check | Standard | Result | Notes |
|:---|:---|:---:|:---|
| **Server-Rendered HTML** | Universal | **PASS** | 1,040+ words in raw HTML before JS execution |
| **Robots AI Crawler Access** | RFC 9309 | **PASS** | User-agents ChatGPT-User, Claude-User, Perplexity-User allowed |
| **Real 404 Response** | RFC 9110 | **PASS** | Non-existent paths return strict 404 status |
| **`llms.txt` Discovery File** | llmstxt.org | **MISSING** | Returns 404. Publishing `/llms.txt` recommended |
| **Markdown Content Delivery** | RFC 9110 | **INFO** | No `Accept: text/markdown` or `.md` alternate links |
| **Content Signals Header** | Cloudflare / IETF | **INFO** | No explicit `ai-input` / `ai-train` signal |

### Recommendation for GEO:
Deploying `/llms.txt` provides LLMs (like Perplexity and ChatGPT Search) with a curated, high-signal site map. This dramatically increases citation likelihood when users prompt for *"best morning skincare routine for teenagers on a budget"* or *"aesthetic teen bedroom ideas"*.

---

## 6. Performance & Resource Hints

Evaluated via `preload_check.py` and Chromium headless rendering:

- **Preload Health Score:** **75 / 100**
- **LCP Image Preload:** Properly prioritized with `fetchpriority="high"`.
- **BFCache Compatibility:** Clean! No `no-store`, `unload`, or `beforeunload` blockers, allowing instantaneous back-forward caching.
- **Console Health:** 0 JavaScript errors or unhandled promise rejections detected during automated hydration.
- **Speculation Rules API:** Not detected. Implementing Speculation Rules will allow instant sub-second navigations across `/edits` and `/wallpapers`.

---

## 7. Baseline Snapshot

A drift baseline snapshot was created and registered in the audit database:
- **Baseline ID:** `#1`
- **Timestamp:** `2026-11-01T15:59:01Z`
- **HTML Hash:** `6dd0a06d7037...`
- **H1:** `FEELTHEGLOW`
- **H2 Count:** 6
- **H3 Count:** 20
- **Schema Count:** 3 blocks
- **OG Tags:** 10 tags

