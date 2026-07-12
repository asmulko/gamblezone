import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'de', 'es', 'pl', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  pl: 'Polski',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: 'GB',
  de: 'DE',
  es: 'ES',
  pl: 'PL',
  pt: 'PT',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
