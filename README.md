# TeenTimeGlow (`teentimeglow.me`)

> **Aesthetic lifestyle, beauty, fashion, home decor, curated rankings & digital freebies platform.**

- **Production Custom Domain:** [https://teentimeglow.me](https://teentimeglow.me) | [https://www.teentimeglow.me](https://www.teentimeglow.me)
- **Staging / Fallback:** [https://teentimeglow.vercel.app](https://teentimeglow.vercel.app)
- **Tech Stack:** High-Performance Modern Web Frontend + Supabase PostgreSQL & Cloudflare R2 on Vercel Global Edge.
- **Budget:** $0.00 / 100% Free Forever.

---

## ✨ Latest Features & Design Updates

- 🎨 **Reference Glassmorphic Navigation Bar**:
  - Two-tone brand identity: **`teen time`** in Forest Emerald (`#0C3B2E`) + **`glow.`** in Sunset Terracotta Rose (`#C8523A`, Playfair Display italic).
  - Preserved brand logo avatar with interactive hover tilt.
  - Active capsule pill for `Home` (`#FDF0E9`).
  - 6 curated links: `Editorial Edits`, `Curated Rankings`, `Daily Quote`, `4K Wallpapers`, `Glow Quiz`, `Community Gallery`.
  - 1px hairline divider separating links from actions.
  - Capsule search bar with intelligent section-jump auto-scrolling.
  - Audio ASMR ambient sound button (`🔊`) powered by Web Audio API.
  - Saved moodboard likes counter (`♡ 4`).
  - High-contrast Deep Forest Green pill button: `Take Quiz ✨`.
  - Responsive mobile drawer with built-in search and navigation.
- 💖 **Romantic Pink Little Hearts Micro-Interactions**:
  - Floating mini pink heart cursor trail with rotation, velocity drift, and gentle fade.
  - Radial heart explosion click bursts.
- ⏳ **Cinematic Preloader & Organic Blobs**:
  - Preloader with live percentage counter (`0%` → `100%`).
  - Fluid SVG morphing background blobs (`@keyframes organicMorph`).

---

## 🧠 Engineering Brain & Documentation

All architectural decisions, design tokens, database schemas, security configurations, and deployment steps are fully documented in the [`/brain`](./brain) folder:

- 🎨 **[Design Specifications & UI System](./brain/designs.md)** — Complete token definitions, typography, navbar anatomy, and micro-interactions.
- 🧠 **[Project Memory & ADRs](./brain/memory.md)** — Architectural Decision Records (ADRs 001–007), secrets inventory, and live roadmap.
- 📖 **[Master Brain Index](./brain/index.md)** — Centralized table of contents for the entire engineering brain.
- 📋 **[Product Requirements Document (PRD)](./brain/prd.md)** — Core vision, user personas, blog, rankings, quiz, and community specs.
- 🗺️ **[System Map & Data Flows](./brain/system-map.md)** — End-to-end data flows, sequence diagrams, and moderation pipelines.
- ⚙️ **[Technology Stack](./brain/tech-stack.md)** — Architecture, libraries, and hosting tier breakdowns.
- 🗄️ **[Backend & Database Schemas](./brain/backend.md)** — SQL schemas, RLS security policies, and R2 storage bucket setup.
- 🚀 **[Deployment & DNS Guide](./brain/deployment.md)** — Vercel setup, custom domain routing, and build configuration.
- 🛡️ **[Security & Moderation Architecture](./brain/security.md)** — OWASP defenses, upload sanitization, and rate limiting.
- 📈 **[SEO & Analytics Strategy](./brain/seo.md)** — Open Graph preview cards, JSON-LD schemas, and Google Analytics 4.
- 🧪 **[Testing & QA Playbook](./brain/testing.md)** — Zero broken images verification, Lighthouse CI (95+), and E2E flows.
- 📜 **[Development Rules & Anti-Slop Constraints](./brain/rules.md)** — Mobile-first performance and visual stability rules.

---

## 🚀 Deployment Instructions

This repository is continuously deployed to Vercel via Git on every push to `main`. See [`brain/deployment.md`](./brain/deployment.md) for full instructions.
