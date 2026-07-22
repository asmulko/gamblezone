import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { methodologyWeights } from '@/lib/casinos';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return pageMetadata({ locale, path: '/methodology', title: t('methodologyTitle'), description: 'Learn how GambleZone independently evaluates casino safety, bonuses, payments, games and responsible gambling features.' });
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const process = t.raw('pages.methodology.process') as string[];

  return (
    <>
      <PageHeader
        eyebrow={t('methodology.eyebrow')}
        title={t('pages.methodology.title')}
        subtitle={t('pages.methodology.intro')}
      />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <h2 className="text-xl font-bold">{t('pages.methodology.weightsTitle')}</h2>
          <Stagger className="flex flex-col gap-3">
            {methodologyWeights.map((c) => (
              <StaggerItem
                key={c.key}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-sm font-bold text-secondary">
                  {c.weight}%
                </span>
                <span className="flex-1 text-sm font-medium">
                  {t(`methodology.criteria.${c.key}`)}
                </span>
                <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-surface-overlay sm:block">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${(c.weight / 25) * 100}%` }}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="flex flex-col gap-5">
          <h2 className="text-xl font-bold">{t('pages.methodology.processTitle')}</h2>
          <ol className="flex flex-col gap-4">
            {process.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/15 text-sm font-bold text-secondary">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm text-muted">{step}</p>
              </li>
            ))}
          </ol>
          <p className="rounded-2xl border border-border bg-surface/50 px-4 py-3 text-sm text-muted">
            {t('methodology.note')}
          </p>
        </Reveal>
      </div>
    </>
  );
}
