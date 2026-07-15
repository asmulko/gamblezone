"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, CheckCircle2 } from "lucide-react";
import { AgeBadge } from "@/components/ui/age-badge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    newsletterTurnstileSuccess?: (token: string) => void;
    newsletterTurnstileExpired?: () => void;
    newsletterTurnstileError?: () => void;
  }
}

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const locale = useLocale();

  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    window.newsletterTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);

      if (state === "error") {
        setState("idle");
        setMessage("");
      }
    };

    window.newsletterTurnstileExpired = () => {
      setTurnstileToken("");
    };

    window.newsletterTurnstileError = () => {
      setTurnstileToken("");
      setState("error");
      setMessage("Security verification failed. Please try again.");
    };

    return () => {
      delete window.newsletterTurnstileSuccess;
      delete window.newsletterTurnstileExpired;
      delete window.newsletterTurnstileError;
    };
  }, [state]);

  function resetTurnstile(): void {
    setTurnstileToken("");
    window.turnstile?.reset();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_RE.test(normalizedEmail)) {
      setState("error");
      setMessage(t("invalidEmail"));
      return;
    }

    if (!consent) {
      setState("error");
      setMessage(t("consentRequired"));
      return;
    }

    if (!turnstileToken) {
      setState("error");
      setMessage("Please complete the security check.");
      return;
    }

    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          consent,
          language: locale,
          website: formData.get("website"),
          turnstileToken,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Subscription failed.");
      }

      setEmail("");
      setConsent(false);
      setState("success");
      setMessage(result.message ?? t("success"));

      formRef.current?.reset();
      resetTurnstile();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Subscription failed.",
      );

      /*
       * Turnstile tokens are single-use.
       * Reset after any failed submission.
       */
      resetTurnstile();
    }
  }

  if (!turnstileSiteKey) {
    console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing.");
  }

  if (state === "success") {
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
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <label htmlFor="newsletter-email" className="sr-only">
              {t("placeholder")}
            </label>

            <input
              id="newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t("placeholder")}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (state === "error") {
                  setState("idle");
                  setMessage("");
                }
              }}
              aria-invalid={state === "error"}
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
            disabled={
              state === "submitting" || !turnstileToken || !turnstileSiteKey
            }
            className="h-12 shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === "submitting" ? "Subscribing..." : t("submit")}
          </button>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);

              if (state === "error") {
                setState("idle");
                setMessage("");
              }
            }}
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
          />

          <span className="flex items-center gap-1.5">
            <AgeBadge className="h-5" />
            {t("consent")}
          </span>
        </label>

        {turnstileSiteKey && (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-callback="newsletterTurnstileSuccess"
            data-expired-callback="newsletterTurnstileExpired"
            data-error-callback="newsletterTurnstileError"
            data-theme="auto"
            data-size="normal"
          />
        )}

        {state === "error" && (
          <p role="alert" className="text-xs font-medium text-danger">
            {message}
          </p>
        )}
      </form>
    </>
  );
}
