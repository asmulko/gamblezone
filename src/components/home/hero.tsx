'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { AgeBadge } from '@/components/ui/age-badge';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
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
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-2 text-xs text-muted"
          >
            <AgeBadge />
            <span className="max-w-md text-pretty">{t('disclaimer')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


