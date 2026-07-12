import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { getAllCasinos } from '@/lib/casinos';

const staticPaths = [
  '',
  '/casinos',
  '/bonuses',
  '/guides',
  '/methodology',
  '/responsible-gambling',
  '/affiliate-disclosure',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const casino of getAllCasinos()) {
      entries.push({
        url: `${base}/${locale}/casinos/${casino.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
