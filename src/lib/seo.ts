import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

export function absoluteUrl(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized === '/' ? '' : normalized}`;
}

export function localizedPath(locale: Locale, path = ''): string {
  const normalized = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `/${locale}${normalized}`;
}

export function localizedAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((language) => [
          language,
          absoluteUrl(localizedPath(language, path)),
        ]),
      ),
      'x-default': absoluteUrl(localizedPath('en', path)),
    },
  };
}

export function pageMetadata({
  locale,
  path = '',
  title,
  description,
  type = 'website',
  image = '/icon.svg',
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const indexable = process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV === 'production';

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale,
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
