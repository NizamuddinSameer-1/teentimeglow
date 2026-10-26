# SEO Research Brief — "Glass Skin Routine for Teens" (Cluster A, Skincare)

**Prepared:** 26 October 2026
**Prepared by:** keyword-researcher (Phase 1)
**For:** the writer drafting the article — *this brief is not the article*
**Site:** https://www.teentimeglow.me
**Non-negotiable publish slug:** `/edits/glass-skin-korean-routine`
**Source of truth:** `SEO-STRATEGY.md` §4.2 Cluster A, §4.3, §5, §6

---

## 0. Read this first — three structural findings that change how the article must be written

These came out of reading the codebase, not the SERP. They constrain the copy more than any keyword does.

### 0.1 `post.title` is simultaneously the H1 **and** the `<title>` tag

`src/pages/edits/[slug].astro`:

```astro
title={`${post.title} | TeenTimeGlow`}   // line 129 — the <title> tag
<h1 class="article-hero-title">{post.title}</h1>  // line 168 — the H1
```

There is **no separate meta-title field** in the `posts` table (`title, slug, category, cover_image_url, excerpt, content_html, read_time_minutes, is_published`). So:

- `post.title` must read as a headline (H1) **and** survive as a title tag with `" | TeenTimeGlow"` (15 chars incl. the separator) appended.
- **Budget: keep `post.title` at or under 45 characters** to land the full title tag at ≤ 60.

This is why the recommended H1 below is shorter than the strategy doc's suggested title. The doc's "The Glass Skin Routine That Survives a School Schedule" is **54 characters** — it makes a **69-character** title tag and also loses the slug keyword entirely. Do not use it verbatim.

### 0.2 `post.excerpt` is simultaneously the meta description **and** the visible lede

```astro
description={post.excerpt}                      // line 130 — <meta name="description">
<p class="article-lead-excerpt">{post.excerpt}</p>  // line 169 — rendered under the H1
```

So the excerpt does three jobs: SERP snippet, on-page lede, and card teaser on `/edits` and the category hub. It must be 150–160 characters, self-contained, and hook-shaped — not a summary. **The writer must not repeat the excerpt as the opening paragraph of `content_html`**, or the article will open with the same sentence twice.

### 0.3 The TOC is auto-generated from `<h2>` tags — H2 text is UI, not just structure

`buildTocAndContent()` (line 54) strips inline tags, slugifies the remaining text, and **slices the anchor id to 60 characters**. Consequences for the writer:

- H2s must read as standalone nav labels — a reader scanning the sidebar sees only the H2 text, with no surrounding sentence for context.
- Keep H2s **under ~55 characters** so the anchor id is never truncated mid-phrase.
- Avoid emoji and symbols in H2 text: `slugifyHeading()` deletes all non-`[a-z0-9\s-]`, so a leading emoji can produce a mangled id.
- Apostrophes are stripped (`Weren't` → `werent`). Harmless, but do not rely on them.
- Inline `<strong>`/`<em>` inside an H2 is safe — they are stripped for both the label and the id.

### 0.4 The slug is not a preference — it repairs five broken links

Verified by reading source. The `posts` table is empty **and** `fallbackPosts` in `src/lib/seeds.ts` is `[]`, so every hardcoded article link on the site currently 404s:

| File | Line | Target | Status |
|---|---|---|---|
| `src/components/Hero.astro` | 92 | `/edits/glass-skin-korean-routine` | 404 |
| `src/pages/quiz/index.astro` | 23 | `/edits/glass-skin-korean-routine` | 404 |
| `src/pages/quiz/index.astro` | 41 | `/edits/ceramide-barrier-repair` | 404 |
| `src/pages/quiz/index.astro` | 59 | `/edits/study-aesthetic-sanctuary` | 404 |
| `src/pages/quiz/index.astro` | 77 | `/edits/autumn-capsule-wardrobe` | 404 |

**The quiz has four result archetypes and all four CTAs dead-end.** Every user who finishes the quiz hits a 404. This article fixes one of the four; the other three are already-named future articles and should keep their reserved slugs (`ceramide-barrier-repair`, `study-aesthetic-sanctuary`, `autumn-capsule-wardrobe`) in the content plan.

**What the link repair is worth, honestly:** two links, but from the two highest-authority pages on a domain with essentially no authority — the homepage (above the fold, inside a floating glass card) and `/quiz` (a link at the single highest-intent moment on the site, immediately after a personalised result). On a site with ~32 indexable URLs and zero articles, that is likely the difference between "first article gets crawled and indexed in days" and "first article sits orphaned for weeks". I would not put a traffic number on it — I have no GSC access — but the internal-link and indexation value is real and is the strongest argument for keeping the slug.

**Verdict: keep `/edits/glass-skin-korean-routine`.** The keyword has been chosen to fit the slug, not the other way round.

**Bonus:** `src/pages/quiz/index.astro` line 24 already promises the reader `matchedEditTitle: 'The 7-Step Korean Glass Skin Routine'`. The article should therefore actually deliver a seven-step routine, or the quiz is lying. §5 below resolves this without contradicting the "fewer steps" thesis.

---

## 1. Primary keyword

### Recommendation

> **Primary keyword: `korean glass skin routine`**

| Attribute | Value | Confidence |
|---|---|---|
| Search volume band | **1,000–3,000 / month** (global, all regions) | **LOW — estimate.** Not scraped. Derived from: the phrase appears in the `<h1>` or `<title>` of four of the five pages that rank for adjacent queries, which only happens when a phrase carries real volume; and it is a mid-tail modifier of `glass skin routine`, which is a high-volume head term. Treat as a band, not a number. |
| Difficulty band | **Low to Low-Medium (est. KD 10–20)** | **MEDIUM-HIGH confidence — this one is observable, not guessed.** See §4: the entire top of the SERP is DTC K-beauty store blogs with no editorial authority, no bylines and 500–1,300 words. That is the weakest competitive set this site will see in the skincare cluster. |
| Intent | Informational, with a strong commercial undercurrent | High confidence |
| Slug compatibility | **Exact match** — `glass-skin-korean-routine` contains the keyword contiguously | Certain |

### Why this and not the doc's `glass skin routine for teens`

The strategy doc nominates "glass skin routine for teens". I am recommending a different primary, and here is the trade honestly:

**For `korean glass skin routine`:**
1. It is an **exact match to the fixed slug**. At zero domain authority, exact-match slug + exact-match H1 + exact-match title is the cheapest relevance signal available and the one thing a new site can still control.
2. It is **what the quiz already promises** ("The 7-Step Korean Glass Skin Routine"). Aligning the H1 with the internal link text that points at it is free relevance.
3. It has a **demonstrably weak SERP** — five store blogs. `glass skin routine for teens` has a SERP of brand-owned pages (CeraVe, Cetaphil) and low-authority reposts, which is a different and arguably harder problem: brand domains outrank small sites on teen-qualified terms by default.
4. It is **broader**, so the article can rank for the teen variants from the body without the H1 having to carry them.

**Against it:** it is a less literal match to the teen audience, so `glass skin routine for teens` must appear in the excerpt, the first 100 words, and one H2. It also has lower intent precision — someone searching the Korean phrase may not be a teen.

**My call:** target `korean glass skin routine` as primary and treat `glass skin routine for teens` as the strongest secondary, placed in the H2 #2 heading. If team-lead prefers to honour the strategy doc literally, **nothing breaks** — the slug still supports `glass skin routine for teens` as a partial match and the H1 can be reordered. This is a reversible decision; the slug is not. I would flag it as a coin-flip worth ~10% either way and would not spend more team time on it.

**Do not** target `glass skin routine` (bare). That is the head term the strategy doc §4.3 correctly says is unwinnable at this authority level.

---

## 2. Secondary and semantic keywords, mapped to sections

Each phrase gets exactly one home. This is deliberate — see the cannibalisation check in §9.

| # | Keyword / variant | Type | Where it must appear | Notes |
|---|---|---|---|---|
| 1 | `glass skin routine for teens` | Secondary (highest priority) | **H2 #2 heading**, plus excerpt and first 100 words | The audience-defining phrase. Must be in a heading, not just body copy. |
| 2 | `korean skincare routine order` | Secondary | **H2 #3 heading** + one H3 | This is the single most-searched sub-question in the cluster and the article answers it in one section. |
| 3 | `glass skin routine for school mornings` | Long-tail (differentiator) | **H2 #4 heading** + the lede | No competitor targets this. This is the wedge. |
| 4 | `glass skin routine at night` | Secondary | **H2 #5 heading** | Pairs with #3 to form the "two routines, one system" structure. |
| 5 | `do teens need retinol` | Long-tail (safety, high value) | **H2 #6 heading** (or its H3) | High-intent, low-competition, and it is the honest answer competitors refuse to give. |
| 6 | `glass skin routine for oily skin` / `acne-prone` | Secondary | **H2 #7 heading** | The strategy doc has a separate article planned for `skincare routine for oily skin teen` — see the cannibalisation note in §9. Here it is scoped to *adjusting the glass skin routine*, not to a full oily-skin routine. |
| 7 | `how long does it take to get glass skin` | Long-tail (FAQ-shaped) | **H2 #8**, as an H3 | Every competitor answers this with an unsourced timeline. We answer it without inventing numbers. |
| 8 | `what is glass skin` | Semantic | **H2 #1** heading | The definitional query. Also the featured-snippet play. |
| 9 | `how to get glass skin without 10 steps` | Long-tail | Body of H2 #2 | Mirrors the exact frustration. Do not force it into a heading — it reads like a keyword. |
| 10 | `skincare routine for 13 year old` / `for 14 year old` | Long-tail | Body of H2 #6 | Age-specific qualifiers are how parents and younger teens search. Natural fit in the "skip these" section. |

**Semantic field to weave in naturally (do not checklist):** *skin barrier, hydration layers, essence, double cleanse, low-pH cleanser, niacinamide, hyaluronic acid, centella, non-comedogenic, fragrance-free, patch test, purging vs breakout, sebum, T-zone.*

**Term to avoid entirely:** **"wonyoungism."** It surfaced in the teen-query SERP (a Pinterest board) and it is a live trend term, but it is tightly bound up with restrictive-dieting discourse. Using it — even neutrally — on a page read by 13-year-olds is a brand and safety risk with no SEO upside. Do not use it, do not allude to it.

---

## 3. Search intent — what the reader is actually doing

**Classification:** Informational (primary), with latent commercial intent (secondary).

**Not "informational" in the abstract. Specifically:**

She is 14–17. She has watched a short-form video — almost certainly of a Korean or Korean-adjacent creator — of someone with visibly reflective, even, dewy skin, doing a routine with six or nine products. She has screenshotted it. She has either tried to buy two of the products, or wants to and cannot afford them. She has a school bus at 7:15 and a mirror in a bathroom she shares.

The query is a **gap-closing query**: she has a target image and no method that fits her actual life. What she is trying to accomplish, in order:

1. **Get a routine she can start tomorrow morning** — not a philosophy, not a haul. A list, in order, with how long it takes.
2. **Find out whether she is doing it wrong** — she suspects her current approach (probably cleanser + whatever moisturiser is in the house, plus one serum a friend recommended) is the reason it is not working. She wants permission *and* correction.
3. **Find out how long until it works** — because if the answer is six months she wants to know now, and if it is a week she wants to know that too. Every competitor answers this and every competitor makes the number up.
4. **Reassure herself she does not need to spend £200** — she will not type this, but it is the emotional core of the search.
5. **Not be told she is damaging her skin** — she is aware of the "teens are ruining their barriers" discourse and it makes her defensive. A lecture loses her in the first paragraph.

**What this means for the copy:** the article must open with the scene (bus, mirror, time), deliver the routine early (before any theory), and place the safety material *after* the routine has been given — so the warning reads as care rather than as a gate. Front-loading the disclaimer will cost the bounce rate and the E-E-A-T both.

**One commercial note:** she may buy something as a result of this article. Do not exploit it. The site has no product testing capability and §4.3 of the strategy forbids "best [product]" content. Product guidance must be **ingredient-and-label shaped** ("look for a fragrance-free gel moisturiser"), never brand-shaped.

---

## 4. Competitive analysis

### Method and honesty statement

Live SERP sampled on **26 October 2026** via web search, from a single locale. **Rankings are personalised and locale-dependent — this is a snapshot, not a rank-tracker export.** Word counts below are **estimates from extracted page text**, not measured. Where I could not verify something, I say so.

### 4.1 Who actually ranks for the target phrase

The five pages that surfaced for `korean glass skin routine for beginners steps`:

| # | Page | Est. words | Publisher type | What it covers |
|---|---|---|---|---|
| 1 | **kbeautyfactory.ca** — "From Dull to Dewy — The Step-by-Step Korean Glass Skin Routine" | ~530 | DTC K-beauty store (Canada) | 5 steps. Names a specific product at every step (Beauty of Joseon Ginseng Essence Water, Acwell Licorice Ampoule, Medicube PDRN Cream). Ends with a shop link. |
| 2 | **kisskbeauty.com** — "The Secret to Korean Glass Skin: A Beginner's Guide" | ~620 | DTC K-beauty store | 9 steps, including eye cream and sheet masks. Attributes claims to "many dermatologists" — unnamed. Lists "reduced acne and irritation" as a routine *benefit*. |
| 3 | **menahub.com** — "How to Get Glass Skin: The 7-Step Korean Routine" | ~750 | DTC K-beauty store (Qatar) | 7 steps. Closest structural match to our plan. Ingredient section, FAQ, "give it 4–6 weeks". Ends with PayLater/delivery CTA. |
| 4 | **skincarelab.uk** — "Glass Skin Routine: A Beginner's K-Beauty Starter Guide" | ~900 | DTC K-beauty store (UK) | **The strongest of the set.** Explicitly 5-step, explicitly anti-haul ("it's not about owning 15 products"), real FAQ, "glass skin is a habit, not a haul". Then upsells a facial at a partner clinic. |
| 5 | **clarah.co** — "Beginner Friendly Korean Glass Skin Routine at Home" | ~1,300 | DTC / content site | **The longest and most complete.** 9 steps, an ingredient table, a timeline table (2–4 wks / 6–8 wks / 3–6 months), a "common mistakes" section. |

**The headline finding: this is not a SERP owned by publishers. It is a SERP owned by shops.** No Byrdie, no Allure, no Healthline, no Reddit, no AAD. Five commercial blogs whose job is to route the reader to a cart. That is the opening.

### 4.2 Who ranks for the teen-qualified variant

Different SERP, much weaker:

- **CeraVe** — "Tween & Teen Skincare Guidance" (brand-owned; quotes **Dr Latanya Benjamin, board-certified pediatric dermatologist**, and is by far the most authoritative result — see §8)
- **Cetaphil** — brand skincare-routine hub
- **dailymom.com** — "Back-to-School Beauty Basics" (mom-blog, product roundup)
- **indianewengland.com** — a syndicated press-release piece on teen skincare
- **yourteenmag.com** — "Skincare For Teens" (parenting magazine)
- **teenskincaretips.com** — low-authority affiliate site

**Note what is absent:** nobody has combined the two SERPs. There is no page that is *both* a genuine glass-skin routine guide *and* written for a teenager with a school timetable. The glass-skin pages are all adult-facing shops; the teen pages are all brand-owned or parent-facing and all say "keep it simple, 3 steps" without ever explaining glass skin. **That intersection is empty.** It is also exactly where the slug, the quiz and the brand already point.

### 4.3 What they all get wrong — the content gap

Six failures, in order of how much they are worth to us:

1. **No time budget. Not one of the five mentions how long the routine takes.** Every one of them assumes an open-ended morning and an adult with nowhere to be. This is the single largest unclaimed angle and it is the one the strategy doc already half-found ("survives a school schedule"). Own it completely: give actual minutes, and give the version that fits before a 7:15 bus.
2. **Product-first, never decision-first.** Every step is "try: [brand]". A reader with no budget is left with nothing. Ours must be written so a reader can walk into a supermarket with the *criteria* and no brand names — which is also the only version the site is allowed to write (no testing capability, §4.3).
3. **No ceiling on actives for young skin.** They recommend exfoliating AHA/BHA toners, vitamin C, niacinamide, snail mucin, and (kisskbeauty) eye cream, with **zero age qualifier and no stacking warning**. The paediatric-dermatology position is close to the opposite: simple, gentle, and *no anti-aging actives under 18*. This is the gap with the most E-E-A-T value and the most genuine reader benefit — and it is a gap created by commercial incentive, which makes it durable.
4. **No failure mode.** Not one says what to do if it stings, how to tell purging from a breakout, or when to stop and see a doctor. Health-adjacent content with no off-ramp.
5. **"Glass skin" is never honestly defined.** All five present it as an achievable poreless finish. None mentions that the reference images are lit, filtered, and frequently made-up. Telling that truth once, plainly, is the most credible thing this article can do — and it is the thing the reader most needs and least expects.
6. **No author, no date, no voice.** Anonymous shop copy, undated. A named curator with an opinion is an instant differentiator on this SERP, and it is the one asset the brand already has.

### 4.4 Claims the team must verify before publishing

Flagging these because I would not ship them on my own authority:

| Claim | Status | Action |
|---|---|---|
| Word counts of competitors (530 / 620 / 750 / 900 / 1,300) | **Estimate** from extracted text | Do not quote these in the article. Internal planning only. |
| "The SERP is five DTC store blogs" | **Observed** 26 Oct 2026, one locale, one sampling | True as of this snapshot. Do not state it as a permanent fact anywhere public. |
| A CNN report (~8 Oct 2026) that dermatologists are warning about glass-skin-trend risks, referencing the AAD | **UNVERIFIED.** I only saw a Chinese-language repost of it. I could not reach or confirm the original URL. | **Do not cite this.** If the team wants the news hook, someone must find and open the live CNN URL first. This is exactly the kind of claim that gets a site penalised when it turns out to be a misread repost. |
| CeraVe teen guidance + Dr Latanya Benjamin quotes | **Verified live**, fetched 26 Oct 2026 | Usable, **but it is a brand-partner page.** Attribute as "CeraVe's teen skincare guidance, which quotes board-certified paediatric dermatologist Dr Latanya Benjamin" — never as an independent clinical source, and never as "dermatologist-approved" for our article. |
| AAD preteen/teen skincare page URL | **Unverified** — the URL I tried returned 404 | Do not link a guessed AAD URL. If an AAD citation is wanted, find the live page first. |
| Anything about search volume | **Estimate** | Never present as measured. |

### 4.5 Featured snippet opportunity

**Yes — and it is worth designing for.** The query `what is glass skin` is definitional, and the snippet-shaped answer is a 40–55 word paragraph directly under **H2 #1**. Write that paragraph to stand alone, starting with a definition sentence, no first-person, no "in this article". A `<table>` in H2 #3 (product type → position in order → why) is the second snippet play — comparison tables win those boxes disproportionately, and none of the five competitors has one.

---

## 5. Recommended structure

### Length recommendation

> **Target 2,000–2,200 words. Aim for ~2,100.**

Reasoning, stated plainly because it contradicts the doc's floor and I want the reasoning visible:

- The doc's floor is 1,400. That floor is **not wrong on competitive grounds** — the live SERP is *thin*, not long. The longest competitor is ~1,300 words (estimated) and the median is ~750. Nobody on this SERP is running 2,000+ words. So this is **not** a case of "the SERP is dominated by long pieces, so we must go longer." I want to be explicit about that, because it would be easy to justify padding that way and it would be dishonest.
- The reason to go to ~2,100 is **the job list**, not the competitor word count. This article has to carry: a definition, a gap argument, a layering-order explainer, a timed morning routine, a timed night routine, a safety/actives section, an acne variant, and a timeline + escalation section. That is eight substantive sections. At 1,400 words that is 175 words each — enough for a listicle, not enough for the sections to be *useful*, and usefulness is the whole differentiation.
- Second reason: **the site has zero articles and near-zero authority.** A 1,400-word first article on a domain nobody has heard of is competing against a 1,300-word page on a shop that already sells the products. Depth is the only lever available that does not require backlinks.
- **Do not exceed ~2,300.** Past that, on this topic, the words stop being sections and start being filler, and filler is what the helpful-content system is built to demote.

### H1 / `post.title` (drives both H1 and `<title>`)

> ## The Korean Glass Skin Routine for School Days

- **45 characters** → title tag becomes `The Korean Glass Skin Routine for School Days | TeenTimeGlow` = **60 characters**, exactly at the limit.
- Contains the exact primary keyword `Korean glass skin routine` contiguously, at the front.
- Contains the differentiator (`School Days`) without spending characters on it.
- **Fallback if the team wants title-tag headroom:** `Korean Glass Skin Routine for School Days` (41 chars → 56-char title tag). Slightly less natural as an H1, more comfortable as a title tag. Either is defensible; I marginally prefer the version with "The".
- **Do not** use the strategy doc's suggested title verbatim — 53 chars → 68-char title tag, and it contains none of the slug keyword.

### H2 / H3 outline

H2s are the nav labels. Every one reads standalone. Character counts are given so the writer can hold the 55-char ceiling.

---

**`<h2>` 1. What Glass Skin Actually Means** *(30 chars · `#what-glass-skin-actually-means`)*
*Purpose: define the term honestly and set the article's credibility tone — this is the section that makes the reader trust the rest.*

- `<h3>` **It Is Not Poreless Skin** — name the filter/lighting/makeup reality once, without moralising. This is the trust deposit.
- `<h3>` **The Two Things That Create The Look** — hydration (plumpness) + even tone (barrier health). Sets up why the routine is hydration-led and why "more actives" is the wrong instinct.
- *Contains the featured-snippet paragraph (~50 words, standalone).*

**`<h2>` 2. Why Glass Skin Routines Aren't Written For Teens** *(48 chars · `#why-glass-skin-routines-arent-written-for-teens`)*
*Purpose: state the content gap as a reader benefit. This is where `glass skin routine for teens` must appear in the heading.*

- `<h3>` **The Nine-Step Routine Is A Shopping List** — the products-first critique, aimed at the competitor pattern, without naming competitors.
- `<h3>` **What Your Skin Is Actually Doing At Fifteen** — hormones, sebum, barrier still developing. No numbers, no citations required — keep it plain-language and non-clinical. **Do not invent a statistic here.**
- *This is where the reader decides whether to keep reading. End it with the promise the rest of the article delivers.*

**`<h2>` 3. The Order Matters More Than The Products** *(40 chars · `#the-order-matters-more-than-the-products`)*
*Purpose: the layering-order explainer. Home of `korean skincare routine order`. This is the most-searched sub-question in the cluster.*

- `<h3>` **Thin To Thick, Water Before Oil** — the one rule, then why it exists.
- `<h3>` **Where Each Step Goes** — a `<table>`: product type → position → what it does → what happens if you put it in the wrong place. Snippet play #2.
- *Must land the point that order is free and products are not — this is the budget-conscious reader's payoff.*

**`<h2>` 4. The School Morning Routine: Four Steps, Four Minutes** *(52 chars · `#the-school-morning-routine-four-steps-four-minutes`)*
*Purpose: the differentiated core. Home of `glass skin routine for school mornings`. Deliver the thing the reader came for, early enough to hold her.*

- `<h3>` **Step 1 — Cleanse, Or Just Water** — the honest answer (many teens need only water in the morning; over-cleansing is a real failure mode).
- `<h3>` **Step 2 — One Hydrating Layer, Patted In** — toner/essence, and the patting technique. One layer, not five.
- `<h3>` **Step 3 — Moisturiser On Damp Skin** — the technique that actually produces the "glass" finish, and it costs nothing.
- `<h3>` **Step 4 — Sunscreen, Every Single Morning** — non-negotiable framing; also the step that makes the other three worth doing.
- *Give a real minute count per step. The timings are the differentiator; approximate timings are worthless. If it genuinely takes four minutes, say four; if it takes six, say six.*

**`<h2>` 5. The Night Routine: Three Steps, Six Minutes** *(43 chars · `#the-night-routine-three-steps-six-minutes`)*
*Purpose: complete the system. Home of `glass skin routine at night`. Establishes that morning 4 + night 3 = the seven steps the quiz promises.*

- `<h3>` **Step 5 — Cleanse Again, Properly This Time** — double cleanse only if there was SPF or makeup; explain the oil-then-water logic briefly.
- `<h3>` **Step 6 — One Treatment, Two Or Three Nights A Week** — a single targeted step, frequency-capped, with an explicit "not every night" instruction.
- `<h3>` **Step 7 — Moisturise, Then Stop** — the discipline of ending the routine. "Then stop" is the load-bearing phrase of the whole article.

**`<h2>` 6. The Two Steps To Skip Until You're Older** *(40 chars · `#the-two-steps-to-skip-until-youre-older`)*
*Purpose: the safety section — and the section that earns the article's E-E-A-T. Home of `do teens need retinol`.*

- `<h3>` **Retinol And Retinoids** — say plainly: not for teenage skin without a doctor's involvement. This is the direct contradiction of every competitor, and it is the single most valuable paragraph in the article.
- `<h3>` **Strong Acids And "Glass Skin" Peels** — AHA/BHA overuse, and the specific warning about borrowing a friend's product.
- *Frame as "skip for now", not "never". Defensive readers shut down on absolutes.*

**`<h2>` 7. If You Have Acne, Change These Two Things** *(41 chars · `#if-you-have-acne-change-these-two-things`)*
*Purpose: serve the largest sub-segment without writing a second article. Scoped narrowly — see §9.*

- `<h3>` **Change The Cleanser, Not The Routine** — the two adjustments, stated as swaps rather than additions.
- `<h3>` **Purging Is Not The Same As Breaking Out** — the distinction nobody explains, in plain language. Ends with a one-line pointer to a doctor if it is the second one.

**`<h2>` 8. How Long It Takes, And When To See A Doctor** *(43 chars · `#how-long-it-takes-and-when-to-see-a-doctor`)*
*Purpose: expectation-setting and the escalation off-ramp. Home of `how long does it take to get glass skin`. Also where the disclaimer lives.*

- `<h3>` **What Changes First** — hydration/texture before tone. Describe the sequence qualitatively. **No week-by-week table with invented dates.**
- `<h3>` **See A Dermatologist If** — a short, concrete bulleted list: painful or cystic acne, sudden changes, a reaction to a product, scarring, skin picking. This is the medical off-ramp and it must be specific, not "consult a professional".
- *Close the section with the consistency point and a link to the Rituals quote page (see §6).*

**Closing paragraph (no H2)** — 80–100 words. Return to the 6:40am scene from the lede, land the thesis ("the routine you can keep beats the routine that's perfect"), one soft CTA to the skincare hub. **No H2 here** — an H2 would put "Conclusion" in the nav, which is dead weight in a TOC.

### Word budget

| Section | Words |
|---|---|
| Lede (excerpt, rendered separately) | 0 (do not repeat in body) |
| H2 #1 | 220 |
| H2 #2 | 300 |
| H2 #3 | 260 |
| H2 #4 | 380 |
| H2 #5 | 330 |
| H2 #6 | 280 |
| H2 #7 | 240 |
| H2 #8 | 260 |
| Closing | 90 |
| **Total** | **~2,360** |

That is slightly over the 2,200 target — trim H2 #2 and #6 by ~60 words each during editing to land at ~2,240. Do not trim #4 or #5; those are the reason the article exists.

---

## 6. Internal links

**Five recommendations.** Anchor text describes the destination; no "click here", no "read more".

### 6.1 `/edits/category/skincare` — REQUIRED (hub link)

- **Anchor:** `skincare guides for teens`
- **Placement:** closing paragraph, as the CTA.
- **Why here:** the closing paragraph is the natural exit, and the breadcrumb + category badge already link up automatically — putting a second hub link mid-article would be redundant and would read as navigational clutter to a reader who is mid-routine.
- **Note for the writer:** this hub is the Cluster A pillar. The anchor should describe what the hub *is*, not what it contains today (it currently contains this article and nothing else).

### 6.2 `/quiz` — the glow aesthetic quiz

- **Anchor:** `What Is Your Signature Teen Glow Aesthetic?`
- **Placement:** end of **H2 #2**, at the point where the reader has just been told the standard routine was not designed for her and is deciding whether to trust us.
- **Why here:** it is the one moment in the article where the reader is actively unsure what her own situation is. That is the exact moment a quiz is welcome rather than a distraction. It also puts a link to a page with its own traffic potential at the highest-attention point in the article.

### 6.3 `/quotes/small-daily-habits-create-massive-transformations`

- **Anchor:** `small daily habits create massive transformations`
- **Placement:** **H2 #8**, in the consistency paragraph.
- **Why here:** the quote page's own theme is "Rituals" and its interpretation is literally about how a repeated action stops requiring a decision — the same argument H2 #8 is making. It is a genuine semantic match, not a slot-fill. It also creates a bidirectional link, since that quote page's `relatedHref` already points at `/edits/category/decor` and its sibling `your-glow-is-your-signature` already points at `/edits/category/skincare`.
- ⚠️ **Verify before shipping:** quote slugs come from `buildQuoteSlugMap()` in `src/lib/slugs.ts`. The key in `QUOTE_COPY` is documented as being the slug, so this should resolve — but confirm it returns 200 before publishing.

### 6.4 `/wallpapers/[slug]` — "Golden Hour Glow Horizon"

- **Anchor:** `golden hour glow wallpaper`
- **Placement:** closing paragraph, as a light, non-commercial aside.
- **Why here:** it is the only non-skincare link in the article and it belongs at the exit, where it reads as a bonus rather than a derailment. Topically it rhymes with "lit from within", which H2 #1 establishes.
- ⚠️ **Slug must be confirmed before linking.** Wallpaper slugs are derived from the title at render time via `src/lib/slugs.ts`, so the URL cannot be inferred from the title. **Refer to the wallpaper by title and have whoever publishes resolve the actual slug from a build.** Do not let the writer guess it.
- **Alternative if the slug cannot be resolved in time:** drop this link and use "Iced Matcha Latte Minimalist" instead — same reasoning, same caveat. Do not ship a guessed URL.

### 6.5 Reserved sibling slugs — link later, not now

These already exist as hardcoded links in `quiz/index.astro` and will be Cluster A / B / C articles. **Do not link them from this article yet** — they 404 today, and shipping a new 404 in a brand-new article is worse than having no link. Add these as backfill links once the sibling articles publish:

| Reserved slug | Cluster | Quiz archetype that points at it |
|---|---|---|
| `/edits/ceramide-barrier-repair` | A — Skincare | "Clean Girl Dew" |
| `/edits/study-aesthetic-sanctuary` | C — Decor | "Vanilla Warmth" |
| `/edits/autumn-capsule-wardrobe` | B — Fashion | "Downtown Indie" |

**Also worth doing at publish time (not the writer's job):** add a reciprocal link from the new article into the existing 10 wallpaper pages and 5 quote pages where the copy already gestures at skincare. The strategy §6 rule — "every article links sideways to 2–3 siblings contextually in the body, not just the related carousel" — cannot be satisfied yet because there are no siblings. That is fine; note it as a known gap and satisfy it on article two.

---

## 7. Meta elements

### Meta title

Driven automatically by `post.title` + `" | TeenTimeGlow"`. See §0.1.

> **`The Korean Glass Skin Routine for School Days | TeenTimeGlow`** — 60 characters

If the team wants headroom, set `post.title` to `Korean Glass Skin Routine for School Days` → `Korean Glass Skin Routine for School Days | TeenTimeGlow` = **56 characters**.

### Meta description

Driven automatically by `post.excerpt`. Also renders as the visible lede. See §0.2.

> **`Glass skin in four minutes before the bus. The seven-step Korean routine, cut down for school mornings — plus the two steps to skip until you're older.`**
> **151 characters** ✓

Why this works as both a snippet and a lede: it opens with a concrete, quantified claim (four minutes), names the format (seven steps), states the differentiator (school mornings), and ends on a curiosity hook (the two steps to skip). It contains the primary keyword's core terms without stuffing.

**Do not** repeat this sentence as the opening paragraph of `content_html`. The page will render it directly above the body — see §0.2.

### Excerpt / lede angle

The excerpt is the first prose the reader sees, immediately under the H1. It must function as a **scene-setter, not a summary** — the summary job is already done by the H1 and the description. Treat it as the article's first line.

- **Open on a specific, physical detail**, not on a generalisation. The strongest available image is the bathroom mirror at an unglamorous hour with a bus outside.
- **Do not** open with "In today's world" / "Skincare has become" / "We've all seen" — the strategy §5 template bans generic openers and this is the page where that ban matters most, because it is the site's first article.
- The excerpt above is deliberately written to be swappable with the opening line of the body if Rini prefers a different rhythm — but if she swaps it, she must change **both** places, or the sentence will appear twice.

### Cover image

> **`/assets/feature-skincare.jpg`**

- Already exists (57 KB — the lightest asset in the set, which matters for LCP).
- It is **already the image on the homepage floating card that links to this article** (`Hero.astro` line 93). Using it as the cover makes the card and its destination visually consistent — a small but real trust signal, and it avoids a mismatched thumbnail in the `/edits` grid.
- `alt` text must be descriptive and must **not** repeat the title. Suggested: `Skincare products arranged on a bathroom shelf in morning light`.

---

## 8. E-E-A-T and safety guardrails

This is health-adjacent content read by minors. The strategy doc's guardrail box (§4.2 Cluster A) is the reference; this section operationalises it.

### 8.1 Hard prohibitions — the article must NOT contain

| ✗ Must not claim | Why |
|---|---|
| "Dermatologist-approved", "dermatologist-tested", "dermatologist-reviewed", "clinically proven", "science-backed" | No dermatologist has reviewed this. There is no reviewer. Any of these phrases is a fabricated credential. |
| **"Dermatologist-informed"** | ⚠️ **This is currently live on the site.** `src/config/seo.ts` line 69, the `/edits/category/skincare` hub description, reads: *"Dermatologist-informed skincare routines for teens… **tested and explained step by step**."* Both halves are unsupportable. **Flagged to team-lead separately — fix before this article links to that hub**, or the new article will be linking to a page making a false testing claim. |
| Any efficacy statistic — "reduces breakouts by 40%", "97% saw smoother skin" | No source exists for any such figure. This is the most common failure mode on this SERP (kisskbeauty lists "reduced acne" as a routine benefit with no basis). |
| "I tested this for 30 days" / "after a month of using this" | Rini has not. A first-person testing claim that did not happen is the fastest route to an E-E-A-T collapse, and §4.3 of the strategy bans it explicitly. |
| Brand product recommendations, "the best", "you should buy" | The site has no testing capability and no stock. §4.3 forbids "best [product]" content outright. Ingredient-and-label criteria only. |
| Prescription-style language — "apply 0.05% tretinoin", "use a 10% AHA", dosages, treatment protocols | Reads as medical instruction. Out of scope for a curator. |
| "This will cure / clear / fix your acne" | A treatment claim. Not ours to make. |
| "Glass skin is achievable for everyone" | It is not, and saying so will be caught by exactly the readers who most need to trust us. |
| Any invented statistic, poll, percentage, or "studies show" | Non-negotiable. §10 of the strategy doc calls out fabricated numbers as an existing site problem that was already fixed once. Do not reintroduce it in prose. |

### 8.2 Required elements — and exactly where they go

**1. Honest author positioning — first 150 words**
Rini is named automatically by the template (`Person` entity, `AUTHOR` in `seo.ts`, byline on `/about`). But the *body* needs one first-person line establishing the curator stance **and** an explicit statement that she is not a dermatologist. Something functionally equivalent to: *"I'm Rini. I write about skincare as someone who reads the labels, not as someone qualified to treat skin — for anything beyond a basic routine, a doctor is the right person, not a blog."* One sentence, early, not defensive. It costs nothing and buys the whole article's credibility.

**2. "Last reviewed" date — in the body**
The `posts` table has no `last_reviewed` field; `updated_at` exists but is not surfaced as a review date. So the writer must put a visible line in `content_html`, near the top (under the lede) or at the very end. **Use 26 October 2026** — and only if it is true at publish. Do not backdate.

**3. Age framing — H2 #2 or the lede**
State the intended age range once, plainly (roughly 13–19), and note that younger skin needs even less. This is both a safety statement and a relevance signal.

**4. Patch-test instruction — H2 #4 or #6**
One sentence. New product → inner forearm or jawline → 24 hours. This is standard, cheap, and almost never included on the competitor pages.

**5. Fragrance warning — H2 #6**
Fragrance is the most common irritant for young skin and is the thing budget products most often contain. One line, in the "skip" section.

**6. "Don't borrow products" warning — H2 #6**
Specific to the audience: sharing actives with a friend is a real teenage behaviour and a real cause of irritation. Competitors never mention it.

**7. "If it stings, that is not it working" — H2 #4 or #6**
The single most useful sentence in the article for a reader who has been told that a burning sensation means "it's working". One line, stated flatly.

**8. "See a dermatologist if…" block — H2 #8, as its own H3**
Required by the strategy guardrail box. Must be **specific**, not boilerplate. Cover: painful or cystic acne; a sudden change in skin that does not settle; a reaction to a product that does not resolve in a few days; scarring; compulsive picking. Place it near the end so the warning reads as care rather than as a gate.

**9. Not-medical-advice disclaimer — end of article, styled block**
One short block at the very bottom: this is general information for teenagers about basic skincare, not medical advice, and a doctor or pharmacist is the right person for a skin concern. Plus one inline sentence in H2 #6 so a reader who stops at the safety section still sees it.

**10. No `MedicalWebPage` schema**
The strategy guardrail says add it *only* if a qualified reviewer is involved. None is. The template already emits `BlogPosting` — that is correct and sufficient. **Do not** add medical schema.

### 8.3 Tone guardrail specific to this audience

The reader is a minor and is likely already defensive about her skin. The safety material must not read as an adult telling her she is doing it wrong — that is the failure mode that loses the reader at the exact paragraph where the information matters most. The move is: **give her the routine first, then explain what to skip, framed as protection of something she has already started building.** Never "you shouldn't be using that". Always "hold that one until you're a bit older — here's why it matters."

---

## 9. Cannibalisation check

Per the strategy doc's anti-cannibalisation rules. Cluster A has seven planned articles; this one must not eat any of the other six.

| Planned Cluster A article | Overlap risk | Resolution |
|---|---|---|
| `korean skincare routine for beginners` — "The 5-Step Version" | **HIGH** — the closest neighbour in the cluster | **Differentiate by audience, not by step count.** This article is teen + school-schedule + the *full 7-step system split across AM/PM*. The beginner article should be product-selection-led ("what to buy first") and audience-neutral. **Do not** let this article include a "what to buy first" section — that is the beginner article's job. |
| `ceramide barrier repair` — "How to Repair Your Skin Barrier in 7 Days" | MEDIUM | This article mentions the barrier as *context* for why fewer actives. It must not include repair protocols, ingredient deep-dives, or a timeline for barrier recovery. One paragraph maximum, and no heading. |
| `skincare routine for oily skin teen` | **MEDIUM-HIGH** | H2 #7 here is scoped to *two swaps within the glass skin routine*. The oily-skin article owns full routines, sebum control, and product categories. Keep H2 #7 to ~240 words and keep it about adjustment, not about oily skin generally. |
| `drugstore skincare under $50` | LOW-MEDIUM | This article mentions budget as a *constraint* (criteria not brands). The drugstore article owns the actual list. Do not name a single product or price point here. |
| `how to layer skincare order` — "Explained Without the Jargon" | **HIGH** | Real risk: H2 #3 here is a layering-order explainer. **Resolution:** H2 #3 here answers only "what order do *these seven steps* go in" — it is a one-rule section plus a table, ~260 words, scoped to this routine. The standalone article owns the general theory, the exceptions, and the ingredient-conflict matrix. When that article publishes, H2 #3 should be trimmed and pointed at it. |
| `niacinamide vs vitamin c` | LOW | This article may name niacinamide and vitamin C as ingredient types in the table. It must not compare them or recommend one over the other. |

**Verdict: no blocking cannibalisation, but two sections (H2 #3 and H2 #7) are on a leash.** The writer should be told their word budget explicitly, because the natural instinct on both is to expand into a full article.

**Cross-cluster check:** nothing here overlaps Cluster B (fashion) or Cluster C (decor). The `study-aesthetic-sanctuary` and `autumn-capsule-wardrobe` slugs are unrelated. `/rankings` and `/quotes` pages are not competing for any of these queries.

---

## 10. Angle recommendation

The strategy doc's instinct — "survives a school schedule" — is a good starting point and I would keep it, but it is not yet an argument. As written, it is a **lifestyle hook**: it promises convenience. Convenience is a weak differentiator because every reader already assumes a skincare article will be convenient, and because "the busy-girl version" is the most saturated frame in the entire teen-lifestyle genre. It also quietly concedes the premise: that glass skin is worth the effort and the only problem is scheduling it.

**Pressure-test it against what the SERP actually leaves open.** The five pages that rank are not failing because they are too long or badly organised — skincarelab.uk is genuinely well-structured and clarah.co is thorough. They are failing because they are **shops**, and a shop cannot tell you to buy less. Every one of them recommends nine steps and a named product per step, none of them puts an age limit on actives, and none of them will ever write the sentence *"you do not need most of this yet."* That sentence is the article. It is also the one thing a curator's voice can say and a store's voice structurally cannot — which is precisely the positioning bet in §4.1 of the strategy doc, arriving at its clearest possible expression.

**So the angle I recommend is this:** *The Korean glass skin routine, honestly cut down for a teenager with a 7:15 bus and a barrier that is still developing — where the reason to do fewer steps is not that you are short on time, but that fewer steps is what actually works on your skin.*

That reframe does four things at once. It keeps the school-schedule hook, so the strategy doc's instinct survives. It converts the convenience promise into a **claim with a spine** — do less because less is correct, not because you are busy — which is far more quotable and far more shareable. It makes the safety material the *payoff* of the article rather than a disclaimer bolted onto it, which is the only way E-E-A-T content reads as generous instead of defensive. And it resolves the apparent contradiction between the quiz's promised "7-step routine" and a "fewer steps" thesis: **seven steps exist, you just never do more than four at once.** Morning is four, night is three, and the discipline of ending the routine is itself the technique.

The editorial voice that wins on this SERP is not warmer or prettier than the competitors — it is **more willing to talk the reader out of something.** Nobody else on page one will do that. That is the whole moat, and it costs nothing to build.

**One thing to get right in execution:** the honesty about filtered images in H2 #1 must not become a lecture. State it once, in one or two sentences, in a tone that assumes she already knows and just has not heard anyone say it. If it runs long or turns moralising, the reader closes the tab — and she is the reader who most needed the rest of the page.

---

## 11. Publish checklist (for whoever ships it, not the writer)

- [ ] `slug` is exactly `glass-skin-korean-routine` — confirm `/edits/glass-skin-korean-routine` returns 200
- [ ] `category` is `beauty` (the DB value; maps to the `skincare` hub via `categoryByDbValue`)
- [ ] `post.title` ≤ 45 characters
- [ ] `excerpt` is 150–160 characters and is **not** duplicated as the first body paragraph
- [ ] `content_html` uses real `<h2>` tags — the TOC depends on it
- [ ] `cover_image_url` = `/assets/feature-skincare.jpg`, `alt` does not repeat the title
- [ ] `read_time_minutes` reflects the actual word count (~2,100 words ≈ 9–10 min)
- [ ] `is_published` = true
- [ ] `updated_at` matches the "last reviewed" date stated in the body
- [ ] Hero floating card 1 and the quiz's "Sunset Muse" result both now resolve
- [ ] **Fix `src/config/seo.ts` line 69** — remove "Dermatologist-informed" and "tested and explained step by step" from the skincare hub description before linking to that hub
- [ ] Confirm the wallpaper slug for "Golden Hour Glow Horizon" from a build; do not ship a guessed URL
- [ ] Confirm `/quotes/small-daily-habits-create-massive-transformations` returns 200
- [ ] Request indexing in GSC for the new URL; it repairs two previously-broken internal links

---

## 12. Confidence summary

Being explicit about what is measured, what is estimated, and what is unverified — because the strategy doc's §10 is right that fabricated certainty is the failure mode to avoid.

| Claim | Basis | Confidence |
|---|---|---|
| Slug must be `glass-skin-korean-routine` | Read the source; two hardcoded links | **Certain** |
| Five internal links currently 404 | Read the source; `fallbackPosts = []` | **Certain** |
| `post.title` drives both H1 and `<title>`; no separate meta field | Read `[slug].astro` + `database.ts` | **Certain** |
| `post.excerpt` drives both meta description and visible lede | Read `[slug].astro` | **Certain** |
| TOC auto-generates from `<h2>`, id sliced at 60 chars | Read `buildTocAndContent()` | **Certain** |
| Top-5 SERP is five DTC K-beauty store blogs | Live search, 26 Oct 2026, one locale | **High** (snapshot) |
| Competitor word counts 530–1,300 | Estimate from extracted text | **Low** — planning only |
| Difficulty KD 10–20 | Inferred from observed SERP composition | **Medium** |
| Volume 1,000–3,000/mo | Inference from phrase usage in competitor titles | **Low — estimate, not scraped** |
| `glass skin routine for teens` is a weaker target than `korean glass skin routine` | Judgement from SERP composition | **Medium** — reversible, see §1 |
| CNN/AAD glass-skin-warning story exists | **Could not verify** — Chinese repost only | **Unverified — do not cite** |
| CeraVe / Dr Latanya Benjamin guidance | Fetched live 26 Oct 2026 | **High** (but brand-partner source) |
| AAD preteen/teen page URL | **404 on the URL I tried** | **Unverified — do not link** |
