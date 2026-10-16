# The Anti-AI-Slop Frontend Playbook
### A research-backed investigation into how elite builders get dramatically better frontend design from AI coding tools

**Compiled:** 2026-10-05 · **Method:** Multi-platform evidence sweep (Hacker News via Algolia API, GitHub via API, vendor engineering blogs, leaked production system prompts, practitioner blogs, Reddit thread indexes, Exa web search). Every load-bearing claim carries a URL and an evidence label.

**Evidence labels used throughout:**
- **[VERIFIED-PRIMARY]** — the source was fetched directly and says what's claimed (official docs, repos, measured studies, a person's own blog about their own workflow)
- **[VERIFIED-SECONDARY]** — clearly attributed secondhand reporting
- **[EXPERT-OPINION]** — an individual's or vendor's claim, plausible but not independently verified; vendor opinions about their own product are flagged for bias
- **[LEAKED-UNOFFICIAL]** — extracted from published system-prompt dumps; contents match observed tool behavior but are not officially documented
- **[RECONSTRUCTION]** — assembled by this report from evidence; not an original published artifact
- **[SYNTHESIS]** — this report's own reasoning, built on the cited evidence

---

## Executive summary

The gap between "average AI frontend" and "elite AI-assisted frontend" is not the model. The same models produce both. The difference is that skilled builders **move every design decision out of the model's hands and into explicit artifacts** — direction briefs, token files, banned-pattern lists, reference DNA, screenshot-driven critique loops — and then run a disciplined iteration cycle where the human is the art director and the model is the implementation engine. Three 2026 studies quantified the problem (22% of a 1,590-page Show HN crawl triggered 4+ AI-design patterns; seven professional themes scored a uniform ~6.5/10 under an independent critic), and the highest-leverage fixes that emerged are mechanical: ship real font files, write a banned list not a style guide, keep one committed accent, vary density and radius, and check the artifact (rendered pixels), never the prompt.

---

# PART 1 — Understanding AI slop: the patterns and why models reproduce them

## 1.1 The measured baseline

The best quantitative picture comes from an independent measurement, not a vendor:

- Adrian Krebs scored **1,590 Show HN landing pages** with a deterministic Playwright + DOM/computed-style checker (no LLM judgment) against 16 documented AI-design patterns. Result: **22% of pages (347) triggered 4+ patterns ("high"), 32% (508) medium (2–3), 46% (735) low**. He also documented that Show HN volume grew so fast due to Claude Code that HN moderators restricted Show HN submissions for new accounts. [VERIFIED-PRIMARY — adriankrebs.ch/blog/design-slop/, Apr 20 2026; scorer at github.com/AdrianKrebs/design-slop-cop, live scanner at slopcop.adriankrebs.ch]
- Tailthemes ran an external design critic over **seven of its own shipped themes** with the single instruction "find everything, fix nothing." Six scored **6.5/10**, one 6.0 — an unusually uniform score across independent passes. Their five measured failure fingerprints are in §1.3. [VERIFIED-PRIMARY — tailthemes.com/blog/ai-design-slop-quality-gate, Aug 20 2026, scoresheet dated 2026-08-13]
- Sailop (a vendor selling anti-slop tooling — treat with bias) claims **Inter/system-ui appears in ~73% of AI-generated frontends** and that blue-purple gradient prevalence in indexed marketing sites rose from ~10% (2020) to ~78% (2026). These two numbers are widely repeated but the crawl methodology is unpublished. [EXPERT-OPINION — sailop.com/blog/why-every-ai-generated-website-looks-the-same]

## 1.2 The tell catalog (consolidated from the strongest sources)

Cross-referencing the Krebs designer panel, the "Signs of AI design" field guide (github.com/febbhav/signs-of-ai-design, created 2026-07-22, modeled on Wikipedia's "Signs of AI writing"), Anthropic's own calibration list inside the official `frontend-design` skill, and the Sailop/Tailthemes write-ups:

**Typography**
- Inter (or `system-ui`) for everything — the tell is Inter *unchosen*, next to twenty other unchosen defaults
- Escape-hatch fonts that became tells of their own: **Space Grotesk** (the "escaping Inter" reflex), **Geist** (v0's default because it's Vercel's typeface), **Instrument Serif** italic for one accent word in an otherwise-Inter hero
- Serif-italic hero accent; ALL-CAPS tracked-out eyebrow labels above every heading; single word of a headline italicized/colored

**Color**
- "VibeCode Purple": indigo-500/violet-500/purple-500 gradients on white (Tailwind's 2019 demo accent, saturated through thousands of tutorials)
- **Second-wave defaults after purple became a joke**: warm cream (~#F4F1EA) + high-contrast serif + terracotta (~#D97757 — noted by Anthropic as *its own* accent, so it reads as a Claude tell), emerald-500 fallback when purple is banned, near-black + single acid-green/vermilion accent
- Gradient text (`bg-clip-text`) on headings and metric numbers; large colored glows and box-shadows; timid evenly-weighted palettes with no committed accent; barely-passing body contrast in dark themes

**Layout**
- The default hero: centered eyebrow pill → oversized centered Inter headline → gradient-primary "Get Started" + ghost secondary → gradient orb / dot-grid → 100vh
- Identical 3-column feature cards, icon (Lucide Zap/Shield/Rocket) on top; numbered 1-2-3 steps on non-sequential content; stat banner rows; the fixed template waterfall (hero → logo wall → 3 cards → testimonials → stats → pricing → FAQ → footer CTA)
- Colored left/top border strips on ordinary cards; emoji icons in navs/sidebars; permacular dark mode with medium-grey body text

**Components/CSS**
- One `rounded-2xl` radius on everything regardless of hierarchy; `shadow-md` on all cards; hairline border + wide diffuse shadow on the same element; `backdrop-blur` glassmorphism where no layering problem exists; fake macOS terminal windows as hero art; untouched shadcn/ui default theme

**Copy**
- Weightless headlines that fit any product ("Build faster. Ship smarter."); buzzword layer (streamline, supercharge, seamless, unlock, enterprise-grade); fabricated trust content ("Trusted by 5,000+ teams", logo walls, testimonials from people who don't exist)

Two sources add an important nuance: **the life cycle of a tell**. Anthropic's skill explicitly tells the model that the 2026 "anti-slop" looks (cream+serif+terracotta, broadsheet hairline rules, dark+acid-green) are *themselves* now defaults. The signs-of-ai-design repo marks purple gradients "active but migrating" — models absorbed the anti-purple backlash and learned cream signals "tasteful startup." Any static ban list decays; that's why the strongest artifacts in this space are versioned repos, not blog posts. [VERIFIED-PRIMARY — both]

## 1.3 The Tailthemes five fingerprints (measured, artifact-level)

Each of these was *measured*, not eyeballed, across seven shipped products — these are the checks this report recommends adopting:

1. **The typeface is not in the build.** Six of seven themes shipped zero font files; five declared the OS stack outright; one declared Inter and had no fonts directory. "Declaring is not shipping."
2. **The design idea never made it into a token.** A theme's stylesheet *comment* said cards sit on an off-white ground; the measured difference was 0.027 L — "the comment survives review because it sounds right. The design it describes was never built."
3. **One hue pretending to be two.** An accent within 5.4° hue rotation of the primary; two supposedly different products within 4.1° of each other. Rule of thumb: under ~20° apart in OKLCH/HSL, you have one color.
4. **No state ramp.** Hover/press/disabled colors invented per component (four alpha-based greys) instead of derived from a ramp — and the *agent contract file endorsed them*, propagating the error to every future edit. "A wrong rule in the contract is more expensive than a wrong pixel."
5. **Everything is one density.** Density register 1.33:1 against a floor of 1.75; zero oversized moments across four pages. "Nothing is loud, so nothing is quiet, so nothing is composed." [VERIFIED-PRIMARY]

## 1.4 Why LLMs converge — the mechanisms, ranked by quality of evidence

1. **Training-distribution dominance.** The generators share one toolchain — Tailwind CSS, shadcn/ui, Lucide icons, Framer Motion, Next.js — and the defaults of that toolchain, "replicated across millions of tutorial pages in training data, became the AI look" (signs-of-ai-design). Anthropic's own post: ask an LLM to build a landing page and "it will almost always conform to Inter fonts, purple gradients on white backgrounds, and minimal animations." [VERIFIED-PRIMARY ×2]
2. **Mode collapse / sampling the median.** Models sample the high-probability region of training data; safe patterns are the most frequent ones. Signs-of-ai-design's formulation is the sharpest: "AI output is the statistical median of its training data. The tell is not that Inter is a bad typeface. The tell is Inter, unchosen, next to twenty other unchosen defaults." Sailop adds four forces: safety bias (defaults that can't look broken beat choices that could look wrong), training distribution, no aesthetic memory, prompt underspecification. [VERIFIED-PRIMARY (signs-of-ai-design) + EXPERT-OPINION (Sailop)]
3. **The feedback loop.** AI-generated Tailwind defaults ship, enter new training corpora, and tighten the bias with every release. [EXPERT-OPINION — Sailop; mechanism is plausible and consistent with known data-flywheel practices, but not publicly measured]
4. **Prompt underspecification.** Every source agrees: "users ask for 'a landing page' and specify zero visual constraints" (Sailop); "an agent with no design language invents a new one, badly, on every run" (Tailthemes). Anthropic frames the fix as steerability: "Tell Claude to 'avoid Inter and Roboto' or 'use atmospheric backgrounds instead of solid colors,' and results improve immediately." [VERIFIED-PRIMARY ×2 + EXPERT-OPINION]
5. **No aesthetic memory across runs.** Each generation starts from zero with no project style guide to anchor it — which is why project-level token files and rules files (Part 7) are the highest-leverage fix. [VERIFIED-SECONDARY — consistent across Sailop, Tailthemes, and the Lovable system prompt's own "Start with the design system. This is CRITICAL" instruction]
6. **Architectural defaults of the tools themselves.** claude.ai artifacts were single-HTML-file builds, which capped frontend sophistication; Anthropic built the web-artifacts-builder skill specifically because "we hypothesized that Claude would be able to generate more impressive frontend artifacts if we gave it instructions to use richer tooling." [VERIFIED-PRIMARY — claude.com/blog/improving-frontend-design-through-skills, Nov 12 2025]

## 1.5 Technically-correct UI vs. art-directed design

The Tailthemes study is the clearest articulation of the difference: their themes had "correct spacing, plausible hierarchy, nothing broken — and nothing you would recognise tomorrow." The gap between *correct* and *designed* is a failure of **constraint**, not taste: "An agent with no design language invents a new one, badly, on every run." The fix they derived is deliberately boring and mechanical: tokens not markup; a banned list beats a style guide; every claim in a comment must be funded by a number; the contract file is code; check at the artifact, not the prompt. [VERIFIED-PRIMARY]

Anthropic's skill expresses the same idea as design doctrine: "Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined" — and its interpretation rule: judge **the absence of decisions**, not the presence of a style. A rounded card is not slop; twenty unchosen defaults at once is. [VERIFIED-PRIMARY]

**Conflict note:** Krebs pushes back on moralizing — "Is this bad? Not really, just uninspired… before the AI era, everything looked like Bootstrap" — and HN commenters on the Hallmark launch noted that even anti-slop skills' own example galleries look AI-generated to many eyes ("The only ones… that don't feel like slop… The rest are all practically identical"). Meanwhile other practitioners on the same thread reported that skills like impeccable/ui-ux-pro-max "all seem to converge on the same thing… the design itself is the same unless you are extremely explicit." Net: anti-slop tooling helps with floor-raising (consistency, accessibility, mechanics) but does not substitute for explicit direction. [VERIFIED-PRIMARY — HN item 49058547 discussion]

---

# PART 2 — Real-world investigation map: who actually does what

**Practitioner workflows with verifiable artifacts:**

- **Raduan (0xRaduan, founder of Summate)** published a full Claude Code landing-page build (raduan.xyz/blog/claude-code-for-landing, ~Jul 2025): inspiration FigJam board → a Claude Web session generates a **300+ line design-system README.md** → section-by-section structure hammered out in a "meta prompt optimizer" Claude project → build each section with **pasted reference screenshots + the design README + his component library** → micro-interaction polish pass. His actual prompt template is reproduced in Part 3. ~1 focused week total. [VERIFIED-PRIMARY]
- **Peter Steinberger (steipete.me)**, on UI iteration (Dec 2025): "my prompts gotten much shorter… many times I add images, especially when iterating on UI… If you show the model what's wrong, just a few words are enough… I'm that person that drags in a clipped image of some UI component with 'fix padding' or 'redesign'." Also notable: "I basically never revert or use checkpointing. If something isn't how I like it, I ask the model to change it." [VERIFIED-PRIMARY — steipete.me/posts/2025/shipping-at-inference-speed]
- **Together AI (Nutlope) shipped Hallmark** (github.com/Nutlope/hallmark, HN Jul 26 2026): a cross-tool design skill with four verbs — build, **audit** (score existing code against anti-patterns), **redesign** (keep copy/IA/brand, rebuild with a different "fingerprint"), **study** (extract design DNA from a screenshot/URL and emit a portable `design.md`). It runs **57 slop-test gates** plus a pre-emit self-critique, and keeps a log of past builds (`.hallmark/log.json`) that **hard-fails a run repeating recent structures/themes** — because its own nav-rotation rule is "the single most-violated rule in practice." [VERIFIED-PRIMARY]
- **Tailthemes publishes its own rejects**: seven themes, named, with critic scores, corpus in-repo, and per-theme "agent kits" (AGENTS.md invariants + four executable skills: rebrand, add-section, add-page, check-quality). [VERIFIED-PRIMARY]
- **Adrian Krebs open-sourced the slop scorer** (design-slop-cop) so anyone can score their own site. [VERIFIED-PRIMARY]
- **Dahhrk/flashpeek** committed a CI lint gate (`scripts/check-anti-ai-ui.mjs`) that fails the build on Inter, six purple hex codes, neon-mint-on-dark ("nightglass"), and "Get Started"/"Learn More" copy — an example of slop rules enforced mechanically, not by prompting. [VERIFIED-PRIMARY — read the script]
- **Reddit practitioner consensus** (threads surfaced via search; Reddit blocks direct anonymous reads, so comment-level quotes are not reproduced): the recurring advice across r/ClaudeCode, r/vibecoding, r/ProductManagement threads ("Every claude vibecoded app looks the same", "How are you guys avoiding that generic AI look in your UI?", "All vibecoded apps look the same") is: provide a design system/style guide upfront with specific fonts/colors/spacing, **name a different icon library**, share screenshots/reference designs, and iterate rather than accepting the first output. One practitioner workflow (HN, Hallmark thread) advocates paper → Figma/Penpot → multimodal LLM as the only reliably non-sloppy path they found. [VERIFIED-SECONDARY]
- **SlimSnap (bickov, Aug 2026)** documented the mechanics of the screenshot review loop for Claude Code, including the failure mode where "a review pass that 'looks fine' ships with values drifted off the system" because model-side image downscaling destroys exact values. [VERIFIED-PRIMARY for the documented behavior of image caps; vendor blog]

**Community disagreement worth tracking:** the r/vibecoding thread "I've cleaned up a dozen vibe-coded apps this year. The same 7 problems show up every time" frames slop as mostly *process* failure (no design direction, UI-only thinking), while the Krebs and Tailthemes data frames it as *statistical* failure (defaults win when nothing else is specified). Both are right, and they imply different fixes: process failure needs a workflow (Part 10); statistical failure needs constraints and gates (Parts 3, 7).

---

# PART 3 — The prompt-engineering deep dive

## 3.0 The single most important verified finding

Anthropic's engineering post (Nov 12 2025) confirms model-level steerability *and* its limit: targeted guidance works immediately, but "the more specialized the task, the more context you need to provide," and stuffing all of it into every prompt degrades performance. Their solution shape — a ~400-token design skill loaded on demand — is the strongest evidence that **structured, durable design context beats one-off verbose prompts**. They also formalize the altitude rule from their context-engineering post: avoid "low-altitude hardcoded logic like specifying exact hex codes and vague high-altitude guidance that assumes shared context." [VERIFIED-PRIMARY]

## 3.1 The verified artifacts (copy these, don't paraphrase them)

### A. Anthropic's `<frontend_aesthetics>` skill — verbatim, from claude.com/blog/improving-frontend-design-through-skills

```
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this
creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive
frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts
  like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant
  colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes
  and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for
  HTML. Use Motion library for React when available. Focus on high-impact moments: one
  well-orchestrated page load with staggered reveals (animation-delay) creates more delight
  than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS
  gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
Vary between light and dark themes, different fonts, different aesthetics. You still tend to
converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is
critical that you think outside the box!
</frontend_aesthetics>
```

Why it works (their own analysis): it names the failure ("on distribution"), gives four concrete axes (typography/color/motion/backgrounds), specifies *what kind* of choice (committed dominant color, one orchestrated page-load moment, layered atmosphere), bans the known tells, and ends with an anti-convergence reminder because "even with explicit instructions to avoid certain patterns, the model can default to other common choices (like Space Grotesk)." Before/after examples in the post show the same prompts producing distinctive typography, cohesive color, and layered backgrounds with the skill active. [VERIFIED-PRIMARY]

### B. Anthropic's official `frontend-design` skill (github.com/anthropics/skills) — the role prompt + two-pass process

Opening line, verbatim: *"Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified."*

Its process (this is the verified vendor-endorsed loop):

1. **Ground in subject matter** — "The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from."
2. **Plan pass**: compact token system (4–6 named hex values), typefaces + roles, a layout concept **with ASCII wireframes to ideate and compare**, alignment guidance, and "principles: the high-level guidance for what makes this page unique."
3. **Review the plan against the brief before building**: "if any part of it reads like the generic default you would produce for any similar page… revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code."
4. **Build**, watching CSS selector specificity (a real failure mode it calls out).
5. **Restraint + self-critique**: "Critique your own work as you build, taking screenshots to review if your environment supports it — a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory."

Also verified in this skill: the current 5-cluster calibration list (cream+terracotta; dark+acid accent; broadsheet; SaaS-card kit; template chrome incl. middle-dot meta strings and '→' appended to buttons) and concrete typographic bans (single-word accent italics, all-caps labels, decorative eyebrows, numbered markers on non-sequences). [VERIFIED-PRIMARY]

### C. The web-artifacts-builder skill — the famous line

From the same official repo: "VERY IMPORTANT: To avoid what is often referred to as 'AI slop', avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font." [VERIFIED-PRIMARY]

### D. Leaked v0 system prompt — vendor-hardened anti-slop rules [LEAKED-UNOFFICIAL — github.com/x1xhlol/system-prompts-and-models-of-ai-tools, "v0 Prompts and Tools/Prompt.txt"]

```
# Design Guidelines
## Color System
ALWAYS use exactly 3-5 colors total.
- Choose 1 primary brand color, appropriate for the requested design
- Add 2-3 neutrals (white, grays, off-whites, black variants) and 1-2 accents
- NEVER exceed 5 total colors without explicit user permission
- NEVER use purple or violet prominently, unless explicitly asked for

## Gradient Rules
- Avoid gradients entirely unless explicitly asked for. Use solid colors.
- If gradients are necessary: use them only as subtle accents, never for primary elements;
  use analogous colors (blue→teal, purple→pink, orange→red); NEVER mix opposing temperatures;
  maximum 2-3 color stops

## Typography
ALWAYS limit to maximum 2 font families total.
- One font for headings (multiple weights) and one for body
- Line-height 1.4-1.6 for body text; NEVER decorative fonts for body or <14px body text

## Layout Structure
ALWAYS design mobile-first, then enhance for larger screens.
```

Significance: v0's own production prompt treats purple as a banned default and gradients as opt-in — direct confirmation that the biggest generators are fighting the same convergence in their system prompts.

### E. Leaked Lovable system prompt — design-system-first as policy [LEAKED-UNOFFICIAL — same repo, "Lovable/Agent Prompt.txt"]

Verbatim keys: *"Start with the design system. This is CRITICAL. All styles must be defined in the design system. You should NEVER write ad hoc styles in components."* · *"USE SEMANTIC TOKENS FOR COLORS, GRADIENTS, FONTS, ETC."* · *"Never use explicit classes like text-white, bg-white in the className prop"* · *"Given the user request, write what it evokes and what existing beautiful designs you can draw inspiration from"* · *"If the user asks for a very specific design, you MUST follow it to the letter."* (Also documented: an older version of the prompt *encouraged* 135° primary gradients — evidence that the generators themselves helped create the gradient era, and that leaked prompt versions matter.)

### F. Community rules file — "AI design rules (anti-slop)" from signs-of-ai-design

Written to be dropped in as `CLAUDE.md` / `.cursorrules` / `AGENTS.md`. Core principle, verbatim: *"You default to the statistical median of your training data whenever a design choice is left unspecified… assume your first instinct for color, type, and layout is that median, and make one deliberate departure from it."* Structure: Color / Typography / Layout and hero / Components and surfaces / Icons and imagery / Motion / Copy, each item phrased as "do not default to X unless the brand calls for it" — a **bias corrector, not a ban list**. Closing line: *"Ship a design where the important decisions were made on purpose, and it will not read as generated even if it happens to use a rounded card or a sans-serif font."* [VERIFIED-PRIMARY]

## 3.2 Ten prompt structures that work — each with its evidence

1. **Role + stakes + client-framing.** Anthropic's "design lead… client has already rejected cliché proposals" framing. Role alone ("act as a senior designer") has no published evidence of improving output; the *stakes framing* plus constraints is what the verified artifacts do. Use Anthropic's verbatim framing. [VERIFIED-PRIMARY]
2. **Design brief → token plan → self-review → build** (two-pass). Anthropic skill's plan/review/build/critique loop. The critical, unusual step: *review the plan for genericness before writing code*, forcing the model to simulate "what would I produce for any similar brief" and diverge. [VERIFIED-PRIMARY]
3. **Durable design context as a file, not a prompt** (skill/CLAUDE.md/AGENTS.md). Anthropic's ~400-token skill; Tailthemes' per-theme AGENTS.md; Raduan's 300-line README.md. Raduan on why: "if you don't have style guidelines, claude code can easily go astray (and it did multiple times for me, even with the guidelines)." [VERIFIED-PRIMARY ×3]
4. **Explicit token contracts in code.** Lovable's semantic-tokens-only rule; Tailthemes' "one `@theme` file owns the whole design surface, and a colour or a size inside a component means the system does not exist yet." [VERIFIED-PRIMARY ×2]
5. **Reference-first prompting with pasted images.** Raduan's per-section prompt (below); steipete's clipped-image feedback. [VERIFIED-PRIMARY ×2]
6. **Named aesthetic vocabularies.** Anthropic: "Claude has a rich understanding of popular themes" — referencing *well-known aesthetics* (IDE themes, cultural aesthetics, named movements) reliably steers style. (See Part 12.G for the "steal principles not pixels" version.) [VERIFIED-PRIMARY]
7. **Negative constraints, versioned.** Every verified artifact contains bans (Inter/purple/gradient-everything/uniform radius/eyebrow pills), and the v0 prompt shows bans encoded at production scale. Caveat from the data: bans migrate (purple → cream → emerald), so pair bans with a positive direction and re-derive them from the current tells list. [VERIFIED-PRIMARY + SYNTHESIS]
8. **Critique prompts that separate finding from fixing.** Tailthemes' critic instruction — "find everything, fix nothing" — produced uniform, high-recall passes; their rule: "Check at the artifact, not the prompt. Render it, measure the contrast, open the zip, look for the font." [VERIFIED-PRIMARY]
9. **Structured acceptance criteria with executable gates.** flashpeek's lint gate; Tailthemes' check-quality skill; Hallmark's 57 gates; the Krebs scorer. Prompt-level criteria degrade over a long session; CI-level criteria don't. [VERIFIED-PRIMARY ×4]
10. **"Right altitude" instructions.** Anthropic's context-engineering-derived rule: don't hardcode hex codes, don't say "make it nice" — describe outcomes and constraints at the level a senior engineer would accept ("committed dominant color with sharp accents," "one orchestrated page-load moment"). [VERIFIED-PRIMARY]

## 3.3 Raduan's actual per-section build prompt (verbatim template) [VERIFIED-PRIMARY]

```
Hey, I am building section {section name}, for my new landing page...
For your context, we are following design guidelines from @/v2/landing/README.md ...
Now, it's time to build!

Here are some design inspirations of the format that I currently like:
[[Pasted Image 1]], [[Pasted Image 2]], ...

I want you to build it with ... and ... components from my existing component library.
```

Reported result: "on average after 3-5 messages max, I would have a landing section, that was already 80 to 90% there." Note the three anchors in one prompt: durable guidelines (file), visual reference (images), implementation surface (existing components) — the model never has to invent style, composition, or structure.

## 3.4 Weak vs. strong formulations (SYNTHESIS, grounded in the verified rules)

| Weak (all sources agree this fails) | Strong (composed from verified rules) |
|---|---|
| "Make it modern and professional" | "Commit to one dominant accent + 2 neutrals; no gradients unless they carry meaning; one orchestrated page-load animation; layered atmospheric background" |
| "Don't make it look AI-generated" | "No Inter/Space Grotesk/Instrument Serif reflexes, no centered eyebrow-pill hero, no 3 identical icon cards, no rounded-2xl-everything, no glassmorphism; ship real font files; vary radius by element class" |
| "Use good typography" | "Two families max: one expressive display for headlines, one quiet workhorse for body; type scale on 1.25 ratio; body line-height 1.5–1.6; ≤80ch measure; the display face appears at ≥2 sizes larger than anything else on the page" |
| "Avoid generic cards" | "Let content decide card count and shape: one bento cell spans 2 columns, one feature is a full-bleed band, the third is a plain list row — three identical top-icon cards is a banned layout" |

The difference: weak prompts assign taste to the model (it will sample the median); strong prompts assign *decisions* to you and *execution* to the model.

---

# PART 4 — Design reference engineering

## 4.1 Verified reference workflows

1. **The inspiration board → design-system document (Raduan).** Collect section-level inspiration (his sources: saaslandingpage.com, saasframe.io, 21st.dev, mobbin.com, purchased templates) into a FigJam board; feed the *whole board* to Claude Web to write a 300+ line style guide (fonts, palette, styles); then use per-section reference images at build time. Key mechanic: the reference set passes through a **distillation step** (board → README.md) before it ever reaches the coding agent, so the agent consumes decisions, not pixels. [VERIFIED-PRIMARY]
2. **DNA extraction instead of cloning (Hallmark `study`).** Given a screenshot or URL, the skill extracts "the **DNA** from a design you admire: macrostructure, type-pairing, colour anchor," and **"Refuses pixel-clones and paid templates,"** optionally emitting a portable `design.md` for handoff to other tools. This is the first widely-distributed tool to operationalize "steal principles, not pixels." [VERIFIED-PRIMARY]
3. **Crop-to-component review references (SlimSnap).** When references or feedback screenshots go to the model, "a full design frame pasted whole arrives with the 4px difference in question compressed below one pixel" (models downscale images to a ~2576px long-edge cap). Rules: crop to the component; draw a box/numbered marker on the element; keep words in the prompt, not as small text on the image; one question per screenshot; send exact values (8px, #4A4A4E) *as text/data alongside* the image, never expect the model to read them off pixels. [VERIFIED-PRIMARY — documented model image-cap behavior; vendor implementation]
4. **Mixed-industry reference hacking.** Practitioners report feeding references from unrelated categories to escape category templates (HN Hallmark thread: screenshots of existing sites as samples; Anthropic's skill: "IDE themes and cultural aesthetics" as inspiration classes; Krebs's designer panel notes the cream/serif "tasteful startup" reflex is itself a copied template). [VERIFIED-SECONDARY + VERIFIED-PRIMARY]

## 4.2 Using a reference without copying it — the decomposition contract [SYNTHESIS, built on verified mechanisms above]

Give each reference exactly one job, and force the model to name the extraction before it writes code:

```
REFERENCE A (structure):  copy the macrostructure only — section order, grid skeleton, density
REFERENCE B (type):       adopt the typographic personality — scale ratio, weight contrast, case rules
REFERENCE C (color):      adopt the palette *strategy* (one dominant + one accent + neutrals),
                          NOT the hues — hues come from the brand
REFERENCE D (motion):     adopt interaction timing/easing philosophy only
BRAND:                    hues, imagery, voice, and every "flavor" decision come from here
RULE:                     name, for each reference, what was extracted and what was deliberately
                          NOT copied. If the output would pass as the reference, extraction failed.
```

This is Hallmark's `study` verb generalized: macrostructure / type-pairing / colour anchor is the extraction triple; the contract adds the anti-cloning test. The "would pass as the reference" test is the operational meaning of "steal principles, not pixels."

## 4.3 Screenshot → design specification (a practical workflow) [SYNTHESIS from verified pieces]

1. **Capture full page** for structure; **crop components** for detail (SlimSnap resize mechanics).
2. **Extract the spec in three passes**, asking the model to output only: (a) layout rules — section inventory, grid, alignment, density variance; (b) type system — families (or nearest Google-Fonts equivalents), scale, weights, case; (c) color tokens — as hex/OKLCH *read from the DOM if you can* (computed styles, as the Krebs scorer does — not from pixels).
3. **Write the spec as a token file + banned list**, not prose (Part 7 structure).
4. **Generate with the spec + real content**, then **compare crops side-by-side per component** — never full-page-vs-full-page.
5. **Log what was extracted vs. invented.** Raduan's README and Hallmark's design.md both serve this; unlogged extraction drifts back toward defaults over a long session.

**What not to do (verified failure modes):** pasting a whole page screenshot and asking "make mine like this" (pixel-clone + resize blindness); using a reference that is itself AI-styled (you inherit its tells); using screenshots as the only channel for exact values (they can't carry them).

---

# PART 5 — The tool ecosystem: stage fit, verified strengths

**Ideation & brief development**
- **Claude Web projects as "meta-prompt optimizer"** — Raduan's verified workflow: a dedicated Claude project interviews you and returns an optimized system prompt; he then iterates section structure ("3-4 ideas per section") for 30–45 minutes before any code. [VERIFIED-PRIMARY]
- **Inspiration galleries**: saaslandingpage.com, saasframe.io, mobbin.com, 21st.dev (which added an inspiration tab), landingpagesexplained.com. [VERIFIED-PRIMARY — cited by Raduan]
- **Magic Patterns** — "Build your own theme park" (Show HN Aug 2026) positions it as generative UI exploration. [VERIFIED-SECONDARY — Show HN item 49452037]

**Design exploration / concepting**
- **v0**: "Component generation is excellent… Design quality is high… Iteration is fast… select any element and say 'make this button larger.'" Consensus across comparisons: best for components/prototypes, no backend. [EXPERT-OPINION — designrevision.com comparison, a Forge vendor (bias noted) but consistent with the leaked v0 prompt's sophistication]
- **Google Stitch** — see Part 12 (dedicated deep dive).
- **Lovable**: "focuses on design quality" with its design-system-first internal policy (leak, §3.2E). Bolt: fastest full-stack prototyping. Replit Agent: in-IDE full-stack loop. [EXPERT-OPINION — same comparison set]

**Implementation (agentic coding)**
- **Claude Code / Cursor / Codex CLI** are the implementation engines in every verified practitioner workflow above. Steinberger's December-2025 stack notes: prompts getting shorter, images doing the pointing, docs files over chat references, "I engineer [codebases] so agents can work in it efficiently." [VERIFIED-PRIMARY]
- **Hallmark** installs across Claude Code (`~/.claude/skills/`), Cursor (`.cursor/rules/hallmark.mdc`), Codex (`~/.codex/skills/`) — the same anti-slop rule-set ported per tool. [VERIFIED-PRIMARY]
- **Anthropic's web-artifacts-builder** (React+Tailwind+shadcn scaffold → bundled single HTML) exists because richer tooling measurably improved artifact quality vs. single-file generation. [VERIFIED-PRIMARY]

**Visual debugging & QA**
- **Playwright MCP** (microsoft/playwright-mcp, 37.8k★): browser automation via **accessibility-tree snapshots** ("no vision models needed"), with an opt-in `vision` capability for coordinate/screenshot work, `--snapshot-boxes` for bounding boxes, and devtools features. Note the project's own 2025+ guidance: for coding agents, **CLI-based Playwright skills are now preferred over MCP** for token efficiency, with MCP reserved for long-running agentic loops. [VERIFIED-PRIMARY — README]
- **SlimSnap-style annotated captures**: crop + marker + data-alongside-image (see Part 4.1.3). [VERIFIED-PRIMARY mechanics]
- **Slopcop** (score any URL against the 16 patterns) and **Vibecheck** ("AI Web Design Slop Fingerprinter", Show HN Apr 2026) — independent slop scanners. [VERIFIED-SECONDARY]
- **Anthropic is building designer-facing surfaces**: "Claude Design and the artboard preview inside Claude Code" reported by SlimSnap (Aug–Sep 2026). [VERIFIED-SECONDARY]

**Design consistency & systems**
- **Token ownership**: Tailthemes `@theme` files + per-theme agent kits; Lovable semantic tokens in index.css/tailwind.config. [VERIFIED-PRIMARY]
- **skills/agents files as the consistency channel**: AGENTS.md is used by 60k+ open-source projects and supports nesting ("the closest one takes precedence"; OpenAI's repo had 88 at time of writing). [VERIFIED-PRIMARY — agents.md]
- **CI gates**: flashpeek lint; design-slop-cop; Tailthemes check-quality. [VERIFIED-PRIMARY ×3]

**Framer Motion / GSAP**: appear as the standard motion layers (Anthropic's skill says "Use Motion library for React"; ui-ux-pro-max ships 17 GSAP presets). No verified evidence that one beats the other for AI agents; Motion is what the v0/shadcn ecosystem defaults to. [VERIFIED-SECONDARY]

**Stage × tool matrix** [SYNTHESIS from the above]:

| Stage | Best-evidenced tools |
|---|---|
| Ideation/brief | Claude Web project (meta-prompt), inspiration galleries, FigJam board |
| Design exploration | v0 (components), Stitch (Part 12), Magic Patterns, Lovable (design-first apps) |
| Implementation | Claude Code / Cursor / Codex + Hallmark or equivalent rules file + real font files |
| Visual debugging | Playwright (MCP or CLI) + cropped annotated screenshots + Slopcop/Vibecheck |
| Consistency | tokens file + AGENTS.md/CLAUDE.md + CI lint gates + design.md handoffs |

**Model-agnostic techniques** (work regardless of vendor/model): design tokens; banned lists with re-derivation; reference DNA extraction; screenshot-crop critique with values-as-data; design-system files; artifact-level lint gates; the two-pass plan/review process. [SYNTHESIS — each element verified individually above]

---

# PART 6 — The iterative design loop, as actually practiced

## 6.1 Three verified loops

**Loop 1 — Raduan's section loop (building).** Structure decided in Claude Web first (copy + story per section) → per-section build prompt (guidelines file + reference images + component library, §3.3) → 3–5 messages to 80–90% → polish pass for micro-interactions ("hover animations for svgs… I mostly was just giving it ideas / discussing it with it, and then letting it implement them") → explicit pride gate ("Build it in a way that makes you proud to sign it" — quoting DHH). [VERIFIED-PRIMARY]

**Loop 2 — Steinberger's point-and-shout loop (fixing).** Drag a clipped screenshot of the broken component into the agent with 2–5 words ("fix padding", "redesign"). No long prose. "If you show the model what's wrong, just a few words are enough." He explicitly does not use checkpoints/reverts — corrections are conversational, direction-changes incremental ("Building software is like walking up a mountain… you circle around it"). [VERIFIED-PRIMARY]

**Loop 3 — Tailthemes' critic loop (gating).** Independent critic passes with "find everything, fix nothing" → findings ranked by how many passes raised them → fixes applied in a separate step → re-passed. Their measured lesson: independent passes converge on the same score, so one thorough artifact-level pass catches the systematic issues; and fixes must land in tokens/contract files, or "every future edit inherits" the defect. [VERIFIED-PRIMARY]

## 6.2 The mechanics that make visual critique actually work (SlimSnap's documented constraints)

- Models downscale screenshots (current Claude models: ~2576px long-edge cap). Full-page screenshots destroy exactly what design review cares about: "small text, exact spacing, hairline borders."
- Therefore: **crop to the component**; **one question per screenshot** ("Three rounds of one question do better than one round with six circles on it"); **mark** (box/numbered marker) rather than annotate in small text; **send exact values as data** next to the image.
- Why the model says "looks fine": "A 4px spacing difference in a full-frame screenshot lands below a pixel after the model-side resize, so the model literally cannot see it." [VERIFIED-PRIMARY]

## 6.3 Protecting already-good sections [SYNTHESIS from verified practices]

- **Durable rules files beat per-message pleas.** Raduan: drift happened "even with the guidelines" — so the guidelines must also say what never changes. Tailthemes: "The contract file is code. If it endorses a banned pattern, every future edit inherits it."
- **Refinement preserves; redesign replaces** — the impeccable skill's explicit doctrine: "Refinement keeps the incumbent identity, behavior, copy, and everything outside scope… Never split the difference into polish on the discarded look." Its bounded-pass rule also prevents over-iteration: "Build fully, inspect once with a batched round (desktop and mobile together)… fix everything it shows in one batch, confirm with at most one more round, and stop polishing. Open-ended self-QA burns the user's money." [VERIFIED-PRIMARY — locally installed skill v4.4.0]
- **Scoped edit prompts** (the "10% better" pattern): name what must remain unchanged, what should change, what must never be introduced. Hallmark's `redesign` verb is the inverse: when you *do* want change, "throw out the structure, keep copy + IA + brand, rebuild with a different fingerprint." [VERIFIED-PRIMARY]

## 6.4 Weak vs. strong visual feedback [SYNTHESIS]

Weak: "the hero looks off, make it pop" — no location, no comparison target, no constraint; invites a full regeneration (and new slop).

Strong (composed from the verified mechanics):

> "Screenshot attached, cropped to the pricing card only. Problems, in order: (1) the plan name and price are nearly the same size — price should be ≥2× the name per our scale; (2) card padding is ~24px but our tokens say 32px on cards; (3) the CTA hover state is missing. Do not touch the page header, nav, or hero. Only this component. The accent stays `--brand-accent`; do not introduce new colors."

Why it works: cropped (survives resize), ranked (the model fixes the loudest thing first), token-anchored (no invented values), scoped (explicit do-not-touch list — the protection mechanism from §6.3).

## 6.5 Responsive visual QA [VERIFIED mechanics + SYNTHESIS]

Verified elements: Playwright (MCP or CLI skills) can drive viewports and return snapshots/screenshot files; the impeccable skill mandates batched desktop+mobile inspection rounds; the Krebs scorer demonstrates programmatic computed-style checks as an alternative to screenshots. Practical loop: run the page at 390px and 1440px, capture both, critique in one batched pass, fix in one batch, confirm once. [VERIFIED-PRIMARY mechanics; batching doctrine from impeccable]

---

# PART 7 — Design systems that prevent AI slop

## 7.1 The verified spectrum of enforcement

From softest to hardest — all four exist in production use:

1. **Rules prose** — signs-of-ai-design `design-rules.md` (CLAUDE.md/.cursorrules/AGENTS.md). Cheap, portable, decays with tells. [VERIFIED-PRIMARY]
2. **Design-skill documents** — Anthropic's ~400-token `frontend_aesthetics` + the full `frontend-design` skill; Hallmark. Loaded on demand so context stays lean (Anthropic's explicit design goal). [VERIFIED-PRIMARY]
3. **Token contracts in code** — Lovable semantic tokens ("NEVER write ad hoc styles"); Tailthemes `@theme` owning "the whole design surface"; component variants not overrides (both Lovable and Tailthemes independently arrived at variants-over-overrides). [VERIFIED-PRIMARY ×2]
4. **Executable gates** — flashpeek's banned-hex/font/copy lint; Hallmark's 57 slop gates + repeat-structure hard-fail via build log; Tailthemes' check-quality; design-slop-cop scoring. This is the only tier that survives model upgrades and context rot. [VERIFIED-PRIMARY ×4]

## 7.2 What goes in the file (structure synthesized from the verified artifacts) [SYNTHESIS]

```markdown
# DESIGN.md / AGENTS.md (frontend section)

## 1. Direction (the decision layer)
Product, user, one-sentence visual concept, named aesthetic anchors, the ONE bold element.

## 2. Tokens (the contract layer)
- Type: 2 families max, roles, scale (e.g., 1.25), min sizes, measure ≤80ch, line-heights
- Color: 1 dominant + 1 accent + 2–3 neutrals; accent's JOB named (Tailthemes rule:
  if you can't name what the accent does that primary doesn't, delete it); hues ≥20° apart
- Spacing: one scale; density register (allow ≥1.75:1 variance — one loud moment per page)
- Radius BY ELEMENT CLASS (e.g., 4px controls / 7–8px cards / full pills only where semantic)
- Shadow/border policy: commit to ONE edge treatment per surface class
- State ramps: hover/press/disabled derived from tokens, never per-component alphas
- Motion: durations, easing, what animates (one orchestrated load moment; action feedback)

## 3. Bans (the anti-median layer) — re-derived quarterly
Fonts: Inter/Space Grotesk/Geist/Instrument Serif-italic-hero (as reflexes, not absolutes)
Color: indigo/violet gradients on white; cream+terracotta reflex; emerald fallback;
       gradient text; colored glow shadows
Layout: eyebrow-pill centered hero; 3 identical icon cards; template waterfall; numbered
        steps on non-sequences; colored left-border cards
Copy: "Get Started"/"Learn More"; weightless headlines; fabricated trust content

## 4. Content rules (slop lives in copy too)
Real copy over placeholders; sentence-case convention; no lorem ipsum; no emoji icons.

## 5. Verification (the gate layer)
Fonts actually shipped in /public/fonts (declared ≠ shipped — Tailthemes #1)
Accent-vs-primary hue distance ≥20° (measured in OKLCH)
Density variance ≥1.75:1 across page
Lint gate: banned hexes/fonts/CTA strings fail CI (flashpeek pattern)
```

## 7.3 Do design-system files actually improve consistency? The verified answer

**Yes, with two documented caveats.**

For: Anthropic's before/after examples (skill active → distinctive output); Raduan ("a crucial step… without style guidelines, claude code can easily go astray"); Tailthemes' whole measurement practice exists because a *written* contract measurably propagated (their agent kit ships because the contract file is what the next agent reads); the Lovable production prompt makes design-system-first mandatory for every user.

Caveat 1 — **prose rules converge too**: HN practitioners on the Hallmark thread: skills "all seem to converge on the same thing… the design itself is the same unless you are extremely explicit," and even Hallmark's own docs admit its nav-rotation rule is "the single most-violated rule in practice." Caveat 2 — **context cost**: Anthropic's post is explicit that bloated permanent context degrades performance, hence on-demand skills over mega-prompts. Practical resolution: keep the prose layer ≤ ~400–500 tokens (Anthropic's proven size), put everything else in tokens and executable gates.

**Multi-page consistency** (the "page 1 ≠ page 2" problem, Part 12.H preview): the verified solutions are all *shared-contract* solutions — one token file every page reads (Tailthemes), a build log that hard-fails repeated structures across pages (Hallmark), and nested AGENTS.md so sub-apps inherit the root contract (agents.md spec). [VERIFIED-PRIMARY ×3]

---

# PART 10 — The ultimate anti-AI-slop workflows

All three workflows are [SYNTHESIS] assembled from the verified practices in Parts 3–7. Every step traces to a verified technique; the sequences are this report's engineering.

## Workflow A — FAST (landing page / MVP, half a day)

**When:** validating an idea, a launch page, a demo. Goal: above-median, coherent, no tells — not art-directed.

1. **Brief + direction (15 min, chat model).** Paste the Anthropic `<frontend_aesthetics>` block (§3.2A) as your system prompt/context. Prompt: product, audience, the ONE bold element, named aesthetic anchor (e.g., "Swiss railway timetable", "1980s Olivetti typewriter ad"). Forbid Inter/purple/gradient-heroes explicitly.
2. **Reference pass (15 min).** Pick 2 references from a gallery (saaslandingpage.com, mobbin). Assign one job each (layout / type) per the Part 4.2 contract. Have the model write a 30-line token plan (4–6 hexes, 2 families, scale, radius-by-class) and **critique the plan against "what would I produce for any brief like this"** (Anthropic two-pass, §3.2B) before any HTML.
3. **Generate (1–2 h).** One shot in Claude Code/Cursor/v0 with: token plan + real copy (no lorem ipsum, no fabricated trust numbers — signs-of-ai-design ban) + reference crops. Real font files from Google Fonts into `/public/fonts` — *declared ≠ shipped* (Tailthemes fingerprint #1).
4. **Visual gate (30 min).** Screenshot at 1440px and 390px. Run one "find everything, fix nothing" critique pass cropped per component, one question per screenshot (Part 6.2). Fix in ONE batch, confirm once, stop (impeccable bounded-pass rule).
5. **Mechanical gate (5 min).** Run design-slop-cop or a flashpeek-style lint (Inter? purple hexes? "Get Started"? uniform radius?).

**Common failure points:** skipping step 2's plan-critique (the median wins); full-page screenshot critique (resize blindness); decorating with real font names but system stack in the build; accepting the first hero.

## Workflow B — PREMIUM (polished startup site / product UI, 1–2 weeks)

Everything in A, plus:

1. **Design-system document first (Raduan's method, full strength).** Collect a FigJam/Gallery board per section; generate a 300+-line `DESIGN.md`/README via a chat-model session; hand-pick fonts from 6–10 model suggestions ("fonts which aren't that popular"). Add the Part 7.2 file structure verbatim: direction, tokens, bans, content rules, verification.
2. **Section-by-section build with three anchors per prompt** (Raduan §3.3): guidelines file + per-section reference crops + existing component library. 3–5 messages per section, then stop and self-critique.
3. **State ramp + density pass.** Derive hover/press/disabled from tokens (Tailthemes fingerprint #4); force one oversized moment per page (fingerprint #5); check accent-vs-primary hue distance ≥20° in OKLCH (fingerprint #3).
4. **Micro-interaction polish loop (steipete-style).** Drag clipped screenshots of one component at a time with 2–5-word instructions ("fix padding", "easing feels dead"); Motion/Framer for one orchestrated page-load moment (Anthropic skill guidance).
5. **Critique-gate before ship:** Tailthemes-style independent critique ("find everything, fix nothing") over rendered artifacts, fixes separated from findings; re-run the mechanical gate; compare against your references side-by-side *per component*.

**Common failure points:** letting the guidelines file bloat past ~500 tokens of prose (context degradation — keep prose lean, put the rest in tokens); iterating past the bounded-pass limit and destroying good sections; forgetting the bans file decays (purple died → cream rose).

## Workflow C — ADVANCED (multi-page SaaS with shared visual language, ongoing)

Everything in B, plus the consistency machine:

1. **Foundation phase (week 1).** Tokens file (`@theme` or CSS vars) owns the entire surface — "a colour or a size inside a component means the system does not exist yet" (Tailthemes). Component variants (not overrides) for shadcn primitives (Lovable policy). Write the root `AGENTS.md` + nested per-package files (agents.md pattern).
2. **Contract = code.** Bans enforced by lint in CI (flashpeek pattern), plus a page-structure repeat-fail (Hallmark's build-log hard-fail generalized): each new page declares its macrostructure; two consecutive pages with the same structure fail the check.
3. **Per-theme/per-app agent kit** (Tailthemes pattern): executable skills — `rebrand`, `add-section`, `add-page`, `check-quality` — so any future agent session runs *the system's* workflows instead of re-inventing.
4. **New page protocol:** declare mode (persuade/operate/read/experience — impeccable's surface-mode rule) → pick macrostructure ≠ last page's → generate from tokens + real content → cropped critique loop → mechanical gate.
5. **Quarterly bans refresh:** re-derive the banned list from the current tells (signs-of-ai-design repo updates; Krebs scorer output) — the tells migrate (purple → cream → ?).

**Common failure points:** pages generated in separate sessions without the shared token file (each session invents a new language badly); letting one page's one-off hacks into components (contract pollution); skipping the repeat-structure check across pages.

---

# PART 11 — Copy-paste prompt library

All prompts are [RECONSTRUCTION/SYNTHESIS] by this report unless marked otherwise — composed from the verified rules (Anthropic skill & `<frontend_aesthetics>`, v0 leaked guidelines, signs-of-ai-design rules file, Tailthemes fingerprints, Hallmark verbs). They are engineered to be complete and tool-agnostic (work in Claude Code, Cursor, Codex, v0-class tools; parts 4 and 10 work in Stitch).

**1. Website visual direction (run before any code)**
```
You are the design lead at a studio known for giving every client a distinct identity
that is never mistaken for anyone else's. This client rejects cliché proposals.
Product: {what it does, for whom}. The ONE thing this design should be remembered for: {X}.
Propose, before any code: (1) a one-sentence visual concept; (2) two named aesthetic anchors
from outside our industry; (3) 4–6 named hex values (one dominant, one accent, neutrals —
the accent must have a named job the dominant can't do, and be ≥20° away in hue);
(4) two typefaces (one expressive display, one quiet workhorse) that are NOT Inter, Roboto,
Arial, system-ui, Space Grotesk, Geist, or Instrument Serif; (5) an alignment/composition
stance. Then critique your own proposal: list everything in it that you would produce for
any brief in this category, and replace each with a choice specific to THIS product.
```

**2. Anti-generic design constraints (drop into CLAUDE.md/AGENTS.md/.cursorrules)**
```
You default to the statistical median of your training data when a design choice is left
unspecified — that median is the "AI look." Treat every item below as "make it a decision,
not a default."
- Type: never Inter/Roboto/Arial/system-ui/Space Grotesk/Geist as unchosen reflexes; ship real
  font files; real type scale; no all-caps eyebrow labels; no one-word italic/colored accents
  in headlines; ≤80ch measure.
- Color: no indigo/violet gradients on white; no cream+terracotta "tasteful startup" reflex;
  no emerald fallback; no gradient text; no colored glow shadows; one dominant + one working
  accent, not four muted equals.
- Layout: no centered eyebrow-pill hero with two buttons; no 3 identical icon-topped cards;
  bento grids are equally banned as an escape; no numbered steps on non-sequences; no
  hero→logos→cards→testimonials→stats→pricing→FAQ→CTA waterfall; vary section padding for rhythm.
- Surfaces: radius varies by element class; one edge treatment per surface (border XOR diffuse
  shadow); no glassmorphism without a real layering problem; no fake macOS terminals.
- Icons/imagery: no Sparkles/Zap/Shield reflexes; never emoji as UI icons; no fabricated trust
  content (counts, logos, testimonials).
- Motion: one orchestrated page-load moment; no fade-up-on-everything; no bounce/elastic.
When a listed pattern genuinely fits, use it on purpose and say why.
```
*(Compressed adaptation of signs-of-ai-design `design-rules.md`, which is CC BY-SA — use that file verbatim if you want the full canonical version.)*

**3. Design system generation**
```
Generate our project design system as DESIGN.md + tokens.css from this brief: {brief}.
Sections: (1) Direction — product, user, visual concept, the ONE bold element;
(2) Typography — 2 families + roles, 1.25 modular scale, body 16px/1.5–1.6, ≤80ch, min 14px;
(3) Color — 1 dominant, 1 accent (named job, ≥20° hue distance), 2–3 neutrals, as CSS variables
with semantic names (--surface, --on-surface, --accent…); (4) Spacing — one 4px-based scale,
a density register allowing ≥1.75:1 loud:quiet variance, one oversized moment per page;
(5) Radius/shadow policy BY ELEMENT CLASS; (6) State ramps — hover/press/disabled derived
from tokens, never ad-hoc alphas; (7) Motion — durations, easings, the one orchestrated load
moment, reduced-motion fallbacks; (8) Bans — {paste prompt #2}; (9) Verification — fonts on
disk, hue-distance check, density check, banned-pattern lint.
After generating, self-critique against the bans list and revise anything you flagged.
```

**4. Reference screenshot analysis (works in Claude/Cursor/Stitch with image input)**
```
Attached: a design reference. Do NOT clone it. Extract exactly three things:
(1) MACROSTRUCTURE — section inventory, grid skeleton, density variance, alignment system;
(2) TYPE SYSTEM — scale ratio, weight contrast strategy, case conventions;
(3) COLOR STRATEGY — the role structure (what's dominant/accent/neutral and why it works),
NOT the specific hues.
Output a spec I could hand to a designer who has never seen this image. Name explicitly what
you deliberately did NOT extract (imagery, exact hues, decorative signatures). If my final
design would be passable as this reference, the extraction failed.
```

**5. Landing page composition**
```
Build the {product} landing page from DESIGN.md + tokens.css. Real copy only — write like a
specific product talking to a specific user; no "streamline/supercharge/seamless/unlock,"
no weightless headlines that fit any product, no fabricated numbers/logos/testimonials.
Structure: choose the section set that tells THIS product's story; you must cut or reorder
at least two sections from the default waterfall and justify why. Hero: not the centered
eyebrow-pill + two-buttons template; open with the most characteristic thing in this
product's world (a real artifact, a live demo, a dense data strip, a bold claim). Feature
storytelling: let content decide the shapes — one full-bleed band, one asymmetric pair,
one plain list; zero rows of three identical icon cards.
```

**6. Typography selection**
```
We're choosing display+body type for {product}: {positioning, audience, emotional register}.
Suggest 8 candidate pairings from Google Fonts that are none of Inter/Roboto/Space Grotesk/
Geist/Instrument Serif, each with: why it fits THIS register, its failure mode, and the
product category that would ruin it. Weight your recommendations toward pairing one
high-contrast expressive display face with one neutral workhorse at 1.4–1.6 line-height.
Do not suggest a pairing you've suggested to any other project in this session.
```

**7. Color palette creation**
```
Create the palette for {product}. Constraints: exactly one dominant, one accent, 2–3
neutrals; the accent gets ONE named job (primary CTA? data highlight? state?) — if you can't
name the job, delete the accent; accent and dominant ≥20° apart in OKLCH hue; no gradients
unless one carries explicit meaning (max 2 stops, analogous hues, never opposing temperatures).
Derive from the product's material world (what physical things does this product touch?)
rather than from tech-startup conventions. Output as CSS variables with semantic names plus
a contrast table proving 4.5:1 body text.
```

**8. Component architecture**
```
Set up the component system: every visual decision lives in tokens.css/@theme; components
consume tokens only — any raw hex, px value, or text-white/bg-black class inside a component
is a defect. Build shadcn variants (never ad-hoc overrides) for: button (primary/secondary/
ghost/destructive × sm/md/lg), input, card, badge, table row, dialog. States (hover/press/
disabled/focus) derived from the state ramp, identical logic everywhere. Ship the state ramp
as tokens too. Then list which decisions a future page CANNOT change without editing tokens.
```

**9. Premium UI implementation**
```
Implement {component/page} at production quality. The bold element of this design is {X} —
spend all visual risk there and keep everything around it quiet and disciplined (Chanel
rule: then remove one accessory). Requirements that make it premium: real font files served
locally; spacing from the scale, never eyeballed; one orchestrated page-load moment
(staggered animation-delay, ≤600ms total); action feedback motion only where something
actually changed; focus-visible styles; reduced-motion respected; keyboard-navigable;
responsive to 390px without dropping content. Before finishing, screenshot the result and
list the three least-deliberate visual decisions you made; fix them.
```

**10. Visual critique (the reusable one — see also Final Deliverable #5)**
```
Critique the attached screenshot(s) of {page}. FIND ONLY — fix nothing, suggest nothing
vague. Ranked by damage:
(1) Typography: font actually served vs declared? scale violations? measure >80ch? case-convention
drift? any reflex fonts?
(2) Color: any unchosen defaults (indigo/violet, cream+terracotta, emerald)? accent with no
distinct job? hue distance <20°? gradient text? contrast <4.5:1?
(3) Layout/composition: template waterfall echoes? identical repeated cards? uniform density
(anything oversized?)? uniform section padding? centered-hero reflex?
(4) Surfaces: uniform radius? border+diffuse-shadow doubling? unnecessary glassmorphism?
(5) Copy: weightless headlines? buzzwords? fabricated trust content?
For each finding: exact location (component + element), what a deliberate choice would look
like instead, and whether it's a token defect (fix in tokens) or a composition defect
(fix in structure). Do not praise anything.
```

**11. Screenshot-based correction**
```
Attached: cropped screenshot of {component} with a numbered marker on {element}.
Fix exactly these, in this order: {1…2…3…}. Everything not listed must remain byte-identical —
same structure, same copy, same spacing rhythm, same classes where possible. Values:
use DESIGN.md tokens (state them as you apply them — e.g., "card padding 24→32px per
--space-5"). Do not regenerate the component; do not introduce new colors, fonts, or
patterns. If a listed fix requires touching something outside {component}, stop and ask.
```

**12. Responsive refinement**
```
Screenshots attached: {page} at 1440px and 390px. Audit the mobile capture specifically for:
content dropped (not just reflowed), horizontal scroll sources, touch targets <44px or
<8px apart, tap-only affordances that assume hover, type scale collapse (is the hierarchy
audible without the desktop size contrast?), and the oversized moment — does the page still
have one, or did everything become equal-width stacks? Propose mobile-specific compositions
where desktop layouts were shrunk rather than transformed (e.g., a 3-col comparison becomes
a sticky tab switcher, not three stacked cards). Fix in one batch; list every change as
{element: desktop behavior → mobile behavior}.
```

**13. Micro-interaction design**
```
Design the micro-interactions for {surface}. Motion philosophy: motion must answer an action
or direct attention — nothing decorative. One orchestrated page-load moment (define its
choreography and total duration ≤600ms). For each interaction below, specify: trigger,
property animated, duration, easing (exact curve), reduced-motion fallback, and the "what
changed" it communicates: {list: nav active state, card hover, form submit, toast, dialog
open/close, tab switch, pull-to-refresh, empty→filled state}. Banned: bounce/elastic on
functional controls, per-element fade-up entrances, hover transitions on touch-only devices,
animating width/height (use transform/opacity).
```

**14. Design consistency audit**
```
Audit {page1, page2, page3} as ONE product. Check at the artifact level (render the pages,
then): (1) Do all three load the same font files, and are the files actually served?
(2) Extract computed styles for body, h1, buttons, cards, inputs on each page — diff them;
any value that differs across pages but exists in tokens.css is a P1 defect (token drift);
any value that differs and ISN'T in tokens is a P0 defect (the system doesn't exist).
(3) Accent-to-dominant hue distance per page. (4) Structure fingerprint per page — flag any
two pages sharing the same macrostructure. (5) Density variance per page. Output a punch list
ordered P0 (contract missing) → P1 (drift) → P2 (taste), each with file + token to change.
```

**15. Final production-quality polish**
```
Final pass before ship. Do NOT redesign; preserve the visual language. In order:
(1) Fidelity: fonts on disk match tokens; no raw values outside tokens.css; states all derive
from the ramp; focus-visible everywhere; contrast ≥4.5:1 body, ≥3:1 large.
(2) Craft: optical alignment of the hero against the grid; consistent icon stroke weight;
tabular numerals in all data; widow/orphan control on display type; image aspect ratios
locked to prevent CLS.
(3) Restraint: apply the Chanel rule — list every decorative element that doesn't serve the
brief; remove the weakest one.
(4) Ship gate: run the banned-pattern lint; screenshot 1440/768/390; confirm the ONE bold
element is still the loudest thing on every page.
Change nothing else. Output: list of changes as {file: change} + the three screenshots.
```

---

# PART 8 — Advanced and underexplored techniques (what's actually effective)

Each technique gets an evidence verdict. "Effective" here means: verified in practice by someone credible, or measured — not merely plausible.

## 8.1 Encode taste as strict, explainable rules — packaged as an agent skill ⭐ strongest new technique

Emil Kowalski (design engineer on Linear's web team; creator of Sonner/Vaul) published the best public documentation of this: "Agents with Taste" (emilkowal.ski/ui/agents-with-taste): *"If you know what great feels like, describe the rules, then give them to your agents so they can follow them."* His published rules include an **easing decision flowchart** (entering/exiting viewport → ease-out; moving across screen → ease-in-out; hover → ease; constant motion → linear), **duration tables** (micro-interactions 100–150ms; standard UI 150–250ms; modals/drawers 200–300ms; exits ~20% faster than entrances), and a 7-rule typography block (~65ch body cap; `tabular-nums` on price columns; `…` not `...`; loosened letter-spacing on uppercase labels; x-height-matched fallback stacks; underlines only for links; bold-not-italic emphasis). The load-bearing design decision: **every rule carries an articulable "why"** — e.g., scale(0) entrances feel wrong because *"like a balloon, even when deflated it has a visible shape, it never disappears completely"* — because the why lets the agent generalize the rule to unlisted cases. He demonstrated Claude Code auditing a dialog animation against the rules and returning an issues list plus a before/after table. Skill downloadable at emilkowal.ski/skill. [VERIFIED-PRIMARY]

**Verdict: genuinely effective, and underused.** The differentiator vs. slop-list skills is causality — rules with reasons transfer; rules without reasons get pattern-matched back to the median.

## 8.2 Screenshot-diff self-critique loops — officially documented, rarely practiced

Anthropic's own Claude Code best practices prescribe it verbatim: *"[paste screenshot] implement this design. take a screenshot of the result and compare it to the original. list differences and fix them."* The same page documents closing the loop with pass/fail signals ("Give Claude something that produces a pass or fail, and the loop closes on its own"), a **Stop-hook** that blocks the turn from ending until the visual check passes, and a **verification subagent** where "a fresh model tries to refute the result, so the agent doing the work isn't the one grading it." Supporting artifacts: the Playwright Skill for Claude Code (HN 189 points, Oct 2025 — agent writes its own Playwright scripts, returns screenshots + console output, cheaper than accessibility-tree snapshots); v0.app's built-in "Check work" and "Inspect the web: takes screenshots, summarizes findings." [VERIFIED-PRIMARY ×3]

**Verdict: effective and free; adoption is the bottleneck.** Combine with Part 6.2's mechanics (crop, one question per round, values-as-data).

## 8.3 Generate competing directions; refuse the median

Three independent verified sources: the unslop-ui skill demo ("one prompt becomes four distinct deliberate designs, all of which pass the scanner" — github.com/JCarterJohnson/vibecoded-design-tells, Oct 2026); v0's historical ~3-variations-per-prompt UX; Steinberger's *"give me a few options before making changes."* Stitch productized this as `generate_variants` (count 1–5, creativeRange REFINE/EXPLORE/REIMAGINE, aspects LAYOUT/COLOR_SCHEME/IMAGES/TEXT_FONT/TEXT_CONTENT) — see Part 12.E. **Verdict: effective; 3–4 directions is the sweet spot** — enough to escape the median, few enough to evaluate.

## 8.4 Treat "tasteful defaults" as tells too — and gate in CI

The vibecoded-design-tells study (3.2M Reddit posts scanned, 46,971 on-topic, 125 canonical threads; reproducible with an adversarially-rejected control artifact): "they all look the same" / "screams AI slop" each appear in ~13% of on-topic posts; **shadcn/Tailwind defaults and the "AI purple" gradient lead the complaints — bento grids, glassmorphism and aurora gradients rank near the bottom** (the Twitter-meme tells are not what users actually flag). The meta-finding: *"The 2024 tell was the purple gradient. The 2026 tell is the cream background plus a serif display font plus sage green (the current Claude/Anthropic house look)"* — and the skill's own first version recommending cream+forest-green+Fraunces became "exactly the look people now recognize as AI-tasteful on sight." It ships a CI-gateable scanner (`devibe_scan.py`, exit code = high-severity findings). [VERIFIED-PRIMARY]

**Verdict: effective and necessary.** This confirms the Anthropic skill's internal calibration list from a completely independent data source — the ban list must be versioned.

## 8.5 Reference-first and named-direction specification

From the same study's method file: *"The highest-leverage input is a real reference… A reference is how a human injects taste into a model that otherwise averages."* If no reference exists: *"pick a named direction and commit to it, rather than 'modern and clean'… dense and utilitarian (trading terminal), editorial and text-forward (magazine), warm and consumer, stark and technical, expressive and brand-loud. Naming the direction forces specificity and steers away from the center."* Plus: *"Show the real product (a true screenshot, real data, real numbers) over abstract icon cards."* [VERIFIED-PRIMARY]

**Verdict: the single highest-leverage prompting habit** — matches David East's independent Stitch findings (Part 12.B) and Raduan's workflow (Part 3.3).

## 8.6 Front-load plan review; budget prompts for it

Verified multi-source: Bolt hackathon winners ("Start with a PRD and user stories… then write tests" — Humphrey; "Start with a PRD" — Thomas); Will Simon (Lovable): *"Chat mode is your friend: spend 30-40% of prompts reviewing plans before implementation"*; BrightBean (specs + architecture doc + style guide all public before code); Steinberger's options-first gauge. **Verdict: effective; the practice most correlated with winning output, and the first thing abandoned under time pressure.**

## 8.7 Other techniques — verdicts

- **Design-first vs code-first:** the verified elite pattern is *brief-first, code-late* (Raduan: structure and copy in Claude Web before building; two-pass plan/review in Anthropic's skill). Not "design tool first" — the thinking artifact can be prose. **Effective.**
- **Content-first / real content:** verified on three levels — East ("real copy is what kills the template look… it doesn't feel just like a template anymore"), Anthropic's skill ("Build with the brief's real content"), molecheck/BrightBean (real domain content is what made their output notable). **Effective, cheap, underrated.**
- **Typography-led design:** Anthropic's post names typography the highest-leverage axis; the v0 leak caps at 2 families; Krebs's panel says font combos are the #1 tell. **Effective.**
- **Motion as system:** Kowalski's tables (8.1) + Stitch's Motion dial + impeccable's "one orchestrated moment." **Effective when systematic; gimmick when scattered.**
- **Intentional asymmetry/imperfection:** community recipe (r/UXDesign u/Pheonix_1977: "tweak spacing and alignment so it's not perfectly uniform… add small imperfections or intentional asymmetry… think of Stitch as a starting point generator") + Stitch's Variance dial ("Predictable Symmetric → Artsy Chaotic"). **Situational — effective for editorial/luxury briefs; wrong for data-dense product UI** (impeccable's Operate mode: scanability outranks expression).
- **Custom CSS over default components:** verified only as an *override of default tokens* (Tailthemes: "shipping the untouched defaults is the tell"; Lovable: customize shadcn via variants). Full custom-CSS abandonment of shadcn is an opinion, not evidence. **Effective at the token layer; unproven at the framework layer.**
- **Multi-agent frontend pipelines:** verified at platform scale (Lovable: "a harness around a main agent that can use subagents… with the right models at each step") and in Anthropic's verification-subagent pattern; Steinberger runs 3–8 agents in parallel with atomic git commits. A named public "design agent → build agent → QA agent" pipeline: **not found as a documented primary practice** — the closest verified thing is a design/verification split. **Effective as work distribution; overkill for solo landing pages.**
- **Visual regression testing:** verified as CI-gateable scanners (design-slop-cop, devibe_scan.py, flashpeek lint, Hallmark 57 gates) and Tailthemes' "check at the artifact" doctrine. Classic per-pixel regression suites (Chromatic/Percy) with AI agents: no strong public write-up found — **promising, under-documented.**
- **Design evaluation rubrics:** Tailthemes' "find everything, fix nothing" + measured fingerprints (§1.3) is the best public rubric. **Effective.**

---

# PART 9 — Case studies

Nine verified; the six most instructive are developed. (Direct links in each; where techniques weren't publicly disclosed, that's stated.)

## 9.1 Summate landing page — Raduan's Claude Code build
raduan.xyz/blog/claude-code-for-landing · summate.io · ~Jul 2025

- **Tools:** Claude Web (brief + structure + copy), Claude Code (build), FigJam (inspiration board).
- **Process:** inspiration board → 300-line design-system README → per-section ideation (3–4 concepts each) → build per section with guidelines+references+component library → micro-interaction polish. ~1 week.
- **Distinctive vs. slop:** custom non-default font selection; section-level art direction with real reference crops; polish pass (SVG hover animations) as a first-class stage.
- **Reusable lesson:** the reference set must pass through a *distillation step* (board → written system) before the coding agent sees it.

## 9.2 Bolt.new World's Largest Hackathon winners (2025)
bolt.new/blog/2025-bolt-hackathon-winners · vibe-coding.fm episodes 4–6

- **Grand prize (Adrian Humphrey, Tailored Labs):** browser AI video editor; Bolt + Gemini 2.5 Pro + Remotion; 130k+ registrants, 9.5k+ projects. Disclosed technique: PRD + user stories + tests first; "investigate first, then fix" debugging.
- **2nd (Sergiy Dybskiy, Weight Coach):** camera + voice as primary input surfaces (ElevenLabs challenge winner).
- **3rd (Tommy Thomas, KeyHaven):** PRD-first; one-feature MVP; distribution planned pre-code.
- **Distinctive vs. slop:** none of the winners' differentiators were visual — they were *spec quality, novel input modes, and hard problems*. **Reusable lesson:** at the top of the field, process discipline (PRD-first) beat design tricks.

## 9.3 RecipeNinja.ai — Tom Blomfield (Monzo/GoCardless co-founder, YC partner)
news.ycombinator.com/item?id=43553031 · tomblomfield.com/post/1743528547367/the-age-of-abundance · Apr 2025

- **Tools:** Windsurf main; Claude Code + Gemini 2.5 Pro for "trickier features"; OpenAI realtime API for voice. 35k lines, 2–3 weeks, "Every single line was written by AI."
- **Distinctive:** function-calling drives live UI navigation from a voice assistant ("The site uses function-calling to navigate the site in realtime as you chat"). The HN thread also documents the honest failure mode: Firefox-specific white-screens, patched live.
- **Reusable lesson:** AI-native interaction modes (voice→function-calling→UI mutation) differentiate more than styling — and browser-matrix QA remains manual.

## 9.4 molecheck.info — Dr Magnus Lynch, consultant dermatologist
news.ycombinator.com/item?id=45157020 · molecheck.info · Sep 2025 (429 points, highest-scoring "vibe-coded" Show HN found)

- **Tools:** Gemini 2.5 Pro free tier; single-file vanilla JS; ~2–3 hours; £5 VPS.
- **Distinctive:** zero design tooling — the value is real clinical images and expertise-driven difficulty curves. The Purest demonstration that **content credibility can outweigh visual styling** for trust-bearing products.
- **Reusable lesson:** content-first is a design strategy; utilitarian ≠ slop when the domain is real.

## 9.5 BrightBean Studio — open-source SaaS in 3 weeks
news.ycombinator.com/item?id=47749674 · github.com/brightbeanxyz/brightbean-studio · Apr 2026

- **Tools:** Claude + Codex; Django 5 + Postgres; 12 first-party social API integrations, multi-tenant auth.
- **Techniques:** "Before writing any code, I spent time on detailed specs, an architecture doc, and a style guide. All public." README ships real screenshots + capability matrices.
- **Distinctive vs. slop:** style-guide-before-code is exactly the Part 7 discipline; the repo presents like a product site.
- **Reusable lesson:** the style guide is as much for the human's iteration discipline as for the model's context.

## 9.6 Hallmark + Tailthemes + the critics — the "systems" response
github.com/Nutlope/hallmark · tailthemes.com/blog/ai-design-slop-quality-gate · github.com/febbhav/signs-of-ai-design · github.com/JCarterJohnson/vibecoded-design-tells

Not one product but a pattern: four independent 2026 projects converged on the same architecture — **rules with reasons + token contracts + executable gates + build logs that refuse repeats**. Tailthemes publishing its own 6.5/10 scores and Hallmark admitting its most-violated rule are notable for a second reason: the practitioners winning at anti-slop are the ones **measuring their own output**. [VERIFIED-PRIMARY ×4]

**Explicitly not case studies (no verifiable design-workflow evidence):** rauchg.com (no AI-design essay; X unfetchable), rauno.me/craft (interaction craft, nothing AI-workflow), Lovable leaderboard (404). Stated per the no-fabrication rule.

---

# PART 12 — Google Stitch: deep dive

*Stitch facts verified as of Oct 2026. Stitch launched at Google I/O May 20 2025 (Gemini 2.5 Pro, text/image→UI, Figma export, code export — developers.googleblog.com/en/stitch-a-new-way-to-design-uis) and was rebuilt on Mar 18 2026 into "an AI-native software design canvas" with an infinite canvas, design agent, DESIGN.md import/export, clickable prototypes with auto-generated next screens, voice canvas, and an MCP server + SDK (blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design). Free during Labs: ~350 Standard + 50 Experimental generations/month (3–5 generations per usable screen → roughly 70–100 finished designs/month). Model lineup moved from 2.5 Flash/Pro to Gemini 3.x + Nano Banana image models during 2026; exact current picker options unconfirmed (official docs render client-side only). Known limits: HTML/Tailwind export only (read-only in-app), no backend/deploy, no real-time collaboration, edits can regenerate instead of patch, partial design-system obedience ("a prompt-conditioner, not a contract" — designproject.io, Apr 2026), and persistent cross-screen "Context Drift."*

## 12.A The "Stitch magic" — what the best results actually did

The single most substantive advanced walkthrough is **David East (Google DevRel), "One Design Decision to Create Better Results in Stitch"** (YouTube, May 5 2026, transcript verified): a baseline prompt ("A road running race listing page") produced what he called *"a shot in the dark"*; the final design was produced by a chain of **direction-first prompting → design-system role tuning → scoped variants → real copy injection**. What changed between iterations, verbatim-mapped:

1. He opened with a **design concept instead of features**: *"you will get better results with Stitch if you can start your prompt with a design concept, a vibe, or a general aesthetic… act as the creative director."*
2. He replaced abstract adjectives with **concrete material words**: "patriotic/monumental" (for a DC-themed site) produced generic output; **"neoclassical"** *"is a word Stitch can build from."* For the race site he had Gemini draft the aesthetic language first, yielding **"architectural limestone," "ink on paper," "the clay of an old track"** — *"words that I would not have known to use on my own."*
3. He treated the **auto-generated design system as the control surface**: *"This is the DNA of your design"* — four color roles (neutral/primary/secondary/tertiary) with a hierarchy: *"Neutral is about 80% to 90% of your screen… Primary is the ink… tertiary is the loudest, but used the least."* Hand-tuned per role; applied retroactively via right-click → "Update to the latest design system."
4. **Font forensics:** Stitch *"is going to generate headlines with Space Grotesk. And I can't stop it"* — fix: specify fonts per role (Public Sans for headline+body, Space Grotesk demoted to labels).
5. **Variants scoped by aspect**: *"explore an editorial lookbook layout… large editorial headings over images… like a luxury travel magazine"* (LAYOUT/TEXT_FONT), and imagery steered in words: *"minimalist cinematic photography of the road race courses… avoid that cliché runners on the road images."*
6. **Real copy killed the template look**: *"the aesthetic is clearly there… but reading the text, it's generic"* → generated real copy with a copywriting agent, re-ran variants scoped to `layout, images, text_content` with the copy pasted in: *"it doesn't feel just like a template anymore."*
7. A physical metaphor for layout: *"if my website was a book, what kind of book would it be?"* → coffee-table book → lookbook layout. [VERIFIED-PRIMARY throughout]

**Community-verified chains:** Stitch→React via HTML+Tailwind handoff (LogRocket, Jun 2025); Stitch→Claude Code via the official skills (`enhance-prompt` → `stitch-loop` → `react-components`, AI Labs YouTube ~Apr 2026); Stitch→Codex production ship (stitchedit.io, r/StitchAI Jan 2026); agency pattern (design system from client's existing site → live tweaks in meetings → generate pages; r/webdev Mar 2026). **No verified case of a Stitch design shipping verbatim to production without code conversion was found** — stated explicitly.

## 12.B Stitch prompt engineering — what actually produces better output

**Official guidance** (Stitch team's "Stitch Prompt Guide," discuss.ai.google.dev/t/stitch-prompt-guide/83844, May 2025): detail beats brevity ("An app for marathon runners" vs. the full community/training/races sentence); vibe via adjectives for mood; **one major change at a time**; UI/UX keywords ("navigation bar," "call-to-action button," "card layout"); reference elements specifically ("the primary call-to-action button on the login screen"). Official screen-level style prompts are the art-directed pattern: *"Product detail page for a Japandi-styled tea store. Sells herbal teas, ceramics. Neutral, minimal colors, black buttons. Soft, elegant font."* [VERIFIED-PRIMARY]

**The counter-intuitive API rule** (official `generate-design` skill): for MCP *generation* prompts, **"Do NOT include hex codes, font names, color palettes, roundness values, or any design system tokens"** — those belong in the design-system/theme layer; hexes are acceptable in *edit* prompts. Specificity belongs in direction and structure, not raw values, at generation time. [VERIFIED-PRIMARY]

**High-impact prompt vocabulary (verified):** named movements/materials (Japandi, neoclassical, museum-curatorial, synthwave, "19th-century cookbook", "architectural limestone", "ink on paper"); role-based color language (primary/ink/tertiary-accent); UI nouns for targeting; physical metaphors ("coffee-table book"). **What Stitch ignores/over-constrains:** abstract quality words ("high-end", "make it look good" — East: "not enough direction"); raw hexes at generation time (official skill); over-long prompt lists that read as features-not-direction. [VERIFIED-PRIMARY]

## 12.C "Don't make it look AI-generated" — Stitch-specific techniques

Google shipped an official anti-generic weapon: **`taste-design`** in the stitch-skills repo (github.com/google-labs-code/stitch-skills — "not an officially supported Google product," but authored by Google Labs code). Verbatim bans: *"The 'AI Purple/Blue Neon' aesthetic is strictly BANNED — no purple button glows, no neon gradients"*; *"Inter is BANNED for premium/creative contexts. Force unique character: Geist, Outfit, Cabinet Grotesk, or Satoshi"*; *"The generic '3 equal cards horizontally' feature row is BANNED"*; no pure black, no emoji icons, no AI copy clichés ("Elevate," "Seamless," "Unleash"), no fabricated metrics, no "Scroll to explore" filler. It also ships **atmosphere dials**: Density ("Art Gallery Airy" → "Cockpit Dense") and Variance ("Predictable Symmetric" → "Artsy Chaotic"). [VERIFIED-PRIMARY]

The community recipe (r/UXDesign, u/Pheonix_1977, Apr 2026): *"the tool is averaging patterns, so you have to break that… tweak spacing and alignment so it's not perfectly uniform… default font + perfect spacing = instant AI vibe… add small imperfections or intentional asymmetry… inject real context… think of Google Stitch as a starting point generator."* [EXPERT-OPINION]

And the documented failure loop to avoid: Stitch "really loves dark mode" and will flip entire screens unprompted; the official team remedy is **"deep prompting"** — *"prevent dark theme generation by including that instruction in your very first prompt. This is currently the most effective way to maintain manual control."* (Google AI Dev Forum, Jan 2026, team reply). Bans in prompt one; not prompt three. [VERIFIED-PRIMARY]

## 12.D Reference hacks

Verified reference channels in Stitch 2.0: image/sketch/wireframe upload; **URL import** (crawls a site into a design.md); screenshot-as-style-guide **redesign** ("pulls the patterns, the component placement, the design language… applies it to your own website" — AI Labs walkthrough); **annotate** for region-specific edits; canvas accepts "images, text or even code" as context (official 2.0 announcement). [VERIFIED-PRIMARY/SECONDARY]

The multi-reference decomposition framework of Part 4.2 maps directly: Stitch's own primitives are the slots — URL/screenshot for macrostructure, theme roles for color, font-role specs for type, `generate_variants(aspects=[IMAGES])` for imagery. Combining references beats cloning one: the verified evidence is East's marathon site (reference = luxury travel magazine *for heading scale only*, imagery = city marathons *not* runners), and the redesign feature's explicit style-guide-not-template semantics. [SYNTHESIS from verified mechanics]

## 12.E The multi-pass workflow (verified optimal strategy)

Single-prompt generation of everything fails against the documented failure modes (regenerative edits, Context Drift, partial system obedience). The verified multi-pass shape — distilled from East's video, the official `stitch-loop` skill, and the AI Labs pipeline:

- **PASS 1 — Direction:** creative-director prompt with named aesthetic + materials + bans in prompt one (dark mode off, purple/Inter banned). Generate one hero screen. [East + official team]
- **PASS 2 — System lock:** edit the auto-generated design system (color roles, fonts per role, roundness); export/tune DESIGN.md. [East + design-md skill]
- **PASS 3 — Primary page:** regenerate hero + key sections against the locked system. 
- **PASS 4 — Exploration via variants, not re-prompts:** `generate_variants` (count 3–5, `Explore`, aspects LAYOUT → pick). *"Explore… is the sweet spot. Reimagine… can go pretty wild."* [East; official schema]
- **PASS 5 — Secondary screens:** one screen per prompt, deep-prompted, design-system block pasted in (the `stitch-loop` skill's #1 listed pitfall is *not* doing this: "Inconsistent styles"). [VERIFIED-PRIMARY repo]
- **PASS 6 — Real content injection:** real copy via text_content-scoped variants; real imagery direction via IMAGES-scoped variants with clichés named and banned. [East]
- **PASS 7 — Targeted edits:** annotate + element-named edit prompts ("the primary CTA in the hero section"), one intent per prompt, hexes allowed here. [official guide + enhance-prompt skill: "Make only this change while preserving all existing elements"]
- **PASS 8 — Export and leave:** paste-to-Figma or export HTML/Tailwind; final-mile type/spacing/asymmetry in code where direct manipulation exists. [converging advice of designproject.io, dMaya, community]

## 12.F "Design director mode" — does role prompting work?

The verified evidence refines the question. Pure role-play ("act as a senior designer") has no published evidence of improving Stitch output. But **behavioral creative direction does**: East's verified framing — *"act as the creative director"* — is not a persona costume; it's an instruction to make direction-level decisions (concept, materials, hierarchy) before pixels. The verified chain is **DIRECTION → SYSTEM → GENERATION**, where role vocabulary merely earns its place by pulling the model off the median. The official `enhance-prompt` skill operationalizes the same idea as a pipeline (assess missing context → structured prompt with required DESIGN SYSTEM block), not as a persona. [VERIFIED-PRIMARY; SYNTHESIS on the persona-only part]

## 12.G Steal the principles, not the design

The strongest verified statement: the redesign feature's documented semantics (style-guide extraction, not template cloning), Hallmark's `study` verb ("refuses pixel-clones"), and East's per-axis borrowing (magazine for heading scale only). The translation pattern that verified sources support:

- ❌ "Make it look like Linear" → ✅ "Restrained monochrome UI, precise 8px rhythm, compact density, subtle borders, controlled typography, minimal decoration, extremely deliberate hierarchy" (the Linear *system*, not its pixels). [RECONSTRUCTION — composed from signs-of-ai-design's false-positives note: "A dark hero with a glow is also the house style of Linear, Raycast… The fingerprint is the co-occurrence of many defaults with no deviation anywhere" — so when borrowing a famous look, add at least one deliberate deviation.]
- The named-direction menu (verified, from choosing-a-look.md): dense-utilitarian / editorial-text-forward / warm-consumer / stark-technical / expressive-brand-loud. [VERIFIED-PRIMARY]

## 12.H Design-system engineering in Stitch — making 10 screens feel like one product

Verified mechanics: the **four color roles** with the 80–90% neutral budget (East); **fonts specified per role** (East's fix for Space Grotesk headlines); **DESIGN.md** as the portable contract (auto-generated, editable, importable — official 2.0; the `design-md` skill's canonical structure: atmosphere → colors as "Descriptive Name (#hex) – functional role" → typography → components → layout → a "Design System Notes for Stitch Generation" block pasted into every prompt); **right-click "Update to the latest design system"** to re-flow drifted screens; and the official team's deep-prompting doctrine for what the system doesn't cover. Documented ceiling: design.md is "a prompt-conditioner, not a contract" (designproject.io's Qualcomm-brand test: type locked to Cal Sans, but greens invented and case flipped in round 3). Practical translation: **expect drift, schedule re-syncs, and do the last 10% of consistency enforcement in code** where tokens are actually binding. [VERIFIED-PRIMARY + VERIFIED-SECONDARY]

## 12.I Content as design — the verified yes

East, verbatim: *"the aesthetic is clearly there… but reading the text, it's generic"* → after real copy: *"it doesn't feel just like a template anymore."* The official prompt guide's imagery rule works the same way (album art as macro ocean photo → page imagery reflects it). Anthropic's skill says the same thing from the other side: *"Copy can make a design feel as templated as the design itself."* Real numbers, named entities, and concrete imagery direction measurably change layout density, hierarchy, and credibility. **Verdict: the highest ROI-per-minute technique in this entire section** — it costs a copy pass and one scoped variant re-run. [VERIFIED-PRIMARY ×2]

## 12.J Design decomposition before generation

The verified version of "think first" in Stitch is the official `enhance-prompt` skill: it assesses the brief for missing **platform / page type / structure / style / colors / components** *before* writing the structured generation prompt — i.e., decomposition is built into Google's own prompt pipeline. David East adds the verified two-step: have a chat model **draft the aesthetic language first** (which produced "architectural limestone," "ink on paper"), then design. Separate reasoning from generation: **works** — it's the same two-pass plan/review architecture as Anthropic's frontend-design skill. [VERIFIED-PRIMARY ×2]

## 12.K Multiple design directions

Verified: `generate_variants` (count 1–5; REFINE/EXPLORE/REIMAGINE; aspects scoping) is the productized form; East calls Explore "the sweet spot"; Stitch 2.0's Agent manager runs parallel ideas on one canvas. Optimal: **3–4 concepts, one per named direction** (e.g., editorial lookbook / dense terminal / warm consumer), then merge — take one concept's macrostructure, another's type personality, a third's palette strategy (Part 4.2 contract). Reimagine is for deliberate left-field swings, not default use. [VERIFIED-PRIMARY + SYNTHESIS on merging]

## 12.L "10% better" iteration prompts

The verified Stitch-specific facts: **edits regenerate rather than patch** ("Asking Stitch to fix the positioning often produces a different layout entirely" — dMaya), so preservation language is not optional. Verified preservation patterns: the `enhance-prompt` skill's edit format — *"**Context:** This is a targeted edit. Make only this change while preserving all existing elements."*; the official guide's one-major-change-per-prompt rule; element-named targets ("On 'Team' page, image of 'Dr. Carter': update her lab coat to black" — the narrowest verified edit prompt); annotate for regions; and the official team's "spell out… explicitly instruct what **not** to change." The four-slot instruction shape that satisfies all verified constraints:

> "Do not redesign. Preserve: {layout, palette, typography, all copy except X}. Change: {one thing}. Never introduce: {dark mode / gradients / new fonts}. Target: {named element in named section}." [RECONSTRUCTION from verified pieces]

When Stitch regenerates instead of patching twice in a row, the verified escape is to stop iterating in Stitch and do the fix in exported HTML/Figma. [VERIFIED-SECONDARY — convergent advice]

## 12.M Extreme design experiments — useful vs. gimmick

Verified as *working* in Stitch's own published prompts and community artifacts: editorial/museum-curatorial ("massive whitespace… Playfair Display"), Japandi retail, neo-brutalism ("clashing high-contrast colors (yellow and black), thick black borders… hard, unblurred drop shadows"), synthwave/retro hardware ("chrome textures… monospaced tracklist"), vintage print ("textured paper backgrounds, hand-drawn illustrations"), glassmorphism (deliberately chosen, with "subtle white outline"), bento and masonry as *named* choices. [VERIFIED-SECONDARY — dev.to prompt set + official examples]

**Gimmick verdicts** [SYNTHESIS from the data in Part 8.4]: horizontal scrolling, experimental navigation, and motion-heavy experiences have **no verified production evidence in Stitch workflows** and fight the tool's strengths (multi-screen systems, fast variants); dense data interfaces and editorial/luxury directions are where Stitch's variants+system machinery actually shines. The Reddit-mined study's finding that bento/glassmorphism/aurora rank *lowest* among user complaints — while shadcn defaults and purple lead — implies the winning experiment is not wilder effects but **more committed systems**: one accent doing one job, real imagery, varied density.

## 12.N Twenty Stitch prompt recipes [RECONSTRUCTION — composed from the verified vocabulary and structure: aesthetic name + materials + structure + role-based color + fonts per role + imagery direction + bans. All avoid vague adjectives.]

1. **Premium SaaS:** "Project-management SaaS homepage. Editorial-technical aesthetic: ink-on-paper, wide margins, hairline rules only where they separate data. 4-column work grid collapsing to stacked bands; one oversized stat per section. Neutral: warm paper white 88–92% of surface. Primary: near-black ink. Accent: oxblood, reserved for the single primary CTA and active nav state. Headlines: Cabinet Grotesk; body: a quiet humanist sans. Imagery: real product UI screenshots, slightly rotated, hard-edged. BANNED: purple/indigo gradients, glass cards, dark mode, three equal feature cards, emoji icons."
2. **Luxury startup:** "Private-wealth app landing. Museum-curatorial: gallery-airy density, one artwork-sized moment per viewport. Cream gallery canvas, charcoal ink, champagne-bronze accent used only on numerals and the CTA. Display: high-contrast Didone; labels: spaced small caps. Imagery: matte architectural photography, long shadows. BANNED: neon, pure black, rounded-2xl-everything, stock handshake photos."
3. **Fintech:** "Consumer investing dashboard. Dense-utilitarian trading-terminal direction, but calm: ink-on-limestone. Tables with tabular numerals; row hover = one-step surface shift, no color flash. Primary: asphalt slate; accent: track-clay orange for portfolio deltas only; success/warning as semantic-only colors. Public Sans everywhere; mono for figures. BANNED: green-candle decoration, glowing charts, dark neon."
4. **Creator economy:** "Creator analytics dashboard for a YouTuber with 1.8M monthly views, 42.6K followers, $4,820 estimated revenue, 7 active campaigns. Editorial-poster energy: big numerals as the heroes (3rem+), everything else quiet. Warm cream canvas, ink text, single coral accent on the revenue figure and the primary CTA. Rounded but varied radius: 16px cards, 4px chips. Imagery: the creator's real thumbnails in a horizontal scroll strip."
5. **AI startup:** "AI research-agent platform landing. Stark-technical: off-white graph-paper canvas with faint grid, near-black ink, one acid-chartreuse accent confined to 'live system' indicators. Mono for labels and API snippets, geometric sans for prose. Hero = a real terminal artifact of an agent run, not an orb. BANNED: purple gradients, sparkle icons, 'Unleash', glassmorphism."
6. **Developer tool:** "CLI deployment tool site. Documentation-first aesthetic: dense-utilitarian, left-aligned everything, keyboard-first. Paper white, ink, one amber accent for warnings and the install command copy button. Code blocks as first-class citizens (syntax-highlighted, real commands). Space Grotesk *only* for labels; headlines in a workhorse grotesque. No hero illustration; hero IS the install command."
7. **Dark futuristic interface:** "Space-telemetry explorer. Near-black carbon canvas (never pure #000), fine white hairlines, cyan reserved for active data paths, amber for alerts. Instrument-grade density with breathing margins. Mono numerals, geometric sans labels. Glow ONLY on genuinely active elements (a satellite track), never on headings."
8. **Editorial website:** "Long-form journalism site. Broadsheet discipline: 6-column baseline grid, hanging punctuation, drop caps on feature opens, rule-weight hierarchy (2px section / 0.5px article). Ivory paper, black ink, one editorial red for pull quotes. Serif: source-matched text face with true italics; captions: small caps. No cards; sections separated by rules and whitespace."
9. **Brutalist website:** "Independent type foundry catalog. Neo-brutalist but typographic: hard 2px black borders, unblurred offset shadows, clashing yellow/black system, monospace metadata, giant foundry-name wordmark as the recurring motif. Real font specimens at display sizes. BANNED: soft shadows, rounded corners, gradients — the tension IS the design."
10. **Minimal Apple-like product:** "Hardware companion app. Product-as-hero: infinite white stage, device photographed at 3/4 with true shadows, one line of 40px+ light-weight type per screen. Neutral grays only; color appears solely inside the product UI screenshots. SF-metric spacing rhythm, generous negative space, zero decorative elements. BANNED: badges, pills, trust logos."
11. **High-end fashion website:** "Fashion house digital flagship. Editorial lookbook: full-bleed imagery, oversized serif headlines overlapping images, whitespace as luxury. Bone white, black, one season accent (saffron). Numerals in old-style figures; navigation as sparse text links. Imagery: grain-forward film photography, no stock smiles. BANNED: rounded cards, pills, drop shadows."
12. **Data-heavy dashboard:** "Logistics control tower. Cockpit-dense density dial: 8px rhythm everywhere, tabular numerals, 13px UI type. Neutral slate surfaces, ink text, status colors semantic-only (operational green / warning amber / fault red), zero accent decoration. Tables > charts; sparklines > big charts. BANNED: card-per-metric layout, gradient KPI tiles, icon-per-widget."
13. **Mobile-first application:** "Habit-tracking app, mobile. Warm-consumer direction: soft bone canvas, ink text, single moss accent for streaks and completion. Thumb-zone navigation (bottom bar ≤5 items, 44px+ targets), one-thumb reach for all primary actions. Rounded 20px cards for days, 4px chips for tags. Haptics implied by motion: completion = a single 200ms spring, nothing else moves."
14. **Marketing landing page:** "B2B compliance platform landing. Swiss-modern: strict 12-col grid, flush-left ragged-right, one accent (signal red) on 5% of pixels. Hero = the customer's compliance certificate as an artifact, not a headline orb. numerals tabular; claims sourced with footnotes. BANNED: gradient orbs, stock office photos, 'Trusted by 5,000+ teams'."
15. **Portfolio:** "Motion designer portfolio. Gallery protocol: black-on-bone, work at 80% viewport with 2-word captions, index-like project list with hover-peek video. One accent (electric blue) for the cursor and active states only. Typography carries identity: single expressive grotesque at three sizes. BANNED: project cards, thumbnails-in-grids, skill bars."
16. **Startup homepage:** "Climate-analytics startup homepage. Warm-consumer-meets-technical: bone canvas, ink, moss-green accent for all growth metrics. Hero = a live map artifact with real region data. Sections: problem (dense prose) → proof (full-bleed data band) → product (3 asymmetric panels, no icon cards). Space Grotesk banned; use a transitional serif for headlines to signal seriousness."
17. **Experimental interface:** "Generative-art playground. Instrument-panel aesthetic: dense readouts, toggle-heavy, mono type, scanline-subtle texture. Canvas-first layout with a 280px control rail. Interaction feedback ≤150ms everywhere. BANNED: marketing sections — this is a tool, and the tool is the design."
18. **Cinematic website:** "Documentary-series site. Anamorphic: 2.39:1 imagery full-bleed, letterboxed navigation, chapter numerals in roman, credit-roll footer. Near-black (charcoal #111) stage, bone type, one accent drawn from the show's grade (teal-orange split). Type: condensed grotesque for chapter titles. Imagery direction: 'wide establishing shots, negative space on the right third for titles.'"
19. **Social platform:** "Book-clubs social app, mobile. Cozy-analog: paper-texture canvas, ink, library-green accent, bookmark-ribbon motif for saves. Feeds as conversation margins (asymmetric chat, serif quotes), not infinite card stacks. Groups as 'shelves'. BANNED: engagement-bait reds, infinite gradient banners, emoji-as-icons."
20. **Award-winning-style landing page:** "Type foundry × coffee roaster collab page. One idea: everything is a label. Roast levels as typographic weights, tasting notes as a specimen sheet, brewing ratios as a table. 4-color risograph palette (bone, ink, fluorescent pink, teal) with intentional misregistration on imagery. Density: dense-utilitarian. This page should look printed, not rendered."

## 12.O The Stitch master prompt [RECONSTRUCTION — assembled entirely from verified mechanisms: East's direction-first + material words + role hierarchy; official DESIGN.md structure + "Design System Notes" block; taste-design bans; deep-prompting preservation doctrine; official imagery/copy rules]

```markdown
## PRODUCT CONTEXT
{Product} does {one sentence}. It replaces {current behavior}. This screen's job:
{persuade | operate | read}. The single most important thing on this screen: {X}.

## TARGET USER
{Who}, in the moment when {context}. They are {state of mind}; the screen must make
them feel {competent / calm / intrigued}, not {excited}.

## BRAND
Personality: {three adjectives that are NOT "modern, clean, professional"}.
Positioning against the category: {what everyone else does, and how we differ}.
Physical-world anchor: {the materials/textures of the product's world}.

## VISUAL DIRECTION
Named aesthetic: {e.g., "Japandi tea house", "neoclassical civic", "trading-terminal
utilitarian"}. Concrete material words to build from: {3–5, e.g., "architectural
limestone", "ink on paper", "the clay of an old track"}.
The ONE bold element: {X}. Everything else stays quiet and disciplined.

## TYPOGRAPHY (per role)
Headlines: {Font A — because {reason}}. Body: {Font B}. Labels/data: {mono or
spaced caps}. Do NOT default headlines to Space Grotesk. Scale ratio {1.25}; body
16px/1.5; ≤80ch; tabular numerals in all data.

## COLOR (role hierarchy — this is a budget)
Neutral surfaces: 80–90% of the screen ({named tone}). Primary/ink: {named tone,
"the ink"}. Secondary: {structural support}. Tertiary accent: the loudest, used the
least — ONE job: {the single CTA / active state}. No gradients unless one carries
meaning (max 2 stops, analogous). No pure black.

## LAYOUT
Grid: {12-col editorial / 8px utilitarian}. Density dial: {Art Gallery Airy ↔
Cockpit Dense} — and vary it: one oversized moment per screen, quiet elsewhere.
Composition: {flush-left / asymmetric {N}:{M} split}, NOT centered-hero-plus-cards.
Structure follows the story: {list sections in order with one-line jobs}.

## COMPONENTS
Buttons: {shape, weight, one primary style only}. Cards: {radius varies by class:
4px controls, {N}px surfaces}. Inputs: {border treatment}. Tables: {tabular, row
hover = surface shift}. Navigation: {pattern}. Shadows: {named treatment, e.g.,
"whisper-soft diffuse on hover only"} — one edge treatment per surface class.

## INTERACTION
One orchestrated load moment (≤600ms). Action feedback only where something changed.
Easing: ease-out for entrances, ~20% faster exits. Reduced-motion respected.

## RESPONSIVENESS
Desktop 1440 / tablet 768 / mobile 390. Mobile re-composes (lists become rails,
tables become definition lists); nothing is dropped. 44px touch targets.

## ANTI-SLOP RULES (non-negotiable, this prompt included)
NO purple/indigo-blue neon, no gradient glows, no dark mode on this project.
NO Inter/Roboto/Space Grotesk-unchosen headlines. NO 3-equal-icon-cards row, no
bento-as-reflex. NO centered eyebrow-pill + two-button hero. NO glassmorphism,
no emoji icons, no AI copy clichés ("Elevate", "Seamless", "Unleash"), no
"Scroll to explore", no fabricated metrics or trust logos. Every listed pattern
that genuinely fits must be a stated decision, not a default.

## REFERENCE STRATEGY
{Reference A} contributes macrostructure only; {Reference B} type personality only;
{Reference C} palette strategy only (hues come from BRAND). Nothing is copied
wholesale; if the result would pass as any single reference, extraction failed.
Sketch attached: follow its structure, not its styling.

## QUALITY BAR
"Excellent" = a stranger could name the visual concept in five words; exactly one
element is memorable and it is {X}; every color/face/spacing value traces to a role
above; real copy throughout; the screen passes the anti-slop list at zero violations.
```

## 12.P The Stitch cheat sheet

**20 things that make Stitch outputs dramatically better** (ranked; ★ = impact; E = evidence-backed, X = experimental-but-grounded)
1. ★★★★★ Open with a named aesthetic + concrete material words, not features (E — East, official guide)
2. ★★★★★ Put bans in prompt ONE (dark mode, purple, Inter) — "deep prompting" doctrine (E — official team)
3. ★★★★★ Real copy injection before judging the design (E — East)
4. ★★★★★ Lock the design system (roles + fonts per role) and paste the DESIGN.md block into every screen prompt (E — stitch-loop pitfall #1)
5. ★★★★ One intent per prompt; name the element and the section (E — official guide)
6. ★★★★ Variants scoped by aspect (Explore) instead of re-prompting (E — East, official schema)
7. ★★★★ Real imagery direction with clichés named-and-banned (E — East)
8. ★★★★ One bold element; everything else quiet (E — Anthropic doctrine, transfers)
9. ★★★★ Regenerate the design system + "Update to the latest design system" when screens drift (E — East, team)
10. ★★★★ Leave Stitch for the final 10% (Figma/HTML edit) (E — converging sources)
11. ★★★ Role-based color budget: 80–90% neutral (E — East)
12. ★★★ Specify fonts per role to defuse Space Grotesk defaults (E — East)
13. ★★★ Physical metaphor for layout ("what kind of book is this site?") (E — East)
14. ★★★ Annotate on-canvas for regional edits (E — official 2.0, AI Labs)
15. ★★★ URL import as a starting design.md, then edit it (E — official + AI Labs)
16. ★★★ Sketch/wireframe upload + theme spec (E — official capability)
17. ★★ stitch-loop skill for multi-page baton-passing builds (E — repo)
18. ★★ Voice canvas for exploration bursts ("three menu options") (E — official)
19. ★★ MCP pipeline: enhance-prompt → generate → react-components in Claude Code (E — AI Labs; X as a recipe)
20. ★★ Reimagine-range variants for deliberate left-field swings (X — grounded in schema, unfrequency-tested)

**20 things that make Stitch outputs look like AI slop**
1. ★★★★★ Feature-list prompts with no aesthetic direction ("a modern SaaS dashboard") (E)
2. ★★★★★ Accepting the auto design system untouched (E — Tailthemes-analogous: untouched defaults are the tell)
3. ★★★★★ Placeholder/lorem copy left in (E — East)
4. ★★★★★ Purple→blue gradients / neon glows (E — taste-design, study data)
5. ★★★★ Inter/Space Grotesk headlines unchosen (E — East, taste-design, Krebs)
6. ★★★★ Three equal icon cards (E — taste-design)
7. ★★★★ Centered eyebrow-pill hero + two buttons (E — signs-of-ai-design, Anthropic skill)
8. ★★★★ Letting Stitch flip to dark mode mid-project (E — official forum)
9. ★★★★ One uniform radius everywhere (E — Anthropic skill, signs-of-ai-design)
10. ★★★★ Template waterfall section order (E — signs-of-ai-design, Anthropic skill)
11. ★★★ Glassmorphism reflex (E — Krebs panel; note: ranked low in Reddit complaints — the *tool* averages it even if users don't cite it)
12. ★★★ Gradient text on KPIs (E — signs-of-ai-design)
13. ★★★ Prompting hexes at generation time in MCP flows (E — official generate-design rule)
14. ★★★ Six changes in one edit prompt (E — official "one major change")
15. ★★★ Cream+serif+terracotta as the "safe" tasteful look in 2026 (E — Anthropic skill, vibecoded-design-tells)
16. ★★★ Emoji icons (E — taste-design)
17. ★★ Fabricated trust content (E — taste-design, signs-of-ai-design)
18. ★★ "Scroll to explore" filler (E — taste-design)
19. ★★ Perfectly uniform spacing with zero asymmetry (E — community recipe)
20. ★★ Regenerate-from-scratch instead of scoped edits (E — dMaya failure mode)

**20 prompt phrases worth testing** (E = appears in verified sources; X = composed from verified vocabulary)
1. "Act as the creative director; start from the design concept, not the feature list." (E)
2. "Give me three different menu options." (E — official voice example)
3. "{Aesthetic} — a word Stitch can build from" pattern: prefer art-historical/material terms (E)
4. "Neutral is 80–90% of the screen; primary is the ink; tertiary is the loudest, used the least." (E)
5. "Explore an editorial lookbook layout… like a luxury travel magazine." (E)
6. "Avoid that cliché {category} imagery; use {concrete alternative}." (E)
7. "This is a targeted edit. Make only this change while preserving all existing elements." (E — enhance-prompt)
8. "On the {named} screen, {named element}: {single change}." (E)
9. "Do not switch to dark mode. Light theme only for this entire project." (E — team doctrine)
10. "Ensure all images and illustrative icons match the new color scheme." (E — official)
11. "If my website was a book, what kind of book would it be? Design for that." (E)
12. "Structure follows the story, not a template: cut or reorder two default sections." (X)
13. "One oversized moment per screen; everything else goes quiet." (X)
14. "Radius varies by element class: 4px controls, 16px surfaces, full only where semantic." (X)
15. "Show the real product — a true screenshot, real numbers — over abstract icon cards." (E — choosing-a-look)
16. "Primary CTA: '{named color} ({hex})' — reserved for exactly one action." (E — design-md block format)
17. "Shadows: whisper-soft diffused on hover — not 'shadow-sm'." (E — design-md block format)
18. "Real copy follows; use it verbatim, do not invent marketing filler." (X)
19. "Dense-utilitarian / editorial-text-forward / warm-consumer / stark-technical / expressive-brand-loud — commit to one." (E)
20. "List what you extracted from each reference and what you deliberately did not copy." (X)

**10 negative constraints worth testing** (E unless noted)
1. "No purple/indigo-blue neon, glows, or gradient buttons." (E)
2. "No dark mode anywhere in this project." (E)
3. "Inter is banned; headlines use {Font}; Space Grotesk may appear only in small labels." (E)
4. "No row of three equal cards; every feature gets the shape its content needs." (E)
5. "No centered eyebrow-pill hero with two buttons." (X)
6. "No glassmorphism/backdrop blur." (X)
7. "No gradient text; no glow shadows." (X)
8. "No emoji as icons; no Lucide Zap/Shield/Sparkles reflexes." (X)
9. "No fabricated metrics, testimonials, or client logos." (E)
10. "No pure black; no 100% saturation anywhere." (E)

**10 reference-image strategies** (all grounded in verified capabilities)
1. URL import → design.md → edit before generating anything.
2. Screenshot-as-style-guide via redesign ("pulls the patterns… applies to your own site").
3. Sketch/wireframe for structure + separate theme spec for skin.
4. One reference per axis (layout / type / color / interaction) — never one for all.
5. Cross-industry reference pairing to break category templates.
6. Full-page screenshot (GoFullPage-class) for macrostructure; crops for detail.
7. Competitor screenshot + explicit "differentiate in these three ways" brief.
8. Annotate over the reference to mark what to adopt vs. avoid.
9. Your own best past screen as the consistency reference across projects.
10. Post-generation: re-import your rendered build screenshot for a drift check against the DESIGN.md.

**10 iteration strategies**
1. One intent per prompt; element-named; section-scoped. (E)
2. Aspects-scoped variants instead of re-prompting the base screen. (E)
3. Design-system re-sync when drift is detected, then continue. (E)
4. Real copy late: generate → write real copy → text_content-scoped re-run. (E)
5. The four-slot edit prompt: Preserve / Change / Never-introduce / Target. (X — from verified pieces)
6. Escape hatch: two failed patch attempts → export to Figma/HTML. (E — converging advice)
7. Prototype Play mode to validate interaction logic between visual passes. (E — official)
8. Generate secondary screens immediately after locking the system (drift grows with prompt distance). (E — stitch-loop ordering)
9. Keep a DESIGN.md changelog; re-paste the updated block into every subsequent prompt. (E — design-md pattern)
10. Screenshot every accepted state; use them as references for the next screen. (X)

**10 advanced design directions** (with ★ usefulness for Stitch specifically)
1. ★★★★★ Editorial-text-forward (plays to variants + type roles)
2. ★★★★★ Dense-utilitarian / terminal (plays to role-budget discipline)
3. ★★★★ Japandi / warm-material (the official example category — well-trained)
4. ★★★★ Neo-brutalist (high-contrast, well-documented prompts exist)
5. ★★★★ Museum-curatorial / gallery (airs the density dial)
6. ★★★ Cinematic anamorphic (strong with imagery direction; weak on systems)
7. ★★★ Retro-hardware / synthwave (verified prompt sets exist; narrow use)
8. ★★★ Swiss-modern grid discipline (transfers cleanly to code export)
9. ★★ Instrument-panel futuristic (glow discipline required to avoid slop)
10. ★★ Maximalist print/risograph (striking; hardest to keep multi-screen coherent)

**5 complete real-world Stitch workflows** (all sourced above)
1. **East's creative-director loop (verified, May 2026):** baseline prompt → reject as "shot in the dark" → Gemini-draft aesthetic vocabulary → direction-first re-prompt → design-system role tuning → scoped variants (layout/type; imagery) → real-copy text_content variant → done. Best single template for any marketing site.
2. **AI Labs' Claude-Code pipeline (Apr 2026):** enhance-prompt skill → stitch-loop via MCP (page-per-prompt with DESIGN.md block) → react-components conversion → shadcn registries for premium components. Best for shipping real apps.
3. **LogRocket's HTML→React handoff (Jun 2025):** one multi-screen generation → copy HTML/Tailwind → fixed Gemini conversion prompt → routed React app. Simplest code path.
4. **The agency pattern (r/webdev, Mar 2026):** URL-import client's site → design system → live meeting tweaks on canvas → generate pages from the locked system → annotate-driven revisions. Best for client work.
5. **zeroshotlog's rescue pattern (Jan 2026):** diagnose the slop (purple gradient) → write design-brief.md (what's wrong / avoid-list / target direction) → screenshots + brief → amber/terminal rebuild → Claude Code + Playwright QA. Best for redesigning an existing AI-slop site.

## FINAL STITCH QUESTION — same model, wildly different results: why?

Because the model is the *engine*, and everything that makes a design good is the *drivetrain around it*. The verified difference decomposes into nine assets the skilled builder owns and the average user doesn't:

- **PROMPTING** — direction-first, material-worded, one-intent prompts with bans in prompt one (East; official guide; deep-prompting doctrine) vs. "make me a modern website."
- **DESIGN KNOWLEDGE** — knowing that neutral is a budget, radius is a per-class decision, density is a dial with variance, and that "tasteful defaults" are the new tells (Anthropic skill; Tailthemes; signs-of-ai-design). You cannot prompt for what you can't name.
- **REFERENCE SELECTION** — a reference is "how a human injects taste into a model that otherwise averages" (choosing-a-look.md); the skilled builder picks references *per axis*, often cross-industry.
- **ART DIRECTION** — one bold element, deliberate deviation from every default, Chanel rule. The average user asks for "good"; the director decides what it should be remembered for.
- **ITERATION** — variants over re-rolls, scoped edits over regenerations, bounded critique passes (crop, one question, values-as-data), and the discipline to stop.
- **DESIGN SYSTEM** — the DESIGN.md/tokens contract pasted into every prompt and re-synced on drift; in Stitch it's a conditioner, so the pros also finish in code where contracts bind.
- **CONTENT** — real copy and real imagery direction "kills the template look" (East) — the cheapest, most-verified upgrade in the entire stack.
- **VISUAL QA** — critique at the artifact: screenshots (cropped), computed-style gates, slop scanners, lint bans — "check at the artifact, not the prompt" (Tailthemes).
- **HUMAN JUDGMENT** — the willingness to reject the first output ("a shot in the dark"), to measure your own work (Tailthemes publishes its 6.5s), and to keep a versioned ban list because every tell decays.

**The repeatable system:** (1) write the direction in material words + bans; (2) lock the design system (roles, fonts-per-role, radius-by-class); (3) generate one screen, then variants — not re-rolls; (4) inject real content; (5) scoped preservation-language edits only; (6) critique cropped artifacts against the ban list; (7) export and finish in code where tokens are enforced. Every step above is evidence-backed; the only scarce resource is the judgment to make decisions instead of defaults — and that judgment is learnable, because every rule in this report carries its reason.

---

# FINAL DELIVERABLES

## 1. The 10 most important discoveries

1. **The slop is statistical, not mysterious.** AI output is the median of its training data; the tell is *unchosen* defaults stacked, not any single choice (signs-of-ai-design; Tailthemes). One deliberate departure per axis breaks the fingerprint.
2. **The problem is measured, at two independent levels:** 22% of 1,590 Show HN pages trigger 4+ AI-design patterns (Krebs, deterministic DOM scoring); seven professionally-made themes all scored ~6.5/10 under an independent critic for the same five fingerprint failures (Tailthemes).
3. **The tool vendors are fighting the slop inside their own system prompts.** Anthropic ships a ~400-token `<frontend_aesthetics>` skill and a full frontend-design skill (with a calibration list of current tells — including its own terracotta accent); v0's production prompt bans purple "unless explicitly asked"; Google's stitch-skills repo bans "AI Purple/Blue Neon," Inter, and 3-equal-card rows.
4. **Ban lists decay on a ~1-year cycle.** Purple (2024) → cream+serif+terracotta and acid-green-on-black (2026) — confirmed independently by Anthropic's skill, the Reddit-mined tell study, and the signs-of-ai-design lifecycle labels. Static rules files must be re-derived; versioned repos beat blog posts.
5. **The five artifact-level fingerprints worth always checking:** fonts declared but not shipped; design ideas that never reached a token; accent within 20° hue of primary; no state ramp; uniform density with no oversized moment (Tailthemes, measured).
6. **Anthropic's verbatim screenshot-diff loop is official doctrine and almost nobody uses it:** "implement this design. take a screenshot of the result and compare it to the original. list differences and fix them" — with Stop-hooks and refutation subagents as the escalation path.
7. **Real copy is the highest-ROI fix in design tools** — "it doesn't feel just like a template anymore" (East) — because placeholder text forces placeholder layout decisions.
8. **Rules-with-reasons beat rules-without-reasons** (Kowalski's easing flowchart + balloon argument): causal rules let the agent generalize; bare bans get pattern-matched back to the median — which is why many anti-slop skills "all seem to converge on the same thing" (HN practitioners).
9. **Design tools (Stitch) and coding agents are complementary stages, and the handoff artifact is the design system:** Stitch 2.0's DESIGN.md was built for exactly this ("export or import your design rules to or from other design and coding tools" — official).
10. **Enforcement has moved to CI.** The strongest 2026 artifacts are executable: banned-hex/font/copy linters (flashpeek), 57-gate skills with build-log repeat-fails (Hallmark), exit-code slop scanners (design-slop-cop, devibe_scan.py). Prompt-level rules rot; gates don't.

## 2. The 10 highest-impact techniques (ranked by practical usefulness)

1. **Write the direction before the code — in material words, with named aesthetic anchors and bans in the first prompt.** (Anthropic two-pass; East; deep-prompting doctrine.)
2. **Ship a token contract and forbid raw values in components.** (Lovable policy; Tailthemes @theme doctrine.)
3. **Reference-first: assign each reference one axis; distill to a spec before the agent sees pixels.** (Raduan; Hallmark study; choosing-a-look.)
4. **The screenshot-diff critique loop with cropped captures, one question per round, values-as-data.** (Anthropic best practices; SlimSnap mechanics; steipete.)
5. **Real content throughout — copy, numbers, imagery direction — before judging the design.** (East; Anthropic skill; molecheck.)
6. **Durable design context in lean files (≤~500-token prose + tokens), loaded on demand — not mega-prompts.** (Anthropic skills architecture; Raduan's README; agents.md.)
7. **Generate 3–4 competing directions via variants/options; commit, then refine incrementally with preservation language.** (Stitch generate_variants; steipete; enhance-prompt edit format.)
8. **Executable gates: banned-pattern lint in CI + repeat-structure fails + computed-style checks.** (flashpeek; Hallmark; design-slop-cop; Tailthemes check-quality.)
9. **Rules-with-reasons as agent skills (motion tables, type rules, easing flowcharts).** (Kowalski; skill-creator.)
10. **Front-load plan review — spend 30–40% of prompts in planning chat before implementation.** (Will Simon; Bolt winners; BrightBean.)

## 3. The 5 most overlooked techniques

1. **Naming a direction when you have no reference** — "dense-utilitarian / editorial / warm-consumer / stark-technical / expressive-loud" instead of "modern and clean" (choosing-a-look.md; verified against East's independent results).
2. **The 2576px reality of model vision** — full-page screenshots literally cannot carry 4px spacing truths; crop, mark, and send exact values as data (SlimSnap's documented image-cap mechanics).
3. **Treating cream+serif+sage as a tell** — auditing against *current* second-wave defaults, not the dead 2024 purple list (vibecoded-design-tells; Anthropic calibration).
4. **Refutation subagents / fresh-model critique** — "the agent doing the work isn't the one grading it" (Anthropic best practices) — one line to add to any agent setup, almost never seen in practice.
5. **The build-log repeat-fail** — Hallmark's hard-fail on repeating recent page structures/themes, generalized: keep a log of accepted macrostructures and make the agent check new pages against it. Nobody does this manually; it's one script.

## 4. Master prompt — building a visually distinctive frontend with an AI coding agent

*(Tool-agnostic: works as a first message in Claude Code / Cursor / Codex; sections marked ◆ go in your repo files instead of the chat.)*

```markdown
◆ CONTEXT FILES (create once, reference forever):
- DESIGN.md: direction, tokens (type/color/space/radius/shadow/motion/state ramps),
  banned list (re-derived quarterly), content rules, verification checklist.
- AGENTS.md / CLAUDE.md pointer: "All UI work follows DESIGN.md. Raw hex/px/inter in
  components = defect. Fonts ship as real files. Screenshot before claiming done."

◆ FIRST MESSAGE (new surface):
Role: you are the design lead; the client rejects templated work; take aesthetic risk
in exactly one place.

1) PLAN (no code): product, user, the ONE memorable element; one-sentence visual
   concept; two named aesthetic anchors from outside this industry (material words,
   not adjectives); 4–6 named hexes (1 dominant, 1 accent with a named job, ≥20° hue
   apart); two typefaces (not Inter/Roboto/Space Grotesk/Geist/Instrument Serif by
   reflex) with roles; alignment stance; ASCII wireframe of the page with density
   variance marked (one oversized moment).
2) SELF-REVIEW: list every choice you'd make identically for any brief in this
   category; replace each with a choice specific to THIS product; state what changed.
3) WAIT for my approval of the plan.

◆ BUILD MESSAGE (after approval):
Build from DESIGN.md + tokens only; variants over overrides; states from the ramp;
real copy (no lorem, no fabricated trust content); real font files; one orchestrated
load moment; responsive 390px without content loss; reduced-motion + focus-visible.

◆ VERIFICATION LOOP:
Take a screenshot at 1440 and 390. Compare against the plan and DESIGN.md. List
differences and fix them. Then run the banned-pattern check (fonts shipped? purple/
cream-terracotta/acid-green? 3-equal-cards? uniform radius? uniform density? eyebrow-
pill hero? gradient text? "Get Started"?) and report zero-violations evidence.
Then stop — one fix batch, one confirmation pass, no open-ended polishing.
```

## 5. Reusable visual critique prompt (paste into any agent with a screenshot)

```markdown
Critique the attached screenshot(s). FIND ONLY — no fixes yet. Ranked by damage;
for each finding give: exact element + section, which rule it violates (DESIGN.md
token / banned list / composition principle), and whether it's a TOKEN defect
(fix in tokens) or a COMPOSITION defect (fix in structure).

A. Typography — declared fonts actually served? scale violations? measure >80ch?
   case drift? reflex fonts (Inter/Space Grotesk/Instrument-Serif-italic-hero)?
B. Color — unchosen defaults (indigo-violet, cream+terracotta, emerald fallback)?
   accent without a distinct job? accent↔primary hue distance <20°? gradient text?
   contrast <4.5:1?
C. Layout — template-waterfall echoes? repeated identical cards? uniform density
   (is anything oversized?)? uniform section padding? centered-pill-hero reflex?
D. Surfaces — uniform radius? border+diffuse-shadow doubling? unjustified
   glassmorphism? glow shadows?
E. Motion — non-communicative animation? missing reduced-motion? per-element
   fade-up everywhere?
F. Copy — weightless headlines? buzzwords? fabricated metrics/logos/testimonials?

Output: a punch list, max 12 items, P0 (contract violations) → P2 (taste).
Do not praise anything.
```

## 6. Checklist: generic or genuinely art-directed?

Score one point each; **0–3 = slop risk, 4–7 = competent, 8–12 = art-directed.**

**Decision evidence**
1. □ Can you name the visual concept in ≤5 words that isn't "modern/clean/professional"?
2. □ Exactly one memorable element per page (and it's not a gradient)?
3. □ The font was *chosen* (not Inter/system default) and the font files actually ship?
4. □ The accent has one named job and is ≥20° away in hue from the primary?
5. □ At least one deliberate deviation from every "safe 2026 default" (incl. cream+serif+sage)?

**Fingerprint absence**
6. □ No centered eyebrow-pill hero + two buttons; no 3 identical icon cards; no template waterfall?
7. □ Radius/edges vary by element class; one edge treatment per surface; no unjustified glass?
8. □ Density varies (≥1 loud:quiet ratio) — something is oversized?
9. □ States come from a ramp (hovers aren't four ad-hoc greys)?
10. □ Copy is specific (no "Build faster. Ship smarter.", no buzzwords, no fabricated trust)?

**System integrity**
11. □ No raw hex/px in components — everything traces to tokens?
12. □ Rendered artifact passes a computed-style/lint check (not just the prompt)?

---

*Report compiled 2026-10-05. ~60 primary sources fetched and verified across Hacker News (Algolia API), GitHub (API, raw files), vendor engineering blogs, the Google AI Developers Forum, YouTube transcripts, and practitioner blogs. Reddit comment-level quotes were not reproducible (anonymous access blocked) and are labeled accordingly. Nothing in this report is fabricated; unverified claims are labeled inline, and known-false sources (e.g., aunomay.com's Stitch claims) are flagged.*
