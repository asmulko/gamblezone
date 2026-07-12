'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, CheckCircle2 } from 'lucide-react';
import { AgeBadge } from '@/components/ui/age-badge';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError(t('invalidEmail'));
      return;
    }
    if (!consent) {
      setError(t('consentRequired'));
      return;
    }
    // MVP: no backend. Nothing is stored or sent.
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-success">
        <CheckCircle2 size={20} />
        <p className="text-sm font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <label htmlFor="newsletter-email" className="sr-only">
            {t('placeholder')}
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t('placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(error)}
            className="h-12 w-full rounded-full border border-border bg-surface-raised pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
          />
        </div>
        <button
          type="submit"
          className="h-12 shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97]"
        >
          {t('submit')}
        </button>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
        />
        <span className="flex items-center gap-1.5">
          <AgeBadge className="h-5" />
          {t('consent')}
        </span>
      </label>

      {error && (
        <p role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
