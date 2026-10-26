/**
 * Editorial expansion for individual quote pages.
 *
 * A quote on its own is a thin page. What makes it worth indexing is the
 * context around it: what the line is actually saying, and when it is useful.
 * Keys are the slugs produced by `buildQuoteSlugMap()` in `src/lib/slugs.ts`.
 *
 * ⚠️ Draft copy. Rini should edit these to match her own intent — she wrote the
 * quotes, and a page that misreads its own subject is worse than no page.
 */

export interface QuoteCopy {
  /** Short label shown above the quote. */
  theme: string;
  /** 100–150 words of genuine interpretation. */
  meaning: string;
  /** Related reading on the site. */
  relatedHref: string;
  relatedLabel: string;
}

export const QUOTE_COPY: Record<string, QuoteCopy> = {
  'golden-hour-energy': {
    theme: 'Boundaries',
    meaning:
      'This is a line about scarcity, and about the opposite of it. Most people say yes because a yes feels flattering — someone wants something from you, so you give it. The problem is that a yes is never free: it is paid for with the hours you would have spent on your own work, your own rest, your own people. Saying it out loud makes the trade visible. The second half is the harder half, because access is not the same as attention. You can be liked and still be drained. Reading this before a week fills up is more useful than reading it after.',
    relatedHref: '/edits/category/decor',
    relatedLabel: 'Build a room that protects your peace'
  },
  'your-glow-is-your-signature': {
    theme: 'Confidence',
    meaning:
      'A signature is the thing that identifies you before you say anything — and it is not the same as a style you copied from someone with more followers. The useful part of this line is the word "signature" rather than "shine": a signature is consistent, it is recognisable, and it does not need an audience to exist. That reframing matters on the days when nobody is looking. If your glow only works when it is being watched, it is performance. If it works alone in a bedroom at 11pm, it is yours.',
    relatedHref: '/edits/category/skincare',
    relatedLabel: 'Skincare that is about your skin, not your feed'
  },
  'you-do-not-need-to-have': {
    theme: 'Growing',
    meaning:
      'The pressure to have a plan at sixteen is mostly a side effect of watching people who are twenty-six. Blooming in your own season is not a motivational poster — it is a claim about timing: the thing that looks like being behind is usually just being early in a sequence you cannot see the end of. Practically, it means judging yourself against last month rather than against a stranger\'s highlight reel. It is also permission to be unfinished in public, which is the only way anything gets finished.',
    relatedHref: '/edits/category/fashion',
    relatedLabel: 'Style that grows with you, not against you'
  },
  'true-confidence-comes-from-being-comfortable': {
    theme: 'Self-trust',
    meaning:
      'Confidence built on being watched collapses the moment the room empties. This line points at the version that does not: the quiet, unglamorous kind that shows up when there is no one to perform for. That kind is built from evidence — keeping small promises to yourself, finishing the thing you said you would finish, being the same person in a group chat as you are alone. It is slower and it is far more durable, because it does not depend on anyone else\'s attention to stay true.',
    relatedHref: '/quotes',
    relatedLabel: 'More mindset quotes'
  },
  'small-daily-habits-create-massive-transformations': {
    theme: 'Rituals',
    meaning:
      'Transformations that stick are boring while they are happening. The reason morning routines work is not that mornings are magic — it is that a repeated action stops requiring a decision, and decisions are what run out by 4pm. Romanticising the routine is a legitimate strategy, not a frivolous one: if the ritual feels good, you repeat it, and repetition is the entire mechanism. The mistake is expecting the visible result in week one. Protect the peace part is doing the real work here — the habit only compounds if you are not too depleted to show up for it.',
    relatedHref: '/edits/category/decor',
    relatedLabel: 'Set up a study space you actually want to sit in'
  }
};

export function quoteFallbackCopy(theme: string): QuoteCopy {
  return {
    theme,
    meaning:
      'A short line from the TeenTimeGlow mindset archive. Read it once for the surface meaning, then again for the part that applies to your week specifically.',
    relatedHref: '/quotes',
    relatedLabel: 'Browse all quotes'
  };
}
