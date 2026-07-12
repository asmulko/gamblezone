'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { AgeBadge } from '@/components/ui/age-badge';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero({
  casinoCount,
  criteriaCount,
}: {
  casinoCount: number;
  criteriaCount: number;
}) {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const stats = [
    { value: `${casinoCount}`, label: t('statCasinos'), icon: ShieldCheck },
    { value: `${criteriaCount}`, label: t('statCriteria'), icon: TrendingUp },
    { value: '★', label: t('statUpdated'), icon: Sparkles },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <div className="absolute inset-0 grid-lines" aria-hidden="true" />

      <div className="container-page relative z-10 flex flex-col items-center gap-8 pb-16 pt-20 text-center sm:pt-28">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary"
          >
            <Sparkles size={14} />
            {t('eyebrow')}
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="text-gradient">{t('title')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-2xl text-pretty text-base text-muted sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={item} className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/casinos">
                {t('ctaPrimary')}
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/methodology">{t('ctaSecondary')}</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-2 text-xs text-muted"
          >
            <AgeBadge />
            <span className="max-w-md text-pretty">{t('disclaimer')}</span>
          </motion.div>
        </motion.div>

        <motion.dl
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
          className="mt-4 grid w-full max-w-2xl grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-surface/50 p-4"
            >
              <s.icon size={18} className="text-secondary" />
              <dd className="text-2xl font-bold tabular-nums">{s.value}</dd>
              <dt className="text-[11px] uppercase tracking-wide text-muted">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
