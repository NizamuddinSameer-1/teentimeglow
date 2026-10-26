/**
 * 🎨 TeenTimeGlow — Central Site Content & Copy Configuration
 * 
 * You can edit all text, headlines, button labels, badge copy,
 * and options directly in this file without digging into HTML or components!
 */

export const siteContent = {
  // Brand & Meta
  brand: {
    title: 'teen time',
    glowWord: 'glow.',
    fullTitle: 'TeenTimeGlow — Feel The Glow',
    tagline: 'feel the glow • curated teen aesthetic',
    email: 'hello@teentimeglow.me',
    domain: 'https://www.teentimeglow.me',
    metaDescription: 'Feel the vibes with TeenTimeGlow. Curated teen fashion lookbooks, glass skincare routines, cozy bedroom aesthetics, Prime Video rankings, daily quotes, and free 4K wallpapers by Rini.'
  },

  // Top Floating Navigation Bar
  navbar: {
    homePillText: 'Home',
    links: [
      { label: 'Magazine', href: '/edits' },
      { label: 'Rankings', href: '/rankings' },
      { label: 'Quotes', href: '/quotes' },
      { label: 'Wallpapers', href: '/wallpapers' },
      { label: 'Glow Quiz', href: '/quiz' },
      { label: 'Community', href: '/gallery' },
    ],
    searchPlaceholder: 'Search lookbooks, rankings, wallpapers...',
    savedCountDefault: 4,
    quizCtaText: 'Take Quiz ✨'
  },

  // Hero Section
  hero: {
    issueBadge: 'ISSUE #28 • GOLDEN HOUR EDITION',
    mainHeadingHtml: 'Feel The Glow.<br />Daily Curated Inspo.',
    subtext: 'Rini curates the freshest teen aesthetic lookbooks, dewy glass skincare routines, bingeable Prime Video rankings, and cozy study spaces.',
    exploreButtonText: 'Explore The Glow →',
    quizButtonText: 'Discover Your Vibe ✨',
    trustBadges: [
      '✦ Free 4K Wallpaper Vault',
      '✦ Updated Every Saturday'
    ],
    tickerItems: [
      'CATCH THE STYLE ✦',
      'CATCH THE GLOW ✦',
      'FEEL THE VIBES ✦',
      'CURATED BY RINI ✦',
      'FREE 4K WALLPAPERS ✦',
      'DAILY TEEN MINDSET ✦'
    ],
    floatingCards: {
      card1: { tag: '✨ Skincare Edit', title: 'Glass Skin Morning' },
      card2: { tag: '📱 Free 4K Vault', title: 'Sunset Horizon Drop' }
    }
  },

  // Stats Strip
  // Intentionally empty. These used to hold hardcoded invented figures
  // ("14,850+ readers", "99.4% satisfaction"). The homepage now computes real
  // counters from the database in `src/pages/index.astro`. Do not put numbers
  // back here — a static array cannot stay true.
  stats: [],

  // Editorial Edits Section
  edits: {
    tag: 'Editorial Magazine',
    title: 'Featured Edits & Lookbooks',
    subtitle: 'Deep-dive guides on dewy skincare rituals, effortless autumn layering, and cozy bedroom aesthetic corners.',
    filterTabs: [
      { key: 'all', label: 'All Stories' },
      { key: 'skincare', label: 'Beauty & Glow' },
      { key: 'fashion', label: 'Fashion Lookbooks' },
      { key: 'decor', label: 'Cozy Spaces' }
    ]
  },

  // Rankings Leaderboard Section
  rankings: {
    tag: "Rini's Leaderboard",
    title: 'Top Ranked: Prime Video & Audiobooks',
    subtitle: 'The top-tier shows and captivating audiobook narrations that defined our aesthetic this season.',
    ctaText: "Get Next Month's List ↗"
  },

  // Daily Mindset Quote Section
  quotes: {
    tag: '✨ Daily Mindset',
    timestamp: 'Updated for today',
    defaultQuote: 'You do not just exist; you arrive, you radiate, and you create your own light in every room you step into.',
    defaultAuthor: "Rini’s Golden Hour Reflection"
  },

  // Wallpapers Vault Section
  wallpapers: {
    tag: 'Free Aesthetic Downloads',
    title: 'Free 4K Aesthetic Wallpaper Vault',
    subtitle: 'Handcrafted ultra high-resolution wallpapers for iPhone, iPad, and Desktop. 1-click free download forever.',
    filterTabs: [
      { key: 'all', label: 'All Wallpapers' },
      { key: 'mobile', label: 'iPhone (9:16)' },
      { key: 'desktop', label: 'Desktop 4K' }
    ]
  },

  // Interactive Glow Personality Quiz
  quiz: {
    headerPill: '✨ Interactive Experience',
    heading: 'Discover Your Glow Vibe',
    description: 'Answer 3 intuitive questions to find your personal aesthetic aura, wardrobe match, and signature playlist vibe.',
    trustPills: [
      '✦ 100% Free',
      '✦ Instant Badge',
      '✦ No Sign-Up Needed'
    ]
  },

  // Community Creations Gallery Section
  gallery: {
    tag: 'Community Creations',
    title: 'The Teen Gallery',
    subtitle: 'Aesthetic nail art, room setups, and style submissions from the TeenTimeGlow community. Tag #TeenTimeGlow to be featured.',
    submitBtnText: '✨ Submit Your Creation'
  },

  // Footer Section
  footer: {
    logoText: 'teen time glow.',
    headline: 'Join The Glow Club',
    description: 'Weekly curated lookbook drops, secret 4K wallpapers, and teen mindset letters by Rini directly in your inbox.',
    mascotCaption: '“Sip, glow, and romanticize everyday moments.”',
    copyright: '© 2026 TeenTimeGlow (teentimeglow.me). Curated with love by Rini. All rights reserved.',
    socials: [
      { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/teentimeglow' },
      { name: 'TikTok', icon: '🎵', url: 'https://www.tiktok.com/@teentimeglow' },
      { name: 'Pinterest', icon: 'P', url: 'https://www.pinterest.com/teentimeglow' },
      { name: 'Spotify', icon: '🎧', url: 'https://open.spotify.com/user/teentimeglow' },
      { name: 'YouTube', icon: '▶', url: 'https://www.youtube.com/@teentimeglow' }
    ]
  }
};
