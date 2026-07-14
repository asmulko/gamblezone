import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Scale, Eye, Sparkles, ShieldCheck, Briefcase, Mail } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';

const valueIcons = {
  fair: Scale,
  transparent: Eye,
  entertaining: Sparkles,
  responsible: ShieldCheck,
} as const;

const valueKeys = ['fair', 'transparent', 'entertaining', 'responsible'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return { title: `${t('title')} — GambleZone`, description: t('lead') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('lead')} />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <Reveal className="mt-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{t('valuesTitle')}</h2>
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {valueKeys.map((key) => {
                const Icon = valueIcons[key];
                return (
                  <StaggerItem
                    key={key}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface/50 p-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-secondary">
                      <Icon size={20} />
                    </span>
                    <span className="font-semibold">{t(`values.${key}`)}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit">
          <Reveal className="flex flex-col items-center gap-2 rounded-3xl border border-primary/25 bg-radial-fade p-8 text-center">
            <Briefcase size={22} className="text-secondary" />
            <span className="font-display text-5xl font-bold text-gradient">
              {t('experienceValue')}
            </span>
            <span className="text-sm text-muted">{t('experienceLabel')}</span>
          </Reveal>

          <Reveal className="flex flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-6 text-center">
            <p className="text-sm font-semibold leading-relaxed text-foreground">
              {t('closing')}
            </p>
            <Button asChild className="w-full">
              <Link href="/casinos">
                {t('cta')} <ArrowRight size={16} />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface/50 p-6 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-secondary">
              <Mail size={20} />
            </span>
            <h2 className="font-display text-base font-bold">{t('contactTitle')}</h2>
            <p className="text-sm text-muted">{t('contactDesc')}</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">
                {t('contactCta')} <ArrowRight size={16} />
              </Link>
            </Button>
          </Reveal>
        </aside>
      </div>
    </>
  );
}
