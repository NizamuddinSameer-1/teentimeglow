# Deployment & CI/CD Guide — Rini TheTeen

**Target Custom Domain:** `teentimeglow.me` (Claimed via GitHub Student Pack on Namecheap)  
**Fallback / Staging Domain:** `rinitheteen.vercel.app`  
**Hosting Provider:** Vercel (Hobby Free Tier) — 100% Free Edge Hosting & SSL  
**Cost:** $0.00 / 100% Free Forever  

---

## 1. Prerequisites Checklist

Before launching, ensure you have:
1. **Namecheap Account** — Where you claimed your free domain `teentimeglow.me` via GitHub Student Developer Pack.
2. **GitHub Account** (Free) — For private source code hosting.
3. **Vercel Account** (Free) — For global edge hosting, continuous deployment, and free automatic SSL for your custom domain.
4. **Supabase Account** (Free) — For database and authentication.
5. **Cloudflare Account** (Free) — For Cloudflare R2 zero-egress media storage.

---

## 2. Vercel Configuration (`vercel.json`)

Place this file in the project root to enforce edge caching, security headers, and Astro hybrid rendering:

```json
{
  "framework": "astro",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 3. Step-by-Step Deployment & Namecheap Custom Domain Setup

### Step 1: Initialize Git & Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial commit for teentimeglow.me"
git branch -M main
git remote add origin https://github.com/<your-username>/rini-the-teen.git
git push -u origin main
```

### Step 2: Import Project in Vercel
1. Log in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Select your repository `rini-the-teen`.
4. Set **Framework Preset** to **Astro**.
5. Set **Project Name** to: `teentimeglow` (or `rinitheteen`).

### Step 3: Configure Environment Variables
Under the **Environment Variables** section in Vercel, paste:
* `PUBLIC_SUPABASE_URL`
* `PUBLIC_SUPABASE_ANON_KEY`
* `SUPABASE_SERVICE_ROLE_KEY`
* `R2_ACCOUNT_ID`
* `R2_ACCESS_KEY_ID`
* `R2_SECRET_ACCESS_KEY`
* `R2_BUCKET_NAME`
* `PUBLIC_R2_URL`
* `PUBLIC_GA_MEASUREMENT_ID`
* `SITE_URL` = `https://teentimeglow.me`

### Step 4: Click Deploy
* Vercel will run `astro build` and deploy across 300+ edge locations in ~40 seconds.
* Your site goes live at the staging URL with automatic free SSL!

### Step 5: Connect Your Free Namecheap Domain (`teentimeglow.me`)
1. In your **Vercel Project Dashboard**, go to **Settings** $\rightarrow$ **Domains**.
2. Type `teentimeglow.me` and click **Add**.
3. Also add `www.teentimeglow.me` (Vercel will ask to redirect `www` to root or vice versa—choose redirect `www` to `teentimeglow.me`).
4. Vercel will show the exact DNS records to add:
   * **A Record**: Points to `76.76.21.21`
   * **CNAME Record**: `www` points to `cname.vercel-dns.com`
5. Now open **Namecheap**:
   * Go to **Domain List** $\rightarrow$ Click **Manage** next to `teentimeglow.me`.
   * Click on the **Advanced DNS** tab.
   * Under **Host Records**, delete any default Parking Page records and add these two:
     | Type | Host | Value | TTL |
     | :--- | :--- | :--- | :--- |
     | **A Record** | `@` | `76.76.21.21` | Automatic |
     | **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |
   * Save changes (green checkmark).
6. Return to Vercel and click **Refresh / Verify**. Within 2–5 minutes, Vercel will show **Valid Configuration** and automatically generate a **free wildcard SSL certificate**!
7. `https://teentimeglow.me` is now 100% live with free hosting and free SSL!

---

## 4. Automated CI/CD Workflow (`.github/workflows/ci.yml`)

Create this GitHub Action to automatically run typechecks and tests on every commit:

```yaml
name: CI Verification

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Astro Diagnostics Check
        run: npm run build

      - name: Run Unit Tests
        run: npm run test
```
