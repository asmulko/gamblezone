import { useTranslations } from 'next-intl';
import { Dices } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { AgeBadge } from '@/components/ui/age-badge';
import { siteConfig } from '@/config/site';

const exploreLinks = [
  { key: 'casinos', href: '/casinos' },
  { key: 'bonuses', href: '/bonuses' },
  { key: 'guides', href: '/guides' },
  { key: 'about', href: '/about' },
  { key: 'methodology', href: '/methodology' },
] as const;

const legalLinks = [
  { key: 'privacy', href: '/privacy' },
  { key: 'cookies', href: '/cookies' },
  { key: 'terms', href: '/terms' },
  { key: 'affiliate', href: '/affiliate-disclosure' },
] as const;

const responsibleLinks = [
  { key: 'responsibleGambling', href: '/responsible-gambling' },
  { key: 'contact', href: '/contact' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Dices size={20} />
            </span>
            Gamble<span className="-ml-2 text-secondary">Zone</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{t('about')}</p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <AgeBadge />
            <span>{tc('termsApply')}</span>
          </div>
        </div>

        <FooterColumn title={t('sections.explore')}>
          {exploreLinks.map((l) => (
            <FooterLink key={l.key} href={l.href}>
              {t(`links.${l.key}`)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t('sections.legal')}>
          {legalLinks.map((l) => (
            <FooterLink key={l.key} href={l.href}>
              {t(`links.${l.key}`)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t('sections.responsible')}>
          {responsibleLinks.map((l) => (
            <FooterLink key={l.key} href={l.href}>
              {t(`links.${l.key}`)}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted">
          <p className="rounded-xl border border-warning/25 bg-warning/10 px-4 py-3 text-warning">
            {t('ageWarning')}
          </p>
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <p>
              © {siteConfig.foundedYear} {siteConfig.name}. {t('rights')}
            </p>
            <p>{t('disclaimer')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors hover:text-secondary"
      >
        {children}
      </Link>
    </li>
  );
}
