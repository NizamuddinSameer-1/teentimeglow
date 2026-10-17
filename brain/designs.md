# Design System & UI Specifications — TeenTimeGlow

**Domain:** [`https://teentimeglow.me`](https://teentimeglow.me) | [`https://www.teentimeglow.me`](https://www.teentimeglow.me)  
**Brand Identity:** Teen Time Glow — Aesthetic Lifestyle, Curated Rankings, Digital Freebies & Community  
**Last Updated:** 2026-10-17 (Post-Navbar Reference Redesign & Ambient Micro-Interaction Upgrade)

---

## 1. Brand Identity & Visual Language

TeenTimeGlow blends the warmth of high-end editorial lifestyle magazines (Vogue Teen, Kinfolk, Frankie) with modern Gen-Z digital aesthetic culture (cozy study desks, glazed donut skincare, autumn style edits, and digital moodboards).

### The Brand Wordmark
* **Structure:** Circular logo avatar + two-tone typographic wordmark:
  * **Avatar:** Circular profile image ([`assets/logo.jpg`](file:///c:/Users/lenovo/OneDrive/Desktop/rini%20website/assets/logo.jpg)), bordered with subtle hairline ring (`border-radius: 50%`) and interactive hover micro-rotation (`transform: rotate(10deg)`).
  * **Prefix (`teen time `):** Deep Forest Emerald (`#0C3B2E`), lowercase, serif editorial font.
  * **Suffix (`glow.`):** Sunset Terracotta Rose (`#C8523A`), italicized Playfair Display with a period accent.
* **Typographic Rule:** Always rendered in lowercase serif (`teen time glow.`) to evoke effortless luxury and approachable warmth.

---

## 2. Color Palette Tokens & Semantic Roles

| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `--forest-emerald` | `#0C3B2E` | Dominant brand ink, primary headlines, active dark CTA buttons |
| `--sunset-accent` | `#C8523A` | Brand accent, "glow." wordmark highlight, active links, heart badges |
| `--soft-sage` | `#6DB773` | Botanical accents, status pills, category tags, positive indicators |
| `--warm-caramel` | `#BB8A52` | Secondary accent, italic emphasis, subtle decorative frames |
| `--amber-gold` | `#FFBA00` | Star ratings, sparkle glyphs (`✨`), quote highlights |
| `--linen-canvas` | `#FDFBF7` | Warm paper base canvas (zero harsh clinical #FFFFFF background) |
| `--card-vellum` | `#FAF6F0` | Elevated card surfaces, review containers, quiz answer cards |
| `--nav-pill-bg` | `#FDF0E9` | Warm peach capsule background for active navigation state (`Home`) |
| `--border-subtle` | `#EFE7DD` | Hairline card borders, divider rules, subtle separators |
| `--border-translucent` | `rgba(0, 0, 0, 0.06)` | Floating glass header and capsule search outline |

---

## 3. Typography Architecture

### Font Pairings
1. **Primary Editorial Headline & Wordmark:**  
   * **Family:** `'Playfair Display', 'Newsreader', Georgia, serif`
   * **Weights:** `600`, `700`, `800` (Normal & Italic)
   * **Role:** Hero display typography, two-tone logo text, quote banners, section titles.
2. **Body, Controls & Interface Labels:**  
   * **Family:** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
   * **Weights:** `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold)
   * **Role:** Navigation links, search inputs, body paragraphs, badges, buttons, tooltips.

---

## 4. Top Navigation Bar (Reference Specification)

The navigation bar adheres to a modern, floating glassmorphic container layout (`backdrop-filter: blur(16px)`):

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] teen time glow.   [ Home ]  Edits  Rankings  Quote  Wallpapers  Quiz  Gallery  |  [🔍 Search...]  🔊  ♡ 4  [Take Quiz ✨] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Component Anatomy
1. **Brand Logo Wrap (`.brand-logo-wrap`)**:
   - `assets/logo.jpg` preserved as 36×36px circle avatar.
   - Text label: `teen time ` in `#0C3B2E` + `<span class="brand-logo-glow">glow.</span>` in `#C8523A` Playfair Display italic.
2. **Active Home Capsule Pill (`.nav-pill-home`)**:
   - Styled as a rounded capsule pill (`background: #FDF0E9`, `color: #1F2937`, `font-weight: 700`, `border-radius: 999px`).
3. **Curated Navigation Links (`.nav-links`)**:
   - `Editorial Edits` (`#edits`), `Curated Rankings` (`#rankings`), `Daily Quote` (`#quotes`), `4K Wallpapers` (`#wallpapers`), `Glow Quiz` (`#quiz`), `Community Gallery` (`#gallery`).
   - Clean charcoal text (`#4B5563`) transitioning to `#0C3B2E` on hover with a soft underline dot.
4. **Subtle Hairline Divider (`.nav-divider`)**:
   - 1px vertical line (`height: 22px; background: rgba(0, 0, 0, 0.08);`).
5. **Capsule Search Input (`.nav-search-wrap`)**:
   - Rounded pill search box with embedded SVG magnifying glass.
   - Expandable width on focus (`135px` → `175px`).
   - Integrated section jump logic (`executeNavSearch`): scrolls instantly to sections matching queries like "quote", "decor", "wallpaper", "quiz", etc.
6. **Sound Toggle Button (`.sound-toggle-btn`)**:
   - Minimalist circular button with `🔊` icon.
   - Generates ambient harmonic ASMR tones using the Web Audio API on click.
7. **Saved Moodboard Pill (`.saved-pill`)**:
   - Pill badge displaying terracotta heart (`♡`) and dynamic item count (`4`).
   - Interactive toast notification on click.
8. **Primary CTA Pill (`.quiz-pill-btn`)**:
   - Deep forest green pill capsule (`#0C3B2E`) with golden sparkle glyph (`Take Quiz ✨`).
   - Magnetic hover physics (`transform: translateY(-2px)`).
9. **Mobile Menu & Drawer (`.mobile-drawer`)**:
   - For viewports `<= 1024px`, the desktop links collapse into a hamburger button (`☰`).
   - Slide-out drawer includes full search bar, active Home badge, and direct jump links.

---

## 5. Micro-Interactions & Ambient Motion

### A. Floating Pink Little Hearts Cursor Trail
* **Replaced:** Old circular particles were upgraded to romantic pink mini hearts.
* **Physics & Visuals:**
  * Uses inline SVG vector hearts (`fill="#FF85A1"` and `#FF6584"`).
  * Generated at cursor coordinates with subtle velocity drift (`vx`, `vy`), gentle rotation (`-25deg` to `+25deg`), and organic upward floating.
  * Automatically fades out and cleans up from DOM (`opacity: 0`, `transition: all 0.9s cubic-bezier(...)`).
* **Click Burst:**
  * Clicking anywhere spawns an 8-heart radial explosion with ripple waves.

### B. Organic Morphing Background Blobs
* **CSS Animation:** `@keyframes organicMorph` continuously smoothly alters border radii:
  ```css
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  ```
* **Surfaces:** Ambient glowing blobs behind the hero section and quiz card container in semi-translucent pastel gradients (`#FCEADE`, `#E8F5E9`).

### C. Cinematic Preloader
* **Overlay:** `#preloader` with radial gradient backdrop.
* **Elements:** Two-tone branding pulse, progress track, and live percentage counter (`0%` → `100%`) before fading out gracefully into the hero view.

### D. Audio ASMR Ambient Synthesizer
* **Engine:** Native Web Audio API (`AudioContext`).
* **Sound Design:** Gentle pentatonic frequencies (`523.25Hz`, `659.25Hz`, `783.99Hz`) using sine wave oscillators with smooth gain decay for soothing tactile feedback.

---

## 6. Page Section Layout Blueprint

| Section | ID | Description & Key Elements |
| :--- | :--- | :--- |
| **Header** | `#siteHeader` | Floating glassmorphic bar, two-tone logo, active Home pill, search capsule, sound & quiz CTAs |
| **Hero Spotlight** | `#hero` | Editorial magazine layout, model spotlight image, glowing badges, magnetic buttons |
| **Editorial Edits** | `#edits` | Filterable tab cards for *Beauty & Glazed Skincare*, *Autumn Capsule Fashion*, *Cozy Room Decor* |
| **Curated Rankings** | `#rankings` | Leaderboard for Prime Video series & Audiobooks with star badges and expandable reviews |
| **Daily Quote Card** | `#quotes` | Poetic mindset quote with "Copy Quote", "Share", and "Bookmark" actions |
| **4K Wallpaper Vault**| `#wallpapers`| Mobile & desktop wallpapers with resolution chips and instant 1-click downloads |
| **Aesthetic Glow Quiz**| `#quiz` | Interactive 4-question vibe finder with real-time score calculation and Aura Badges |
| **Community Gallery** | `#gallery` | Reader DIY, nail art, and journal submissions with full-screen lightbox modal and submission form |
| **Glow Club Newsletter**| `#newsletter`| Email signup card with instant optimistic welcome toast |
| **Footer** | `footer` | Quick links, social badges, copyright, and disclaimer |

---

## 7. Responsive Breakpoints

* **Desktop Wide (`>= 1280px`):** Full inline navigation bar with maximum search expansion and side-by-side editorial grids.
* **Desktop Regular (`1025px - 1279px`):** Compact gap spacing (`10px - 14px`) to preserve complete horizontal integrity without wrapping.
* **Tablet & Mobile (`<= 1024px`):**
  * Desktop nav links, divider, search pill, and quiz button collapse into the sliding mobile drawer.
  * Hamburger toggle (`☰`) and quick saved/sound badges remain accessible.
  * Drawer provides an embedded search bar and full touch-friendly link hierarchy.
