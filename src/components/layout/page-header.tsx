import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden border-b border-border', className)}>
      <div className="aurora opacity-60" aria-hidden="true" />
      <div className="container-page relative z-10 py-14 sm:py-20">
        <Reveal className="flex flex-col gap-3">
          {eyebrow && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-3xl text-balance font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="max-w-2xl text-pretty text-muted">{subtitle}</p>}
        </Reveal>
      </div>
    </div>
  );
}
