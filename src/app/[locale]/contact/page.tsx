import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { pageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/motion/reveal';
import { ContactForm } from '@/components/forms/contact-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return pageMetadata({ locale, path: '/contact', title: `${t('title')} | GambleZone`, description: t('intro') });
}


const LEGAL_EMAILS = [
  'manager@gamblezone.vip',
  'info@gamblezone.vip',
  'help@gamblezone.vip',
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.contact');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('intro')} />
      <div className="container-page py-14">
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-[1fr_360px]">
          <Reveal className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5 rounded-3xl border border-primary/25 bg-surface/50 p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">{t('legalTitle')}</h2>
            <p className="text-sm leading-relaxed text-muted">{t('legalDesc')}</p>
            <ul className="flex flex-col gap-4">
              {LEGAL_EMAILS.map((address) => (
                <li key={address} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-secondary">
                    <Mail size={16} />
                  </span>
                  <a
                    href={`mailto:${address}`}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {address}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </>
  );
}
