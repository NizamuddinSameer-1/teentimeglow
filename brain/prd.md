# Product Requirements Document (PRD) — Rini TheTeen

**Project Name:** Rini TheTeen  
**Target Custom Domain:** `teentimeglow.me` (Primary) | `rinitheteen.vercel.app` (Staging)  
**Target Audience:** Teens, young adults, lifestyle/beauty enthusiasts, aesthetic digital community  
**Site Owner / Admin:** Rini (Non-technical creator; manages 100% of content via visual admin UI)  
**Budget Constraint:** $0.00 / 100% Free Forever  

---

## 1. Vision & Core Value Proposition

"Rini TheTeen" is an ultra-fast, mobile-first aesthetic lifestyle hub and personal brand platform for Rini. Unlike typical slow, ad-heavy, laggy lifestyle blogs that suffer from broken images and bloated plugins, Rini TheTeen offers:
* **Editorial-Grade Speed**: Sub-second page loads (< 600ms), zero layout shift (CLS = 0), and crystal-clear image delivery.
* **Community Engagement**: Interactive quizzes, crowd-sourced DIY/craft/nail art gallery with built-in moderation, and relatable teen chronicles.
* **Digital Freebies & Curations**: High-resolution wallpapers with 1-click downloads, Prime Video and audiobook ranking boards, and daily aesthetic quotes.
* **Effortless Zero-Code Management**: A private, mobile-ready admin dashboard allowing Rini to create, edit, reorder, and moderate everything without touching a single line of code.

---

## 2. User Personas

### Persona 1: Rini (The Creator / Administrator)
* **Background:** Teen lifestyle creator; loves fashion, beauty, room decor, movies, and reading.
* **Tech Skills:** Non-coder; comfortable with Instagram, Notion, Pinterest, and smartphone apps.
* **Needs:** 
  * Simple, beautiful dashboard (`/admin`) accessible on phone and laptop.
  * Big intuitive buttons to create blog posts, upload photos, add quiz questions, post memes/quotes, and approve reader submissions.
  * Zero exposure to code, markdown syntax errors, or server configurations.

### Persona 2: The Reader / Visitor
* **Demographic:** Teens and young adults browsing on smartphones (85%+ mobile traffic).
* **Pain Points on Other Sites:** Intrusive popups, 10-second load times, jittery scrolling, broken images.
* **Needs:**
  * Clean, inspiring visual aesthetic with smooth micro-interactions.
  * Instant downloads for phone wallpapers without redirection loops.
  * Fun, shareable quizzes and relatable stories/memes.
  * Safe space to share their own DIYs, nail art, and sketches.

---

## 3. Detailed Functional Requirements

### 3.1 Beauty, Fashion & Home Decor Blog
* **Categories:** Beauty, Fashion, Small Home Decor.
* **Article Attributes:** Title, Slug, Category, Cover Image, Excerpt, Body Text (Rich Text with formatted headings, lists, quotes, inline photos), Estimated Read Time, Published Date.
* **Features:**
  * Lightbox image zoom for high-detail photos (nails, makeup swatches, room corners).
  * "Products Mentioned / Shop the Vibe" card component inside posts.
  * Category filtering and search.

### 3.2 Curated Ranking Boards (Prime Videos & Audiobooks)
* **Media Types:** Best Prime Videos, Best Audiobooks.
* **Entry Attributes:** Rank (#1, #2, etc.), Title, Cover Art, Rating (1–5 Stars), Genre/Vibe tags (e.g. *Rom-Com*, *Thriller*, *Self-Growth*), "Why Rini Loved It" short review, Direct Streaming/Listening link.
* **Features:**
  * Filter by genre/vibe.
  * Visual leaderboard card layout.
  * Drag-and-drop or simple up/down rank reordering in Admin.

### 3.3 Interactive Quiz Engine
* **Purpose:** Fun teen personality & recommendation quizzes (e.g., *"What is your seasonal aesthetic?"*, *"Which rom-com main character are you?"*).
* **Quiz Structure:**
  * Quiz Title, Cover Image, Tagline.
  * 3 to 10 Questions per quiz.
  * 2 to 4 visual/text answer choices per question.
  * 3 to 4 Outcomes/Results (Title, Description, Aesthetic Badge, Image).
* **Visitor Experience:**
  * Step-by-step smooth animated card transitions.
  * Instant result calculation.
  * Beautiful "Share My Result" summary card optimized for screenshotting to Instagram Stories or WhatsApp.

### 3.4 Community Showcase ("The Teen Gallery")
* **Concept:** Readers submit photos of their DIY projects, crafts, nail art, or sketches.
* **Submission Form (Public):** Name/Handle, Submission Category (Nail Art, DIY Craft, Sketch/Art, Room Corner), Photo Upload (max 10MB, auto-compressed), Short Caption/Story.
* **Moderation Queue (Admin):**
  * Submissions default to `status = 'pending'`.
  * Rini reviews in private `/admin/community` inbox.
  * One-tap actions: **Approve** (immediately visible on live gallery) or **Reject** (permanently deleted).
  * *Zero unmoderated images ever go live.*

### 3.5 Relatable Chronicles, Memes & Quotes Hub
* **Post Types:**
  * **Aesthetic Daily Quote:** Typography-styled card with 1-click "Copy Quote" and "Share" action.
  * **Relatable Story / Journal:** Short thoughts, school/life chronicles ("Rini's Tea").
  * **Meme Drop:** Curated relatable lifestyle/teen memes.
* **Interaction:** Simple "❤️ Like / Heart" button with optimistic client-side feedback.

### 3.6 Free Wallpaper Vault
* **Categories:** Mobile (9:16 portrait), Desktop/Tablet (16:9 landscape).
* **Attributes:** Title, Resolution preview, Thumbnail, Full-res direct download URL, Download Counter.
* **Features:**
  * Filter pills (*All*, *Mobile Phone*, *Desktop*).
  * 1-Click instant file download (no third-party ad redirections).

### 3.7 Zero-Code Admin Dashboard (`/admin`)
* **Access:** Protected by Supabase Auth (Rini's email & secure password).
* **Modules:**
  1. **Posts Manager:** Create/Edit/Delete articles with rich-text formatting and drag-and-drop photos.
  2. **Quiz Builder:** Visual builder to add questions, answer options, and result screens.
  3. **Ranking Manager:** Add media items, set star ratings, write reviews, and adjust rank positions.
  4. **Community Moderation Inbox:** Card-based review list with Approve/Reject buttons and pending badge.
  5. **Quick Thoughts & Memes:** Instant post box for quotes, memes, and short updates.
  6. **Wallpaper Uploader:** File picker, device type selector, and instant publish toggle.

---

## 4. Non-Functional & Technical Requirements

| Requirement | Target Metric | Implementation Strategy |
| :--- | :--- | :--- |
| **Budget** | **$0.00 / month forever** | 100% Free Tiers: Vercel, Supabase, Cloudflare R2 |
| **Performance** | **Lighthouse Score 95–100** | Astro Static Site Generation (SSG) + Edge Hydration |
| **First Contentful Paint (FCP)** | **< 600ms on 4G** | Pre-rendered HTML at edge CDN, zero render-blocking scripts |
| **Cumulative Layout Shift (CLS)** | **0.000 (Zero layout jump)** | Explicit `aspect-ratio` on all image containers + blur skeletons |
| **Image Reliability** | **100% (0 broken images)** | Self-hosted CDN assets (Cloudflare R2/Supabase) in WebP format |
| **Security** | **OWASP Top 10 Compliant** | Supabase Row Level Security (RLS) + DOMPurify on text inputs |
| **Analytics & SEO** | **Full visibility** | Google Analytics 4 (GA4) + automated sitemap and Open Graph cards |
