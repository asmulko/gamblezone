import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AlertTriangle, LifeBuoy, Wrench } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/motion/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return { title: t('responsibleTitle') };
}

export default async function ResponsibleGamblingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('responsibleGambling');
  const tp = await getTranslations('pages.responsibleGambling');

  const signs = t.raw('signs') as string[];
  const tools = t.raw('tools') as string[];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={tp('title')} subtitle={tp('intro')} />

      <div className="container-page flex flex-col gap-10 py-14">
        <Reveal className="rounded-3xl border border-warning/25 bg-warning/5 p-6 sm:p-8">
          <p className="text-lg font-semibold text-warning">{t('reminder')}</p>
          <p className="mt-3 text-muted">{t('intro')}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <AlertTriangle size={20} className="text-danger" /> {t('signsTitle')}
            </h2>
            <ul className="flex flex-col gap-3">
              {signs.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Wrench size={20} className="text-secondary" /> {t('toolsTitle')}
            </h2>
            <ul className="flex flex-col gap-3">
              {tools.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-3 rounded-3xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <LifeBuoy size={20} className="text-secondary" /> {t('helpTitle')}
          </h2>
          <p className="text-muted">{t('helpText')}</p>
        </Reveal>
      </div>
    </>
  );
}
