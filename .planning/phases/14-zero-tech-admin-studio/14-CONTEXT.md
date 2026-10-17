# Phase 14: Rini's Zero-Tech Visual Admin Studio — Context

**Gathered:** 2026-10-18
**Status:** Ready for planning

## Phase Boundary
Deliver a beginner-friendly, visual, zero-code Admin Studio at `/admin` designed specifically for Rini (who has 0 coding or technical experience). Enable her to customize website text, create and edit full articles with a visual rich-text editor, upload photos directly from her phone or computer without touching URLs, manage wallpapers and rankings, and moderate community posts.

## Implementation Decisions

### 1. Navigation & Layout
- **DECIDED:** Visual Sections Tabs — Dedicated, friendly, aesthetic tabs:
  1. 🌸 **Homepage & Copy Customizer** (Hero title, subtitle, badge, stats numbers, bio)
  2. 📝 **Magazine & Articles Editor** (Create, edit, or delete full lookbooks & skincare articles)
  3. 🖼️ **Wallpapers Vault Manager** (Upload 4K wallpapers directly from phone/laptop, set tags, delete)
  4. 🏆 **Curated Leaderboard** (Add/edit Prime Video shows & audiobooks, star ratings, reviews)
  5. 💬 **Daily Quotes & Affirmations** (Publish inspiring mindset quotes to the daily shuffler)
  6. 📬 **Community Moderation Inbox** (1-click Approve ✓ or Reject ✕ fan submissions)
  7. 📸 **Photo Assets Library** (View all uploaded images with instant 1-click copy/select)

### 2. Photo Upload Experience
- **DECIDED:** Direct File Upload from Phone & Computer:
  - Drag-and-drop or tap "Choose Photo from Phone/Computer".
  - Automatically uploads image binary to Supabase Storage bucket (`community-pending` or `site-assets`).
  - Automatically assigns public URL to the post/wallpaper without Rini ever needing to copy/paste image links or see URLs.
  - Image preview thumbnail displays immediately upon selection.

### 3. Article Writing Experience
- **DECIDED:** Visual Rich-Text Editor (Like Notion / Instagram):
  - Simple formatting toolbar: **Bold**, *Italic*, Large Heading (H2), Section Heading (H3), Quote Block, Bullet List.
  - Contenteditable visual editor: she types exactly as it looks on the website. Zero HTML, zero Markdown, zero code.
  - Full support for editing already published articles or deleting them.

### 4. Authentication & Security
- **DECIDED:** Simple 4-Digit PIN or Friendly Password:
  - Gorgeous, welcoming login screen with greeting: *"Welcome to your Studio, Rini ✨"*.
  - Simple memorable PIN/passphrase with a "Remember Me on this device" persistent cookie checkbox so she stays logged in on her iPhone and laptop.

### 5. Live Website Copy Customization
- **DECIDED:** Direct on-page text customization:
  - Live fields to change hero headline (`Feel The Glow. Daily Curated Inspo.`), subtitle, issue badge (`ISSUE #28`), and ticker banners.
  - Live fields to edit stats strip counters (e.g. `14,850+ Radiant Readers`).
  - Live fields to edit footer message and about copy.

## Specific User Requirements & Notes
- *"this website is for my gf she knows 00 coding pr any yechnical things she ddnt even know proprly ai or vibe coding soo i want admin pannel in which she can do evrysi gle customisation on the actuall website, post , crete , paragraps etc etcetc mena sevrything ths is thhe sitution"*
- Every button must have clear icons and warm, supportive tooltips/success banners (e.g., *"✨ Article published live to TeenTimeGlow!"*).
- All delete actions must have gentle confirmation popups so accidental deletions never happen.

---
*Phase: 14-zero-tech-admin-studio*
*Context gathered: 2026-10-18*
