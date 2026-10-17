import type { Post, Ranking, Wallpaper, StoryMemeQuote, CommunityCreation, Quiz } from '@/types/database';

export const fallbackPosts: Post[] = [
  {
    id: '1',
    title: 'The Glass Skin Blueprint: 5 Korean Skincare Steps That Actually Work',
    slug: 'glass-skin-blueprint',
    category: 'beauty',
    cover_image_url: '/assets/feature-skincare.jpg',
    excerpt: 'Discover the exact layering ritual for that hydrated, glazed-donut morning glow without breaking the bank.',
    content_html: `
      <h2>The Philosophy of Glass Skin</h2>
      <p>Glass skin isn’t about wearing layers of illuminating foundation or synthetic glitter. In Korean skincare traditions (known as <em>yuri pibu</em>), it represents a skin barrier so deeply hydrated, plump, and smooth that it reflects light naturally like clean glass.</p>
      
      <blockquote>"Hydration is not a single product; it is a layering conversation between moisture and your skin barrier." — Rini</blockquote>

      <h2>Step 1: Gentle Double Cleansing</h2>
      <p>Never strip your moisture mantle with foaming sulfates. Begin with a calming cleansing oil or balm containing jojoba or green tea seed oil. Massage for 60 seconds to melt away SPF and impurities, then emulsify with warm water. Follow up with a pH 5.5 hydrating water gel cleanser.</p>

      <h2>Step 2: The Milky Hydrating Toner</h2>
      <p>Instead of harsh astringents, pour a nickel-sized puddle of rice water or ceramide toner into your palms. Pat gently into damp skin using the 3-Skin Method (patting three thin layers consecutively). Your skin will instantly drink it up and feel bouncy.</p>

      <h2>Step 3: Hyaluronic Acid & Beta-Glucan Serum</h2>
      <p>Apply your serum while the skin is still dewy from toner. Beta-glucan actually holds 20% more moisture than hyaluronic acid, providing deep cushioning that smooths texture and calms redness.</p>

      <h2>Step 4: Ceramide Barrier Cushion Cream</h2>
      <p>Lock that hydration in! Look for a non-comedogenic gel cream packed with Centella Asiatica (Cica), panthenol, and triple ceramides. This creates a soft-focus protective seal that lasts throughout school or work.</p>

      <h2>Step 5: Dewy SPF 50+ Sunscreen</h2>
      <p>The non-negotiable final step. Modern chemical filters like chemical UV essences melt into the skin like water lotion with zero white cast and leave behind that iconic golden-hour glaze.</p>
    `,
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
    content_html: `
      <h2>The Proportions of Autumn Elegance</h2>
      <p>Fall fashion is all about tactile contrast: heavy cable-knit wools paired with crisp woven pleats, soft cashmere against sleek leather loafers. Here is how we balance volume to keep silhouettes effortless rather than bulky.</p>

      <blockquote>"When the weather turns crisp, your outfit should feel like a warm embrace with high-fashion intent." — Rini</blockquote>

      <h2>Formula 1: The Chunky Fisherman Knit + Tennis Pleat</h2>
      <p>Choose an oversized oatmeal or cream crewneck that drops slightly past the hips. Pair with a deep charcoal or forest green pleated mini skirt. Allow just 2-3 inches of the pleats to peek below the hem for that chic Ivy League contrast.</p>

      <h2>Formula 2: Footwear Foundations</h2>
      <p>Ground the feminine pleats with structured leather penny loafers or Mary Janes. Add ribbed ecru crew socks pulled slightly slouchy around the ankles to bring warmth and athletic playfulness.</p>

      <h2>Formula 3: Vintage Accessories</h2>
      <p>Elevate the look with a slim tortoiseshell headband, wire-rimmed reading glasses, and an emerald green leather shoulder tote.</p>
    `,
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
    content_html: `
      <h2>The Bedroom as an Emotional Sanctuary</h2>
      <p>Your room is where you decompress after long study sessions and recharge your creative battery. You do not need thousands of dollars to create an ethereal, peaceful sanctuary — just intentional lighting and tactile warmth.</p>

      <blockquote>"Lighting makes 80% of bedroom atmosphere. Banish overhead ceiling fluorescents forever." — Rini</blockquote>

      <h2>Step 1: Ambient Sunset Lamps & Warm Bulbs</h2>
      <p>Replace cool 5000K white LED bulbs with warm 2200K–2700K incandescent warmth. Add a 10W sunset projection lamp angled at an ivory corner to create an eternal golden hour glow even on gloomy days.</p>

      <h2>Step 2: Woven Bedding & Cloud Textures</h2>
      <p>Swap synthetic comforters for pre-washed cotton or linen duvet covers in sand, oat, or matcha green. Layer a waffle-weave throw blanket across the foot of the bed for lived-in comfort.</p>

      <h2>Step 3: Botanical Ceramic Accents</h2>
      <p>Pick up thrifted stone mugs or ceramic bud vases for dried baby’s breath, eucalyptus, and lavender. The subtle herbal scent naturally signals your mind to unwind.</p>
    `,
    read_time_minutes: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Parisian Chic & Effortless Autumn Layering',
    slug: 'parisian-chic-layering',
    category: 'fashion',
    cover_image_url: '/assets/arrival-1.jpg',
    excerpt: 'Mastering timeless capsule wardrobes: trenches, tailored trousers, and soft neutral palettes.',
    content_html: `
      <h2>The Art of Nonchalant Parisian Dressing</h2>
      <p>The essence of Parisian style is looking impeccably put-together without appearing as though you spent more than three minutes planning in the mirror. It relies on high-quality basics styled with crisp attitude.</p>

      <h2>The Heritage Trench Coat</h2>
      <p>An oversized beige or taupe double-breasted trench is the ultimate transitional layer. Tie the belt loosely at the back rather than buckling it in the front to maintain fluid motion as you walk.</p>

      <h2>Relaxed Tailored Wool Trousers</h2>
      <p>Ditch tight skinny jeans for high-waisted, wide-leg pleated trousers in camel or espresso brown. They pool gracefully over minimal white leather trainers or ankle boots.</p>
    `,
    read_time_minutes: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Ceramide Magic: Restoring Your Moisture Barrier Overnight',
    slug: 'ceramide-barrier-repair',
    category: 'beauty',
    cover_image_url: '/assets/arrival-3.jpg',
    excerpt: 'Waking up with calm, radiant, un-irritated skin after accidental over-exfoliation or dry winter winds.',
    content_html: `
      <h2>Recognizing a Damaged Moisture Mantle</h2>
      <p>If your skin stings when applying basic moisturizer, looks shiny yet feels tight, or experiences random flaky patches, your acid mantle has been compromised by harsh actives or weather extremes.</p>

      <h2>The 72-Hour Reset Routine</h2>
      <p>Pause all retinoids, AHA/BHA exfoliants, and vitamin C. Wash only with lukewarm water or an ultra-mild milk cleanser. Slather a cream rich in 3:1:1 physiological ratio of ceramides, cholesterol, and fatty acids before sleep.</p>
    `,
    read_time_minutes: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Curating The Ultimate Study Sanctuary: Warm Lighting & Scented Rituals',
    slug: 'study-aesthetic-sanctuary',
    category: 'decor',
    cover_image_url: '/assets/gallery-aesthetic-ootd.jpg',
    excerpt: 'Design an inspiring study desk nook that boosts focus, dopamine, and academic productivity.',
    content_html: `
      <h2>The Psychology of an Inspiring Desk Space</h2>
      <p>When your workspace looks beautiful and smells like cedarwood or vanilla bean, sitting down to study ceases to feel like a chore. It becomes a peaceful ritual you look forward to every evening.</p>

      <h2>Cable Management & Visual Calm</h2>
      <p>Tuck away dangling wires using under-desk adhesive trays. A clean wood desk mat creates a dedicated zone for your laptop, notebook, and ceramic pen cup.</p>
    `,
    read_time_minutes: 4,
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
    tags: ['Romance', 'Coming of Age', 'Cousins Beach Vibe'],
    review_text: 'The ultimate beachside summer romance nostalgia. Perfect pacing, iconic soundtrack, and dreamy golden hour cinematography.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    category: 'prime_video',
    title: 'Daisy Jones & The Six',
    cover_image_url: '/assets/ranking-daisy.jpg',
    rating: 4.9,
    tags: ['70s Vintage', 'Music', 'Fleetwood Mac Aesthetic'],
    review_text: 'Captures the gritty yet glamorous 1970s rock music scene with incredible original songs and timeless vintage styling.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    category: 'prime_video',
    title: 'Maxton Hall — The World Between Us',
    cover_image_url: '/assets/bestseller-2.jpg',
    rating: 4.8,
    tags: ['Dark Academia', 'Enemies to Lovers', 'Oxford Drama'],
    review_text: 'Obsession-worthy tension, gorgeous boarding school aesthetic, and an electric slow burn between Ruby and James.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    category: 'prime_video',
    title: 'The Wilds',
    cover_image_url: '/assets/bestseller-4.jpg',
    rating: 4.7,
    tags: ['Mystery', 'Survival', 'Complex Girlhood'],
    review_text: 'High-stakes teenage survival with deeply raw backstories and unforgettable female friendships.',
    watch_url: 'https://www.amazon.com/primevideo',
    rank_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    category: 'audiobook',
    title: 'The Seven Husbands of Evelyn Hugo',
    cover_image_url: '/assets/ranking-evelyn.jpg',
    rating: 5,
    tags: ['Old Hollywood', 'Secrets', 'Multi-Voice Narration'],
    review_text: 'An unforgettable storytelling journey through old Hollywood elegance, scandalous secrets, and heart-wrenching emotional depth.',
    watch_url: 'https://www.audible.com',
    rank_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    category: 'audiobook',
    title: 'Atomic Habits by James Clear',
    cover_image_url: '/assets/ranking-habits.jpg',
    rating: 4.9,
    tags: ['Mindset', 'Productivity', 'Self-Mastery'],
    review_text: 'The absolute gold standard for morning consistency, study flow, and building lasting skincare & fitness rituals.',
    watch_url: 'https://www.audible.com',
    rank_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    category: 'audiobook',
    title: 'A Good Girl’s Guide to Murder',
    cover_image_url: '/assets/bestseller-3.jpg',
    rating: 4.8,
    tags: ['True Crime Podcast', 'YA Mystery', 'BBC Cast'],
    review_text: 'Full-cast audio immersion with mock podcast interviews, phone calls, and nail-biting small-town sleuthing.',
    watch_url: 'https://www.audible.com',
    rank_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    category: 'audiobook',
    title: 'Better Than the Movies',
    cover_image_url: '/assets/bestseller-1.jpg',
    rating: 4.8,
    tags: ['Rom-com Romantics', 'Fake Dating', 'Taylor Swift Soundtrack'],
    review_text: 'Pure serotonin comfort listen. Wes Bennett is the blueprint for childhood best friends to lovers.',
    watch_url: 'https://www.audible.com',
    rank_order: 4,
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
  },
  {
    id: '4',
    author_name: 'Elena R.',
    author_social: '@elenavibes',
    category: 'decor',
    image_url: '/assets/feature-decor.jpg',
    caption: 'Cozy fairy light bookshelf setup & scented candle nook 🕯️',
    status: 'approved',
    likes_count: 215,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    author_name: 'Aria M.',
    author_social: '@aria.style',
    category: 'fashion',
    image_url: '/assets/arrival-1.jpg',
    caption: 'Oversized trench & vintage chunky loafers for Saturday coffee run 🧥',
    status: 'approved',
    likes_count: 310,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    author_name: 'Zoe T.',
    author_social: '@zoenailart',
    category: 'nails',
    image_url: '/assets/arrival-3.jpg',
    caption: 'Micro-pearl glazed milk jelly manicure for autumn ✨',
    status: 'approved',
    likes_count: 176,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    author_name: 'Hannah B.',
    author_social: '@hannahfits',
    category: 'fashion',
    image_url: '/assets/feature-fashion.jpg',
    caption: 'Monochrome knit layered fit inspired by Rini’s capsule guide 🍂',
    status: 'approved',
    likes_count: 254,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    author_name: 'Lily W.',
    author_social: '@cozylily',
    category: 'decor',
    image_url: '/assets/arrival-2.jpg',
    caption: 'Sunday morning linen bedding & warm golden hour glow 🌅',
    status: 'approved',
    likes_count: 198,
    created_at: new Date().toISOString()
  }
];
