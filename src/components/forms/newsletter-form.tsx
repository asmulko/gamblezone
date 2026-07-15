'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, CheckCircle2 } from 'lucide-react';
import { AgeBadge } from '@/components/ui/age-badge';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterForm() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setState('error');
      setMessage(t('invalidEmail'));
      return;
    }

    if (!consent) {
      setState('error');
      setMessage(t('consentRequired'));
      return;
    }

    setState('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent,
          language: locale,
          website: formData.get('website'),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? 'Subscription failed.');
      }

      setEmail('');
      setConsent(false);
      setState('success');
      setMessage(result.message ?? t('success'));
    } catch (error) {
      setState('error');
      setMessage(
        error instanceof Error ? error.message : 'Subscription failed.',
      );
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-success">
        <CheckCircle2 size={20} />
        <p role="status" className="text-sm font-medium">
          {message}
        </p>
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
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t('placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state === 'error'}
            maxLength={254}
            required
            className="h-12 w-full rounded-full border border-border bg-surface-raised pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="h-12 shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97]"
        >
          {state === 'submitting' ? 'Subscribing...' : t('submit')}
        </button>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
        />
        <span className="flex items-center gap-1.5">
          <AgeBadge className="h-5" />
          {t('consent')}
        </span>
      </label>

      {state === 'error' && (
        <p role="alert" className="text-xs font-medium text-danger">
          {message}
        </p>
      )}
    </form>
  );
}
