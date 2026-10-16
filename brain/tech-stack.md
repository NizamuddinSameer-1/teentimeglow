# Technology Stack Specification — Rini TheTeen

**Target Host:** `teentimeglow.me` (Vercel Edge with Custom Domain)  
**Cost:** $0.00 / 100% Free Forever  

---

## 1. Core Framework & Engine

### **Astro (Hybrid Output Mode)**
* **Why Astro?**
  * Traditional React/Next.js sends unnecessary JavaScript bundles to the browser, slowing down phones on mobile networks.
  * Astro renders pure HTML + CSS at the server/edge by default (**0kb client JavaScript** for content pages).
  * Interactive components (quizzes, upload modals, admin forms) only load JavaScript when scrolled into view using Astro Islands (`client:visible` or `client:idle`).
* **Adapter:** `@astrojs/vercel` configured with `output: 'hybrid'`.
  * Allows static pre-rendering for public pages (Blog, Wallpapers, Rankings) for instant CDN delivery.
  * Enables dynamic serverless functions for API endpoints (`/api/*`) and authenticated Admin views (`/admin/*`).

---

## 2. Database & Authentication Engine

### **Supabase (Managed PostgreSQL & Auth)**
* **Database**: PostgreSQL 15+ hosted on AWS/GCP via Supabase Free Tier.
  * 500 MB database storage (adequate for >100,000 blog posts, quotes, and ranking records).
  * Direct PostgREST client via `@supabase/supabase-js`.
  * Row-Level Security (RLS) enforced at the database layer.
* **Authentication**: Supabase Auth (Free for 50,000 monthly active users).
  * Admin login via secure email + password or Magic Link.
  * Generates short-lived JWTs stored in secure HTTP-only cookies.

---

## 3. High-Performance Media & Storage

### **Cloudflare R2 (S3-Compatible Object Storage)**
* **Free Tier Allowance**: 10 GB monthly storage, 1,000,000 Class A operations, 10,000,000 Class B operations.
* **Critical Advantage**: **$0 Egress Bandwidth Fees**. Unlike AWS S3 or Vercel Blob (which charge for every gigabyte downloaded), Cloudflare R2 allows unlimited wallpaper downloads without incurring any bill.
* **Integration**: Standard `@aws-sdk/client-s3` client using R2 access keys.

---

## 4. Hosting, Edge CDN & DNS

### **Vercel Hobby Tier ($0)**
* **Custom Domain**: `teentimeglow.me` (Claimed via GitHub Student Pack on Namecheap, connected with free SSL auto-renewed).
* **Staging Fallback**: `rinitheteen.vercel.app` (or `teentimeglow.vercel.app`).
* **Bandwidth Allowance**: 100 GB per month (more than enough for millions of static page hits).
* **Edge Network**: Global CDN presence across 300+ edge locations.
* **Continuous Deployment**: Automatic zero-downtime deployment on `git push main` via GitHub.

---

## 5. Analytics & Monitoring

### **Google Analytics 4 (GA4)**
* Measurement ID: `G-XXXXXXXXXX`.
* Custom lightweight script injection: Loaded asynchronously with zero impact on Lighthouse performance.
* Custom event tracking:
  * `wallpaper_download` (Tracks wallpaper title & device type).
  * `quiz_complete` (Tracks quiz title & outcome).
  * `community_submission` (Tracks category).

---

## 6. Proposed `package.json` Dependencies

```json
{
  "name": "rini-the-teen",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.0",
    "@astrojs/sitemap": "^3.1.6",
    "@astrojs/vercel": "^7.8.0",
    "@aws-sdk/client-s3": "^3.600.0",
    "@supabase/supabase-js": "^2.45.0",
    "astro": "^4.15.0",
    "canvas-confetti": "^1.9.3",
    "dompurify": "^3.1.6",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@playwright/test": "^1.46.0",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```
