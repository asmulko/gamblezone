import { NextResponse, type NextRequest } from 'next/server';
import { getCasinoBySlug, getActiveAffiliateLink } from '@/lib/casinos';
import { defaultMarketId } from '@/config/markets';

/**
 * Affiliate redirect handler.
 *
 * Security properties:
 * - No user-supplied destination URL is ever honoured (no open redirect).
 * - The destination comes only from our server-side data.
 * - The destination host must pass a server-side allowlist.
 * - Only a minimal, non-PII click event is logged.
 */

const ALLOWED_HOSTS = new Set<string>([
  // Real affiliate partners
  'www.redchips.com', 'redchips.com',
  'immerion.partners',
  'impressariocasino.com', 'www.impressariocasino.com',
  'gamblezenpartners.com', 'www.gamblezenpartners.com',
  'gamblezen87.com', 'www.gamblezen87.com',
  'immerion4.com', 'www.immerion4.com',
  'playrainbet.com', 'www.playrainbet.com'
]);

function isAllowedDestination(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

function sanitize(value: string | null, max = 40): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, max);
  return cleaned || undefined;
}

export function GET(
  request: NextRequest,
  { params }: { params: { casino: string } },
) {
  const { casino: slug } = params;
  const origin = request.nextUrl.origin;

  const casino = getCasinoBySlug(slug);
  if (!casino || casino.status !== 'active') {
    return NextResponse.redirect(`${origin}/en/casinos`, 302);
  }

  const market = defaultMarketId;
  const link = getActiveAffiliateLink(casino, market);
  if (!link || !isAllowedDestination(link.destinationUrl)) {
    return NextResponse.redirect(`${origin}/en/casinos/${slug}`, 302);
  }

  // Minimal, non-PII click event. In production this would be persisted or sent
  // to a privacy-friendly analytics endpoint. We never log IPs or query PII.
  const clickEvent = {
    casinoId: casino.id,
    affiliateLinkId: link.id,
    campaign: sanitize(request.nextUrl.searchParams.get('campaign')),
    placement: sanitize(request.nextUrl.searchParams.get('placement')),
    market,
    createdAt: new Date().toISOString(),
  };
  console.info('[affiliate_click]', JSON.stringify(clickEvent));

  return NextResponse.redirect(link.destinationUrl, 302);
}
