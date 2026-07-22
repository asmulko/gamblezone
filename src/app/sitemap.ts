import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { getAllCasinos } from '@/lib/casinos';

const staticPaths = [
  '',
  '/casinos',
  '/bonuses',
  '/free-bonus',
  '/guides',
  '/about',
  '/methodology',
  '/responsible-gambling',
  '/affiliate-disclosure',
  '/contact',
];

function languageAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : path === '/casinos' ? 0.9 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }

    for (const casino of getAllCasinos()) {
      const path = `/casinos/${casino.slug}`;
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: casino.reviewedAt ? new Date(casino.reviewedAt) : now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
