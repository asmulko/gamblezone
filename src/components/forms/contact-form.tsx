'use client';

import Script from 'next/script';
import { useCallback, useState, useTransition, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { sendContactEmail, type ContactResult } from '@/app/actions/contact';
import { useTurnstile } from './use-turnstile';

export function ContactForm() {
  const t = useTranslations('pages.contact');
  const [state, setState] = useState<ContactResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [turnstileToken, setTurnstileToken] = useState('');

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleTurnstileSuccess = useCallback((token: string): void => {
      setTurnstileToken(token);
      setState(null);
    }, []);

  const handleTurnstileExpired = useCallback((): void => {
      setTurnstileToken('');
    }, []);

  const handleTurnstileError = useCallback((): void => {
      setTurnstileToken('');

      setState({
        success: false,
        error: 'Security verification failed. Please try again.',
      });
  }, []);

  const {
    containerRef: turnstileContainerRef,
    resetTurnstile: resetTurnstileWidget,
  } = useTurnstile({
    siteKey: turnstileSiteKey,
    onSuccess: handleTurnstileSuccess,
    onExpired: handleTurnstileExpired,
    onError: handleTurnstileError,
  });

  function resetTurnstile(): void {
    resetTurnstileWidget();
    setTurnstileToken('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!turnstileToken) {
      setState({
        success: false,
        error: 'Please complete the security check.',
      });

      return;
    }

    startTransition(async () => {
      const result = await sendContactEmail(formData);
      setState(result);

      if (result.success) {
        form.reset();
        return;
      }

      resetTurnstile();
    });
  }

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-success">
        <CheckCircle2 size={20} aria-hidden="true" />
        <p className="text-sm font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="contact-name"
            name="name"
            label={t('nameLabel')}
            autoComplete="name"
          />
          <Field
            id="contact-email"
            name="email"
            label={t('emailLabel')}
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-foreground"
          >
            {t('messageLabel')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            className="rounded-2xl border border-border bg-surface-raised px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
          />
        </div>

        <input
          type="hidden"
          name="turnstileToken"
          value={turnstileToken}
        />

        {!turnstileSiteKey && (
          <p role="alert" className="text-xs font-medium text-danger">
            Security verification is unavailable.
          </p>
        )}

        {turnstileSiteKey && (
          <>
            <div className={turnstileToken ? 'hidden' : undefined}>
              <div
                ref={turnstileContainerRef}
              />
            </div>

            {turnstileToken && (
              <div className="flex items-center gap-2 text-xs font-medium text-success">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Security check completed</span>
              </div>
            )}
          </>
        )}

        {state?.error && (
          <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            <AlertCircle size={16} className="shrink-0" />
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isPending ||
            !turnstileToken ||
            !turnstileSiteKey
          }
          className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
        >
          <Send size={16} />
          {isPending ? '...' : t('submit')}
        </button>
      </form>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border border-border bg-surface-raised px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
      />
    </div>
  );
}
