# SEO, Google Analytics & Organic Ranking Strategy — Rini TheTeen

This guide outlines how **Rini TheTeen** (`rinitheteen.vercel.app`) achieves first-page organic rankings on Google for lifestyle, beauty, decor, and wallpaper keywords while maintaining high-speed performance.

---

## 1. Google Analytics 4 (GA4) Integration

### Non-Blocking Script Injection (`src/components/Analytics.astro`)
To prevent Google Analytics from slowing down the site or reducing Lighthouse scores, load it asynchronously:

```html
---
const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
---
{measurementId && (
  <>
    <script
      type="text/partytown"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
    ></script>
    <script type="text/partytown" define:vars={{ measurementId }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', measurementId, {
        page_path: window.location.pathname,
        send_page_view: true
      });
    </script>
  </>
)}
```

---

## 2. Automated Sitemap & Robots.txt

In `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://teentimeglow.me',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [sitemap()],
});
```

* Automatically outputs `https://teentimeglow.me/sitemap-index.xml`.
* Submit this sitemap to **Google Search Console** to have new blog articles and quizzes indexed within 24–48 hours.

---

## 3. Social Media Share Previews (Open Graph & Twitter Cards)

When links are shared on **WhatsApp, Instagram DMs, iMessage, Pinterest, or Twitter**, they will display rich preview cards:

```html
<!-- Open Graph Meta Tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://teentimeglow.me/blog/summer-capsule" />
<meta property="og:title" content="Summer Capsule Wardrobe Essentials | Rini TheTeen" />
<meta property="og:description" content="Curated teen fashion, aesthetic essentials, and styling tips by Rini." />
<meta property="og:image" content="https://teentimeglow.me/og-previews/summer-capsule.jpg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Summer Capsule Wardrobe Essentials | Rini TheTeen" />
<meta name="twitter:description" content="Curated teen fashion, aesthetic essentials, and styling tips by Rini." />
<meta name="twitter:image" content="https://teentimeglow.me/og-previews/summer-capsule.jpg" />
```

---

## 4. Google Structured Data (JSON-LD Schemas)

Include structured data on blog posts and ranking pages so Google displays **rich snippets, star ratings, and review cards** in search results:

### For Blog Articles:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 Cozy Room Decor Ideas on a Budget",
  "image": ["https://pub-r2.r2.dev/decor-cover.webp"],
  "datePublished": "2026-10-06T10:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Rini"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Rini TheTeen",
    "url": "https://teentimeglow.me"
  }
}
</script>
```

### For Curated Rankings (Star Ratings on Google):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Prime Video Shows Ranked by Rini",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Movie",
        "name": "The Summer I Turned Pretty",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "ratingCount": "1"
        }
      }
    }
  ]
}
</script>
```
