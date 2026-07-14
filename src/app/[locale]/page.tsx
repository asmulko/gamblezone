import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, Gift, ShieldCheck, Star, Trophy } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Hero } from '@/components/home/hero';
import { CasinoLogo } from '@/components/casino/casino-logo';
import { AffiliateCTA } from '@/components/casino/affiliate-cta';
import { PaymentChip } from '@/components/casino/payment-methods';
import { FaqAccordion, type FaqItem } from '@/components/casino/faq-accordion';
import { NewsletterForm } from '@/components/forms/newsletter-form';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { getTopCasinos, getActiveOffer, isAvailableInMarket } from '@/lib/casinos';
import { paymentMethods } from '@/data/payment-methods';
import type { Casino } from '@/types/casino';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const casinos = getTopCasinos(6);
  const topThree = casinos.slice(0, 3);
  const rest = casinos.slice(3);

  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <>
      <Hero />

      {/* Top casinos */}
      <section className="container-page py-8">
        <SectionHeading
          eyebrow={t('topCasinos.eyebrow')}
          title={t('topCasinos.title')}
          subtitle={t('topCasinos.subtitle')}
        />

        {/* Featured top 3 */}
        <Stagger className="mt-10 flex flex-col gap-4">
          {topThree.map((c, i) => (
            <StaggerItem key={c.id}>
              <FeaturedCasinoCard casino={c} rank={i + 1} placement="home-topcard" />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Remaining casinos */}
        {rest.length > 0 && (
          <>
            <h3 className="mb-4 mt-10 text-xs font-bold uppercase tracking-widest text-muted">
              {t('topCasinos.more')}
            </h3>
            <Stagger className="flex flex-col gap-2">
              {rest.map((c, i) => (
                <StaggerItem key={c.id}>
                  <CompactCasinoRow casino={c} rank={i + 4} placement="home-topcard" />
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </section>

      {/* Payments */}
      <section className="container-page py-8">
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

      {/* Responsible gambling */}
      <ResponsibleGamblingPreview />

      {/* FAQ */}
      <section className="container-page py-8">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <Reveal className="mt-10">
          <FaqAccordion items={faqItems} />
        </Reveal>
      </section>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      {/* Newsletter */}
      <section className="container-page py-8">
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

const trophyStyles = [
  { color: 'text-amber-400', filter: '[filter:drop-shadow(0_0_8px_rgba(251,191,36,0.65))]' },
  { color: 'text-slate-300', filter: '' },
  { color: 'text-amber-700', filter: '' },
] as const;

function FeaturedCasinoCard({
  casino,
  rank,
  placement,
}: {
  casino: Casino;
  rank: number;
  placement: string;
}) {
  const t = useTranslations('common');
  const tc = useTranslations('casino');
  const offer = getActiveOffer(casino);
  const available = isAvailableInMarket(casino);
  const trophy = trophyStyles[rank - 1] ?? trophyStyles[2];

  return (
    <article className="relative rounded-3xl border border-border bg-surface/50 p-5 transition-all hover:border-primary/40 hover:shadow-card sm:p-6">
      {/* Header — single row on sm+, stacked on mobile */}
      <div className="flex items-center gap-3">
        <Trophy size={28} className={`shrink-0 ${trophy.color} ${trophy.filter}`} />
        <CasinoLogo name={casino.name} color={casino.brandColor} size={48} logoUrl={casino.logoUrl} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Link
            href={`/casinos/${casino.slug}`}
            className="font-display font-bold after:absolute after:inset-0"
          >
            {casino.name}
          </Link>
          {casino.rating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Star size={11} className="fill-accent text-accent" />
              <span className="font-semibold tabular-nums text-foreground">{casino.rating.toFixed(1)}</span>
              <span>/5 user rating</span>
            </span>
          )}
        </div>
        {/* Score — visible on sm+ only */}
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-3xl font-bold tabular-nums text-secondary">
            {casino.editorialScore.toFixed(1)}
          </p>
          <p className="text-[10px] uppercase tracking-wide text-muted">{tc('editorialScore')}</p>
        </div>
        {/* CTA — visible on sm+ only */}
        {available && (
          <div className="relative z-10 hidden shrink-0 sm:block">
            <AffiliateCTA
              slug={casino.slug}
              placement={placement}
              label={t('openSite')}
              ariaLabel={tc('visitAria', { name: casino.name })}
            />
          </div>
        )}
      </div>

      {/* Mobile-only: score + CTA row */}
      <div className="mt-3 flex items-center justify-between sm:hidden">
        <div>
          <p className="text-2xl font-bold tabular-nums text-secondary">
            {casino.editorialScore.toFixed(1)}
          </p>
          <p className="text-[10px] uppercase tracking-wide text-muted">{tc('editorialScore')}</p>
        </div>
        {available && (
          <div className="relative z-10">
            <AffiliateCTA
              slug={casino.slug}
              placement={placement}
              label={t('openSite')}
              ariaLabel={tc('visitAria', { name: casino.name })}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Bonus box */}
      {offer && (
        <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
            <Gift size={13} />
            {t('termsApply')}
          </div>
          <p className="font-bold text-foreground">{offer.title}</p>
          <p className="mt-1 text-xs text-muted">{offer.shortTerms}</p>
        </div>
      )}

      {/* Pros */}
      <ul className="mt-4 grid gap-1.5 sm:grid-cols-3">
        {casino.pros.slice(0, 3).map((pro) => (
          <li key={pro} className="flex items-start gap-2 text-sm text-muted">
            <Check size={14} className="mt-0.5 shrink-0 text-success" />
            {pro}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CompactCasinoRow({
  casino,
  rank,
  placement,
}: {
  casino: Casino;
  rank: number;
  placement: string;
}) {
  const t = useTranslations('common');
  const tc = useTranslations('casino');
  const offer = getActiveOffer(casino);
  const available = isAvailableInMarket(casino);

  return (
    <article className="relative flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 transition-all hover:border-primary/40 hover:bg-surface-overlay sm:flex-nowrap">
      <span className="w-5 shrink-0 text-center text-xs font-bold text-muted">{rank}</span>
      <CasinoLogo name={casino.name} color={casino.brandColor} size={36} logoUrl={casino.logoUrl} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link
          href={`/casinos/${casino.slug}`}
          className="text-sm font-bold after:absolute after:inset-0"
        >
          {casino.name}
        </Link>
      </div>
      {offer && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
          <Gift size={12} />
          {offer.valueText}
        </div>
      )}
      <div className="shrink-0 text-right">
        <p className="text-lg font-bold tabular-nums text-secondary">
          {casino.editorialScore.toFixed(1)}
        </p>
      </div>
      {available && (
        <div className="relative z-10 shrink-0">
          <AffiliateCTA
            slug={casino.slug}
            placement={placement}
            label={t('openSite')}
            ariaLabel={tc('visitAria', { name: casino.name })}
            size="sm"
          />
        </div>
      )}
    </article>
  );
}

function ResponsibleGamblingPreview() {
  const t = useTranslations('responsibleGambling');
  return (
    <section className="container-page py-8">
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
