export const siteConfig = {
  name: 'GambleZone',
  tagline: 'Independent casino comparison',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gamblezone.vip',
  defaultMarket: 'INT',
  contactEmail: 'info@gamblezone.com',
  foundedYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
