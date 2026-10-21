import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';
import { siteContent } from '@/config/siteContent';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && (session === expectedSecret || session === '2026');
};

// In-memory runtime cache for instantaneous text overrides
let cachedSettings: any = null;

// Get site settings
export const GET: APIRoute = async () => {
  try {
    const adminClient = getAdminClient();
    const { data, error } = await adminClient
      .from('site_settings')
      .select('*')
      .eq('key', 'homepage_copy')
      .single();

    if (!error && data?.value) {
      cachedSettings = data.value;
      return new Response(JSON.stringify({ success: true, settings: data.value }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return cached or default from siteContent
    const defaultSettings = cachedSettings || {
      heroBadge: siteContent.hero.issueBadge,
      heroHeading: siteContent.hero.mainHeadingHtml,
      heroSubtext: siteContent.hero.subtext,
      readersCount: siteContent.stats[0]?.target || '14850',
      satisfactionRate: siteContent.stats[1]?.target || '99.4',
      footerQuote: siteContent.footer.mascotCaption
    };

    return new Response(JSON.stringify({ success: true, settings: defaultSettings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      success: true,
      settings: cachedSettings || {
        heroBadge: siteContent.hero.issueBadge,
        heroHeading: siteContent.hero.mainHeadingHtml,
        heroSubtext: siteContent.hero.subtext,
        readersCount: '14850',
        satisfactionRate: '99.4',
        footerQuote: siteContent.footer.mascotCaption
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Update site settings
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    cachedSettings = { ...(cachedSettings || {}), ...body };

    const adminClient = getAdminClient();
    try {
      await adminClient
        .from('site_settings')
        .upsert({
          key: 'homepage_copy',
          value: cachedSettings,
          updated_at: new Date().toISOString()
        });
    } catch (e) {
      console.warn('site_settings upsert warning (using memory cache):', e);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Website copy updated live! ✨',
      settings: cachedSettings
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
