import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { pageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/motion/reveal';

type PolicySection = { heading?: string; paragraphs?: string[]; bullets?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.affiliate' });
  return pageMetadata({ locale, path: '/affiliate-disclosure', title: `${t('title')} | GambleZone`, description: t('intro') });
}

export default async function AffiliateDisclosurePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.affiliate');
  const sections = t.raw('sections') as PolicySection[];

  return (
    <>
      <PageHeader title={t('title')} />
      <div className="container-page py-14">
        <Reveal className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-8">
            <p className="text-xs font-medium text-muted">{t('effectiveDate')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('intro')}</p>
            {sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                {section.heading && (
                  <h2 className="text-xl font-bold">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="leading-relaxed text-muted">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="flex flex-col gap-2 pl-2">
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}

