import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/motion/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.cookies' });
  return { title: `${t('title')} — GambleZone`, robots: { index: false } };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.cookies');

  return (
    <>
      <PageHeader title={t('title')} />
      <div className="container-page py-14">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-muted">{t('body')}</p>
        </Reveal>
      </div>
    </>
  );
}
