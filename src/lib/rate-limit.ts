/**
 * Simple per-instance sliding-window rate limiter (Rule 5.3 in the brain).
 *
 * State is in-isolate memory: on Vercel this throttles per Lambda instance,
 * which blunts brute force and bot scraping even though a determined
 * distributed attack can spread across instances. Per-IP keying uses the
 * edge-provided x-forwarded-for chain.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Opportunistic memory upkeep so abandoned windows don't accumulate.
  if (hits.size > 2000) {
    for (const [k, times] of hits) {
      const live = times.filter((t) => now - t < windowMs);
      if (live.length === 0) hits.delete(k);
      else hits.set(k, live);
    }
  }

  const times = (hits.get(key) || []).filter((t) => now - t < windowMs);
  times.push(now);
  hits.set(key, times);
  return times.length > limit;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
