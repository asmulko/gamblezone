import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0b0708',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(siteConfig.url),
    ...pageMetadata({
      locale,
      title: t('homeTitle'),
      description: t('homeDescription'),
    }),
    applicationName: siteConfig.name,
    title: {
      default: t('homeTitle'),
      template: `%s`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-dvh bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                url: siteConfig.url,
                logo: `${siteConfig.url}/icon.svg`,
                foundingDate: String(siteConfig.foundedYear),
                contactPoint: {
                  '@type': 'ContactPoint',
                  email: siteConfig.contactEmail,
                  contactType: 'customer service',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${siteConfig.url}/#website`,
                name: siteConfig.name,
                url: siteConfig.url,
                publisher: { '@id': `${siteConfig.url}/#organization` },
                inLanguage: locale,
              },
            ]}
          />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
