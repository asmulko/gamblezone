import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * All outbound links route through the internal /go redirect handler.
 * We never link directly to an operator, and mark links sponsored + nofollow.
 */
export function AffiliateCTA({
  slug,
  placement,
  campaign = 'welcome01',
  label,
  ariaLabel,
  variant = 'primary',
  size = 'md',
  className,
}: {
  slug: string;
  placement: string;
  campaign?: string;
  label: string;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const href = `/go/${slug}?campaign=${encodeURIComponent(campaign)}&placement=${encodeURIComponent(placement)}`;

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] [touch-action:manipulation] focus-visible:outline-none';
  const variants = {
    primary:
      'bg-primary text-primary-foreground shadow-glow hover:brightness-110',
    secondary: 'bg-secondary text-secondary-foreground hover:brightness-110',
    outline:
      'border border-border bg-surface/40 text-foreground hover:border-primary/60 hover:bg-surface-overlay',
  } as const;
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  } as const;

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={ariaLabel ?? label}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {label}
      <ExternalLink size={16} aria-hidden="true" />
    </a>
  );
}
