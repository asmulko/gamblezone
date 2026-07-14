'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { sendContactEmail, type ContactResult } from '@/app/actions/contact';

export function ContactForm() {
  const t = useTranslations('pages.contact');
  const [state, setState] = useState<ContactResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendContactEmail(formData);
      setState(result);
      if (result.success) e.currentTarget?.reset();
    });
  }

  if (state?.success) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 py-4 text-success">
        <CheckCircle2 size={20} />
        <p className="text-sm font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" name="name" label={t('nameLabel')} autoComplete="name" />
        <Field id="contact-email" name="email" label={t('emailLabel')} type="email" autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
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
      {state?.error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle size={16} className="shrink-0" />
          {state.error}
        </div>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
      >
        <Send size={16} />
        {isPending ? '…' : t('submit')}
      </button>
    </form>
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
