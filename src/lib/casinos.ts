import { casinos } from '@/data/casinos';
import { defaultMarketId } from '@/config/markets';
import type { AffiliateLink, Casino, CasinoOffer } from '@/types/casino';

export function getAllCasinos(): Casino[] {
  return [...casinos]
    .filter((c) => c.status === 'active')
    .sort((a, b) => b.editorialScore - a.editorialScore);
}

export function getTopCasinos(limit = 6): Casino[] {
  return getAllCasinos().slice(0, limit);
}

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((c) => c.slug === slug);
}

export function isAvailableInMarket(casino: Casino, market = defaultMarketId): boolean {
  return (
    casino.supportedMarkets.includes(market) && !casino.blockedMarkets.includes(market)
  );
}

export function getActiveOffer(
  casino: Casino,
  market = defaultMarketId,
): CasinoOffer | undefined {
  return casino.offers.find(
    (o) =>
      o.status === 'active' &&
      o.market === market &&
      (!o.expiresAt || new Date(o.expiresAt).getTime() > Date.now()),
  );
}

export function getActiveAffiliateLink(
  casino: Casino,
  market = defaultMarketId,
): AffiliateLink | undefined {
  if (!isAvailableInMarket(casino, market)) return undefined;
  return casino.affiliateLinks.find((l) => l.enabled && l.market === market);
}

export function getSimilarCasinos(casino: Casino, limit = 3): Casino[] {
  return getAllCasinos()
    .filter((c) => c.id !== casino.id && c.bonusType === casino.bonusType)
    .slice(0, limit)
    .concat(getAllCasinos().filter((c) => c.id !== casino.id))
    .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
    .slice(0, limit);
}

export const methodologyWeights = [
  { key: 'licensing', weight: 25 },
  { key: 'security', weight: 20 },
  { key: 'payouts', weight: 15 },
  { key: 'bonusFairness', weight: 15 },
  { key: 'product', weight: 10 },
  { key: 'support', weight: 5 },
  { key: 'responsible', weight: 10 },
] as const;
