import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, ScrollText, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Hero } from '@/components/home/hero';
import { CasinoCard } from '@/components/casino/casino-card';
import { ComparisonTable } from '@/components/casino/comparison-table';
import { PaymentChip } from '@/components/casino/payment-methods';
import { FaqAccordion, type FaqItem } from '@/components/casino/faq-accordion';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { getTopCasinos, getActiveOffer, methodologyWeights } from '@/lib/casinos';
import { paymentMethods } from '@/data/payment-methods';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const casinos = getTopCasinos(6);

  const rows = casinos.map((c) => ({
    slug: c.slug,
    name: c.name,
    brandColor: c.brandColor,
    rating: c.rating,
    editorialScore: c.editorialScore,
    bonus: getActiveOffer(c)?.valueText ?? '—',
    minDeposit: c.minDeposit ? `€${c.minDeposit.amount}` : '—',
    payout: c.withdrawalTimeText ?? '—',
    available: c.supportedMarkets.includes('INT'),
  }));

  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <>
      <Hero casinoCount={casinos.length} criteriaCount={methodologyWeights.length} />

      {/* Top casinos */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow={t('topCasinos.eyebrow')}
          title={t('topCasinos.title')}
          subtitle={t('topCasinos.subtitle')}
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {casinos.map((c, i) => (
            <StaggerItem key={c.id} className="h-full">
              <CasinoCard casino={c} rank={i + 1} placement="home-topcard" />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Comparison table */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow={t('comparison.eyebrow')}
          title={t('comparison.title')}
          subtitle={t('comparison.subtitle')}
        />
        <Reveal className="mt-10">
          <ComparisonTable rows={rows} />
        </Reveal>
      </section>

      {/* Methodology */}
      <MethodologyPreview />

      {/* Payments */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow={t('payments.eyebrow')}
          title={t('payments.title')}
          subtitle={t('payments.subtitle')}
        />
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {paymentMethods.map((m) => (
            <PaymentChip key={m.id} id={m.id} />
          ))}
        </Reveal>
      </section>

      {/* Guides */}
      <GuidesPreview />

      {/* Responsible gambling */}
      <ResponsibleGamblingPreview />

      {/* FAQ */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <Reveal className="mt-10">
          <FaqAccordion items={faqItems} />
        </Reveal>
      </section>

      {/* Newsletter */}
      <section className="container-page py-16">
        <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-radial-fade p-8 text-center sm:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            {t('newsletter.eyebrow')}
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t('newsletter.title')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {t('newsletter.subtitle')}
          </p>
          <div className="mx-auto mt-6 max-w-md text-left">
            <NewsletterForm />
          </div>
        </Reveal>
      </section>

      {/* Affiliate disclosure */}
      <DisclosureBanner />
    </>
  );
}

function MethodologyPreview() {
  const t = useTranslations();
  return (
    <section className="border-y border-border bg-surface/30 py-16">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
            {t('methodology.eyebrow')}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('methodology.title')}
          </h2>
          <p className="text-muted">{t('methodology.subtitle')}</p>
          <p className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-muted">
            {t('methodology.note')}
          </p>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/methodology">
              {t('nav.methodology')} <ArrowRight size={16} />
            </Link>
          </Button>
        </Reveal>

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
      </div>
    </section>
  );
}

function GuidesPreview() {
  const t = useTranslations('guides');
  const keys = ['bonuses', 'withdrawals', 'licensing'] as const;
  return (
    <section className="container-page py-16">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
        {keys.map((k) => (
          <StaggerItem key={k}>
            <article className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/15 text-secondary">
                <ScrollText size={20} />
              </span>
              <h3 className="text-lg font-bold">{t(`items.${k}.title`)}</h3>
              <p className="text-sm text-muted">{t(`items.${k}.excerpt`)}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ResponsibleGamblingPreview() {
  const t = useTranslations('responsibleGambling');
  return (
    <section className="container-page py-16">
      <Reveal className="relative overflow-hidden rounded-3xl border border-warning/25 bg-warning/5 p-8 sm:p-12">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-warning">
            <ShieldCheck size={14} />
            {t('eyebrow')}
          </span>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="max-w-2xl text-muted">{t('intro')}</p>
          <p className="text-sm font-semibold text-warning">{t('reminder')}</p>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/responsible-gambling">
              {t('getHelp')} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function DisclosureBanner() {
  const t = useTranslations('disclosure');
  return (
    <section className="container-page pb-8">
      <div className="rounded-2xl border border-border bg-surface/40 px-5 py-4 text-center text-xs text-muted">
        <strong className="font-semibold text-foreground">{t('title')}:</strong> {t('text')}
      </div>
    </section>
  );
}
