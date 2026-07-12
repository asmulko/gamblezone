import { useTranslations } from 'next-intl';
import { Home } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="relative flex min-h-[60vh] items-center overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <div className="container-page relative z-10 flex flex-col items-center gap-6 py-24 text-center">
        <span className="font-display text-7xl font-bold text-gradient">404</span>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-md text-muted">{t('subtitle')}</p>
        <Button asChild size="lg">
          <Link href="/">
            <Home size={18} />
            {t('cta')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
