'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CasinoCard } from '@/components/casino/casino-card';
import { cn } from '@/lib/utils';
import type { Casino } from '@/types/casino';

type Filters = {
  payment: string;
  currency: string;
  bonus: string;
  payout: string;
};

const initial: Filters = { payment: '', currency: '', bonus: '', payout: '' };

export function CasinoCatalog({ casinos }: { casinos: Casino[] }) {
  const t = useTranslations('catalog');
  const [filters, setFilters] = useState<Filters>(initial);

  const options = useMemo(() => {
    const payment = new Set<string>();
    const currency = new Set<string>();
    const bonus = new Set<string>();
    const payout = new Set<string>();
    for (const c of casinos) {
      c.paymentMethods.forEach((p) => payment.add(p));
      c.supportedCurrencies.forEach((cur) => currency.add(cur));
      bonus.add(c.bonusType);
      payout.add(c.payoutSpeed);
    }
    return {
      payment: [...payment],
      currency: [...currency],
      bonus: [...bonus],
      payout: [...payout],
    };
  }, [casinos]);

  const filtered = useMemo(
    () =>
      casinos.filter((c) => {
        if (filters.payment && !c.paymentMethods.includes(filters.payment)) return false;
        if (filters.currency && !c.supportedCurrencies.includes(filters.currency)) return false;
        if (filters.bonus && c.bonusType !== filters.bonus) return false;
        if (filters.payout && c.payoutSpeed !== filters.payout) return false;
        return true;
      }),
    [casinos, filters],
  );

  const active = Object.values(filters).some(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-surface/50 p-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-semibold">
              <SlidersHorizontal size={16} className="text-secondary" />
              {t('filters')}
            </span>
            {active && (
              <button
                type="button"
                onClick={() => setFilters(initial)}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-secondary"
              >
                <RotateCcw size={12} />
                {t('reset')}
              </button>
            )}
          </div>

          <FilterGroup
            label={t('filterPayment')}
            value={filters.payment}
            options={options.payment}
            onChange={(v) => setFilters((f) => ({ ...f, payment: v }))}
          />
          <FilterGroup
            label={t('filterCurrency')}
            value={filters.currency}
            options={options.currency}
            onChange={(v) => setFilters((f) => ({ ...f, currency: v }))}
          />
          <FilterGroup
            label={t('filterBonus')}
            value={filters.bonus}
            options={options.bonus}
            onChange={(v) => setFilters((f) => ({ ...f, bonus: v }))}
          />
          <FilterGroup
            label={t('filterPayout')}
            value={filters.payout}
            options={options.payout}
            onChange={(v) => setFilters((f) => ({ ...f, payout: v }))}
          />
        </div>
      </aside>

      <div>
        <p className="mb-5 text-sm text-muted">{t('resultsCount', { count: filtered.length })}</p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface/50 p-12 text-center">
            <p className="text-muted">{t('empty')}</p>
            <button
              type="button"
              onClick={() => setFilters(initial)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {t('emptyAction')}
            </button>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CasinoCard casino={c} rank={i + 1} placement="catalog" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(value === opt ? '' : opt)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
              value === opt
                ? 'border-primary bg-primary/15 text-secondary'
                : 'border-border bg-surface-overlay/50 text-muted hover:text-foreground',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
