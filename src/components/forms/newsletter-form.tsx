'use client';

import Script from 'next/script';
import { useCallback, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AgeBadge } from '@/components/ui/age-badge';
import { useTurnstile } from './use-turnstile';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type ApiError =
  | string
  | {
      code?: string;
      message?: string;
      id?: string;
    };

type NewsletterResponse = {
  success?: boolean;
  status?:
    | 'subscribed'
    | 'already_subscribed'
    | 'resubscribed';
  message?: string;
  error?: ApiError;
};

function getResponseError(
  response: Response,
  result: NewsletterResponse | null,
): string {
  /*
   * Vercel Firewall can return its own nested response
   * before the request reaches the Next.js API route.
   */
  if (response.status === 429) {
    return 'Too many attempts. Please wait a minute and try again.';
  }

  if (typeof result?.error === 'string') {
    return result.error;
  }

  if (
    result?.error &&
    typeof result.error === 'object' &&
    typeof result.error.message === 'string'
  ) {
    return result.error.message;
  }

  if (
    typeof result?.message === 'string' &&
    result.message.length > 0
  ) {
    return result.message;
  }

  return 'Subscription failed. Please try again.';
}

export function NewsletterForm() {
  const t = useTranslations('newsletter');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const [turnstileToken, setTurnstileToken] =
    useState('');

  const [state, setState] =
    useState<SubmitState>('idle');

  const [message, setMessage] = useState('');

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleTurnstileSuccess = useCallback(
    (token: string): void => {
      setTurnstileToken(token);

      setState((currentState) =>
        currentState === 'error'
          ? 'idle'
          : currentState,
      );

      setMessage('');
    },
    [],
  );

  const handleTurnstileExpired = useCallback((): void => {
      setTurnstileToken('');
    }, []);

  const handleTurnstileError = useCallback((): void => {
      setTurnstileToken('');
      setState('error');

      setMessage(
        'Security verification failed. Please try again.',
      );
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

  function clearError(): void {
    if (state === 'error') {
      setState('idle');
      setMessage('');
    }
  }

  function resetTurnstile(): void {
    /*
     * Reset the Cloudflare widget first, then clear
     * the local token that controls its visibility.
     */
    resetTurnstileWidget();
    setTurnstileToken('');
  }

  async function onSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!EMAIL_RE.test(normalizedEmail)) {
      setState('error');
      setMessage(t('invalidEmail'));
      return;
    }

    if (!consent) {
      setState('error');
      setMessage(t('consentRequired'));
      return;
    }

    if (!turnstileToken) {
      setState('error');

      setMessage(
        'Please complete the security check.',
      );

      return;
    }

    setState('submitting');
    setMessage('');

    const formData = new FormData(
      event.currentTarget,
    );

    try {
      const response = await fetch(
        '/api/newsletter',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: normalizedEmail,
            consent,
            language: locale,
            website: formData.get('website'),
            turnstileToken,
          }),
        },
      );

      /*
       * Vercel or another upstream service could
       * theoretically return a non-JSON response.
       */
      const result =
        (await response
          .json()
          .catch(() => null)) as NewsletterResponse | null;

      if (
        !response.ok ||
        result?.success !== true
      ) {
        throw new Error(
          getResponseError(response, result),
        );
      }

      setEmail('');
      setConsent(false);
      setState('success');

      /*
       * Prefer the server response because it knows
       * whether this was a new subscription,
       * an existing contact, or a resubscription.
       */
      setMessage(
        result.message ?? t('success'),
      );

      resetTurnstile();
    } catch (error) {
      setState('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Subscription failed. Please try again.',
      );

      /*
       * Turnstile tokens are single-use once they
       * reach server-side verification.
       *
       * Reset after every failed request so the user
       * receives a fresh token for the next attempt.
       */
      resetTurnstile();
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-success">
        <CheckCircle2
          size={20}
          aria-hidden="true"
        />

        <p
          role="status"
          className="text-sm font-medium"
        >
          {message}
        </p>
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

      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
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
              onChange={(event) => {
                setEmail(event.target.value);
                clearError();
              }}
              aria-invalid={
                state === 'error'
              }
              aria-describedby={
                state === 'error'
                  ? 'newsletter-error'
                  : undefined
              }
              maxLength={254}
              required
              className="h-12 w-full rounded-full border border-border bg-surface-raised pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
            />
          </div>

          {/* Honeypot field for simple bots. */}
          <div
            aria-hidden="true"
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
          >
            <label htmlFor="newsletter-website">
              Website
            </label>

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
            disabled={
              state === 'submitting' ||
              !turnstileToken ||
              !turnstileSiteKey
            }
            className="h-12 shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === 'submitting'
              ? 'Subscribing...'
              : t('submit')}
          </button>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              clearError();
            }}
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
          />

          <span className="flex items-center gap-1.5">
            <AgeBadge className="h-5" />
            {t('consent')}
          </span>
        </label>

        {!turnstileSiteKey && (
          <p
            role="alert"
            className="text-xs font-medium text-danger"
          >
            Security verification is unavailable.
          </p>
        )}

        {turnstileSiteKey && (
          <>
            {/*
             * Keep the widget mounted after completion.
             * Hiding it instead of unmounting it lets
             * window.turnstile.reset() work reliably.
             */}
            <div
              className={
                turnstileToken
                  ? 'hidden'
                  : undefined
              }
            >
              <div
                ref={turnstileContainerRef}
              />
            </div>

            {turnstileToken && (
              <div className="flex items-center gap-2 text-xs font-medium text-success">
                <ShieldCheck
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  Security check completed
                </span>
              </div>
            )}
          </>
        )}

        {state === 'error' && (
          <p
            id="newsletter-error"
            role="alert"
            className="text-xs font-medium text-danger"
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}
