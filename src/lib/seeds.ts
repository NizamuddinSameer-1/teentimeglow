import type { Post, Ranking, Wallpaper, StoryMemeQuote, CommunityCreation, Quiz } from '@/types/database';

export const fallbackPosts: Post[] = [
  {
    id: '1',
    title: 'The Glass Skin Blueprint: 5 Korean Skincare Steps That Actually Work',
    slug: 'glass-skin-blueprint',
    category: 'beauty',
    cover_image_url: '/assets/feature-skincare.jpg',
    excerpt: 'Discover the exact layering ritual for that hydrated, glazed-donut morning glow without breaking the bank.',
    content_html: '<p>The secret to glass skin is gentle hydration layering: double cleansing, milky toner, hyaluronic acid, ceramide barrier cream, and SPF 50.</p>',
    read_time_minutes: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Oversized Knits & Pleated Minis: The Curated Fall Lookbook',
    slug: 'fall-knit-lookbook',
    category: 'fashion',
    cover_image_url: '/assets/feature-fashion.jpg',
    excerpt: 'Aesthetic styling formulas combining cozy vintage textures with modern streetwear accents.',
    content_html: '<p>Balance oversized knit sweaters with structured pleated mini skirts and chunky loafers with ankle socks.</p>',
    read_time_minutes: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Dreamy Room Decor Under $50: Warm Light & Cloud Aesthetic',
    slug: 'dreamy-room-decor-under-50',
    category: 'decor',
    cover_image_url: '/assets/feature-decor.jpg',
    excerpt: 'How to transform your bedroom into a Pinterest-worthy sanctuary using warm sunset lamps, linen, and ceramic jars.',
    content_html: '<p>Lighting makes 80% of bedroom ambiance. Opt for 2700K warm incandescent or LED tones with linen drapes.</p>',
    read_time_minutes: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const fallbackRankings: Ranking[] = [
  {
    id: '1',
    category: 'prime_video',
    title: 'The Summer I Turned Pretty',
    cover_image_url: '/assets/ranking-summer.jpg',
    rating: 5,
    tags: ['Romance', 'Coming of Age', 'Beach Vibe'],
    review_text: 'The ultimate beachside summer romance nostalgia. Perfect pacing, soundtrack, and dreamy cinematography.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    category: 'prime_video',
    title: 'Daisy Jones & The Six',
    cover_image_url: '/assets/ranking-daisy.jpg',
    rating: 5,
    tags: ['70s Vintage', 'Music', 'Drama'],
    review_text: 'Captures the gritty yet glamorous 1970s rock music scene with incredible original songs and styling.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    category: 'audiobook',
    title: 'The Seven Husbands of Evelyn Hugo',
    cover_image_url: '/assets/ranking-evelyn.jpg',
    rating: 5,
    tags: ['Fiction', 'Hollywood', 'Drama'],
    review_text: 'An unforgettable storytelling journey through old Hollywood elegance, secrets, and raw heartbreak.',
    watch_url: 'https://www.audible.com',
    rank_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    category: 'audiobook',
    title: 'Atomic Habits by James Clear',
    cover_image_url: '/assets/ranking-habits.jpg',
    rating: 5,
    tags: ['Mindset', 'Productivity', 'Self-Growth'],
    review_text: 'Game-changer for daily consistency, academic flow, and building healthy skincare habits.',
    watch_url: 'https://www.audible.com',
    rank_order: 2,
    created_at: new Date().toISOString()
  }
];

export const fallbackQuotes: StoryMemeQuote[] = [
  {
    id: '1',
    type: 'quote',
    content_text: 'You do not need to have everything figured out right now. Just focus on blooming in your own season. ✨',
    author: 'Rini • Blooming Mindset',
    likes_count: 284,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    type: 'quote',
    content_text: 'Small daily habits create massive transformations. Romanticize your mornings and protect your peace. 🌸',
    author: 'Rini • Morning Rituals',
    likes_count: 412,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    type: 'quote',
    content_text: 'True confidence comes from being comfortable with who you are when no one is watching. 💫',
    author: 'Rini • Confidence & Glow',
    likes_count: 356,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    type: 'quote',
    content_text: 'Your energy is your sacred aesthetic. Do not give it away to places that do not nurture your light. 🌿',
    author: 'Rini • Self-Care & Peace',
    likes_count: 520,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    type: 'quote',
    content_text: 'Quiet study sessions with hot matcha and big dreams are building the life you are going to live tomorrow. ☕',
    author: 'Rini • Study Aesthetic',
    likes_count: 468,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    type: 'quote',
    content_text: 'You do not just exist; you arrive, you radiate, and you create your own light in every room you step into. 🌅',
    author: 'Rini • Golden Hour Reflection',
    likes_count: 615,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    type: 'quote',
    content_text: 'Be the kind of girl who celebrates other girls and never dims her own sparkle. 💖',
    author: 'Rini • Sisterhood & Light',
    likes_count: 389,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    type: 'quote',
    content_text: 'Perfection is boring; glowing with authenticity and messy joy is unforgettable. 🎨',
    author: 'Rini • Creative Spirit',
    likes_count: 495,
    created_at: new Date().toISOString()
  }
];

export const fallbackWallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Cotton Candy Sunset Clouds',
    device_type: 'mobile',
    thumbnail_url: '/assets/wallpaper-clouds.jpg',
    download_url: '/assets/wallpaper-clouds.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 1420,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Iced Matcha Latte Minimalist',
    device_type: 'mobile',
    thumbnail_url: '/assets/wallpaper-matcha.jpg',
    download_url: '/assets/wallpaper-matcha.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 980,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Golden Hour Glow Horizon',
    device_type: 'desktop',
    thumbnail_url: '/assets/wallpaper-sunset.jpg',
    download_url: '/assets/wallpaper-sunset.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 1850,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Cozy Sunday Autumn Warmth',
    device_type: 'mobile',
    thumbnail_url: '/assets/feature-decor.jpg',
    download_url: '/assets/feature-decor.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 730,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Vintage Editorial Studio Glow',
    device_type: 'desktop',
    thumbnail_url: '/assets/hero-model.jpg',
    download_url: '/assets/hero-model.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 1210,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Parisian Rosewater & Linen',
    device_type: 'mobile',
    thumbnail_url: '/assets/arrival-2.jpg',
    download_url: '/assets/arrival-2.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 640,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Clean Girl Dewy Glass Aesthetic',
    device_type: 'desktop',
    thumbnail_url: '/assets/feature-skincare.jpg',
    download_url: '/assets/feature-skincare.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 1105,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Midnight Mindset & Journal',
    device_type: 'mobile',
    thumbnail_url: '/assets/gallery-journal.jpg',
    download_url: '/assets/gallery-journal.jpg',
    resolution_label: '4K Ultra-HD',
    download_count: 890,
    created_at: new Date().toISOString()
  }
];

export const fallbackCommunity: CommunityCreation[] = [
  {
    id: '1',
    author_name: 'Chloe S.',
    author_social: '@chloeglows',
    category: 'nails',
    image_url: '/assets/gallery-nails.jpg',
    caption: 'Glazed chrome French tips inspired by Rini’s lookbook! 💅',
    status: 'approved',
    likes_count: 142,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    author_name: 'Maya K.',
    author_social: '@mayasjournal',
    category: 'sketch',
    image_url: '/assets/gallery-journal.jpg',
    caption: 'My morning journaling aesthetic with cold brew ☕',
    status: 'approved',
    likes_count: 98,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    author_name: 'Sophia L.',
    author_social: '@sophia.ootd',
    category: 'diy',
    image_url: '/assets/gallery-aesthetic-ootd.jpg',
    caption: 'DIY pastel ribbon room accent wall! Loved doing this ✨',
    status: 'approved',
    likes_count: 187,
    created_at: new Date().toISOString()
  }
];
