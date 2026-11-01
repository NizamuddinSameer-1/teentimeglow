# Phase 16: Claude SEO Remediation & AI Search Optimization (GEO) — Research

## Implementation Approach
Implement findings from the full Claude SEO multi-agent audit on `https://www.teentimeglow.me` to elevate the SEO Health Score from 88 to 96+ and ensure first-class indexing across both traditional search engines (Google, Bing) and AI search engines (Google AI Overviews, Perplexity, ChatGPT Search, Claude).

The remediation spans three clear, decoupled vectors:
1. **AI Search (GEO) & Discovery Layer**: Publish `/llms.txt` and `/llms-full.txt` conforming to the Lighthouse Agentic Browsing standard; update `robots.txt` with named AI user-agent directives and Content-Signal declarations.
2. **Schema.org Rich Snippet Upgrades**: Inject Google-compliant `HowTo` and `FAQPage` JSON-LD schemas into tutorial and guide pages (`/edits/[slug]`) and `CreativeWork` schemas on wallpaper pages (`/wallpapers/[slug]`).
3. **Performance Acceleration & E-E-A-T Authority**: Implement the W3C Speculation Rules API in `BaseLayout.astro` for sub-second speculative pre-rendering of key site sections, and add visible fact-checking timestamps and scientific dermatology citations for skincare actives.

---

## Libraries & Tools

| Library / Standard | Purpose | Why | Confidence | Source |
|:---|:---|:---|:---:|:---|
| **Speculation Rules API** (`<script type="speculationrules">`) | Instant prefetch & prerender | Native browser API supported across Chromium browsers; replaces heavyweight SPA routing with instant MPA page transitions without bloated client routers. | HIGH | W3C Web Incubator Community Group / Chrome Platform Status |
| **Lighthouse Agentic Browsing / `llms.txt`** | LLM crawler discovery directory | Standardized markdown directory parsed by Perplexity, OpenAI, and Anthropic search crawlers to understand high-value site corpus without scraping HTML markup. | HIGH | llmstxt.org / Chrome Lighthouse Agentic specification |
| **Schema.org `HowTo` & `FAQPage`** | SERP rich results | Unlocks expandable step-by-step cards and accordion Q&A snippets in Google search results. | HIGH | Google Search Central Official Documentation |
| **Astro 5 Component Architecture** | Static asset & SSR rendering | Leverages Astro's conditional schema injection and zero-JS-by-default architecture. | HIGH | Existing codebase (`src/layouts/BaseLayout.astro`) |

---

## Patterns to Follow

### 1. Speculation Rules Syntax
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
*Note:* Use conservative/moderate eagerness to avoid unnecessary network bandwidth while pre-rendering on link hover or pointer-down.

### 2. `llms.txt` Standard
Per llmstxt.org specification:
- Must start with an `# H1` site title.
- Followed by a `> blockquote` summary (1–2 sentences).
- Main sections with unordered markdown links `[Title](URL): Brief description`.
- Optional sections for secondary resources.

### 3. Conditional HowTo / FAQ Schema Injection
In `src/pages/edits/[slug].astro`:
Extract steps or FAQs from the article or frontmatter/database and construct JSON-LD nodes:
```typescript
const howToSchema = post.steps ? {
  '@type': 'HowTo',
  '@id': `${postUrl}#howto`,
  name: post.title,
  description: post.excerpt,
  totalTime: 'PT10M',
  step: post.steps.map((s, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: s.name,
    text: s.text
  }))
} : null;
```

---

## Pitfalls to Avoid
1. **Never fabricate Schema data:** Only emit `HowTo` or `FAQPage` schemas when the rendered HTML actually displays those steps or questions on page. Google penalizes hidden or mismatched schema markup.
2. **Do not block AI search bots while attempting to block training scrapers:** Keep `GPTBot`, `Claude-SearchBot`, and `PerplexityBot` allowed on public routes; use `Disallow: /admin/` and `Disallow: /api/` for internal assets.
3. **Speculation rules origin isolation:** Speculation rules must only pre-render same-origin URLs; do not target external links like streaming providers or social media.

---

## Key References
- Google Search Central: [HowTo Schema Guide](https://developers.google.com/search/docs/appearance/structured-data/how-to)
- Google Search Central: [FAQPage Schema Guide](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- llmstxt.org: [The /llms.txt File Format](https://llmstxt.org/)
- MDN Web Docs: [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)

---

## Unverified Claims
None. All specifications were verified against official Google Search Central docs, W3C standards, and the local Claude SEO audit tooling.

---
*Researched: 2026-11-01*

