export const siteConfig = {
  name: 'GambleZone',
  tagline: 'Independent casino comparison',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  /** Default market for the MVP. Market !== locale by design. */
  defaultMarket: 'INT',
  contactEmail: 'hello@example.com',
  foundedYear: 2025,
} as const;

export type SiteConfig = typeof siteConfig;
