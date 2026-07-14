'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CasinoLogo } from './casino-logo';
import { AffiliateCTA } from './affiliate-cta';
import { Rating } from '@/components/ui/rating';
import { cn } from '@/lib/utils';
import type { Casino } from '@/types/casino';

type SortKey = 'rating' | 'bonus' | 'name';

type Row = {
  slug: string;
  name: string;
  brandColor: string;
  rating: number;
  editorialScore: number;
  bonus: string;
  minDeposit: string;
  payout: string;
  available: boolean;
  logoUrl?: string;
};

export function ComparisonTable({ rows }: { rows: Row[] }) {
  const t = useTranslations('comparison');
  const tc = useTranslations('common');
  const [sort, setSort] = useState<SortKey>('rating');

  const sorted = useMemo(() => {
    const copy = [...rows];
    if (sort === 'rating') copy.sort((a, b) => b.editorialScore - a.editorialScore);
    if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'bonus') copy.sort((a, b) => a.bonus.localeCompare(b.bonus));
    return copy;
  }, [rows, sort]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <span className="text-sm font-semibold text-muted">{t('sortBy')}</span>
        <div className="flex gap-1">
          {(['rating', 'bonus', 'name'] as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                sort === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-overlay text-muted hover:text-foreground',
              )}
            >
              <ArrowUpDown size={12} />
              {t(key === 'rating' ? 'sortRating' : key === 'bonus' ? 'sortBonus' : 'sortName')}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="p-4 font-semibold">{t('columnCasino')}</th>
              <th className="p-4 font-semibold">{t('columnRating')}</th>
              <th className="p-4 font-semibold">{t('columnBonus')}</th>
              <th className="p-4 font-semibold">{t('columnMinDeposit')}</th>
              <th className="p-4 font-semibold">{t('columnPayout')}</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.slug}
                className="border-t border-border transition-colors hover:bg-surface-overlay/50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <CasinoLogo name={row.name} color={row.brandColor} size={40} logoUrl={row.logoUrl} />
                    <Link
                      href={`/casinos/${row.slug}`}
                      className="font-semibold text-foreground hover:text-secondary"
                    >
                      {row.name}
                    </Link>
                  </div>
                </td>
                <td className="p-4">
                  <Rating value={row.rating} size={13} />
                </td>
                <td className="p-4 font-medium text-foreground">{row.bonus}</td>
                <td className="p-4 tabular-nums text-muted">{row.minDeposit}</td>
                <td className="p-4 text-muted">{row.payout}</td>
                <td className="p-4 text-right">
                  {row.available ? (
                    <AffiliateCTA
                      slug={row.slug}
                      placement="comparison"
                      label={tc('openSite')}
                      size="sm"
                    />
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
