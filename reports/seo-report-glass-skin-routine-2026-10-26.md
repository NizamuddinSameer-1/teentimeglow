# On-Page SEO Audit — "The Korean Glass Skin Routine for School Days"

**Audited:** 26 October 2026
**Auditor:** seo-optimizer (Phase 3)
**Draft under audit:** `drafts/glass-skin-korean-routine-2026-10-26.md`
**Written against:** `research/brief-glass-skin-routine-2026-10-26.md`
**Template read:** `src/pages/edits/[slug].astro`, `src/layouts/BaseLayout.astro`, `src/pages/edits/category/[category].astro`, `src/config/seo.ts`, `src/pages/api/admin/posts.ts`, `src/pages/api/admin/publish.ts`

**Scope note:** I did not modify the draft. Every recommendation below is a location plus exact replacement text, for the editor to accept or reject. Items marked **TEMPLATE** are code changes, not copy changes — they are outside the editor's ownership and belong to whoever ships.

---

## 1. Score: 70 / 100

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Keyword coverage & distribution | 20 | **13** | Primary exact-match is present in H1, title, slug, and the first 100 words, but appears **once** in 2,056 words of body and in **no** H2/H3 and not in the conclusion. All 8 brief-mandated secondaries are present but **zero** sit in a heading (brief §2 required 5). Four semantic-field gaps: `SPF`, `double cleanse`, `hyaluronic acid`, `sebum` all at 0. |
| Structure & heading hierarchy | 15 | **12** | Unique H1, 8 H2s, all ≤52 chars, correct H3 nesting, no skipped levels, no "Conclusion" H2. Deductions: 22 H3s is dense (one heading every ~70 words); the closing CTA is trapped under H2 #8's "See A Doctor" heading, so the last TOC entry mislabels the exit. |
| Featured-snippet readiness | 15 | **10** | The definition paragraph is a genuinely strong paragraph-snippet candidate (46 words, definitional first sentence). The order table is a **weaker** candidate than the brief assumed — see §5. No `<caption>`, no FAQ block, no ordered list anywhere. |
| Internal linking | 15 | **11** | 4 links, all resolving, all descriptive anchors, all placed exactly where the brief asked. Deduction: **zero links across sections 3–7** — 1,084 words, 53% of the body, with no exit. Plus a credibility defect on the destination of the hub link (§7). |
| Meta elements | 15 | **11** | Title is 45 chars → exactly 60-char title tag with the exact keyword at the front: optimal. Description is 151 chars, strong hook, but contains **no audience qualifier** — "teen" appears nowhere in the description — and the primary phrase is not contiguous in it. |
| Schema readiness | 10 | **6** | `BlogPosting` + `BreadcrumbList` are correct and well-formed. Missing `isPartOf` (the category page has it, the article doesn't). `datePublished` falls back to a hardcoded `2026-10-18T00:00:00Z`. `image` declares 1200×675 for an asset whose real dimensions are unverified. The `Person` node this article's `author` resolves to makes a fabricated testing claim (§7.2). |
| E-E-A-T signals | 10 | **7** | Very strong in the prose: named author, honest "not qualified to treat skin" line inside the first 150 words, visible last-reviewed date, disclaimer block, specific doctor off-ramp, no invented statistics, no brand names, no first-person testing claims. Deductions: **zero external citations**, byline not linked to `/about`, and two surrounding surfaces (hub description, `Person` schema) contradict the article's own honesty. |
| **Total** | **100** | **70** | 13 + 12 + 10 + 11 + 11 + 6 + 7 = **70** |

**Interpretation:** 70 is "needs minor fixes, publishable within a day". The prose is in good shape. Almost every point lost is lost in code the writer cannot see — the template's alt handling, the schema, the hardcoded publish defaults, and the hub description. That is the useful finding: **the article is better than the surfaces it will be published onto.**

---

## 2. Keyword distribution heat map

Counts are body-only (excluding frontmatter). `glass skin` includes H2/H3 text; the other rows are exact phrase matches in body prose.

| # | Section | Words | `korean glass skin routine` | `glass skin` | `…for teens` | `…school mornings` | `…at night` | `korean skincare routine order` | `do teens need retinol` | `…for oily` | `how long does it take…` |
|---|---|---|---|---|---|---|---|---|---|---|---|
| — | Lede (4 paras, pre-H2) | 149 | **1** | 2 | **1** | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | What Glass Skin Actually Means | 198 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 2 | Why Glass Skin Routines Aren't Written For Teens | 249 | 0 | 3 | **1** | 0 | 0 | 0 | 0 | 0 | 0 |
| 3 | The Order Matters More Than The Products | 237 | 0 | **0** | 0 | 0 | 0 | **1** | 0 | 0 | 0 |
| 4 | The School Morning Routine | 332 | 0 | 1 | 0 | **1** | 0 | 0 | 0 | 0 | 0 |
| 5 | The Night Routine | 289 | 0 | 1 | 0 | 0 | **1** | 0 | 0 | 0 | 0 |
| 6 | The Two Steps To Skip | 224 | 0 | 2 | 0 | 0 | 0 | 0 | **1** | 0 | 0 |
| 7 | If You Have Acne | 166 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **1** | 0 |
| 8 | How Long It Takes (+ closing) | 375 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | **1** |
| | **Total** | **2,219** | **1** | **13** | **2** | **1** | **1** | **1** | **1** | **1** | **1** |

**What the map actually shows**

- The brief's one-phrase-per-section plan was executed **cleanly**. Every secondary lands in the section it was assigned to. No cannibalisation, no overlap.
- The primary phrase is in the lede and nowhere else. Section 3 (237 words) never says "glass skin" at all — the topical thread breaks for roughly 12% of the article.
- Secondary placement is body-opener only. The brief wanted five of them in H2 headings; the draft's frontmatter notes this openly. That is a real, quantified trade: **0 of 8 H2s carry a target phrase**, against a brief that asked for 5.

**Semantic field audit** (`src`: draft body, case-insensitive)

| Present | Count | | Absent (brief §2 required) | Count |
|---|---|---|---|---|
| barrier | 7 | | `SPF` | **0** |
| sunscreen | 7 | | `double cleanse` | **0** |
| moisturizer | 7 | | `hyaluronic acid` | **0** |
| cleanser | 10 | | `sebum` | **0** |
| toner | 3 | | `T-zone` | **0** |
| fragrance | 3 | | | |
| purging | 3 | | | |
| retinol | 3 | | | |
| low-pH, niacinamide, centella, non-comedogenic, patch test | 1 each | | | |

The four zeros are not trivia. `SPF` and `double cleanse` are both terms a searcher types and both are *described* in the article without being *named* — free relevance the draft is leaving on the table at zero cost to readability.

### 2.1 Ruling: is one occurrence of the primary phrase under-optimised?

**Position: it is correctly restrained in the prose, and under-signalled in the structure. Those are two different problems and only the second one needs fixing.**

Justification, not reflex:

**Against "add more":**
1. Density is the wrong metric here and treating it as the metric would make the article worse. The primary is a 4-word phrase. To reach a naive "1–2% density" target you would need 20–40 repetitions in 2,056 words. That is not a target, it is a stuffing threshold, and it would destroy a piece whose entire competitive bet is that it reads like a person wrote it.
2. The strongest relevance signals for this page are already exact-match and cannot be improved by more prose: the **slug** is `glass-skin-korean-routine` (contiguous), the **H1** is "The Korean Glass Skin Routine for School Days", the **title tag** carries it at position 1. At this domain authority, exact-match slug + H1 + title is the cheapest relevance available and all three are spent correctly.
3. Google's own guidance is that repetition past the point of natural use provides no benefit. There is no defensible mechanism by which occurrence #4 of a phrase in paragraph 30 outranks the exact-match slug.

**Against "it is fine as is":**
4. There is one structural gap that is genuinely costly and it is not density — it is **the conclusion**. The final 120 words are the highest-weight prose on the page after the lede, they carry the CTA and the thesis, and the primary phrase is absent from them. A reader who reads only the first 100 words and the last 120 — which is most readers — never sees the phrase twice.
5. Section 3 says "glass skin" zero times in 237 words. That is the one place the semantic thread actually breaks.

**Recommendation: add the primary phrase exactly twice more, in two specific places, and stop.** Total body count 1 → 3, density 0.05% → 0.15%. Still far below any stuffing threshold. Both additions are quoted in §8 (MF-4 and NT-3). I would not add a fourth.

### 2.2 Ruling: do the two `glass skin routine for teens` sentences read as natural?

There are exactly two. They are not equally good, and one is the weakest sentence in the article.

**(a) Section 2 opener — line 53. Acceptable, keep with one tweak.**
> "Almost no glass skin routine for teens is actually written for a teenager."

This reads as a real sentence making a real argument. It is doing work: it names the gap, then the next clause explains it. The only flaw is the `teen` / `teenager` self-repetition inside twelve words, which a careful reader notices. It is not an inserted-keyword smell — it is a copy-editing smell. Low priority. Suggested tightening (optional):
> "Almost no glass skin routine for teens is actually written for a teenager. It is written by a shop, for a shopper, and the shopper is assumed to be twenty-eight with a card."

→ leave as is, or change "written for a teenager" to "written for the person searching for it." I would leave it. It is fine.

**(b) Lede, line 27 — this one reads as inserted. Must fix.**
> "Most glass skin routine for teens advice gets closed in a tab before the bus."

This is a five-noun pileup (`glass skin routine for teens advice`) with no article, no possessive, and no hyphenation. English cannot parse it cleanly — the reader stumbles on "teens advice" and the stumble is exactly where the keyword sits, which is the definition of an inserted phrase. It is also in the **first 100 words**, the single most-scrutinised text on the page, and it is the sentence most likely to make a reader conclude "this is SEO copy" — which is the one conclusion the whole brief is built to avoid.

Exact replacement is in **§8, MF-3**. It keeps the phrase and makes the sentence grammatical by giving the noun a possessive.

---

## 3. Meta elements

### 3.1 Is the locked pair optimal?

**Title — yes, essentially optimal. Do not change it.**

`The Korean Glass Skin Routine for School Days` = 45 chars → `The Korean Glass Skin Routine for School Days | TeenTimeGlow` = **60 chars**, exactly at the pixel-truncation boundary. Primary phrase contiguous at position 4. Differentiator present without spending characters on it. There is no version of this title that is meaningfully better inside a 45-char budget, and two of my three alternatives below are lateral moves rather than improvements. **Recommendation: keep.**

One honest caveat: the title contains no teen/audience word, and the article's whole wedge is "for a teenager specifically". The word "School" does the audience work implicitly. Given the 45-char ceiling, that is the right trade.

**Description — good, but not optimal. One real gap.**

`Glass skin in four minutes before the bus. The seven-step Korean routine, cut down for school mornings — plus the two steps to skip until you're older.` = 151 chars.

Strengths: concrete number in the first clause, format named, differentiator named, curiosity hook at the end, no keyword stuffing. As a SERP snippet it will out-read every competitor on the page.

The gap: **the word "teen" does not appear anywhere in the description.** The article targets a teen audience, the hub targets teens, the query set includes `glass skin routine for teens` — and the one piece of copy Google shows to that searcher never says "teen". "For school mornings" implies it; implication is not what a snippet is for. A parent searching on behalf of a 14-year-old has no signal this page is for her daughter.

Second, smaller point: the primary phrase appears in the description as `Glass skin… Korean routine`, split across two sentences. That is fine for term-bolding but it does not present the phrase. This is genuinely minor and I would not change the copy for it alone.

**Recommendation:** the gap is real but the current description is good enough to ship. If the editor or team-lead wants one change before publish, make it adding the audience word — alternative #1 below does it at 160 chars and is otherwise the same copy.

### 3.2 Title alternatives (limit 45 chars — all verified)

| # | Title | Chars | Title tag | Assessment |
|---|---|---|---|---|
| — | *current:* The Korean Glass Skin Routine for School Days | 45 | 60 | **Recommended. Keep.** |
| 1 | Korean Glass Skin Routine for School Mornings | 45 | 60 | Drops "The", promotes "School Mornings" to the keyword phrase itself. Captures `glass skin routine for school mornings` verbatim in the title tag. Slightly less natural as an H1. |
| 2 | The Korean Glass Skin Routine for Teens | 39 | 54 | Adds the audience word, gains 6 chars of title-tag headroom. Loses the school-schedule differentiator, which is the article's actual moat. |
| 3 | Glass Skin Routine for Teens: 4 Minutes | 39 | 54 | Highest CTR of the three — number, audience, benefit. Weakest on the primary keyword (drops "Korean"). Use only if the goal shifts from keyword match to click-through. |

**Recommended: keep the current title.** If it must change, **#1** — it is the only one that adds a keyword without losing one.

### 3.3 Description alternatives (limit 160 chars — all verified)

| # | Description | Chars |
|---|---|---|
| — | *current:* Glass skin in four minutes before the bus. The seven-step Korean routine, cut down for school mornings — plus the two steps to skip until you're older. | 151 |
| 1 | Glass skin in four minutes before the bus: the seven-step Korean routine for teen skin, cut down for school mornings, plus two steps to skip until you're older. | **160** |
| 2 | Glass skin in four minutes before the bus. Seven Korean steps cut down for teen skin and school mornings, plus the two steps to skip until you're older. | 152 |
| 3 | The Korean glass skin routine in four minutes before the bus. Seven steps cut down for teen skin and school mornings, plus two to skip until you're older. | 154 |

**Recommended: #1.** It is the current copy plus the two words that are missing ("teen skin"), and it lands at exactly 160 — the ceiling, not over it. It preserves every strength of the current version and closes the audience gap.

**If the editor prefers zero risk on length: #2** at 152 chars. Slightly weaker rhythm, same information.

**Note for whoever applies this:** `post.excerpt` renders in **two** places — `<meta name="description">` (`[slug].astro:130`) and the visible italic lede under the H1 (`[slug].astro:169`). Any change is a visible copy change to the article's opening line. That is the editor's call, not mine, and it is why I have not treated this as a must-fix.

---

## 4. Structured data

The template emits exactly two nodes: `BlogPosting` and `BreadcrumbList`, merged into a `@graph` by `BaseLayout` alongside `WebSite`, `Organization` and `Person`. Verified against `[slug].astro:93–125` and `BaseLayout.astro:46–96`.

**What is correct — do not touch:**
- `BlogPosting` is the right type for this content. `author` and `publisher` are `@id` references that resolve to real nodes in the same graph, not inline stubs. That is the correct pattern.
- `BreadcrumbList` is well-formed, matches the visible breadcrumb exactly, and the final `ListItem` correctly omits `item` (the current page should not self-reference).
- `articleSection: categoryLabel` → "Beauty & Skincare". Correct given the DB category is `beauty` and the hub slug is `skincare`.
- `isAccessibleForFree`, `inLanguage`, `mainEntityOfPage`, `url`, `@id` all present and consistent with `SITE_URL`.

### 4.1 Defects specific to this article

**(a) `datePublished` can silently contradict the visible review date. Must fix.**
`[slug].astro:104`: `datePublished: post.created_at || '2026-10-18T00:00:00Z'`. If `created_at` is null at insert, the schema claims 18 October 2026 while the article body visibly says **"Last reviewed: 26 October 2026"** (line 223). Structured data contradicting visible content is a documented quality problem, and 18 October is a hardcoded guess that has no meaning. Ensure `created_at` is explicitly set at insert; do not rely on the fallback.

**(b) `wordCount` will not equal the frontmatter's `word_count`, and neither equals the truth.**
The template computes `wordCount` by stripping tags from `content_html` (`[slug].astro:86–89`), which includes heading text and all seven table rows → it will land near **2,239**. The draft frontmatter says `word_count: 2199`. The brief says prose is 2,056. Three numbers, none wrong, none agreeing. This is harmless for ranking — Google does not trust `wordCount` — but it means the frontmatter field is **unused by the template** (I confirmed: no `word_count` reference exists anywhere in `src/`). It is dead metadata. Leave it or delete it; do not spend time reconciling it.

**(c) `image` declares dimensions that may be false.**
`[slug].astro:98–103` hardcodes `width: 1200, height: 675` for whatever `cover_image_url` is. `/assets/feature-skincare.jpg` is 57 KB per the brief and its real pixel dimensions are unverified. Declaring wrong dimensions on an `ImageObject` is a small, avoidable accuracy defect. Either verify the asset is 1200×675 or drop the two properties — an `ImageObject` with just `url` is valid and honest.

**(d) `isPartOf` is missing, and the category page has it.**
`category/[category].astro:39` sets `isPartOf: { '@id': 'https://www.teentimeglow.me/#website' }`. The article's `BlogPosting` does not. Result: the article node is not attached to the site's `WebSite` node, while the page one click above it is. One line fixes it. Nice-to-have, not a blocker.

### 4.2 `MedicalWebPage` — ruling

**No. Do not add it. Not in any variant, not with a disclaimer, not "just for the schema benefit".**

Reasons, in order of weight:

1. **There is no qualified reviewer and `MedicalWebPage` expects one.** The type is designed for pages with clinical oversight and its natural companions are `reviewedBy` and `lastReviewed` pointing at a `Person` with medical credentials. Emitting the type without that reviewer produces a node whose shape asserts something the site cannot back. That is the schema equivalent of writing "dermatologist-reviewed" in the body — which the brief bans outright.
2. **The article's own copy would contradict it.** Line 29: *"I write about skincare as someone who reads labels, not as someone who qualifies to treat skin."* Line 173: *"This is general information, not medical advice."* Emitting `MedicalWebPage` above that text is a machine-readable claim the visible text denies. Google is increasingly good at noticing exactly this.
3. **`BlogPosting` already carries the correct meaning.** This is an editorial explainer written by a named curator, which is precisely what `BlogPosting` says. It is not a downgrade — it is the accurate type.
4. **The upside is zero and the downside is asymmetric.** There is no rich result attached to `MedicalWebPage` that this page would earn. There is a real quality-evaluation downside to misrepresenting medical oversight on health-adjacent content read by minors.

**What I would add instead — one property, honest and true:**

```js
audience: { '@type': 'Audience', audienceType: 'Teens' }
```

That is a factual statement about who the page is for, it is verifiable from the copy ("roughly ages 13 to 19", line 55), and it carries none of the reviewer implication. Optional, low value, zero risk.

### 4.3 The `Person` node problem — see §7.2

This is a schema finding, not a copy finding, and it is the more serious of the two credential issues on this page.

---

## 5. Featured snippet capture

Two candidates, assessed against how Google actually extracts snippets — which is not the same question as "which block is best written".

### 5.1 Candidate 1 — the definition paragraph (strong; two edits needed)

**Current**, line 35, 46 words, sitting directly under H2 #1:

> Glass skin is a Korean beauty term for skin that looks clear, smooth, and lit from within: plump rather than shiny, even rather than pale. It describes a finish, not a skin type. It comes from water and a healthy barrier, not from any single product.

**Assessment.** This is the right raw material and it is close. It has the three properties that matter for paragraph extraction: (i) it is the first block under a heading, (ii) it opens with a definitional subject-verb pattern (`X is a Y for Z`), (iii) it is 46 words, inside the 40–55 band Google favours for paragraph snippets. I checked the live competition for the definitional query and the top result is a clinic page using the identical `X is a … — not a …` construction, which tells you the format is what wins here.

Two things are costing it:

**Edit 1 — the heading does not match the query form.** Google weights heading proximity heavily for definitional queries, and the query is `what is glass skin`. "What Glass Skin Actually Means" is a paraphrase. It contains the noun phrase but not the interrogative pattern.

> **Replace** `## What Glass Skin Actually Means`
> **With** `## What Is Glass Skin, Actually?`

29 chars (was 30), TOC anchor becomes `#what-is-glass-skin-actually`, well under the 60-char slice in `slugifyHeading()`. It keeps the article's editorial voice — "actually" is doing the same sceptical work "Actually Means" was doing — while presenting the query in its own form. This is the single highest-leverage snippet edit on the page and it costs nine characters.

**Edit 2 — the first sentence is 24 words with a colon in the middle.** Snippet extraction favours a short declarative lead sentence; a colon makes the first sentence two clauses and gives the extractor a place to cut mid-thought.

> **Replace** the paragraph with (50 words):
> Glass skin is a Korean beauty term for skin that looks clear, smooth, and lit from within. It is plump rather than shiny, and even rather than pale. It describes a finish, not a skin type, and it comes from water and a healthy barrier, not from any single product.

Changes: the colon becomes a full stop, so sentence one is a clean 17-word definition. Sentences two and three absorb the rest. Word count rises 46 → 50, still inside the band. Meaning is identical. No new claims.

**One thing I would *not* do:** do not add a `<p>` that starts "Glass skin is defined as…" or wrap it in an FAQ. The current tone is the differentiator; a snippet-optimised robot sentence would win a box and lose the reader.

### 5.2 Candidate 2 — the order table (weaker than the brief assumed; three edits)

The brief calls the table "snippet play #2" on the grounds that "comparison tables win those boxes disproportionately". That is true for **comparison** intent. It is not the intent here, and I want to be precise about why the table is a weaker candidate than §4.5 of the brief implies:

1. **`korean skincare routine order` is a procedural query, not a comparative one.** Procedural queries are dominated by **ordered-list** snippets. Google's table extraction skews to queries where the user is choosing between options ("cleanser vs toner", "which SPF for oily skin"). A user asking "what order" wants a numbered sequence, and Google answers that with an `<ol>`.
2. **Four columns with long prose cells are hard to render.** The "What goes wrong in the wrong place" column runs to nine words per row. Table snippets need short cells to fit the box. This table is a good *reading* table and a mediocre *extraction* table.
3. **Nothing tells Google what the table is about.** There is no `<caption>` and the preceding sentence ("The right-hand column is the part that matters") comes *after* the table, not before it. The extractor has no subject line.

It is still worth optimising, because the table is the best differentiator on the SERP and a table snippet is a plausible secondary outcome. Three edits, in order of value:

**Edit 1 — add a lead-in sentence that names the subject in query form.** Insert immediately before the table (currently the table is preceded only by the H3 "Where Each Step Goes"):

> Here is the Korean skincare routine order, product type by product type, and what goes wrong when a step lands in the wrong place.

31 words. It gives the extractor a subject sentence that contains the query phrase verbatim, and it gives the reader a reason to read the table rather than skim it.

**Edit 2 — make the Position column start with an ordinal.** Currently "First, nights only" / "After oil, or alone" / "After cleansing, on damp skin". Change the four that are sequence positions to lead with the number: `1 — first, nights only`, `2 — after oil, or alone`, `3 — after cleansing, on damp skin`, `4 — after water layers`, `5 — after water layers`, `6 — last, mornings`, `7 — last, nights`. This makes the column a sequence rather than a set of conditions, which is what an ordered extraction needs.

**Edit 3 — shorten the column headers.** `What goes wrong in the wrong place` → `If it is in the wrong place`. `What it does` → `Job`. Header length matters for how the table renders in a snippet box.

**Optional, if the team wants a real list-snippet play:** the table's first column, read top to bottom, *is* the ordered list. I would not add a duplicate `<ol>` — it would repeat content the reader has just read and the editor would rightly reject it. If a list snippet is wanted, it should replace the table, not sit beside it, and I do not recommend that: the table's fourth column is the article's best content.

### 5.3 Snippet gaps worth noting

- **No FAQ block anywhere.** `do teens need retinol` and `how long does it take to get glass skin` are both FAQ-shaped and both already answered in one sentence (lines 165 and 191). They are not marked up as questions and they are not grouped. A three-question FAQ at the end would capture People-Also-Ask placements. **However** — I am recommending against it for this article: it would duplicate two existing sections, add ~150 words to a piece already at the top of its word budget, and the brief is explicit that filler past 2,300 words is demoted. Note it as a pattern for article two.
- **No `<caption>` on the table.** GFM tables cannot carry one, but raw HTML passes through `set:html` and the template's `buildTocAndContent()` only touches `<h2>`, so a literal `<table><caption>…</caption>` in the Markdown would render. Marginal value on top of Edit 1. Skip.

---

## 6. Images — ruling

**The question:** the body contains zero `<img>` on a 2,239-word page. Acceptable?

**Ruling: acceptable to launch, not acceptable as the steady state — and there is a template bug that makes the one image the article does have worse than it looks.**

**Why zero body images is defensible here.** The usual arguments for in-body images are image-search traffic, dwell time, and alt-text relevance. Two of the three are weak for this page:
- The site has **no original photography and no testing capability** (brief §4.3, §8.1). Any body image would be stock. A stock photo of a bathroom shelf adds nothing a reader cannot see in the cover, and on a page whose core credibility move is "these reference images are lit, filtered and made up" (line 39), filling it with aspirational stock is self-defeating. That is a real editorial argument, not an excuse.
- Image search for this query is dominated by **before/after** results. The site must never fake those. So the highest-value image-search play is unavailable by policy.

**Why it is still a miss.** "Glass skin" is a visual trend on a visual platform (the site runs a wallpaper section). A 2,000-word beauty article with one image will underperform a 900-word competitor with four on engagement, and engagement is a real signal. The honest position: ship image-free, but this is a known gap, not a design decision.

**If images are added later, the two highest-value slots are:**
1. Between H2 #3 and the table — a simple diagram of the seven positions as a vertical stack. Non-photographic, so no rights problem, and it reinforces the snippet play.
2. Inside H2 #4 — the four-step morning sequence as a compact card. This is the section that has to convert a skimmer into a reader.

**THE ACTUAL BUG — real, but site-wide and not ship-blocking. Listed as NT-1.**

`[slug].astro:198–201`:

```astro
<img
  src={post.cover_image_url}
  alt={post.title}
  class="article-cover-img parallax-img"
/>
```

The cover image's `alt` is **`post.title`** — which means the alt text on this article's cover is *"The Korean Glass Skin Routine for School Days"*, character-for-character identical to the `<h1>` immediately above it. Two consequences:

1. **It is a duplicate-alt defect.** Alt text that repeats the H1 provides zero information to a screen reader (they hear the same string twice) and zero value to image search. It is the textbook example of alt text written for a crawler instead of a person, except here it was not even written for a crawler — it is a default.
2. **It silently voids work the writer already did.** The draft's frontmatter `notes` (line 20) states: *"Alt text for cover: 'Skincare products arranged on a bathroom shelf in morning light'."* That alt text **will never render**. There is no alt column in the `posts` table (`title, slug, category, cover_image_url, excerpt, content_html, read_time_minutes, is_published`), so there is nowhere to store it, and the template hardcodes `post.title`. The writer believes this is handled. It is not.

The same hardcoded `alt={post.title}` appears in `EditsSection.astro:53`, `edits/index.astro`, `edits/category/[category].astro:79` and `admin/index.astro:906` — so every post thumbnail on the site has duplicate-alt. Fix the pattern, not just this page. See **NT-1**.

Why this is not on the must-fix list: it is pre-existing, it affects every page equally, and it does not make a claim that is untrue — it just makes an uninformative one. It should be fixed, but fixing it is not a condition of publishing this article. **MF-1 and MF-2 are a different category: those are assertions that something happened which did not happen.**

---

## 7. The two credential problems

### 7.1 `src/config/seo.ts:69` — the skincare hub description

**Current** (174 chars, verified — already over the 160 guideline before you consider the content):

> Dermatologist-informed skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin — tested and explained step by step.

**What is wrong.** Two independent false claims in one sentence:
- **"Dermatologist-informed"** — no dermatologist has been involved. This is an invented credential, and it is the specific phrase the brief bans by name (brief §8.1).
- **"tested and explained step by step"** — "explained step by step" is true. **"tested"** is not. The site has no testing capability and the brief forbids the claim.

I confirmed by grep that this string appears **exactly once** in the codebase — `src/config/seo.ts:69` — and nowhere in the draft. So the article is clean; the surface it links to is not.

**Is it a pre-publish blocker for the link? Yes — and I want to be precise about why, because the reason is not the one you might expect.**

It is **not** a Google penalty risk. A new article linking to a page with an overclaim will not be demoted for it. The blocker is narrower and more concrete:

1. **The article's central trust move is undermined by one click.** Line 29 of the article says *"I write about skincare as someone who reads labels, not as someone qualified to treat skin."* Line 217 sends the reader to a hub that says *"Dermatologist-informed."* A reader who clicks that link — and the link is in the final CTA, so it is the highest-intent click on the page — arrives at a page that contradicts, in its first line, the credibility claim the article just made. That is the worst possible destination for the article's strongest exit.
2. **This hub currently contains exactly one article — this one.** So the contradiction is not diluted across a body of content. The reader sees "Dermatologist-informed" on a hub whose only inhabitant explicitly says no dermatologist was involved.
3. **The project's hard rule against invented credentials is not a style preference.** This is the exact class of claim the brief §8.1 lists first and the strategy §10 identifies as an already-fixed site problem. Leaving it while shipping an article that carefully avoids it makes the site internally inconsistent, and inconsistency is what a reviewer notices.
4. **It is also a 174-character meta description** — over length — so fixing it is a net win even ignoring the ethics.

**Recommended replacement.** Note this string is used in **two** places: `<meta name="description">` and the visible hub intro `<p class="cat-intro">` (`category/[category].astro:38` and `:69`). So it must read as both a snippet and a paragraph. It must also keep the hub's keyword targets (`teen skincare routine`, `glass skin routine`, `ceramide barrier repair`, `acne-prone`) because the hub is the Cluster A pillar.

**Primary recommendation — 156 chars, both false claims removed, all four keyword clusters retained:**

```ts
description:
  'Straight-talking skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin, explained step by step.',
```

Why this one: "Straight-talking" replaces "Dermatologist-informed" with a claim that is *true and is the brand's actual differentiator* — it is the same positioning bet the brief §10 makes for the article, applied to the hub. "Explained step by step" survives because it is accurate. "Tested" is gone. 156 chars lands inside the 150–160 band, down from 174.

**Alternative — 155 chars, if the editor prefers "honest" over "straight-talking":**

```ts
description:
  'Honest skincare routines for teens, explained step by step: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin. No hype.',
```

**Verdict: pre-publish blocker for the link.** If `seo.ts` cannot be changed before this article ships, the fallback is to remove the hub link from the closing paragraph and use the `/edits` index instead — but that is a worse outcome, because the hub link is the Cluster A pillar link the brief §6.1 designates as required. Change the line. It is a one-line edit and it improves the meta description while it is there.

**One honest note:** the description promises "ceramide barrier repair" and "gentle routines for acne-prone skin" on a hub that currently holds one article about neither. That is a thin-hub promise, not a false credential, and it resolves itself as the cluster fills. Not a blocker. Worth knowing.

### 7.2 `src/layouts/BaseLayout.astro:91–92` — the `Person` node claims testing

This was not in my brief and I am flagging it because it attaches directly to this article's structured data.

`BaseLayout.astro:85–95` defines the `Person` node that every article's `author: { '@id': '…#person-rini' }` resolves to. Its description reads:

> "Rini writes and edits every guide on TeenTimeGlow, **testing skincare routines**, styling formulas and room makeovers **before publishing them**."

**This is a fabricated testing claim in machine-readable markup, on the author entity of the article that most carefully avoids making one.** The draft's frontmatter notes are explicit: *"no first-person testing claims"* (line 19). The body honours that — and then the JSON-LD attached to the body says she tests skincare routines before publishing. The `Person` node is emitted on **every page**, so this is a site-wide issue, but it is *this* article that makes it conspicuous, because this is the article whose subject matter is skincare and whose first 150 words disclaim expertise.

It is the same defect class as §7.1 and it should be fixed in the same pass. Suggested replacement for line 91–92:

```ts
description:
  'Rini writes and edits every guide on TeenTimeGlow — skincare, styling formulas and room makeovers — from label reading and research, not from professional qualification.',
```

That is true, it removes the testing claim, and it converts a liability into the same honest-positioning asset the article uses. It is also a stronger `Person` description for E-E-A-T purposes, because it describes a method rather than claiming a result.

**This is a must-fix and I have listed it as such.** If team-lead wants to defer it, defer the wording but not the removal of "testing… before publishing them".

---

## 8. Pre-publish must-fix checklist

Ordered by impact. Each item has a location, the current text quoted, and the exact replacement. Items 1–2 are code, not copy. **7 items.**

---

### MF-1 — `src/config/seo.ts:69`: remove the invented credential and the testing claim
**Impact: highest. Blocks the hub link. Blocks a hard project rule.**

Current:
```ts
'Dermatologist-informed skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin — tested and explained step by step.'
```

Replace with:
```ts
'Straight-talking skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin, explained step by step.'
```

156 chars (was 174). Fixes the meta description length at the same time. Full reasoning in §7.1.

---

### MF-2 — `src/layouts/BaseLayout.astro:91–92`: the `Person` node claims testing
**Impact: highest. Fabricated credential in JSON-LD on every page.**

Current:
```ts
description:
  'Rini writes and edits every guide on TeenTimeGlow, testing skincare routines, styling formulas and room makeovers before publishing them.',
```

Replace with:
```ts
description:
  'Rini writes and edits every guide on TeenTimeGlow — skincare, styling formulas and room makeovers — from label reading and research, not from professional qualification.',
```

Full reasoning in §7.2.

---

### MF-3 — Lede, line 27: the inserted-keyword sentence
**Impact: high. It is in the first 100 words, which is the most-scrutinised text on the page, and it is ungrammatical.**

Current sentence (third sentence of paragraph 2):
> Most glass skin routine for teens advice gets closed in a tab before the bus.

Replace with:
> Most glass skin routine advice for teens gets closed in a tab before the bus.

The fix is one word of syntax: move the prepositional phrase `for teens` after the head noun `advice` instead of burying it inside a five-noun compound. `glass skin routine for teens` is no longer contiguous — but the contiguity was never doing any work, because the sentence carrying it could not be read. The intact phrase still appears at line 53, where it is grammatical.

Full paragraph in context, replacing line 27:
> It is a bad hour to be looking up a korean glass skin routine. Almost everything you will find assumes an open-ended morning, a sink nobody else needs, and a shelf of products you do not own. Most glass skin routine advice for teens gets closed in a tab before the bus.

This keeps the primary phrase in the lede (sentence 1), keeps a teen-qualified phrase in the lede (sentence 3), and makes sentence 3 parseable. Reasoning in §2.2(b).

---

### MF-4 — Closing paragraph, line 217: primary keyword absent from the conclusion
**Impact: high. The conclusion is the second-heaviest prose block on the page and currently contains zero instances.**

Current:
> Start with the morning four. When you want the rest, there are more [skincare guides for teens](/edits/category/skincare) here. And if you want the mood without the mirror, the [golden hour glow wallpaper](/wallpapers/golden-hour-glow-horizon) is a good place to land.

Replace with:
> Start with the morning four. The rest of the Korean glass skin routine is here when you want it — more [skincare guides for teens](/edits/category/skincare), all in the same order. And if you want the mood without the mirror, the [golden hour glow wallpaper](/wallpapers/golden-hour-glow-horizon) is a good place to land.

Adds the primary phrase once, in the CTA sentence, where a keyword belongs. Body count 1 → 2. Reasoning in §2.1 point 4. **Do not add a third.**

---

### MF-5 — H2 #1, line 33: heading does not match the definitional query
**Impact: high for snippet capture, zero risk, nine characters saved.**

Current:
```markdown
## What Glass Skin Actually Means
```

Replace with:
```markdown
## What Is Glass Skin, Actually?
```

29 chars. Anchor becomes `#what-is-glass-skin-actually`. TOC label shortens. Full reasoning in §5.1 Edit 1.

---

### MF-6 — Definition paragraph, line 35: colon makes the lead sentence hard to extract
**Impact: medium-high. This is the primary snippet candidate.**

Current:
> Glass skin is a Korean beauty term for skin that looks clear, smooth, and lit from within: plump rather than shiny, even rather than pale. It describes a finish, not a skin type. It comes from water and a healthy barrier, not from any single product.

Replace with:
> Glass skin is a Korean beauty term for skin that looks clear, smooth, and lit from within. It is plump rather than shiny, and even rather than pale. It describes a finish, not a skin type, and it comes from water and a healthy barrier, not from any single product.

46 → 50 words. Meaning unchanged. Reasoning in §5.1 Edit 2.

---

### MF-7 — Publish integrity: `created_at` and `read_time_minutes`
**Impact: medium-high. User-visible and machine-visible contradictions.**

Three separate checks, all at publish time:

1. **`created_at` must be set explicitly.** `[slug].astro:104` falls back to `'2026-10-18T00:00:00Z'`. If `created_at` is null, schema `datePublished` says 18 October while the body says "Last reviewed: 26 October 2026". Set the real timestamp.
2. **`read_time_minutes` — check which write path is used.** `src/pages/api/admin/posts.ts:47` computes it: `Math.max(2, Math.ceil((content_html || '').split(' ').length / 150))` → roughly **15 min** for this article. `src/pages/api/admin/publish.ts:43` **hardcodes `read_time_minutes: 3`**. If the article is published through the publish endpoint, the page will display "📖 3 min read" on a 2,200-word article. That is a visible inaccuracy on the byline bar of the site's flagship article, and it is a dwell-time problem: a teen who reads "15 min read" may not start, and one who reads "3 min" and finds 15 may leave. **Target 9–10 min** for ~2,200 words at 220–240 wpm. Set it explicitly.
3. **`updated_at` must match "Last reviewed: 26 October 2026"** (draft line 223). If `updated_at` is not the 26th, `dateModified` in the schema will disagree with the visible review date.

---

### Nice-to-have (not blocking)

| # | Item | Location | Note |
|---|---|---|---|
| NT-1 | Cover image alt | `[slug].astro:200` | `alt={post.title}` duplicates the H1 and discards the alt the draft specifies in its notes. Needs either a `cover_image_alt` column or a sensible template fallback. Same bug in `EditsSection.astro:53`, `edits/index.astro`, `category/[category].astro:79`, `admin/index.astro:906`. §6 |
| NT-2 | `SPF` never appears | Step 4, line 123 | "Two fingers' worth for face and neck" → "Two fingers' worth of SPF for face and neck". A heavily searched term, named at zero cost. |
| NT-3 | `double cleanse` never appears | Step 5, line 137 | The article describes a double cleanse in full and never names it. "start with an oil-based cleanser to dissolve it, then follow with the water-based one" → "that is a double cleanse: an oil-based cleanser to dissolve it, then the water-based one." |
| NT-4 | `hyaluronic acid` / `sebum` absent | Step 2 / "At Fifteen" | Both were in the brief's semantic field. One mention each is natural. Low value; skip if the editor is protecting word count. |
| NT-5 | Section 3 never says "glass skin" | H2 #3, 237 words | The one place the topical thread breaks. Fixable by the NT-3 edit if it lands in H2 #3 rather than #5. |
| NT-6 | Table lead-in + ordinal Position column + shorter headers | H2 #3 table | §5.2 Edits 1–3. Improves table-snippet odds; modest. |
| NT-7 | `isPartOf` missing on `BlogPosting` | `[slug].astro:93–114` | Add `isPartOf: { '@id': `${SITE_URL}/#website` }`. The category page has it; the article does not. One line. |
| NT-8 | `image` dimensions unverified | `[slug].astro:98–103` | Hardcoded 1200×675. Verify or drop the two properties. |
| NT-9 | `audience` property | `[slug].astro:93–114` | `audience: { '@type': 'Audience', audienceType: 'Teens' }`. True, harmless, low value. |
| NT-10 | Byline not linked to `/about` | `[slug].astro:176` | The `Person` node's `url` is `/about`; the visible "Rini" is plain text. Linking it costs nothing and strengthens author E-E-A-T. |
| NT-11 | Internal link distribution | Sections 3–7 | 4 links, all in sections 0/2/8. Sections 3–7 = 1,084 words with no exit. **Not fixable now** — the only candidate destinations (`ceramide-barrier-repair`, `study-aesthetic-sanctuary`, `autumn-capsule-wardrobe`) 404 today, and shipping a new 404 inside a new article is worse than no link. Backfill when the siblings publish. |
| NT-12 | Description audience qualifier | `post.excerpt` | 151 → 160 chars, adds "teen skin". §3.3 #1. Editor's call — it is a visible copy change to the lede. |
| NT-13 | Zero external citations | whole article | 0 outbound links on health-adjacent content. **I am not recommending a guessed URL.** The brief §4.4 correctly found the AAD URL 404 and could not verify the CNN story. If one live-verified public-health source can be found before ship, one citation is worth more than zero; if it cannot be verified, shipping zero is the correct choice and the honest one. Do not add a citation to satisfy a checklist. |
| NT-14 | Closing trapped under H2 #8 | H2 #8 | The final TOC entry is "How Long It Takes, And When To See A Doctor" but clicking it lands the reader on the doctor list, not the CTA. A "Conclusion" H2 would be worse (dead weight in the TOC, per brief §5). Leave it. |

---

## 9. Publish checklist

- [x] Slug is exactly `glass-skin-korean-routine` — do not change (two hardcoded inbound links depend on it)
- [x] `post.title` ≤ 45 chars → 60-char title tag with primary keyword at front
- [x] Primary keyword in H1 — exact, contiguous
- [x] Primary keyword in first 100 words — line 27, ~word 30
- [ ] **Primary keyword in conclusion** — MF-4
- [ ] Primary keyword in ≥1 H2 — **not achieved, and I am not recommending it.** 0 of 8 H2s carry a target phrase; the H2s are locked for TOC/UX reasons and forcing a phrase into one would cost the differentiator. Accepted trade, documented.
- [x] Keyword density sane — `glass skin` 13/2,219 = 0.59%; primary 1/2,219 = 0.05%. No stuffing risk whatsoever.
- [x] 4 internal links, all resolving, all descriptive anchors
- [ ] Internal links spread across the body — **not achieved, not fixable** (NT-11)
- [x] H1/H2/H3 hierarchy correct, no skipped levels, all H2 ≤ 52 chars
- [x] Conclusion has a clear CTA
- [ ] Meta description contains an audience qualifier — NT-12, editor's call
- [ ] `seo.ts:69` credential claim removed — **MF-1, blocks the hub link**
- [ ] `BaseLayout.astro:91` testing claim removed — **MF-2**
- [ ] Cover image has descriptive alt — NT-1
- [ ] `created_at` set; `read_time_minutes` = 9–10; `updated_at` = 26 Oct 2026 — **MF-7**
- [ ] `datePublished` / `dateModified` in schema agree with the visible review date
- [x] Disclaimer block present and visible
- [x] Specific doctor off-ramp present (5 bullets, not boilerplate)
- [x] No invented statistics, no brand names, no first-person testing claims **in the prose**
- [ ] …and none in the schema or the hub description — MF-1, MF-2
- [x] No `MedicalWebPage` schema — correctly absent, keep it absent
- [ ] Confirm `/quotes/small-daily-habits-create-massive-transformations` returns 200
- [ ] Confirm the wallpaper slug resolves from a build (do not ship a guessed URL)
- [ ] Confirm `/edits/glass-skin-korean-routine` returns 200 — repairs the Hero card and the quiz CTA

---

## 10. Publish recommendation

**Status: NEEDS MINOR FIXES**
**Estimated fix time: 45–60 minutes** — of which ~10 minutes is the two code edits (MF-1, MF-2), ~15 minutes is the four copy edits (MF-3 to MF-6), and ~15 minutes is publish-integrity verification (MF-7).

**The honest summary.** This is a well-built article. The keyword work is disciplined and correctly restrained, the structure is clean, the E-E-A-T signals in the prose are stronger than anything on the SERP, and the internal links are placed exactly where the brief asked. It would not embarrass the site if it shipped today.

The score of 70 is not a verdict on the writing. It is a verdict on the fact that **the article is more honest than the code around it.** Two of the seven must-fixes are invented credentials sitting in `seo.ts` and `BaseLayout.astro` — surfaces the writer never saw and could not have fixed. One more is a publish endpoint that will print "3 min read" on a 2,200-word page. Those are not editorial problems; they are the publishing pipeline making claims the editorial team has already decided not to make, and getting the article's basic facts wrong.

Fix MF-1 and MF-2 first. They are ten minutes and they are the difference between an article that is credible and a site that says it is credible without meaning it.

---

*Report ends. Draft not modified.*
