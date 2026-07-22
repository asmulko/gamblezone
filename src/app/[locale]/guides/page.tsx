import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollText } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });
  return pageMetadata({ locale, path: '/guides', title: `${t('title')} | GambleZone`, description: t('subtitle') });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('guides');
  const keys = ['bonuses', 'withdrawals', 'licensing'] as const;

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <div className="container-page py-14">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {keys.map((k) => (
            <StaggerItem key={k}>
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/15 text-secondary">
                  <ScrollText size={20} />
                </span>
                <h2 className="text-lg font-bold">{t(`items.${k}.title`)}</h2>
                <p className="text-sm text-muted">{t(`items.${k}.excerpt`)}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
