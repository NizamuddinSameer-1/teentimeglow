# TeenTimeGlow SEO Action Plan

> **Domain:** https://www.teentimeglow.me  
> **Overall SEO Health Score:** 88 / 100  
> **Audited By:** Claude SEO Agent Suite  
> **Audit Date:** 2026-11-01  

---

## Executive Summary

TeenTimeGlow demonstrates exemplary technical foundations: strict HTTPS/HSTS, zero console errors, clean server-side rendering, robust entity-based JSON-LD schemas, and authentic, highly-dense editorial copy with zero AI fluff. 

To bridge the gap from a strong niche site to top SERP rankings and high-frequency citations in AI Search engines (Google AI Overviews, Perplexity, ChatGPT, Claude), prioritize the action items below.

---

## 🚀 Phase 1: High-Impact Quick Wins (Days 1–3)

### 1. Deploy `/llms.txt` and `/llms-full.txt` (AI Search / GEO)
* **Impact:** High | **Effort:** 30 minutes
* **Why:** AI Search engines (Perplexity, ChatGPT, Claude, Gemini) actively look for `/llms.txt` to discover authoritative site guides and summaries without crawling raw HTML.
* **Action:**
  1. Create `public/llms.txt` with an `H1`, a `>` blockquote summary of TeenTimeGlow, and curated markdown links to `/edits`, `/wallpapers`, `/quotes`, and `/about`.
  2. Create `public/llms-full.txt` containing full text summaries of core guides.

### 2. Implement Speculation Rules API for Instant Navigations
* **Impact:** High | **Effort:** 15 minutes
* **Why:** Boosts Preload Score from 75 to 95+. Allows chromium browsers to pre-render `/edits` and `/wallpapers` when users hover over navbar links.
* **Action:** Add the following snippet into `src/layouts/BaseLayout.astro`:
  ```html
  <script type="speculationrules">
  {
    "prefetch": [
      {
        "source": "list",
        "urls": ["/edits", "/wallpapers", "/quotes", "/quiz"],
        "eagerness": "moderate"
      }
    ],
    "prerender": [
      {
        "source": "list",
        "urls": ["/edits", "/wallpapers"],
        "eagerness": "conservative"
      }
    ]
  }
  </script>
  ```

### 3. Add Explicit AI Crawler Directives in `robots.txt`
* **Impact:** Medium | **Effort:** 10 minutes
* **Why:** Clarifies crawling for search indexation vs. uncredited data harvesting.
* **Action:** Append explicit directives in `public/robots.txt`:
  ```text
  # AI Search & Retrieval (Permitted for Citation)
  User-agent: GPTBot
  Allow: /
  Disallow: /admin/
  Disallow: /api/

  User-agent: Claude-SearchBot
  Allow: /

  User-agent: PerplexityBot
  Allow: /
  ```

---

## 📈 Phase 2: Schema Expansion & Rich Snippets (Week 1)

### 4. Implement `HowTo` Schema on Step-by-Step Routines
* **Impact:** High | **Effort:** 1 hour
* **Target Pages:** `/edits/glass-skin-korean-routine`, styling formulas, room makeover guides.
* **Why:** Unlocks Google Mobile "HowTo" rich result cards with expandable step numbers, images, and tools.
* **Action:** Inject structured JSON-LD into routine articles:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "The Korean Glass Skin Routine for School Days",
    "description": "A 5-step gentle morning skincare routine for teenagers to achieve glowing skin without irritating active ingredients.",
    "totalTime": "PT10M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Step 1: Gentle Water-Based Cleanser",
        "text": "Wash with lukewarm water and a low pH foaming cleanser..."
      },
      {
        "@type": "HowToStep",
        "name": "Step 2: Hydrating Toner Layering",
        "text": "Pat 2 layers of centella or hyaluronic toner..."
      }
    ]
  }
  ```

### 5. Add `FAQPage` Schema on Editorial Articles
* **Impact:** Medium | **Effort:** 45 minutes
* **Why:** Google SERPs display expandable Q&A accordions directly under the listing, dramatically increasing click-through rates (CTR).
* **Action:** Mark up FAQ sections at the bottom of the long-form guides.

### 6. Upgrade Wallpaper Schema to `CreativeWork` / `VisualArtwork`
* **Impact:** Medium | **Effort:** 45 minutes
* **Why:** Helps Google Images index the 4K wallpapers with proper license, author, and resolution metadata.

---

## 🔬 Phase 3: E-E-A-T & Authority Reinforcement (Weeks 2–3)

### 7. Add Scientific Authority Citations for Skincare Actives
* **Impact:** High | **Effort:** 1–2 hours
* **Target:** Articles referencing Centella Asiatica, Niacinamide, Hyaluronic Acid, and Sunscreen filters.
* **Action:** Add 2–3 external citation links directly to PubMed or the *Journal of Investigative Dermatology*. This signals to Google's quality raters and LLM retrieval models that the advice is grounded in scientific consensus.

### 8. Add "Fact-Checked On" Date Stamps
* **Impact:** Low | **Effort:** 30 minutes
* **Action:** In the author card at the top of each article, display:
  `Written by Rini · Fact-checked & updated on [Date]`

---

## ⚡ Phase 4: Asset Consolidation & Long-Term Monitoring (Month 1)

### 9. Bundle Third-Party CDN Scripts into Vite
* **Impact:** Medium | **Effort:** 1.5 hours
* **Why:** Removes 6 external network connections (`unpkg.com`, `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`) for Lenis, GSAP, SplitType, and Lucide.
* **Action:** Install via npm/pnpm and import within `src/scripts/main.js` to benefit from Vercel edge caching and HTTP/2 multiplexing.

### 10. Automated Drift Tracking
* **Action:** Baseline snapshot `#1` was captured during this audit. Run `claude-seo drift compare https://www.teentimeglow.me` before and after major deployments to catch regressions in title tags, schemas, or heading hierarchies.

