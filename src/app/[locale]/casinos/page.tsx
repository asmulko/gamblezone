import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { CasinoCatalog } from '@/components/casino/casino-catalog';
import { getAllCasinos } from '@/lib/casinos';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('casinosTitle'),
    description: t('casinosDescription'),
  };
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

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="container-page py-12">
        <CasinoCatalog casinos={casinos} />
      </div>
    </>
  );
}
