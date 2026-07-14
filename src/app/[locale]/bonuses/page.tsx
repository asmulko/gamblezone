import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Gift } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { CasinoLogo } from '@/components/casino/casino-logo';
import { AffiliateCTA } from '@/components/casino/affiliate-cta';
import { Badge } from '@/components/ui/badge';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { getAllCasinos, getActiveOffer, isAvailableInMarket } from '@/lib/casinos';

export default async function BonusesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const items = getAllCasinos()
    .map((c) => ({ casino: c, offer: getActiveOffer(c) }))
    .filter((x) => x.offer);

  return (
    <>
      <PageHeader
        eyebrow={t('nav.bonuses')}
        title={t('topCasinos.bonus')}
        subtitle={t('guides.items.bonuses.excerpt')}
      />
      <div className="container-page py-14">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {items.map(({ casino, offer }) => (
            <StaggerItem
              key={casino.id}
              className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-6"
            >
              <div className="flex items-center gap-3">
                <CasinoLogo name={casino.name} color={casino.brandColor} size={48} logoUrl={casino.logoUrl} />
                <div>
                  <h2 className="font-bold">{casino.name}</h2>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                    <Gift size={12} /> {t('topCasinos.bonus')}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-secondary">{offer!.title}</p>
              <p className="text-sm text-muted">{offer!.shortTerms}</p>
              <div className="flex flex-wrap gap-2">
                {offer!.wageringText && <Badge tone="primary">{offer!.wageringText}</Badge>}
                <Badge tone="warning">{t('common.termsApply')}</Badge>
                <Badge tone="muted">18+</Badge>
              </div>
              <div className="mt-auto pt-2">
                {isAvailableInMarket(casino) && (
                  <AffiliateCTA
                    slug={casino.slug}
                    placement="bonuses"
                    label={t('common.openSite')}
                    ariaLabel={t('casino.visitAria', { name: casino.name })}
                    className="w-full"
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
