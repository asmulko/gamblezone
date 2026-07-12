import type { Locale } from '@/i18n/routing';

/**
 * Markets are distinct from locales. A market controls availability, currencies
 * and which affiliate link is served. For the MVP we ship a single demo market.
 */
export type Market = {
  id: string;
  name: string;
  defaultCurrency: string;
  /** Locales commonly associated with this market (hint only). */
  locales: Locale[];
};

export const markets: Record<string, Market> = {
  INT: {
    id: 'INT',
    name: 'International (demo)',
    defaultCurrency: 'EUR',
    locales: ['en', 'de', 'es', 'pl', 'pt'],
  },
};

export const defaultMarketId = 'INT';
