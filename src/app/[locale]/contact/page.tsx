import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { PageHeader } from '@/components/layout/page-header';
import { Reveal } from '@/components/motion/reveal';
import { ContactForm } from '@/components/forms/contact-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return { title: `${t('title')} — GambleZone` };
}

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
        <Reveal className="mx-auto max-w-xl rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
