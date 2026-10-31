const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://txuubvzxmawjqqduavcv.supabase.co';
// The service-role key must come from the environment (.env / Vercel), never source control.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error('\n[seed] SUPABASE_SERVICE_ROLE_KEY is not set.\n');
  console.error('  1. Put SUPABASE_SERVICE_ROLE_KEY=... in the project .env');
  console.error('  2. Then run:  node --env-file=.env supabase/seed.cjs');
  console.error('     (Node 20+ auto-loads .env that way)\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding initial data into Supabase...');

  // 1. Posts
  const { error: errPosts } = await supabase.from('posts').upsert([
    {
      title: 'The Glass Skin Blueprint: 5 Korean Skincare Steps That Actually Work',
      slug: 'glass-skin-blueprint',
      category: 'beauty',
      cover_image_url: '/assets/feature-skincare.jpg',
      excerpt: 'Discover the exact layering ritual for that hydrated, glazed-donut morning glow without breaking the bank.',
      content_html: '<p>The secret to glass skin is gentle hydration layering: double cleansing, milky toner, hyaluronic acid, ceramide barrier cream, and SPF 50.</p>',
      read_time_minutes: 4,
      is_published: true
    },
    {
      title: 'Oversized Knits & Pleated Minis: The Curated Fall Lookbook',
      slug: 'fall-knit-lookbook',
      category: 'fashion',
      cover_image_url: '/assets/feature-fashion.jpg',
      excerpt: 'Aesthetic styling formulas combining cozy vintage textures with modern streetwear accents.',
      content_html: '<p>Balance oversized knit sweaters with structured pleated mini skirts and chunky loafers with ankle socks.</p>',
      read_time_minutes: 3,
      is_published: true
    },
    {
      title: 'Dreamy Room Decor Under $50: Warm Light & Cloud Aesthetic',
      slug: 'dreamy-room-decor-under-50',
      category: 'decor',
      cover_image_url: '/assets/feature-decor.jpg',
      excerpt: 'How to transform your bedroom into a Pinterest-worthy sanctuary using warm sunset lamps, linen, and ceramic jars.',
      content_html: '<p>Lighting makes 80% of bedroom ambiance. Opt for 2700K warm incandescent or LED tones with linen drapes.</p>',
      read_time_minutes: 5,
      is_published: true
    }
  ], { onConflict: 'slug' });
  if (errPosts) console.error('Error seeding posts:', errPosts);

  // 2. Rankings
  const { error: errRank } = await supabase.from('rankings').upsert([
    {
      category: 'prime_video',
      title: 'The Summer I Turned Pretty',
      cover_image_url: '/assets/ranking-summer.jpg',
      rating: 5,
      tags: ['Romance', 'Coming of Age', 'Beach Vibe'],
      review_text: 'The ultimate beachside summer romance nostalgia. Perfect pacing, soundtrack, and dreamy cinematography.',
      watch_url: 'https://www.amazon.com/primevideo',
      rank_order: 1
    },
    {
      category: 'prime_video',
      title: 'Daisy Jones & The Six',
      cover_image_url: '/assets/ranking-daisy.jpg',
      rating: 5,
      tags: ['70s Vintage', 'Music', 'Drama'],
      review_text: 'Captures the gritty yet glamorous 1970s rock music scene with incredible original songs and styling.',
      watch_url: 'https://www.amazon.com/primevideo',
      rank_order: 2
    },
    {
      category: 'audiobook',
      title: 'The Seven Husbands of Evelyn Hugo',
      cover_image_url: '/assets/ranking-evelyn.jpg',
      rating: 5,
      tags: ['Fiction', 'Hollywood', 'Drama'],
      review_text: 'An unforgettable storytelling journey through old Hollywood elegance, secrets, and raw heartbreak.',
      watch_url: 'https://www.audible.com',
      rank_order: 1
    },
    {
      category: 'audiobook',
      title: 'Atomic Habits by James Clear',
      cover_image_url: '/assets/ranking-habits.jpg',
      rating: 5,
      tags: ['Mindset', 'Productivity', 'Self-Growth'],
      review_text: 'Game-changer for daily consistency, academic flow, and building healthy skincare habits.',
      watch_url: 'https://www.audible.com',
      rank_order: 2
    }
  ]);
  if (errRank) console.error('Error seeding rankings:', errRank);

  // 3. Quotes
  const { error: errQuotes } = await supabase.from('stories_memes_quotes').upsert([
    {
      type: 'quote',
      content_text: 'You do not need to have everything figured out right now. Just focus on blooming in your own season. ✨',
      author: 'Rini',
      likes_count: 284
    },
    {
      type: 'quote',
      content_text: 'Small daily habits create massive transformations. Romanticize your mornings and protect your peace. 🌸',
      author: 'Rini',
      likes_count: 412
    },
    {
      type: 'quote',
      content_text: 'True confidence comes from being comfortable with who you are when no one is watching. 💫',
      author: 'Rini',
      likes_count: 356
    }
  ]);
  if (errQuotes) console.error('Error seeding quotes:', errQuotes);

  // 4. Wallpapers
  const { error: errWall } = await supabase.from('wallpapers').upsert([
    {
      title: 'Cotton Candy Sunset Clouds',
      device_type: 'mobile',
      thumbnail_url: '/assets/wallpaper-clouds.jpg',
      download_url: '/assets/wallpaper-clouds.jpg',
      resolution_label: '4K Ultra-HD',
      download_count: 1240
    },
    {
      title: 'Iced Matcha Latte Minimalist',
      device_type: 'mobile',
      thumbnail_url: '/assets/wallpaper-matcha.jpg',
      download_url: '/assets/wallpaper-matcha.jpg',
      resolution_label: '4K Ultra-HD',
      download_count: 980
    },
    {
      title: 'Golden Hour Glow Horizon',
      device_type: 'desktop',
      thumbnail_url: '/assets/wallpaper-sunset.jpg',
      download_url: '/assets/wallpaper-sunset.jpg',
      resolution_label: '4K Ultra-HD',
      download_count: 1650
    }
  ]);
  if (errWall) console.error('Error seeding wallpapers:', errWall);

  // 5. Community Creations
  const { error: errComm } = await supabase.from('community_creations').upsert([
    {
      author_name: 'Chloe S.',
      author_social: '@chloeglows',
      category: 'nails',
      image_url: '/assets/gallery-nails.jpg',
      caption: 'Glazed chrome French tips inspired by Rini’s lookbook! 💅',
      status: 'approved',
      likes_count: 142
    },
    {
      author_name: 'Maya K.',
      author_social: '@mayasjournal',
      category: 'sketch',
      image_url: '/assets/gallery-journal.jpg',
      caption: 'My morning journaling aesthetic with cold brew ☕',
      status: 'approved',
      likes_count: 98
    },
    {
      author_name: 'Sophia L.',
      author_social: '@sophia.ootd',
      category: 'diy',
      image_url: '/assets/gallery-aesthetic-ootd.jpg',
      caption: 'DIY pastel ribbon room accent wall! Loved doing this ✨',
      status: 'approved',
      likes_count: 187
    }
  ]);
  if (errComm) console.error('Error seeding community creations:', errComm);

  // 6. Quizzes
  const { data: quizData, error: errQuiz } = await supabase.from('quizzes').upsert([
    {
      title: 'What Is Your Signature Teen Glow Aesthetic?',
      slug: 'signature-glow-aesthetic',
      description: 'Discover your personalized lookbook, skincare formula, and lifestyle vibe in 5 quick questions.',
      cover_image_url: '/assets/hero-model.jpg',
      is_active: true
    }
  ], { onConflict: 'slug' }).select();
  if (errQuiz) console.error('Error seeding quiz:', errQuiz);

  if (quizData && quizData.length > 0) {
    const quizId = quizData[0].id;

    // Outcomes
    await supabase.from('quiz_outcomes').upsert([
      {
        quiz_id: quizId,
        outcome_key: 'clean_girl',
        title: 'Clean Girl Minimalist ✨',
        description: 'You thrive on slicked-back buns, dewy skin, gold hoops, iced matchas, and capsule wardrobes. Your energy is effortless, organized, and luminous.',
        badge_label: '98% Match',
        image_url: '/assets/feature-skincare.jpg'
      },
      {
        quiz_id: quizId,
        outcome_key: 'cozy_vanilla',
        title: 'Cozy Vanilla Girl 🍦',
        description: 'Chunky knit cardigans, warm vanilla body mists, reading by candlelight, and soft beige room aesthetics are your soulmate vibe.',
        badge_label: '95% Match',
        image_url: '/assets/feature-fashion.jpg'
      },
      {
        quiz_id: quizId,
        outcome_key: 'downtown_street',
        title: 'Downtown Cool-Girl 🎸',
        description: 'Oversized leather jackets, vintage headphones, indie rock playlists, film photography, and effortless street style define you.',
        badge_label: '92% Match',
        image_url: '/assets/feature-decor.jpg'
      }
    ]);

    // Question 1
    const { data: q1 } = await supabase.from('quiz_questions').upsert([
      {
        quiz_id: quizId,
        question_text: 'What is your ideal dream Saturday morning?',
        question_order: 1
      }
    ]).select();

    if (q1 && q1.length > 0) {
      await supabase.from('quiz_options').upsert([
        { question_id: q1[0].id, option_text: 'Pilates class followed by an iced oat latte and fresh flowers', outcome_key: 'clean_girl' },
        { question_id: q1[0].id, option_text: 'Sleeping in, warm cinnamon tea, and reading in cozy blankets', outcome_key: 'cozy_vanilla' },
        { question_id: q1[0].id, option_text: 'Thrifting downtown with oversized headphones and a camera', outcome_key: 'downtown_street' }
      ]);
    }

    // Question 2
    const { data: q2 } = await supabase.from('quiz_questions').upsert([
      {
        quiz_id: quizId,
        question_text: 'What is your non-negotiable holy-grail beauty product?',
        question_order: 2
      }
    ]).select();

    if (q2 && q2.length > 0) {
      await supabase.from('quiz_options').upsert([
        { question_id: q2[0].id, option_text: 'Peptide glazed lip treatment & glowing skin tint', outcome_key: 'clean_girl' },
        { question_id: q2[0].id, option_text: 'Warm vanilla body oil & nourishing rosewater mist', outcome_key: 'cozy_vanilla' },
        { question_id: q2[0].id, option_text: 'Smudged brown eyeliner & tinted brow gel', outcome_key: 'downtown_street' }
      ]);
    }
  }

  console.log('Seeding completed successfully!');
}

seed().catch(console.error);
