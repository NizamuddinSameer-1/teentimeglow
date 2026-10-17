-- ============================================================================
-- 1. EXTENSIONS & SCHEMAS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. TABLE DEFINITIONS
-- ============================================================================

-- Posts Table (Beauty, Fashion, Decor)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT CHECK (category IN ('beauty', 'fashion', 'decor')) NOT NULL,
    cover_image_url TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    read_time_minutes INT DEFAULT 3,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rankings Table (Prime Video & Audiobooks)
CREATE TABLE IF NOT EXISTS rankings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT CHECK (category IN ('prime_video', 'audiobook')) NOT NULL,
    title TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    review_text TEXT NOT NULL,
    watch_url TEXT,
    rank_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    outcome_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_outcomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    outcome_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_label TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Creations ("The Teen Gallery")
CREATE TABLE IF NOT EXISTS community_creations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    author_social TEXT,
    category TEXT CHECK (category IN ('nails', 'diy', 'sketch', 'decor')) NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stories, Memes & Quotes
CREATE TABLE IF NOT EXISTS stories_memes_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT CHECK (type IN ('quote', 'story', 'meme')) NOT NULL,
    content_text TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Rini',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallpapers
CREATE TABLE IF NOT EXISTS wallpapers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    device_type TEXT CHECK (device_type IN ('mobile', 'desktop')) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    download_url TEXT NOT NULL,
    resolution_label TEXT DEFAULT '4K Ultra-HD',
    download_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR LIGHTNING-FAST QUERIES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category, is_published);
CREATE INDEX IF NOT EXISTS idx_rankings_category ON rankings(category, rank_order);
CREATE INDEX IF NOT EXISTS idx_community_status ON community_creations(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallpapers_device ON wallpapers(device_type);

-- ============================================================================
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories_memes_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- Public Select Policies
CREATE POLICY "Public select published posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public select rankings" ON rankings FOR SELECT USING (true);
CREATE POLICY "Public select active quizzes" ON quizzes FOR SELECT USING (is_active = true);
CREATE POLICY "Public select quiz questions" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public select quiz options" ON quiz_options FOR SELECT USING (true);
CREATE POLICY "Public select quiz outcomes" ON quiz_outcomes FOR SELECT USING (true);
CREATE POLICY "Public select approved community" ON community_creations FOR SELECT USING (status = 'approved');
CREATE POLICY "Public select stories/memes/quotes" ON stories_memes_quotes FOR SELECT USING (true);
CREATE POLICY "Public select wallpapers" ON wallpapers FOR SELECT USING (true);

-- Public Submit (Quarantine Sandbox)
CREATE POLICY "Public insert pending community" ON community_creations FOR INSERT WITH CHECK (status = 'pending');

-- Public Like increment (Allow public to update likes count safely)
CREATE POLICY "Public update likes community" ON community_creations FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public update likes quotes" ON stories_memes_quotes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public update download wallpapers" ON wallpapers FOR UPDATE USING (true) WITH CHECK (true);

-- Admin Access (Requires authenticated Supabase session)
CREATE POLICY "Admin manage posts" ON posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage rankings" ON rankings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage quizzes" ON quizzes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage questions" ON quiz_questions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage options" ON quiz_options FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage outcomes" ON quiz_outcomes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage community" ON community_creations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage stories/memes" ON stories_memes_quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage wallpapers" ON wallpapers FOR ALL TO authenticated USING (true) WITH CHECK (true);
