import type { Metadata } from 'next';
import { Gift, MessageCircle } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { CasinoLogo } from '@/components/casino/casino-logo';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { getActiveOffer, getAllCasinos } from '@/lib/casinos';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/free-bonus',
    title: 'Free Bonus | GambleZone',
    description: 'Choose a listed casino and contact GambleZone for current free-bonus details and eligibility information.',
  });
}

export default async function FreeBonusPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const casinos = getAllCasinos();

  return (
    <>
      <PageHeader
        eyebrow="Free Bonus"
        title="Want a free bonus - send us a message"
        subtitle="Pick one of the casinos below and contact us. We will help you with the next step."
      />

      <div className="container-page py-14">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-primary/25 bg-primary/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
              <MessageCircle size={20} />
            </span>
            <p className="max-w-2xl text-sm font-medium text-foreground">
              Tell us which casino you are interested in and we will send you the free bonus details.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97]"
          >
            <MessageCircle size={16} />
            Send message
          </Link>
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2">
          {casinos.map((casino) => {
            const offer = getActiveOffer(casino);

            return (
              <StaggerItem
                key={casino.id}
                className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-6"
              >
                <div className="flex items-center gap-3">
                  <CasinoLogo
                    name={casino.name}
                    color={casino.brandColor}
                    size={52}
                    logoUrl={casino.logoUrl}
                  />
                  <div>
                    <h2 className="font-display text-lg font-bold">{casino.name}</h2>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                      <Gift size={12} />
                      Free bonus available
                    </span>
                  </div>
                </div>

                {offer && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3">
                    <p className="text-sm font-semibold text-foreground">{offer.title}</p>
                    <p className="mt-1 text-xs text-muted">{offer.shortTerms}</p>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2">
                  <Badge tone="warning">18+</Badge>
                  <Badge tone="muted">{casino.supportedCurrencies.join(', ')}</Badge>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </>
  );
}
