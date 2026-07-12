'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('pages.contact');
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // MVP: no backend. Nothing is sent or stored.
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
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" label={t('nameLabel')} autoComplete="name" />
        <Field id="contact-email" label={t('emailLabel')} type="email" autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {t('messageLabel')}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          className="rounded-2xl border border-border bg-surface-raised px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.97]"
      >
        <Send size={16} />
        {t('submit')}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string;
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
        type={type}
        required
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border border-border bg-surface-raised px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary/60"
      />
    </div>
  );
}
