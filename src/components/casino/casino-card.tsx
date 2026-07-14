import { useTranslations } from 'next-intl';
import { Check, Gift, Zap } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CasinoLogo } from './casino-logo';
import { AffiliateCTA } from './affiliate-cta';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { getActiveOffer, isAvailableInMarket } from '@/lib/casinos';
import type { Casino } from '@/types/casino';

export function CasinoCard({
  casino,
  rank,
  placement = 'card',
}: {
  casino: Casino;
  rank?: number;
  placement?: string;
}) {
  const t = useTranslations('common');
  const tc = useTranslations('casino');
  const offer = getActiveOffer(casino);
  const available = isAvailableInMarket(casino);

  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
      {rank && (
        <span className="absolute -left-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-glow">
          {rank}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CasinoLogo name={casino.name} color={casino.brandColor} size={52} logoUrl={casino.logoUrl} />
          <div>
            <h3 className="font-display text-lg font-bold leading-tight">
              <Link
                href={`/casinos/${casino.slug}`}
                className="after:absolute after:inset-0"
              >
                {casino.name}
              </Link>
            </h3>
            <Rating value={casino.rating} size={14} />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold tabular-nums text-secondary">
            {casino.editorialScore.toFixed(1)}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-muted">
            {tc('editorialScore')}
          </span>
        </div>
      </div>

      {offer && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
            <Gift size={13} /> {t('termsApply')}
          </div>
          <p className="text-sm font-semibold text-foreground">{offer.title}</p>
          <p className="mt-1 text-xs text-muted">{offer.shortTerms}</p>
        </div>
      )}

      <ul className="flex flex-col gap-1.5">
        {casino.pros.slice(0, 3).map((pro) => (
          <li key={pro} className="flex items-start gap-2 text-sm text-muted">
            <Check size={15} className="mt-0.5 shrink-0 text-success" />
            {pro}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {casino.payoutSpeed === 'instant' && (
          <Badge tone="success">
            <Zap size={12} /> {casino.withdrawalTimeText}
          </Badge>
        )}
        <Badge tone="muted">{casino.gameTypes.length}+ {tc('gameTypes')}</Badge>
      </div>

      <div className="relative z-10 flex flex-col gap-2 sm:flex-row">
        {available ? (
          <AffiliateCTA
            slug={casino.slug}
            placement={placement}
            label={t('openSite')}
            ariaLabel={tc('visitAria', { name: casino.name })}
            className="flex-1"
          />
        ) : (
          <span className="flex-1 rounded-full border border-border bg-surface-overlay px-4 py-2.5 text-center text-xs text-muted">
            {tc('unavailable')}
          </span>
        )}
      </div>
    </article>
  );
}
