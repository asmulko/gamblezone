'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Dices } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './language-switcher';
import { AgeBadge } from '@/components/ui/age-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'casinos', href: '/casinos' },
  { key: 'methodology', href: '/methodology' },
  { key: 'responsibleGambling', href: '/responsible-gambling' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass' : 'bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
            <Dices size={20} />
          </span>
          <span>
            Gamble<span className="text-secondary">Zone</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <Link
            href="/"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-overlay',
              pathname === '/' ? 'text-foreground' : 'text-muted',
            )}
          >
            {t('home')}
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-overlay',
                pathname.startsWith(item.href) ? 'text-foreground' : 'text-muted',
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AgeBadge className="hidden sm:inline-flex" />
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/casinos">{t('casinos')}</Link>
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/50 text-foreground md:hidden"
            aria-label={menuOpen ? t('closeMenu') : t('menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border glass md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              <Link href="/" className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-surface-overlay">
                {t('home')}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-surface-overlay"
                >
                  {t(item.key)}
                </Link>
              ))}
              <p className="px-4 pt-3 text-xs text-muted">
                <AgeBadge className="mr-2" />
                {tc('termsApply')}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
