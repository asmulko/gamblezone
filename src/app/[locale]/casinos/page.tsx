import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { CasinoCatalog } from '@/components/casino/casino-catalog';
import { getAllCasinos } from '@/lib/casinos';
import { pageMetadata, absoluteUrl, localizedPath } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return pageMetadata({ locale, path: '/casinos', title: t('casinosTitle'), description: t('casinosDescription') });
}

export default async function CasinosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('catalog');
  const casinos = getAllCasinos();

  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('title'),
    itemListElement: casinos.map((casino, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: casino.name,
      url: absoluteUrl(localizedPath(locale, `/casinos/${casino.slug}`)),
    })),
  };

  return (
    <>
      <JsonLd data={listJsonLd} />
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="container-page py-12">
        <CasinoCatalog casinos={casinos} />
      </div>
    </>
  );
}
