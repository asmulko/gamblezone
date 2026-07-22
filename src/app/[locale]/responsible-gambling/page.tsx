import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AlertTriangle, ExternalLink, LifeBuoy, Wrench } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/motion/reveal';
import { pageMetadata } from '@/lib/seo';

const supportOrgs = [
  {
    name: 'GamCare',
    url: 'https://www.gamcare.org.uk/',
    desc: 'Free information, support and counselling for people affected by gambling (UK)',
  },
  {
    name: 'Gambling Therapy',
    url: 'https://www.gamblingtherapy.org/',
    desc: 'Free global online support for people affected by gambling (international)',
  },
  {
    name: 'Gamblers Anonymous',
    url: 'https://www.gamblersanonymous.org/',
    desc: 'International fellowship of men and women who share their experience to recover from gambling problems',
  },
  {
    name: 'BeGambleAware',
    url: 'https://www.begambleaware.org/',
    desc: 'Free, confidential support, information and advice (UK)',
  },
  {
    name: 'NCPG — National Council on Problem Gambling',
    url: 'https://www.ncpgambling.org/',
    desc: 'Helpline and resources across the United States (1-800-522-4700)',
  },
  {
    name: 'Gambling Help Online',
    url: 'https://www.gamblinghelponline.org.au/',
    desc: '24/7 chat, phone and email support (Australia)',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return pageMetadata({ locale, path: '/responsible-gambling', title: t('responsibleTitle'), description: 'Responsible gambling information, warning signs, player protection tools and independent support resources.' });
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
          <ul className="mt-2 flex flex-col gap-3">
            {supportOrgs.map((org) => (
              <li key={org.name}>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-surface/50 p-4 transition-colors hover:border-primary/40"
                >
                  <ExternalLink size={16} className="mt-0.5 shrink-0 text-secondary" />
                  <div>
                    <p className="font-semibold group-hover:text-secondary">{org.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{org.desc}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
