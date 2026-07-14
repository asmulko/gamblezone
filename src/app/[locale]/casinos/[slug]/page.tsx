import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowLeft,
  Check,
  X,
  CalendarClock,
  Coins,
  Star,
  Timer,
  Wallet,
  Headphones,
  ShieldCheck,
  Gamepad2,
} from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { CasinoLogo } from '@/components/casino/casino-logo';
import { AffiliateCTA } from '@/components/casino/affiliate-cta';
import { PaymentMethods } from '@/components/casino/payment-methods';
import { CasinoCard } from '@/components/casino/casino-card';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';
import {
  getCasinoBySlug,
  getActiveOffer,
  getSimilarCasinos,
  isAvailableInMarket,
} from '@/lib/casinos';
import { casinos } from '@/data/casinos';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return casinos.flatMap((c) =>
    routing.locales.map((locale) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const casino = getCasinoBySlug(slug);
  if (!casino) return {};
  return {
    title: `${casino.name} — GambleZone`,
    description: casino.shortDescription,
  };
}

export default async function CasinoDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const casino = getCasinoBySlug(slug);
  if (!casino) notFound();

  const t = await getTranslations('casino');
  const td = await getTranslations('detail');
  const tc = await getTranslations('common');

  const messages = await getMessages();
  const i18n = (messages as any)?.casinoDescriptions?.[casino.slug];

  const rawOffer = getActiveOffer(casino);
  const offer = rawOffer && i18n ? {
    ...rawOffer,
    title: (i18n.offerTitle as string) ?? rawOffer.title,
    shortTerms: (i18n.offerTerms as string) ?? rawOffer.shortTerms,
  } : rawOffer;
  const displayPros = (i18n?.pros as string[] | undefined) ?? casino.pros;

  const available = isAvailableInMarket(casino);
  const similar = getSimilarCasinos(casino);

  const facts = [
    { icon: Coins, label: t('minDeposit'), value: casino.minDeposit ? `€${casino.minDeposit.amount}` : '—' },
    { icon: Wallet, label: t('minWithdrawal'), value: casino.minWithdrawal ? `€${casino.minWithdrawal.amount}` : '—' },
    { icon: Timer, label: t('withdrawalTime'), value: casino.withdrawalTimeText ?? '—' },
    { icon: CalendarClock, label: t('foundedYear'), value: casino.foundedYear?.toString() ?? '—' },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="aurora opacity-60" aria-hidden="true" />
        <div className="container-page relative z-10 py-10">
          <Link
            href="/casinos"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-secondary"
          >
            <ArrowLeft size={16} /> {td('backToCasinos')}
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <CasinoLogo name={casino.name} color={casino.brandColor} size={72} logoUrl={casino.logoUrl} />
              <div className="flex flex-col gap-1.5">
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {casino.name}
                </h1>
                {casino.rating > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Star size={14} className="fill-accent text-accent" />
                    <span className="font-bold tabular-nums text-foreground">{casino.rating.toFixed(1)}/5</span>
                    <span>user rating</span>
                  </span>
                )}
                {casino.reviewedAt && (
                  <span className="text-xs text-muted">
                    {tc('lastReviewed')}: {formatDate(casino.reviewedAt, locale)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center rounded-2xl border border-border bg-surface/60 px-5 py-3">
                <span className="text-3xl font-bold tabular-nums text-secondary">
                  {casino.editorialScore.toFixed(1)}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-muted">
                  {t('editorialScore')}
                </span>
              </div>
              {available && (
                <AffiliateCTA
                  slug={casino.slug}
                  placement="detail-hero"
                  label={tc('openSite')}
                  ariaLabel={t('visitAria', { name: casino.name })}
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          <Reveal>
            <p className="text-lg text-muted">{casino.shortDescription}</p>
          </Reveal>

          {/* Bonus */}
          {offer && (
            <Reveal className="rounded-3xl border border-primary/25 bg-primary/5 p-6">
              <h2 className="text-lg font-bold">{td('bonusTitle')}</h2>
              <p className="mt-2 text-2xl font-bold text-secondary">{offer.title}</p>
              <p className="mt-2 text-sm text-muted">{offer.shortTerms}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {offer.wageringText && <Badge tone="primary">{offer.wageringText}</Badge>}
                {offer.minDepositText && <Badge tone="muted">{offer.minDepositText}</Badge>}
                <Badge tone="warning">{tc('termsApply')}</Badge>
                <Badge tone="muted">18+</Badge>
              </div>
            </Reveal>
          )}

          {/* Pros / Cons */}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-success/25 bg-success/5 p-6">
              <h3 className="mb-3 font-bold text-success">{t('pros')}</h3>
              <ul className="flex flex-col gap-2">
                {displayPros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-danger/25 bg-danger/5 p-6">
              <h3 className="mb-3 font-bold text-danger">{t('cons')}</h3>
              <ul className="flex flex-col gap-2">
                {casino.cons.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <X size={16} className="mt-0.5 shrink-0 text-danger" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Review summary */}
          <Reveal className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{td('reviewTitle')}</h2>
            <p className="leading-relaxed text-muted">{casino.reviewSummary}</p>
          </Reveal>

          {/* Payments */}
          <Reveal className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Wallet size={20} className="text-secondary" /> {t('paymentMethods')}
            </h2>
            <PaymentMethods ids={casino.paymentMethods} />
          </Reveal>

          {/* Games */}
          <Reveal className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 font-bold">
                <Gamepad2 size={18} className="text-secondary" /> {t('gameProviders')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {casino.gameProviders.map((g) => (
                  <Badge key={g} tone="muted">{g}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">{t('gameTypes')}</h3>
              <div className="flex flex-wrap gap-2">
                {casino.gameTypes.map((g) => (
                  <Badge key={g} tone="secondary">{g}</Badge>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Responsible tools */}
          <Reveal className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <ShieldCheck size={20} className="text-warning" /> {t('responsibleTools')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {casino.responsibleGamblingTools.map((tool) => (
                <Badge key={tool} tone="warning">{tool}</Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-3xl border border-border bg-surface/50 p-6">
            <h2 className="mb-4 font-bold">{td('quickFacts')}</h2>
            <dl className="flex flex-col gap-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-3 text-sm">
                  <dt className="inline-flex items-center gap-2 text-muted">
                    <f.icon size={15} className="text-secondary" /> {f.label}
                  </dt>
                  <dd className="font-semibold tabular-nums">{f.value}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 text-sm">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <Coins size={15} className="text-secondary" /> {t('supportedCurrencies')}
                </dt>
                <dd className="font-semibold">{casino.supportedCurrencies.join(', ')}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <dt className="inline-flex items-center gap-2 text-muted">
                  <Headphones size={15} className="text-secondary" /> {t('supportChannels')}
                </dt>
                <dd className="text-right font-semibold">{casino.supportChannels.length}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-border bg-surface/50 p-6">
            <h2 className="mb-3 font-bold">{t('licenses')}</h2>
            <ul className="flex flex-col gap-3">
              {casino.licenses.map((l) => (
                <li key={l.authority} className="text-sm">
                  <p className="font-semibold">{l.authority}</p>
                  {l.licenseNumber && (
                    <p className="text-xs text-muted">{l.licenseNumber}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {available ? (
            <AffiliateCTA
              slug={casino.slug}
              placement="detail-sidebar"
              label={tc('openSite')}
              ariaLabel={t('visitAria', { name: casino.name })}
              size="lg"
              className="w-full"
            />
          ) : (
            <p className="rounded-2xl border border-border bg-surface-overlay px-4 py-3 text-center text-sm text-muted">
              {t('unavailable')}
            </p>
          )}
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="container-page py-12">
          <h2 className="mb-8 text-2xl font-bold">{t('similar')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CasinoCard key={c.id} casino={c} placement="detail-similar" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
