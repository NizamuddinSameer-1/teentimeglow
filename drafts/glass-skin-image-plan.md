# Image plan — glass-skin-korean-routine

**Article:** `drafts/glass-skin-korean-routine-2026-10-26.md` (2,149 words)
**Prepared:** 26 October 2026
**Status:** awaiting generated files

---

## 1. Slots

Four images. Three in-body plus the cover. One per ~540 words in the body, which is enough to break the page without turning it into a slideshow.

| # | Slot | Placement | Job it does |
|---|---|---|---|
| 1 | `glass-skin-cover-202610.jpg` | `cover_image_url` (front matter) | Sets the 6:40am bathroom world the lede opens in |
| 2 | `glass-skin-order-202610.jpg` | Immediately after the "Where Each Step Goes" table, H2 #3 | Makes "order matters" visual — four products in a row, reading left to right |
| 3 | `glass-skin-morning-202610.jpg` | Inside "Step 2 — One Hydrating Layer, Patted In", H2 #4 | The routine happening, not just described |
| 4 | `glass-skin-night-202610.jpg` | Inside "Step 7 — Moisturizer, Then Stop", H2 #5 | Slows the page down; the "then stop" argument needs a quiet image |

**Not illustrated on purpose:** H2 #6 (what to skip), #7 (acne), #8 (doctor referral). A product glamour shot beside a section telling a reader to see a doctor is the wrong signal. Keep those sections plain.

---

## 2. Technical specs

| | Cover | In-body |
|---|---|---|
| Aspect ratio | **16:9 exactly** | 3:2 |
| Export size | **1200 × 675** | 1200 × 800 |
| Format | JPEG q82, or WebP q80 | same |
| Target weight | ≤ 250 KB | ≤ 180 KB |
| Filename | `glass-skin-cover-202610.jpg` | `glass-skin-order-202610.jpg` etc. |
| Location | `public/assets/` | `public/assets/` |

Why 1200 × 675 for the cover specifically: `src/pages/edits/[slug].astro` hardcodes `width: 1200, height: 675` in the `ImageObject` schema. Matching it keeps the structured data true. Export anything else and the schema lies about the image.

Why the dated filenames: `/assets/(.*)` is cached `immutable, max-age=31536000`. Reusing a name means the old file sticks for a year, including for you when you check your own work.

---

## 3. Prompts

Shared style block — prepend or append to each:

> Editorial photography, warm neutral palette (cream, sand, soft peach, one muted terracotta accent), natural window light, subtle film grain, considered but unstyled. Photorealistic. No text, no labels, no logos, no brand marks, no watermarks.

**Negative prompt for all four:** text, letters, typography, logo, brand name, label, watermark, before-and-after, split screen, collage, oversaturated, HDR, plastic skin, retouched perfection, visible face, hands with extra fingers.

---

### 3.1 Cover — 16:9

> Editorial still-life photograph of a small bathroom shelf at dawn. Four or five unbranded skincare containers — frosted glass bottle, amber dropper, matte cream tube, small ceramic jar — arranged loosely on a pale stone shelf, one bottle resting on its side. Soft warm sunrise light rakes in from the left through a frosted window, casting long gentle shadows. A faint condensation haze along the edge of a mirror at the right. Shallow depth of field, 50mm, calm and quiet.

**Why this and not a face:** the article's first line is a bathroom mirror at 6:40am. The shelf *is* the scene. A person would date the article and fight the copy.

**Alt:** `Unbranded skincare bottles on a cream bathroom shelf in low morning light`

**Caption:** *The whole routine lives on one shelf. That is the point of it.*

---

### 3.2 Order — 3:2

> Overhead flat-lay on warm cream linen. Four unbranded skincare containers in a single left-to-right row with even spacing: small frosted glass bottle, slim amber dropper bottle, matte white tube, squat ceramic jar. Soft directional daylight from above so each object throws a short shadow toward the next, implying sequence. A folded edge of linen and one dried leaf as the only props. 50mm, gentle contrast, matte finish.

**Why:** the section argues that order beats products. Four objects in a row is that argument without a word.

**Alt:** `Four unbranded skincare products in a row on cream linen, arranged in application order`

**Caption:** *Left to right: the order does the work, not the price tags.*

---

### 3.3 Morning — 3:2

> Tight documentary crop. A pair of hands pressing a small amount of cream into the side of a jawline — framed from the mouth down, no eyes, no full face. Warm low morning light from a window at the left, slightly blown out at the frame edge. A dark canvas backpack strap and the cuff of a navy sleeve sit out of focus in the background. 35mm, shallow depth of field, candid, unposed, natural grain.

**Why the crop:** no face means no stock-photo grin, nothing to date, and it sidesteps generating images of minors entirely. Hands and a backpack strap carry the "before the bus" story on their own.

**Alt:** `Hands patting moisturizer into a jawline in warm morning light, a school bag blurred behind`

**Caption:** *Fifty seconds. Damp skin, flat hands, one layer.*

---

### 3.4 Night — 3:2

> Quiet evening still life. A single unbranded ceramic jar on a wooden nightstand beside a small lamp with a warm linen shade, a closed paperback face-down, a glass of water. The lamp is the only light source, throwing a soft amber pool; the rest of the room falls into gentle shadow. 50mm at f/2, soft falloff, calm and slightly melancholy.

**Why:** the section's argument is that stopping is the technique. The image has to feel like stopping.

**Alt:** `A jar of night cream on a wooden nightstand under a warm lamp`

**Caption:** *Three steps, then the bottle goes down.*

---

## 4. Guardrails

These are not style preferences. This article is health-adjacent content read by 13–19 year-olds, and the site has already had to strip invented claims out of its source twice.

- **No visible results.** No before-and-after, no "glow" transformation, no flawless-skin beauty shot. The article explicitly refuses to promise an outcome; the imagery must not promise one either.
- **No brand marks or legible labels.** A recognisable product would read as an endorsement on a page that names no products anywhere.
- **No faces.** Crops and objects only. Also the cleanest way to avoid generating images of minors.
- **No clinical imagery.** No dermatology tools, no diagrams of skin layers. It would imply a medical authority the site does not have.

---

## 5. On integration

When the files land I will:

1. Copy them into `public/assets/` under the dated names above.
2. Add `figure` / `figcaption` CSS to `src/pages/edits/[slug].astro` — `img` gets `width:100%`, `height:auto`, `border-radius:16px`, plus a captioned figure style matching the existing `.sidebar-moodboard-card` treatment. The template currently styles no images at all inside the article body.
3. Insert `<figure>` blocks at the four slots, with the alt text and captions above.
4. Set `cover_image_url` in the front matter and re-check that the 1200×675 schema dimensions still match.
5. Re-verify weight and dimensions with a script rather than by eye, and re-run the build.
